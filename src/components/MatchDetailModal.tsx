import React, { useState } from 'react';
import {
  X,
  Trophy,
  Brain,
  TrendingUp,
  Flame,
  Shield,
  Activity,
  Calendar,
  MapPin,
  Sparkles,
  SlidersHorizontal,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  Users,
  Compass,
  ArrowRight,
  Share2,
  RefreshCw,
  Lock,
  Unlock,
  MessageCircle,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { Match, PlayerStat, AIPrediction } from '../types.ts';
import { PlayerRadarChart } from './PlayerRadarChart.tsx';

interface MatchDetailModalProps {
  match: Match;
  onClose: () => void;
  onRunPrediction: (matchId: string, customModifiers?: any) => Promise<void>;
  isPredicting: boolean;
  isVIP?: boolean;
  isOwner?: boolean;
  whatsappChannelUrl?: string;
  onOpenPaywall?: () => void;
}

const DEFAULT_PLAYER: PlayerStat = {
  id: 'fallback-player',
  name: 'Featured Athlete',
  position: 'Starter',
  rating: 8.0,
  form: ['W', 'W', 'D', 'W'],
  injuryStatus: 'healthy',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  radarStats: {
    attack: 80,
    defense: 75,
    clutch: 82,
    consistency: 84,
    stamina: 80,
    tactical: 85,
  },
  keyMetrics: {
    'Form Rating': '8.2/10',
    'Goal / Pt Involvement': '0.74',
    'High-Stakes Win %': '68%',
    'Duel Win Pct': '61%',
  },
  historicalNotes: 'Consistent high performer in pivotal tournament matchups.',
  recentPerformances: [
    { opponent: 'Recent Rival', score: '2-1', rating: 8.4, statSummary: 'Key offensive playmaker', date: '2026-10-28' }
  ]
};

export const MatchDetailModal: React.FC<MatchDetailModalProps> = ({
  match,
  onClose,
  onRunPrediction,
  isPredicting,
  isVIP = false,
  isOwner = false,
  whatsappChannelUrl = 'https://whatsapp.com/channel/apexmatch-vip-intel',
  onOpenPaywall,
}) => {
  const [activeTab, setActiveTab] = useState<'prediction' | 'players' | 'simulation' | 'whatif'>('prediction');
  const [selectedTeamTab, setSelectedTeamTab] = useState<'home' | 'away'>('home');

  const { homeTeam, awayTeam, prediction } = match;

  const initialPlayer =
    homeTeam?.keyPlayers?.[0] ||
    awayTeam?.keyPlayers?.[0] ||
    DEFAULT_PLAYER;

  const [selectedPlayer, setSelectedPlayer] = useState<PlayerStat>(initialPlayer);

  // What-If Simulator state
  const [weatherModifier, setWeatherModifier] = useState<string>('Standard');
  const [venueModifier, setVenueModifier] = useState<string>('Normal Home Advantage');
  const [absentPlayerIds, setAbsentPlayerIds] = useState<string[]>([]);
  const [tacticalFocus, setTacticalFocus] = useState<string>('Balanced Transition');

  const togglePlayerAbsence = (playerId: string) => {
    setAbsentPlayerIds((prev) =>
      prev.includes(playerId) ? prev.filter((id) => id !== playerId) : [...prev, playerId]
    );
  };

  const handleApplyWhatIf = async () => {
    const homePlayers = homeTeam?.keyPlayers || [];
    const awayPlayers = awayTeam?.keyPlayers || [];

    const absentPlayerNames = [
      ...homePlayers.filter((p) => absentPlayerIds.includes(p.id)),
      ...awayPlayers.filter((p) => absentPlayerIds.includes(p.id)),
    ].map((p) => p.name);

    await onRunPrediction(match.id, {
      weather: weatherModifier,
      venueAdvantage: venueModifier,
      playerAbsences: absentPlayerNames,
      tacticalFocus,
    });
    setActiveTab('prediction');
  };

  const currentRoster = selectedTeamTab === 'home' ? (homeTeam?.keyPlayers || []) : (awayTeam?.keyPlayers || []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/70 dark:bg-slate-950/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl my-auto rounded-2xl border border-stone-300 dark:border-slate-800 bg-[#EFECE6] dark:bg-slate-950 text-stone-900 dark:text-slate-100 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-300 dark:border-slate-800 px-6 py-4 bg-[#E5DFD5] dark:bg-slate-900/90">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-700/15 text-emerald-900 dark:bg-emerald-600/20 dark:text-emerald-400 font-mono text-xs border border-emerald-600/30 font-bold">
                {match.tournament}
              </span>
              {match.roundOrStage && (
                <span className="text-stone-600 dark:text-slate-400 font-mono text-xs">• {match.roundOrStage}</span>
              )}
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-stone-900 dark:text-white mt-1">
              {homeTeam.name} <span className="text-stone-500 dark:text-slate-400 font-normal">vs</span> {awayTeam.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#DFD9CE] hover:bg-[#D4CEBF] dark:bg-slate-800 dark:hover:bg-slate-700 text-stone-700 dark:text-slate-300 hover:text-stone-950 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-stone-300 dark:border-slate-700"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 border-b border-stone-300 dark:border-slate-800 px-6 bg-[#EAE5DD] dark:bg-slate-900/60 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('prediction')}
            className={`flex items-center gap-2 py-3 px-3.5 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'prediction'
                ? 'border-emerald-700 text-emerald-900 bg-[#DFD9CE]/60 dark:border-emerald-500 dark:text-emerald-400 dark:bg-transparent'
                : 'border-transparent text-stone-700 dark:text-slate-400 hover:text-stone-950 dark:hover:text-slate-200'
            }`}
          >
            <Brain className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span>AI Winner Forecast</span>
          </button>

          <button
            onClick={() => setActiveTab('players')}
            className={`flex items-center gap-2 py-3 px-3.5 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'players'
                ? 'border-emerald-700 text-emerald-900 bg-[#DFD9CE]/60 dark:border-emerald-500 dark:text-emerald-400 dark:bg-transparent'
                : 'border-transparent text-stone-700 dark:text-slate-400 hover:text-stone-950 dark:hover:text-slate-200'
            }`}
          >
            <Users className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span>Player Performance Rosters</span>
          </button>

          <button
            onClick={() => setActiveTab('simulation')}
            className={`flex items-center gap-2 py-3 px-3.5 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'simulation'
                ? 'border-emerald-700 text-emerald-900 bg-[#DFD9CE]/60 dark:border-emerald-500 dark:text-emerald-400 dark:bg-transparent'
                : 'border-transparent text-stone-700 dark:text-slate-400 hover:text-stone-950 dark:hover:text-slate-200'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span>1,000 Monte Carlo Sim</span>
            {!isVIP && <Lock className="w-3 h-3 text-amber-700 dark:text-amber-400 shrink-0" />}
          </button>

          <button
            onClick={() => setActiveTab('whatif')}
            className={`flex items-center gap-2 py-3 px-3.5 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'whatif'
                ? 'border-emerald-700 text-emerald-900 bg-[#DFD9CE]/60 dark:border-emerald-500 dark:text-emerald-400 dark:bg-transparent'
                : 'border-transparent text-stone-700 dark:text-slate-400 hover:text-stone-950 dark:hover:text-slate-200'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span>What-If Lineup Simulator</span>
            {!isVIP && <Lock className="w-3 h-3 text-amber-700 dark:text-amber-400 shrink-0" />}
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* TAB 1: AI WINNER FORECAST */}
          {activeTab === 'prediction' && (
            <div className="space-y-6">
              {prediction ? (
                <>
                  {/* VIP Access Status Bar / WhatsApp Redirect */}
                  {isVIP ? (
                    <div className={`rounded-xl border p-4 flex flex-wrap items-center justify-between gap-3 shadow-sm ${
                      isOwner
                        ? 'border-emerald-600/50 bg-[#E5DFD5] dark:bg-gradient-to-r dark:from-emerald-950/80 dark:via-slate-900 dark:to-indigo-950/60'
                        : 'border-emerald-600/40 bg-[#E5DFD5] dark:bg-gradient-to-r dark:from-emerald-950/60 dark:via-slate-900 dark:to-emerald-950/40'
                    }`}>
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-emerald-600/15 border border-emerald-600/30 dark:bg-emerald-500/20 dark:border-emerald-500/40 flex items-center justify-center text-emerald-800 dark:text-emerald-400">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="font-bold text-stone-900 dark:text-white text-xs flex items-center gap-1.5">
                            {isOwner ? '👑 Master Admin Active • Free Privilege Enabled' : 'VIP Detailed Dossier Active'}
                          </span>
                          <span className="text-[11px] text-stone-600 dark:text-slate-400">
                            {isOwner
                              ? 'Logged in as Admin: all deep tactical stats, player duel edges, and 1,000 Monte Carlo runs unlocked with zero paywall'
                              : 'Full quantitative proofs & 1,000 Monte Carlo sims unlocked'}
                          </span>
                        </div>
                      </div>
                      <a
                        href={whatsappChannelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-slate-950 font-bold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-sm active:scale-95"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>{isOwner ? 'Your VIP WhatsApp Channel' : 'Open VIP WhatsApp Channel'}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ) : (
                    <div className="rounded-xl border border-amber-600/40 bg-[#EFE9DD] dark:bg-amber-950/30 px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2 text-stone-800 dark:text-amber-300 font-medium">
                        <Lock className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0" />
                        <span>Free Match Preview Active • Deep player duel exploits & WhatsApp channel access require VIP pass</span>
                      </div>
                      <button
                        onClick={onOpenPaywall}
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white dark:bg-gradient-to-r dark:from-emerald-500 dark:to-teal-400 dark:text-slate-950 font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                      >
                        <Unlock className="w-3.5 h-3.5" />
                        <span>Unlock Full Dossier & WhatsApp</span>
                      </button>
                    </div>
                  )}

                  {/* Hero Prediction Banner */}
                  <div className="rounded-2xl border border-stone-300 dark:border-emerald-500/30 bg-[#E5DFD5] dark:bg-gradient-to-br dark:from-emerald-950/40 dark:via-slate-900 dark:to-indigo-950/30 p-5 sm:p-6 shadow-sm relative overflow-hidden">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-700/15 text-emerald-900 dark:bg-emerald-500/20 dark:text-emerald-300 font-mono text-xs font-bold flex items-center gap-1.5 border border-emerald-600/30 dark:border-emerald-500/30">
                            <Sparkles className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                            AI PREDICTED WINNER
                          </span>
                          <span className="font-mono text-xs text-stone-700 dark:text-slate-300">
                            Confidence: <strong className="text-emerald-800 dark:text-emerald-400">{prediction.confidence}%</strong>
                          </span>
                        </div>

                        <div className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-950 dark:text-white flex items-center gap-3">
                          <Trophy className="w-7 h-7 sm:w-8 sm:h-8 text-amber-600 dark:text-amber-400 shrink-0" />
                          <span>{prediction.winnerName}</span>
                        </div>

                        <p className="mt-2 text-xs sm:text-sm text-stone-700 dark:text-slate-300 max-w-2xl leading-relaxed">
                          {prediction.summary}
                        </p>
                      </div>

                      {/* Projected Score & Odds Box */}
                      <div className="bg-[#DFD9CE] border border-stone-300/90 dark:bg-slate-950/80 dark:border-slate-800 rounded-xl p-4 text-center shrink-0 w-full md:w-auto shadow-xs">
                        <span className="text-[11px] font-mono text-stone-600 dark:text-slate-400 uppercase tracking-wider block font-semibold">
                          Projected Scoreline
                        </span>
                        <div className="text-3xl font-black font-mono text-emerald-800 dark:text-emerald-400 mt-1">
                          {prediction.projectedScore?.home ?? 0} <span className="text-stone-400 dark:text-slate-600">-</span> {prediction.projectedScore?.away ?? 0}
                        </div>
                        <span className="text-[10px] text-stone-600 dark:text-slate-500 font-mono mt-1 block">
                          {homeTeam.shortName} vs {awayTeam.shortName}
                        </span>
                      </div>
                    </div>

                    {/* Probability Distribution Bar */}
                    <div className="mt-5 pt-4 border-t border-stone-300 dark:border-slate-800/80">
                      <div className="flex justify-between items-center text-xs font-mono mb-2">
                        <span className="font-bold text-emerald-800 dark:text-emerald-400">
                          {homeTeam.name} Win: {prediction.probabilities?.home ?? 50}%
                        </span>
                        {prediction.probabilities?.draw !== undefined && prediction.probabilities.draw > 0 && (
                          <span className="text-amber-800 dark:text-amber-400 font-bold">
                            Draw: {prediction.probabilities.draw}%
                          </span>
                        )}
                        <span className="font-bold text-indigo-800 dark:text-indigo-400">
                          {awayTeam.name} Win: {prediction.probabilities?.away ?? 50}%
                        </span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-stone-300 dark:bg-slate-800 overflow-hidden flex shadow-inner">
                        <div
                          className="bg-emerald-600 dark:bg-emerald-500 h-full transition-all duration-700"
                          style={{ width: `${prediction.probabilities?.home ?? 50}%` }}
                        />
                        {prediction.probabilities?.draw !== undefined && prediction.probabilities.draw > 0 && (
                          <div
                            className="bg-amber-500 h-full transition-all duration-700"
                            style={{ width: `${prediction.probabilities.draw}%` }}
                          />
                        )}
                        <div
                          className="bg-indigo-600 dark:bg-indigo-500 h-full transition-all duration-700"
                          style={{ width: `${prediction.probabilities?.away ?? 50}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* If VIP (or Admin): render full deep forecast details. If NOT VIP: render the VIP lock gate card */}
                  {isVIP ? (
                    <div className="space-y-6">
                      {/* Deep Tactical & Historical Rationale */}
                      <div className="rounded-xl border border-stone-300 dark:border-slate-800 bg-[#EAE5DD] dark:bg-slate-900/60 p-5 space-y-3">
                        <div className="flex items-center gap-2 text-sm font-bold text-stone-900 dark:text-white">
                          <Brain className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                          <span>Quantitative Match Performance Analysis</span>
                        </div>
                        <p className="text-xs sm:text-sm text-stone-800 dark:text-slate-300 leading-relaxed font-normal">
                          {prediction.rationale}
                        </p>
                      </div>

                      {/* Key Player Duel Card */}
                      {prediction.keyPlayerDuel && (
                        <div className="rounded-xl border border-indigo-300/80 dark:border-indigo-500/30 bg-[#E6E8EF] dark:bg-indigo-950/25 p-5">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-indigo-700 dark:text-indigo-400" />
                              <h4 className="text-sm font-bold text-indigo-950 dark:text-indigo-200">
                                Decisive Player Matchup Duel
                              </h4>
                            </div>
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-indigo-100 text-indigo-900 border border-indigo-300 dark:bg-indigo-500/20 dark:text-indigo-300 dark:border-indigo-500/30">
                              Advantage: {prediction.keyPlayerDuel.advantage}
                            </span>
                          </div>

                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-2 border-y border-indigo-200 dark:border-indigo-900/40">
                            <div className="font-semibold text-stone-900 dark:text-white">
                              {prediction.keyPlayerDuel.playerHome} <span className="text-xs text-stone-600 dark:text-slate-400">({homeTeam.shortName})</span>
                            </div>
                            <span className="font-mono text-xs text-indigo-900 dark:text-indigo-400 font-bold px-2 py-1 rounded bg-indigo-100 dark:bg-indigo-950/60 border border-indigo-300 dark:border-indigo-800/60">
                              VS DUEL
                            </span>
                            <div className="font-semibold text-stone-900 dark:text-white">
                              {prediction.keyPlayerDuel.playerAway} <span className="text-xs text-stone-600 dark:text-slate-400">({awayTeam.shortName})</span>
                            </div>
                          </div>

                          <p className="mt-3 text-xs text-stone-800 dark:text-slate-300 leading-relaxed">
                            {prediction.keyPlayerDuel.duelSummary}
                          </p>
                          <div className="mt-2 text-xs text-indigo-900 dark:text-indigo-300 font-semibold">
                            💡 {prediction.keyPlayerDuel.advantageReason}
                          </div>
                        </div>
                      )}

                      {/* Historical Performance Proofs Grid */}
                      {(prediction.historicalPerformanceBreakdown?.length ?? 0) > 0 && (
                        <div>
                          <h4 className="text-xs font-mono uppercase tracking-wider text-stone-700 dark:text-slate-400 font-bold mb-3 flex items-center gap-1.5">
                            <TrendingUp className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                            <span>Historical Performance Evidence</span>
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {prediction.historicalPerformanceBreakdown.map((item, idx) => (
                              <div
                                key={idx}
                                className="rounded-xl border border-stone-300 dark:border-slate-800 bg-[#EAE5DD] dark:bg-slate-900/50 p-4 flex flex-col justify-between"
                              >
                                <div>
                                  <div className="flex items-center justify-between gap-2 mb-2">
                                    <span className="text-xs font-bold text-stone-900 dark:text-slate-200 line-clamp-1">
                                      {item.title}
                                    </span>
                                    <span
                                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded uppercase font-bold ${
                                        item.impact === 'critical'
                                          ? 'bg-rose-100 text-rose-800 border border-rose-300 dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-500/30'
                                          : 'bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30'
                                      }`}
                                    >
                                      {item.impact}
                                    </span>
                                  </div>
                                  <p className="text-xs text-stone-700 dark:text-slate-300 leading-relaxed">
                                    {item.statProof}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tactical Keys & X-Factor Player */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Tactical Keys */}
                        <div className="rounded-xl border border-stone-300 dark:border-slate-800 bg-[#EAE5DD] dark:bg-slate-900/50 p-4">
                          <h4 className="text-xs font-mono uppercase tracking-wider text-stone-700 dark:text-slate-400 font-bold mb-3 flex items-center gap-1.5">
                            <Compass className="w-4 h-4 text-teal-700 dark:text-cyan-400" />
                            <span>Tactical Keys to Victory</span>
                          </h4>
                          <ul className="space-y-2 text-xs text-stone-800 dark:text-slate-300">
                            {(prediction.tacticalKeys || []).map((key, kIdx) => (
                              <li key={kIdx} className="flex items-start gap-2">
                                <span className="text-emerald-700 dark:text-emerald-400 font-bold">•</span>
                                <span>{key}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* X-Factor Player */}
                        {prediction.xFactorPlayer && (
                          <div className="rounded-xl border border-amber-300/80 dark:border-amber-500/30 bg-[#EFE9DD] dark:bg-amber-950/20 p-4 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-mono uppercase tracking-wider text-amber-900 dark:text-amber-400 font-bold flex items-center gap-1.5">
                                  <Flame className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                                  <span>Match X-Factor Player</span>
                                </span>
                                <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 dark:bg-amber-500/20 dark:text-amber-300 text-[10px] font-mono font-bold border border-amber-300 dark:border-amber-500/30">
                                  {prediction.xFactorPlayer.team}
                                </span>
                              </div>
                              <div className="text-base font-extrabold text-stone-900 dark:text-white">
                                {prediction.xFactorPlayer.name}
                              </div>
                              <p className="mt-1.5 text-xs text-stone-800 dark:text-slate-300 leading-relaxed">
                                {prediction.xFactorPlayer.reason}
                              </p>
                            </div>
                            <div className="mt-3 pt-2 border-t border-amber-200 dark:border-amber-500/20 text-xs font-mono text-amber-900 dark:text-amber-300 font-semibold">
                              ⭐ {prediction.xFactorPlayer.statHighlight}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-2xl border-2 border-emerald-600/40 dark:border-emerald-500/50 bg-[#E5DFD5] dark:bg-gradient-to-br dark:from-emerald-950/80 dark:via-slate-900 dark:to-indigo-950/70 p-6 sm:p-8 text-center shadow-md overflow-hidden my-4 space-y-4">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-600/15 border border-emerald-600/30 text-emerald-800 dark:bg-emerald-500/20 dark:border-emerald-500/40 dark:text-emerald-400 mx-auto flex items-center justify-center">
                        <Lock className="w-7 h-7" />
                      </div>
                      <div>
                        <span className="px-3 py-1 rounded-full bg-emerald-600/10 text-emerald-900 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-600/20 dark:border-emerald-500/30 text-[10px] font-mono font-bold uppercase tracking-wider">
                          Deep Tactical Intelligence Gated
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white mt-2">
                          Unlock Deep Match Forecast Details & VIP WhatsApp Channel
                        </h3>
                        <p className="text-xs sm:text-sm text-stone-700 dark:text-slate-300 max-w-xl mx-auto mt-2 leading-relaxed">
                          Deep forecast details—including the full quantitative match analysis, 1v1 positional duel advantages, multi-season historical proofs, tactical victory keys, and 1,000 Monte Carlo runs—are hidden. Complete payment via Paystack to unlock immediately and get <strong>automatically redirected to our exclusive VIP WhatsApp Channel</strong>!
                        </p>
                      </div>

                      {/* Features list */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-lg mx-auto text-left text-xs font-semibold text-stone-800 dark:text-slate-200 py-1">
                        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#DFD9CE] dark:bg-slate-950/60 border border-stone-300 dark:border-slate-800">
                          <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                          <span>Quantitative Match &amp; xG Analysis</span>
                        </div>
                        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#DFD9CE] dark:bg-slate-950/60 border border-stone-300 dark:border-slate-800">
                          <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                          <span>1v1 Positional Duel Advantage Insights</span>
                        </div>
                        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#DFD9CE] dark:bg-slate-950/60 border border-stone-300 dark:border-slate-800">
                          <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                          <span>Multi-Season Historical Evidence Proofs</span>
                        </div>
                        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#DFD9CE] dark:bg-slate-950/60 border border-stone-300 dark:border-slate-800">
                          <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                          <span>Auto-Redirect to VIP WhatsApp Channel</span>
                        </div>
                      </div>

                      <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                        <button
                          onClick={onOpenPaywall}
                          className="py-3 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white dark:bg-gradient-to-r dark:from-emerald-500 dark:to-teal-400 dark:text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                        >
                          <Unlock className="w-4 h-4" />
                          <span>Pay with Paystack &amp; Join VIP WhatsApp Channel</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12 bg-[#EAE5DD] dark:bg-slate-900/40 rounded-xl border border-stone-300 dark:border-slate-800">
                  <Brain className="w-12 h-12 text-stone-500 dark:text-slate-600 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-stone-900 dark:text-slate-200">No Prediction Generated Yet</h3>
                  <p className="text-xs text-stone-600 dark:text-slate-400 max-w-md mx-auto mt-1 mb-4">
                    Run the AI prediction model to analyze historical player performance metrics and calculate projected outcomes.
                  </p>
                  <button
                    onClick={() => onRunPrediction(match.id)}
                    disabled={isPredicting}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-slate-950 font-bold rounded-lg text-xs transition-all cursor-pointer flex items-center gap-2 mx-auto disabled:opacity-50"
                  >
                    <Sparkles className={`w-4 h-4 ${isPredicting ? 'animate-spin' : ''}`} />
                    <span>Run AI Prediction Model</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PLAYER PERFORMANCE ROSTERS */}
          {activeTab === 'players' && (
            <div className="space-y-6">
              {/* Team Selector Switcher */}
              <div className="flex items-center justify-between gap-4 border-b border-stone-300 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedTeamTab('home');
                      if (homeTeam?.keyPlayers?.[0]) setSelectedPlayer(homeTeam.keyPlayers[0]);
                    }}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                      selectedTeamTab === 'home'
                        ? 'bg-emerald-700 text-white shadow-sm'
                        : 'bg-[#DFD9CE] text-stone-800 hover:bg-[#D4CEBF] border border-stone-300 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800'
                    }`}
                  >
                    <span>{homeTeam.name}</span>
                    <span className="font-mono text-[10px] opacity-80">({homeTeam?.keyPlayers?.length ?? 0} Stars)</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedTeamTab('away');
                      if (awayTeam?.keyPlayers?.[0]) setSelectedPlayer(awayTeam.keyPlayers[0]);
                    }}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                      selectedTeamTab === 'away'
                        ? 'bg-indigo-700 text-white shadow-sm'
                        : 'bg-[#DFD9CE] text-stone-800 hover:bg-[#D4CEBF] border border-stone-300 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800'
                    }`}
                  >
                    <span>{awayTeam.name}</span>
                    <span className="font-mono text-[10px] opacity-80">({awayTeam?.keyPlayers?.length ?? 0} Stars)</span>
                  </button>
                </div>

                <span className="text-xs font-mono text-stone-600 dark:text-slate-400 hidden sm:inline">
                  Click any athlete to view scouting radar
                </span>
              </div>

              {/* Player Grid & Deep Radar Inspector */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Player List (Left) */}
                <div className="lg:col-span-5 space-y-3">
                  {currentRoster.map((player) => {
                    const isSelected = selectedPlayer.id === player.id;
                    return (
                      <div
                        key={player.id}
                        onClick={() => setSelectedPlayer(player)}
                        className={`rounded-xl border p-4 cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#DFD9CE] border-emerald-600 shadow-sm dark:bg-slate-900 dark:border-emerald-500'
                            : 'bg-[#EAE5DD] border-stone-300 hover:bg-[#E2DDD3] dark:bg-slate-950/70 dark:border-slate-800/80 dark:hover:bg-slate-900/40'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full overflow-hidden bg-stone-300 dark:bg-slate-800 shrink-0 border border-stone-400 dark:border-slate-700">
                            <img
                              src={player.avatar}
                              alt={player.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <h4 className="text-sm font-bold text-stone-900 dark:text-white truncate">
                                {player.name}
                              </h4>
                              <span className="font-mono text-xs font-extrabold text-emerald-800 bg-emerald-600/15 dark:text-emerald-400 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-600/30">
                                {player.rating}/10
                              </span>
                            </div>

                            <p className="text-xs text-stone-600 dark:text-slate-400 truncate">
                              {player.position} {player.number ? `• #${player.number}` : ''} {player.nationality ? `• ${player.nationality}` : ''}
                            </p>

                            <div className="mt-1 flex items-center justify-between text-[11px] font-mono text-stone-600 dark:text-slate-400">
                              <div className="flex items-center gap-1">
                                <span>Form:</span>
                                {(player.form || []).slice(0, 4).map((f, i) => (
                                  <span
                                    key={i}
                                    className={`w-3.5 h-3.5 rounded text-[8px] font-bold flex items-center justify-center ${
                                      f === 'W'
                                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400'
                                        : f === 'D'
                                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400'
                                        : 'bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-400'
                                    }`}
                                  >
                                    {f}
                                  </span>
                                ))}
                              </div>
                              <span className="text-emerald-800 dark:text-emerald-300 font-semibold">
                                {player.injuryStatus === 'healthy' ? 'Fit & Ready' : player.injuryStatus}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {currentRoster.length === 0 && (
                    <div className="p-4 rounded-xl bg-[#EAE5DD] dark:bg-slate-900/60 border border-stone-300 text-center text-xs text-stone-600">
                      No star athlete profile entries recorded for this team.
                    </div>
                  )}
                </div>

                {/* Selected Player Detail & Radar (Right) */}
                <div className="lg:col-span-7 rounded-xl border border-stone-300 dark:border-slate-800 bg-[#EAE5DD] dark:bg-slate-900/60 p-5 space-y-5">
                  {!isVIP ? (
                    <div className="py-8 px-4 text-center space-y-4">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-600/15 border border-emerald-600/30 text-emerald-800 dark:bg-emerald-500/20 dark:border-emerald-500/40 dark:text-emerald-400 mx-auto flex items-center justify-center">
                        <Lock className="w-7 h-7" />
                      </div>
                      <div>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-600/10 text-emerald-900 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-600/20 text-[10px] font-mono font-bold uppercase tracking-wider">
                          Scouting Radar Gated
                        </span>
                        <h4 className="text-lg font-black text-stone-900 dark:text-white mt-2">
                          Unlock Player Radar &amp; Scouting Intelligence
                        </h4>
                        <p className="text-xs text-stone-700 dark:text-slate-300 max-w-md mx-auto mt-1 leading-relaxed">
                          6-axis player athletic radar charts, head-to-head performance metrics, and historical scouting logs are protected. Pay via Paystack to unlock immediately and get redirected to our VIP WhatsApp Channel!
                        </p>
                      </div>

                      <button
                        onClick={onOpenPaywall}
                        className="py-2.5 px-5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white dark:bg-gradient-to-r dark:from-emerald-500 dark:to-teal-400 dark:text-slate-950 font-black text-xs shadow-md transition-all flex items-center gap-2 mx-auto cursor-pointer"
                      >
                        <Unlock className="w-4 h-4" />
                        <span>Pay with Paystack &amp; Join VIP WhatsApp Channel</span>
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-300 dark:border-slate-800">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-bold text-stone-900 dark:text-white">{selectedPlayer.name}</h3>
                            <span className="text-xs px-2 py-0.5 rounded bg-[#DFD9CE] dark:bg-slate-800 font-mono text-stone-700 dark:text-slate-300">
                              {selectedPlayer.position}
                            </span>
                          </div>
                          <p className="text-xs text-stone-600 dark:text-slate-400 mt-0.5">
                            Historical Performance Index & Scouting Profile
                          </p>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] font-mono text-stone-600 dark:text-slate-400 block uppercase font-semibold">
                            AI Overall Rating
                          </span>
                          <span className="text-2xl font-black font-mono text-emerald-800 dark:text-emerald-400">
                            {selectedPlayer.rating} <span className="text-sm text-stone-500 dark:text-slate-500">/ 10</span>
                          </span>
                        </div>
                      </div>

                      {/* Radar Chart + Attributes */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                        <div className="flex justify-center p-2 bg-[#DFD9CE] dark:bg-slate-950/60 rounded-xl border border-stone-300 dark:border-slate-800/80">
                          <PlayerRadarChart
                            stats={selectedPlayer.radarStats || DEFAULT_PLAYER.radarStats}
                            playerName={selectedPlayer.name}
                            size={210}
                          />
                        </div>

                        {/* Key Quantitative Metrics Grid */}
                        <div className="space-y-2">
                          <span className="text-xs font-mono uppercase tracking-wider text-stone-700 dark:text-slate-400 block font-bold mb-2">
                            Season & Head-to-Head Metrics
                          </span>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            {Object.entries(selectedPlayer.keyMetrics || {}).map(([statName, val], idx) => (
                              <div
                                key={idx}
                                className="p-2.5 rounded-lg bg-[#DFD9CE] border border-stone-300/80 dark:bg-slate-950/80 dark:border-slate-800 flex flex-col"
                              >
                                <span className="text-[10px] text-stone-600 dark:text-slate-400 truncate">{statName}</span>
                                <span className="font-mono font-bold text-stone-900 dark:text-slate-100 text-sm mt-0.5 truncate">
                                  {String(val)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Historical Scouting Notes */}
                      {selectedPlayer.historicalNotes && (
                        <div className="p-3.5 rounded-lg bg-[#DFD9CE] border border-stone-300/80 dark:bg-slate-950/80 dark:border-slate-800/80 text-xs">
                          <span className="font-mono text-emerald-800 dark:text-emerald-400 font-bold block mb-1">
                            Historical Match Factor:
                          </span>
                          <p className="text-stone-800 dark:text-slate-300 leading-relaxed">
                            {selectedPlayer.historicalNotes}
                          </p>
                        </div>
                      )}

                      {/* Recent Match Logs */}
                      {(selectedPlayer.recentPerformances?.length ?? 0) > 0 && (
                        <div>
                          <span className="text-xs font-mono uppercase tracking-wider text-stone-700 dark:text-slate-400 block font-bold mb-2">
                            Recent High-Stakes Fixtures
                          </span>
                          <div className="space-y-2">
                            {selectedPlayer.recentPerformances.map((perf, pIdx) => (
                              <div
                                key={pIdx}
                                className="flex items-center justify-between p-2.5 rounded-lg bg-[#DFD9CE] border border-stone-300/80 dark:bg-slate-950/50 dark:border-slate-800 text-xs"
                              >
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold text-stone-900 dark:text-slate-200">vs {perf.opponent}</span>
                                    {perf.score && (
                                      <span className="font-mono text-stone-600 dark:text-slate-400 text-[11px]">({perf.score})</span>
                                    )}
                                  </div>
                                  <span className="text-[11px] text-stone-600 dark:text-slate-400 block mt-0.5">
                                    {perf.statSummary}
                                  </span>
                                </div>
                                <span className="font-mono font-bold text-emerald-800 bg-emerald-600/15 dark:text-emerald-400 dark:bg-emerald-500/10 px-2 py-0.5 rounded text-[11px]">
                                  {perf.rating}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: 1,000 MONTE CARLO SIMULATION */}
          {activeTab === 'simulation' && (
            <div className="space-y-6">
              {!isVIP ? (
                <div className="rounded-2xl border-2 border-emerald-600/40 dark:border-emerald-500/40 bg-[#E5DFD5] dark:bg-gradient-to-br dark:from-emerald-950/60 dark:via-slate-900 dark:to-indigo-950/50 p-6 sm:p-8 text-center space-y-4 shadow-md">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-600/15 border border-emerald-600/30 text-emerald-800 dark:bg-emerald-500/20 dark:border-emerald-500/40 dark:text-emerald-400 mx-auto flex items-center justify-center">
                    <Lock className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white">
                    1,000 Monte Carlo Simulation Engine (VIP Exclusive)
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-700 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                    Stochastic simulation generating 1,000 randomized match runs, calculating exact score frequencies, and calibrating the statistical Over/Under lines.
                  </p>
                  <button
                    onClick={onOpenPaywall}
                    className="py-3 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white dark:bg-gradient-to-r dark:from-emerald-500 dark:to-teal-400 dark:text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 mx-auto cursor-pointer"
                  >
                    <Unlock className="w-4 h-4" />
                    <span>Unlock 1,000 Sim & Join WhatsApp VIP</span>
                  </button>
                </div>
              ) : prediction?.monteCarloSim ? (
                <>
                  <div className="rounded-xl border border-stone-300 dark:border-slate-800 bg-[#EAE5DD] dark:bg-slate-900/60 p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <div>
                        <h3 className="text-base font-bold text-stone-900 dark:text-white flex items-center gap-2">
                          <Activity className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                          <span>1,000 Iteration Match Engine Simulation</span>
                        </h3>
                        <p className="text-xs text-stone-600 dark:text-slate-400 mt-0.5">
                          Stochastic Monte Carlo simulation modeling 1,000 game paths utilizing player expected goals, shooting efficiency, and referee factor.
                        </p>
                      </div>

                      <span className="px-2.5 py-1 rounded bg-[#DFD9CE] dark:bg-slate-800 font-mono text-xs text-stone-700 dark:text-slate-300 font-bold border border-stone-300 dark:border-slate-700">
                        Simulations: 1,000 Run
                      </span>
                    </div>

                    {/* Simulation Outcome Win % */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center my-4">
                      <div className="p-4 rounded-xl bg-[#DFD9CE] border border-emerald-600/30 dark:bg-slate-950/80 dark:border-emerald-500/30">
                        <span className="text-xs font-mono text-stone-700 dark:text-slate-400 font-semibold">{homeTeam.name} Win</span>
                        <div className="text-2xl font-black font-mono text-emerald-800 dark:text-emerald-400 mt-1">
                          {prediction.monteCarloSim.homeWinPct}%
                        </div>
                      </div>

                      {prediction.monteCarloSim.drawPct !== undefined && (
                        <div className="p-4 rounded-xl bg-[#DFD9CE] border border-amber-600/30 dark:bg-slate-950/80 dark:border-amber-500/30">
                          <span className="text-xs font-mono text-stone-700 dark:text-slate-400 font-semibold">Draw / Stalemate</span>
                          <div className="text-2xl font-black font-mono text-amber-800 dark:text-amber-400 mt-1">
                            {prediction.monteCarloSim.drawPct}%
                          </div>
                        </div>
                      )}

                      <div className="p-4 rounded-xl bg-[#DFD9CE] border border-indigo-600/30 dark:bg-slate-950/80 dark:border-indigo-500/30">
                        <span className="text-xs font-mono text-stone-700 dark:text-slate-400 font-semibold">{awayTeam.name} Win</span>
                        <div className="text-2xl font-black font-mono text-indigo-800 dark:text-indigo-400 mt-1">
                          {prediction.monteCarloSim.awayWinPct}%
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Most Likely Scoreline Distribution */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-xl border border-stone-300 dark:border-slate-800 bg-[#EAE5DD] dark:bg-slate-900/60 p-5">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-stone-700 dark:text-slate-400 font-bold mb-3">
                        Most Frequent Scorelines
                      </h4>
                      <div className="space-y-3">
                        {(prediction.monteCarloSim.mostLikelyScores || []).map((item, idx) => (
                          <div key={idx} className="space-y-1">
                            <div className="flex justify-between text-xs font-mono">
                              <span className="font-bold text-stone-900 dark:text-white">{item.score}</span>
                              <span className="text-emerald-800 dark:text-emerald-400 font-bold">{item.pct}% probability</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-stone-300 dark:bg-slate-800 overflow-hidden">
                              <div
                                className="bg-emerald-600 dark:bg-emerald-500 h-full rounded-full transition-all duration-500"
                                style={{ width: `${Math.min(item.pct * 3.5, 100)}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Total Over/Under Market Calibration */}
                    <div className="rounded-xl border border-stone-300 dark:border-slate-800 bg-[#EAE5DD] dark:bg-slate-900/60 p-5 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-wider text-stone-700 dark:text-slate-400 font-bold mb-3">
                          Total Line Projection (Over / Under)
                        </h4>
                        <div className="p-4 rounded-xl bg-[#DFD9CE] border border-stone-300 dark:bg-slate-950 dark:border-slate-800 text-center">
                          <span className="text-xs font-mono text-stone-600 dark:text-slate-400 font-semibold">Statistical Market Line</span>
                          <div className="text-3xl font-black font-mono text-stone-950 dark:text-white mt-1">
                            {prediction.monteCarloSim.totalOverUnder.line} Goals/Pts
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-3">
                          <div className="p-3 rounded-lg bg-[#DFD9CE] border border-stone-300/80 dark:bg-slate-950 dark:border-slate-800 text-center">
                            <span className="text-[11px] font-mono text-stone-600 dark:text-slate-400">Over {prediction.monteCarloSim.totalOverUnder.line}</span>
                            <div className="text-lg font-bold font-mono text-emerald-800 dark:text-emerald-400">
                              {prediction.monteCarloSim.totalOverUnder.overPct}%
                            </div>
                          </div>

                          <div className="p-3 rounded-lg bg-[#DFD9CE] border border-stone-300/80 dark:bg-slate-950 dark:border-slate-800 text-center">
                            <span className="text-[11px] font-mono text-stone-600 dark:text-slate-400">Under {prediction.monteCarloSim.totalOverUnder.line}</span>
                            <div className="text-lg font-bold font-mono text-indigo-800 dark:text-indigo-400">
                              {prediction.monteCarloSim.totalOverUnder.underPct}%
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="mt-3 text-[11px] text-stone-600 dark:text-slate-400 font-mono">
                        Calibrated across 5-season historical goal differential data for both clubs.
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-10 bg-[#EAE5DD] dark:bg-slate-900/40 rounded-xl border border-stone-300 dark:border-slate-800">
                  <p className="text-xs text-stone-600 dark:text-slate-400">Run the forecast model to activate Monte Carlo simulations.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: WHAT-IF SCENARIO SIMULATOR */}
          {activeTab === 'whatif' && (
            <div className="space-y-6">
              {!isVIP ? (
                <div className="rounded-2xl border-2 border-indigo-500/40 bg-[#E5DFD5] dark:bg-gradient-to-br dark:from-indigo-950/60 dark:via-slate-900 dark:to-slate-950 p-6 sm:p-8 text-center space-y-4 shadow-md">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-600/15 border border-indigo-600/30 text-indigo-800 dark:bg-indigo-500/20 dark:border-indigo-500/40 dark:text-indigo-400 mx-auto flex items-center justify-center">
                    <SlidersHorizontal className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white">
                    Interactive Lineup & What-If Simulator (VIP Exclusive)
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-700 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                    Bench key star athletes, introduce adverse rain or high-altitude weather, adjust crowd cauldron intensity, and re-compute AI odds on the fly.
                  </p>
                  <button
                    onClick={onOpenPaywall}
                    className="py-3 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white dark:bg-gradient-to-r dark:from-emerald-500 dark:to-teal-400 dark:text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 mx-auto cursor-pointer"
                  >
                    <Unlock className="w-4 h-4" />
                    <span>Unlock Simulator & Join WhatsApp VIP</span>
                  </button>
                </div>
              ) : (
                <>
                  <div className="rounded-xl border border-indigo-300/80 dark:border-indigo-500/30 bg-[#E6E8EF] dark:bg-indigo-950/20 p-5">
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal className="w-5 h-5 text-indigo-700 dark:text-indigo-400" />
                      <h3 className="text-base font-bold text-stone-900 dark:text-white">Interactive Scenario & Lineup Simulator</h3>
                    </div>
                    <p className="text-xs text-stone-700 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
                      Modify match circumstances—bench a star player, introduce adverse weather, or neutralize home advantage—and re-run the AI prediction engine to see the impact on win probabilities and tactical outcomes.
                    </p>
                  </div>

                  {/* Roster Absences / Benching Selector */}
                  <div className="rounded-xl border border-stone-300 dark:border-slate-800 bg-[#EAE5DD] dark:bg-slate-900/60 p-5">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-stone-800 dark:text-slate-300 font-bold mb-3 flex items-center justify-between">
                      <span>Simulate Player Absences / Rest / Red Cards</span>
                      <span className="text-[11px] text-stone-600 dark:text-slate-400 normal-case">
                        ({absentPlayerIds.length} players benched)
                      </span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Home Players */}
                      <div>
                        <span className="text-xs font-bold text-stone-800 dark:text-slate-300 block mb-2">{homeTeam.name}</span>
                        <div className="space-y-2">
                          {(homeTeam.keyPlayers || []).map((player) => {
                            const isAbsent = absentPlayerIds.includes(player.id);
                            return (
                              <button
                                key={player.id}
                                onClick={() => togglePlayerAbsence(player.id)}
                                className={`w-full flex items-center justify-between p-2.5 rounded-lg border text-xs transition-all cursor-pointer ${
                                  isAbsent
                                    ? 'bg-rose-100 border-rose-300 text-rose-900 dark:bg-rose-950/40 dark:border-rose-500/50 dark:text-rose-300'
                                    : 'bg-[#DFD9CE] border-stone-300 text-stone-800 hover:bg-[#D4CEBF] dark:bg-slate-950 dark:border-slate-800 dark:text-slate-300'
                                }`}
                              >
                                <span className="font-semibold">{player.name} ({player.position})</span>
                                <span
                                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                                    isAbsent
                                      ? 'bg-rose-200 text-rose-900 dark:bg-rose-500/20 dark:text-rose-300'
                                      : 'bg-stone-300 text-stone-700 dark:bg-slate-800 dark:text-slate-400'
                                  }`}
                                >
                                  {isAbsent ? 'OUT / BENCHED' : 'STARTS'}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Away Players */}
                      <div>
                        <span className="text-xs font-bold text-stone-800 dark:text-slate-300 block mb-2">{awayTeam.name}</span>
                        <div className="space-y-2">
                          {(awayTeam.keyPlayers || []).map((player) => {
                            const isAbsent = absentPlayerIds.includes(player.id);
                            return (
                              <button
                                key={player.id}
                                onClick={() => togglePlayerAbsence(player.id)}
                                className={`w-full flex items-center justify-between p-2.5 rounded-lg border text-xs transition-all cursor-pointer ${
                                  isAbsent
                                    ? 'bg-rose-100 border-rose-300 text-rose-900 dark:bg-rose-950/40 dark:border-rose-500/50 dark:text-rose-300'
                                    : 'bg-[#DFD9CE] border-stone-300 text-stone-800 hover:bg-[#D4CEBF] dark:bg-slate-950 dark:border-slate-800 dark:text-slate-300'
                                }`}
                              >
                                <span className="font-semibold">{player.name} ({player.position})</span>
                                <span
                                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                                    isAbsent
                                      ? 'bg-rose-200 text-rose-900 dark:bg-rose-500/20 dark:text-rose-300'
                                      : 'bg-stone-300 text-stone-700 dark:bg-slate-800 dark:text-slate-400'
                                  }`}
                                >
                                  {isAbsent ? 'OUT / BENCHED' : 'STARTS'}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Weather & Venue Modifier Selectors */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Weather */}
                    <div className="rounded-xl border border-stone-300 dark:border-slate-800 bg-[#EAE5DD] dark:bg-slate-900/60 p-4">
                      <label className="text-xs font-mono uppercase tracking-wider text-stone-700 dark:text-slate-400 font-bold block mb-2">
                        Environmental Conditions
                      </label>
                      <select
                        value={weatherModifier}
                        onChange={(e) => setWeatherModifier(e.target.value)}
                        className="w-full bg-[#DFD9CE] border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-600"
                      >
                        <option value="Standard">Standard / Ideal Weather (20°C)</option>
                        <option value="Torrential Rain / Waterlogged Pitch">Torrential Rain / Waterlogged Pitch (Favors Physicality)</option>
                        <option value="High Altitude (2,200m+)">High Altitude (Faster balls, tests stamina)</option>
                        <option value="Extreme Summer Heat (35°C+)">Extreme Summer Heat (Lowers press intensity)</option>
                      </select>
                    </div>

                    {/* Venue Advantage */}
                    <div className="rounded-xl border border-stone-300 dark:border-slate-800 bg-[#EAE5DD] dark:bg-slate-900/60 p-4">
                      <label className="text-xs font-mono uppercase tracking-wider text-stone-700 dark:text-slate-400 font-bold block mb-2">
                        Crowd & Stadium Setting
                      </label>
                      <select
                        value={venueModifier}
                        onChange={(e) => setVenueModifier(e.target.value)}
                        className="w-full bg-[#DFD9CE] border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-600"
                      >
                        <option value="Normal Home Advantage">Standard Home Arena Advantage (+10% Win Pct)</option>
                        <option value="Hostile Cauldron (80,000+ Fans)">Extreme Hostile Cauldron Atmosphere (+18% Win Pct)</option>
                        <option value="Neutral Venue (Cup Final)">Neutral Ground (0% Venue Bias)</option>
                        <option value="Empty Stadium / Closed Doors">Closed Doors Match</option>
                      </select>
                    </div>
                  </div>

                  {/* Run What-If Button */}
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={handleApplyWhatIf}
                      disabled={isPredicting}
                      className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white dark:bg-gradient-to-r dark:from-emerald-500 dark:to-teal-500 dark:text-slate-950 font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
                    >
                      <RefreshCw className={`w-4 h-4 ${isPredicting ? 'animate-spin' : ''}`} />
                      <span>Re-Compute Forecast with Custom Modifiers</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Modal Bottom Bar */}
        <div className="border-t border-stone-300 dark:border-slate-800 px-6 py-3.5 bg-[#E5DFD5] dark:bg-slate-900/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-stone-700 dark:text-slate-400 font-mono text-[11px]">
            <Brain className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
            <span>Model: {prediction?.modelUsed || 'Gemini 2.5 Flash (Sports Engine)'}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onRunPrediction(match.id)}
              disabled={isPredicting}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-slate-950 font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50 shadow-xs"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isPredicting ? 'animate-spin' : ''}`} />
              <span>{isPredicting ? 'Simulating...' : 'Recalculate Odds'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
