import type { TeamData, TeamStrength, FormAndStrengthBreakdown, Match } from '../types.ts';

interface ParsedRecord {
  winRate: number;        // 0 - 1
  unbeatenRate: number;   // 0 - 1
  lossRate: number;       // 0 - 1
  homeWinRate?: number;   // 0 - 1
  awayWinRate?: number;   // 0 - 1
  gamesPlayed: number;
}

/**
 * Parses record strings like:
 * - "24W - 5D - 2L (Home: 13W - 2D - 0L)"
 * - "62W - 20L (Home: 36W - 5L)"
 * - "Clay Season: 18W - 1L (94.7% win rate)"
 */
export function parseRecordSummary(recordSummary: string = ''): ParsedRecord {
  const mainMatch = recordSummary.match(/(\d+)\s*W(?:\s*-\s*(\d+)\s*D)?\s*-\s*(\d+)\s*L/i);
  let wins = 0;
  let draws = 0;
  let losses = 0;

  if (mainMatch) {
    wins = parseInt(mainMatch[1], 10) || 0;
    draws = mainMatch[2] ? parseInt(mainMatch[2], 10) || 0 : 0;
    losses = parseInt(mainMatch[3], 10) || 0;
  }

  const gamesPlayed = wins + draws + losses;
  const winRate = gamesPlayed > 0 ? wins / gamesPlayed : 0.62;
  const unbeatenRate = gamesPlayed > 0 ? (wins + draws * 0.5) / gamesPlayed : 0.72;
  const lossRate = gamesPlayed > 0 ? losses / gamesPlayed : 0.20;

  // Parse Home / Away splits if provided
  let homeWinRate: number | undefined;
  let awayWinRate: number | undefined;

  const homeSplit = recordSummary.match(/Home:\s*(\d+)\s*W(?:\s*-\s*(\d+)\s*D)?\s*-\s*(\d+)\s*L/i);
  if (homeSplit) {
    const hw = parseInt(homeSplit[1], 10) || 0;
    const hd = homeSplit[2] ? parseInt(homeSplit[2], 10) || 0 : 0;
    const hl = parseInt(homeSplit[3], 10) || 0;
    const hTotal = hw + hd + hl;
    if (hTotal > 0) homeWinRate = (hw + hd * 0.35) / hTotal;
  }

  const awaySplit = recordSummary.match(/Away:\s*(\d+)\s*W(?:\s*-\s*(\d+)\s*D)?\s*-\s*(\d+)\s*L/i);
  if (awaySplit) {
    const aw = parseInt(awaySplit[1], 10) || 0;
    const ad = awaySplit[2] ? parseInt(awaySplit[2], 10) || 0 : 0;
    const al = parseInt(awaySplit[3], 10) || 0;
    const aTotal = aw + ad + al;
    if (aTotal > 0) awayWinRate = (aw + ad * 0.35) / aTotal;
  }

  return { winRate, unbeatenRate, lossRate, homeWinRate, awayWinRate, gamesPlayed };
}

/**
 * Extracts league standing boost from league / ranking string
 * e.g. "Premier League (1st)" -> +4, "(2nd)" -> +3, "#1 UEFA" -> +2
 */
function parseLeagueRankBonus(team: TeamData): number {
  let bonus = 0;
  const leagueStr = (team.league || '').toLowerCase();
  const posMatch = leagueStr.match(/\((\d+)(?:st|nd|rd|th)\)/);
  if (posMatch) {
    const pos = parseInt(posMatch[1], 10);
    if (pos === 1) bonus += 4.5;
    else if (pos === 2) bonus += 3.2;
    else if (pos === 3) bonus += 2.2;
    else if (pos === 4) bonus += 1.2;
    else if (pos >= 10) bonus -= 2.5;
  }

  const rankStr = (team.ranking || '').toLowerCase();
  const uefaMatch = rankStr.match(/#(\d+)/);
  if (uefaMatch) {
    const rank = parseInt(uefaMatch[1], 10);
    if (rank <= 3) bonus += 2.0;
    else if (rank <= 8) bonus += 1.0;
  }

  return bonus;
}

/**
 * Computes tactical style modifiers from qualitative tactical descriptors
 */
function analyzeTacticalProfile(tacticalStyle: string = ''): { atkMod: number; defMod: number; paceMod: number } {
  const s = tacticalStyle.toLowerCase();
  let atkMod = 0;
  let defMod = 0;
  let paceMod = 0;

  if (s.includes('explosive') || s.includes('lethal') || s.includes('clinical') || s.includes('5-out') || s.includes('devastating')) {
    atkMod += 3.5;
  }
  if (s.includes('overload') || s.includes('possession') || s.includes('tempo control')) {
    paceMod += 3.0;
    defMod += 1.5;
  }
  if (s.includes('stifling') || s.includes('low block') || s.includes('rigidity') || s.includes('rest-defense') || s.includes('rest defense') || s.includes('paint wall') || s.includes('switchable perimeter defense')) {
    defMod += 5.0;
  }
  if (s.includes('counter-press') || s.includes('pressing') || s.includes('heavy metal')) {
    atkMod += 2.0;
    paceMod += 2.5;
    if (s.includes('high-line') || s.includes('extreme offside')) {
      defMod -= 2.0; // High line increases transition vulnerability
    }
  }
  if (s.includes('set-piece') || s.includes('aerial')) {
    atkMod += 1.5;
    defMod += 1.5;
  }

  return { atkMod, defMod, paceMod };
}

/**
 * Returns active player availability weight based on injury status & What-If absences
 */
function getPlayerAvailabilityWeight(
  playerName: string,
  injuryStatus: string,
  absentNames: Set<string>
): number {
  if (absentNames.has(playerName.toLowerCase())) return 0;
  switch (injuryStatus) {
    case 'suspended':
      return 0;
    case 'doubtful':
      return 0.35;
    case 'minor_knock':
      return 0.80;
    case 'healthy':
    default:
      return 1.0;
  }
}

/**
 * Calculates a team's current form index and multi-dimensional strength profile.
 * Incorporates:
 * 1. Recency-weighted last-5 form
 * 2. Parsed season record (W-D-L, win rate, defensive loss resistance)
 * 3. League position & tactical style profiles
 * 4. Active roster ratings (accounting for injuries & What-If player absences)
 */
export function calculateTeamStrength(
  team: TeamData,
  sport: string = 'football',
  absentPlayerNames: string[] = []
): TeamStrength {
  const absentSet = new Set(absentPlayerNames.map((n) => n.toLowerCase().trim()));
  const hasCustomAbsences = absentSet.size > 0;

  // If custom pre-populated strength exists AND no What-If absences are active, preserve & enrich
  if (team.strength && team.strength.overall && team.strength.attack && team.strength.defense && !hasCustomAbsences) {
    const formIndex = computeFormIndex(team.recentForm);
    const momentum = determineMomentum(formIndex, team.recentForm);
    const formStreakSummary = getStreakSummary(team.recentForm);
    return {
      ...team.strength,
      formIndex: team.strength.formIndex || formIndex,
      momentum: team.strength.momentum || momentum,
      formStreakSummary: team.strength.formStreakSummary || formStreakSummary,
    };
  }

  // 1. Recency-weighted Form Index (0 - 100)
  const formIndex = computeFormIndex(team.recentForm);
  const momentum = determineMomentum(formIndex, team.recentForm);
  const formStreakSummary = getStreakSummary(team.recentForm);

  // 2. Parse Season Record, League Standing & Tactical Modifiers
  const parsedRec = parseRecordSummary(team.recordSummary);
  const rankBonus = parseLeagueRankBonus(team);
  const tactMods = analyzeTacticalProfile(team.tacticalStyle);

  // Base season rating anchored from winRate & unbeatenRate (range ~72 to 94)
  const recordStrengthBase = 70 + parsedRec.unbeatenRate * 21 + rankBonus * 0.6;

  // 3. Roster evaluation (accounting for injuries & What-If absences)
  let attack = recordStrengthBase + tactMods.atkMod;
  let defense = 72 + (1 - parsedRec.lossRate) * 18 + rankBonus * 0.5 + tactMods.defMod;
  let midfieldOrPace = recordStrengthBase + tactMods.paceMod;

  if (team.keyPlayers && team.keyPlayers.length > 0) {
    let totalAvailWeight = 0;
    let maxPossibleWeight = team.keyPlayers.length;

    const weightedPlayers = team.keyPlayers.map((p) => {
      const w = getPlayerAvailabilityWeight(p.name, p.injuryStatus, absentSet);
      totalAvailWeight += w;
      return { player: p, weight: w };
    });

    // Calculate absence penalty if key stars are benched/injured
    const availabilityRatio = maxPossibleWeight > 0 ? totalAvailWeight / maxPossibleWeight : 1;
    const starAbsencePenalty = (1 - availabilityRatio) * 14; // Up to -14 OVR impact if full star group is out

    const activePlayers = weightedPlayers.filter((wp) => wp.weight > 0);

    if (activePlayers.length > 0) {
      // Attackers / Playmakers / Primary Scorers
      const atkGroup = activePlayers.filter(({ player }) => {
        const pos = (player.position || '').toLowerCase();
        return (
          pos.includes('striker') ||
          pos.includes('forward') ||
          pos.includes('wing') ||
          pos.includes('guard') ||
          pos.includes('quarterback') ||
          pos.includes('attacking') ||
          pos.includes('singles')
        );
      });
      const atkSample = atkGroup.length > 0 ? atkGroup : activePlayers;

      const avgPlayerAtk =
        atkSample.reduce((acc, { player, weight }) => {
          const stat = player.radarStats?.attack || player.rating * 10;
          return acc + stat * weight;
        }, 0) / atkSample.reduce((acc, item) => acc + item.weight, 0);

      // True Defensive Players (Defenders, Keepers, Defensive Midfielders, NBA Centers/Two-way forwards, NFL Defenders)
      // Crucial fix: DO NOT average striker tackling stats (e.g. Haaland defense: 35) as team defense!
      const defGroup = activePlayers.filter(({ player }) => {
        const pos = (player.position || '').toLowerCase();
        return (
          pos.includes('defen') ||
          pos.includes('back') ||
          pos.includes('keeper') ||
          pos.includes('goal') ||
          pos.includes('center') ||
          pos.includes('linebacker') ||
          pos.includes('edge') ||
          pos.includes('holding') ||
          (player.radarStats?.defense ?? 0) >= 72
        );
      });

      const avgPlayerTactical =
        activePlayers.reduce((acc, { player, weight }) => acc + (player.radarStats?.tactical || 84) * weight, 0) /
        activePlayers.reduce((acc, item) => acc + item.weight, 0);

      const avgPlayerRating =
        activePlayers.reduce((acc, { player, weight }) => acc + (player.rating || 8.4) * weight, 0) /
        activePlayers.reduce((acc, item) => acc + item.weight, 0);

      // Blend season record baseline with active roster firepower
      attack = (avgPlayerAtk * 0.58 + recordStrengthBase * 0.42 + tactMods.atkMod) - starAbsencePenalty * 0.9;

      if (defGroup.length > 0) {
        const avgTrueDef =
          defGroup.reduce((acc, { player, weight }) => acc + (player.radarStats?.defense || 82) * weight, 0) /
          defGroup.reduce((acc, item) => acc + item.weight, 0);
        defense = (avgTrueDef * 0.45 + defense * 0.55) - starAbsencePenalty * 0.45;
      } else {
        // When keyPlayers lists only attackers, calibrate team defense from season loss resistance, tactical structure & player tactical awareness
        defense = (defense * 0.72 + avgPlayerTactical * 0.28) - starAbsencePenalty * 0.35;
      }

      const avgMid =
        activePlayers.reduce(
          (acc, { player, weight }) => acc + ((player.radarStats?.tactical || 84) * 0.6 + (player.radarStats?.stamina || 84) * 0.4) * weight,
          0
        ) / activePlayers.reduce((acc, item) => acc + item.weight, 0);

      midfieldOrPace = (avgMid * 0.55 + (avgPlayerRating * 10) * 0.45 + tactMods.paceMod) - starAbsencePenalty * 0.65;
    } else {
      // Every listed star player is out!
      attack -= 14;
      defense -= 8;
      midfieldOrPace -= 12;
    }
  }

  attack = Math.round(Math.min(99, Math.max(58, attack)));
  defense = Math.round(Math.min(99, Math.max(60, defense)));
  midfieldOrPace = Math.round(Math.min(99, Math.max(60, midfieldOrPace)));

  // Composite overall rating incorporating form swing (+/- 4.5 OVR)
  const formAdjustment = (formIndex - 62) * 0.095;
  const overall = Math.round(
    Math.min(99, Math.max(58, attack * 0.39 + defense * 0.36 + midfieldOrPace * 0.25 + formAdjustment))
  );

  // Estimate recent goals/points scored & conceded from form & attack/defense profile
  const wCount = team.recentForm.filter((f) => f === 'W').length;
  const dCount = team.recentForm.filter((f) => f === 'D').length;
  const lCount = team.recentForm.filter((f) => f === 'L').length;

  const goalsScoredRecent =
    sport === 'basketball'
      ? Math.round(108 + (attack - 82) * 0.7 + wCount * 2.5 - lCount * 2)
      : sport === 'american_football'
      ? Math.round(22 + (attack - 82) * 0.4 + wCount * 1.8 - lCount * 1.5)
      : Math.round(Math.max(2, wCount * 2.1 + dCount * 1.1 + lCount * 0.6 + (attack - 84) * 0.15));

  const goalsConcededRecent =
    sport === 'basketball'
      ? Math.round(109 - (defense - 82) * 0.65 - wCount * 1.8 + lCount * 2.5)
      : sport === 'american_football'
      ? Math.round(21 - (defense - 82) * 0.35 - wCount * 1.2 + lCount * 1.8)
      : Math.round(Math.max(1, lCount * 1.9 + dCount * 1.0 + wCount * 0.6 - (defense - 84) * 0.12));

  return {
    overall,
    attack,
    defense,
    midfieldOrPace,
    formIndex,
    momentum,
    formStreakSummary,
    goalsScoredRecent,
    goalsConcededRecent,
  };
}

/**
 * Computes a 0 - 100 Form Index with recency weighting.
 * Recent matches (index 0) are weighted significantly higher than older fixtures.
 */
function computeFormIndex(formArr: ('W' | 'D' | 'L')[] = []): number {
  if (!formArr || formArr.length === 0) return 55;

  const weights = [0.34, 0.26, 0.20, 0.12, 0.08];
  let totalScore = 0;
  let totalWeight = 0;

  for (let i = 0; i < Math.min(formArr.length, weights.length); i++) {
    const res = formArr[i];
    const w = weights[i];
    const val = res === 'W' ? 100 : res === 'D' ? 45 : 8;
    totalScore += val * w;
    totalWeight += w;
  }

  const baseForm = totalWeight > 0 ? totalScore / totalWeight : 55;
  return Math.round(Math.min(99, Math.max(10, baseForm)));
}

function determineMomentum(
  formIndex: number,
  formArr: ('W' | 'D' | 'L')[] = []
): 'Surging' | 'Solid' | 'Slumping' | 'Erratic' {
  if (formArr[0] === 'W' && formArr[1] === 'W' && formIndex >= 72) return 'Surging';
  if (formArr[0] === 'L' && formArr[1] === 'L' && formIndex < 48) return 'Slumping';
  if (formIndex >= 76) return 'Surging';
  if (formIndex >= 54) return 'Solid';
  if (formIndex < 42) return 'Slumping';
  return 'Erratic';
}

function getStreakSummary(formArr: ('W' | 'D' | 'L')[] = []): string {
  if (!formArr || formArr.length === 0) return 'Form Unrecorded';

  const streakType = formArr[0];
  let streakCount = 0;

  for (const item of formArr) {
    if (item === streakType) {
      streakCount++;
    } else {
      break;
    }
  }

  if (streakType === 'W') {
    return streakCount > 1 ? `${streakCount} Wins Streak 🔥` : 'Won Last Match';
  }
  if (streakType === 'L') {
    return streakCount > 1 ? `${streakCount} Losses Slump ❄️` : 'Lost Last Match';
  }
  return streakCount > 1 ? `${streakCount} Draws in a row` : 'Drew Last Match';
}

/**
 * Compares two teams' current form and multi-dimensional strength,
 * generating sport-calibrated expected goals/points (xG), tactical clash notes, and momentum verdict.
 */
export function compareTeamFormAndStrength(
  homeTeam: TeamData,
  awayTeam: TeamData,
  sport: string = 'football',
  customModifiers?: any,
  headToHead?: Match['headToHead']
): FormAndStrengthBreakdown {
  const absentPlayerNames: string[] = Array.isArray(customModifiers?.playerAbsences)
    ? customModifiers.playerAbsences
    : [];

  const homeStrength = calculateTeamStrength(homeTeam, sport, absentPlayerNames);
  const awayStrength = calculateTeamStrength(awayTeam, sport, absentPlayerNames);

  // Apply What-If form momentum shift modifiers if requested
  if (customModifiers?.formMomentumShift === 'Home Surging / Away Slump') {
    homeStrength.formIndex = Math.min(98, homeStrength.formIndex + 22);
    homeStrength.momentum = 'Surging';
    homeStrength.overall = Math.min(99, homeStrength.overall + 3);
    awayStrength.formIndex = Math.max(15, awayStrength.formIndex - 25);
    awayStrength.momentum = 'Slumping';
    awayStrength.overall = Math.max(60, awayStrength.overall - 4);
  } else if (customModifiers?.formMomentumShift === 'Away Surging / Home Slump') {
    homeStrength.formIndex = Math.max(15, homeStrength.formIndex - 25);
    homeStrength.momentum = 'Slumping';
    homeStrength.overall = Math.max(60, homeStrength.overall - 4);
    awayStrength.formIndex = Math.min(98, awayStrength.formIndex + 22);
    awayStrength.momentum = 'Surging';
    awayStrength.overall = Math.min(99, awayStrength.overall + 3);
  } else if (customModifiers?.formMomentumShift === 'Both Peak Form') {
    homeStrength.formIndex = 95;
    homeStrength.momentum = 'Surging';
    awayStrength.formIndex = 92;
    awayStrength.momentum = 'Surging';
  }

  const formDiff = homeStrength.formIndex - awayStrength.formIndex;
  const overallDiff = homeStrength.overall - awayStrength.overall;
  const attackVsDefenseHome = homeStrength.attack - awayStrength.defense;
  const attackVsDefenseAway = awayStrength.attack - homeStrength.defense;

  let strengthAdvantage: 'home' | 'away' | 'balanced' = 'balanced';
  if (overallDiff >= 4 || formDiff >= 15) {
    strengthAdvantage = 'home';
  } else if (overallDiff <= -4 || formDiff <= -15) {
    strengthAdvantage = 'away';
  }

  // Venue multiplier
  let homeVenueMult = 1.13;
  let awayVenueMult = 0.92;
  if (customModifiers?.venueAdvantage === 'Hostile Cauldron (80,000+ Fans)') {
    homeVenueMult = 1.24;
    awayVenueMult = 0.85;
  } else if (customModifiers?.venueAdvantage === 'Neutral Venue (Cup Final)') {
    homeVenueMult = 1.0;
    awayVenueMult = 1.0;
  } else if (customModifiers?.venueAdvantage === 'Empty Stadium / Closed Doors') {
    homeVenueMult = 1.03;
    awayVenueMult = 0.97;
  }

  // Home/Away record split nudge (e.g., 14W-1D-0L fortress at home)
  const homeRec = parseRecordSummary(homeTeam.recordSummary);
  const awayRec = parseRecordSummary(awayTeam.recordSummary);
  const homeSplitMult = homeRec.homeWinRate !== undefined ? 0.94 + homeRec.homeWinRate * 0.14 : 1.0;
  const awaySplitMult = awayRec.awayWinRate !== undefined ? 0.94 + awayRec.awayWinRate * 0.14 : 1.0;

  // Weather impact multiplier
  let weatherScoringMult = 1.0;
  if (customModifiers?.weather?.includes('Rain')) weatherScoringMult = 0.86;
  else if (customModifiers?.weather?.includes('Heat')) weatherScoringMult = 0.93;
  else if (customModifiers?.weather?.includes('Altitude')) weatherScoringMult = 1.05;

  // Calculate sport-calibrated Expected Goals / Expected Points
  let homeXG = 1.5;
  let awayXG = 1.1;

  if (sport === 'football') {
    // Log-exponential Dixon-Coles style scoring intensity calibrated to ~2.6-3.0 total xG in elite ties
    const baseLeagueGoalAvg = 1.12;
    const homeAtkDiff = (homeStrength.attack - awayStrength.defense) / 40;
    const awayAtkDiff = (awayStrength.attack - homeStrength.defense) / 40;

    const homeFormMult = 0.86 + (homeStrength.formIndex / 100) * 0.28;
    const awayFormMult = 0.86 + (awayStrength.formIndex / 100) * 0.28;

    let rawHomeXG =
      baseLeagueGoalAvg * Math.exp(homeAtkDiff) * homeFormMult * homeVenueMult * homeSplitMult * weatherScoringMult;
    let rawAwayXG =
      baseLeagueGoalAvg * Math.exp(awayAtkDiff) * awayFormMult * awayVenueMult * awaySplitMult * weatherScoringMult;

    // Slight blend (14%) with authentic historical H2H goal rate if available
    if (headToHead?.lastMeetings && headToHead.lastMeetings.length >= 2) {
      const avgH2HHome =
        headToHead.lastMeetings.reduce((acc, m) => acc + (m.homeScore || 0), 0) / headToHead.lastMeetings.length;
      const avgH2HAway =
        headToHead.lastMeetings.reduce((acc, m) => acc + (m.awayScore || 0), 0) / headToHead.lastMeetings.length;
      rawHomeXG = rawHomeXG * 0.86 + avgH2HHome * 0.14;
      rawAwayXG = rawAwayXG * 0.86 + avgH2HAway * 0.14;
    }

    homeXG = Math.round(Math.min(3.6, Math.max(0.45, rawHomeXG)) * 100) / 100;
    awayXG = Math.round(Math.min(3.3, Math.max(0.35, rawAwayXG)) * 100) / 100;
  } else if (sport === 'basketball') {
    const leagueBasePts = 111.5;
    const homeEdgePts =
      customModifiers?.venueAdvantage === 'Neutral Venue (Cup Final)'
        ? 0
        : customModifiers?.venueAdvantage === 'Hostile Cauldron (80,000+ Fans)'
        ? 5.0
        : 3.1;

    const rawHomePts =
      leagueBasePts +
      (homeStrength.attack - awayStrength.defense) * 0.48 +
      (homeStrength.formIndex - 65) * 0.14 +
      homeEdgePts;

    const rawAwayPts =
      leagueBasePts +
      (awayStrength.attack - homeStrength.defense) * 0.48 +
      (awayStrength.formIndex - 65) * 0.14 -
      homeEdgePts * 0.4;

    homeXG = Math.round(Math.min(134, Math.max(92, rawHomePts * weatherScoringMult)));
    awayXG = Math.round(Math.min(132, Math.max(90, rawAwayPts * weatherScoringMult)));
  } else if (sport === 'american_football') {
    const baseNFL = 22.5;
    const homeEdgeNFL = customModifiers?.venueAdvantage === 'Neutral Venue (Cup Final)' ? 0 : 2.3;
    homeXG = Math.round(
      Math.min(
        40,
        Math.max(10, (baseNFL + (homeStrength.attack - awayStrength.defense) * 0.35 + (homeStrength.formIndex - 65) * 0.1 + homeEdgeNFL) * weatherScoringMult)
      )
    );
    awayXG = Math.round(
      Math.min(
        38,
        Math.max(10, (baseNFL + (awayStrength.attack - homeStrength.defense) * 0.35 + (awayStrength.formIndex - 65) * 0.1) * weatherScoringMult)
      )
    );
  } else {
    // Tennis expected set dominance rating
    homeXG = Math.round((homeStrength.overall / (homeStrength.overall + awayStrength.overall)) * 100) / 100;
    awayXG = Math.round((awayStrength.overall / (homeStrength.overall + awayStrength.overall)) * 100) / 100;
  }

  // Narrative synthesis
  let formClashVerdict = '';
  if (Math.abs(formDiff) >= 18) {
    const hotTeam = formDiff > 0 ? homeTeam.name : awayTeam.name;
    const coldTeam = formDiff > 0 ? awayTeam.name : homeTeam.name;
    const hotForm = formDiff > 0 ? homeStrength.formIndex : awayStrength.formIndex;
    const coldForm = formDiff > 0 ? awayStrength.formIndex : homeStrength.formIndex;
    formClashVerdict = `Severe Form Disparity: ${hotTeam} enters in peak momentum (${hotForm}% form index) having dominated recent fixtures, clashing directly with ${coldTeam}'s noticeable dip (${coldForm}% form).`;
  } else if (homeStrength.momentum === 'Surging' && awayStrength.momentum === 'Surging') {
    formClashVerdict = `High-Voltage Clash: Both sides arrive in scorching form (${homeStrength.formIndex}% vs ${awayStrength.formIndex}%). Outcome hinges on conversion efficiency and defensive transitions.`;
  } else if (homeStrength.momentum === 'Slumping' && awayStrength.momentum === 'Slumping') {
    formClashVerdict = `Grudge Match of Vulnerability: Both clubs have struggled for consistency over their last 5 outings (${homeStrength.formIndex}% vs ${awayStrength.formIndex}%), elevating variance.`;
  } else {
    formClashVerdict = `Competitive Rhythm: ${homeTeam.name} (${homeStrength.formIndex}% form, ${homeStrength.momentum}) vs ${awayTeam.name} (${awayStrength.formIndex}% form, ${awayStrength.momentum}) profiles as a tactical strength test.`;
  }

  const attackVsDefenseDynamic =
    attackVsDefenseHome > 5
      ? `${homeTeam.name}'s attack (${homeStrength.attack}) holds a clear efficiency edge over ${awayTeam.name}'s backline (${awayStrength.defense}), projecting sustained box pressure.`
      : attackVsDefenseAway > 5
      ? `${awayTeam.name}'s attack (${awayStrength.attack}) poses real transitional danger against ${homeTeam.name}'s defense (${homeStrength.defense}).`
      : `Balanced tactical matchup: ${homeTeam.name} (Atk ${homeStrength.attack}/Def ${homeStrength.defense}) and ${awayTeam.name} (Atk ${awayStrength.attack}/Def ${awayStrength.defense}) neutralize easily conceded lanes.`;

  const momentumDifferential = `${homeTeam.name} (${homeStrength.momentum} - ${homeStrength.formStreakSummary}) vs ${awayTeam.name} (${awayStrength.momentum} - ${awayStrength.formStreakSummary})`;

  return {
    homeStrength,
    awayStrength,
    formClashVerdict,
    strengthAdvantage,
    attackVsDefenseDynamic,
    momentumDifferential,
    expectedGoals: {
      home: homeXG,
      away: awayXG,
    },
  };
}
