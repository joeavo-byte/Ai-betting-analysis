import React from 'react';
import {
  Calendar,
  MapPin,
  Flame,
  TrendingUp,
  Brain,
  Shield,
  ChevronRight,
  Sparkles,
  Users,
  Activity,
  Lock,
  ShieldCheck,
  MessageCircle
} from 'lucide-react';
import { Match } from '../types.ts';

interface MatchCardProps {
  match: Match;
  onOpenDetails: (match: Match) => void;
  onRunPrediction: (matchId: string) => void;
  isPredicting?: boolean;
  isVIP?: boolean;
  onOpenPaywall?: (match: Match) => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({
  match,
  onOpenDetails,
  onRunPrediction,
  isPredicting = false,
  isVIP = false,
  onOpenPaywall,
}) => {
  const { homeTeam, awayTeam, prediction, headToHead } = match;

  const renderFormPills = (form: ('W' | 'D' | 'L')[]) => {
    return (
      <div className="flex items-center gap-1">
        {form.slice(0, 5).map((res, i) => (
          <span
            key={i}
            className={`w-4 h-4 rounded text-[9px] font-mono font-bold flex items-center justify-center ${
              res === 'W'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : res === 'D'
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
            }`}
          >
            {res}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="group relative rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-5 shadow-lg hover:border-slate-700 hover:shadow-emerald-500/5 transition-all duration-300 flex flex-col justify-between">
      {/* Top Match Metadata */}
      <div>
        <div className="flex items-center justify-between gap-2 pb-3.5 border-b border-slate-800/80 text-xs">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium text-[11px] border border-slate-700/60 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              {match.tournament}
            </span>
            <span className="text-slate-400 font-mono text-[11px] hidden sm:inline">
              {match.roundOrStage}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded text-[11px] font-mono font-semibold">
              <Flame className="w-3.5 h-3.5" />
              <span>{match.importanceScore} / 100</span>
            </div>

            {isVIP ? (
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                VIP
              </span>
            ) : (
              <button
                type="button"
                onClick={() => (onOpenPaywall ? onOpenPaywall(match) : onOpenDetails(match))}
                className="px-2 py-0.5 rounded bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold flex items-center gap-1 cursor-pointer transition-all"
                title="Unlock VIP details & WhatsApp redirect"
              >
                <Lock className="w-3 h-3 text-emerald-400" />
                <span>VIP Dossier</span>
              </button>
            )}
          </div>
        </div>

        {/* Headline */}
        <h3 className="mt-3 text-sm font-semibold text-slate-200 line-clamp-1 group-hover:text-white transition-colors">
          {match.headline}
        </h3>

        {/* Date, Time & Venue */}
        <div className="mt-2 flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>{match.date} • {match.time}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-500" />
            <span className="truncate max-w-[170px]">{match.venue}, {match.city}</span>
          </div>
        </div>

        {/* Team Matchup Banner */}
        <div className="mt-4 grid grid-cols-11 items-center gap-2 bg-slate-950/60 rounded-xl p-3.5 border border-slate-800/80">
          {/* Home Team */}
          <div className="col-span-5 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-800 border-2 border-slate-700/80 flex items-center justify-center p-1 shadow-inner">
              <img
                src={homeTeam.logo}
                alt={homeTeam.name}
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <h4 className="mt-2 text-sm font-bold text-slate-100 line-clamp-1">
              {homeTeam.name}
            </h4>
            <span className="text-[11px] text-slate-400 font-mono mt-0.5">
              {homeTeam.league}
            </span>
            <div className="mt-1.5 flex items-center gap-1">
              {renderFormPills(homeTeam.recentForm)}
            </div>
          </div>

          {/* VS & Head-to-Head */}
          <div className="col-span-1 flex flex-col items-center justify-center text-center">
            <span className="w-8 h-8 rounded-full bg-slate-800/90 border border-slate-700 flex items-center justify-center text-xs font-mono font-bold text-slate-300 shadow-sm">
              VS
            </span>
            <span className="mt-1 text-[9px] font-mono text-slate-500 whitespace-nowrap">
              H2H: {headToHead.homeWins}-{headToHead.draws ?? 0}-{headToHead.awayWins}
            </span>
          </div>

          {/* Away Team */}
          <div className="col-span-5 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-800 border-2 border-slate-700/80 flex items-center justify-center p-1 shadow-inner">
              <img
                src={awayTeam.logo}
                alt={awayTeam.name}
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <h4 className="mt-2 text-sm font-bold text-slate-100 line-clamp-1">
              {awayTeam.name}
            </h4>
            <span className="text-[11px] text-slate-400 font-mono mt-0.5">
              {awayTeam.league}
            </span>
            <div className="mt-1.5 flex items-center gap-1">
              {renderFormPills(awayTeam.recentForm)}
            </div>
          </div>
        </div>

        {/* Star Player Duel Spotlight */}
        <div className="mt-3.5 px-3 py-2 rounded-lg bg-slate-900/40 border border-slate-800/60 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-slate-400 font-medium">Key Player Duel:</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span className="text-slate-200 font-semibold truncate max-w-[100px]">
              {homeTeam.keyPlayers[0]?.name || 'Home Star'}
            </span>
            <span className="text-slate-500">⚔️</span>
            <span className="text-slate-200 font-semibold truncate max-w-[100px]">
              {awayTeam.keyPlayers[0]?.name || 'Away Star'}
            </span>
          </div>
        </div>

        {/* AI Prediction Section */}
        {prediction ? (
          <div className="mt-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 p-3 text-xs">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold font-mono">
                <Brain className="w-3.5 h-3.5" />
                <span>AI Predicted Winner:</span>
              </div>
              <div className="flex items-center gap-1 bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold text-[11px]">
                <span>{prediction.confidence}% Conviction</span>
              </div>
            </div>

            <div className="flex items-baseline justify-between">
              <div className="text-base font-extrabold text-white">
                {prediction.winnerName}
              </div>
              <div className="font-mono text-xs font-bold text-slate-300">
                Score: <span className="text-emerald-400">{prediction.projectedScore.home} - {prediction.projectedScore.away}</span>
              </div>
            </div>

            {/* Probability Bars */}
            <div className="mt-2.5">
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                <span>{homeTeam.shortName} {prediction.probabilities.home}%</span>
                {prediction.probabilities.draw !== undefined && prediction.probabilities.draw > 0 && (
                  <span>Draw {prediction.probabilities.draw}%</span>
                )}
                <span>{awayTeam.shortName} {prediction.probabilities.away}%</span>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden bg-slate-800 flex">
                <div
                  className="bg-emerald-500 h-full transition-all duration-500"
                  style={{ width: `${prediction.probabilities.home}%` }}
                  title={`${homeTeam.name}: ${prediction.probabilities.home}%`}
                />
                {prediction.probabilities.draw !== undefined && prediction.probabilities.draw > 0 && (
                  <div
                    className="bg-amber-500/80 h-full transition-all duration-500"
                    style={{ width: `${prediction.probabilities.draw}%` }}
                    title={`Draw: ${prediction.probabilities.draw}%`}
                  />
                )}
                <div
                  className="bg-indigo-500 h-full transition-all duration-500"
                  style={{ width: `${prediction.probabilities.away}%` }}
                  title={`${awayTeam.name}: ${prediction.probabilities.away}%`}
                />
              </div>
            </div>

            {/* Quick Historical Proof Snippet */}
            {prediction.historicalPerformanceBreakdown?.[0] && (
              <div className="mt-2.5 pt-2 border-t border-emerald-500/20 text-[11px] text-slate-300 flex items-start gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="line-clamp-2">
                  <strong className="text-emerald-300 font-medium">Historical Factor:</strong>{' '}
                  {prediction.historicalPerformanceBreakdown[0].statProof}
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-3.5 rounded-xl bg-slate-900/60 border border-slate-800 p-3 text-center text-xs text-slate-400">
            <span>Historical player performance metrics compiled and ready for model inference.</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex items-center gap-2">
        <button
          onClick={() => onOpenDetails(match)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-semibold transition-all cursor-pointer border border-slate-700 shadow-sm"
        >
          <span>Deep Forecast & Stats</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        </button>

        <button
          onClick={() => onRunPrediction(match.id)}
          disabled={isPredicting}
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 text-xs font-semibold transition-all cursor-pointer disabled:opacity-50"
          title="Run fresh AI prediction on player metrics"
        >
          <Sparkles className={`w-3.5 h-3.5 ${isPredicting ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">{prediction ? 'Re-Predict' : 'Predict'}</span>
        </button>
      </div>
    </div>
  );
};
