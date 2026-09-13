'use client';

import { useState } from 'react';
import { 
  BookOpen, Copy, Check, ChevronRight 
} from 'lucide-react';

interface Endpoint {
  method: 'GET' | 'POST' | 'WS';
  path: string;
  title: string;
  description: string;
  headers: { key: string; value: string }[];
  params?: { name: string; type: string; desc: string }[];
  curlExample: string;
  tsExample: string;
  pyExample: string;
  responseExample: string;
}

const ENDPOINTS: Endpoint[] = [
  {
    method: 'POST',
    path: '/api/marketing',
    title: 'Autonomous Campaign Synthesis',
    description: 'Dispatches multi-agent reasoning to generate omnichannel marketing campaigns with audience segmentation and viral optimization.',
    headers: [
      { key: 'Content-Type', value: 'application/json' },
      { key: 'Authorization', value: 'Bearer sk_sovereign_live_...' }
    ],
    params: [
      { name: 'prompt', type: 'string', desc: 'Campaign objective or product description' },
      { name: 'audience', type: 'string', desc: 'Target persona (e.g., Enterprise B2B, Gen Z Devs)' },
      { name: 'platform', type: 'string', desc: 'Target channel (e.g., Omnichannel, X/Twitter, LinkedIn)' }
    ],
    curlExample: `curl -X POST https://ipo-brain.com/api/marketing \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer sk_live_your_key" \\
  -d '{"prompt": "Launch Sovereign Agent Mesh", "audience": "Enterprise B2B", "platform": "Omnichannel"}'`,
    tsExample: `const res = await fetch('https://ipo-brain.com/api/marketing', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': \`Bearer \${process.env.SOVEREIGN_API_KEY}\`
  },
  body: JSON.stringify({
    prompt: 'Launch Sovereign Agent Mesh',
    audience: 'Enterprise B2B',
    platform: 'Omnichannel'
  })
});
const { success, result, provider } = await res.json();`,
    pyExample: `import requests

url = "https://ipo-brain.com/api/marketing"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer sk_live_your_key"
}
payload = {
    "prompt": "Launch Sovereign Agent Mesh",
    "audience": "Enterprise B2B",
    "platform": "Omnichannel"
}
res = requests.post(url, json=payload, headers=headers)
data = res.json()`,
    responseExample: `{
  "success": true,
  "provider": "Sovereign Cognitive Engine",
  "result": "Campaign plan generated with 4 omnichannel dispatch phases...",
  "timestamp": "2026-09-12T20:30:00Z"
}`
  },
  {
    method: 'POST',
    path: '/api/stripe/checkout',
    title: 'Tiered Paywall Checkout Generator',
    description: 'Creates a hosted Stripe checkout session for Starter ($49), Pro ($199), or Enterprise ($999) recurring subscriptions.',
    headers: [
      { key: 'Content-Type', value: 'application/json' }
    ],
    params: [
      { name: 'tier', type: 'string', desc: '"starter" | "pro" | "enterprise"' }
    ],
    curlExample: `curl -X POST https://ipo-brain.com/api/stripe/checkout \\
  -H "Content-Type: application/json" \\
  -d '{"tier": "pro"}'`,
    tsExample: `const res = await fetch('/api/stripe/checkout', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ tier: 'pro' })
});
const { url } = await res.json();
window.location.href = url;`,
    pyExample: `import requests

res = requests.post("https://ipo-brain.com/api/stripe/checkout", json={"tier": "pro"})
checkout_url = res.json()["url"]`,
    responseExample: `{
  "url": "https://checkout.stripe.com/c/pay/cs_live_a1b2c3d4..."
}`
  },
  {
    method: 'GET',
    path: '/api/v1/telemetry',
    title: 'System Health & Node Telemetry',
    description: 'Returns real-time edge telemetry, active agent network heartbeats, and average cognitive response latencies.',
    headers: [
      { key: 'Accept', value: 'application/json' }
    ],
    curlExample: `curl https://ipo-brain.com/api/v1/telemetry \\
  -H "Accept: application/json"`,
    tsExample: `const res = await fetch('https://ipo-brain.com/api/v1/telemetry');
const stats = await res.json();
console.log('Uptime:', stats.uptime);`,
    pyExample: `import requests
res = requests.get("https://ipo-brain.com/api/v1/telemetry")
print(res.json())`,
    responseExample: `{
  "status": "HEALTHY",
  "uptime": "99.98%",
  "latencyMs": 14.2,
  "activeNodes": 78,
  "quantumResonator": "55Hz LOCKED"
}`
  }
];

export default function DocsPage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint>(ENDPOINTS[0]);
  const [codeLang, setCodeLang] = useState<'curl' | 'ts' | 'py'>('curl');
  const [copied, setCopied] = useState(false);

  const copyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getActiveCode = () => {
    if (codeLang === 'curl') return selectedEndpoint.curlExample;
    if (codeLang === 'ts') return selectedEndpoint.tsExample;
    return selectedEndpoint.pyExample;
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-16 animate-in fade-in duration-500">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-black via-[#090b14] to-[#031525] p-8 md:p-12">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] text-xs font-mono tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            DEVELOPER API & ARCHITECTURE PORTAL
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Sovereign API & <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00f0ff] via-purple-400 to-emerald-400">
              Protocol Documentation
            </span>
          </h1>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed">
            Integrate autonomous cognitive agents, pre-IPO quantitative intelligence, legal redlining, 
            and commercial monetization into your enterprise infrastructure.
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-mono text-gray-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span>Base URL: https://ipo-brain.com</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00f0ff]" />
              <span>REST & JSON-RPC</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
              <span>Zero-Dependency Serverless</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quickstart Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-white/10 bg-[#0c0c14] p-6 space-y-3">
          <div className="w-8 h-8 rounded-lg bg-[#00f0ff]/10 border border-[#00f0ff]/20 flex items-center justify-center text-[#00f0ff] font-mono font-bold text-xs">
            01
          </div>
          <h4 className="text-base font-bold text-white">Generate Access Credentials</h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            Obtain your API Key from the System Settings console to sign outbound requests with cryptographic nonces.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0c0c14] p-6 space-y-3">
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-mono font-bold text-xs">
            02
          </div>
          <h4 className="text-base font-bold text-white">Select Cognitive Pipeline</h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            Route prompts to Groq (ultra-low latency), Gemini 1.5 Pro (deep reasoning), or Strands AgentCore.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0c0c14] p-6 space-y-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-mono font-bold text-xs">
            03
          </div>
          <h4 className="text-base font-bold text-white">Deploy Sovereign Mesh</h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            Subscribe to webhook telemetry streams and execute autonomous workflows without human intervention.
          </p>
        </div>
      </div>

      {/* API Reference Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        {/* Endpoint Selector Sidebar */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider px-2">
            Available Endpoints
          </h3>
          <div className="space-y-1.5">
            {ENDPOINTS.map((ep) => (
              <button
                key={ep.path}
                onClick={() => setSelectedEndpoint(ep)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                  selectedEndpoint.path === ep.path
                    ? 'border-[#00f0ff]/40 bg-[#00f0ff]/10 text-white shadow-[0_0_15px_rgba(0,240,255,0.05)]'
                    : 'border-white/5 bg-[#0c0c14] text-gray-400 hover:text-white hover:border-white/10'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      ep.method === 'POST' ? 'bg-purple-500/20 text-purple-400' : 'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {ep.method}
                    </span>
                    <span className="text-xs font-mono text-white font-bold">{ep.path}</span>
                  </div>
                  <p className="text-[11px] text-gray-400">{ep.title}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Endpoint Inspector */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-[#0c0c14] p-6 space-y-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    selectedEndpoint.method === 'POST' ? 'bg-purple-500/20 text-purple-400' : 'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {selectedEndpoint.method}
                  </span>
                  <span className="text-lg font-mono font-bold text-white">{selectedEndpoint.path}</span>
                </div>
                <h3 className="text-base font-bold text-white">{selectedEndpoint.title}</h3>
                <p className="text-xs text-gray-400 mt-1">{selectedEndpoint.description}</p>
              </div>
            </div>

            {/* Headers & Parameters */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <h4 className="text-xs font-mono font-bold text-gray-300 uppercase tracking-wider">Required Headers</h4>
              <div className="space-y-1.5">
                {selectedEndpoint.headers.map((h, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs font-mono p-2 rounded-lg bg-black/40 border border-white/5">
                    <span className="text-[#00f0ff]">{h.key}</span>
                    <span className="text-gray-400">{h.value}</span>
                  </div>
                ))}
              </div>

              {selectedEndpoint.params && (
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-mono font-bold text-gray-300 uppercase tracking-wider">Payload Parameters</h4>
                  <div className="space-y-1.5">
                    {selectedEndpoint.params.map((p, idx) => (
                      <div key={idx} className="text-xs font-mono p-2.5 rounded-lg bg-black/40 border border-white/5 space-y-1">
                        <div className="flex justify-between">
                          <span className="text-emerald-400 font-bold">{p.name}</span>
                          <span className="text-gray-500 text-[10px]">{p.type}</span>
                        </div>
                        <p className="text-gray-400 text-[11px] font-sans">{p.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Code Samples Tab */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 bg-black/50 p-1 rounded-lg border border-white/5">
                  {(['curl', 'ts', 'py'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setCodeLang(lang)}
                      className={`px-3 py-1 rounded-md text-[11px] font-mono font-bold uppercase transition-all ${
                        codeLang === lang
                          ? 'bg-[#00f0ff] text-black shadow-[0_0_10px_rgba(0,240,255,0.4)]'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => copyCode(getActiveCode())}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-400 hover:text-white px-3 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy Code'}
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-black/70 border border-white/10 font-mono text-xs text-gray-300 overflow-x-auto leading-relaxed">
                <code>{getActiveCode()}</code>
              </pre>
            </div>

            {/* Sample Response */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">Example Response (200 OK)</h4>
              <pre className="p-4 rounded-xl bg-black/70 border border-emerald-500/20 font-mono text-xs text-emerald-400/90 overflow-x-auto">
                <code>{selectedEndpoint.responseExample}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

