'use client';
import { useState } from 'react';
import { FolderGit2, ExternalLink } from 'lucide-react';

interface ProjectItem {
  id: string;
  name: string;
  score: number;
  category: 'FLAGSHIP' | 'DEPLOYED' | 'CORE' | 'FRONTEND' | 'TOOL';
  platform: string;
  stack: string[];
  status: 'ONLINE' | 'STANDBY' | 'READY';
  description: string;
  path: string;
  liveUrl?: string;
}

const MASTER_BUILDS: ProjectItem[] = [
  {
    id: '01',
    name: 'LILJR-SOVEREIGN-FINAL',
    score: 100,
    category: 'FLAGSHIP',
    platform: 'Vercel / Docker / Express',
    stack: ['Express 4.19', 'Stripe 15', 'SQLite3', 'Docker', 'Nginx'],
    status: 'ONLINE',
    description: 'Autonomous command center flagship with Stripe payment integration, SQLite database, and multi-agent coordination.',
    path: 'C:\\Users\\wjhmo\\LILJR-SOVEREIGN-FINAL',
    liveUrl: 'https://liljr-sovereign-final-liljr20pro-8188s-projects.vercel.app'
  },
  {
    id: '02',
    name: 'IPO Brain Unified Command',
    score: 95,
    category: 'FLAGSHIP',
    platform: 'Vercel Production',
    stack: ['Next.js 15', 'TypeScript', 'Tailwind', 'App Router'],
    status: 'ONLINE',
    description: 'Central public platform with pre-IPO candidate intelligence, valuation analytics, and executive signals.',
    path: 'C:\\Users\\wjhmo\\Downloads\\ipo-brain (2)',
    liveUrl: 'https://ipo-brain.com'
  },
  {
    id: '03',
    name: 'Sovereign-Ecosystem Swarm',
    score: 90,
    category: 'CORE',
    platform: 'Cloudflare Tunnel / Local :8794',
    stack: ['Python 3.12', 'Flask', 'Socket.IO', 'Eventlet'],
    status: 'ONLINE',
    description: 'Multi-tier agent communication layer, omniscience engine, and async event dispatch system.',
    path: 'C:\\Users\\wjhmo\\Sovereign-Ecosystem'
  },
  {
    id: '04',
    name: 'OMNIBRAIN-FINAL',
    score: 90,
    category: 'CORE',
    platform: 'Railway / Docker',
    stack: ['Express', 'PostgreSQL', 'Prisma', 'JWT'],
    status: 'READY',
    description: 'High-concurrency database backend and persistent user session store.',
    path: 'C:\\Users\\wjhmo\\OMNIBRAIN-FINAL'
  },
  {
    id: '05',
    name: 'X-SOVERIGN-MASTER',
    score: 90,
    category: 'DEPLOYED',
    platform: 'Vercel + Railway',
    stack: ['React 19', 'Vite', 'Express', 'Tailwind v4'],
    status: 'ONLINE',
    description: 'Modern glassmorphic dashboard with real-time telemetry and API routing.',
    path: 'C:\\Users\\wjhmo\\X-SOVERIGN-MASTER'
  },
  {
    id: '06',
    name: 'X-SOVERIGN-BRAIN',
    score: 90,
    category: 'DEPLOYED',
    platform: 'Cloudflare Workers Edge',
    stack: ['Cloudflare Workers', 'Edge JS', 'Hyper-Cache'],
    status: 'ONLINE',
    description: 'Zero-latency edge routing layer handling domain redirection across x-sovereign.com.',
    path: 'C:\\Users\\wjhmo\\X-SOVERIGN-BRAIN'
  },
  {
    id: '07',
    name: 'CLIENT Cluster (1-5)',
    score: 90,
    category: 'DEPLOYED',
    platform: 'Docker Swarm Sync',
    stack: ['Node', 'Docker', 'Nginx Reverse Proxy'],
    status: 'ONLINE',
    description: 'Synchronized multi-tenant client cluster instances deployed across Canadian cloud nodes.',
    path: 'C:\\Users\\wjhmo\\CLIENT-1'
  },
  {
    id: '08',
    name: 'LILJR-DEEP Neural Bridge',
    score: 75,
    category: 'CORE',
    platform: 'Cloudflare Tunnel :5000',
    stack: ['FastAPI', 'SQLite', 'Cloudflared Daemon'],
    status: 'READY',
    description: 'Hardware neural bridge connecting local machine processes to global zero-trust edge tunnels.',
    path: 'C:\\Users\\wjhmo\\LILJR-DEEP'
  },
  {
    id: '09',
    name: 'LILJR-MASTER-MERGE V500',
    score: 75,
    category: 'CORE',
    platform: 'Hybrid Python/Node',
    stack: ['Express', 'Python', 'Aeon Protocol'],
    status: 'READY',
    description: 'Investor-ready glass command center and multi-engine state synchronizer.',
    path: 'C:\\Users\\wjhmo\\LILJR-MASTER-MERGE'
  },
  {
    id: '10',
    name: 'Ultimate Trading Bot Blueprint',
    score: 65,
    category: 'TOOL',
    platform: 'Vite / React 19',
    stack: ['React 19', 'TypeScript', 'Candlestick SVG Engine'],
    status: 'READY',
    description: 'Algorithmic trading terminal, grid scalper, and sentiment arbitrage visualizer.',
    path: 'C:\\Users\\wjhmo\\Downloads\\ultimate-trading-bot-blueprint (1)'
  },
  {
    id: '11',
    name: 'Kali AI Studio Build',
    score: 65,
    category: 'TOOL',
    platform: 'Vercel Production',
    stack: ['React 19', 'Google GenAI SDK', 'Vite'],
    status: 'ONLINE',
    description: 'Interactive multimodal AI assistant and generation playground.',
    path: 'C:\\Users\\wjhmo\\Downloads\\kali-ai-studio-build',
    liveUrl: 'https://ai-studio-chi-blond.vercel.app'
  },
  {
    id: '12',
    name: 'SignSafe ContractScan AI',
    score: 65,
    category: 'TOOL',
    platform: 'Integrated Web Engine',
    stack: ['HTML5', 'Vanilla JS', 'Legal Regex Analysis'],
    status: 'ONLINE',
    description: 'Automated legal risk analyzer detecting predatory clauses, uncapped indemnity, and auto-renewals.',
    path: 'C:\\Users\\wjhmo\\Downloads\\ipo-brain (2)\\output\\contractscan-ai'
  },
  {
    id: '13',
    name: 'XSOVEREIGN-LIVE-DEPLOY',
    score: 65,
    category: 'DEPLOYED',
    platform: 'Remix / Vite Swarm',
    stack: ['Remix', 'Vite', 'Autonomous Agents (auto, money, promo)'],
    status: 'ONLINE',
    description: 'Edge-rendered Remix application hosting 5 autonomous micro-agents.',
    path: 'C:\\Users\\wjhmo\\Downloads\\ipo-brain (2)\\pulled_builds\\XSOVEREIGN-LIVE-DEPLOY'
  },
  {
    id: '14',
    name: 'AethelGrid Data Center Platform',
    score: 65,
    category: 'FRONTEND',
    platform: 'Bun / Vite / React',
    stack: ['Bun', 'Vite', 'React 19', '3D Blueprint Engine'],
    status: 'READY',
    description: 'Interactive 50MW circular energy data center platform and 60-year ROI simulator.',
    path: 'C:\\Users\\wjhmo\\Downloads\\aethelgrid---circular-energy-data-center-platform (1)'
  },
  {
    id: '15',
    name: 'CosmicFaith Multi-Cloud Suite',
    score: 65,
    category: 'CORE',
    platform: 'Fly.io / GCloud / Render',
    stack: ['Python', 'Expo', 'Multi-Cloud Shell Scripts'],
    status: 'READY',
    description: 'Cross-platform deployment scripts ready for Google Cloud Run, Fly.io, and Render.',
    path: 'C:\\Users\\wjhmo\\CosmicFaith-Workspace'
  },
  {
    id: '16',
    name: 'Canonical PM2 Multi-Core Hub',
    score: 55,
    category: 'CORE',
    platform: 'PM2 Max Core Cluster',
    stack: ['PM2 Cluster', 'Eventlet Waitress', 'PowerShell'],
    status: 'READY',
    description: 'High-scale clustering script utilizing all CPU cores for Node frontends and Python backends.',
    path: 'C:\\Users\\wjhmo\\Downloads\\aggregated_deployments\\canonical'
  }
];

export default function ProjectsPage() {
  const [filter, setFilter] = useState<'ALL' | 'FLAGSHIP' | 'DEPLOYED' | 'CORE' | 'TOOL'>('ALL');
  const [search, setSearch] = useState('');

  const filteredProjects = MASTER_BUILDS.filter(p => {
    const matchesFilter = filter === 'ALL' || p.category === filter;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                          p.stack.some(s => s.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-4 animate-in fade-in duration-500">
      {/* Header */}
      <div className="pb-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/30">
              <FolderGit2 className="w-8 h-8 text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.8)]" />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white">
              Sovereign <span className="text-[#00ffcc]">Ecosystem</span> Directory
            </h1>
          </div>
          <p className="text-gray-400 text-sm">
            Live catalog of all 19 consolidated subsystems, live endpoints, and production deployments.
          </p>
        </div>

        {/* Search Input */}
        <div className="w-full md:w-72">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, stack, or tech..."
            className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-[#00ffcc] transition-colors"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {(['ALL', 'FLAGSHIP', 'DEPLOYED', 'CORE', 'TOOL'] as const).map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`text-xs px-3.5 py-1.5 rounded-lg border font-mono transition-all ${
              filter === cat
                ? 'bg-[#00ffcc] text-black font-black border-[#00ffcc] shadow-[0_0_12px_rgba(0,255,204,0.3)]'
                : 'bg-black/40 text-gray-400 border-white/10 hover:text-white hover:border-white/30'
            }`}
          >
            {cat} ({cat === 'ALL' ? MASTER_BUILDS.length : MASTER_BUILDS.filter(p => p.category === cat).length})
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(proj => (
          <div
            key={proj.id}
            className="glass-panel rounded-2xl p-6 border border-white/10 hover:border-[#00ffcc]/40 transition-all flex flex-col justify-between space-y-4 group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white/10 text-white border border-white/10">
                  {proj.score}% Maturity
                </span>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${proj.status === 'ONLINE' ? 'bg-green-400 animate-pulse' : 'bg-blue-400'}`}></span>
                  <span className="text-[10px] font-mono font-bold uppercase text-gray-400">{proj.status}</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-[#00ffcc] transition-colors">
                {proj.name}
              </h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed font-mono">
                {proj.description}
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-white/10">
              {/* Stack tags */}
              <div className="flex flex-wrap gap-1.5">
                {proj.stack.map(tag => (
                  <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/50 border border-white/10 text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-1 text-xs font-mono text-gray-400">
                <span className="text-gray-500 truncate max-w-[180px]">{proj.platform}</span>
                {proj.liveUrl ? (
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00ffcc] font-bold flex items-center gap-1 hover:underline"
                  >
                    Launch Live <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-gray-500">Local Verified</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
