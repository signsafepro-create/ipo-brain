import { BarChart3, TrendingUp, Users, Activity, Globe } from 'lucide-react';

export default function Analytics() {
  const metrics = [
    { label: 'Total Traffic', value: '842.5K', trend: '+24.5%', icon: Users, color: 'text-emerald-400' },
    { label: 'API Requests', value: '4.2M', trend: '+12.1%', icon: Activity, color: 'text-[#00ffcc]' },
    { label: 'Bandwidth', value: '1.2 TB', trend: '-2.4%', icon: Globe, color: 'text-blue-400' },
    { label: 'Conversion', value: '4.8%', trend: '+1.2%', icon: TrendingUp, color: 'text-[#aa00ff]' }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="pb-4 border-b border-white/10 flex items-center gap-3">
        <BarChart3 className="w-8 h-8 text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Global Analytics</h1>
          <p className="text-gray-400 mt-1">Real-time telemetry across the Sovereign Stack</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, i) => {
          const Icon = metric.icon;
          const isPositive = metric.trend.startsWith('+');
          return (
            <div key={i} className="glass-panel rounded-xl p-6 border border-white/10 flex flex-col justify-between h-32 hover:border-white/30 transition-colors">
              <div className="flex items-start justify-between">
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">{metric.label}</p>
                <Icon className={`w-5 h-5 ${metric.color}`} />
              </div>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-black text-white">{metric.value}</p>
                <p className={`text-xs font-mono font-bold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>{metric.trend}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 border border-white/10 h-[400px] flex flex-col relative overflow-hidden">
          <h3 className="font-bold text-white uppercase tracking-widest text-xs mb-6">Traffic Volume (30 Days)</h3>
          {/* Mock Graph */}
          <div className="flex-1 border-l border-b border-white/10 relative flex items-end">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:100%_20%]"></div>
            <svg className="w-full h-full preserve-aspect-ratio-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,100 L0,80 C20,80 30,50 50,60 C70,70 80,20 100,10 L100,100 Z" fill="url(#gradient)" opacity="0.3"/>
              <path d="M0,80 C20,80 30,50 50,60 C70,70 80,20 100,10" fill="none" stroke="#00ffcc" strokeWidth="2" vectorEffect="non-scaling-stroke"/>
              <defs>
                <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#00ffcc" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-white/10 h-[400px] flex flex-col">
          <h3 className="font-bold text-white uppercase tracking-widest text-xs mb-6">Top Regions</h3>
          <div className="space-y-6 flex-1">
            {['United States', 'United Kingdom', 'Germany', 'Japan', 'Canada'].map((region, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">{region}</span>
                  <span className="text-[#00ffcc] font-mono">{100 - (i * 15)}%</span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#00ffcc]" style={{ width: `${100 - (i * 15)}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
