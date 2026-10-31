import React, { useState, useEffect } from 'react';
import {
  X,
  Settings,
  MessageCircle,
  CreditCard,
  ExternalLink,
  Save,
  CheckCircle2,
  HelpCircle,
  Users,
  Copy,
  DollarSign,
  Lock,
  Unlock,
  KeyRound,
  ShieldAlert,
  LogOut
} from 'lucide-react';
import { VIPPaymentConfig } from '../types.ts';

interface AdminConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: VIPPaymentConfig;
  onUpdateConfig: (newConfig: Partial<VIPPaymentConfig>, adminToken: string) => Promise<void>;
  isAdminAuthed: boolean;
  onAdminAuthSuccess: (token: string) => void;
  onAdminLogout: () => void;
  adminToken: string | null;
}

export const AdminConfigModal: React.FC<AdminConfigModalProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
  isAdminAuthed,
  onAdminAuthSuccess,
  onAdminLogout,
  adminToken,
}) => {
  // Input fields
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string | null>(null);
  const [verifyingPin, setVerifyingPin] = useState<boolean>(false);

  const [whatsappUrl, setWhatsappUrl] = useState<string>(config.whatsappChannelUrl || '');
  const [paystackKey, setPaystackKey] = useState<string>(config.paystackPublicKey || '');
  const [channelName, setChannelName] = useState<string>(config.channelName || '');
  const [currency, setCurrency] = useState<'NGN' | 'USD' | 'GHS' | 'KES' | 'ZAR'>(
    config.currency || 'NGN'
  );

  // Change PIN section
  const [showChangePin, setShowChangePin] = useState<boolean>(false);
  const [newPinInput, setNewPinInput] = useState<string>('');
  const [changePinMsg, setChangePinMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [saving, setSaving] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);

  useEffect(() => {
    if (isOpen) {
      setWhatsappUrl(config.whatsappChannelUrl || '');
      setPaystackKey(config.paystackPublicKey || '');
      setChannelName(config.channelName || '');
      setCurrency(config.currency || 'NGN');
      setPinError(null);
      setChangePinMsg(null);

      // Fetch transaction list only if authenticated
      if (adminToken) {
        fetch('/api/payment/transactions', {
          headers: { 'x-admin-token': adminToken },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.transactions) setRecentTransactions(data.transactions);
          })
          .catch((err) => console.error('Failed to load transactions:', err));
      }
    }
  }, [isOpen, config, adminToken]);

  if (!isOpen) return null;

  const handleVerifyPin = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerifyingPin(true);
    setPinError(null);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pinInput.trim() }),
      });
      const data = await res.json();
      if (data.success && data.token) {
        onAdminAuthSuccess(data.token);
        setPinInput('');
      } else {
        setPinError(data.error || 'Invalid Owner PIN. (Default PIN is 8821).');
      }
    } catch (err) {
      setPinError('Connection error. Please try again.');
    } finally {
      setVerifyingPin(false);
    }
  };

  const handleSave = async () => {
    if (!adminToken) return;
    setSaving(true);
    setSavedSuccess(false);
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
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to save config:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleChangePin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminToken || !newPinInput.trim()) return;
    setChangePinMsg(null);
    try {
      const res = await fetch('/api/admin/change-pin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': adminToken,
        },
        body: JSON.stringify({ newPin: newPinInput.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setChangePinMsg({ type: 'success', text: 'PIN successfully updated! Remember your new passcode.' });
        setNewPinInput('');
        setTimeout(() => setShowChangePin(false), 2500);
      } else {
        setChangePinMsg({ type: 'error', text: data.error || 'Failed to update PIN.' });
      }
    } catch (err) {
      setChangePinMsg({ type: 'error', text: 'Failed to update PIN.' });
    }
  };

  const handleTestWhatsApp = () => {
    if (!whatsappUrl.trim()) return;
    window.open(whatsappUrl.trim(), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl my-auto rounded-3xl border border-slate-800 bg-slate-950 text-slate-100 shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">Owner Control Center</h3>
                {isAdminAuthed && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    Owner Authenticated
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                Protected configuration for WhatsApp Channel link, Paystack keys & transactions
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* BODY */}
        {!isAdminAuthed ? (
          /* PASSCODE AUTHENTICATION GATE */
          <div className="py-8 sm:py-12 text-center max-w-md mx-auto space-y-5 my-auto">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 text-amber-400 mx-auto flex items-center justify-center shadow-lg shadow-amber-500/10">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[10px] font-mono font-bold uppercase tracking-wider">
                Owner Authentication Required
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-2">
                Enter Your Secret Owner PIN
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                This panel is strictly restricted to the app owner. Public users cannot access or view your credentials, links, or customer payments.
              </p>
            </div>

            <form onSubmit={handleVerifyPin} className="space-y-3 pt-2">
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter 4-digit PIN (Default: 8821)"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-center font-mono tracking-widest text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  autoFocus
                />
              </div>

              {pinError && (
                <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center justify-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{pinError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={verifyingPin || !pinInput.trim()}
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/25 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Unlock className="w-4 h-4" />
                <span>{verifyingPin ? 'Verifying...' : 'Unlock Owner Settings'}</span>
              </button>
            </form>

            <p className="text-[11px] font-mono text-slate-500">
              Default factory PIN is <strong className="text-slate-300">8821</strong>. You can change this inside once unlocked.
            </p>
          </div>
        ) : (
          /* AUTHENTICATED OWNER CONFIGURATION PANEL */
          <div className="flex-1 overflow-y-auto py-5 space-y-6">
            {/* Top Owner Status Bar */}
            <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-emerald-300 font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verified Owner Session Active</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowChangePin(!showChangePin)}
                  className="text-slate-400 hover:text-white underline font-mono text-[11px] cursor-pointer"
                >
                  {showChangePin ? 'Hide PIN Changer' : 'Change Secret PIN'}
                </button>
                <span className="text-slate-700">|</span>
                <button
                  type="button"
                  onClick={onAdminLogout}
                  className="text-rose-400 hover:text-rose-300 flex items-center gap-1 font-mono text-[11px] cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Lock & Log Out</span>
                </button>
              </div>
            </div>

            {/* Change Secret PIN Box (Collapsible) */}
            {showChangePin && (
              <form onSubmit={handleChangePin} className="p-4 rounded-2xl bg-slate-900 border border-indigo-500/40 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-300">
                  <KeyRound className="w-4 h-4 text-indigo-400" />
                  <span>Update Owner Passcode / PIN</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newPinInput}
                    onChange={(e) => setNewPinInput(e.target.value)}
                    placeholder="Enter new 4+ digit PIN (e.g. 5920)"
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl text-xs font-bold font-mono transition-all cursor-pointer"
                  >
                    Save New PIN
                  </button>
                </div>
                {changePinMsg && (
                  <p className={`text-xs ${changePinMsg.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {changePinMsg.text}
                  </p>
                )}
              </form>
            )}

            {/* WhatsApp Channel Config */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-emerald-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Destination Link (Where paying users get redirected)</span>
                </div>
                <button
                  type="button"
                  onClick={handleTestWhatsApp}
                  className="text-[11px] font-mono text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Test Link</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">
                  WhatsApp Channel / Group URL
                </label>
                <input
                  type="url"
                  value={whatsappUrl}
                  onChange={(e) => setWhatsappUrl(e.target.value)}
                  placeholder="https://whatsapp.com/channel/..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">
                  Channel Title / Brand Display Name
                </label>
                <input
                  type="text"
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                  placeholder="e.g. ApexMatch VIP Match Intelligence"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Quick Helper for WhatsApp Channel */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <span className="font-bold text-slate-300 block flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
                  How to copy your WhatsApp Channel link:
                </span>
                <ol className="list-decimal list-inside space-y-0.5 text-slate-400 pl-1">
                  <li>Open WhatsApp &gt; Tap the <strong>Updates</strong> tab.</li>
                  <li>Tap <strong>Channels</strong> &gt; Create Channel (or select existing).</li>
                  <li>Tap channel name at top &gt; <strong>Copy Link</strong>.</li>
                  <li>Paste into the URL box above.</li>
                </ol>
              </div>
            </div>

            {/* Paystack Payment Config */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <CreditCard className="w-4 h-4 text-indigo-400" />
                <span>Paystack Public Key (For Live Customer Payments)</span>
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">
                  Paystack Public Key (<code>pk_live_...</code> or <code>pk_test_...</code>)
                </label>
                <input
                  type="text"
                  value={paystackKey}
                  onChange={(e) => setPaystackKey(e.target.value)}
                  placeholder="pk_live_xxxxxxxxxxxxxxxxxxxxxxxx"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                />
                <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                  Found on Paystack Dashboard &gt; Settings &gt; API Keys & Webhooks.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="text-[11px] font-mono text-slate-400 block mb-1">
                    Storefront Default Currency
                  </label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="NGN">NGN (Nigerian Naira ₦)</option>
                    <option value="GHS">GHS (Ghanaian Cedi GH₵)</option>
                    <option value="KES">KES (Kenyan Shilling KSh)</option>
                    <option value="ZAR">ZAR (South African Rand R)</option>
                    <option value="USD">USD (US Dollar $)</option>
                  </select>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase block font-mono">Test Mode</span>
                    <span className="text-emerald-400 font-bold font-mono">Instant Demo Enabled</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Users can pay live or use demo pass</span>
                </div>
              </div>
            </div>

            {/* Transactions / Subscriber Log (Owner Eyes Only) */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>Customer Purchases Log ({recentTransactions.length})</span>
                </span>
                <span className="text-[10px] font-mono text-slate-500">Only visible to authenticated owner</span>
              </div>

              {recentTransactions.length > 0 ? (
                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {recentTransactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs font-mono"
                    >
                      <div>
                        <span className="text-white font-bold">{tx.email}</span>
                        <span className="text-slate-500 text-[10px] block">
                          {tx.planId} • {new Date(tx.timestamp).toLocaleDateString()} • Ref: {tx.reference}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-emerald-400 font-bold">
                          {tx.currency} {(tx.amount / (tx.currency === 'NGN' ? 100 : 1)).toLocaleString()}
                        </span>
                        <span className="text-emerald-400/80 text-[9px] block">Verified & Redirected</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">No customer payments recorded yet.</p>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        {isAdminAuthed && (
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <div>
              {savedSuccess && (
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  Settings saved successfully!
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save Settings'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
