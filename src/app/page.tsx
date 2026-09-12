'use client';
import Link from 'next/link';
import { Activity, BrainCircuit, ShieldCheck, TrendingUp, Megaphone, Mic, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Home() {
  const stats = [
    { label: 'Pre-IPO Intelligence', value: '$1.8T+', sub: '8 Tier-1 Candidates (ANTH, OPEN, DATA)', icon: BrainCircuit, color: 'text-purple-400', shadow: 'rgba(168,85,247,0.5)' },
    { label: 'Contract Risk Analyzed', value: '$12M+', sub: 'SignSafe AI Predatory Clause Detector', icon: ShieldCheck, color: 'text-[#00ffcc]', shadow: 'rgba(0,255,204,0.5)' },
    { label: 'Quant Portfolio Equity', value: '$148.2K', sub: '+18.4% Win-Rate Optimized Scalper', icon: TrendingUp, color: 'text-blue-400', shadow: 'rgba(96,165,250,0.5)' },
    { label: 'Autonomous Swarm Uptime', value: '99.99%', sub: '103 Distributed Edge & Cloud Daemons', icon: Activity, color: 'text-green-400', shadow: 'rgba(74,222,128,0.5)' },
  ];

  const flagshipApps = [
    {
      title: 'IPO Brain Scanner',
      desc: 'Predictive intelligence tracking Anthropic, OpenAI, Databricks, and Stripe confidential S-1 filings and valuation run-rates.',
      href: '/ipo-brain',
      badge: 'INTELLIGENCE',
      icon: BrainCircuit,
      color: 'border-purple-500/40 hover:border-purple-400',
      accent: 'text-purple-400',
      features: ['Confidential draft S-1 tracker', 'Multi-billion valuation brackets', 'Realtime probability radar']
    },
    {
      title: 'SignSafe ContractScan AI',
      desc: 'Autonomous contract risk engine detecting uncapped indemnity, lock-in auto-renewals, and IP forfeiture in 60 seconds.',
      href: '/contracts',
      badge: 'LEGAL RISK',
      icon: ShieldCheck,
      color: 'border-[#00ffcc]/40 hover:border-[#00ffcc]',
      accent: 'text-[#00ffcc]',
      features: ['0-100% aggregate risk scoring', 'Line-by-line redline guidance', 'Plain-English executive summaries']
    },
    {
      title: 'Quant Trading Terminal',
      desc: 'High-frequency algorithmic execution terminal with grid scalpers, pre-IPO sentiment triggers, and live interactive candlestick charts.',
      href: '/trading',
      badge: 'QUANT TRADING',
      icon: TrendingUp,
      color: 'border-blue-500/40 hover:border-blue-400',
      accent: 'text-blue-400',
      features: ['Pre-IPO token pair charts', 'Kelly Criterion position sizing', 'Real-time orderbook simulation']
    },
    {
      title: 'Autonomous Marketing OS',
      desc: 'Viral multi-channel ad campaign generator with Sellvia dropshipping winning-product integrations.',
      href: '/marketing',
      badge: 'COMMERCIAL E-COM',
      icon: Megaphone,
      color: 'border-orange-500/40 hover:border-orange-400',
      accent: 'text-orange-400',
      features: ['Multi-platform ad hook creation', 'Sellvia winning product scraper', 'Instant copy-to-clipboard']
    }
  ];

  return (
    <div className="space-y-12 max-w-7xl mx-auto py-4 animate-in fade-in duration-500">
      {/* Hero Header */}
      <div className="pb-8 border-b border-white/10 relative">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full bg-[#00ffcc]/10 border border-[#00ffcc]/30 text-[#00ffcc] font-mono text-xs font-bold uppercase tracking-widest">
            ● All Systems Operational // Production Flagship
          </span>
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 font-mono text-xs">
            19 Consolidated Subsystems
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
          SOVEREIGN MATRIX
        </h1>
        <p className="text-[#00ffcc] mt-2 font-mono text-sm uppercase tracking-[0.25em] drop-shadow-[0_0_8px_rgba(0,255,204,0.5)]">
          &gt; Unified Autonomous Operating System // Public Command Release
        </p>
        <p className="text-gray-400 text-sm max-w-3xl mt-4 leading-relaxed font-sans">
          The all-in-one sovereign intelligence platform. Combining pre-IPO enterprise analytics, autonomous legal contract risk redlining, algorithmic quant trading, and marketing pipelines into a single high-performance edge application.
        </p>

        {/* Quick Launch Buttons */}
        <div className="flex flex-wrap items-center gap-4 mt-8">
          <Link
            href="/ipo-brain"
            className="px-6 py-3.5 bg-[#00ffcc] text-black font-mono font-black text-xs uppercase tracking-wider rounded-xl hover:bg-[#00ccaa] transition-all shadow-[0_0_20px_rgba(0,255,204,0.35)] flex items-center gap-2"
          >
            Launch IPO Brain <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contracts"
            className="px-6 py-3.5 bg-white/10 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-white/20 border border-white/15 transition-all flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-[#00ffcc]" /> Scan Contract (SignSafe)
          </Link>
          <Link
            href="/trading"
            className="px-6 py-3.5 bg-black/50 text-gray-300 font-mono text-xs uppercase tracking-wider rounded-xl hover:text-white hover:border-white/30 border border-white/10 transition-all flex items-center gap-2"
          >
            <TrendingUp className="w-4 h-4 text-blue-400" /> Quant Terminal
          </Link>
          <Link
            href="/hud"
            className="px-6 py-3.5 bg-purple-500/10 text-purple-300 font-mono text-xs uppercase tracking-wider rounded-xl hover:bg-purple-500/20 border border-purple-500/30 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-purple-400" /> Holographic HUD & Deck
          </Link>
        </div>
      </div>
      
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="glass-panel rounded-2xl p-6 relative group overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_25px_rgba(255,255,255,0.08)] hover:border-white/25 cursor-default"
            >
              <div className="flex justify-between items-start mb-4">
                <p className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                  <Icon className={`w-5 h-5 ${stat.color}`} style={{ filter: `drop-shadow(0 0 8px ${stat.shadow})` }} />
                </div>
              </div>
              <p className="text-4xl font-black text-white font-mono">{stat.value}</p>
              <p className="text-xs mt-2 font-mono text-gray-400 truncate">{stat.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Flagship Product Showcase Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">Public Flagship Applications</h2>
            <p className="text-gray-400 text-xs font-mono mt-1">Four autonomous commercial modules ready for public access</p>
          </div>
          <Link href="/projects" className="text-xs font-mono text-[#00ffcc] hover:underline flex items-center gap-1">
            View All 19 Builds <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {flagshipApps.map((app) => {
            const Icon = app.icon;
            return (
              <div
                key={app.title}
                className={`glass-panel rounded-2xl p-8 border ${app.color} transition-all duration-300 flex flex-col justify-between space-y-6 bg-black/40 group hover:shadow-[0_0_30px_rgba(0,255,204,0.1)]`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border tracking-widest bg-white/5 ${app.accent}`}>
                      {app.badge}
                    </span>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <Icon className={`w-5 h-5 ${app.accent}`} />
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-white group-hover:text-[#00ffcc] transition-colors">
                    {app.title}
                  </h3>
                  <p className="text-xs text-gray-300 mt-2 leading-relaxed font-sans">
                    {app.desc}
                  </p>

                  <div className="space-y-2 mt-6 pt-6 border-t border-white/10">
                    {app.features.map((f, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-mono text-gray-400">
                        <CheckCircle2 className={`w-3.5 h-3.5 ${app.accent} flex-shrink-0`} />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={app.href}
                  className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/15 border border-white/15 text-white font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 group-hover:border-[#00ffcc]/50 group-hover:text-[#00ffcc]"
                >
                  Open Application <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Swarm Feed & Fast Audio Studio Footer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Realtime Telemetry Feed */}
        <div className="glass-panel rounded-2xl p-6 border border-white/10 lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-bold text-white uppercase tracking-widest text-xs flex items-center gap-2 font-mono">
              <Activity className="w-4 h-4 text-[#00ffcc] animate-pulse" /> Live Swarm Telemetry Log
            </h3>
            <span className="text-[10px] font-mono text-gray-500">Autonomous Edge Stream</span>
          </div>

          <div className="space-y-3 font-mono text-xs text-gray-400 max-h-[160px] overflow-y-auto pr-2">
            <p><span className="text-gray-500">[16:20:10]</span> <span className="text-[#00ffcc]">[IPO-BRAIN]</span> Anthropic S-1 confidential filing weight updated to 0.92.</p>
            <p><span className="text-gray-500">[16:20:45]</span> <span className="text-green-400">[SIGNSAFE]</span> 4 predatory indemnification clauses blocked in SaaS agreement.</p>
            <p><span className="text-gray-500">[16:21:12]</span> <span className="text-blue-400">[QUANT-BOT]</span> ANTH/USD long execution confirmed at $924.50 (+4.82%).</p>
            <p><span className="text-gray-500">[16:22:00]</span> <span className="text-purple-400">[VOICE-ENGINE]</span> Browser audio synthesis initialized with 60 FPS visualizer buffer.</p>
            <p className="animate-pulse"><span className="text-gray-500">[16:23:15]</span> <span className="text-amber-400">[SYSTEM]</span> Unified public release active. All 19 subsystems synced.</p>
          </div>
        </div>

        {/* Quick Voice / HUD Teaser */}
        <div className="glass-panel rounded-2xl p-6 border border-white/10 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="font-bold text-white uppercase tracking-widest text-xs font-mono flex items-center gap-2">
              <Mic className="w-4 h-4 text-orange-400" /> Neural Audio Studio
            </h3>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              Test native in-browser voice synthesis with zero API latency.
            </p>
          </div>

          <Link
            href="/voice"
            className="w-full py-3 bg-orange-500 text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-orange-400 transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(251,146,60,0.3)]"
          >
            Launch Voice Studio <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
