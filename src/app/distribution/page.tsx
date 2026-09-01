import { Share2, MessageSquare, Briefcase, Video, Rss, ArrowRight } from 'lucide-react';

export default function DistributionEngine() {
  const networks = [
    { name: 'X / Twitter', handle: '@ipo_brain', status: 'Connected', icon: MessageSquare, color: 'text-white' },
    { name: 'LinkedIn', handle: 'LILJR Empire', status: 'Connected', icon: Briefcase, color: 'text-[#0a66c2]' },
    { name: 'YouTube', handle: 'SovereignStack', status: 'Disconnected', icon: Video, color: 'text-[#ff0000]' },
    { name: 'Newsletter', handle: 'Omni-Brain Substack', status: 'Connected', icon: Rss, color: 'text-orange-500' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="pb-4 border-b border-white/10 flex items-center gap-3">
        <Share2 className="w-8 h-8 text-[#00ffcc] drop-shadow-[0_0_10px_rgba(0,255,204,0.8)]" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Distribution Engine</h1>
          <p className="text-gray-400 mt-1">Global Omni-Channel Content Syndication</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Network Status */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="font-bold text-white uppercase tracking-widest text-xs mb-4">Neural Nodes</h3>
          {networks.map((net, i) => {
            const Icon = net.icon;
            const isConnected = net.status === 'Connected';
            return (
              <div key={i} className={`glass-panel rounded-xl p-4 border border-white/10 flex items-center justify-between ${isConnected ? 'hover:border-[#00ffcc]/30 cursor-pointer' : 'opacity-60 grayscale'}`}>
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${net.color}`} />
                  <div>
                    <p className="text-sm font-bold text-white">{net.name}</p>
                    <p className="text-xs text-gray-500">{net.handle}</p>
                  </div>
                </div>
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-[#00ffcc] shadow-[0_0_5px_rgba(0,255,204,0.8)]' : 'bg-red-500'}`}></div>
              </div>
            );
          })}
          <button className="w-full py-3 bg-white/5 border border-white/10 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-white/10 transition-colors">
            + Connect Node
          </button>
        </div>

        {/* Broadcasting Deck */}
        <div className="lg:col-span-3 glass-panel rounded-2xl p-6 border border-white/10 h-fit space-y-6">
          <h3 className="font-bold text-white uppercase tracking-widest text-xs">Broadcast Payload</h3>
          
          <div className="space-y-4">
            <textarea 
              rows={5}
              placeholder="Inject payload content here... (Markdown supported)"
              className="w-full bg-black/50 border border-white/20 rounded-xl p-4 text-white focus:outline-none focus:border-[#00ffcc] transition-colors resize-none text-sm"
            ></textarea>
            
            <div className="flex items-center gap-4">
              <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-center border-dashed cursor-pointer hover:bg-white/10 transition-colors">
                <span className="text-sm text-gray-400">Attach Media (Images, Video, WebGL)</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 rounded bg-black border-white/20 accent-[#00ffcc]" />
                <span className="text-sm text-gray-400">Auto-optimize for each platform via AI</span>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-6 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors text-sm font-bold">
                  Schedule
                </button>
                <button className="px-8 py-2 bg-[#00ffcc] text-black font-black uppercase tracking-widest rounded-lg hover:bg-[#00ccaa] transition-colors shadow-[0_0_15px_rgba(0,255,204,0.4)] flex items-center gap-2">
                  Deploy <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
