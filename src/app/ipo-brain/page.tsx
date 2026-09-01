'use client';
import { useState, useRef, useEffect, useMemo } from 'react';
import { BrainCircuit, Terminal, Cpu, Database, Activity, Send, TrendingUp, TrendingDown, ChevronDown, ChevronUp, Zap, Users, DollarSign, BarChart3, Clock, Target, Sparkles } from 'lucide-react';

/* ================================================================
   LIVE IPO CANDIDATE INTELLIGENCE DATA
   Source: db.json — 8 tracked AI companies
   ================================================================ */
const CANDIDATES = [
  {
    id: 'anthropic', name: 'Anthropic', ticker: 'ANTH', sector: 'AI Foundation Models',
    valuationLow: 600, valuationHigh: 965, ipoProbability: 0.92, confidence: 0.95,
    score: 82.4, timing: 'immediate', timingLabel: '0-3 Months', logoChar: 'A',
    revenue: 47, fundingStage: 'Pre-IPO',
    keyExecutives: ['Dario Amodei', 'Daniela Amodei', 'Jared Kaplan'],
    competitivePosition: '#2 Foundation AI provider, pioneer in steerable & safety-first models.',
    description: 'Anthropic is a public benefit corporation founded by former OpenAI members. Their Claude family of models leads in safety, long context processing, and agentic intelligence.',
    signals: [
      { type: 'SEC_FILING', desc: 'Confidential draft S-1 S-1/A documentation submitted', weight: 1, date: '2026-06-01' },
      { type: 'HIRING', desc: 'Posted Director of Investor Relations ($425K-$600K range)', weight: 0.95, date: '2026-07-15' },
      { type: 'REVENUE', desc: '$47B revenue run-rate (estimated May 2026 annualized)', weight: 0.9, date: '2026-05-31' },
      { type: 'PARTNERSHIP', desc: 'AWS and Google deepen multi-billion strategic agreements', weight: 0.85, date: '2026-03-12' },
    ],
    history: [
      { dateLabel: 'Jan 2026', ipoProbability: 0.65, score: 58, valuationHigh: 400 },
      { dateLabel: 'Mar 2026', ipoProbability: 0.74, score: 66.5, valuationHigh: 550 },
      { dateLabel: 'May 2026', ipoProbability: 0.83, score: 74.2, valuationHigh: 750 },
      { dateLabel: 'Jun 2026', ipoProbability: 0.89, score: 79.8, valuationHigh: 900 },
      { dateLabel: 'Current', ipoProbability: 0.92, score: 82.4, valuationHigh: 965 },
    ],
  },
  {
    id: 'openai', name: 'OpenAI', ticker: 'OPEN', sector: 'AI Foundation Models',
    valuationLow: 150, valuationHigh: 300, ipoProbability: 0.78, confidence: 0.88,
    score: 61.2, timing: 'near', timingLabel: '3-6 Months', logoChar: 'O',
    revenue: 20, fundingStage: 'Pre-IPO',
    keyExecutives: ['Sam Altman', 'Brad Lightcap', 'Sarah Friar'],
    competitivePosition: 'Undisputed global consumer AI leader, creator of ChatGPT and the GPT series.',
    description: 'OpenAI is the pioneer of modern generative AI, actively pivoting towards a for-profit structure.',
    signals: [
      { type: 'STRUCTURE', desc: 'Legal migration towards standard for-profit public-ready corporation', weight: 0.95, date: '2025-12-15' },
      { type: 'HIRING', desc: 'Recruited executive CFO Sarah Friar from Square/Nextdoor', weight: 0.9, date: '2026-01-10' },
      { type: 'REVENUE', desc: 'Consumer subscriptions annualized rate hits record $20B+', weight: 0.8, date: '2026-06-01' },
    ],
    history: [
      { dateLabel: 'Jan 2026', ipoProbability: 0.6, score: 48, valuationHigh: 180 },
      { dateLabel: 'Mar 2026', ipoProbability: 0.68, score: 54, valuationHigh: 220 },
      { dateLabel: 'May 2026', ipoProbability: 0.72, score: 57, valuationHigh: 260 },
      { dateLabel: 'Jun 2026', ipoProbability: 0.75, score: 59.5, valuationHigh: 280 },
      { dateLabel: 'Current', ipoProbability: 0.78, score: 61.2, valuationHigh: 300 },
    ],
  },
  {
    id: 'databricks', name: 'Databricks', ticker: 'DATA', sector: 'Data & AI Infrastructure',
    valuationLow: 55, valuationHigh: 85, ipoProbability: 0.7, confidence: 0.82,
    score: 48.9, timing: 'near', timingLabel: '3-6 Months', logoChar: 'D',
    revenue: 3.2, fundingStage: 'Late Stage Series I',
    keyExecutives: ['Ali Ghodsi', 'Keri Olson', 'Matei Zaharia'],
    competitivePosition: 'Unified Lakehouse standard for enterprise-grade analytics, ML, and unified data.',
    description: 'Databricks provides an open and unified lakehouse platform for massive scale data engineering.',
    signals: [
      { type: 'FINANCIALS', desc: 'Crossed $3.2B ARR with strong gross margins', weight: 0.9, date: '2026-01-01' },
      { type: 'ACQUISITION', desc: 'Completed strategic acquisition of Tabular for Iceberg', weight: 0.8, date: '2025-11-01' },
      { type: 'HIRING', desc: 'Established fully staffed global compliance and IR structures', weight: 0.85, date: '2026-02-15' },
    ],
    history: [
      { dateLabel: 'Jan 2026', ipoProbability: 0.55, score: 40, valuationHigh: 60 },
      { dateLabel: 'Mar 2026', ipoProbability: 0.62, score: 44, valuationHigh: 70 },
      { dateLabel: 'May 2026', ipoProbability: 0.66, score: 46.5, valuationHigh: 78 },
      { dateLabel: 'Current', ipoProbability: 0.7, score: 48.9, valuationHigh: 85 },
    ],
  },
  {
    id: 'cohere', name: 'Cohere', ticker: 'COHE', sector: 'AI Enterprise',
    valuationLow: 5.5, valuationHigh: 12, ipoProbability: 0.65, confidence: 0.72,
    score: 31.8, timing: 'medium', timingLabel: '6-12 Months', logoChar: 'C',
    revenue: 0.8, fundingStage: 'Series D',
    keyExecutives: ['Aidan Gomez', 'Martin Kon', 'Nick Frosst'],
    competitivePosition: 'Cloud-agnostic foundation provider focused on B2B translation & secure RAG.',
    description: 'Cohere builds secure enterprise-focused LLMs tailored for global businesses.',
    signals: [
      { type: 'FUNDING', desc: 'Secured $500M Series D round at $5.5B baseline valuation', weight: 0.85, date: '2026-02-20' },
      { type: 'PARTNERSHIP', desc: 'Deep integration with Oracle Cloud Infrastructure', weight: 0.75, date: '2026-03-01' },
    ],
    history: [
      { dateLabel: 'Jan 2026', ipoProbability: 0.45, score: 22, valuationHigh: 8 },
      { dateLabel: 'Mar 2026', ipoProbability: 0.55, score: 27, valuationHigh: 10 },
      { dateLabel: 'Current', ipoProbability: 0.65, score: 31.8, valuationHigh: 12 },
    ],
  },
  {
    id: 'coreweave', name: 'CoreWeave', ticker: 'CRWV', sector: 'AI Infrastructure',
    valuationLow: 15, valuationHigh: 25, ipoProbability: 0.55, confidence: 0.68,
    score: 28.1, timing: 'medium', timingLabel: '6-12 Months', logoChar: 'W',
    revenue: 2.5, fundingStage: 'Late Stage',
    keyExecutives: ['Michael Intrator', 'Brian Venturo'],
    competitivePosition: 'Elite Tier-1 specialized GPU cloud provider backed by NVIDIA.',
    description: 'CoreWeave operates data centers packed with high-end NVIDIA accelerators for rapid AI training.',
    signals: [
      { type: 'CONTRACT', desc: 'Multi-billion dollar contract signed with Microsoft for GPU capacity', weight: 0.9, date: '2026-02-01' },
      { type: 'FINANCING', desc: 'Secured a massive $7.5B debt facility for capital equipment', weight: 0.8, date: '2026-01-20' },
    ],
    history: [
      { dateLabel: 'Jan 2026', ipoProbability: 0.38, score: 18, valuationHigh: 16 },
      { dateLabel: 'Apr 2026', ipoProbability: 0.48, score: 24, valuationHigh: 20 },
      { dateLabel: 'Current', ipoProbability: 0.55, score: 28.1, valuationHigh: 25 },
    ],
  },
  {
    id: 'perplexity', name: 'Perplexity AI', ticker: 'PERP', sector: 'AI Search',
    valuationLow: 3, valuationHigh: 8, ipoProbability: 0.45, confidence: 0.6,
    score: 19.4, timing: 'long', timingLabel: '12+ Months', logoChar: 'P',
    revenue: 0.2, fundingStage: 'Series B',
    keyExecutives: ['Aravind Srinivas', 'Denis Yarats'],
    competitivePosition: 'Answering engine challenging legacy search with conversational retrieval.',
    description: 'Perplexity AI is a semantic conversational search engine that delivers direct, cited answers.',
    signals: [
      { type: 'TRAFFIC', desc: 'Crossed 100M+ queries monthly with exponential consumer brand expansion', weight: 0.7, date: '2026-06-01' },
      { type: 'FUNDING', desc: 'Raised $500M at a $3B valuation from high-profile partners', weight: 0.75, date: '2026-01-15' },
    ],
    history: [
      { dateLabel: 'Jan 2026', ipoProbability: 0.25, score: 10, valuationHigh: 4 },
      { dateLabel: 'Apr 2026', ipoProbability: 0.35, score: 15, valuationHigh: 6 },
      { dateLabel: 'Current', ipoProbability: 0.45, score: 19.4, valuationHigh: 8 },
    ],
  },
  {
    id: 'sanalabs', name: 'Sana Labs', ticker: 'SANA', sector: 'AI Enterprise Software',
    valuationLow: 1, valuationHigh: 3, ipoProbability: 0.3, confidence: 0.45,
    score: 7.4, timing: 'long', timingLabel: '12+ Months', logoChar: 'S',
    revenue: 0.1, fundingStage: 'Series C',
    keyExecutives: ['Joel Hellermark'],
    competitivePosition: "Europe's leading corporate AI assistant and knowledge management standard.",
    description: 'Sana Labs designs personalized AI search and knowledge management software for enterprises.',
    signals: [
      { type: 'FUNDING', desc: 'Closed $280M Series C funding round to expand US enterprise operations', weight: 0.65, date: '2026-04-01' },
    ],
    history: [
      { dateLabel: 'Jan 2026', ipoProbability: 0.15, score: 3, valuationHigh: 1.5 },
      { dateLabel: 'Current', ipoProbability: 0.3, score: 7.4, valuationHigh: 3 },
    ],
  },
  {
    id: 'poolside', name: 'Poolside', ticker: 'POOL', sector: 'AI Coding',
    valuationLow: 2, valuationHigh: 5, ipoProbability: 0.25, confidence: 0.4,
    score: 9, timing: 'long', timingLabel: '12+ Months', logoChar: 'L',
    revenue: 0.05, fundingStage: 'Series A',
    keyExecutives: ['Eiso Kant', 'Jason Warner'],
    competitivePosition: 'Ultra-fast coding models built purely for developer automation.',
    description: 'Poolside builds next-gen models specialized in software development. Founded by ex-GitHub executives.',
    signals: [
      { type: 'FUNDING', desc: 'Raised $500M Series A at $3B post-money valuation', weight: 0.7, date: '2026-05-01' },
    ],
    history: [
      { dateLabel: 'Jan 2026', ipoProbability: 0.1, score: 2, valuationHigh: 2 },
      { dateLabel: 'Current', ipoProbability: 0.25, score: 9, valuationHigh: 5 },
    ],
  },
];

/* ================================================================
   HELPER COMPONENTS
   ================================================================ */

function ScoreBar({ score, max = 100 }: { score: number; max?: number }) {
  const pct = (score / max) * 100;
  const color = score >= 70 ? '#00ffcc' : score >= 40 ? '#aa00ff' : score >= 20 ? '#3b82f6' : '#6b7280';
  return (
    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-1000 ease-out"
        style={{
          width: `${pct}%`,
          background: `linear-gradient(90deg, ${color}88, ${color})`,
          boxShadow: `0 0 12px ${color}66`,
        }}
      />
    </div>
  );
}

function ProbabilityRing({ probability }: { probability: number }) {
  const pct = probability * 100;
  const circumference = 2 * Math.PI * 36;
  const strokeDashoffset = circumference - (pct / 100) * circumference;
  const color = pct >= 80 ? '#00ffcc' : pct >= 60 ? '#aa00ff' : pct >= 40 ? '#3b82f6' : '#6b7280';

  return (
    <div className="relative w-20 h-20 flex-shrink-0">
      <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
        <circle
          cx="40" cy="40" r="36" fill="none" stroke={color} strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 1s ease-out', filter: `drop-shadow(0 0 6px ${color}88)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-sm font-black text-white">{pct.toFixed(0)}%</span>
        <span className="text-[8px] text-gray-500 uppercase tracking-widest">IPO</span>
      </div>
    </div>
  );
}

function TimingBadge({ timing, label }: { timing: string; label: string }) {
  const colors: Record<string, string> = {
    immediate: 'bg-[#00ffcc]/15 text-[#00ffcc] border-[#00ffcc]/30',
    near: 'bg-[#aa00ff]/15 text-[#aa00ff] border-[#aa00ff]/30',
    medium: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    long: 'bg-gray-500/15 text-gray-400 border-gray-500/30',
  };
  return (
    <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md border ${colors[timing] || colors.long}`}>
      {label}
    </span>
  );
}

function SignalIcon({ type }: { type: string }) {
  const icons: Record<string, string> = {
    SEC_FILING: '📋', HIRING: '👤', REVENUE: '💰', PARTNERSHIP: '🤝',
    STRUCTURE: '🏗️', FINANCIALS: '📊', ACQUISITION: '🏢', CONTRACT: '📝',
    FINANCING: '🏦', TRAFFIC: '📈', FUNDING: '💵',
  };
  return <span className="text-sm">{icons[type] || '⚡'}</span>;
}

function MiniSparkline({ history }: { history: { ipoProbability: number }[] }) {
  if (history.length < 2) return null;
  const values = history.map(h => h.ipoProbability);
  const min = Math.min(...values) - 0.05;
  const max = Math.max(...values) + 0.05;
  const w = 80, h = 24;
  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * w;
    const y = h - ((v - min) / (max - min)) * h;
    return `${x},${y}`;
  }).join(' ');
  const color = values[values.length - 1] >= 0.7 ? '#00ffcc' : '#aa00ff';
  return (
    <svg width={w} height={h} className="flex-shrink-0">
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" style={{ filter: `drop-shadow(0 0 4px ${color}66)` }} />
    </svg>
  );
}

/* ================================================================
   MAIN IPO BRAIN PAGE
   ================================================================ */

export default function IPOBrain() {
  const [command, setCommand] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'score' | 'ipo' | 'valuation'>('score');
  const [showTerminal, setShowTerminal] = useState(false);
  const [logs, setLogs] = useState([
    { time: '05:40:01', source: 'SYSTEM', msg: 'Sovereign IPO Intelligence v4.0 initialized.' },
    { time: '05:40:15', source: 'DATA', msg: '8 candidates loaded. Signal analysis active.' },
    { time: '05:42:00', source: 'AGENT', msg: 'Awaiting prime directive...' },
  ]);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const sorted = useMemo(() => {
    return [...CANDIDATES].sort((a, b) => {
      if (sortBy === 'score') return b.score - a.score;
      if (sortBy === 'ipo') return b.ipoProbability - a.ipoProbability;
      return b.valuationHigh - a.valuationHigh;
    });
  }, [sortBy]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    setLogs(prev => [...prev, { time, source: 'USER', msg: command }]);
    setCommand('');
    setTimeout(() => {
      const t = new Date().toLocaleTimeString('en-US', { hour12: false });
      setLogs(prev => [...prev, { time: t, source: 'AGENT', msg: 'Processing directive... routing to FastAPI cluster.' }]);
    }, 800);
  };

  // Summary metrics
  const topCandidate = sorted[0];
  const avgScore = (CANDIDATES.reduce((s, c) => s + c.score, 0) / CANDIDATES.length).toFixed(1);
  const hotCount = CANDIDATES.filter(c => c.ipoProbability >= 0.7).length;
  const totalValuation = CANDIDATES.reduce((s, c) => s + c.valuationHigh, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* ─── HEADER ─── */}
      <div className="pb-4 border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <BrainCircuit className="w-10 h-10 text-[#aa00ff] drop-shadow-[0_0_12px_rgba(170,0,255,0.8)]" />
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#00ffcc] animate-pulse shadow-[0_0_8px_rgba(0,255,204,0.8)]" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white">
              IPO BRAIN <span className="text-[#aa00ff] text-base font-medium ml-1">v4.0</span>
            </h1>
            <p className="text-gray-500 text-sm font-mono">Sovereign Candidate Intelligence Engine</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
          <div className="flex items-center gap-2"><Cpu className="w-3.5 h-3.5 text-[#00ffcc]" /> CORE: ACTIVE</div>
          <div className="flex items-center gap-2"><Database className="w-3.5 h-3.5 text-blue-400" /> DB: LIVE</div>
          <div className="flex items-center gap-2"><Activity className="w-3.5 h-3.5 text-green-400" /> {CANDIDATES.length} TRACKED</div>
          <button
            onClick={() => setShowTerminal(!showTerminal)}
            className="px-3 py-1.5 rounded-lg border border-white/10 hover:border-[#aa00ff]/50 hover:bg-[#aa00ff]/10 transition-all text-gray-300 hover:text-white"
          >
            <Terminal className="w-3.5 h-3.5 inline mr-1" /> Terminal
          </button>
        </div>
      </div>

      {/* ─── SUMMARY CARDS ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Top Candidate', value: topCandidate.name, sub: `Score: ${topCandidate.score}`, icon: Target, color: '#00ffcc' },
          { label: 'Avg AI Score', value: avgScore, sub: `${CANDIDATES.length} candidates`, icon: BarChart3, color: '#aa00ff' },
          { label: 'Hot Signals', value: `${hotCount}`, sub: 'IPO Prob ≥ 70%', icon: Zap, color: '#f59e0b' },
          { label: 'Peak Valuation', value: `$${totalValuation}B`, sub: 'Combined high est.', icon: DollarSign, color: '#3b82f6' },
        ].map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="glass-panel rounded-xl p-4 border border-white/5 group hover:border-white/15 transition-all duration-300 cursor-default">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{card.label}</span>
                <Icon className="w-4 h-4" style={{ color: card.color, filter: `drop-shadow(0 0 6px ${card.color}66)` }} />
              </div>
              <p className="text-2xl font-black text-white">{card.value}</p>
              <p className="text-[11px] text-gray-500 mt-1 font-mono">{card.sub}</p>
            </div>
          );
        })}
      </div>

      {/* ─── SORT CONTROLS ─── */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500 uppercase tracking-widest font-bold mr-2">Sort by</span>
        {(['score', 'ipo', 'valuation'] as const).map(key => (
          <button
            key={key}
            onClick={() => setSortBy(key)}
            className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg border transition-all duration-200 ${
              sortBy === key
                ? 'bg-[#aa00ff]/15 text-[#aa00ff] border-[#aa00ff]/40 shadow-[0_0_10px_rgba(170,0,255,0.15)]'
                : 'border-white/10 text-gray-500 hover:text-white hover:border-white/20'
            }`}
          >
            {key === 'score' ? 'AI Score' : key === 'ipo' ? 'IPO Probability' : 'Valuation'}
          </button>
        ))}
      </div>

      {/* ─── CANDIDATE LEADERBOARD ─── */}
      <div className="space-y-3">
        {sorted.map((c, rank) => {
          const isExpanded = expandedId === c.id;
          const historyDelta = c.history.length >= 2
            ? c.ipoProbability - c.history[c.history.length - 2].ipoProbability
            : 0;
          
          return (
            <div key={c.id} className="glass-panel rounded-xl border border-white/5 overflow-hidden transition-all duration-300 hover:border-white/15 group">
              {/* ── Row ── */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : c.id)}
                className="w-full flex items-center gap-4 p-4 text-left"
              >
                {/* Rank */}
                <div className="w-8 text-center">
                  <span className={`text-lg font-black ${rank === 0 ? 'text-[#00ffcc]' : rank === 1 ? 'text-[#aa00ff]' : rank === 2 ? 'text-blue-400' : 'text-gray-600'}`}>
                    {rank + 1}
                  </span>
                </div>

                {/* Logo */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black border ${
                  c.timing === 'immediate' ? 'bg-[#00ffcc]/10 border-[#00ffcc]/30 text-[#00ffcc]' :
                  c.timing === 'near' ? 'bg-[#aa00ff]/10 border-[#aa00ff]/30 text-[#aa00ff]' :
                  'bg-white/5 border-white/10 text-gray-400'
                }`}>
                  {c.logoChar}
                </div>

                {/* Name + Sector */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white truncate">{c.name}</span>
                    <span className="text-[10px] text-gray-600 font-mono">{c.ticker}</span>
                    <TimingBadge timing={c.timing} label={c.timingLabel} />
                  </div>
                  <p className="text-[11px] text-gray-500 truncate mt-0.5">{c.sector} · {c.fundingStage}</p>
                </div>

                {/* Sparkline */}
                <MiniSparkline history={c.history} />

                {/* Score */}
                <div className="w-20 text-right">
                  <p className="text-xl font-black text-white">{c.score}</p>
                  <div className="flex items-center justify-end gap-1 text-[10px]">
                    {historyDelta > 0 ? (
                      <><TrendingUp className="w-3 h-3 text-[#00ffcc]" /><span className="text-[#00ffcc]">+{(historyDelta * 100).toFixed(0)}%</span></>
                    ) : historyDelta < 0 ? (
                      <><TrendingDown className="w-3 h-3 text-red-400" /><span className="text-red-400">{(historyDelta * 100).toFixed(0)}%</span></>
                    ) : null}
                  </div>
                </div>

                {/* IPO Ring */}
                <ProbabilityRing probability={c.ipoProbability} />

                {/* Chevron */}
                <div className="w-6 flex items-center justify-center text-gray-600">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {/* ── Expanded Detail ── */}
              {isExpanded && (
                <div className="border-t border-white/5 p-6 bg-black/30 space-y-6 animate-in slide-in-from-top-2 duration-300">
                  {/* Top Row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Description */}
                    <div className="md:col-span-2 space-y-3">
                      <p className="text-sm text-gray-300 leading-relaxed">{c.description}</p>
                      <p className="text-xs text-gray-500 italic">{c.competitivePosition}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Users className="w-3.5 h-3.5 text-gray-500" />
                        {c.keyExecutives.map((exec, i) => (
                          <span key={i} className="px-2 py-0.5 bg-white/5 rounded text-[10px] text-gray-400 border border-white/5">
                            {exec}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="space-y-3">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Valuation Range</span>
                        <span className="text-white font-bold">${c.valuationLow}B – ${c.valuationHigh}B</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Revenue (ARR)</span>
                        <span className="text-white font-bold">${c.revenue}B</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Confidence</span>
                        <span className="text-white font-bold">{(c.confidence * 100).toFixed(0)}%</span>
                      </div>
                      <div className="mt-2">
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest">AI Score</span>
                        <ScoreBar score={c.score} />
                      </div>
                    </div>
                  </div>

                  {/* Signals Timeline */}
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-3 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#aa00ff]" /> Signal Intelligence
                    </h4>
                    <div className="space-y-2">
                      {c.signals.map((sig, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 bg-white/[0.02] rounded-lg border border-white/5 hover:border-white/10 transition-all">
                          <SignalIcon type={sig.type} />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-300">{sig.desc}</p>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-[10px] text-gray-600 font-mono">{sig.date}</span>
                              <span className="text-[10px] text-gray-600">Weight: {(sig.weight * 100).toFixed(0)}%</span>
                            </div>
                          </div>
                          <div className="w-16">
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-[#aa00ff] rounded-full" style={{ width: `${sig.weight * 100}%` }} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* History Timeline */}
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-3 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-blue-400" /> Probability Trajectory
                    </h4>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {c.history.map((h, i) => (
                        <div key={i} className={`flex-shrink-0 p-3 rounded-lg border text-center min-w-[100px] ${
                          i === c.history.length - 1 ? 'bg-[#00ffcc]/5 border-[#00ffcc]/20' : 'bg-white/[0.02] border-white/5'
                        }`}>
                          <p className="text-[10px] text-gray-500 font-mono mb-1">{h.dateLabel}</p>
                          <p className="text-lg font-black text-white">{(h.ipoProbability * 100).toFixed(0)}%</p>
                          <p className="text-[10px] text-gray-600">Score: {h.score} · ${h.valuationHigh}B</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ─── AGENT TERMINAL (TOGGLE) ─── */}
      {showTerminal && (
        <div className="glass-panel rounded-2xl border border-[#aa00ff]/20 overflow-hidden shadow-[0_0_30px_rgba(170,0,255,0.08)] animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-black/80 p-3 border-b border-white/10 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-gray-400" />
            <span className="text-xs font-mono text-gray-400">root@sovereign-ipo:~#</span>
          </div>
          <div className="h-[250px] p-4 font-mono text-sm overflow-y-auto space-y-2 bg-[#030303]">
            {logs.map((log, i) => (
              <div key={i} className="flex gap-4">
                <span className="text-gray-600 text-xs">[{log.time}]</span>
                <span className={`w-14 text-xs font-bold ${
                  log.source === 'USER' ? 'text-white' :
                  log.source === 'AGENT' ? 'text-[#aa00ff]' :
                  log.source === 'DATA' ? 'text-blue-400' : 'text-[#00ffcc]'
                }`}>
                  {log.source}
                </span>
                <span className={`text-xs ${log.source === 'USER' ? 'text-gray-300' : 'text-gray-500'}`}>{log.msg}</span>
              </div>
            ))}
            <div ref={logEndRef} />
          </div>
          <form onSubmit={handleCommand} className="p-3 bg-black/50 border-t border-white/10">
            <div className="relative">
              <input
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                placeholder="Enter command..."
                className="w-full bg-black border border-white/15 rounded-lg pl-4 pr-12 py-3 text-white text-sm font-mono focus:outline-none focus:border-[#aa00ff] transition-colors"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#aa00ff] text-white rounded-lg hover:bg-[#8800cc] transition-colors">
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
