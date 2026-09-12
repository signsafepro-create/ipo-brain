'use client';
import { useState } from 'react';
import { MonitorPlay, Wand2, Sparkles, Copy, Check, Clapperboard, Camera } from 'lucide-react';

interface CinematicShot {
  shotNumber: number;
  type: string;
  cameraMovement: string;
  duration: string;
  visualDescription: string;
  lightingSpec: string;
  promptSpec: string;
}

const PRESET_CONCEPTS = [
  {
    name: 'Cyber Infiltration: Autonomous AI Core',
    theme: 'Sci-Fi / Cyberpunk',
    prompt: 'A sovereign autonomous AI agent penetrating a subterranean quantum data vault in neo-Tokyo. High-voltage neon cyan reflections, volumetric fog, anamorphic cinematic framing.',
    shots: [
      {
        shotNumber: 1,
        type: 'Extreme Wide Establishing',
        cameraMovement: 'Slow Crane Downward tilt through dense neon smog',
        duration: '4.0s',
        visualDescription: 'Subterranean server monolith towering 50 meters, cooling pipes emitting cryogenic steam.',
        lightingSpec: 'Deep cobalt blue key light with harsh neon cyan edge highlights.',
        promptSpec: 'cinematic extreme wide shot, towering quantum supercomputer monolith, neon cyan glow, cryogenic steam, 8k resolution, photorealistic, anamorphic 35mm lens --ar 16:9'
      },
      {
        shotNumber: 2,
        type: 'Medium Tracking Follow',
        cameraMovement: 'Low-angle tracking dolly along optical fiber conduits',
        duration: '3.5s',
        visualDescription: 'A glowing holographic matrix avatar glides smoothly across the titanium access corridor.',
        lightingSpec: 'Subsurface orange warning strobes pulsing rhythmically at 60 bpm.',
        promptSpec: 'cinematic medium tracking shot, holographic cyber entity gliding down dark titanium corridor, pulsing amber emergency beacons, unreal engine 5 render, cinematic color grade --ar 16:9'
      },
      {
        shotNumber: 3,
        type: 'Close-Up Terminal Lock',
        cameraMovement: 'Rapid Push-In with shallow depth of field',
        duration: '2.5s',
        visualDescription: 'Extreme close up on a crystal neural processor socket clicking into place with electric sparks.',
        lightingSpec: 'High-contrast blinding white discharge with emerald secondary bounce.',
        promptSpec: 'macro close-up shot, crystal quantum processor locking into gold contacts, electrical micro-arcs, dust particles in laser beam, shallow depth of field, f/1.4 --ar 16:9'
      },
      {
        shotNumber: 4,
        type: 'Hero Reveal Pan',
        cameraMovement: '360 Orbital sweep rising to overhead eagle perspective',
        duration: '5.0s',
        visualDescription: 'The entire multi-tier sovereign matrix powers on, illuminate streams radiating into the cloud.',
        lightingSpec: 'Radiant golden-green cyber glow washing across the architectural complex.',
        promptSpec: 'dynamic 360 orbital camera sweep, massive computing facility activating, thousands of server racks pulsing in unison, glorious lighting, cinematic blockbuster --ar 16:9'
      }
    ]
  },
  {
    name: 'Wall Street Pre-IPO Bell Ringing',
    theme: 'Finance / Prestige',
    prompt: 'High-stakes AI tech founder ringing the opening bell on the floor of the New York Stock Exchange. Confetti explosion, television camera flashes, massive ticker display showing ANTH up 48%.',
    shots: [
      {
        shotNumber: 1,
        type: 'Wide Trading Floor Pan',
        cameraMovement: 'Smooth Steadicam glide across crowded trading desks',
        duration: '4.0s',
        visualDescription: 'Thousands of financial traders cheering, staring up at giant ticker displays glowing emerald green.',
        lightingSpec: 'Warm tungsten hall lighting accented by vibrant digital displays.',
        promptSpec: 'cinematic wide shot, packed trading floor, traders celebrating, green ticker boards, dynamic motion blur, documentary realism, arri alexa 65 --ar 16:9'
      },
      {
        shotNumber: 2,
        type: 'Balcony Hero Shot',
        cameraMovement: 'Low-angle pedestal rise up to podium',
        duration: '3.0s',
        visualDescription: 'Founding executive team standing proud behind the brass bell as the digital countdown strikes 09:30:00.',
        lightingSpec: 'Crisp studio spotlights with bright press strobe flashes.',
        promptSpec: 'hero medium shot, tech founders behind stock exchange bell podium, intense camera flashbulbs, dramatic high-key lighting, success and triumph --ar 16:9'
      },
      {
        shotNumber: 3,
        type: 'Climax Confetti Burst',
        cameraMovement: 'High-speed 120fps slow-motion tilt',
        duration: '4.5s',
        visualDescription: 'Heavy brass bell clapper strikes, cannons blast gold and green metallic confetti cascading over crowd.',
        lightingSpec: 'Sparkling backlight catching floating metallic foil particles.',
        promptSpec: '120fps slow motion, brass bell swinging in foreground, explosion of gold confetti fluttering in air, ecstatic celebration, photorealistic 8k --ar 16:9'
      }
    ]
  }
];

export default function VideoStudio() {
  const [activeConceptIndex, setActiveConceptIndex] = useState(0);
  const [userPrompt, setUserPrompt] = useState(PRESET_CONCEPTS[0].prompt);
  const [shots, setShots] = useState<CinematicShot[]>(PRESET_CONCEPTS[0].shots);
  const [aspectRatio, setAspectRatio] = useState('16:9 (Landscape)');
  const [engine, setEngine] = useState('Runway Gen-3 Alpha');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedShotIndex, setCopiedShotIndex] = useState<number | null>(null);

  const handleSelectConcept = (idx: number) => {
    setActiveConceptIndex(idx);
    setUserPrompt(PRESET_CONCEPTS[idx].prompt);
    setShots(PRESET_CONCEPTS[idx].shots);
  };

  const handleGenerate = () => {
    if (!userPrompt.trim()) return;
    setIsGenerating(true);

    setTimeout(() => {
      // Procedurally generate shots based on user prompt
      const generatedShots: CinematicShot[] = [
        {
          shotNumber: 1,
          type: 'Establishing Wide Panoramic',
          cameraMovement: 'Slow forward dolly with subtle 5-degree roll',
          duration: '4.0s',
          visualDescription: `Atmospheric opening establishing the environment: "${userPrompt.slice(0, 80)}..."`,
          lightingSpec: 'Cinematic rim lighting with soft volumetric ambient fill.',
          promptSpec: `${userPrompt}, wide establishing shot, cinematic composition, 8k resolution, photorealistic, 35mm film grain --ar ${aspectRatio.split(' ')[0]}`
        },
        {
          shotNumber: 2,
          type: 'Medium Subject Motion',
          cameraMovement: 'Dynamic tracking shot matching subject velocity',
          duration: '3.5s',
          visualDescription: 'Central subject emerges into focus with heightened visual contrast and atmospheric particles.',
          lightingSpec: 'Dual-tone contrast lighting, high dynamic range highlights.',
          promptSpec: `${userPrompt}, medium tracking shot, vivid detail, cinematic lighting, shallow depth of field --ar ${aspectRatio.split(' ')[0]}`
        },
        {
          shotNumber: 3,
          type: 'Close-Up Dramatic Climax',
          cameraMovement: 'Rapid push-in to focus plane',
          duration: '3.0s',
          visualDescription: 'Culmination of narrative tension, intricate textural detail and sharp reflections.',
          lightingSpec: 'Dramatic high-key backlight casting specular glints.',
          promptSpec: `${userPrompt}, intense close-up shot, dramatic climax, sharp focus, masterwork cinematography --ar ${aspectRatio.split(' ')[0]}`
        }
      ];

      setShots(generatedShots);
      setIsGenerating(false);
    }, 900);
  };

  const handleCopyPrompt = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedShotIndex(idx);
    setTimeout(() => setCopiedShotIndex(null), 2000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-4 animate-in fade-in duration-500">
      {/* Header */}
      <div className="pb-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/30">
              <MonitorPlay className="w-8 h-8 text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.8)]" />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white">
              Cinematic <span className="text-blue-400">Storyboard</span> & Video Studio
            </h1>
          </div>
          <p className="text-gray-400 text-sm">
            AI-directed multi-shot screenplay sequences, camera movement schemas, and prompt specs for Runway, Luma, and Sora.
          </p>
        </div>

        {/* Preset Concept Selector */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono uppercase text-gray-500 mr-1">Premade Concepts:</span>
          {PRESET_CONCEPTS.map((c, i) => (
            <button
              key={c.name}
              onClick={() => handleSelectConcept(i)}
              className={`text-xs px-3 py-1.5 rounded-lg border font-mono transition-all ${
                activeConceptIndex === i
                  ? 'bg-blue-500/20 text-blue-400 border-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.3)]'
                  : 'bg-black/40 text-gray-400 border-white/10 hover:text-white hover:border-white/30'
              }`}
            >
              {c.theme}
            </button>
          ))}
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Directive Input & Engine Config (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-5">
            <div>
              <label className="text-xs font-mono uppercase tracking-widest text-gray-400 block mb-2">
                Cinematic Directive / Scene Vision
              </label>
              <textarea
                rows={5}
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                placeholder="Describe your scene, atmosphere, subjects, and aesthetic tone..."
                className="w-full bg-black/60 border border-white/15 rounded-xl p-4 text-xs font-mono text-gray-100 leading-relaxed focus:outline-none focus:border-blue-400 transition-colors resize-none"
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-gray-400 uppercase block mb-1">Aspect Ratio</label>
                <select
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value)}
                  className="w-full bg-black/60 border border-white/20 rounded-lg p-2.5 text-xs font-mono text-white focus:outline-none focus:border-blue-400"
                >
                  <option>16:9 (Landscape Cinematic)</option>
                  <option>9:16 (Vertical TikTok / Reel)</option>
                  <option>2.39:1 (Anamorphic Cinema)</option>
                  <option>1:1 (Square Feed)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono text-gray-400 uppercase block mb-1">Target Engine</label>
                <select
                  value={engine}
                  onChange={(e) => setEngine(e.target.value)}
                  className="w-full bg-black/60 border border-white/20 rounded-lg p-2.5 text-xs font-mono text-white focus:outline-none focus:border-blue-400"
                >
                  <option>Runway Gen-3 Alpha</option>
                  <option>Luma DreamMachine</option>
                  <option>OpenAI Sora</option>
                  <option>Kling AI 1.5</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !userPrompt.trim()}
              className="w-full py-3.5 bg-blue-500 disabled:bg-blue-500/40 text-white font-mono font-black uppercase tracking-widest text-xs rounded-xl hover:bg-blue-400 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(96,165,250,0.3)] disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" /> Synthesizing Multi-Shot Script...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" /> Generate Multi-Shot Storyboard
                </>
              )}
            </button>
          </div>

          <div className="glass-panel rounded-2xl p-5 border border-white/10 text-xs font-mono space-y-2 text-gray-400">
            <span className="text-white font-bold block uppercase tracking-wider">AI Director Grounding</span>
            <p>Generates production-validated camera motion schemas, lighting specifications, and prompt tokens compatible with high-end video generation models.</p>
          </div>
        </div>

        {/* Right: Storyboard Shot Stream (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-xs font-mono uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <Clapperboard className="w-4 h-4 text-blue-400" /> Shot-By-Shot Director Sequence ({shots.length} Shots)
            </h3>
            <span className="text-xs font-mono text-blue-400 font-bold">
              Total Runtime: {shots.reduce((acc, s) => acc + parseFloat(s.duration), 0).toFixed(1)}s
            </span>
          </div>

          <div className="space-y-4 max-h-[620px] overflow-y-auto pr-1">
            {shots.map((shot, idx) => (
              <div
                key={idx}
                className="glass-panel rounded-xl p-5 border border-white/10 hover:border-blue-400/40 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-400 font-mono text-xs font-bold flex items-center justify-center">
                      {shot.shotNumber}
                    </span>
                    <span className="font-bold text-sm text-white">{shot.type}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono">
                    <span className="text-gray-400 flex items-center gap-1">
                      <Camera className="w-3.5 h-3.5 text-blue-400" /> {shot.cameraMovement}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white/10 text-white font-bold">
                      {shot.duration}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed">
                  <span className="text-white font-semibold">Visual Action:</span> {shot.visualDescription}
                </p>

                <div className="text-[11px] font-mono text-gray-400">
                  <span className="text-blue-300 font-semibold">Lighting & Atmosphere:</span> {shot.lightingSpec}
                </div>

                {/* Prompt Spec */}
                <div className="bg-black/60 border border-white/10 rounded-lg p-3 flex items-start justify-between gap-3">
                  <div className="text-[11px] font-mono text-gray-200 leading-relaxed break-all">
                    <span className="text-[10px] uppercase font-bold text-gray-500 block mb-1">
                      Ready-to-Render Video Prompt:
                    </span>
                    {shot.promptSpec}
                  </div>
                  <button
                    onClick={() => handleCopyPrompt(shot.promptSpec, idx)}
                    className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-white transition-colors flex-shrink-0"
                    title="Copy Prompt"
                  >
                    {copiedShotIndex === idx ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
