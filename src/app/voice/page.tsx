import { Mic, Play, Volume2, Wand2, Waveform } from 'lucide-react';

export default function VoiceStudio() {
  const voices = [
    { name: 'Sovereign Prime', type: 'Authoritative / Deep', engine: 'ElevenLabs' },
    { name: 'Echo', type: 'Conversational', engine: 'OpenAI TTS' },
    { name: 'Nova', type: 'Energetic / Fast', engine: 'OpenAI TTS' }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="pb-4 border-b border-white/10 flex items-center gap-3">
        <Mic className="w-8 h-8 text-orange-400 drop-shadow-[0_0_10px_rgba(251,146,60,0.8)]" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Voice Studio</h1>
          <p className="text-gray-400 mt-1">Neural Text-to-Speech & Audio Generation</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 border border-white/10 flex flex-col space-y-6">
          <div className="space-y-2">
            <label className="text-xs text-gray-400 uppercase font-bold tracking-widest">Synthesis Payload</label>
            <textarea 
              rows={8}
              placeholder="Enter the script for the neural engine to synthesize..."
              className="w-full bg-black/50 border border-white/20 rounded-xl p-4 text-white focus:outline-none focus:border-orange-400 transition-colors resize-none text-sm leading-relaxed"
            ></textarea>
          </div>

          <div className="flex-1 glass-panel bg-black/40 rounded-xl border border-white/5 p-8 flex flex-col items-center justify-center relative overflow-hidden group">
             <div className="absolute inset-0 flex items-center justify-center gap-1 opacity-30 group-hover:opacity-70 transition-opacity">
               {[...Array(40)].map((_, i) => (
                 <div key={i} className="w-1 bg-orange-400 rounded-full animate-pulse" style={{ height: `${Math.max(10, Math.random() * 100)}%`, animationDelay: `${i * 0.05}s` }}></div>
               ))}
             </div>
             <Play className="w-12 h-12 text-white relative z-10 opacity-50 cursor-pointer hover:opacity-100 hover:scale-110 transition-all drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
             <p className="text-xs font-mono text-gray-500 mt-4 relative z-10 tracking-widest uppercase">Audio Render Buffer</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-6">
            <h3 className="font-bold text-white uppercase tracking-widest text-xs">Voice Selection</h3>
            <div className="space-y-3">
              {voices.map((voice, i) => (
                <div key={i} className={`p-4 rounded-xl border cursor-pointer transition-all ${i === 0 ? 'bg-orange-500/10 border-orange-500/50 shadow-[0_0_15px_rgba(251,146,60,0.1)]' : 'bg-white/5 border-white/10 hover:border-white/30'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <p className={`font-bold ${i === 0 ? 'text-orange-400' : 'text-white'}`}>{voice.name}</p>
                    <Volume2 className={`w-4 h-4 ${i === 0 ? 'text-orange-400' : 'text-gray-500'}`} />
                  </div>
                  <p className="text-xs text-gray-400">{voice.type} • {voice.engine}</p>
                </div>
              ))}
            </div>
            
            <div className="pt-4 border-t border-white/10">
              <label className="text-xs text-gray-400 uppercase">Stability / Clarity</label>
              <input type="range" className="w-full mt-2 accent-orange-400" />
            </div>

            <button className="w-full py-4 bg-orange-500 text-black font-black uppercase tracking-widest rounded-xl hover:bg-orange-400 transition-colors shadow-[0_0_20px_rgba(251,146,60,0.3)] flex items-center justify-center gap-2">
              <Wand2 className="w-5 h-5" /> Synthesize
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
