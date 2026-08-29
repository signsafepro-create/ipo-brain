import { MonitorPlay, Film, Wand2, Settings2 } from 'lucide-react';

export default function VideoStudio() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="pb-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MonitorPlay className="w-8 h-8 text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.8)]" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Video Studio</h1>
            <p className="text-gray-400 mt-1">High-End Generative Video & Cinematic Assets</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Generator Setup */}
        <div className="glass-panel rounded-2xl p-6 border border-white/10 h-fit space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold tracking-widest">Scene Prompt</label>
              <textarea 
                rows={4}
                placeholder="e.g. A cyberpunk city street at night, neon lights reflecting in puddles, cinematic lighting, 8k resolution..."
                className="w-full mt-2 bg-black/50 border border-white/20 rounded-xl p-4 text-white focus:outline-none focus:border-blue-400 transition-colors resize-none text-sm"
              ></textarea>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-400 uppercase">Aspect Ratio</label>
                <select className="w-full mt-1 bg-black/50 border border-white/10 rounded-lg p-2 text-sm text-white">
                  <option>16:9 (Landscape)</option>
                  <option>9:16 (Vertical)</option>
                  <option>1:1 (Square)</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase">Engine</label>
                <select className="w-full mt-1 bg-black/50 border border-white/10 rounded-lg p-2 text-sm text-white">
                  <option>Luma DreamMachine</option>
                  <option>Runway Gen-3</option>
                  <option>Sora (Pending)</option>
                </select>
              </div>
            </div>
            <button className="w-full py-4 mt-6 bg-blue-500 text-white font-black uppercase tracking-widest rounded-xl hover:bg-blue-400 transition-colors shadow-[0_0_20px_rgba(96,165,250,0.3)] flex items-center justify-center gap-2">
              <Wand2 className="w-5 h-5" /> Render Sequence
            </button>
          </div>
        </div>

        {/* Viewport */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 border border-white/10 flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden group">
          <div className="absolute inset-0 bg-black"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(96,165,250,0.1)_0%,transparent_70%)] opacity-50"></div>
          
          <Film className="w-16 h-16 text-gray-700 mb-4 relative z-10" />
          <p className="text-gray-500 font-mono text-sm tracking-widest relative z-10">[ RENDER VIEWPORT OFFLINE ]</p>
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono text-gray-500 relative z-10">
            <span>RES: 4K UHD</span>
            <span>FPS: 60</span>
            <span>STATUS: STANDBY</span>
          </div>
        </div>
      </div>
    </div>
  );
}
