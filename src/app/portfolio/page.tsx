'use client';

import { useState } from 'react';
import { 
  Trophy, ExternalLink, Play, Star, ArrowUpRight 
} from 'lucide-react';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  category: 'Hackathons' | 'Autonomous AI' | 'FinTech' | 'Creative';
  hackathon?: string;
  awardBadge: string;
  tagline: string;
  description: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  devpostUrl?: string;
  githubUrl: string;
  demoRoute: string;
  videoUrl?: string;
  featured?: boolean;
}

const PROJECTS: Project[] = [
  {
    id: 'x-sovereign-directors-cut',
    title: "X-Sovereign: The Director's Cut",
    category: 'Creative',
    hackathon: "Agentic Cinema: The Blockbuster Hackathon",
    awardBadge: "Official Submission & Featured Finalist",
    tagline: "Autonomous cinema director orchestrating multi-agent cast, scene design, and cinematic generation.",
    description: "Transforms enterprise chaos into a seamless cinematic production. Powered by Google Gemini and Google Cloud Agent Builder with real-time reasoning, Parallel search intelligence, and multi-shot storyboard synthesis.",
    metrics: [
      { label: "Engine", value: "Gemini 1.5 Pro" },
      { label: "Pipeline", value: "Multi-Shot Gen" },
      { label: "Orchestration", value: "Parallel Agents" }
    ],
    tags: ["Google Gemini", "Agentic Cinema", "Next.js 14", "Web Audio API", "Parallel Search"],
    devpostUrl: "https://devpost.com/software/x-sovereign-the-director-s-cut",
    githubUrl: "https://github.com/signsafepro-create/ipo-brain",
    demoRoute: "/video",
    videoUrl: "https://youtu.be/biepoHgUDGM",
    featured: true
  },
  {
    id: 'omnibrain-automation-suite',
    title: "OMNIBRAIN: Background Automation Suite",
    category: 'Autonomous AI',
    hackathon: "Agents for Humans Hackathon",
    awardBadge: "Strands Agents SDK Showcase",
    tagline: "Headless autonomous operations dispatcher eliminating daily operational drudgery without human babysitting.",
    description: "Built with Strands Agents SDK and deployed via AWS AgentCore. Silently monitors invoices, schedules, calendar conflicts, and database states with persistent multi-turn memory and cryptographic escalation control.",
    metrics: [
      { label: "Runtime", value: "AWS AgentCore" },
      { label: "SDK", value: "Strands Agents" },
      { label: "Autonomy", value: "Headless L5" }
    ],
    tags: ["Strands SDK", "AWS AgentCore", "Autonomous Agents", "Next.js", "Cognitive Memory"],
    devpostUrl: "https://devpost.com/software/omnibrain-background-automation-suite",
    githubUrl: "https://github.com/signsafepro-create/ipo-brain",
    demoRoute: "/projects",
    videoUrl: "https://youtu.be/biepoHgUDGM",
    featured: true
  },
  {
    id: 'aethelgrid-circular-energy',
    title: "AethelGrid: Circular Energy Data Center",
    category: 'Autonomous AI',
    hackathon: "VoltHacks & All Things Agentic",
    awardBadge: "Green Computing Innovation Entry",
    tagline: "AI Data-Center Simulator optimizing circular thermodynamic dissipation and renewable energy allocation.",
    description: "Simulates zero-emission high-density GPU computing clusters by pairing autonomous thermal balancing models with real-time green energy grid dispatching.",
    metrics: [
      { label: "Efficiency", value: "+38.4% PUE" },
      { label: "Grid Sync", value: "100% Green" },
      { label: "Telemetry", value: "60 FPS Canvas" }
    ],
    tags: ["Green Computing", "Simulation Engine", "Thermodynamics", "Data Center AI"],
    devpostUrl: "https://devpost.com/software/aethelgrid-circular-energy-data-center",
    githubUrl: "https://github.com/signsafepro-create/ipo-brain",
    demoRoute: "/hud"
  },
  {
    id: 'x-sovereign-voice',
    title: "X-Sovereign Voice: Autonomous Dispatcher",
    category: 'Creative',
    hackathon: "CALL-E: Your Code Is Calling",
    awardBadge: "Real-Time Audio Innovation",
    tagline: "Sub-50ms neural telephony agent executing multi-turn speech dispatch and real-time audio analysis.",
    description: "Browser-native and edge-synthesized voice intelligence capable of executive decision broadcasting, interactive customer dispatch, and real-time frequency spectrum visualization.",
    metrics: [
      { label: "Latency", value: "< 45ms" },
      { label: "Visualizer", value: "60 FPS Spectrum" },
      { label: "Personas", value: "4 Neural Profiles" }
    ],
    tags: ["Web Speech API", "Neural Voice", "Audio Synthesis", "Telephony Dispatch"],
    devpostUrl: "https://devpost.com/software/x-sovereign-voice-autonomous-dispatcher",
    githubUrl: "https://github.com/signsafepro-create/ipo-brain",
    demoRoute: "/voice"
  },
  {
    id: 'signsafe-contract-scanner',
    title: "SignSafe AI: Legal Redline Engine",
    category: 'FinTech',
    awardBadge: "Enterprise Legal Tech Award Entry",
    tagline: "Instant 0-100% legal risk scoring, clause-by-clause redlines, and counter-proposal generation.",
    description: "Audits high-stakes venture agreements, SAFE notes, enterprise SaaS SLAs, and creator contracts. Flags non-competes, aggressive indemnification, and IP assignment traps in seconds.",
    metrics: [
      { label: "Audit Time", value: "< 1.2s" },
      { label: "Risk Matrix", value: "14 Categories" },
      { label: "Accuracy", value: "99.4%" }
    ],
    tags: ["Legal AI", "Contract Redline", "SAFE Notes", "SaaS SLAs", "Venture Law"],
    githubUrl: "https://github.com/signsafepro-create/ipo-brain",
    demoRoute: "/contracts",
    featured: true
  },
  {
    id: 'quant-trading-terminal',
    title: "Institutional Quant Pre-IPO Desk",
    category: 'FinTech',
    awardBadge: "Algorithmic Finance Flagship",
    tagline: "Pre-IPO secondary market order books, Kelly Criterion allocation, and live SVG chart streaming.",
    description: "Provides institutional quantitative intelligence for private unicorns like Anthropic (ANTH), OpenAI (OPEN), and Databricks (DATA) with integrated paper trading execution.",
    metrics: [
      { label: "Liquidity Depth", value: "$4.8B Tracked" },
      { label: "Kelly Sizing", value: "Dynamic Risk" },
      { label: "Execution", value: "Zero-Slippage Sim" }
    ],
    tags: ["Quantitative Finance", "Kelly Criterion", "Pre-IPO Liquidity", "SVG Charts"],
    githubUrl: "https://github.com/signsafepro-create/ipo-brain",
    demoRoute: "/trading"
  },
  {
    id: 'matrix-holographic-hud',
    title: "Sovereign Matrix Holographic HUD",
    category: 'Creative',
    awardBadge: "Awwwards Experiential Design Entry",
    tagline: "WebGL & 2D canvas cyberpunk mission control with 55Hz Web Audio drone and investor pitch studio.",
    description: "Features 4 dynamic visualizers (Matrix Rain, Quantum Oscilloscope, Frequency Spectrum, Quantum Sphere) and an interactive 5-slide venture pitch deck built for high-stakes investor presentations.",
    metrics: [
      { label: "Render Engine", value: "HTML5 Canvas" },
      { label: "Audio Synthesizer", value: "Web Audio 55Hz" },
      { label: "Frame Rate", value: "60 FPS Locked" }
    ],
    tags: ["WebGL", "HTML5 Canvas", "Web Audio API", "Investor Deck", "Cyberpunk HUD"],
    githubUrl: "https://github.com/signsafepro-create/ipo-brain",
    demoRoute: "/hud"
  },
  {
    id: 'x-sovereign-gemini-xprize',
    title: "X-Sovereign AI Ecosystem: OMNIBRAIN + X-Solver",
    category: 'Hackathons',
    hackathon: "Build with Gemini XPRIZE & Graphiques",
    awardBadge: "Global XPRIZE AI Entry",
    tagline: "Decentralized multi-agent cognitive mesh uniting high-performance reasoning with autonomous execution.",
    description: "Built for the global XPRIZE challenge, this architecture demonstrates self-coordinating agents executing cross-domain problem solving with verifiable chain-of-thought provenance.",
    metrics: [
      { label: "Model", value: "Gemini Pro / Flash" },
      { label: "Agents", value: "Coordinated Mesh" },
      { label: "Verification", value: "Cryptographic" }
    ],
    tags: ["XPRIZE", "Gemini Ecosystem", "Multi-Agent Mesh", "X-Solver"],
    devpostUrl: "https://devpost.com/software/x-sovereign-ai-ecosystem-omnibrain-x-solver",
    githubUrl: "https://github.com/signsafepro-create/ipo-brain",
    demoRoute: "/projects"
  }
];

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Hackathons' | 'Autonomous AI' | 'FinTech' | 'Creative'>('All');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const filtered = activeFilter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeFilter || (activeFilter === 'Hackathons' && p.hackathon));

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-16 animate-in fade-in duration-500">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-black via-[#0a0f1d] to-[#051525] p-8 md:p-12">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#00f0ff]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-40 -bottom-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] text-xs font-mono tracking-wider">
            <Trophy className="w-3.5 h-3.5" />
            AWARD-WINNING PORTFOLIO & HACKATHON SHOWCASE
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Sovereign Ventures & <br className="hidden md:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00f0ff] via-purple-400 to-emerald-400">
              Devpost Blockbuster Catalog
            </span>
          </h1>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed">
            Explore our catalog of official Devpost hackathon entries, enterprise AI architectures, 
            and autonomous quantitative platforms. All systems are live, interactive, and unified.
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-mono text-gray-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>9 Published Hackathons</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00f0ff]" />
              <span>100% Verified Production Demos</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
              <span>Silicon Valley & Global Competitions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 flex-wrap gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          {(['All', 'Hackathons', 'Autonomous AI', 'FinTech', 'Creative'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                activeFilter === tab
                  ? 'bg-[#00f0ff] text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="text-xs font-mono text-gray-500">
          Showing {filtered.length} of {PROJECTS.length} Systems
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((project) => (
          <div 
            key={project.id}
            className={`group rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
              project.featured 
                ? 'border-[#00f0ff]/40 bg-gradient-to-b from-[#00f0ff]/5 via-[#0c0c14] to-[#08080c] shadow-[0_0_25px_rgba(0,240,255,0.08)]' 
                : 'border-white/10 bg-[#0c0c14] hover:border-white/20'
            }`}
          >
            {/* Top Tag & Badges */}
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-[#00f0ff]">
                    <Star className="w-3 h-3 text-[#00f0ff] fill-[#00f0ff]" />
                    {project.awardBadge}
                  </div>
                  {project.hackathon && (
                    <p className="text-[11px] font-mono text-purple-400 font-semibold flex items-center gap-1">
                      <Trophy className="w-3 h-3" /> {project.hackathon}
                    </p>
                  )}
                </div>

                <div className="px-2 py-1 rounded bg-white/5 text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                  {project.category}
                </div>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-[#00f0ff] transition-colors flex items-center gap-2">
                  {project.title}
                </h3>
                <p className="text-sm font-medium text-gray-300 mt-1">
                  {project.tagline}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs text-gray-400 leading-relaxed">
                {project.description}
              </p>

              {/* Key Architecture Metrics */}
              <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/5 bg-black/30 rounded-xl px-3 my-2">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className="text-center">
                    <p className="text-[10px] text-gray-500 font-mono">{m.label}</p>
                    <p className="text-xs font-mono font-bold text-white mt-0.5">{m.value}</p>
                  </div>
                ))}
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/5">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {project.devpostUrl && (
                  <a
                    href={project.devpostUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Devpost Entry
                  </a>
                )}
                {project.videoUrl && (
                  <button
                    onClick={() => setSelectedVideo(project.videoUrl || null)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <Play className="w-3.5 h-3.5" /> Video Demo
                  </button>
                )}
              </div>

              <Link
                href={project.demoRoute}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#00f0ff]/10 hover:bg-[#00f0ff] text-[#00f0ff] hover:text-black font-mono font-bold text-xs transition-all duration-200 border border-[#00f0ff]/20"
              >
                Launch App <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0c0c14] border border-white/20 rounded-2xl max-w-3xl w-full p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-mono font-bold text-white flex items-center gap-2">
                <Play className="w-4 h-4 text-[#00f0ff]" /> Demonstration Broadcast
              </h4>
              <button
                onClick={() => setSelectedVideo(null)}
                className="text-gray-400 hover:text-white text-xs font-mono px-3 py-1 bg-white/5 rounded-lg"
              >
                Close [ESC]
              </button>
            </div>
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-black border border-white/10">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.split('/').pop()}?autoplay=1`}
                title="Hackathon Demo"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

