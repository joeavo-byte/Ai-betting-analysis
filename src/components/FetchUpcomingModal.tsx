import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Search,
  Trophy,
  Activity,
  Globe,
  Loader2,
  CheckCircle2,
  ArrowRight,
  Layers,
  Flame
} from 'lucide-react';

interface FetchUpcomingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFetchMatches: (sport: string, query: string) => Promise<{ success: boolean; count?: number; message?: string }>;
}

export const FetchUpcomingModal: React.FC<FetchUpcomingModalProps> = ({
  isOpen,
  onClose,
  onFetchMatches,
}) => {
  const [selectedSport, setSelectedSport] = useState<string>('all');
  const [customQuery, setCustomQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [resultMsg, setResultMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleFetch = async (overrideSport?: string, overrideQuery?: string) => {
    setLoading(true);
    setResultMsg(null);
    const sportToUse = overrideSport || selectedSport;
    const queryToUse = overrideQuery !== undefined ? overrideQuery : customQuery;

    try {
      const res = await onFetchMatches(sportToUse, queryToUse);
      if (res.success) {
        setResultMsg({
          type: 'success',
          text: res.message || `Successfully synced ${res.count ?? 'new'} authentic blockbuster fixtures across leagues!`,
        });
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setResultMsg({
          type: 'error',
          text: res.message || 'Could not fetch new fixtures. Retaining current match roster.',
        });
      }
    } catch (err: any) {
      setResultMsg({
        type: 'error',
        text: err?.message || 'Failed to sync upcoming matches.',
      });
    } finally {
      setLoading(false);
    }
  };

  const leaguePresets = [
    { label: '🇬🇧 Premier League Showdowns', sport: 'football', query: 'Premier League' },
    { label: '🏆 UEFA Champions League', sport: 'football', query: 'Champions League' },
    { label: '🇪🇸 Spanish La Liga / El Clásico', sport: 'football', query: 'La Liga' },
    { label: '🇮🇹 Italian Serie A Derbies', sport: 'football', query: 'Serie A' },
    { label: '🇩🇪 German Bundesliga / Der Klassiker', sport: 'football', query: 'Bundesliga' },
    { label: '🇫🇷 French Ligue 1 / Le Classique', sport: 'football', query: 'Ligue 1' },
    { label: '🏀 NBA Playoffs & Primetime', sport: 'basketball', query: 'NBA' },
    { label: '🎾 Grand Slam Tennis Finals', sport: 'tennis', query: 'Tennis' },
    { label: '🏈 NFL Primetime Showdowns', sport: 'american_football', query: 'NFL' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 dark:bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-2xl border border-stone-300 dark:border-slate-800 bg-[#F5F2EB] dark:bg-slate-950 text-stone-900 dark:text-slate-100 shadow-2xl p-6 overflow-hidden my-8 transition-colors">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-300 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-white">Fetch Live Upcoming Big Matches</h3>
              <p className="text-xs text-stone-500 dark:text-slate-400">Sync all major world leagues, tournaments & star players</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-stone-500 dark:text-slate-300 hover:text-stone-900 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="mt-5 space-y-4">
          {/* Quick Slate Batch Sync Banner */}
          <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-50/60 dark:bg-emerald-950/20 flex items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                <Flame className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Full International Slate (20+ Matches)</span>
              </div>
              <p className="text-[11px] text-stone-600 dark:text-slate-400 mt-0.5">
                Loads complete fixtures across Premier League, La Liga, Serie A, Bundesliga, NBA, Tennis & NFL.
              </p>
            </div>
            <button
              type="button"
              disabled={loading}
              onClick={() => handleFetch('all', 'sync-all')}
              className="shrink-0 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-bold text-xs transition-all cursor-pointer shadow-sm flex items-center gap-1 disabled:opacity-50"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Sync All Slate</span>
            </button>
          </div>

          {/* Sport Selector */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-stone-500 dark:text-slate-400 font-semibold block mb-2">
              Filter by Sport Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'all', label: 'All Big Sports' },
                { id: 'football', label: 'Football / Soccer' },
                { id: 'basketball', label: 'Basketball (NBA)' },
                { id: 'tennis', label: 'Tennis (Grand Slams)' },
                { id: 'american_football', label: 'American Football' },
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedSport(s.id)}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer text-left ${
                    selectedSport === s.id
                      ? 'bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-400 shadow-sm'
                      : 'bg-stone-50 dark:bg-slate-900 border-stone-200 dark:border-slate-800 text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-slate-200 hover:border-stone-300 dark:hover:border-slate-700'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Search / Query Input */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-stone-500 dark:text-slate-400 font-semibold block mb-1.5">
              Specific Match, League or Team
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={customQuery}
                onChange={(e) => setCustomQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleFetch();
                  }
                }}
                placeholder="e.g. Serie A, Chelsea vs Tottenham, Arsenal, Lakers, Alcaraz..."
                className="w-full bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-stone-900 dark:text-slate-100 placeholder-stone-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Major League Quick Presets */}
          <div>
            <span className="text-[11px] font-mono text-stone-500 dark:text-slate-400 block mb-1.5 uppercase font-semibold">
              Or pick a major league / tournament to fetch:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {leaguePresets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  disabled={loading}
                  onClick={() => {
                    setSelectedSport(preset.sport);
                    setCustomQuery(preset.query);
                    handleFetch(preset.sport, preset.query);
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-stone-50 hover:bg-stone-100 dark:bg-slate-900 dark:hover:bg-slate-800/80 border border-stone-200 dark:border-slate-800 hover:border-emerald-500/50 text-[11px] text-stone-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all cursor-pointer text-left flex items-center justify-between"
                >
                  <span>{preset.label}</span>
                  <ArrowRight className="w-3 h-3 text-stone-400 dark:text-slate-600 group-hover:text-emerald-500" />
                </button>
              ))}
            </div>
          </div>

          {/* Feedback message */}
          {resultMsg && (
            <div
              className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                resultMsg.type === 'success'
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/40 text-emerald-800 dark:text-emerald-300'
                  : 'bg-rose-50 dark:bg-rose-950/40 border-rose-500/40 text-rose-800 dark:text-rose-300'
              }`}
            >
              {resultMsg.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              ) : (
                <X className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
              )}
              <span>{resultMsg.text}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-stone-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-[11px] font-mono text-stone-400 dark:text-slate-500">
            Multi-League Sports Grounding Engine
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-2 rounded-xl text-xs text-stone-500 hover:text-stone-800 dark:text-slate-400 dark:hover:text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => handleFetch()}
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Searching Sports Intel...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Sync {customQuery ? `"${customQuery}"` : 'Matches'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
