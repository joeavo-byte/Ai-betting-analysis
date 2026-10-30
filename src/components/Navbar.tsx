import React from 'react';
import {
  Trophy,
  Sparkles,
  BarChart3,
  Search,
  Activity,
  Layers,
  CheckCircle2,
  CalendarDays
} from 'lucide-react';
import { SportCategory } from '../types.ts';

interface NavbarProps {
  selectedSport: string;
  onSelectSport: (sport: string) => void;
  onOpenFetchModal: () => void;
  onOpenTrackRecord: () => void;
  onOpenPlayerLab: () => void;
  totalMatchesCount: number;
  accuracyPct: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedSport,
  onSelectSport,
  onOpenFetchModal,
  onOpenTrackRecord,
  onOpenPlayerLab,
  totalMatchesCount,
  accuracyPct,
}) => {
  const sports = [
    { id: 'all', label: 'All Big Matches', icon: Layers },
    { id: 'football', label: 'Football / UCL', icon: Trophy },
    { id: 'basketball', label: 'Basketball / NBA', icon: Activity },
    { id: 'tennis', label: 'Grand Slam Tennis', icon: Sparkles },
    { id: 'american_football', label: 'American Football', icon: Trophy },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
      {/* Top Banner / Ticker */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-indigo-950/40 border-b border-slate-800/60 px-4 py-1.5 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-emerald-400 font-semibold uppercase tracking-wider text-[11px]">
              AI Sports Prediction Core Active
            </span>
            <span className="hidden sm:inline text-slate-500">•</span>
            <span className="hidden sm:inline text-slate-400 text-[11px]">
              Trained on Historical Match Statistics, Individual Player Duels & Advanced Quantitative Metrics
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px]">
            <button
              onClick={onOpenTrackRecord}
              className="flex items-center gap-1.5 text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Historical Accuracy:</span>
              <span className="font-bold text-emerald-400">{accuracyPct}%</span>
              <span className="text-slate-500 underline text-[10px] ml-0.5">Audit log</span>
            </button>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">
              <span className="text-slate-200 font-semibold">{totalMatchesCount}</span> Blockbusters Loaded
            </span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between gap-4">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 border border-emerald-400/30">
            <Trophy className="w-5 h-5 text-slate-950 font-bold" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent font-['Plus_Jakarta_Sans']">
                ApexMatch<span className="text-emerald-400">AI</span>
              </h1>
              <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                PRO
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              AI-Powered Match Winner Forecaster & Player Performance Engine
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenPlayerLab}
            className="flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg border border-slate-700 bg-slate-900/80 text-slate-200 hover:bg-slate-800 hover:border-slate-600 transition-all cursor-pointer shadow-sm"
            title="Compare star players head-to-head"
          >
            <BarChart3 className="w-4 h-4 text-indigo-400" />
            <span className="hidden md:inline">Player H2H Lab</span>
          </button>

          <button
            onClick={onOpenTrackRecord}
            className="flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg border border-slate-700 bg-slate-900/80 text-slate-200 hover:bg-slate-800 hover:border-slate-600 transition-all cursor-pointer shadow-sm"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="hidden md:inline">Track Record</span>
          </button>

          <button
            onClick={onOpenFetchModal}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/25 transition-all cursor-pointer active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>Fetch Big Matches</span>
          </button>
        </div>
      </div>

      {/* Sport Category Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 pb-2.5 flex items-center gap-2 overflow-x-auto scrollbar-none">
        {sports.map((item) => {
          const Icon = item.icon;
          const isActive = selectedSport === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectSport(item.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                isActive
                  ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40 shadow-sm'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800/80 hover:border-slate-700'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
