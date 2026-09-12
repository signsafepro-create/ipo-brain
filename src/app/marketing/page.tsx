'use client';
import { useState, useEffect } from 'react';
import { Megaphone, Send, Sparkles, Copy, Check, RefreshCw, Layers } from 'lucide-react';

export default function MarketingOS() {
  const [prompt, setPrompt] = useState('');
  const [audience, setAudience] = useState('Enterprise B2B');
  const [platform, setPlatform] = useState('Omnichannel (All)');
  const [output, setOutput] = useState('');
  const [provider, setProvider] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('last_marketing_campaign');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.output) {
          setOutput(parsed.output);
          setProvider(parsed.provider || '');
          if (parsed.prompt) setPrompt(parsed.prompt);
          if (parsed.audience) setAudience(parsed.audience);
          if (parsed.platform) setPlatform(parsed.platform);
        }
      } catch {
        // ignore
      }
    }
  }, []);

  const handleExecute = async () => {
    if (!prompt.trim() || isLoading) return;
    setIsLoading(true);

    try {
      const res = await fetch('/api/marketing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, audience, platform }),
      });

      const data = await res.json();
      if (data.success && data.result) {
        setOutput(data.result);
        setProvider(data.provider || 'AI Engine');
        localStorage.setItem('last_marketing_campaign', JSON.stringify({
          prompt, audience, platform, output: data.result, provider: data.provider
        }));
      } else {
        setOutput(`[ERROR] ${data.error || 'Failed to generate campaign'}`);
      }
    } catch (err) {
      setOutput(`[ERROR] Network issue: ${(err as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadPrevious = () => {
    const saved = localStorage.getItem('last_marketing_campaign');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setOutput(parsed.output || '');
        setProvider(parsed.provider || '');
        if (parsed.prompt) setPrompt(parsed.prompt);
        if (parsed.audience) setAudience(parsed.audience);
        if (parsed.platform) setPlatform(parsed.platform);
      } catch {
        // ignore
      }
    }
  };

  const setPreset = (presetText: string) => {
    setPrompt(presetText);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-500">
      {/* Header */}
      <div className="pb-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Megaphone className="w-8 h-8 text-[#00ffcc]" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Marketing OS</h1>
            <p className="text-gray-400 mt-1">Autonomous AI Campaign Studio & Copy Generator</p>
          </div>
        </div>
        {provider && (
          <span className="text-xs px-3 py-1 rounded-full bg-[#00ffcc]/10 text-[#00ffcc] border border-[#00ffcc]/30 font-mono">
            ● Active Engine: {provider}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Campaign Canvas */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 border border-white/10 min-h-[560px] flex flex-col justify-between">
          <div className="flex-1 border-b border-white/10 mb-4 pb-4 overflow-y-auto max-h-[500px]">
            {output ? (
              <div className="relative">
                <div className="flex justify-between items-center mb-3 pb-2 border-b border-white/10">
                  <span className="text-xs font-mono uppercase text-[#00ffcc] tracking-wider flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" /> Campaign Generated
                  </span>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg transition-colors font-mono"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied!' : 'Copy Campaign'}
                  </button>
                </div>
                <pre className="whitespace-pre-wrap font-sans text-sm text-gray-200 leading-relaxed bg-black/40 p-4 rounded-xl border border-white/5">
                  {output}
                </pre>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full min-h-[350px] text-gray-500 space-y-4">
                <Sparkles className="w-12 h-12 text-[#00ffcc]/30 animate-pulse" />
                <p className="text-sm font-medium">Awaiting campaign parameters...</p>
                <div className="flex flex-wrap gap-2 justify-center max-w-md pt-2">
                  <button
                    onClick={() => setPreset('Sellvia E-Commerce: High-converting viral ad hooks for high-margin products')}
                    className="text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 transition-colors"
                  >
                    🛒 Sellvia Viral Ads
                  </button>
                  <button
                    onClick={() => setPreset('Sovereign Matrix: 7-day organic launch campaign for autonomous AI infrastructure')}
                    className="text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 transition-colors"
                  >
                    🚀 Sovereign Stack Launch
                  </button>
                  <button
                    onClick={() => setPreset('SignSafe: B2B legal contract risk scanner for SMBs and freelancers')}
                    className="text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 transition-colors"
                  >
                    🛡️ SignSafe Contract Scanner
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Input & Action Bar */}
          <div className="relative">
            <input 
              type="text" 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleExecute(); }}
              placeholder="e.g. Generate a high-converting launch campaign for Sellvia winning products..."
              className="w-full bg-black/60 border border-white/20 rounded-xl px-4 py-4 pr-32 text-white focus:outline-none focus:border-[#00ffcc] transition-colors text-sm"
            />
            <button 
              onClick={handleExecute}
              disabled={isLoading || !prompt.trim()}
              className="absolute right-2 top-2 bottom-2 bg-[#00ffcc] disabled:bg-[#00ffcc]/40 text-black px-5 font-bold rounded-lg hover:bg-[#00ccaa] transition-all flex items-center gap-2 text-sm disabled:cursor-not-allowed shadow-[0_0_15px_rgba(0,255,204,0.3)]"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Running...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Execute
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* Campaign Settings Sidebar */}
        <div className="glass-panel rounded-2xl p-6 border border-white/10 h-fit space-y-6">
          <h3 className="font-bold text-white uppercase tracking-widest text-sm flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#00ffcc]" /> Campaign Settings
          </h3>

          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-400 uppercase font-semibold">Target Audience</label>
              <select 
                value={audience} 
                onChange={(e) => setAudience(e.target.value)}
                className="w-full mt-1 bg-black/50 border border-white/10 rounded-lg p-2.5 text-white text-sm focus:border-[#00ffcc] focus:outline-none"
              >
                <option>Enterprise B2B</option>
                <option>Developers / Tech</option>
                <option>Consumer / Retail</option>
                <option>Dropshippers & E-Commerce</option>
                <option>Crypto / Web3 Investors</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-400 uppercase font-semibold">Platform</label>
              <select 
                value={platform} 
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full mt-1 bg-black/50 border border-white/10 rounded-lg p-2.5 text-white text-sm focus:border-[#00ffcc] focus:outline-none"
              >
                <option>Omnichannel (All)</option>
                <option>Twitter / X</option>
                <option>LinkedIn</option>
                <option>TikTok & Instagram Reels</option>
                <option>Facebook Ads</option>
                <option>Google Search Ads</option>
              </select>
            </div>

            <button 
              onClick={loadPrevious}
              type="button"
              className="w-full py-3 mt-4 border border-[#00ffcc]/50 text-[#00ffcc] font-bold rounded-lg hover:bg-[#00ffcc]/10 transition-colors text-sm"
            >
              Load Previous Campaign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
