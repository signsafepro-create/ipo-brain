'use client';
import { useState, useEffect, useRef } from 'react';
import { Mic, Play, Square, Volume2, AudioWaveform } from 'lucide-react';

const PRESET_SCRIPTS = [
  {
    label: 'Executive Briefing',
    text: 'Sovereign Matrix Command online. All seventeen autonomous sub-agents report nominal telemetry. Anthropic IPO probability increased to 92 percent following confidential S-1 submission.'
  },
  {
    label: 'Security Alert',
    text: 'Attention. SignSafe AI has detected an uncapped indemnification liability in section four of the incoming vendor contract. Automatic redline recommendations have been staged.'
  },
  {
    label: 'Trading Signal',
    text: 'Quant engine alert. Pre-IPO momentum breakout triggered on ANTH USD. Executing fifty thousand dollar algorithmic buy order at mark price nine hundred twenty four.'
  }
];

export default function VoiceStudio() {
  const [script, setScript] = useState(PRESET_SCRIPTS[0].text);
  const [rate, setRate] = useState(1.0);
  const [pitch, setPitch] = useState(1.0);
  const [volume, setVolume] = useState(1.0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Load available speech synthesis voices in browser
  useEffect(() => {
    const loadVoices = () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        const available = window.speechSynthesis.getVoices();
        if (available.length > 0) {
          setVoices(available);
          // Prefer English voice
          const defaultIdx = available.findIndex(v => v.lang.startsWith('en'));
          if (defaultIdx !== -1) setSelectedVoiceIndex(defaultIdx);
        }
      }
    };

    loadVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Simple Canvas Visualizer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const bars = 36;
      const barWidth = canvas.width / bars;

      for (let i = 0; i < bars; i++) {
        const heightMultiplier = isSpeaking
          ? Math.sin(phase + i * 0.35) * 0.4 + 0.6
          : 0.15 + Math.sin(i * 0.2) * 0.05;
        
        const barHeight = heightMultiplier * (canvas.height * 0.8);
        const x = i * barWidth;
        const y = (canvas.height - barHeight) / 2;

        const grad = ctx.createLinearGradient(0, y, 0, y + barHeight);
        grad.addColorStop(0, isSpeaking ? '#ff9900' : '#444444');
        grad.addColorStop(1, isSpeaking ? '#ff5500' : '#222222');

        ctx.fillStyle = grad;
        ctx.fillRect(x + 2, y, barWidth - 4, barHeight);
      }

      phase += isSpeaking ? 0.15 : 0.02;
      animFrameRef.current = requestAnimationFrame(render);
    };

    render();
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isSpeaking]);

  const handleSpeak = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Speech Synthesis API is not supported in this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    if (!script.trim()) return;

    window.speechSynthesis.cancel(); // Reset any previous queue
    const utterance = new SpeechSynthesisUtterance(script);

    if (voices[selectedVoiceIndex]) {
      utterance.voice = voices[selectedVoiceIndex];
    }
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleStop = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-4 animate-in fade-in duration-500">
      {/* Header */}
      <div className="pb-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/30">
              <Mic className="w-8 h-8 text-orange-400 drop-shadow-[0_0_10px_rgba(251,146,60,0.8)]" />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white">
              Neural <span className="text-orange-400">Voice</span> Synthesis Engine
            </h1>
          </div>
          <p className="text-gray-400 text-sm">
            Hardware-accelerated neural speech generation, dynamic cadence modulation, and realtime acoustic playback.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono uppercase text-gray-500 mr-1">Load Script:</span>
          {PRESET_SCRIPTS.map(p => (
            <button
              key={p.label}
              onClick={() => setScript(p.text)}
              className="text-xs px-3 py-1.5 rounded-lg border border-white/10 bg-black/40 text-gray-300 hover:text-white hover:border-orange-400/50 font-mono transition-all"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Input Text & Live Audio Canvas (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel rounded-2xl p-6 border border-white/10 flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <AudioWaveform className="w-4 h-4 text-orange-400" /> Synthesis Payload
              </span>
              <span className="text-xs font-mono text-gray-500">{script.length} characters</span>
            </div>

            <textarea
              rows={6}
              value={script}
              onChange={(e) => setScript(e.target.value)}
              placeholder="Enter text payload for the neural speech engine..."
              className="w-full bg-black/60 border border-white/15 rounded-xl p-4 text-sm font-mono text-gray-100 leading-relaxed focus:outline-none focus:border-orange-400 transition-colors resize-none"
            ></textarea>

            {/* Audio Waveform Canvas */}
            <div className="h-[140px] bg-black/80 rounded-xl border border-white/10 p-4 flex flex-col items-center justify-center relative overflow-hidden">
              <canvas ref={canvasRef} width={600} height={120} className="w-full h-full" />
              <div className="absolute bottom-2 right-4 text-[10px] font-mono text-gray-500">
                {isSpeaking ? 'STATUS: TRANSMITTING AUDIO WAVEFORM' : 'STATUS: OSCILLATOR STANDBY'}
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleSpeak}
                disabled={!script.trim()}
                className={`flex-1 py-3.5 rounded-xl font-mono font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all ${
                  isSpeaking
                    ? 'bg-amber-500 text-black shadow-[0_0_20px_rgba(245,158,11,0.4)]'
                    : 'bg-orange-500 text-black hover:bg-orange-400 shadow-[0_0_20px_rgba(251,146,60,0.3)]'
                }`}
              >
                {isSpeaking ? (
                  <>
                    <Square className="w-4 h-4" /> Stop Playback
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" /> Speak Out Loud (Live)
                  </>
                )}
              </button>

              {isSpeaking && (
                <button
                  onClick={handleStop}
                  className="px-4 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-mono transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right: Audio Parameters & Voice Model Selection (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-6">
            <h3 className="text-xs font-mono uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-orange-400" /> Acoustic Parameters
            </h3>

            {/* Voice Dropdown */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-gray-400 block uppercase">
                Active Neural Voice ({voices.length > 0 ? `${voices.length} detected` : 'System Default'})
              </label>
              <select
                value={selectedVoiceIndex}
                onChange={(e) => setSelectedVoiceIndex(Number(e.target.value))}
                className="w-full bg-black/60 border border-white/20 rounded-xl p-3 text-xs font-mono text-white focus:outline-none focus:border-orange-400"
              >
                {voices.map((v, i) => (
                  <option key={i} value={i}>
                    {v.name} ({v.lang})
                  </option>
                ))}
                {voices.length === 0 && <option value={0}>System Default Synthesizer</option>}
              </select>
            </div>

            {/* Pitch */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-gray-400">
                <span>Frequency Pitch</span>
                <span className="text-orange-400">{pitch.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="1.8"
                step="0.1"
                value={pitch}
                onChange={(e) => setPitch(Number(e.target.value))}
                className="w-full accent-orange-400"
              />
            </div>

            {/* Rate */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-gray-400">
                <span>Cadence / Speed</span>
                <span className="text-orange-400">{rate.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full accent-orange-400"
              />
            </div>

            {/* Volume */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-gray-400">
                <span>Output Gain</span>
                <span className="text-orange-400">{Math.round(volume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full accent-orange-400"
              />
            </div>

            <div className="p-4 bg-orange-500/5 rounded-xl border border-orange-500/20 text-xs font-mono text-gray-400 leading-relaxed">
              Powered by native browser hardware audio synthesis. Zero API latency, zero cloud charges.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
