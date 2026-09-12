'use client';
import { useState, useEffect, useRef } from 'react';
import { Sparkles, Volume2, VolumeX, Calculator, Cpu, ArrowRight, ArrowLeft } from 'lucide-react';

const MODES = ['SPECTRUM', 'WAVEFORM', 'MATRIX_RAIN', 'QUANTUM_SPHERE'] as const;
type VisualMode = typeof MODES[number];

export default function MatrixHudPage() {
  const [activeMode, setActiveMode] = useState<VisualMode>('WAVEFORM');
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAudioDroneOn, setIsAudioDroneOn] = useState(false);
  const [activeDeckTab, setActiveDeckTab] = useState<'SLIDES' | 'ROI' | 'SWARM'>('SLIDES');
  const [userSeats, setUserSeats] = useState(15);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);

  // Audio drone toggle (Web Audio API)
  const toggleAudioDrone = () => {
    if (isAudioDroneOn) {
      if (oscRef.current) {
        oscRef.current.stop();
        oscRef.current.disconnect();
        oscRef.current = null;
      }
      setIsAudioDroneOn(false);
    } else {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(55, ctx.currentTime); // 55 Hz sub-bass A1
        gain.gain.setValueAtTime(0.04, ctx.currentTime); // Low background volume

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        oscRef.current = osc;
        setIsAudioDroneOn(true);
      } catch (err) {
        console.error('AudioContext error:', err);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (oscRef.current) {
        oscRef.current.stop();
        oscRef.current.disconnect();
      }
    };
  }, []);

  // HTML5 Canvas Multi-Mode Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let tick = 0;
    const drops: number[] = [];
    const matrixChars = 'ｦｱｳｴｵｶｷｹｺｻｼｽｾｿ0123456789IPO_BRAIN_SOVEREIGN';
    const columns = Math.floor(canvas.width / 16);
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -50;
    }

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;

      if (activeMode === 'MATRIX_RAIN') {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = '#00ffcc';
        ctx.font = '14px monospace';

        for (let i = 0; i < drops.length; i++) {
          const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
          ctx.fillText(text, i * 16, drops[i] * 16);
          if (drops[i] * 16 > h && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      } else if (activeMode === 'SPECTRUM') {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        ctx.fillRect(0, 0, w, h);
        const bars = 48;
        const barWidth = w / bars;

        for (let i = 0; i < bars; i++) {
          const height = Math.abs(Math.sin(tick * 0.05 + i * 0.25)) * (h * 0.7) + 10;
          const x = i * barWidth;
          const y = h - height;

          const grad = ctx.createLinearGradient(0, y, 0, h);
          grad.addColorStop(0, '#00ffcc');
          grad.addColorStop(0.5, '#aa00ff');
          grad.addColorStop(1, '#000000');

          ctx.fillStyle = grad;
          ctx.fillRect(x + 2, y, barWidth - 4, height);
        }
      } else if (activeMode === 'WAVEFORM') {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(0, 0, w, h);

        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#00ffcc';
        ctx.shadowColor = '#00ffcc';
        ctx.shadowBlur = 15;

        for (let x = 0; x < w; x++) {
          const y = h / 2 + Math.sin(x * 0.02 + tick * 0.08) * 45 + Math.sin(x * 0.04 - tick * 0.05) * 20;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      } else if (activeMode === 'QUANTUM_SPHERE') {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(0, 0, w, h);
        const cx = w / 2;
        const cy = h / 2;
        const radius = 90 + Math.sin(tick * 0.05) * 15;

        for (let i = 0; i < 32; i++) {
          const angle = (i / 32) * Math.PI * 2 + tick * 0.02;
          const px = cx + Math.cos(angle) * radius;
          const py = cy + Math.sin(angle) * (radius * 0.55);

          ctx.beginPath();
          ctx.arc(px, py, 4, 0, Math.PI * 2);
          ctx.fillStyle = i % 2 === 0 ? '#00ffcc' : '#aa00ff';
          ctx.shadowColor = ctx.fillStyle;
          ctx.shadowBlur = 10;
          ctx.fill();
        }
        ctx.shadowBlur = 0;
      }

      tick++;
      animFrameRef.current = requestAnimationFrame(render);
    };

    render();
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [activeMode]);

  // Slides data
  const SLIDES = [
    {
      title: 'The Sovereign AI Platform Thesis',
      subtitle: 'From Fragmented SaaS Subscriptions to an Autonomous Local-First Empire',
      bullets: [
        'Enterprises bleed $4,000+ per engineer/month across 14 fragmented AI APIs, closed platforms, and rate-limited tokens.',
        'Sovereign Matrix replaces piecemeal subscriptions with a unified local & serverless command stack.',
        'Complete zero-latency autonomy: intelligence, legal contract analysis, quant trading, and marketing pipelines in one hub.'
      ]
    },
    {
      title: 'Four Core Value Pillars',
      subtitle: 'Engineered for Immediate Commercial Monetization',
      bullets: [
        'IPO Brain: Proprietary pre-IPO intelligence scanner tracking Anthropic, OpenAI, Databricks, and Stripe filings.',
        'SignSafe AI: Commercial legal risk analyzer preventing uncapped liability and lock-in traps in seconds.',
        'Quant Trading Terminal: Real-time sentiment arbitrage & algorithmic momentum execution.',
        'Autonomous Marketing OS: Multi-channel viral campaign creator tied into high-margin e-commerce winning products.'
      ]
    },
    {
      title: 'Zero-Vendor-Lock Architecture',
      subtitle: 'Runs Anywhere: Edge Serverless, Local Daemon, or Docker Cluster',
      bullets: [
        'Unified Next.js 14/15 App Router architecture deployed on Vercel with instant edge caching.',
        'Dual Cloudflare Tunnels routing directly to low-latency local Python & Node cluster daemons.',
        'Seamless fallbacks: hardware in-browser Web Speech Synthesis and Web Audio API when offline.'
      ]
    }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-4 animate-in fade-in duration-500">
      {/* Header */}
      <div className="pb-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-[#00ffcc]/10 border border-[#00ffcc]/30">
              <Sparkles className="w-8 h-8 text-[#00ffcc] drop-shadow-[0_0_10px_rgba(0,255,204,0.8)]" />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white">
              Sovereign <span className="text-[#00ffcc]">Matrix</span> Holographic HUD & Deck
            </h1>
          </div>
          <p className="text-gray-400 text-sm">
            4-mode reactive cyber visualizer, procedural ambient synthesizer, and executive ROI studio.
          </p>
        </div>

        {/* Visualizer Mode & Audio Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          {MODES.map(m => (
            <button
              key={m}
              onClick={() => setActiveMode(m)}
              className={`text-xs px-3 py-1.5 rounded-lg border font-mono transition-all ${
                activeMode === m
                  ? 'bg-[#00ffcc] text-black font-black border-[#00ffcc] shadow-[0_0_12px_rgba(0,255,204,0.3)]'
                  : 'bg-black/40 text-gray-400 border-white/10 hover:text-white hover:border-white/30'
              }`}
            >
              {m.replace('_', ' ')}
            </button>
          ))}

          <button
            onClick={toggleAudioDrone}
            className={`text-xs px-3.5 py-1.5 rounded-lg border font-mono font-bold flex items-center gap-1.5 transition-all ${
              isAudioDroneOn
                ? 'bg-purple-500/20 text-purple-300 border-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                : 'bg-black/40 text-gray-400 border-white/10 hover:text-white'
            }`}
          >
            {isAudioDroneOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            {isAudioDroneOn ? '55Hz Drone: ON' : 'Drone: Muted'}
          </button>
        </div>
      </div>

      {/* Holographic Canvas Viewport */}
      <div className="glass-panel rounded-2xl p-4 border border-white/15 bg-black/90 relative overflow-hidden h-[300px] flex items-center justify-center">
        <canvas ref={canvasRef} width={1100} height={280} className="w-full h-full" />
        <div className="absolute top-4 left-6 text-xs font-mono text-gray-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00ffcc] animate-ping"></span>
          ACTIVE CANVAS ENGINE: <span className="text-[#00ffcc] font-bold">{activeMode}</span>
        </div>
        <div className="absolute bottom-4 right-6 text-[11px] font-mono text-gray-500">
          60 FPS REALTIME GPU BUFFER // ZERO LATENCY
        </div>
      </div>

      {/* Presentation Deck & ROI Studio */}
      <div className="glass-panel rounded-2xl p-8 border border-white/10 space-y-6">
        {/* Sub-tab navigation */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3 font-mono text-xs">
            <button
              onClick={() => setActiveDeckTab('SLIDES')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeDeckTab === 'SLIDES' ? 'bg-white/15 text-white font-bold border border-white/20' : 'text-gray-400 hover:text-white'
              }`}
            >
              📊 Executive Slides
            </button>
            <button
              onClick={() => setActiveDeckTab('ROI')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeDeckTab === 'ROI' ? 'bg-[#00ffcc]/20 text-[#00ffcc] font-bold border border-[#00ffcc]/30' : 'text-gray-400 hover:text-white'
              }`}
            >
              💰 ROI Cost Calculator
            </button>
            <button
              onClick={() => setActiveDeckTab('SWARM')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeDeckTab === 'SWARM' ? 'bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30' : 'text-gray-400 hover:text-white'
              }`}
            >
              🤖 103-Agent Swarm
            </button>
          </div>
        </div>

        {/* Tab 1: Slides */}
        {activeDeckTab === 'SLIDES' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#00ffcc]">
                Slide {activeSlide + 1} of {SLIDES.length}
              </span>
              <h2 className="text-2xl font-black text-white">{SLIDES[activeSlide].title}</h2>
              <p className="text-sm text-gray-400 font-mono">{SLIDES[activeSlide].subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
              {SLIDES[activeSlide].bullets.map((bullet, i) => (
                <div key={i} className="glass-panel rounded-xl p-5 border border-white/10 bg-black/40 space-y-3">
                  <div className="w-8 h-8 rounded-lg bg-[#00ffcc]/10 border border-[#00ffcc]/30 text-[#00ffcc] font-mono font-bold flex items-center justify-center text-sm">
                    0{i + 1}
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed font-mono">{bullet}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                onClick={() => setActiveSlide(prev => Math.max(0, prev - 1))}
                disabled={activeSlide === 0}
                className="px-4 py-2 rounded-lg border border-white/10 disabled:opacity-30 text-xs font-mono text-gray-300 flex items-center gap-2 hover:bg-white/5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Previous Slide
              </button>
              <button
                onClick={() => setActiveSlide(prev => Math.min(SLIDES.length - 1, prev + 1))}
                disabled={activeSlide === SLIDES.length - 1}
                className="px-4 py-2 rounded-lg bg-[#00ffcc] disabled:opacity-30 text-xs font-mono font-bold text-black flex items-center gap-2 hover:bg-[#00ccaa]"
              >
                Next Slide <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Interactive ROI Calculator */}
        {activeDeckTab === 'ROI' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Calculator className="w-5 h-5 text-[#00ffcc]" /> Enterprise AI Cost Comparison
              </h2>
              <p className="text-xs text-gray-400 font-mono">
                Calculate annual enterprise savings by replacing per-seat cloud SaaS licenses with the Sovereign Stack.
              </p>
            </div>

            <div className="p-6 bg-black/50 rounded-xl border border-white/10 space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono text-gray-300">
                  <span>Number of Engineers / Legal Analysts:</span>
                  <span className="text-[#00ffcc] font-bold text-sm">{userSeats} Seats</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="100"
                  value={userSeats}
                  onChange={(e) => setUserSeats(Number(e.target.value))}
                  className="w-full accent-[#00ffcc]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/10 text-center font-mono">
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                  <span className="text-xs text-gray-400 block uppercase mb-1">Traditional SaaS Burn</span>
                  <span className="text-2xl font-black text-red-400">
                    ${(userSeats * 280 * 12).toLocaleString()}/yr
                  </span>
                  <span className="text-[10px] text-gray-500 block mt-1">($280/seat/mo across 4 tools)</span>
                </div>

                <div className="p-4 rounded-xl bg-[#00ffcc]/10 border border-[#00ffcc]/30">
                  <span className="text-xs text-gray-400 block uppercase mb-1">Sovereign OS Cost</span>
                  <span className="text-2xl font-black text-[#00ffcc]">
                    ${(999 * 12).toLocaleString()}/yr
                  </span>
                  <span className="text-[10px] text-gray-500 block mt-1">(Flat Sovereign Plan)</span>
                </div>

                <div className="p-4 rounded-xl bg-green-500/15 border border-green-500/40">
                  <span className="text-xs text-green-400 font-bold block uppercase mb-1">Annual Net Savings</span>
                  <span className="text-2xl font-black text-green-400">
                    ${Math.max(0, (userSeats * 280 * 12) - (999 * 12)).toLocaleString()}/yr
                  </span>
                  <span className="text-[10px] text-green-300 block mt-1">
                    {Math.round(((userSeats * 280 * 12 - 999 * 12) / (userSeats * 280 * 12)) * 100)}% Cost Reduction
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Swarm Coordinator */}
        {activeDeckTab === 'SWARM' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-purple-400" /> 103-Micro-Agent Thread Pool
            </h2>
            <p className="text-xs text-gray-400 font-mono">
              Concurrent distributed workers executing specialized tasks across research, legal redlining, arbitrage, and e-commerce.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 font-mono text-xs">
              {[
                { name: 'SEC-Scraper-Alpha', task: 'Monitoring draft S-1 filings', status: 'Active' },
                { name: 'Indemnity-Guard', task: 'Auditing liability caps', status: 'Standby' },
                { name: 'Quant-Scalper-01', task: 'Scanning order book depth', status: 'Active' },
                { name: 'Sellvia-Harvester', task: 'Scraping winning margins', status: 'Active' },
                { name: 'Audio-Synth-Core', task: 'Buffer waveform oscillator', status: 'Nominal' },
                { name: 'Storyboard-Gen', task: 'Framing 16:9 prompt schemas', status: 'Standby' },
                { name: 'Stripe-Fulfillment', task: 'Listening for webhook pulses', status: 'Listening' },
                { name: 'Cloudflare-Daemon', task: 'Tunnel bfd5e9fa keep-alive', status: 'Healthy' }
              ].map(agent => (
                <div key={agent.name} className="p-3 bg-black/50 border border-white/10 rounded-xl space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white truncate">{agent.name}</span>
                    <span className="w-2 h-2 rounded-full bg-green-400"></span>
                  </div>
                  <p className="text-[10px] text-gray-400">{agent.task}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
