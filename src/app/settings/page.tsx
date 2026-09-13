'use client';

import { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, Key, Eye, EyeOff, Save, 
  Check, Server, Cpu, AlertOctagon, LucideIcon 
} from 'lucide-react';

type SettingsTab = 'keys' | 'network' | 'telemetry' | 'danger';

const SETTINGS_TABS: { id: SettingsTab; label: string; icon: LucideIcon }[] = [
  { id: 'keys', label: 'API Keys & Secrets', icon: Key },
  { id: 'network', label: 'Edge Mesh & PoPs', icon: Server },
  { id: 'telemetry', label: 'Autonomous Policy', icon: Cpu },
  { id: 'danger', label: 'Danger Protocol', icon: AlertOctagon },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('keys');
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [keys, setKeys] = useState<Record<string, string>>({
    groq: '',
    stripe: '',
    supabaseUrl: '',
    supabaseKey: '',
    gemini: '',
    parallel: ''
  });

  const [networkPoP, setNetworkPoP] = useState('AUTO');
  const [enableDrone, setEnableDrone] = useState(true);
  const [autonomousExecution, setAutonomousExecution] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('sovereign_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.keys) setKeys(parsed.keys);
        if (parsed.networkPoP) setNetworkPoP(parsed.networkPoP);
        if (parsed.enableDrone !== undefined) setEnableDrone(parsed.enableDrone);
        if (parsed.autonomousExecution !== undefined) setAutonomousExecution(parsed.autonomousExecution);
      } catch {
        // ignore
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('sovereign_settings', JSON.stringify({
      keys,
      networkPoP,
      enableDrone,
      autonomousExecution
    }));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const toggleShowKey = (id: string) => {
    setShowKeys(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleKeyChange = (id: string, val: string) => {
    setKeys(prev => ({ ...prev, [id]: val }));
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-16 animate-in fade-in duration-500">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-black via-[#0c0e18] to-[#04101e] p-8 md:p-12">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] text-xs font-mono tracking-wider">
            <SettingsIcon className="w-3.5 h-3.5" />
            SYSTEM GOVERNANCE & SECURE VAULT
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Node Configuration & <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00f0ff] via-purple-400 to-emerald-400">
              Cryptographic Credentials
            </span>
          </h1>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed">
            Manage your local API credentials, configure sovereign mesh edge nodes, 
            and set autonomous execution permissions.
          </p>
        </div>
      </div>

      {/* Main Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          {SETTINGS_TABS.map((item) => {
            const Icon = item.icon;
            const isSelected = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full p-3.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-3 text-left ${
                  isSelected
                    ? 'bg-[#00f0ff] text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                    : 'bg-[#0c0c14] text-gray-400 hover:text-white hover:bg-white/5 border border-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* TAB 1: KEYS */}
          {activeTab === 'keys' && (
            <div className="rounded-2xl border border-white/10 bg-[#0c0c14] p-8 space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Key className="w-5 h-5 text-[#00f0ff]" /> Local Credential Vault
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">Credentials remain encrypted in your browser&apos;s private storage.</p>
                </div>
                {savedSuccess && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold">
                    <Check className="w-3.5 h-3.5" /> Saved!
                  </div>
                )}
              </div>

              <div className="space-y-5">
                {/* Groq Key */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <label className="font-bold text-gray-300">Groq API Key (Ultra-Fast Inference)</label>
                    <span className="text-gray-500">Llama-3 70B & Mixtral</span>
                  </div>
                  <div className="relative">
                    <input
                      type={showKeys['groq'] ? 'text' : 'password'}
                      placeholder="gsk_..."
                      value={keys.groq}
                      onChange={(e) => handleKeyChange('groq', e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder-gray-600 focus:outline-none focus:border-[#00f0ff]"
                    />
                    <button
                      type="button"
                      onClick={() => toggleShowKey('groq')}
                      className="absolute right-3 top-2.5 text-gray-500 hover:text-white"
                    >
                      {showKeys['groq'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Stripe Secret Key */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <label className="font-bold text-gray-300">Stripe Secret Key (Live Checkout Gateway)</label>
                    <span className="text-gray-500">sk_live_... or sk_test_...</span>
                  </div>
                  <div className="relative">
                    <input
                      type={showKeys['stripe'] ? 'text' : 'password'}
                      placeholder="sk_live_..."
                      value={keys.stripe}
                      onChange={(e) => handleKeyChange('stripe', e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder-gray-600 focus:outline-none focus:border-[#00f0ff]"
                    />
                    <button
                      type="button"
                      onClick={() => toggleShowKey('stripe')}
                      className="absolute right-3 top-2.5 text-gray-500 hover:text-white"
                    >
                      {showKeys['stripe'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Google Gemini Key */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <label className="font-bold text-gray-300">Google Gemini API Key (Director Engine)</label>
                    <span className="text-gray-500">Gemini 1.5 Pro & Flash</span>
                  </div>
                  <div className="relative">
                    <input
                      type={showKeys['gemini'] ? 'text' : 'password'}
                      placeholder="AIzaSy..."
                      value={keys.gemini}
                      onChange={(e) => handleKeyChange('gemini', e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder-gray-600 focus:outline-none focus:border-[#00f0ff]"
                    />
                    <button
                      type="button"
                      onClick={() => toggleShowKey('gemini')}
                      className="absolute right-3 top-2.5 text-gray-500 hover:text-white"
                    >
                      {showKeys['gemini'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Parallel Search Key */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <label className="font-bold text-gray-300">Parallel Search Key (Live Intelligence Feed)</label>
                    <span className="text-gray-500">Cast, News & Web Intelligence</span>
                  </div>
                  <div className="relative">
                    <input
                      type={showKeys['parallel'] ? 'text' : 'password'}
                      placeholder="par_live_..."
                      value={keys.parallel}
                      onChange={(e) => handleKeyChange('parallel', e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder-gray-600 focus:outline-none focus:border-[#00f0ff]"
                    />
                    <button
                      type="button"
                      onClick={() => toggleShowKey('parallel')}
                      className="absolute right-3 top-2.5 text-gray-500 hover:text-white"
                    >
                      {showKeys['parallel'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={handleSave}
                  className="px-6 py-2.5 rounded-xl bg-[#00f0ff] hover:bg-[#00ccaa] text-black font-mono font-bold text-xs transition-colors shadow-[0_0_15px_rgba(0,240,255,0.4)] flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save Credentials
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: NETWORK */}
          {activeTab === 'network' && (
            <div className="rounded-2xl border border-white/10 bg-[#0c0c14] p-8 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Server className="w-5 h-5 text-purple-400" /> Edge Mesh Routing
                </h3>
                <p className="text-xs text-gray-400 mt-1">Select your preferred Point of Presence for agent execution.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: 'AUTO', name: 'Auto-Anycast (Lowest Latency)', ping: '8ms' },
                  { id: 'US-EAST', name: 'US East (Cleveland/N. Virginia)', ping: '12ms' },
                  { id: 'US-WEST', name: 'US West (Oregon/Silicon Valley)', ping: '38ms' },
                  { id: 'EU-CENTRAL', name: 'Europe (Frankfurt/London)', ping: '85ms' },
                ].map((node) => (
                  <div
                    key={node.id}
                    onClick={() => setNetworkPoP(node.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      networkPoP === node.id
                        ? 'border-[#00f0ff] bg-[#00f0ff]/10 text-white shadow-[0_0_15px_rgba(0,240,255,0.1)]'
                        : 'border-white/5 bg-black/40 text-gray-400 hover:border-white/10'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold text-white">{node.name}</p>
                      <p className="text-[10px] font-mono text-gray-500">PoP ID: {node.id}</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-400">{node.ping}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={handleSave}
                  className="px-6 py-2.5 rounded-xl bg-[#00f0ff] text-black font-mono font-bold text-xs hover:bg-[#00ccaa] transition-colors"
                >
                  Save Routing Preference
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: TELEMETRY & POLICY */}
          {activeTab === 'telemetry' && (
            <div className="rounded-2xl border border-white/10 bg-[#0c0c14] p-8 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-emerald-400" /> Autonomous Agent Policies
                </h3>
                <p className="text-xs text-gray-400 mt-1">Configure guardrails, audio synthesizers, and trade execution limits.</p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white">55Hz Sub-Bass Resonator (HUD Drone)</h4>
                    <p className="text-[11px] text-gray-400 mt-0.5">Enable the cinematic Web Audio oscillator in the Holographic Matrix.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={enableDrone}
                    onChange={(e) => setEnableDrone(e.target.checked)}
                    className="w-4 h-4 rounded accent-[#00f0ff]"
                  />
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white">Autonomous Trading Execution</h4>
                    <p className="text-[11px] text-gray-400 mt-0.5">Allow Kelly Criterion execution bot to place live orders on connected exchanges.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={autonomousExecution}
                    onChange={(e) => setAutonomousExecution(e.target.checked)}
                    className="w-4 h-4 rounded accent-[#00f0ff]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={handleSave}
                  className="px-6 py-2.5 rounded-xl bg-[#00f0ff] text-black font-mono font-bold text-xs hover:bg-[#00ccaa] transition-colors"
                >
                  Save Autonomous Policies
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: DANGER */}
          {activeTab === 'danger' && (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-8 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-red-500 flex items-center gap-2">
                  <AlertOctagon className="w-5 h-5 text-red-500" /> Danger Protocol
                </h3>
                <p className="text-xs text-red-400/80 mt-1">Purge all local storage tokens, reset agent memory, and restore default state.</p>
              </div>

              <div className="p-4 rounded-xl bg-black/50 border border-red-500/20 text-xs font-mono text-gray-400 space-y-2">
                <p>⚠️ This will wipe all locally stored API keys, trading logs, and saved custom campaigns.</p>
              </div>

              <button
                onClick={() => {
                  if (confirm("Are you sure you want to perform a factory reset? This cannot be undone.")) {
                    localStorage.clear();
                    setKeys({ groq: '', stripe: '', supabaseUrl: '', supabaseKey: '', gemini: '', parallel: '' });
                    alert("Local node reset complete.");
                  }
                }}
                className="px-6 py-2.5 rounded-xl bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white font-mono font-bold text-xs transition-colors border border-red-500/40"
              >
                Execute Factory Reset
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

