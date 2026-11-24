import type { Match, TeamData } from '../types.ts';
import { parseRecordSummary } from './teamStrengthHelper.ts';

export interface MarketImpliedProbabilities {
  home: number;
  away: number;
  draw?: number;
}

export interface ValuePickEvaluation {
  isValuePick: boolean;
  edgePct: number; // aiProb - marketProb (percentage points)
  side: 'home' | 'away' | 'draw';
  sideLabel: string;
  aiProb: number;
  marketProb: number;
  fairOdds: string;
  marketOdds: string;
  marketProbs: MarketImpliedProbabilities;
  reason: string;
}

const VALUE_EDGE_THRESHOLD = 6; // Minimum +6% probability edge over generic market implied odds

function parsePublicRankingRating(team: TeamData): number {
  let rating = 75;
  const parsed = parseRecordSummary(team.recordSummary);
  rating += (parsed.unbeatenRate - 0.5) * 28;

  const leagueStr = (team.league || '').toLowerCase();
  const posMatch = leagueStr.match(/\((\d+)(?:st|nd|rd|th)\)/);
  if (posMatch) {
    const pos = parseInt(posMatch[1], 10);
    if (pos === 1) rating += 6;
    else if (pos === 2) rating += 4;
    else if (pos === 3) rating += 2.5;
    else if (pos === 4) rating += 1.5;
    else if (pos >= 8 && pos <= 12) rating -= 2.5;
    else if (pos > 12) rating -= 5;
  }

  const rankStr = (team.ranking || '').toLowerCase();
  const rankMatch = rankStr.match(/#(\d+)/);
  if (rankMatch) {
    const rank = parseInt(rankMatch[1], 10);
    if (rank <= 3) rating += 3.5;
    else if (rank <= 6) rating += 2;
    else if (rank <= 12) rating += 1;
  }

  return rating;
}

/**
 * Models generic public/bookmaker implied probabilities (normalized to 100%)
 * anchored on season win rates, league standings/prestige rankings, static H2H,
 * and standard home-field advantage—without recency form streaks, tactical xG clashes,
 * or player duel adjustments.
 */
export function computeMarketImpliedProbabilities(match: Match): MarketImpliedProbabilities {
  const homePublic = parsePublicRankingRating(match.homeTeam);
  const awayPublic = parsePublicRankingRating(match.awayTeam);

  const isNeutral = match.venue?.toLowerCase().includes('neutral') || match.roundOrStage?.toLowerCase().includes('final');
  const homeVenueBias = match.sport === 'tennis' || isNeutral ? 0 : match.sport === 'football' ? 3.8 : 3.2;

  const totalH2H = match.headToHead?.totalPlayed || 0;
  const h2hEdge =
    totalH2H > 0
      ? (((match.headToHead.homeWins || 0) - (match.headToHead.awayWins || 0)) / totalH2H) * 5.0
      : 0;

  const ratingDiff = homePublic - awayPublic + homeVenueBias + h2hEdge;

  if (match.sport === 'football') {
    // Public football draw baseline (~23% to 28% depending on perceived parity)
    const marketDraw = Math.round(Math.max(19, Math.min(28, 27 - Math.abs(ratingDiff) * 0.28)));
    const decisivePool = 100 - marketDraw;
    // Logistic curve over generic public rating differential
    const homeShare = 1 / (1 + Math.exp(-ratingDiff * 0.085));
    const marketHome = Math.round(decisivePool * homeShare);
    const marketAway = Math.max(5, 100 - marketDraw - marketHome);
    return {
      home: marketHome,
      away: marketAway,
      draw: marketDraw,
    };
  }

  const homeWinShare = 1 / (1 + Math.exp(-ratingDiff * 0.09));
  const marketHome = Math.round(Math.max(12, Math.min(88, homeWinShare * 100)));
  const marketAway = 100 - marketHome;
  return {
    home: marketHome,
    away: marketAway,
  };
}

function toDecimalOdds(probPct: number): string {
  const clamped = Math.max(4, Math.min(96, probPct));
  return (100 / clamped).toFixed(2);
}

/**
 * Compares the AI model's predicted probabilities against generic market implied
 * probabilities to flag fixtures with a significant betting edge.
 */
export function evaluateValuePick(match: Match): ValuePickEvaluation | null {
  const probs = match.prediction?.probabilities;
  if (!probs) return null;

  const marketProbs = computeMarketImpliedProbabilities(match);

  const candidates: Array<{
    side: 'home' | 'away' | 'draw';
    sideLabel: string;
    aiProb: number;
    marketProb: number;
    edgePct: number;
  }> = [
    {
      side: 'home',
      sideLabel: match.homeTeam.shortName || match.homeTeam.name,
      aiProb: probs.home,
      marketProb: marketProbs.home,
      edgePct: probs.home - marketProbs.home,
    },
    {
      side: 'away',
      sideLabel: match.awayTeam.shortName || match.awayTeam.name,
      aiProb: probs.away,
      marketProb: marketProbs.away,
      edgePct: probs.away - marketProbs.away,
    },
  ];

  if (match.sport === 'football' && probs.draw !== undefined && marketProbs.draw !== undefined) {
    candidates.push({
      side: 'draw',
      sideLabel: 'Draw',
      aiProb: probs.draw,
      marketProb: marketProbs.draw,
      edgePct: probs.draw - marketProbs.draw,
    });
  }

  // Prefer the AI's predicted winner if it holds a meaningful edge, otherwise pick the highest-edge viable outcome
  const predictedSide = candidates.find((c) => c.side === match.prediction?.winner);
  const viableByEdge = [...candidates]
    .filter((c) => c.aiProb >= 28)
    .sort((a, b) => b.edgePct - a.edgePct);

  const chosen =
    predictedSide && predictedSide.edgePct >= VALUE_EDGE_THRESHOLD
      ? predictedSide
      : viableByEdge[0] || predictedSide || candidates[0];

  const isValuePick = chosen.edgePct >= VALUE_EDGE_THRESHOLD && chosen.aiProb >= 28;

  let reason = 'Market pricing aligns closely with AI form & tactical model.';
  if (isValuePick) {
    if (chosen.side === 'draw') {
      reason = 'Public lines underprice stalemate parity vs. AI Dixon-Coles simulation.';
    } else if (chosen.side === match.prediction?.winner) {
      reason = `AI form & tactical duel edge outpaces public ${chosen.sideLabel} market odds.`;
    } else {
      reason = `Undervalued ${chosen.sideLabel} upside hidden by legacy public rankings.`;
    }
  }

  return {
    isValuePick,
    edgePct: Math.round(chosen.edgePct),
    side: chosen.side,
    sideLabel: chosen.sideLabel,
    aiProb: chosen.aiProb,
    marketProb: chosen.marketProb,
    fairOdds: toDecimalOdds(chosen.aiProb),
    marketOdds: toDecimalOdds(chosen.marketProb),
    marketProbs,
    reason,
  };
}
