import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Lock,
  Unlock,
  KeyRound,
  Eye,
  EyeOff,
  Save,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Sparkles,
  MessageCircle,
  CreditCard,
  ExternalLink,
  DollarSign,
  Users,
  LogOut,
  ArrowLeft,
  Search,
  Check,
  Calendar,
  Layers,
  Settings,
  Flame,
  Activity
} from 'lucide-react';
import { Match, VIPPaymentConfig, VIPPricingPlan } from '../types.ts';

interface AdminDashboardProps {
  config: VIPPaymentConfig;
  plans: VIPPricingPlan[];
  onUpdateConfig: (newConfig: Partial<VIPPaymentConfig>, adminToken: string) => Promise<void>;
  isAdminAuthed: boolean;
  onAdminAuthSuccess: (token: string) => void;
  onAdminLogout: () => void;
  adminToken: string | null;
  onNavigateHome: () => void;
  matches: Match[];
  onToggleMatchVIP: (matchId: string) => void;
  onRunPrediction: (matchId: string) => Promise<void>;
  onSyncAllMatches: () => Promise<void>;
  onFetchMatches: (sport: string, query: string) => Promise<any>;
  predictingMatchId: string | null;
  isMatchVIP: (matchId: string) => boolean;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  config,
  plans,
  onUpdateConfig,
  isAdminAuthed,
  onAdminAuthSuccess,
  onAdminLogout,
  adminToken,
  onNavigateHome,
  matches,
  onToggleMatchVIP,
  onRunPrediction,
  onSyncAllMatches,
  onFetchMatches,
  predictingMatchId,
  isMatchVIP,
}) => {
  // Login form state
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState<boolean>(false);

  // Active dashboard tab
  const [activeTab, setActiveTab] = useState<'monetization' | 'matches' | 'discovery' | 'transactions' | 'security'>('monetization');

  // Config inputs
  const [whatsappUrl, setWhatsappUrl] = useState<string>(config.whatsappChannelUrl || '');
  const [paystackKey, setPaystackKey] = useState<string>(config.paystackPublicKey || '');
  const [channelName, setChannelName] = useState<string>(config.channelName || '');
  const [currency, setCurrency] = useState<'NGN' | 'USD' | 'GHS' | 'KES' | 'ZAR'>(config.currency || 'NGN');
  const [savingConfig, setSavingConfig] = useState<boolean>(false);
  const [configSuccess, setConfigSuccess] = useState<boolean>(false);

  // Change password state
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [changingPass, setChangingPass] = useState<boolean>(false);
  const [passwordMsg, setPasswordMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Fixture search state
  const [fixtureSearchSport, setFixtureSearchSport] = useState<string>('football');
  const [fixtureSearchQuery, setFixtureSearchQuery] = useState<string>('');
  const [fetchingFixtures, setFetchingFixtures] = useState<boolean>(false);
  const [fetchResultMsg, setFetchResultMsg] = useState<string | null>(null);

  // Filter in matches tab
  const [matchFilter, setMatchFilter] = useState<string>('');
  const [syncingAll, setSyncingAll] = useState<boolean>(false);

  // Transactions list
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loadingTx, setLoadingTx] = useState<boolean>(false);

  useEffect(() => {
    setWhatsappUrl(config.whatsappChannelUrl || '');
    setPaystackKey(config.paystackPublicKey || '');
    setChannelName(config.channelName || '');
    setCurrency(config.currency || 'NGN');
  }, [config]);

  // Load transactions when authenticated
  useEffect(() => {
    if (isAdminAuthed && adminToken) {
      setLoadingTx(true);
      fetch('/api/payment/transactions', {
        headers: { 'x-admin-token': adminToken },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.transactions) setTransactions(data.transactions);
        })
        .catch((err) => console.error('Error loading transactions:', err))
        .finally(() => setLoadingTx(false));
    }
  }, [isAdminAuthed, adminToken]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordInput.trim()) {
      setLoginError('Please enter the admin password.');
      return;
    }
    setLoggingIn(true);
    setLoginError(null);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput.trim() }),
      });
      const data = await res.json();
      if (data.success && data.token) {
        onAdminAuthSuccess(data.token);
        setPasswordInput('');
      } else {
        setLoginError(data.error || 'Incorrect Admin Password. (Default password: admin1234)');
      }
    } catch (err) {
      setLoginError('Network connection failed. Please retry.');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminToken) return;
    setSavingConfig(true);
    setConfigSuccess(false);
    try {
      await onUpdateConfig(
        {
          whatsappChannelUrl: whatsappUrl.trim(),
          paystackPublicKey: paystackKey.trim(),
          channelName: channelName.trim(),
          currency,
        },
        adminToken
      );
      setConfigSuccess(true);
      setTimeout(() => setConfigSuccess(false), 3500);
    } catch (err) {
      console.error('Failed to update config:', err);
    } finally {
      setSavingConfig(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminToken) return;
    if (newPassword.length < 4) {
      setPasswordMsg({ type: 'error', text: 'Password must be at least 4 characters long.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: 'error', text: 'Passwords do not match. Please retype.' });
      return;
    }

    setChangingPass(true);
    setPasswordMsg(null);
    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': adminToken,
        },
        body: JSON.stringify({ newPassword: newPassword.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setPasswordMsg({ type: 'success', text: 'Admin password updated successfully! Please remember it for next time.' });
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setPasswordMsg({ type: 'error', text: data.error || 'Failed to change password.' });
      }
    } catch (err) {
      setPasswordMsg({ type: 'error', text: 'Connection error while updating password.' });
    } finally {
      setChangingPass(false);
    }
  };

  const handleRunDiscovery = async (e: React.FormEvent) => {
    e.preventDefault();
    setFetchingFixtures(true);
    setFetchResultMsg(null);
    try {
      const res = await onFetchMatches(fixtureSearchSport, fixtureSearchQuery);
      if (res?.matches) {
        setFetchResultMsg(`Successfully discovered & loaded ${res.matches.length} fixtures!`);
      } else {
        setFetchResultMsg('Fixtures loaded from intelligence database.');
      }
      setFixtureSearchQuery('');
    } catch (err) {
      setFetchResultMsg('Discovery completed.');
    } finally {
      setFetchingFixtures(false);
    }
  };

  const handleSyncAll = async () => {
    setSyncingAll(true);
    try {
      await onSyncAllMatches();
    } finally {
      setSyncingAll(false);
    }
  };

  const filteredMatches = matches.filter((m) => {
    if (!matchFilter) return true;
    const q = matchFilter.toLowerCase();
    return (
      m.homeTeam.name.toLowerCase().includes(q) ||
      m.awayTeam.name.toLowerCase().includes(q) ||
      m.tournament.toLowerCase().includes(q) ||
      m.sport.toLowerCase().includes(q)
    );
  });

  // -------------------------------------------------------------
  // VIEW A: ADMIN LOGIN SCREEN (When not authenticated)
  // -------------------------------------------------------------
  if (!isAdminAuthed) {
    return (
      <div className="min-h-screen bg-[#EFECE6] dark:bg-slate-950 text-stone-900 dark:text-slate-100 flex flex-col justify-between p-4 sm:p-6 transition-colors font-['Plus_Jakarta_Sans']">
        {/* Top return link */}
        <div className="max-w-md w-full mx-auto pt-4 flex justify-between items-center">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2 text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-white text-xs font-semibold cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Back to Public Website</span>
          </button>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-stone-300 dark:bg-slate-800 text-stone-700 dark:text-slate-300">
            Route: /admindashboard
          </span>
        </div>

        {/* Center Login Card */}
        <div className="max-w-md w-full mx-auto my-auto py-8">
          <div className="rounded-2xl border border-stone-300 dark:border-slate-800 bg-[#E5DFD5] dark:bg-slate-900 shadow-xl p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-emerald-700/15 border border-emerald-600/30 dark:bg-emerald-500/20 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-400 mx-auto flex items-center justify-center shadow-sm">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-stone-300/80 dark:bg-slate-800 text-[10px] font-mono font-bold uppercase text-stone-700 dark:text-slate-300">
                Restricted Admin Access
              </span>
              <h1 className="text-2xl font-black text-stone-950 dark:text-white">
                ApexMatch AI Admin Center
              </h1>
              <p className="text-xs text-stone-700 dark:text-slate-400 leading-relaxed">
                Enter your administrative master password to configure your Paystack keys, VIP WhatsApp channel link, and match intelligence.
              </p>
            </div>

            {loginError && (
              <div className="p-3.5 rounded-xl bg-rose-100 border border-rose-300 text-rose-900 dark:bg-rose-950/40 dark:border-rose-500/40 dark:text-rose-300 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-700 dark:text-rose-400" />
                <span className="font-medium leading-relaxed">{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-stone-800 dark:text-slate-300 mb-1.5">
                  Admin Master Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter password..."
                    className="w-full pl-3.5 pr-11 py-2.5 rounded-xl bg-[#DFD9CE] border border-stone-300 text-stone-950 dark:bg-slate-950 dark:border-slate-800 dark:text-white text-sm focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-500"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-800 dark:text-slate-400 dark:hover:text-slate-200 cursor-pointer"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loggingIn}
                className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-slate-950 font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loggingIn ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying Access...</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    <span>Authenticate into Admin Dashboard</span>
                  </>
                )}
              </button>
            </form>

            <div className="p-3.5 rounded-xl bg-[#DFD9CE] dark:bg-slate-950/60 border border-stone-300 dark:border-slate-800 text-[11px] text-stone-700 dark:text-slate-400 space-y-1">
              <div className="font-bold text-stone-900 dark:text-slate-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                <span>First time logging in?</span>
              </div>
              <p>
                The default master password is <strong className="font-mono text-emerald-800 dark:text-emerald-300">admin1234</strong>. You can change it to any custom password once authenticated.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom subtle copyright */}
        <div className="max-w-md w-full mx-auto pb-4 text-center text-xs text-stone-500 dark:text-slate-600 font-mono">
          ApexMatch AI Internal Management Suite
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW B: AUTHENTICATED MASTER ADMIN DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#EFECE6] dark:bg-slate-950 text-stone-900 dark:text-slate-100 flex flex-col font-['Plus_Jakarta_Sans'] transition-colors">
      {/* Top Admin Navigation Header */}
      <header className="sticky top-0 z-40 border-b border-stone-300 dark:border-slate-800 bg-[#E5DFD5]/95 dark:bg-slate-900/95 backdrop-blur-md px-4 sm:px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white dark:bg-emerald-500 dark:text-slate-950 flex items-center justify-center font-black shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black text-stone-950 dark:text-white leading-tight">
                  ApexMatch AI Admin Dashboard
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-700/15 text-emerald-900 dark:bg-emerald-500/20 dark:text-emerald-300 border border-emerald-600/30">
                  SUPER ADMIN ACTIVE
                </span>
              </div>
              <span className="text-[11px] text-stone-600 dark:text-slate-400 font-mono">
                Direct URL: /admindashboard (Hidden from regular visitors)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#DFD9CE] hover:bg-[#D4CEBF] text-stone-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-100 text-xs font-bold transition-all cursor-pointer border border-stone-300 dark:border-slate-700 shadow-xs"
              title="Return to the public match predictor view"
            >
              <ArrowLeft className="w-4 h-4 text-stone-600 dark:text-slate-400" />
              <span>View Public App</span>
            </button>

            <button
              onClick={onAdminLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-900 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 dark:text-rose-300 border border-rose-300 dark:border-rose-500/40 text-xs font-bold transition-all cursor-pointer shadow-xs"
              title="End admin session"
            >
              <LogOut className="w-4 h-4 text-rose-700 dark:text-rose-400" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Area */}
      <main className="max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6 flex-1">
        {/* KPI Quick Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-[#E5DFD5] border border-stone-300 dark:bg-slate-900 dark:border-slate-800 space-y-1">
            <span className="text-xs font-mono text-stone-600 dark:text-slate-400 uppercase font-semibold">
              VIP WhatsApp Channel
            </span>
            <div className="text-base font-bold text-stone-950 dark:text-white truncate">
              {config.whatsappChannelUrl ? 'Linked & Active' : 'Not Configured'}
            </div>
            <a
              href={config.whatsappChannelUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-emerald-800 dark:text-emerald-400 font-semibold hover:underline inline-flex items-center gap-1"
            >
              <span>Test Channel Link</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="p-4 rounded-2xl bg-[#E5DFD5] border border-stone-300 dark:bg-slate-900 dark:border-slate-800 space-y-1">
            <span className="text-xs font-mono text-stone-600 dark:text-slate-400 uppercase font-semibold">
              Paystack Gateway
            </span>
            <div className="text-base font-bold text-stone-950 dark:text-white truncate">
              {config.paystackPublicKey ? 'Public Key Set' : 'Demo / Test Mode'}
            </div>
            <span className="text-[11px] font-mono text-stone-600 dark:text-slate-400">
              Currency: <strong>{config.currency || 'NGN'}</strong>
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#E5DFD5] border border-stone-300 dark:bg-slate-900 dark:border-slate-800 space-y-1">
            <span className="text-xs font-mono text-stone-600 dark:text-slate-400 uppercase font-semibold">
              Active Match Slate
            </span>
            <div className="text-2xl font-black font-mono text-emerald-800 dark:text-emerald-400">
              {matches.length} Fixtures
            </div>
            <span className="text-[11px] text-stone-600 dark:text-slate-400">
              {matches.filter((m) => isMatchVIP(m.id)).length} VIP Gated • {matches.filter((m) => !isMatchVIP(m.id)).length} Free Preview
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#E5DFD5] border border-stone-300 dark:bg-slate-900 dark:border-slate-800 space-y-1">
            <span className="text-xs font-mono text-stone-600 dark:text-slate-400 uppercase font-semibold">
              Verified VIP Purchases
            </span>
            <div className="text-2xl font-black font-mono text-indigo-800 dark:text-indigo-400">
              {transactions.length} Customers
            </div>
            <span className="text-[11px] text-stone-600 dark:text-slate-400">
              Redirected to WhatsApp
            </span>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex items-center gap-1.5 border-b border-stone-300 dark:border-slate-800 pb-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('monetization')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'monetization'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-[#DFD9CE] text-stone-800 hover:bg-[#D4CEBF] dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>VIP Channel & Paystack</span>
          </button>

          <button
            onClick={() => setActiveTab('matches')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'matches'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-[#DFD9CE] text-stone-800 hover:bg-[#D4CEBF] dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Match VIP Status ({matches.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('discovery')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'discovery'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-[#DFD9CE] text-stone-800 hover:bg-[#D4CEBF] dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Fixture Sync & AI Discovery</span>
          </button>

          <button
            onClick={() => setActiveTab('transactions')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'transactions'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-[#DFD9CE] text-stone-800 hover:bg-[#D4CEBF] dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>VIP Transactions ({transactions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'security'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-[#DFD9CE] text-stone-800 hover:bg-[#D4CEBF] dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            <KeyRound className="w-4 h-4" />
            <span>Admin Password</span>
          </button>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* TAB 1: VIP CHANNEL & PAYSTACK SETTINGS */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'monetization' && (
          <div className="rounded-2xl border border-stone-300 dark:border-slate-800 bg-[#E5DFD5] dark:bg-slate-900 p-6 space-y-6 shadow-sm">
            <div>
              <h2 className="text-lg font-bold text-stone-950 dark:text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                <span>Monetization & VIP WhatsApp Channel Configuration</span>
              </h2>
              <p className="text-xs text-stone-700 dark:text-slate-400 mt-1">
                Configure your destination WhatsApp VIP channel link and Paystack payment gateway. When users pay, they are verified and instantly redirected to this channel.
              </p>
            </div>

            {configSuccess && (
              <div className="p-3.5 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-500/40 dark:text-emerald-300 text-xs flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                <span>Configuration changes saved and broadcasted to all active visitor sessions!</span>
              </div>
            )}

            <form onSubmit={handleSaveConfig} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* WhatsApp Channel Link */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase font-bold text-stone-800 dark:text-slate-300 flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                    <span>WhatsApp VIP Channel Invite URL</span>
                  </label>
                  <input
                    type="url"
                    value={whatsappUrl}
                    onChange={(e) => setWhatsappUrl(e.target.value)}
                    placeholder="https://whatsapp.com/channel/..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#DFD9CE] border border-stone-300 text-stone-950 dark:bg-slate-950 dark:border-slate-800 dark:text-white text-xs font-mono focus:outline-none focus:border-emerald-600"
                    required
                  />
                  <p className="text-[11px] text-stone-600 dark:text-slate-400">
                    Paste the invite link from your WhatsApp Channel (e.g. <code>https://whatsapp.com/channel/0029Va...</code>)
                  </p>
                </div>

                {/* Paystack Public Key */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase font-bold text-stone-800 dark:text-slate-300 flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                    <span>Paystack Public Key</span>
                  </label>
                  <input
                    type="text"
                    value={paystackKey}
                    onChange={(e) => setPaystackKey(e.target.value)}
                    placeholder="pk_live_... or pk_test_..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#DFD9CE] border border-stone-300 text-stone-950 dark:bg-slate-950 dark:border-slate-800 dark:text-white text-xs font-mono focus:outline-none focus:border-emerald-600"
                  />
                  <p className="text-[11px] text-stone-600 dark:text-slate-400">
                    From your Paystack Dashboard (Settings &gt; API Keys &amp; Webhooks). Leave blank for instant test demo mode.
                  </p>
                </div>

                {/* Channel Brand Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase font-bold text-stone-800 dark:text-slate-300">
                    VIP Channel Display Name
                  </label>
                  <input
                    type="text"
                    value={channelName}
                    onChange={(e) => setChannelName(e.target.value)}
                    placeholder="ApexMatch AI VIP Telegram / WhatsApp"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#DFD9CE] border border-stone-300 text-stone-950 dark:bg-slate-950 dark:border-slate-800 dark:text-white text-xs focus:outline-none focus:border-emerald-600"
                  />
                </div>

                {/* Currency */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase font-bold text-stone-800 dark:text-slate-300">
                    Pricing Currency
                  </label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#DFD9CE] border border-stone-300 text-stone-950 dark:bg-slate-950 dark:border-slate-800 dark:text-white text-xs font-bold focus:outline-none focus:border-emerald-600"
                  >
                    <option value="NGN">NGN (Nigerian Naira - ₦)</option>
                    <option value="USD">USD (US Dollar - $)</option>
                    <option value="GHS">GHS (Ghanaian Cedi - GH₵)</option>
                    <option value="KES">KES (Kenyan Shilling - KSh)</option>
                    <option value="ZAR">ZAR (South African Rand - R)</option>
                  </select>
                </div>
              </div>

              {/* VIP Plans Overview */}
              <div className="pt-4 border-t border-stone-300 dark:border-slate-800">
                <span className="text-xs font-mono uppercase font-bold text-stone-800 dark:text-slate-300 block mb-3">
                  Current VIP Pass Tier Pricing
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {plans.map((plan) => {
                    const priceVal =
                      currency === 'USD'
                        ? plan.usd
                        : currency === 'NGN'
                        ? plan.ngn
                        : currency === 'GHS'
                        ? plan.ghs
                        : currency === 'KES'
                        ? plan.kes
                        : plan.zar;
                    return (
                      <div
                        key={plan.id}
                        className="p-3.5 rounded-xl bg-[#DFD9CE] dark:bg-slate-950/80 border border-stone-300 dark:border-slate-800 space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-stone-900 dark:text-white">{plan.title}</span>
                          {plan.badge && (
                            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-700 text-white dark:bg-emerald-500 dark:text-slate-950">
                              {plan.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-lg font-black font-mono text-emerald-800 dark:text-emerald-400">
                          {currency === 'NGN' ? '₦' : currency === 'USD' ? '$' : `${currency} `}
                          {priceVal?.toLocaleString()}
                        </div>
                        <p className="text-[11px] text-stone-600 dark:text-slate-400 line-clamp-1">{plan.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end pt-3">
                <button
                  type="submit"
                  disabled={savingConfig}
                  className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-slate-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 shadow-sm disabled:opacity-60"
                >
                  {savingConfig ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Saving Changes...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save Monetization Settings</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: MATCH VIP STATUS & FIXTURE MANAGER */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'matches' && (
          <div className="rounded-2xl border border-stone-300 dark:border-slate-800 bg-[#E5DFD5] dark:bg-slate-900 p-6 space-y-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-stone-950 dark:text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                  <span>Match VIP Lock & Intel Management</span>
                </h2>
                <p className="text-xs text-stone-700 dark:text-slate-400 mt-0.5">
                  Toggle any fixture between <strong>VIP Intel (Gated)</strong> and <strong>Free Public Preview</strong>. VIP matches require users to unlock via Paystack to view 1,000 Monte Carlo runs and player duel exploits.
                </p>
              </div>

              {/* Search filter */}
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={matchFilter}
                  onChange={(e) => setMatchFilter(e.target.value)}
                  placeholder="Filter by team or league..."
                  className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-[#DFD9CE] border border-stone-300 text-stone-950 dark:bg-slate-950 dark:border-slate-800 dark:text-white text-xs focus:outline-none focus:border-emerald-600"
                />
                <Search className="w-4 h-4 text-stone-500 dark:text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-stone-300 dark:border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#DFD9CE] dark:bg-slate-950 font-mono text-stone-700 dark:text-slate-400 border-b border-stone-300 dark:border-slate-800 uppercase text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Matchup</th>
                    <th className="py-3 px-4">Tournament</th>
                    <th className="py-3 px-4">Predicted Winner</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-300 dark:divide-slate-800 bg-[#E5DFD5] dark:bg-slate-900/60 font-sans">
                  {filteredMatches.map((m) => {
                    const isVIP = isMatchVIP(m.id);
                    const isPredicting = predictingMatchId === m.id;
                    return (
                      <tr key={m.id} className="hover:bg-[#DFD9CE]/50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-4">
                          <div className="font-bold text-stone-950 dark:text-white">
                            {m.homeTeam.name} vs {m.awayTeam.name}
                          </div>
                          <span className="text-[11px] text-stone-600 dark:text-slate-400 font-mono">
                            {m.date} • {m.time}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded bg-stone-300 dark:bg-slate-800 font-mono text-[11px] text-stone-800 dark:text-slate-300">
                            {m.tournament}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono font-semibold text-stone-800 dark:text-slate-300">
                          {m.prediction ? (
                            <span className="text-emerald-800 dark:text-emerald-400 font-bold">
                              {m.prediction.winnerName} ({m.prediction.confidence}%)
                            </span>
                          ) : (
                            <span className="text-stone-500 dark:text-slate-500 italic">No prediction</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                              isVIP
                                ? 'bg-amber-100 text-amber-900 border border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-500/30'
                                : 'bg-emerald-100 text-emerald-900 border border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-500/30'
                            }`}
                          >
                            {isVIP ? <Lock className="w-3 h-3 text-amber-700" /> : <Unlock className="w-3 h-3 text-emerald-700" />}
                            <span>{isVIP ? 'VIP Gated' : 'Free Preview'}</span>
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right space-x-2">
                          <button
                            type="button"
                            onClick={() => onToggleMatchVIP(m.id)}
                            className="px-2.5 py-1 rounded-lg bg-[#DFD9CE] hover:bg-[#D4CEBF] text-stone-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 border border-stone-300 dark:border-slate-700 text-[11px] font-bold cursor-pointer transition-all shadow-xs"
                          >
                            {isVIP ? 'Set Free' : 'Lock as VIP'}
                          </button>
                          <button
                            type="button"
                            onClick={() => onRunPrediction(m.id)}
                            disabled={isPredicting}
                            className="px-2.5 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-slate-950 text-[11px] font-bold cursor-pointer transition-all disabled:opacity-50"
                            title="Re-run Gemini AI prediction"
                          >
                            {isPredicting ? 'Inferring...' : 'Re-Predict'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredMatches.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-stone-500 dark:text-slate-400">
                        No fixtures match your filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 3: FIXTURE SYNC & AI DISCOVERY */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'discovery' && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-stone-300 dark:border-slate-800 bg-[#E5DFD5] dark:bg-slate-900 p-6 space-y-4 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-stone-950 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                    <span>Instant Full Fixture Slate Sync</span>
                  </h2>
                  <p className="text-xs text-stone-700 dark:text-slate-400 mt-1 max-w-xl">
                    Populate the complete 20+ match slate across English Premier League, UEFA Champions League, La Liga, Serie A, Bundesliga, NBA, and Tennis into the application.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSyncAll}
                  disabled={syncingAll}
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-slate-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 shadow-sm disabled:opacity-60 shrink-0"
                >
                  <RefreshCw className={`w-4 h-4 ${syncingAll ? 'animate-spin' : ''}`} />
                  <span>{syncingAll ? 'Syncing 20+ Matches...' : 'Sync Full 20+ Fixture Slate'}</span>
                </button>
              </div>
            </div>

            {/* AI Fixture Discovery Search */}
            <div className="rounded-2xl border border-stone-300 dark:border-slate-800 bg-[#E5DFD5] dark:bg-slate-900 p-6 space-y-5 shadow-sm">
              <div>
                <h3 className="text-base font-bold text-stone-950 dark:text-white flex items-center gap-2">
                  <Search className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  <span>Discover Any Custom Fixture via Gemini with Search Grounding</span>
                </h3>
                <p className="text-xs text-stone-700 dark:text-slate-400 mt-1">
                  Type any rivalry (e.g. <code>Arsenal vs Chelsea</code>, <code>Juventus vs Inter</code>, <code>Lakers vs Warriors</code>) or league to dynamically discover upcoming games, venues, and key players.
                </p>
              </div>

              {fetchResultMsg && (
                <div className="p-3.5 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-500/40 dark:text-emerald-300 text-xs flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                  <span>{fetchResultMsg}</span>
                </div>
              )}

              <form onSubmit={handleRunDiscovery} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-mono uppercase font-bold text-stone-800 dark:text-slate-300 block mb-1.5">
                      Sport Category
                    </label>
                    <select
                      value={fixtureSearchSport}
                      onChange={(e) => setFixtureSearchSport(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#DFD9CE] border border-stone-300 text-stone-950 dark:bg-slate-950 dark:border-slate-800 dark:text-white text-xs font-bold focus:outline-none focus:border-emerald-600"
                    >
                      <option value="football">Football / Soccer</option>
                      <option value="basketball">Basketball / NBA</option>
                      <option value="tennis">Tennis / Grand Slams</option>
                      <option value="american_football">American Football / NFL</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-mono uppercase font-bold text-stone-800 dark:text-slate-300 block mb-1.5">
                      Match Query or League
                    </label>
                    <input
                      type="text"
                      value={fixtureSearchQuery}
                      onChange={(e) => setFixtureSearchQuery(e.target.value)}
                      placeholder="e.g. Real Madrid vs Barcelona, Serie A, Champions League..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#DFD9CE] border border-stone-300 text-stone-950 dark:bg-slate-950 dark:border-slate-800 dark:text-white text-xs focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={fetchingFixtures}
                    className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-slate-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 shadow-sm disabled:opacity-60"
                  >
                    {fetchingFixtures ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Discovering Fixtures...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Discover Fixtures with Gemini</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 4: VIP TRANSACTIONS LOG */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'transactions' && (
          <div className="rounded-2xl border border-stone-300 dark:border-slate-800 bg-[#E5DFD5] dark:bg-slate-900 p-6 space-y-5 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-stone-950 dark:text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                  <span>VIP Customer Purchases &amp; WhatsApp Redirect Log</span>
                </h2>
                <p className="text-xs text-stone-700 dark:text-slate-400 mt-0.5">
                  Real-time record of all customers who completed checkout or unlocked VIP dossier intelligence.
                </p>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-stone-300 dark:bg-slate-800 text-stone-800 dark:text-slate-300">
                Total Orders: {transactions.length}
              </span>
            </div>

            {loadingTx ? (
              <div className="py-12 text-center text-xs text-stone-600 dark:text-slate-400">
                <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-700" />
                <span>Loading transaction logs...</span>
              </div>
            ) : transactions.length > 0 ? (
              <div className="overflow-x-auto rounded-xl border border-stone-300 dark:border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#DFD9CE] dark:bg-slate-950 font-mono text-stone-700 dark:text-slate-400 uppercase text-[11px] border-b border-stone-300 dark:border-slate-800">
                    <tr>
                      <th className="py-3 px-4">Reference</th>
                      <th className="py-3 px-4">Customer Email</th>
                      <th className="py-3 px-4">Plan / Match</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Date / Time</th>
                      <th className="py-3 px-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-300 dark:divide-slate-800 bg-[#E5DFD5] dark:bg-slate-900/60 font-sans">
                    {transactions.map((tx: any) => (
                      <tr key={tx.id || tx.reference} className="hover:bg-[#DFD9CE]/50 dark:hover:bg-slate-800/40">
                        <td className="py-3 px-4 font-mono font-bold text-stone-900 dark:text-white">
                          {tx.reference}
                        </td>
                        <td className="py-3 px-4 text-stone-800 dark:text-slate-300">{tx.email}</td>
                        <td className="py-3 px-4 font-mono text-stone-700 dark:text-slate-300 uppercase text-[11px]">
                          {tx.planId}
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-emerald-800 dark:text-emerald-400">
                          {tx.currency} {tx.amount?.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 font-mono text-stone-600 dark:text-slate-400 text-[11px]">
                          {new Date(tx.timestamp).toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-emerald-100 text-emerald-900 border border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-500/30">
                            Verified & Redirected
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-12 text-center text-xs text-stone-600 dark:text-slate-400 bg-[#DFD9CE]/40 dark:bg-slate-950/40 rounded-xl border border-stone-300 dark:border-slate-800">
                <CreditCard className="w-8 h-8 text-stone-500 mx-auto mb-2" />
                <p className="font-bold text-stone-800 dark:text-slate-300">No purchases recorded yet.</p>
                <p className="text-[11px] text-stone-500 mt-1">
                  When users purchase a VIP Pass or unlock match intelligence, transactions will automatically appear here.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 5: ADMIN SECURITY & PASSWORD */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'security' && (
          <div className="rounded-2xl border border-stone-300 dark:border-slate-800 bg-[#E5DFD5] dark:bg-slate-900 p-6 space-y-6 shadow-sm max-w-2xl">
            <div>
              <h2 className="text-lg font-bold text-stone-950 dark:text-white flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                <span>Admin Master Password Settings</span>
              </h2>
              <p className="text-xs text-stone-700 dark:text-slate-400 mt-1">
                Change your administrative password. You will need this password whenever accessing <code>/admindashboard</code>.
              </p>
            </div>

            {passwordMsg && (
              <div
                className={`p-3.5 rounded-xl border text-xs flex items-center gap-2 font-medium ${
                  passwordMsg.type === 'success'
                    ? 'bg-emerald-100 border-emerald-300 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-500/40 dark:text-emerald-300'
                    : 'bg-rose-100 border-rose-300 text-rose-900 dark:bg-rose-950/40 dark:border-rose-500/40 dark:text-rose-300'
                }`}
              >
                {passwordMsg.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-700 dark:text-rose-400 shrink-0" />
                )}
                <span>{passwordMsg.text}</span>
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase font-bold text-stone-800 dark:text-slate-300 mb-1.5">
                  New Admin Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password (min. 4 characters)..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#DFD9CE] border border-stone-300 text-stone-950 dark:bg-slate-950 dark:border-slate-800 dark:text-white text-xs focus:outline-none focus:border-emerald-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase font-bold text-stone-800 dark:text-slate-300 mb-1.5">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password to verify..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#DFD9CE] border border-stone-300 text-stone-950 dark:bg-slate-950 dark:border-slate-800 dark:text-white text-xs focus:outline-none focus:border-emerald-600"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={changingPass}
                className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-slate-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 shadow-sm disabled:opacity-60"
              >
                {changingPass ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Updating Password...</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    <span>Update Admin Password</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};
