import React from 'react';
import {
  Trophy,
  Sparkles,
  BarChart3,
  Search,
  Activity,
  Layers,
  CheckCircle2,
  CalendarDays,
  MessageCircle,
  Settings,
  Lock,
  Unlock,
  ExternalLink,
  Sun,
  Moon
} from 'lucide-react';
import { SportCategory } from '../types.ts';

interface NavbarProps {
  selectedSport: string;
  onSelectSport: (sport: string) => void;
  onOpenFetchModal: () => void;
  onOpenTrackRecord: () => void;
  onOpenPlayerLab: () => void;
  onOpenPaywall: () => void;
  onOpenAdminConfig: () => void;
  isVIP: boolean;
  isAdminAuthed: boolean;
  whatsappChannelUrl: string;
  totalMatchesCount: number;
  accuracyPct: number;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedSport,
  onSelectSport,
  onOpenFetchModal,
  onOpenTrackRecord,
  onOpenPlayerLab,
  onOpenPaywall,
  onOpenAdminConfig,
  isVIP,
  isAdminAuthed,
  whatsappChannelUrl,
  totalMatchesCount,
  accuracyPct,
  theme = 'light',
  onToggleTheme,
}) => {
  const sports = [
    { id: 'all', label: 'All Big Matches', icon: Layers },
    { id: 'football', label: 'Football / UCL', icon: Trophy },
    { id: 'basketball', label: 'Basketball / NBA', icon: Activity },
    { id: 'tennis', label: 'Grand Slam Tennis', icon: Sparkles },
    { id: 'american_football', label: 'American Football', icon: Trophy },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-stone-300/80 bg-[#EBE6DF]/95 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/85 transition-colors duration-200">
      {/* Top Banner / Ticker with warm ambient sports gradient */}
      <div className="bg-[#E2DDD5] border-b border-stone-300/70 dark:from-emerald-950/40 dark:via-slate-900 dark:to-indigo-950/40 dark:border-slate-800/60 px-4 py-1.5 text-xs text-stone-700 dark:text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-700 dark:bg-emerald-400"></span>
            </span>
            <span className="font-mono text-emerald-800 dark:text-emerald-400 font-bold uppercase tracking-wider text-[11px]">
              AI Sports Prediction Core Active
            </span>
            <span className="hidden sm:inline text-stone-400 dark:text-slate-500">•</span>
            <span className="hidden sm:inline text-stone-600 dark:text-slate-400 text-[11px]">
              Trained on Historical Match Telemetry, Star Duels & Quantitative Monte Carlo Modeling
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px]">
            <button
              onClick={onOpenTrackRecord}
              className="flex items-center gap-1.5 text-stone-700 hover:text-emerald-800 dark:text-slate-300 dark:hover:text-emerald-400 transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
              <span>Historical Accuracy:</span>
              <span className="font-bold text-emerald-800 dark:text-emerald-400">{accuracyPct}%</span>
              <span className="text-stone-500 dark:text-slate-500 underline text-[10px] ml-0.5">Audit log</span>
            </button>
            <span className="text-stone-400 dark:text-slate-600">|</span>
            <span className="text-stone-600 dark:text-slate-400">
              <span className="text-stone-900 dark:text-slate-200 font-semibold">{totalMatchesCount}</span> Loaded
            </span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 via-emerald-700 to-teal-800 flex items-center justify-center shadow-md shadow-stone-400/20 border border-amber-500/30 text-white">
            <Trophy className="w-5 h-5 font-bold" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-tight text-stone-900 dark:text-white font-['Plus_Jakarta_Sans']">
                ApexMatch<span className="text-emerald-700 dark:text-emerald-400">AI</span>
              </h1>
              <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-emerald-600/20 text-emerald-900 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-600/30">
                PRO
              </span>
            </div>
            <p className="text-xs text-stone-600 dark:text-slate-400 hidden sm:block">
              Multi-League Match Winner Forecaster & Player Performance Engine
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Light / Dark Mode Toggle Button */}
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-stone-300 bg-[#DFD9CE] hover:bg-[#D4CEBF] text-stone-800 dark:border-slate-800 dark:bg-slate-900/80 dark:hover:bg-slate-800 dark:text-slate-200 transition-all cursor-pointer shadow-xs text-xs font-mono font-medium"
              title={theme === 'dark' ? 'Switch to Warm Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="hidden md:inline text-[11px]">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-700" />
                  <span className="hidden md:inline text-[11px]">Dark</span>
                </>
              )}
            </button>
          )}

          {/* VIP WhatsApp Channel Button */}
          {isVIP ? (
            <a
              href={whatsappChannelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg bg-emerald-600/20 text-emerald-950 border border-emerald-600/40 hover:bg-emerald-600/30 dark:bg-emerald-500/20 dark:text-emerald-300 dark:hover:bg-emerald-500/30 transition-all cursor-pointer shadow-xs"
              title="Open official VIP WhatsApp Channel"
            >
              <MessageCircle className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span className="hidden sm:inline">VIP WhatsApp</span>
              <ExternalLink className="w-3 h-3 text-emerald-700/80 dark:text-emerald-400/80" />
            </a>
          ) : (
            <button
              onClick={onOpenPaywall}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg bg-amber-500/20 text-amber-950 border border-amber-600/30 hover:bg-amber-500/30 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/30 dark:hover:bg-emerald-500/20 transition-all cursor-pointer shadow-xs"
              title="Unlock VIP Intel & WhatsApp Channel"
            >
              <MessageCircle className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span>VIP WhatsApp</span>
            </button>
          )}

          <button
            onClick={onOpenPlayerLab}
            className="hidden md:flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg border border-stone-300 bg-[#DFD9CE] text-stone-800 hover:bg-[#D4CEBF] dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800 transition-all cursor-pointer shadow-xs"
            title="Compare star players head-to-head"
          >
            <BarChart3 className="w-4 h-4 text-indigo-700 dark:text-indigo-400" />
            <span>Player H2H Lab</span>
          </button>

          <button
            onClick={onOpenTrackRecord}
            className="hidden lg:flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg border border-stone-300 bg-[#DFD9CE] text-stone-800 hover:bg-[#D4CEBF] dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800 transition-all cursor-pointer shadow-xs"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span>Track Record</span>
          </button>

          <button
            onClick={onOpenFetchModal}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white shadow-sm dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-slate-950 shadow-emerald-500/20 transition-all cursor-pointer active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">Fetch Matches</span>
          </button>

          {/* Admin Dashboard shortcut (Visible ONLY when admin is logged in) */}
          {isAdminAuthed && (
            <button
              onClick={onOpenAdminConfig}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-amber-600/40 bg-amber-500/20 text-amber-950 dark:border-emerald-500/40 dark:bg-emerald-950/40 dark:text-emerald-300 text-xs font-mono font-bold hover:bg-amber-500/30 dark:hover:bg-emerald-900/50 transition-all cursor-pointer shadow-xs"
              title="Open Admin Dashboard"
            >
              <Settings className="w-3.5 h-3.5 text-amber-700 dark:text-emerald-400" />
              <span className="hidden sm:inline">Admin Dashboard</span>
            </button>
          )}
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
                  ? 'bg-emerald-700 text-white border-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/40 shadow-xs'
                  : 'bg-[#DFD9CE] text-stone-700 border-stone-300 hover:text-stone-950 hover:bg-[#D4CEBF] dark:bg-slate-900/60 dark:text-slate-400 dark:border-slate-800 dark:hover:text-slate-200 dark:hover:bg-slate-800/80 dark:hover:border-slate-700'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white dark:text-emerald-400' : 'text-stone-600 dark:text-slate-500'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
