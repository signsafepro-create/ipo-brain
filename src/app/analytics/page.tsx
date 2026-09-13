'use client';

import { useState } from 'react';
import { 
  BarChart3, TrendingUp, Users, Activity, Globe, 
  ArrowUpRight, ArrowDownRight, RefreshCw 
} from 'lucide-react';

type TimeRange = '24h' | '7d' | '30d' | '1y';

interface TimeData {
  traffic: string;
  trafficTrend: string;
  requests: string;
  requestsTrend: string;
  bandwidth: string;
  bandwidthTrend: string;
  conversion: string;
  conversionTrend: string;
  svgPath: string;
  svgFill: string;
}

const TIMEFRAME_DATA: Record<TimeRange, TimeData> = {
  '24h': {
    traffic: '64.2K', trafficTrend: '+8.4%',
    requests: '312.4K', requestsTrend: '+15.2%',
    bandwidth: '84.6 GB', bandwidthTrend: '-1.2%',
    conversion: '5.2%', conversionTrend: '+0.8%',
    svgPath: "M0,75 Q25,85 50,45 T100,20",
    svgFill: "M0,75 Q25,85 50,45 T100,20 L100,100 L0,100 Z"
  },
  '7d': {
    traffic: '248.1K', trafficTrend: '+18.9%',
    requests: '1.4M', requestsTrend: '+22.4%',
    bandwidth: '410.2 GB', bandwidthTrend: '+4.5%',
    conversion: '4.9%', conversionTrend: '+1.1%',
    svgPath: "M0,80 Q30,60 60,35 T100,15",
    svgFill: "M0,80 Q30,60 60,35 T100,15 L100,100 L0,100 Z"
  },
  '30d': {
    traffic: '842.5K', trafficTrend: '+24.5%',
    requests: '4.2M', requestsTrend: '+12.1%',
    bandwidth: '1.2 TB', bandwidthTrend: '-2.4%',
    conversion: '4.8%', conversionTrend: '+1.2%',
    svgPath: "M0,85 Q20,70 45,50 T100,10",
    svgFill: "M0,85 Q20,70 45,50 T100,10 L100,100 L0,100 Z"
  },
  '1y': {
    traffic: '9.4M', trafficTrend: '+142.0%',
    requests: '52.8M', requestsTrend: '+198.5%',
    bandwidth: '14.8 TB', bandwidthTrend: '+85.0%',
    conversion: '4.6%', conversionTrend: '+2.4%',
    svgPath: "M0,90 Q35,80 70,30 T100,5",
    svgFill: "M0,90 Q35,80 70,30 T100,5 L100,100 L0,100 Z"
  },
};

const REGIONS = [
  { name: 'North America (East/West)', pct: 48, latency: '8ms', nodes: 32 },
  { name: 'Western Europe (Frankfurt/London)', pct: 28, latency: '14ms', nodes: 24 },
  { name: 'Asia Pacific (Tokyo/Singapore)', pct: 16, latency: '42ms', nodes: 14 },
  { name: 'Latin America (São Paulo)', pct: 5, latency: '68ms', nodes: 5 },
  { name: 'Middle East & Africa', pct: 3, latency: '82ms', nodes: 3 },
];

export default function Analytics() {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const activeData = TIMEFRAME_DATA[timeRange];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const metrics = [
    { label: 'Unique Visitors', value: activeData.traffic, trend: activeData.trafficTrend, icon: Users, color: 'text-emerald-400' },
    { label: 'Agent Invocations', value: activeData.requests, trend: activeData.requestsTrend, icon: Activity, color: 'text-[#00f0ff]' },
    { label: 'Network Egress', value: activeData.bandwidth, trend: activeData.bandwidthTrend, icon: Globe, color: 'text-blue-400' },
    { label: 'Conversion Rate', value: activeData.conversion, trend: activeData.conversionTrend, icon: TrendingUp, color: 'text-purple-400' }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-[#00f0ff] drop-shadow-[0_0_12px_rgba(0,240,255,0.8)]" />
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white">Global Telemetry & Analytics</h1>
            <p className="text-gray-400 text-xs mt-1">Real-time edge performance, agent network throughput, and traffic metrics.</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Timeframe selector */}
          <div className="flex items-center bg-[#0c0c14] border border-white/10 p-1 rounded-xl">
            {(['24h', '7d', '30d', '1y'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1 text-xs font-mono font-bold rounded-lg uppercase transition-all ${
                  timeRange === r 
                    ? 'bg-[#00f0ff] text-black shadow-[0_0_10px_rgba(0,240,255,0.4)]' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <button
            onClick={handleRefresh}
            className={`p-2.5 rounded-xl border border-white/10 bg-[#0c0c14] hover:bg-white/5 text-gray-300 transition-colors ${
              isRefreshing ? 'animate-spin text-[#00f0ff]' : ''
            }`}
            title="Refresh Telemetry"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, i) => {
          const Icon = metric.icon;
          const isPositive = metric.trend.startsWith('+');
          return (
            <div key={i} className="rounded-2xl border border-white/10 bg-[#0c0c14] p-6 flex flex-col justify-between h-36 hover:border-white/20 transition-all">
              <div className="flex items-start justify-between">
                <p className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">{metric.label}</p>
                <Icon className={`w-5 h-5 ${metric.color}`} />
              </div>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-mono font-black text-white">{metric.value}</p>
                <div className={`inline-flex items-center gap-0.5 text-xs font-mono font-bold px-2 py-0.5 rounded ${
                  isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                }`}>
                  {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                  {metric.trend}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Interactive Chart + Regional Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dynamic Trajectory Chart */}
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-[#0c0c14] p-6 h-[420px] flex flex-col relative overflow-hidden justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-mono font-bold text-white uppercase tracking-wider text-xs">
                Request Throughput Trajectory ({timeRange.toUpperCase()})
              </h3>
              <p className="text-xs text-gray-500 mt-0.5 font-mono">Edge Ingest Rate vs. Model Inference Time</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00f0ff]" />
                <span className="text-gray-300">Throughput</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="text-gray-300">200 OK Status</span>
              </div>
            </div>
          </div>

          {/* SVG Canvas Chart */}
          <div className="flex-1 border-l border-b border-white/10 relative flex items-end overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:100%_20%] pointer-events-none" />
            <svg className="w-full h-full preserve-aspect-ratio-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path 
                d={activeData.svgFill} 
                fill="url(#chartGradient)" 
                className="transition-all duration-700 ease-out" 
              />
              <path 
                d={activeData.svgPath} 
                fill="none" 
                stroke="#00f0ff" 
                strokeWidth="2.5" 
                vectorEffect="non-scaling-stroke" 
                className="transition-all duration-700 ease-out drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]" 
              />
            </svg>
          </div>

          <div className="flex justify-between pt-3 text-[10px] font-mono text-gray-500">
            <span>START OF PERIOD</span>
            <span>50% ELAPSED</span>
            <span>CURRENT TIME (LIVE)</span>
          </div>
        </div>

        {/* Regional Geo Distribution */}
        <div className="rounded-2xl border border-white/10 bg-[#0c0c14] p-6 h-[420px] flex flex-col justify-between">
          <div>
            <h3 className="font-mono font-bold text-white uppercase tracking-wider text-xs mb-1">
              Regional Edge Ingest
            </h3>
            <p className="text-xs text-gray-500 font-mono">Distributed across 78 Edge PoPs</p>
          </div>

          <div className="space-y-4 my-auto">
            {REGIONS.map((region) => (
              <div key={region.name} className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-300 font-medium truncate max-w-[180px]">{region.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 text-[10px]">{region.latency}</span>
                    <span className="text-[#00f0ff] font-bold">{region.pct}%</span>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#00f0ff] to-emerald-400 rounded-full transition-all duration-500" 
                    style={{ width: `${region.pct}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-400">
            <span>Global Edge Routing</span>
            <span className="text-emerald-400 font-bold">100% Anycast</span>
          </div>
        </div>
      </div>
    </div>
  );
}

