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
  ArrowRight
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
  const [selectedSport, setSelectedSport] = useState<string>('football');
  const [customQuery, setCustomQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [resultMsg, setResultMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleFetch = async () => {
    setLoading(true);
    setResultMsg(null);
    try {
      const res = await onFetchMatches(selectedSport, customQuery);
      if (res.success) {
        setResultMsg({
          type: 'success',
          text: `Successfully synced ${res.count ?? 'new'} blockbuster fixtures and compiled historical player stats!`,
        });
        setTimeout(() => {
          onClose();
        }, 1400);
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

  const presetQueries = [
    { label: 'UEFA Champions League Knockouts', sport: 'football', query: 'Champions League Semi-Finals and Final' },
    { label: 'El Clásico / Real Madrid vs Barcelona', sport: 'football', query: 'Real Madrid vs Barcelona La Liga' },
    { label: 'NBA Playoffs / Conference Finals', sport: 'basketball', query: 'NBA Conference Finals Game 1' },
    { label: 'Wimbledon / Roland Garros Final', sport: 'tennis', query: 'Wimbledon Men Singles Final Alcaraz Sinner Djokovic' },
    { label: 'NFL Super Bowl / Marquee Showdown', sport: 'american_football', query: 'NFL marquee rivalry game Chiefs vs 49ers' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-950 text-slate-100 shadow-2xl p-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Fetch Live Upcoming Big Matches</h3>
              <p className="text-xs text-slate-400">AI Sports Grounding & Fixture Intelligence</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="mt-5 space-y-4">
          {/* Sport Selector */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block mb-2">
              Select Sport Category
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
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
                      ? 'bg-emerald-500/15 border-emerald-500 text-emerald-400 shadow-sm'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Search / Query Input */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block mb-2">
              Target Competition, Team or Rivalry (Optional)
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={customQuery}
                onChange={(e) => setCustomQuery(e.target.value)}
                placeholder="e.g. Champions League Final, or Lakers vs Warriors..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Quick Presets */}
          <div>
            <span className="text-[11px] font-mono text-slate-500 block mb-1.5 uppercase">
              Or pick an upcoming marquee preset:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {presetQueries.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setSelectedSport(preset.sport);
                    setCustomQuery(preset.query);
                  }}
                  className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Feedback message */}
          {resultMsg && (
            <div
              className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                resultMsg.type === 'success'
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                  : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
              }`}
            >
              {resultMsg.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <X className="w-4 h-4 text-rose-400 shrink-0" />
              )}
              <span>{resultMsg.text}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] font-mono text-slate-500">
            Powered by Gemini 3.8 Flash + Web Grounding
          </span>

          <button
            onClick={handleFetch}
            disabled={loading}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Searching Sports Intel...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Sync Matches Now</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
