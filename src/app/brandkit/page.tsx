'use client';

import { useState } from 'react';
import { 
  Palette, Copy, Check, Shield, Code2, CheckCircle2 
} from 'lucide-react';

interface ColorToken {
  name: string;
  role: string;
  hex: string;
  rgb: string;
  hsl: string;
  bgClass: string;
  textClass: string;
}

const COLOR_PALETTE: ColorToken[] = [
  { name: "Cyber Cyan", role: "Primary Interactive & Accent", hex: "#00f0ff", rgb: "0, 240, 255", hsl: "184°, 100%, 50%", bgClass: "bg-[#00f0ff]", textClass: "text-black" },
  { name: "Obsidian Void", role: "Primary Canvas Background", hex: "#0a0a0f", rgb: "10, 10, 15", hsl: "240°, 20%, 5%", bgClass: "bg-[#0a0a0f]", textClass: "text-white" },
  { name: "Neural Emerald", role: "Positive Signals & Verified SLA", hex: "#10b981", rgb: "16, 185, 129", hsl: "160°, 84%, 39%", bgClass: "bg-[#10b981]", textClass: "text-white" },
  { name: "Quantum Purple", role: "Deep Cognition & Neural Mesh", hex: "#a855f7", rgb: "168, 85, 247", hsl: "271°, 91%, 65%", bgClass: "bg-[#a855f7]", textClass: "text-white" },
  { name: "Sovereign Gold", role: "High-Tier FinTech & Unicorns", hex: "#f59e0b", rgb: "245, 158, 11", hsl: "38°, 92%, 50%", bgClass: "bg-[#f59e0b]", textClass: "text-black" },
  { name: "Critical Coral", role: "Legal Redlines & Danger Protocol", hex: "#ef4444", rgb: "239, 68, 68", hsl: "0°, 84%, 60%", bgClass: "bg-[#ef4444]", textClass: "text-white" },
];

type BrandTab = 'logos' | 'colors' | 'typography' | 'guidelines';

const BRAND_TABS: { id: BrandTab; label: string }[] = [
  { id: 'logos', label: 'Logos & Monograms' },
  { id: 'colors', label: 'Color Tokens & HSL' },
  { id: 'typography', label: 'Typography Spec' },
  { id: 'guidelines', label: 'Brand & Press Guidelines' },
];

export default function BrandKitPage() {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<BrandTab>('logos');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHex(id);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-16 animate-in fade-in duration-500">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-black via-[#0c0d16] to-[#04101d] p-8 md:p-12">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] text-xs font-mono tracking-wider">
            <Palette className="w-3.5 h-3.5" />
            OFFICIAL DESIGN SYSTEM & BRAND ASSETS
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            The Sovereign <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00f0ff] via-purple-400 to-emerald-400">
              Identity Architecture
            </span>
          </h1>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed">
            The definitive design system, vectors, color tokens, and media guidelines for 
            the Sovereign AI Ecosystem, OMNIBRAIN, and IPO Brain.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto">
        {BRAND_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-[#00f0ff] text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* LOGOS TAB */}
      {activeTab === 'logos' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Logo 1: Quantum Sovereign Node */}
            <div className="rounded-2xl border border-white/10 bg-[#0c0c14] p-6 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="h-48 rounded-xl bg-black/60 border border-white/5 flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#00f0ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <svg className="w-24 h-24 drop-shadow-[0_0_20px_rgba(0,240,255,0.6)]" viewBox="0 0 100 100" fill="none">
                    <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" stroke="#00f0ff" strokeWidth="3" fill="none" />
                    <circle cx="50" cy="50" r="16" fill="#00f0ff" fillOpacity="0.2" stroke="#00f0ff" strokeWidth="2" />
                    <line x1="50" y1="10" x2="50" y2="34" stroke="#00f0ff" strokeWidth="2" />
                    <line x1="50" y1="66" x2="50" y2="90" stroke="#00f0ff" strokeWidth="2" />
                    <line x1="10" y1="30" x2="36" y2="42" stroke="#00f0ff" strokeWidth="2" />
                    <line x1="90" y1="70" x2="64" y2="58" stroke="#00f0ff" strokeWidth="2" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Sovereign Hexagon Node</h3>
                  <p className="text-xs text-gray-400 mt-1">Official primary brandmark for autonomous agent architectures and mesh networks.</p>
                </div>
              </div>
              <button 
                onClick={() => copyToClipboard(`<svg viewBox="0 0 100 100" fill="none"><polygon points="50,10 90,30 90,70 50,90 10,70 10,30" stroke="#00f0ff" strokeWidth="3"/><circle cx="50" cy="50" r="16" fill="#00f0ff" fillOpacity="0.2" stroke="#00f0ff" strokeWidth="2"/></svg>`, 'logo1')}
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono text-xs font-bold border border-white/10 flex items-center justify-center gap-2 transition-colors"
              >
                {copiedHex === 'logo1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Code2 className="w-3.5 h-3.5 text-[#00f0ff]" />}
                {copiedHex === 'logo1' ? 'Copied SVG to Clipboard!' : 'Copy Inline SVG Code'}
              </button>
            </div>

            {/* Logo 2: OMNIBRAIN Dual Synapse */}
            <div className="rounded-2xl border border-white/10 bg-[#0c0c14] p-6 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="h-48 rounded-xl bg-black/60 border border-white/5 flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <svg className="w-24 h-24 drop-shadow-[0_0_20px_rgba(168,85,247,0.6)]" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="38" stroke="#a855f7" strokeWidth="2.5" strokeDasharray="4 4" />
                    <path d="M30,50 Q50,20 70,50 Q50,80 30,50 Z" stroke="#a855f7" strokeWidth="3" fill="#a855f7" fillOpacity="0.2" />
                    <circle cx="50" cy="50" r="8" fill="#00f0ff" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">OMNIBRAIN Dual Synapse</h3>
                  <p className="text-xs text-gray-400 mt-1">Cognitive core mark representing persistent neural memory and multi-modal models.</p>
                </div>
              </div>
              <button 
                onClick={() => copyToClipboard(`<svg viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="38" stroke="#a855f7" strokeWidth="2.5" strokeDasharray="4 4"/><path d="M30,50 Q50,20 70,50 Q50,80 30,50 Z" stroke="#a855f7" strokeWidth="3" fill="#a855f7" fillOpacity="0.2"/><circle cx="50" cy="50" r="8" fill="#00f0ff"/></svg>`, 'logo2')}
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono text-xs font-bold border border-white/10 flex items-center justify-center gap-2 transition-colors"
              >
                {copiedHex === 'logo2' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Code2 className="w-3.5 h-3.5 text-purple-400" />}
                {copiedHex === 'logo2' ? 'Copied SVG to Clipboard!' : 'Copy Inline SVG Code'}
              </button>
            </div>

            {/* Logo 3: IPO Brain FinTech Monogram */}
            <div className="rounded-2xl border border-white/10 bg-[#0c0c14] p-6 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="h-48 rounded-xl bg-black/60 border border-white/5 flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <svg className="w-24 h-24 drop-shadow-[0_0_20px_rgba(16,185,129,0.6)]" viewBox="0 0 100 100" fill="none">
                    <rect x="15" y="15" width="70" height="70" rx="16" stroke="#10b981" strokeWidth="3" />
                    <path d="M30,65 L45,45 L58,55 L72,30" stroke="#10b981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="72" cy="30" r="4" fill="#00f0ff" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">IPO Brain Vector</h3>
                  <p className="text-xs text-gray-400 mt-1">Official FinTech mark for secondary markets, Kelly criterion, and valuation models.</p>
                </div>
              </div>
              <button 
                onClick={() => copyToClipboard(`<svg viewBox="0 0 100 100" fill="none"><rect x="15" y="15" width="70" height="70" rx="16" stroke="#10b981" strokeWidth="3"/><path d="M30,65 L45,45 L58,55 L72,30" stroke="#10b981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><circle cx="72" cy="30" r="4" fill="#00f0ff"/></svg>`, 'logo3')}
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono text-xs font-bold border border-white/10 flex items-center justify-center gap-2 transition-colors"
              >
                {copiedHex === 'logo3' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Code2 className="w-3.5 h-3.5 text-emerald-400" />}
                {copiedHex === 'logo3' ? 'Copied SVG to Clipboard!' : 'Copy Inline SVG Code'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* COLORS TAB */}
      {activeTab === 'colors' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COLOR_PALETTE.map((col) => (
              <div key={col.name} className="rounded-2xl border border-white/10 bg-[#0c0c14] overflow-hidden p-5 space-y-4">
                <div className={`h-28 rounded-xl ${col.bgClass} flex items-end p-3 shadow-inner`}>
                  <span className={`text-xs font-mono font-black px-2 py-1 rounded bg-black/40 text-white`}>
                    {col.hex}
                  </span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">{col.name}</h4>
                  <p className="text-xs text-gray-400 mt-0.5">{col.role}</p>
                </div>
                <div className="space-y-2 pt-2 border-t border-white/5 text-xs font-mono">
                  <div className="flex justify-between items-center text-gray-400">
                    <span>RGB</span>
                    <span className="text-gray-200">{col.rgb}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-400">
                    <span>HSL</span>
                    <span className="text-gray-200">{col.hsl}</span>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(col.hex, col.hex)}
                  className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-mono font-semibold text-gray-300 hover:text-white transition-colors flex items-center justify-center gap-1.5"
                >
                  {copiedHex === col.hex ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedHex === col.hex ? 'Hex Copied!' : 'Copy HEX'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TYPOGRAPHY TAB */}
      {activeTab === 'typography' && (
        <div className="rounded-2xl border border-white/10 bg-[#0c0c14] p-8 space-y-8">
          <div>
            <h3 className="text-xl font-bold text-white">Official Typefaces & Scales</h3>
            <p className="text-sm text-gray-400 mt-1">Engineered for maximum legibility in high-density telemetry HUDs and executive dashboards.</p>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-black/50 border border-white/5 space-y-2">
              <div className="flex justify-between text-xs font-mono text-[#00f0ff]">
                <span>PRIMARY DISPLAY // INTER TIGHT & GEIST</span>
                <span>WEIGHT 900 / BLACK</span>
              </div>
              <p className="text-3xl font-black text-white tracking-tight">
                AUTONOMOUS SOVEREIGN PLATFORM 2026
              </p>
              <p className="text-xs text-gray-400">Used for hero headlines, major valuation figures, and blockbuster titles.</p>
            </div>

            <div className="p-6 rounded-xl bg-black/50 border border-white/5 space-y-2">
              <div className="flex justify-between text-xs font-mono text-emerald-400">
                <span>TELEMETRY MONOSPACE // JETBRAINS MONO</span>
                <span>WEIGHT 700 / BOLD</span>
              </div>
              <p className="text-xl font-mono font-bold text-white">
                VALUATION: $965B // SCORE: 82.4 // KELLY: 14.8%
              </p>
              <p className="text-xs text-gray-400">Used for financial tickers, algorithmic probability scores, and console telemetry.</p>
            </div>

            <div className="p-6 rounded-xl bg-black/50 border border-white/5 space-y-2">
              <div className="flex justify-between text-xs font-mono text-purple-400">
                <span>BODY & INTERFACE // SYSTEM UI / INTER</span>
                <span>WEIGHT 400 & 500 / REGULAR</span>
              </div>
              <p className="text-base text-gray-300 leading-relaxed">
                The Sovereign ecosystem orchestrates cognitive intelligence, financial analysis, and autonomous agency across modern enterprises with verifiable cryptographic safety.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* GUIDELINES TAB */}
      {activeTab === 'guidelines' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/10 bg-[#0c0c14] p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#00f0ff]" /> Official Press Boilerplate
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed bg-black/50 p-4 rounded-xl border border-white/5 font-mono">
              &ldquo;The Sovereign AI Ecosystem is an enterprise-grade multi-agent autonomous operating system uniting pre-IPO secondary market intelligence, contract risk assessment, neural voice dispatching, and agentic cinema creation into a unified decentralized platform.&rdquo;
            </p>
            <button
              onClick={() => copyToClipboard('The Sovereign AI Ecosystem is an enterprise-grade multi-agent autonomous operating system uniting pre-IPO secondary market intelligence, contract risk assessment, neural voice dispatching, and agentic cinema creation into a unified decentralized platform.', 'press')}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-mono text-gray-300 transition-colors flex items-center gap-2"
            >
              {copiedHex === 'press' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedHex === 'press' ? 'Boilerplate Copied!' : 'Copy Boilerplate'}
            </button>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0c0c14] p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Brand Usage Rules
            </h3>
            <ul className="space-y-2 text-xs text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-[#00f0ff] font-bold">01.</span>
                <span>Always maintain a minimum clearspace of 50% relative to the logo mark height.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00f0ff] font-bold">02.</span>
                <span>Do not distort, rotate, or alter the color hues of official SVG vector assets.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00f0ff] font-bold">03.</span>
                <span>When referencing hackathon accolades, attribute strictly to published Devpost records.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00f0ff] font-bold">04.</span>
                <span>Always use dark-mode obsidian backgrounds (`#0a0a0f`) for visual presentations.</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

