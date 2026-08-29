import { Activity, Server, Zap, DollarSign, BrainCircuit } from 'lucide-react';

export default function Home() {
  const stats = [
    { label: 'Active Projects', value: '12', icon: Server, trend: '+3 this week', color: 'text-blue-400', shadow: 'rgba(96,165,250,0.5)' },
    { label: 'Total Revenue', value: ',250', icon: DollarSign, trend: '+12.5% MRR', color: 'text-[#00ffcc]', shadow: 'rgba(0,255,204,0.5)' },
    { label: 'API Calls', value: '1.2M', icon: Zap, trend: '980/sec', color: 'text-[#aa00ff]', shadow: 'rgba(170,0,255,0.5)' },
    { label: 'System Uptime', value: '99.99%', icon: Activity, trend: 'Stable / No Downtime', color: 'text-green-400', shadow: 'rgba(74,222,128,0.5)' },
  ];

  return (
    <div className="space-y-10 max-w-7xl mx-auto py-4">
      {/* Hero Header */}
      <div className="pb-8 border-b border-white/10 relative">
        <h1 className="text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-600">
          UNIFIED COMMAND
        </h1>
        <p className="text-[#00ffcc] mt-3 font-mono text-sm uppercase tracking-[0.3em] drop-shadow-[0_0_8px_rgba(0,255,204,0.5)]">
          &gt; LILJR Sovereign Stack // All Systems Operational
        </p>
      </div>
      
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="glass-panel rounded-2xl p-6 relative group overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:border-white/20 cursor-pointer">
              {/* Sweep Effect on Hover */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              
              <div className="flex justify-between items-start mb-6">
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                <div className={`p-2 rounded-lg bg-white/5 border border-white/10`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} style={{ filter: `drop-shadow(0 0 8px ${stat.shadow})` }} />
                </div>
              </div>
              <p className="text-4xl font-black text-white">{stat.value}</p>
              <p className={`text-xs mt-3 font-mono ${stat.color} font-bold tracking-wide`}>{stat.trend}</p>
            </div>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Graphic visualizer */}
         <div className="glass-panel rounded-2xl p-6 lg:col-span-2 h-[450px] border border-white/10 flex flex-col justify-center items-center relative overflow-hidden group">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,204,0.08)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
           <div className="absolute w-[200px] h-[200px] border border-[#00ffcc]/30 rounded-full animate-[spin_10s_linear_infinite] border-t-[#00ffcc]"></div>
           <div className="absolute w-[150px] h-[150px] border border-[#aa00ff]/30 rounded-full animate-[spin_7s_linear_infinite_reverse] border-b-[#aa00ff]"></div>
           <Activity className="w-12 h-12 text-[#00ffcc] mb-6 drop-shadow-[0_0_10px_rgba(0,255,204,0.8)]" />
           <p className="text-gray-400 font-mono text-sm tracking-widest">[ AWAITING HOLOGRAPHIC INJECTION ]</p>
         </div>

         {/* Agent Log */}
         <div className="glass-panel rounded-2xl p-6 h-[450px] border border-white/10 flex flex-col">
           <h3 className="font-bold text-white mb-6 uppercase tracking-widest text-sm flex items-center gap-2">
             <BrainCircuit className="w-4 h-4 text-[#aa00ff]"/> Neural Log
           </h3>
           <div className="flex-1 space-y-4 font-mono text-xs text-gray-400 overflow-y-auto">
              <p><span className="text-gray-500">05:40:01</span> <span className="text-[#00ffcc]">[SYSTEM]</span> Next.js Foundation Compiled.</p>
              <p><span className="text-gray-500">05:40:15</span> <span className="text-[#00ffcc]">[SYSTEM]</span> Web 4.0 Glow-Up Applied.</p>
              <p><span className="text-gray-500">05:40:42</span> <span className="text-blue-400">[NETWORK]</span> Synced to Vercel.</p>
              <p className="animate-pulse"><span className="text-gray-500">05:42:00</span> <span className="text-[#aa00ff]">[AGENT]</span> Awaiting orders from Prime Commander...</p>
           </div>
         </div>
      </div>
    </div>
  );
}
