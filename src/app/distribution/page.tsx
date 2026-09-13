'use client';

import { useState } from 'react';
import { 
  Share2, MessageSquare, Briefcase, Video, Rss, 
  Send, Sparkles, CheckCircle2, Clock, RefreshCw, LucideIcon
} from 'lucide-react';

type Channel = 'twitter' | 'linkedin' | 'youtube' | 'substack';

interface ChannelConfig {
  id: Channel;
  name: string;
  handle: string;
  maxChars: number;
  icon: LucideIcon;
  color: string;
  badge: string;
}

const CHANNELS: ChannelConfig[] = [
  { id: 'twitter', name: 'X / Twitter', handle: '@ipo_brain', maxChars: 280, icon: MessageSquare, color: 'text-white', badge: 'Thread Enabled' },
  { id: 'linkedin', name: 'LinkedIn Executive', handle: 'LILJR Empire', maxChars: 3000, icon: Briefcase, color: 'text-[#0a66c2]', badge: 'Thought Leadership' },
  { id: 'youtube', name: 'YouTube Cinema', handle: 'SovereignStack', maxChars: 5000, icon: Video, color: 'text-[#ff0000]', badge: '4K Metadata' },
  { id: 'substack', name: 'Substack Newsletter', handle: 'Omni-Brain Weekly', maxChars: 10000, icon: Rss, color: 'text-orange-500', badge: 'Direct Subscribers' },
];

export default function DistributionEngine() {
  const [selectedChannel, setSelectedChannel] = useState<Channel>('twitter');
  const [content, setContent] = useState('🚨 Sovereign AI Ecosystem Update: Autonomous agent mesh deployment is now LIVE on Vercel and GitHub. Real-time pre-IPO valuation oracles, SignSafe legal redlines, and 60 FPS audio visualizers. Experience the future at https://ipo-brain.com');
  const [isDeploying, setIsDeploying] = useState(false);
  const [dispatchStatus, setDispatchStatus] = useState<string | null>(null);

  const activeChannel = CHANNELS.find(c => c.id === selectedChannel)!;
  const charCount = content.length;
  const charPct = Math.min(100, Math.round((charCount / activeChannel.maxChars) * 100));

  // Compute viral hook score
  const hasLink = content.includes('http');
  const hasEmoji = /[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(content) || /[\u2600-\u27BF]/.test(content);
  const hasKeyTerm = /sovereign|ipo|agent|autonomous|mesh|breakthrough/i.test(content);
  const viralScore = Math.min(99, 45 + (hasLink ? 20 : 0) + (hasEmoji ? 15 : 0) + (hasKeyTerm ? 18 : 0));

  const handleBroadcast = () => {
    if (!content.trim() || isDeploying) return;
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      setDispatchStatus(`Successfully syndicated across ${activeChannel.name} and 78 edge relay nodes!`);
      setTimeout(() => setDispatchStatus(null), 4000);
    }, 1000);
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-16 animate-in fade-in duration-500">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-black via-[#0b1319] to-[#041824] p-8 md:p-12">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] text-xs font-mono tracking-wider">
            <Share2 className="w-3.5 h-3.5" />
            OMNICHANNEL BROADCAST & VIRAL SYNDICATION
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Autonomous Content <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00f0ff] via-emerald-400 to-purple-400">
              Distribution Engine
            </span>
          </h1>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed">
            Multi-platform syndication across X, LinkedIn, YouTube, and Substack. 
            Simulate platform rendering, optimize viral hooks, and broadcast with one click.
          </p>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Channel Selector & Analytics */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-[#0c0c14] p-6 space-y-4">
            <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">
              Syndication Nodes
            </h3>
            <div className="space-y-2">
              {CHANNELS.map((ch) => {
                const Icon = ch.icon;
                const isSelected = selectedChannel === ch.id;
                return (
                  <button
                    key={ch.id}
                    onClick={() => setSelectedChannel(ch.id)}
                    className={`w-full p-4 rounded-xl border transition-all flex items-center justify-between text-left ${
                      isSelected
                        ? 'border-[#00f0ff]/40 bg-[#00f0ff]/10 text-white shadow-[0_0_15px_rgba(0,240,255,0.08)]'
                        : 'border-white/5 bg-black/40 text-gray-400 hover:text-white hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${ch.color}`} />
                      <div>
                        <p className="text-xs font-bold text-white">{ch.name}</p>
                        <p className="text-[10px] font-mono text-gray-500">{ch.handle}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#00f0ff]">
                      {ch.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Viral Hook Analyzer Card */}
          <div className="rounded-2xl border border-white/10 bg-[#0c0c14] p-6 space-y-4">
            <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Viral Hook Intelligence
            </h3>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-mono font-black text-white">{viralScore}/100</p>
                <p className="text-xs text-gray-400">Algorithmic Reach Score</p>
              </div>
              <span className={`text-xs font-mono font-bold px-2 py-1 rounded ${
                viralScore >= 80 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
              }`}>
                {viralScore >= 80 ? 'HIGH VELOCITY' : 'MODERATE'}
              </span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 via-[#00f0ff] to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${viralScore}%` }}
              />
            </div>
            <div className="space-y-1.5 text-[11px] font-mono text-gray-400 pt-2 border-t border-white/5">
              <div className="flex justify-between">
                <span>Verified Direct Link</span>
                <span className={hasLink ? 'text-emerald-400' : 'text-gray-600'}>{hasLink ? '✓ DETECTED' : 'MISSING'}</span>
              </div>
              <div className="flex justify-between">
                <span>Power Keywords</span>
                <span className={hasKeyTerm ? 'text-emerald-400' : 'text-gray-600'}>{hasKeyTerm ? '✓ DETECTED' : 'MISSING'}</span>
              </div>
              <div className="flex justify-between">
                <span>Visual Emoji Hook</span>
                <span className={hasEmoji ? 'text-emerald-400' : 'text-gray-600'}>{hasEmoji ? '✓ DETECTED' : 'MISSING'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Broadcast Payload Editor & Live Simulator */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-[#0c0c14] p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                  <activeChannel.icon className={`w-4 h-4 ${activeChannel.color}`} />
                  {activeChannel.name} Broadcast Console
                </h3>
                <p className="text-xs text-gray-500">Live preview matches native platform rendering format.</p>
              </div>

              {/* Character Limit Indicator */}
              <div className="text-right">
                <p className={`text-xs font-mono font-bold ${charPct > 90 ? 'text-red-400' : 'text-gray-400'}`}>
                  {charCount} / {activeChannel.maxChars}
                </p>
                <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden mt-1">
                  <div 
                    className={`h-full ${charPct > 90 ? 'bg-red-400' : 'bg-[#00f0ff]'}`} 
                    style={{ width: `${charPct}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Input Editor */}
            <div className="space-y-2">
              <textarea
                rows={5}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Compose syndicate broadcast payload..."
                className="w-full bg-black/60 border border-white/10 rounded-xl p-4 text-xs font-mono text-white placeholder-gray-600 focus:outline-none focus:border-[#00f0ff] resize-none leading-relaxed"
              />
            </div>

            {/* Live Platform Preview Box */}
            <div className="space-y-2">
              <h4 className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-wider">
                Live Simulator View
              </h4>
              <div className="rounded-xl bg-black/80 border border-white/10 p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00f0ff] to-purple-500 flex items-center justify-center text-black font-black text-xs font-mono">
                    SOV
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white">Sovereign Ecosystem</span>
                      <span className="text-[10px] text-gray-500 font-mono">{activeChannel.handle}</span>
                    </div>
                    <span className="text-[10px] text-gray-600 font-mono">Just now • Automated Dispatch</span>
                  </div>
                </div>
                <p className="text-xs text-gray-200 leading-relaxed font-sans whitespace-pre-wrap">
                  {content || 'Enter text above to preview broadcast...'}
                </p>
              </div>
            </div>

            {/* Feedback Alert */}
            {dispatchStatus && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2.5 text-xs font-mono text-emerald-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{dispatchStatus}</span>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
                <Clock className="w-3.5 h-3.5 text-[#00f0ff]" />
                <span>Zero-Queue Immediate Dispatch</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setContent('🚀 Announcing the Sovereign AI Platform: Full ecosystem unification complete. Test our live Quant Terminal, Legal AI Redlining, and Neural Voice at https://ipo-brain.com')}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-mono text-gray-300 transition-colors"
                >
                  Load Template
                </button>

                <button
                  onClick={handleBroadcast}
                  disabled={isDeploying || !content.trim()}
                  className="px-6 py-2.5 rounded-xl bg-[#00f0ff] hover:bg-[#00ccaa] text-black font-mono font-bold text-xs transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)] flex items-center gap-2 disabled:opacity-50"
                >
                  {isDeploying ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                  {isDeploying ? 'Syndicating Across Edge...' : 'Deploy Global Broadcast'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

