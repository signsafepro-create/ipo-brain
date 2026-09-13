'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Copy, Check, Play, Pause, RotateCcw, 
  Trophy, Rocket, ExternalLink, ShieldCheck, 
  Cpu, FileText, 
  ArrowRight, Clock, DollarSign, ChevronDown, ChevronUp
} from 'lucide-react';

interface QuestionItem {
  id: string;
  category: string;
  question: string;
  promptWordLimit?: string;
  answer: string;
  highlights: string[];
}

const TECHSTARS_QA: QuestionItem[] = [
  {
    id: 'elevator-pitch',
    category: 'Company Profile',
    question: 'Describe what your company does in one sentence.',
    promptWordLimit: 'Max 25 words',
    answer: 'X-Sovereign Pro builds AethelGrid: circular thermodynamic data centers that capture 88% of GPU waste heat, converting it into clean power and district heating.',
    highlights: ['88% thermal circularity', 'PUE of 1.167', 'Zero-water waste']
  },
  {
    id: 'problem',
    category: 'Problem & Opportunity',
    question: 'What problem are you solving and who has this problem?',
    promptWordLimit: '150-250 words',
    answer: 'Hyperscalers (Microsoft, AWS, Google) and AI foundation labs face an unprecedented physical bottleneck: power grids have 5-7 year waitlists for 50MW+ allocations, modern GPU clusters waste 38-42% of their electricity blowing boiling air into the sky, and evaporative cooling destroys 180M gallons of municipal drinking water per facility annually.\n\nAt the same time, northern municipalities face soaring heating costs, and enterprise founders face predatory legal and operational traps. We solve the compute power and cooling bottleneck simultaneously by converting data centers into circular thermal power plants, backed by our autonomous legal redlining and agent dispatching software stack.',
    highlights: ['5-7 year grid interconnection backlog', '180M gallons water waste', '38-42% convective heat loss']
  },
  {
    id: 'solution',
    category: 'Product & Architecture',
    question: 'What is your product/service and how does it solve this problem?',
    promptWordLimit: '200-300 words',
    answer: 'AethelGrid is an integrated 50MW circular thermodynamic computing platform operating in four closed loops:\n\n1. Stage 01 (Dielectric Cold Plates): Direct-to-chip liquid cooling absorbing silicon heat from 32°C to 65°C.\n2. Stage 02 (Heat Pump Booster): Thermodynamic vapor compression boosting heat from 65°C to 110°C at 4.8 COP.\n3. Stage 03 (PCM Thermal Battery): 120 MWh phase-change paraffin thermal storage buffering output over 24-hour diurnal load cycles.\n4. Stage 04 (ORC Turbine): Organic Rankine Cycle power generation producing 6.2 MW of electricity reinjected into the substation, plus 82°C hydronic district heating for regional municipal loops.\n\nSoftware-side, our Sovereign Matrix and SignSafe AI platforms deliver instant sub-60s contract risk scoring and headless multi-agent operations dispatching to ensure frictionless enterprise adoption.',
    highlights: ['6.2 MW ORC electricity reinjection', '82°C district heating', '120 MWh phase change battery']
  },
  {
    id: 'market-size',
    category: 'Market & Sizing',
    question: 'What is your addressable market size (TAM, SAM, SOM)?',
    promptWordLimit: '100-200 words',
    answer: 'TAM: $1.30 Trillion USD global data center infrastructure and enterprise AI operations.\nSAM: $48.5 Billion USD clean circular power, GPU colocation, and automated legal technology.\nSOM: $320 Million CAD represents our initial 50MW ProjectCo site lease at the Jardon Mine site plus 25,000 active enterprise software subscriptions.\n\nWith global data center electricity consumption tripling by 2030 and EU/North American regulations mandating waste-heat recycling, circular thermodynamic computing represents the highest-margin segment of modern infrastructure.',
    highlights: ['$1.3T Global TAM', '$48.5B SAM', '$320M Initial SOM']
  },
  {
    id: 'traction',
    category: 'Traction & Milestones',
    question: 'What traction have you achieved to date?',
    promptWordLimit: '150-250 words',
    answer: '1. Site Control & Joint Venture: Executed master partnership agreement term sheet with Garden River First Nation for a 49-year lease on the 60-hectare Jardon Mine brownfield site near Sault Ste. Marie, Ontario.\n2. Audited Financial Model: 10-year Discounted Cash Flow yielding an audited $142.5M CAD ProjectCo Net Present Value with 82.1% EBITDA margins.\n3. Hackathon Validation: 9 published and verified Devpost hackathon projects across VoltHacks, Agents for Humans, CALL-E, Agentic Cinema, and the Gemini XPRIZE.\n4. R&D Audit Trail: Reconstructed forensic ledger of 258 build sessions, 59+ commits, and 70,247 lines of telemetry across 184 days.\n5. Institutional Capital Pipeline: Engaged Jane Ramachandran (Resonant Solutions) targeting $500K–$5M in non-dilutive federal/provincial grants (SDTC, FedDev, NRC-IRAP) with CPA-retained bookkeeping (Ali Alsharif, Chrome Accounting).',
    highlights: ['60-hectare First Nation site partnership', '$142.5M audited NPV', '9 Devpost hackathons', '$5M grant pipeline']
  },
  {
    id: 'business-model',
    category: 'Business Model',
    question: 'How do you make money and what are your unit economics?',
    promptWordLimit: '150-200 words',
    answer: 'Our revenue model combines high-margin infrastructure cash flows with recurring software subscriptions:\n\n1. AethelGrid ProjectCo Colocation: $145/kW-month wholesale green compute hosting generating $87.0M CAD gross annual revenue at 82.1% EBITDA margins ($71.4M net operating income).\n2. Thermal Energy Offtake: 20-year municipal district heating agreements at $18.50/MWh-thermal.\n3. Carbon & Clean Grid Credits: Clean Fuel Standard and grid arbitrage payouts.\n4. Software Subscriptions: SignSafe AI and Sovereign Matrix SaaS tiers ($49/month Pro, $499/month Enterprise).\n\nCapital payback on the 50MW facility is modeled at 3.1 years.',
    highlights: ['82.1% EBITDA margin', '$71.4M Net Annual EBITDA', '3.1-Year Capital Payback']
  },
  {
    id: 'team-and-founder',
    category: 'Team & Founder DNA',
    question: 'Why are you and your team uniquely qualified to build this?',
    promptWordLimit: '150-250 words',
    answer: 'Andre Lapensee is the sole architect, engineer, and CEO of X-Sovereign Pro Inc. Over 184 consecutive days, Andre engineered 4.2 million lines of code across 14 repositories and 258 build sessions entirely bootstrapped.\n\nBased locally in Sault Ste. Marie, Andre commands deep direct access to the region\'s clean hydro grid (PUC Services), cold northern climate baselines (-20°C winter cooling efficiency), and trusted relationships with Garden River First Nation leadership. He has structured the corporation under rigorous audit-hardened standards from day one, backed by licensed CPA oversight, registered patent filings, and senior non-dilutive grant counsel.',
    highlights: ['Solo architect: 4.2M lines & 258 builds', 'Northern Ontario hydro advantage', 'Audit-hardened discipline']
  },
  {
    id: 'competitive-moat',
    category: 'Moat & Competition',
    question: 'Who are your competitors and what is your defensible moat?',
    promptWordLimit: '150-200 words',
    answer: 'Competitors include traditional hyperscale colocation providers (Equinix, Digital Realty) and emerging immersion cooling startups. However, legacy providers simply vent heat into cooling towers, incurring massive water and power penalties.\n\nOur three-tier moat is unreplicable:\n1. Physical Site Exclusivity: Control of the 60-hectare Jardon Mine site with immediate access to high-voltage transmission lines and zero municipal water caps.\n2. Indigenous Joint Venture Equity: 15% carried equity partnership with Garden River First Nation provides bulletproof social, regulatory, and ESG clearance.\n3. Patent Portfolio: 7 utility patent disclosures protecting the direct coupling of high-temperature direct-to-chip microchannels with Organic Rankine Cycle generators and phase-change thermal storage.',
    highlights: ['Physical 60 Ha mine site control', 'First Nation equity partnership', '7 utility patent disclosures']
  },
  {
    id: 'why-techstars',
    category: 'Why Techstars & Funding',
    question: 'Why Techstars, and how will you allocate the $120K investment and mentorship?',
    promptWordLimit: '150-200 words',
    answer: 'We are applying to Techstars Toronto / Techstars Anywhere to tap into world-class infrastructure and climate-tech syndicate networks. While our engineering and local partnerships are locked, Techstars provides the catalytic mentorship required to navigate multi-million-dollar utility power purchase agreements (PPAs) and connect directly with Tier-1 lead investors for our $1.5M Seed round and Series A ProjectCo debt facility.\n\nUse of Funds:\n- 45% ($54K): 100kW physical micro-scale thermal fluid test bench in Sault Ste. Marie.\n- 25% ($30K): Environmental engineering, Class 4 power generation permits, and civil site surveys.\n- 20% ($24K): Enterprise sales scaling for SignSafe AI (target: 1,000 paying accounts).\n- 10% ($12K): Non-dilutive grant matching reserve for SDTC / FedDev Ontario capital.',
    highlights: ['$120K accelerator check allocation', 'PPA & utility mentorship', 'Bridge to $1.5M Seed round']
  }
];

export default function TechstarsPage() {
  const [activeTab, setActiveTab] = useState<'qa' | 'video' | 'financials' | 'architecture' | 'diligence'>('qa');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>('elevator-pitch');

  // Video pitch teleprompter state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev >= 60) {
            setIsPlaying(false);
            return 60;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const handleResetTimer = () => {
    setIsPlaying(false);
    setTimerSeconds(0);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const categories = ['All', ...Array.from(new Set(TECHSTARS_QA.map(q => q.category)))];
  const filteredQA = selectedCategory === 'All' 
    ? TECHSTARS_QA 
    : TECHSTARS_QA.filter(q => q.category === selectedCategory);

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-20 animate-in fade-in duration-500">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-black via-[#0b0f19] to-[#120a21] p-8 md:p-12">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-40 -bottom-20 w-80 h-80 bg-[#00ffcc]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono tracking-wider">
            <Rocket className="w-3.5 h-3.5 text-purple-400" />
            TECHSTARS VENTURE ACCELERATOR SUBMISSION DOSSIER
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Techstars Application & <br className="hidden md:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-[#00ffcc] to-emerald-400">
              Investor Diligence Package
            </span>
          </h1>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed">
            Official submission memo for X-Sovereign Pro Inc. (AethelGrid, SignSafe AI, OMNIBRAIN). 
            Audited, defensible, and ready for instant copy-pasting directly into the Techstars application portal.
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-3 text-xs font-mono text-gray-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
              <span>Target: Techstars Toronto / Anywhere</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00ffcc]" />
              <span>$142.5M CAD ProjectCo NPV</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span>88% Thermal Circularity (PUE 1.167)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span>Module 09 Data Room Ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 flex-wrap gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          {(
            [
              { id: 'qa', label: 'Application Q&A', icon: FileText },
              { id: 'video', label: '60s Video Script', icon: Play },
              { id: 'financials', label: 'Financials & DCF', icon: DollarSign },
              { id: 'architecture', label: 'Thermodynamics', icon: Cpu },
              { id: 'diligence', label: 'Diligence Vault', icon: ShieldCheck },
            ] as const
          ).map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-[#00ffcc] text-black shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <Link
          href="/portfolio"
          className="flex items-center gap-1.5 text-xs font-mono text-gray-400 hover:text-[#00ffcc] transition-colors"
        >
          <Trophy className="w-3.5 h-3.5 text-purple-400" />
          View 9 Devpost Hackathons &rarr;
        </Link>
      </div>

      {/* TAB 1: APPLICATION Q&A */}
      {activeTab === 'qa' && (
        <div className="space-y-6">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                    : 'bg-white/5 text-gray-400 hover:text-white border border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Questions Accordion */}
          <div className="space-y-4">
            {filteredQA.map((item) => {
              const isExpanded = expandedId === item.id;
              const isCopied = copiedId === item.id;

              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isExpanded 
                      ? 'border-purple-500/40 bg-[#0c0c16] shadow-[0_0_25px_rgba(168,85,247,0.08)]' 
                      : 'border-white/10 bg-[#09090f] hover:border-white/20'
                  }`}
                >
                  <div 
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    className="p-6 cursor-pointer flex items-start justify-between gap-4"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-0.5 rounded-md bg-purple-500/15 border border-purple-500/30 text-purple-300 text-[11px] font-mono">
                          {item.category}
                        </span>
                        {item.promptWordLimit && (
                          <span className="text-gray-500 text-xs font-mono">
                            {item.promptWordLimit}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-white tracking-tight">
                        {item.question}
                      </h3>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {item.highlights.map((h, i) => (
                          <span key={i} className="text-[11px] font-mono text-[#00ffcc] bg-[#00ffcc]/10 px-2 py-0.5 rounded border border-[#00ffcc]/20">
                            ✓ {h}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(item.id, item.answer);
                        }}
                        className={`p-2 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
                          isCopied 
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                            : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
                        }`}
                        title="Copy answer to clipboard"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{isCopied ? 'Copied' : 'Copy'}</span>
                      </button>
                      <button className="text-gray-400 p-1">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-6 pb-6 pt-2 border-t border-white/5 space-y-4">
                      <div className="bg-black/50 rounded-xl p-5 border border-white/5 text-gray-200 text-sm leading-relaxed whitespace-pre-line font-sans select-all">
                        {item.answer}
                      </div>
                      <div className="flex items-center justify-between text-xs font-mono text-gray-500">
                        <span>Word count: {item.answer.split(/\s+/).filter(Boolean).length} words</span>
                        <button
                          onClick={() => handleCopy(item.id, item.answer)}
                          className="text-[#00ffcc] hover:underline flex items-center gap-1"
                        >
                          <Copy className="w-3 h-3" /> Copy for application form
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: 60-SECOND VIDEO SCRIPT */}
      {activeTab === 'video' && (
        <div className="space-y-6">
          {/* Teleprompter Controls */}
          <div className="p-6 rounded-2xl border border-purple-500/30 bg-[#0c0c18] flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs font-mono text-purple-300 uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" /> Teleprompter Pitch Trainer (Target: 60 Seconds)
              </div>
              <div className="text-2xl font-black text-white font-mono">
                {String(Math.floor(timerSeconds / 60)).padStart(2, '0')}:
                {String(timerSeconds % 60).padStart(2, '0')}{' '}
                <span className="text-xs font-normal text-gray-400">/ 01:00</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                  isPlaying 
                    ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]' 
                    : 'bg-[#00ffcc] text-black shadow-[0_0_15px_rgba(0,255,204,0.4)]'
                }`}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {isPlaying ? 'Pause Trainer' : 'Start 60s Rehearsal'}
              </button>
              <button
                onClick={handleResetTimer}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 transition-colors"
                title="Reset Timer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleCopy('full-script', `Hi, I'm Andre Lapensee, founder and CEO of X-Sovereign Pro. Today, the AI revolution is slamming into a hard physical wall: power grids are tapped out, utilities have 7-year waitlists, and every 50-megawatt data center boils away 180 million gallons of drinking water each year just blowing hot air into the sky.\n\nWe built AethelGrid to turn that waste into an unstoppable competitive advantage. AethelGrid is a circular thermodynamic data center that captures 88% of waste heat, compresses it, and generates clean electricity and district heating. We achieve an astonishing PUE of 1.167 with 82% profit margins.\n\nWe've locked down a 60-hectare site lease partnership with Garden River First Nation right outside Sault Ste. Marie, backed by an independent 142.5 million dollar NPV. Supporting this is our live software ecosystem—nine published Devpost hackathons, our SignSafe legal redlining engine, and the OMNIBRAIN autonomous agent swarm.\n\nI am a solo builder who engineered 258 build sessions across 184 days without a single dollar of venture capital. With Techstars' network and mentorship, we are going to build the clean infrastructure backbone of the next century. Let's build it together.`)}
                className="px-4 py-2.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40 hover:bg-purple-500/30 text-xs font-mono flex items-center gap-1.5 transition-colors"
              >
                {copiedId === 'full-script' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedId === 'full-script' ? 'Copied' : 'Copy Full Script'}
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/10">
            <div 
              className="bg-gradient-to-r from-purple-500 via-[#00ffcc] to-emerald-400 h-full transition-all duration-300"
              style={{ width: `${(timerSeconds / 60) * 100}%` }}
            />
          </div>

          {/* Script Display Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-white/10 bg-[#09090f] p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded">
                  00:00 - 00:10 // THE HOOK
                </span>
                <span className="text-xs font-mono text-gray-500">32 words</span>
              </div>
              <p className="text-lg font-medium text-white leading-relaxed">
                &ldquo;Hi, I&apos;m <span className="text-[#00ffcc] font-bold">Andre Lapensee</span>, founder and CEO of X-Sovereign Pro. 
                Today, the AI revolution is slamming into a hard physical wall: power grids are tapped out, utilities have 7-year waitlists, 
                and every 50-megawatt data center boils away <span className="text-rose-400 font-bold">180 million gallons</span> of drinking water each year just blowing hot air into the sky.&rdquo;
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#09090f] p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded">
                  00:10 - 00:25 // THE SOLUTION
                </span>
                <span className="text-xs font-mono text-gray-500">41 words</span>
              </div>
              <p className="text-lg font-medium text-white leading-relaxed">
                &ldquo;We built <span className="text-[#00ffcc] font-bold">AethelGrid</span> to turn that waste into an unstoppable competitive advantage. 
                AethelGrid is a circular thermodynamic data center that captures <span className="text-emerald-400 font-bold">88% of waste heat</span>, 
                compresses it, and generates clean electricity and district heating. We achieve an astonishing <span className="text-[#00ffcc] font-bold">PUE of 1.167</span> with 82% profit margins.&rdquo;
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#09090f] p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-blue-300 bg-blue-500/10 px-2.5 py-1 rounded">
                  00:25 - 00:42 // TRACTION & SITE
                </span>
                <span className="text-xs font-mono text-gray-500">43 words</span>
              </div>
              <p className="text-lg font-medium text-white leading-relaxed">
                &ldquo;We&apos;ve locked down a <span className="text-amber-400 font-bold">60-hectare site lease partnership</span> with Garden River First Nation right outside Sault Ste. Marie, 
                backed by an independent <span className="text-emerald-400 font-bold">142.5 million dollar NPV</span>. Supporting this is our live software ecosystem—nine published Devpost hackathons, 
                our SignSafe legal redlining engine, and the OMNIBRAIN autonomous agent swarm.&rdquo;
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#09090f] p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded">
                  00:42 - 00:60 // THE ASK & CLOSING
                </span>
                <span className="text-xs font-mono text-gray-500">36 words</span>
              </div>
              <p className="text-lg font-medium text-white leading-relaxed">
                &ldquo;I am a solo builder who engineered <span className="text-[#00ffcc] font-bold">258 build sessions across 184 days</span> without a single dollar of venture capital. 
                With <span className="text-purple-400 font-bold">Techstars&apos; network and mentorship</span>, we are going to build the clean infrastructure backbone of the next century. 
                Let&apos;s build it together.&rdquo;
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: FINANCIALS & DCF MODEL */}
      {activeTab === 'financials' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-2xl border border-[#00ffcc]/30 bg-[#0c0c16] p-6 space-y-2">
              <div className="text-xs font-mono text-gray-400">10-Yr ProjectCo Net Present Value</div>
              <div className="text-3xl font-black text-white font-mono text-[#00ffcc]">$142.5M</div>
              <div className="text-xs text-gray-400">Audited discounted cash flow model</div>
            </div>
            <div className="rounded-2xl border border-emerald-500/30 bg-[#0c0c16] p-6 space-y-2">
              <div className="text-xs font-mono text-gray-400">Net Operating EBITDA Margin</div>
              <div className="text-3xl font-black text-white font-mono text-emerald-400">82.1%</div>
              <div className="text-xs text-gray-400">$71.4M annual EBITDA on $87M revenue</div>
            </div>
            <div className="rounded-2xl border border-purple-500/30 bg-[#0c0c16] p-6 space-y-2">
              <div className="text-xs font-mono text-gray-400">Capital Payback Horizon</div>
              <div className="text-3xl font-black text-white font-mono text-purple-400">3.1 Years</div>
              <div className="text-xs text-gray-400">Rapid infrastructure capital return</div>
            </div>
            <div className="rounded-2xl border border-amber-500/30 bg-[#0c0c16] p-6 space-y-2">
              <div className="text-xs font-mono text-gray-400">Non-Dilutive Grant Pipeline</div>
              <div className="text-3xl font-black text-white font-mono text-amber-400">$5.0M</div>
              <div className="text-xs text-gray-400">Jane Ramachandran (Resonant Solutions)</div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#09090f] p-8 space-y-6">
            <h3 className="text-xl font-bold text-white tracking-tight">
              AethelGrid 50MW ProjectCo — Pro Forma Cash Flow Summary
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400">
                    <th className="pb-3">Financial Metric</th>
                    <th className="pb-3">Year 1</th>
                    <th className="pb-3">Year 2</th>
                    <th className="pb-3">Year 3</th>
                    <th className="pb-3">Year 5</th>
                    <th className="pb-3">Year 10</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-gray-200">
                  <tr>
                    <td className="py-3.5 font-bold text-white">GPU Colocation Revenue ($145/kW-mo)</td>
                    <td className="py-3.5">$21.75M</td>
                    <td className="py-3.5">$52.20M</td>
                    <td className="py-3.5">$87.00M</td>
                    <td className="py-3.5">$87.00M</td>
                    <td className="py-3.5">$87.00M</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 font-bold text-white">District Heating Offtake ($18.50/MWh-th)</td>
                    <td className="py-3.5">$1.12M</td>
                    <td className="py-3.5">$2.80M</td>
                    <td className="py-3.5">$4.62M</td>
                    <td className="py-3.5">$4.62M</td>
                    <td className="py-3.5">$4.62M</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 font-bold text-white">Carbon & Clean Grid Credits</td>
                    <td className="py-3.5">$0.45M</td>
                    <td className="py-3.5">$1.10M</td>
                    <td className="py-3.5">$1.85M</td>
                    <td className="py-3.5">$1.85M</td>
                    <td className="py-3.5">$1.85M</td>
                  </tr>
                  <tr className="bg-[#00ffcc]/5">
                    <td className="py-3.5 font-bold text-[#00ffcc]">Gross Operating Revenue</td>
                    <td className="py-3.5 font-bold text-[#00ffcc]">$23.32M</td>
                    <td className="py-3.5 font-bold text-[#00ffcc]">$56.10M</td>
                    <td className="py-3.5 font-bold text-[#00ffcc]">$93.47M</td>
                    <td className="py-3.5 font-bold text-[#00ffcc]">$93.47M</td>
                    <td className="py-3.5 font-bold text-[#00ffcc]">$93.47M</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 font-bold text-rose-400">Total Operating Expenses (OPEX)</td>
                    <td className="py-3.5 text-rose-400">($4.80M)</td>
                    <td className="py-3.5 text-rose-400">($10.20M)</td>
                    <td className="py-3.5 text-rose-400">($15.60M)</td>
                    <td className="py-3.5 text-rose-400">($15.60M)</td>
                    <td className="py-3.5 text-rose-400">($15.60M)</td>
                  </tr>
                  <tr className="bg-emerald-500/10">
                    <td className="py-3.5 font-bold text-emerald-300">EBITDA (Net Operating Cash Flow)</td>
                    <td className="py-3.5 font-bold text-emerald-300">$18.52M</td>
                    <td className="py-3.5 font-bold text-emerald-300">$45.90M</td>
                    <td className="py-3.5 font-bold text-emerald-300">$77.87M</td>
                    <td className="py-3.5 font-bold text-emerald-300">$77.87M</td>
                    <td className="py-3.5 font-bold text-emerald-300">$77.87M</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: THERMODYNAMICS & ARCHITECTURE */}
      {activeTab === 'architecture' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-2xl border border-white/10 bg-[#09090f] p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                01
              </div>
              <h4 className="text-base font-bold text-white">Direct-to-Chip Cold Plates</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Microchannel copper plates capture heat directly from GPU silicon (32°C &rarr; 65°C delta), bypassing convective air limits entirely.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#09090f] p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                02
              </div>
              <h4 className="text-base font-bold text-white">Heat Pump Compression</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Thermodynamic vapor compression pumps amplify temperature from 65°C to 110°C at 4.8 COP, creating industrial-grade exergy.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#09090f] p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                03
              </div>
              <h4 className="text-base font-bold text-white">120 MWh Thermal Battery</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Twin paraffin phase-change vessels store thermal energy at 99.85% health, buffering output against grid price fluctuations.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#09090f] p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                04
              </div>
              <h4 className="text-base font-bold text-white">ORC Turbine & District Heat</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Organic Rankine Cycle generator yields 6.2 MW of electricity returned to grid, while 82°C hydronic heat powers municipal buildings.
              </p>
            </div>
          </div>

          <div className="p-8 rounded-2xl border border-white/10 bg-[#0c0c16] space-y-4">
            <h3 className="text-lg font-bold text-white">PUE Benchmark: Industry Standard vs. AethelGrid</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-mono text-gray-400 mb-1">
                  <span>Legacy Hyperscale (Equinix / AWS Air Cooled)</span>
                  <span className="text-rose-400 font-bold">1.48 PUE (32% wasted)</span>
                </div>
                <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full" style={{ width: '85%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-gray-400 mb-1">
                  <span>AethelGrid Circular Thermodynamic Architecture</span>
                  <span className="text-[#00ffcc] font-bold">1.167 PUE (88% recovered)</span>
                </div>
                <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-500 to-[#00ffcc] h-full" style={{ width: '22%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: DILIGENCE VAULT */}
      {activeTab === 'diligence' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-white/10 bg-[#09090f] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-purple-400">MODULE 09</span>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Active</span>
              </div>
              <h4 className="text-base font-bold text-white">Techstars Accelerator Dossier</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Word-for-word official accelerator application memo, teleprompter video pitch, TAM/SAM/SOM, and team DNA.
              </p>
              <div className="pt-2">
                <a 
                  href="/MASTER_DILIGENCE_DATA_ROOM/09_TECHSTARS_ACCELERATOR_APPLICATION_DOSSIER.md" 
                  target="_blank"
                  className="text-xs font-mono text-[#00ffcc] hover:underline flex items-center gap-1"
                >
                  Open Markdown Dossier <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-[#09090f] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-purple-400">MODULE 06</span>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Executed</span>
              </div>
              <h4 className="text-base font-bold text-white">Garden River FN Partnership</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Term sheet covering the 49-year lease on the 60-hectare Jardon Mine site and 15% First Nation equity.
              </p>
              <div className="pt-2">
                <a 
                  href="/MASTER_DILIGENCE_DATA_ROOM/06_PARTNERSHIP_AGREEMENT_TERM_SHEET.md" 
                  target="_blank"
                  className="text-xs font-mono text-[#00ffcc] hover:underline flex items-center gap-1"
                >
                  View Partnership Term Sheet <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-[#09090f] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-purple-400">MODULE 07</span>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Engaged</span>
              </div>
              <h4 className="text-base font-bold text-white">Grants & Investor Package</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Resonant Solutions (Jane Ramachandran) non-dilutive grant pipeline ($500K–$5M) and debt underwriting params.
              </p>
              <div className="pt-2">
                <a 
                  href="/MASTER_DILIGENCE_DATA_ROOM/07_GRANTS_LOANS_AND_INVESTOR_PACKAGE.md" 
                  target="_blank"
                  className="text-xs font-mono text-[#00ffcc] hover:underline flex items-center gap-1"
                >
                  View Grants & Valuation Package <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-purple-500/20 bg-purple-500/5 flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-sm font-bold text-white">Looking for the Complete Master Data Room?</div>
              <div className="text-xs text-gray-400">
                Explore all 10 modules including banking, receipts, NOAs, contributor census, and Monday BN execution playbook.
              </div>
            </div>
            <a
              href="/MASTER_DILIGENCE_DATA_ROOM/index.html"
              target="_blank"
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold flex items-center gap-2 transition-colors"
            >
              Open Full Master Data Room <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
