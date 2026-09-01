import { Settings as SettingsIcon, Key, Shield } from 'lucide-react';

export default function Settings() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="pb-4 border-b border-white/10 flex items-center gap-3">
        <SettingsIcon className="w-8 h-8 text-gray-300" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">System Settings</h1>
          <p className="text-gray-400 mt-1">Configure Omni-Router connections and API keys.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-4">
        {/* Settings Navigation */}
        <div className="lg:col-span-1 space-y-2">
          {['Profile & Auth', 'API Keys', 'Database & Integrations', 'Danger Zone'].map((item, i) => (
            <div key={i} className={`px-4 py-3 rounded-lg text-sm font-medium cursor-pointer transition-colors ${i === 1 ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              {item}
            </div>
          ))}
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3 space-y-6">
          <div className="glass-panel rounded-2xl p-8 border border-white/10 space-y-8">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-1">
                <Key className="w-5 h-5 text-[#00ffcc]" /> API Keys & Secrets
              </h3>
              <p className="text-sm text-gray-400">These keys are stored locally and injected into the Omni-Router.</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Groq API Key (Fast Inference)</label>
                <div className="flex gap-4">
                  <input type="password" value="gsk_********************************" readOnly className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white font-mono text-sm focus:outline-none" />
                  <button className="px-6 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 transition-colors">Update</button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Stripe Secret Key (Billing)</label>
                <div className="flex gap-4">
                  <input type="password" placeholder="sk_live_..." className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white font-mono text-sm focus:outline-none focus:border-[#00ffcc]" />
                  <button className="px-6 py-2 bg-[#00ffcc] text-black font-bold rounded-lg text-sm hover:bg-[#00ccaa] transition-colors">Save</button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Supabase URL & Anon Key</label>
                <div className="space-y-3">
                  <input type="text" placeholder="https://xxxx.supabase.co" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white font-mono text-sm focus:outline-none focus:border-[#00ffcc]" />
                  <input type="password" placeholder="eyJhbG..." className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white font-mono text-sm focus:outline-none focus:border-[#00ffcc]" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="glass-panel rounded-2xl p-8 border border-red-500/30 bg-red-500/5 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-red-500 flex items-center gap-2 mb-1">
                <Shield className="w-5 h-5" /> Danger Zone
              </h3>
              <p className="text-sm text-red-400/80">Purge Memory Matrix cache or delete this module.</p>
            </div>
            <button className="px-6 py-3 bg-red-500/20 text-red-500 font-bold rounded-lg hover:bg-red-500 hover:text-white transition-all uppercase tracking-widest text-xs">
              Factory Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
