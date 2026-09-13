'use client';

import { useState } from 'react';
import { 
  ShieldCheck, Activity, Send, CheckCircle2, LifeBuoy 
} from 'lucide-react';

interface ServiceStatus {
  name: string;
  category: string;
  status: 'OPERATIONAL' | 'DEGRADED' | 'MAINTENANCE';
  latency: number;
  uptime: string;
}

const SERVICES: ServiceStatus[] = [
  { name: 'Sovereign Cognitive Mesh', category: 'Reasoning', status: 'OPERATIONAL', latency: 12, uptime: '99.99%' },
  { name: 'Pre-IPO Pricing Oracle', category: 'FinTech', status: 'OPERATIONAL', latency: 8, uptime: '99.98%' },
  { name: 'SignSafe Redline Engine', category: 'Legal AI', status: 'OPERATIONAL', latency: 18, uptime: '100.0%' },
  { name: 'Web Speech Synthesis Core', category: 'Voice', status: 'OPERATIONAL', latency: 4, uptime: '100.0%' },
  { name: 'HTML5 Holographic HUD', category: 'Graphics', status: 'OPERATIONAL', latency: 1, uptime: '100.0%' },
  { name: 'Stripe Billing Gateway', category: 'Monetization', status: 'OPERATIONAL', latency: 140, uptime: '99.95%' },
  { name: 'AWS AgentCore Dispatcher', category: 'Infrastructure', status: 'OPERATIONAL', latency: 34, uptime: '99.97%' },
  { name: 'Omni-Router Multi-Model', category: 'Inference', status: 'OPERATIONAL', latency: 22, uptime: '99.99%' },
];

const FAQ_ITEMS = [
  {
    q: 'How does the Pre-IPO valuation model compute unicorn probabilities?',
    a: 'We synthesize 4 primary signal vectors: SEC draft S-1 filings, secondary share trades, institutional executive hiring trends (e.g. CFO recruitment), and annualized ARR run-rates, evaluated using an ensemble Bayesian probability framework.'
  },
  {
    q: 'Can SignSafe export contract counter-proposals directly to counsel?',
    a: 'Yes. SignSafe generates side-by-side redline diffs and legal commentary that you can copy or export into Word/PDF formats formatted for venture counsel review.'
  },
  {
    q: 'Does the Neural Voice Studio require external API keys to run?',
    a: 'No. The voice studio runs browser-native speech synthesis with client-side Web Audio spectrum analysis at 60 FPS, meaning zero latency and zero external dependency risk.'
  },
  {
    q: 'How do I link custom Stripe keys for production subscriptions?',
    a: 'Navigate to System Settings, paste your live Stripe Secret Key and Publishable Key into the encrypted vault, and click Save. The app immediately routes checkouts to your Stripe merchant account.'
  }
];

export default function SupportPage() {
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketSeverity, setTicketSeverity] = useState('HIGH');
  const [ticketDesc, setTicketDesc] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim()) return;
    const ticketId = `SOV-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedTicket(ticketId);
    setTicketSubject('');
    setTicketDesc('');
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-16 animate-in fade-in duration-500">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-black via-[#09111c] to-[#041a22] p-8 md:p-12">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            ENTERPRISE SUPPORT & LIVE SYSTEM TELEMETRY
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Mission Control & <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-[#00f0ff] to-purple-400">
              Autonomous Dispatch Desk
            </span>
          </h1>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed">
            Real-time infrastructure health, 99.98% SLA monitoring, automated resolution engine, 
            and priority engineering dispatch.
          </p>
        </div>
      </div>

      {/* Global Status Banner */}
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)] animate-pulse" />
          <div>
            <h3 className="text-base font-bold text-white">All Systems Operational</h3>
            <p className="text-xs text-emerald-400/80 font-mono">Global Mesh Uptime: 99.98% over past 90 days // 0 active outages</p>
          </div>
        </div>
        <div className="flex items-center gap-6 text-xs font-mono">
          <div>
            <p className="text-gray-500">Global P99 Latency</p>
            <p className="text-white font-bold">14.8 ms</p>
          </div>
          <div>
            <p className="text-gray-500">Active Nodes</p>
            <p className="text-[#00f0ff] font-bold">78 Edge PoPs</p>
          </div>
        </div>
      </div>

      {/* Service Matrix */}
      <div className="rounded-2xl border border-white/10 bg-[#0c0c14] p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#00f0ff]" /> Service Health Matrix
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {SERVICES.map((s) => (
            <div key={s.name} className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-2">
              <div className="flex justify-between items-start">
                <p className="text-xs font-bold text-white">{s.name}</p>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <div className="flex justify-between text-[11px] font-mono text-gray-400">
                <span>{s.uptime}</span>
                <span className="text-[#00f0ff]">{s.latency}ms</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column: Ticket Submission + FAQ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Ticket Creator */}
        <div className="rounded-2xl border border-white/10 bg-[#0c0c14] p-6 space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Send className="w-4 h-4 text-[#00f0ff]" /> Priority Dispatch Terminal
            </h3>
            <p className="text-xs text-gray-400">Escalate critical platform inquiries or report anomalous agent behavior.</p>
          </div>

          {submittedTicket ? (
            <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <h4 className="text-base font-bold text-white">Ticket Dispatched Successfully</h4>
              <p className="text-xs font-mono text-emerald-400">Incident Code: {submittedTicket}</p>
              <p className="text-xs text-gray-400">Assigned to Core Engineering. Typical response SLA: under 15 minutes.</p>
              <button
                onClick={() => setSubmittedTicket(null)}
                className="mt-2 px-4 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-white"
              >
                Create Another Ticket
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-1">Subject / Issue Summary</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., API latency spike in pre-IPO websocket feed"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#00f0ff]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-1">Severity Level</label>
                  <select
                    value={ticketSeverity}
                    onChange={(e) => setTicketSeverity(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#00f0ff]"
                  >
                    <option value="LOW">Low (General Inquiry)</option>
                    <option value="MED">Medium (Feature Request)</option>
                    <option value="HIGH">High (Performance Degraded)</option>
                    <option value="CRITICAL">Critical (Production Blocker)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-1">Subsystem</label>
                  <select className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#00f0ff]">
                    <option>Quant Trading Desk</option>
                    <option>SignSafe AI Contracts</option>
                    <option>Neural Voice Engine</option>
                    <option>Stripe Billing & Paywall</option>
                    <option>OMNIBRAIN Mesh</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-1">Detailed Diagnostics</label>
                <textarea
                  rows={4}
                  placeholder="Provide error logs, steps to reproduce, or transaction hashes..."
                  value={ticketDesc}
                  onChange={(e) => setTicketDesc(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#00f0ff] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#00f0ff] text-black font-mono font-bold text-xs hover:bg-[#00ccaa] transition-colors shadow-[0_0_15px_rgba(0,240,255,0.3)] flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" /> Dispatch Priority Incident
              </button>
            </form>
          )}
        </div>

        {/* Knowledge Base FAQ */}
        <div className="rounded-2xl border border-white/10 bg-[#0c0c14] p-6 space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <LifeBuoy className="w-4 h-4 text-emerald-400" /> Instant Diagnostics & FAQ
            </h3>
            <p className="text-xs text-gray-400">Autonomous answers to standard deployment and operational queries.</p>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <h4 className="text-xs font-bold text-white flex items-start gap-2">
                  <span className="text-[#00f0ff] font-mono">Q{idx + 1}.</span>
                  <span>{item.q}</span>
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed pl-6">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

