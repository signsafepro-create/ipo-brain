'use client';
import { useState } from 'react';
import { Megaphone, Send, Sparkles } from 'lucide-react';

export default function MarketingOS() {
  const [prompt, setPrompt] = useState('');

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-500">
      <div className="pb-4 border-b border-white/10 flex items-center gap-3">
        <Megaphone className="w-8 h-8 text-[#00ffcc]" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Marketing OS</h1>
          <p className="text-gray-400 mt-1">AI Studio powered by Llama 3 & Groq</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 border border-white/10 min-h-[500px] flex flex-col">
          <div className="flex-1 border-b border-white/10 mb-4 pb-4">
            <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4">
              <Sparkles className="w-12 h-12 text-[#00ffcc]/30" />
              <p>Awaiting campaign parameters...</p>
            </div>
          </div>
          <div className="relative">
            <input 
              type="text" 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Generate a 7-day Twitter campaign for a new SaaS product..."
              className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#00ffcc] transition-colors"
            />
            <button className="absolute right-2 top-2 bottom-2 bg-[#00ffcc] text-black px-6 font-bold rounded-lg hover:bg-[#00ccaa] transition-colors flex items-center gap-2">
              <Send className="w-4 h-4" /> Execute
            </button>
          </div>
        </div>
        
        <div className="glass-panel rounded-2xl p-6 border border-white/10 h-fit space-y-6">
          <h3 className="font-bold text-white uppercase tracking-widest text-sm">Campaign Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-400 uppercase">Target Audience</label>
              <select className="w-full mt-1 bg-black/50 border border-white/10 rounded-lg p-2 text-white">
                <option>Enterprise B2B</option>
                <option>Developers / Tech</option>
                <option>Consumer / Retail</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase">Platform</label>
              <select className="w-full mt-1 bg-black/50 border border-white/10 rounded-lg p-2 text-white">
                <option>Omnichannel (All)</option>
                <option>Twitter / X</option>
                <option>LinkedIn</option>
              </select>
            </div>
            <button className="w-full py-3 mt-4 border border-[#00ffcc]/50 text-[#00ffcc] font-bold rounded-lg hover:bg-[#00ffcc]/10 transition-colors">
              Load Previous Campaign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
