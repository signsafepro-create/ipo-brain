/* ═══════════════════════════════════════════════════════════════
   SOVEREIGN MATRIX INTERACTIVE ENGINE v3.0 — app.js
   Handles: Speech Synthesis, Audio FX, Visualizers, & Chat Database
   ═══════════════════════════════════════════════════════════════ */

// ── AUDIO FX SYNTHESIZER (WEB AUDIO API) ──
class CyberSynth {
  constructor() {
    this.ctx = null;
    this.droneGain = null;
    this.droneOsc1 = null;
    this.droneOsc2 = null;
    this.isDroneActive = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  playClick() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(900, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1600, this.ctx.currentTime + 0.06);
    
    gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.06);
  }

  playKeyTick() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1200 + Math.random() * 400, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.03);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.03);
  }

  playBeep() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(640, this.ctx.currentTime);
    
    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  }

  playSuccess() {
    this.init();
    if (!this.ctx) return;
    const time = this.ctx.currentTime;
    
    const playNote = (freq, start, duration) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);
      
      gain.gain.setValueAtTime(0.05, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
      
      osc.start(start);
      osc.stop(start + duration);
    };
    
    playNote(523.25, time, 0.1); // C5
    playNote(659.25, time + 0.07, 0.1); // E5
    playNote(783.99, time + 0.14, 0.15); // G5
    playNote(1046.50, time + 0.21, 0.25); // C6
  }

  playWarning() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(160, this.ctx.currentTime + 0.25);
    
    gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.25);
  }

  toggleAmbientDrone() {
    this.init();
    if (!this.ctx) return false;

    if (this.isDroneActive) {
      if (this.droneGain) {
        this.droneGain.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.5);
        setTimeout(() => {
          try {
            if (this.droneOsc1) this.droneOsc1.stop();
            if (this.droneOsc2) this.droneOsc2.stop();
          } catch(e) {}
          this.isDroneActive = false;
        }, 600);
      }
      return false;
    } else {
      const t = this.ctx.currentTime;
      this.droneGain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, t);

      this.droneOsc1 = this.ctx.createOscillator();
      this.droneOsc1.type = 'sawtooth';
      this.droneOsc1.frequency.setValueAtTime(55, t); // A1 sub-bass

      this.droneOsc2 = this.ctx.createOscillator();
      this.droneOsc2.type = 'sine';
      this.droneOsc2.frequency.setValueAtTime(110.5, t); // Detuned octave

      this.droneOsc1.connect(filter);
      this.droneOsc2.connect(filter);
      filter.connect(this.droneGain);
      this.droneGain.connect(this.ctx.destination);

      this.droneGain.gain.setValueAtTime(0.0001, t);
      this.droneGain.gain.exponentialRampToValueAtTime(0.035, t + 1.2);

      this.droneOsc1.start();
      this.droneOsc2.start();
      this.isDroneActive = true;
      return true;
    }
  }
}

const synth = new CyberSynth();

// ── MODELS CONFIG ──
const MODELS = {
  gemini: {
    id: 'gemini',
    name: 'Gemini 3.5 Flash',
    desc: 'Blazing fast, perfect for high-speed loops and summaries.',
    avatar: '⚡',
    color: '#00f3ff',
    latency: '0.15s',
    accuracy: '94%',
    specialty: 'Speed & Context'
  },
  claude: {
    id: 'claude',
    name: 'Claude 3.5 Sonnet',
    desc: 'Excellent for refactoring, complex logic, and document parsing.',
    avatar: '🔮',
    color: '#bc13fe',
    latency: '0.78s',
    accuracy: '98.2%',
    specialty: 'Coding & Analysis'
  },
  sovereign: {
    id: 'sovereign',
    name: 'Sovereign Core v3',
    desc: 'State machine executor managing database, APIs, and builds.',
    avatar: '👑',
    color: '#ff7b00',
    latency: '1.20s',
    accuracy: '99.5%',
    specialty: 'Autonomous Ops'
  },
  autofix: {
    id: 'autofix',
    name: 'Auto-Fix Engine v23',
    desc: 'Diagnosis sandbox scanning errors and proposing unified diffs.',
    avatar: '🛠️',
    color: '#10b981',
    latency: '0.45s',
    accuracy: '92.8%',
    specialty: 'Self-Healing'
  }
};

let activeModel = 'gemini';

// ── CHAT SESSION SYSTEM (LOCALSTORAGE SYNC) ──
class SessionStore {
  constructor() {
    this.key = 'sovereign_chat_sessions_v3';
    try {
      const stored = localStorage.getItem(this.key);
      this.sessions = stored ? JSON.parse(stored) : [];
      if (!Array.isArray(this.sessions)) {
        this.sessions = [];
      }
      if (this.sessions.length === 0) {
        this.createDefaultSession();
      }
    } catch (e) {
      this.sessions = [];
      this.sessions.push({
        id: 'session_' + Date.now(),
        title: 'Sovereign System Core Init',
        model: 'gemini',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        tag: 'SYS',
        messages: [
          {
            role: 'bot',
            sender: 'Ande X-Sovereign',
            text: 'Sovereign Matrix Command online.\nUnified Auto-Fix, Voice Sync, and Event Bus diagnostics are live and ready for deployment.',
            isSummary: false
          }
        ]
      });
    }
  }

  save() {
    try {
      localStorage.setItem(this.key, JSON.stringify(this.sessions));
    } catch (e) {
      console.warn("localStorage is disabled in private browsing:", e);
    }
  }

  createDefaultSession() {
    const id = 'session_' + Date.now();
    this.sessions.push({
      id: id,
      title: 'Sovereign System Core Init',
      model: 'gemini',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      tag: 'SYS',
      messages: [
        {
          role: 'bot',
          sender: 'Ande X-Sovereign',
          text: 'Sovereign Matrix Command online.\nUnified Auto-Fix, Voice Sync, and Event Bus diagnostics are live and ready for deployment.',
          isSummary: false
        }
      ]
    });
    this.save();
    return id;
  }

  addSession(title = 'New System Prompt', model = 'gemini', tag = 'DEV') {
    const id = 'session_' + Date.now();
    this.sessions.unshift({
      id: id,
      title: title,
      model: model,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      tag: tag,
      messages: []
    });
    this.save();
    return id;
  }

  getSession(id) {
    return this.sessions.find(s => s.id === id);
  }

  deleteSession(id) {
    this.sessions = this.sessions.filter(s => s.id !== id);
    if (this.sessions.length === 0) {
      this.createDefaultSession();
    } else {
      this.save();
    }
  }

  addMessage(sessionId, role, sender, text, isSummary = false, summaryData = null) {
    const session = this.getSession(sessionId);
    if (session) {
      session.messages.push({ role, sender, text, isSummary, summaryData });
      this.save();
    }
  }
}

const db = new SessionStore();
let currentSessionId = (db.sessions && db.sessions[0]) ? db.sessions[0].id : '';

// ── TTS VOICE ENGINE ──
class VoiceManager {
  constructor() {
    this.synth = window.speechSynthesis;
    this.voices = [];
    this.selectedVoice = null;
    this.isPlaying = false;
    this.pitch = 1.0;
    this.rate = 1.05;
    this.currentUtterance = null;

    if (this.synth) {
      // Chrome loads voices asynchronously
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
      this.loadVoices();
    }
  }

  loadVoices() {
    this.voices = this.synth.getVoices().filter(v => {
      const name = v.name.toLowerCase();
      const lang = v.lang.toLowerCase();
      // Keep premium English voices, Google voices, and high-quality Natural voices
      const isEnglish = lang.startsWith('en');
      const isPremium = name.includes('google') || name.includes('natural') || name.includes('microsoft') || name.includes('premium') || name.includes('siri');
      return isEnglish && isPremium;
    });
    
    // If no premium English voices found, fallback to generic English voices
    if (this.voices.length === 0) {
      this.voices = this.synth.getVoices().filter(v => v.lang.toLowerCase().startsWith('en'));
    }
    
    // If still empty, get all voices
    if (this.voices.length === 0) {
      this.voices = this.synth.getVoices();
    }

    const select = document.getElementById('voice-select');
    if (select) {
      select.innerHTML = '';
      this.voices.forEach((v, idx) => {
        const opt = document.createElement('option');
        opt.value = idx;
        opt.textContent = `${v.name} (${v.lang})`;
        // Default to Google or Natural or first English voice
        if (v.name.includes('Google') || v.name.includes('Natural') || idx === 0) {
          opt.selected = true;
          this.selectedVoice = v;
        }
        select.appendChild(opt);
      });
    }
  }

  setVoice(index) {
    if (this.voices[index]) {
      this.selectedVoice = this.voices[index];
    }
  }

  speak(text, onStart, onEnd) {
    if (!this.synth) return;
    this.stop();

    this.currentUtterance = new SpeechSynthesisUtterance(text);
    if (this.selectedVoice) {
      this.currentUtterance.voice = this.selectedVoice;
    }
    this.currentUtterance.pitch = this.pitch;
    this.currentUtterance.rate = this.rate;

    this.currentUtterance.onstart = () => {
      this.isPlaying = true;
      if (onStart) onStart();
    };

    this.currentUtterance.onend = () => {
      this.isPlaying = false;
      if (onEnd) onEnd();
    };

    this.currentUtterance.onerror = () => {
      this.isPlaying = false;
      if (onEnd) onEnd();
    };

    this.synth.speak(this.currentUtterance);
  }

  stop() {
    if (this.synth && this.synth.speaking) {
      this.synth.cancel();
      this.isPlaying = false;
    }
  }
}

const voiceEngine = new VoiceManager();

// ── MULTI-MODE CANVAS SCIFI VISUALIZER ──
class Visualizer {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.animationId = null;
    this.mode = 'idle'; // idle, speaking, listening
    this.style = 'spectrum'; // waveform, spectrum, matrix, core
    this.points = [];
    this.matrixDrops = [];
    this.particles = [];
    this.initPoints();
    this.initMatrix();
    this.initParticles();
  }

  initPoints() {
    this.points = [];
    const count = 32;
    for (let i = 0; i < count; i++) {
      this.points.push({
        x: (this.canvas.width / count) * i + 4,
        targetHeight: 4,
        currentHeight: 4,
        peak: 4,
        peakHold: 0,
        speed: 0.12 + Math.random() * 0.1
      });
    }
  }

  initMatrix() {
    this.matrixDrops = [];
    const cols = Math.floor(this.canvas.width / 14);
    for (let i = 0; i < cols; i++) {
      this.matrixDrops.push({
        x: i * 14 + 7,
        y: Math.random() * this.canvas.height,
        speed: 1 + Math.random() * 2,
        chars: "01アイウエオカキクケコサシスセソタチツテト10X"
      });
    }
  }

  initParticles() {
    this.particles = [];
    for (let i = 0; i < 30; i++) {
      this.particles.push({
        angle: (Math.PI * 2 / 30) * i,
        radius: 18 + Math.random() * 10,
        baseRadius: 18,
        speed: 0.02 + Math.random() * 0.02,
        size: 1.5 + Math.random() * 2
      });
    }
  }

  setStyle(styleName) {
    this.style = styleName;
    document.querySelectorAll('.vis-mode-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.style === styleName);
    });
    if (typeof synth !== 'undefined') synth.playClick();
  }

  setMode(mode) {
    this.mode = mode;
  }

  start() {
    const draw = () => {
      if (!this.canvas || !this.ctx) return;
      const W = this.canvas.width;
      const H = this.canvas.height;
      this.ctx.clearRect(0, 0, W, H);

      const color = MODELS[activeModel]?.color || '#00f3ff';
      const isSpeaking = this.mode === 'speaking';
      const isListening = this.mode === 'listening';

      if (this.style === 'spectrum') {
        // ── 1. EQUALIZER SPECTRUM BARS ──
        const barWidth = (W / this.points.length) - 2;
        for (let i = 0; i < this.points.length; i++) {
          const pt = this.points[i];
          if (isSpeaking) {
            pt.targetHeight = Math.abs(Math.sin(Date.now() * 0.008 + i * 0.35)) * (H * 0.75) + 6;
          } else if (isListening) {
            pt.targetHeight = Math.random() * (H * 0.8) + 4;
          } else {
            pt.targetHeight = Math.abs(Math.sin(Date.now() * 0.002 + i * 0.2)) * 8 + 4;
          }

          pt.currentHeight += (pt.targetHeight - pt.currentHeight) * pt.speed;
          if (pt.currentHeight > pt.peak) {
            pt.peak = pt.currentHeight;
            pt.peakHold = 10;
          } else {
            if (pt.peakHold > 0) pt.peakHold--;
            else pt.peak = Math.max(4, pt.peak - 0.8);
          }

          const x = i * (barWidth + 2);
          const y = H - pt.currentHeight;

          // Gradient bar
          const grad = this.ctx.createLinearGradient(0, H, 0, y);
          grad.addColorStop(0, `${color}33`);
          grad.addColorStop(1, color);

          this.ctx.fillStyle = grad;
          this.ctx.shadowBlur = 6;
          this.ctx.shadowColor = color;
          this.ctx.fillRect(x, y, barWidth, pt.currentHeight);

          // Peak cap
          this.ctx.fillStyle = '#ffffff';
          this.ctx.fillRect(x, H - pt.peak - 2, barWidth, 2);
        }
      } else if (this.style === 'waveform') {
        // ── 2. SMOOTH SINE WAVEFORM ──
        this.ctx.beginPath();
        this.ctx.lineWidth = 2.5;
        this.ctx.strokeStyle = color;
        this.ctx.shadowBlur = 12;
        this.ctx.shadowColor = color;

        const midY = H / 2;
        const amp = isSpeaking ? 24 : (isListening ? 30 : 6);
        const freq = isSpeaking ? 0.04 : (isListening ? 0.06 : 0.02);

        this.ctx.moveTo(0, midY);
        for (let x = 0; x < W; x += 3) {
          const y = midY + Math.sin(x * freq + Date.now() * 0.006) * amp * Math.sin((x / W) * Math.PI);
          this.ctx.lineTo(x, y);
        }
        this.ctx.stroke();

        // Secondary subtle harmonic wave
        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        for (let x = 0; x < W; x += 4) {
          const y = midY + Math.cos(x * freq * 1.5 - Date.now() * 0.004) * (amp * 0.5) * Math.sin((x / W) * Math.PI);
          this.ctx.lineTo(x, y);
        }
        this.ctx.stroke();
      } else if (this.style === 'matrix') {
        // ── 3. MATRIX GLYPH STREAM ──
        this.ctx.font = '10px "Share Tech Mono"';
        this.ctx.fillStyle = color;
        this.ctx.shadowBlur = 8;
        this.ctx.shadowColor = color;

        for (let drop of this.matrixDrops) {
          const char = drop.chars[Math.floor(Math.random() * drop.chars.length)];
          this.ctx.fillText(char, drop.x, drop.y);
          drop.y += drop.speed * (isSpeaking ? 3 : (isListening ? 4 : 1));
          if (drop.y > H) drop.y = 0;
        }
      } else if (this.style === 'core') {
        // ── 4. QUANTUM PULSE SPHERE ──
        const centerX = W / 2;
        const centerY = H / 2;
        const pulse = (isSpeaking ? Math.sin(Date.now() * 0.01) * 8 : (isListening ? Math.random() * 12 : 2));

        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 1.5;
        this.ctx.shadowBlur = 15;
        this.ctx.shadowColor = color;

        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, 14 + pulse, 0, Math.PI * 2);
        this.ctx.stroke();

        for (let p of this.particles) {
          p.angle += p.speed;
          const r = p.baseRadius + pulse + (Math.sin(Date.now() * 0.005 + p.angle) * 6);
          const px = centerX + Math.cos(p.angle) * r;
          const py = centerY + Math.sin(p.angle) * r;

          this.ctx.fillStyle = color;
          this.ctx.beginPath();
          this.ctx.arc(px, py, p.size, 0, Math.PI * 2);
          this.ctx.fill();
        }
      }

      this.animationId = requestAnimationFrame(draw);
    };

    draw();
  }

  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

let visualizer = null;

// ── SPEECH TO TEXT RECOGNITION (STT) ──
let recognition = null;
let isListening = false;

function initSTT() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      isListening = true;
      synth.playBeep();
      const micBtn = document.getElementById('btn-mic');
      if (micBtn) micBtn.classList.add('listening');
      if (visualizer) visualizer.setMode('listening');
      updateStatusText("Matrix Node listening...");
      addEventLog("STT Speech recognition capture initialized.", "success");
    };

    recognition.onresult = (e) => {
      const text = e.results[0][0].transcript;
      const input = document.getElementById('composer-text');
      if (input) {
        input.value = text;
      }
      addEventLog(`Speech Captured: "${text}"`, "info");
    };

    recognition.onerror = (e) => {
      addEventLog(`Speech Recognition Error: ${e.error}`, "error");
      stopListening();
    };

    recognition.onend = () => {
      stopListening();
    };
  }
}

function toggleListening() {
  if (!recognition) {
    alert("Speech recognition API is not fully supported in this browser. Try Google Chrome or MS Edge.");
    return;
  }
  if (isListening) {
    recognition.stop();
  } else {
    recognition.start();
  }
}

function stopListening() {
  isListening = false;
  const micBtn = document.getElementById('btn-mic');
  if (micBtn) micBtn.classList.remove('listening');
  if (visualizer) visualizer.setMode('idle');
  updateStatusText("Microphone offline.");
  synth.playClick();
}

// ── EVENT UTILITIES & INTERACTIVE HUD ──
const EVENT_MOCK_LOGS = [
  { text: "Event Bus registered matrix subagent.", type: "success" },
  { text: "Stripe connection token refreshed.", type: "info" },
  { text: "Autofix diagnostic compilation check passed.", type: "success" },
  { text: "Database schema migration audit complete.", type: "info" },
  { text: "Threat detection scanning active ports...", type: "warning" },
  { text: "Memory Engine consolidated conversation parameters.", type: "info" },
  { text: "Legal architecture contract scanner updated.", type: "success" }
];

function addEventLog(text, type = "info") {
  const list = document.getElementById('log-scroll-area');
  if (!list) return;

  const item = document.createElement('div');
  item.className = `log-item ${type}`;
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  item.innerHTML = `[${timestamp}] ${text}`;
  list.appendChild(item);
  list.scrollTop = list.scrollHeight;
}

function runStatsLoop() {
  setInterval(() => {
    // Generate random fluctuated values for scifi HUD stats
    const cpu = Math.floor(Math.random() * 15) + 8;
    const threads = Math.floor(Math.random() * 8) + 4;
    const memory = (2.4 + Math.random() * 0.3).toFixed(2);
    const threats = Math.floor(Math.random() * 2) === 1 ? 0 : Math.floor(Math.random() * 1);

    document.getElementById('hud-cpu').textContent = `${cpu}%`;
    document.getElementById('bar-cpu').style.width = `${cpu}%`;

    document.getElementById('hud-threads').textContent = `${threads}/12`;
    document.getElementById('bar-threads').style.width = `${(threads / 12) * 100}%`;

    document.getElementById('hud-memory').textContent = `${memory} GB`;
    document.getElementById('bar-memory').style.width = `${(memory / 8) * 100}%`;

    document.getElementById('hud-threats').textContent = threats;
    document.getElementById('bar-threats').style.width = `${threats > 0 ? 80 : 0}%`;

    if (Math.random() > 0.6) {
      const mockLog = EVENT_MOCK_LOGS[Math.floor(Math.random() * EVENT_MOCK_LOGS.length)];
      addEventLog(mockLog.text, mockLog.type);
    }
  }, 3000);
}

function updateStatusText(text) {
  const el = document.getElementById('voice-status-text');
  if (el) el.textContent = text;
}

// ── SYSTEM COMMAND RUNNER & AUTOCOMPLETE ──
const COMMAND_LIST = [
  { cmd: "/help", desc: "List all sovereign CLI triggers" },
  { cmd: "/status", desc: "System diagnostics & cluster status" },
  { cmd: "/scan", desc: "Audit directory files & integrity" },
  { cmd: "/compile", desc: "Safe AST compilation checks" },
  { cmd: "/deploy", desc: "Vercel release deployment checklist" },
  { cmd: "/matrix", desc: "Toggle full-screen digital rain overlay" },
  { cmd: "/sound", desc: "Toggle ambient cyber synth drone" },
  { cmd: "/diagnostics", desc: "Full hardware & network benchmark" },
  { cmd: "/benchmark", desc: "Model latency & speed stress test" },
  { cmd: "/export", desc: "Download chat transcript (.md)" },
  { cmd: "/clear", desc: "Reset active chat history" },
  { cmd: "/theme nebula", desc: "Switch to Nebula Core (Cyan/Purple)" },
  { cmd: "/theme squadron", desc: "Switch to Squadron 42 (Gold/Tactical)" },
  { cmd: "/theme amber", desc: "Switch to Amber Matrix (Amber/Orange)" }
];

const MOCK_COMMANDS = {
  "help": {
    text: "### Sovereign Matrix CLI Triggers\n" +
          "- `/scan`: Searches local repository structures and verifies integrity.\n" +
          "- `/compile`: Triggers safe code evaluation and syntax AST checks.\n" +
          "- `/deploy`: Displays platform release checklist and cloud pipeline state.\n" +
          "- `/status`: Returns active system heartbeat stats.\n" +
          "- `/matrix`: Toggles full-screen cyber matrix digital rain overlay.\n" +
          "- `/sound`: Toggles ambient cyber synth drone.\n" +
          "- `/diagnostics`: Runs deep hardware & neural network diagnostics.\n" +
          "- `/benchmark`: Runs live throughput comparison across all 4 models.\n" +
          "- `/export`: Exports current conversation transcript.\n" +
          "- `/clear`: Clears active conversation.\n" +
          "- `/theme <nebula|squadron|amber>`: Toggles color configurations."
  },
  "scan": {
    text: "### Directory Audit Report\n" +
          "**Target**: `c:\\Users\\wjhmo\\Downloads\\ipo-brain (2)`\n\n" +
          "```bash\n" +
          "[OK] style.css          (24.8 KB) - Scifi HUD Style Sheet\n" +
          "[OK] app.js             (38.2 KB) - Matrix Interaction Core\n" +
          "[OK] index.html         (68.5 KB) - Sovereign Portal Platform\n" +
          "[OK] server.py          (4.5 KB)  - Threaded Python HTTP Host\n" +
          "[OK] api/chat.py        (9.9 KB)  - Serverless AI Endpoint\n" +
          "```\n\n" +
          "**Integrity Status**: 100% Passed. Zero syntax conflicts detected."
  },
  "compile": {
    text: "### Codebase Syntax & AST Diagnostics\n" +
          "- Checking `index.html` structure: **VALID [200 OK]**\n" +
          "- Validating CSS glassmorphism & color variables: **PASS**\n" +
          "- Testing Web Audio API synthesizer nodes: **PASS**\n" +
          "- Testing SpeechSynthesis & Recognition gateways: **READY**\n\n" +
          "🎉 **Compilation smoke check passed successfully.** Ready for deployment."
  },
  "deploy": {
    text: "### Platform Release Checklist\n" +
          "1. [x] Event Bus real-time stream active\n" +
          "2. [x] Multi-mode visualizer rendering loop online\n" +
          "3. [x] Local Python server (`:8794`) & Vercel serverless proxy active\n" +
          "4. [x] Sovereign state database synced\n\n" +
          "🚀 **All release gates verified green.** Live URL: https://ipo-brain.com"
  },
  "status": {
    text: "### Core Heartbeat Overview\n" +
          "- **Sovereign Gateway**: Online (`port 8794`)\n" +
          "- **Active Model**: Gemini 3.5 Flash (Latency ~0.15s)\n" +
          "- **Auto-Fix Sandbox**: Standby\n" +
          "- **Visualizer**: Multi-Mode Active\n" +
          "- **Ambient Synth Drone**: Initialized\n" +
          "- **Database Integrity**: SQLite LocalStorage Matrix Synced"
  },
  "diagnostics": {
    text: "### Deep Hardware & Network Benchmark\n" +
          "- **CPU Core Scheduling**: 12 Virtual Threads Allocated\n" +
          "- **VRAM Neural Allocation**: 4.8 GB Reserved\n" +
          "- **Client Roundtrip Latency**: `12ms`\n" +
          "- **Web Audio Subsystem**: Sample Rate 48,000 Hz (32-bit float)\n" +
          "- **Memory Leak Index**: `0.00%` (Garbage Collector Optimal)"
  },
  "benchmark": {
    text: "### Multi-Model Throughput Benchmark\n\n" +
          "| Model | Specialty | Latency | Accuracy | Throughput |\n" +
          "| :--- | :--- | :--- | :--- | :--- |\n" +
          "| **Gemini 3.5 Flash** | Speed & Summaries | **0.15s** | 94.0% | **185 tok/s** |\n" +
          "| **Claude 3.5 Sonnet** | Coding & Refactor | 0.78s | **98.2%** | 82 tok/s |\n" +
          "| **Sovereign Core** | Autonomous Ops | 1.20s | **99.5%** | 65 tok/s |\n" +
          "| **Auto-Fix Engine** | Self-Healing Diffs | 0.45s | 92.8% | 140 tok/s |"
  }
};

function runCommand(commandText) {
  const cleanCmd = commandText.replace('/', '').trim().toLowerCase();
  
  if (cleanCmd.startsWith('theme ')) {
    const parts = cleanCmd.split(' ');
    const tName = parts[1];
    if (tName === 'nebula' || tName === 'squadron' || tName === 'amber') {
      changeTheme(tName);
      return `Theme successfully swapped to: **${tName.toUpperCase()}**`;
    }
    return "Incorrect theme name. Try: `/theme nebula`, `/theme squadron`, or `/theme amber`";
  }

  if (cleanCmd === 'matrix') {
    toggleMatrixRain();
    return "Toggled Fullscreen Matrix Cyber Glyph Overlay.";
  }

  if (cleanCmd === 'sound') {
    const active = synth.toggleAmbientDrone();
    const soundBtn = document.getElementById('btn-sound-toggle');
    if (soundBtn) soundBtn.classList.toggle('active', active);
    return active ? "🔊 **Ambient Cyber Drone Activated**." : "🔇 **Ambient Cyber Drone Muted**.";
  }

  if (cleanCmd === 'export') {
    exportActiveChat('md');
    return "Conversation transcript export generated and downloaded.";
  }

  if (cleanCmd === 'clear') {
    clearActiveSession();
    return "Active session conversation cleared.";
  }

  if (MOCK_COMMANDS[cleanCmd]) {
    return MOCK_COMMANDS[cleanCmd].text;
  }

  return `System alert: Unknown command "${commandText}". Type \`/help\` to view all valid triggers.`;
}

// ── MARKDOWN & CODE FORMATTER ──
function formatMarkdown(text) {
  if (!text) return '';
  let html = text;

  // Escape HTML tags to prevent XSS
  html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Triple backtick code blocks with copy buttons
  html = html.replace(/```([a-zA-Z0-9_\-]+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    const language = lang || 'code';
    return `
      <div class="custom-code-block">
        <div class="code-header">
          <span class="code-lang">${language}</span>
          <button class="btn-copy" onclick="copyCodeText(this)"><span class="copy-icon">📋</span> Copy</button>
        </div>
        <pre class="code-content"><code>${code.trim()}</code></pre>
      </div>
    `;
  });

  // Inline code `code`
  html = html.replace(/`([^`]+)`/g, '<span class="code-inline">$1</span>');

  // Headings
  html = html.replace(/^### (.*$)/gim, '<h4 style="color:var(--accent-cyan);margin:8px 0 4px;font-family:var(--font-display);">$1</h4>');
  html = html.replace(/^## (.*$)/gim, '<h3 style="color:#fff;margin:10px 0 6px;font-family:var(--font-display);">$1</h3>');

  // Bold & Italic
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');

  // Tables
  if (html.includes('|')) {
    const lines = html.split('\n');
    let inTable = false;
    let tableHtml = '';
    const newLines = [];

    for (let line of lines) {
      if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
        if (!inTable) {
          inTable = true;
          tableHtml = '<table style="width:100%;border-collapse:collapse;margin:10px 0;font-size:12px;font-family:var(--font-mono);background:rgba(0,0,0,0.3);border:1px solid var(--border-color);border-radius:6px;overflow:hidden;">';
        }
        if (line.includes('---')) continue;
        const cells = line.split('|').filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
        tableHtml += '<tr>' + cells.map(c => `<td style="padding:6px 10px;border:1px solid rgba(255,255,255,0.06);">${c.trim()}</td>`).join('') + '</tr>';
      } else {
        if (inTable) {
          tableHtml += '</table>';
          newLines.push(tableHtml);
          inTable = false;
        }
        newLines.push(line);
      }
    }
    if (inTable) {
      tableHtml += '</table>';
      newLines.push(tableHtml);
    }
    html = newLines.join('\n');
  }

  // Line breaks
  html = html.replace(/\n/g, '<br>');
  return html;
}

// ── INTERACTIVE PLAN SIMULATOR ──
function simulatePlan(btn) {
  synth.playClick();
  const summaryBox = btn.closest('.summary-container');
  if (!summaryBox) return;
  
  const progressContainer = summaryBox.querySelector('.plan-progress-container');
  const progressBar = summaryBox.querySelector('.plan-progress-bar');
  const statusTag = summaryBox.querySelector('.summary-tag-status');
  
  if (progressContainer && progressBar) {
    progressContainer.style.display = 'block';
    btn.disabled = true;
    btn.innerHTML = '⚙️ Executing Simulation...';

    let pct = 0;
    const stages = [
      { at: 25, label: "ANALYZING_AST", status: "PROCESSING" },
      { at: 55, label: "COMPILING_MODULES", status: "COMPILING" },
      { at: 85, label: "VERIFYING_DEPLOYMENT", status: "VALIDATING" },
      { at: 100, label: "EXECUTION_COMPLETE", status: "VERIFIED & READY" }
    ];

    const timer = setInterval(() => {
      pct += 5;
      progressBar.style.width = `${pct}%`;
      const curStage = stages.find(s => pct <= s.at);
      if (curStage && statusTag) {
        statusTag.textContent = `Status: ${curStage.status}`;
      }

      if (pct >= 100) {
        clearInterval(timer);
        synth.playSuccess();
        btn.innerHTML = '✅ Plan Executed Successfully';
        btn.style.borderColor = '#10b981';
        btn.style.color = '#10b981';
        addEventLog(`Simulated plan execution cycle successfully finished.`, "success");
      }
    }, 120);
  }
}

// ── INITIALIZING THE CHAT INTERFACE ──
function loadSession(id) {
  currentSessionId = id;
  const session = db.getSession(id);
  if (!session) return;

  activeModel = session.model || 'gemini';
  
  // Highlight active model card
  document.querySelectorAll('.model-card').forEach(card => {
    card.classList.remove('active');
    if (card.dataset.model === activeModel) {
      card.classList.add('active');
    }
  });

  // Highlight active sidebar item
  document.querySelectorAll('.history-item').forEach(item => {
    item.classList.remove('active');
    if (item.dataset.id === id) {
      item.classList.add('active');
    }
  });

  // Update active labels
  document.getElementById('active-title-label').textContent = session.title;
  document.getElementById('active-model-label').textContent = MODELS[activeModel]?.name || 'Gemini 3.5 Flash';

  // Render messages
  const feed = document.getElementById('chat-feed');
  feed.innerHTML = '';
  session.messages.forEach(msg => {
    renderMessage(msg);
  });
  feed.scrollTop = feed.scrollHeight;
}

function renderMessage(msg) {
  const feed = document.getElementById('chat-feed');
  const container = document.createElement('div');
  container.className = `msg-container ${msg.role}`;

  const header = document.createElement('div');
  header.className = 'msg-header';
  header.innerHTML = `<b>${msg.sender}</b> <span>${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>`;

  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble';

  if (msg.isSummary && msg.summaryData) {
    bubble.classList.add('msg-bubble-summary');
    const data = msg.summaryData;
    bubble.innerHTML = `
      <div class="summary-container">
        <div class="summary-heading">${data.title}</div>
        <div class="summary-metadata">
          <span class="summary-tag">Scope: ${data.scope}</span>
          <span class="summary-tag summary-tag-status">Status: ${data.status}</span>
        </div>
        <div class="summary-block">
          <div class="summary-block-title">Key Objective</div>
          <div class="summary-block-text">${data.objective}</div>
        </div>
        ${data.code ? `
        <div class="custom-code-block">
          <div class="code-header">
            <span class="code-lang">${data.codeLang || 'javascript'}</span>
            <button class="btn-copy" onclick="copyCodeText(this)"><span class="copy-icon">📋</span> Copy</button>
          </div>
          <pre class="code-content"><code>${data.code}</code></pre>
        </div>
        ` : ''}
        <button class="btn-sim-plan" onclick="simulatePlan(this)">⚡ Simulate Plan Execution</button>
        <div class="plan-progress-container">
          <div class="plan-progress-bar"></div>
        </div>
      </div>
    `;
  } else {
    bubble.innerHTML = formatMarkdown(msg.text);
  }

  // Speak aloud option
  const audioRow = document.createElement('div');
  audioRow.className = 'msg-audio-control';
  const speakBtn = document.createElement('button');
  speakBtn.className = 'btn-speak-msg';
  speakBtn.innerHTML = '🔊 Read Aloud';
  speakBtn.onclick = () => {
    synth.playClick();
    const cleanText = msg.isSummary && msg.summaryData ? `${msg.summaryData.title}. Key Objective: ${msg.summaryData.objective}` : msg.text;
    
    if (voiceEngine.isPlaying) {
      voiceEngine.stop();
      if (visualizer) visualizer.setMode('idle');
      updateStatusText("Voice reader stopped.");
    } else {
      updateStatusText("Speaking summary...");
      if (visualizer) visualizer.setMode('speaking');
      voiceEngine.speak(cleanText, 
        () => {}, 
        () => {
          if (visualizer) visualizer.setMode('idle');
          updateStatusText("Speaking completed.");
        }
      );
    }
  };
  audioRow.appendChild(speakBtn);
  bubble.appendChild(audioRow);

  container.appendChild(header);
  container.appendChild(bubble);
  feed.appendChild(container);
  feed.scrollTop = feed.scrollHeight;
}

function handleSendMessage() {
  const input = document.getElementById('composer-text');
  const text = input.value.trim();
  if (!text) return;

  input.value = '';
  hideCommandAutocomplete();
  synth.playClick();

  // 1. Add User message
  db.addMessage(currentSessionId, 'user', 'Commander', text);
  renderMessage({ role: 'user', sender: 'Commander', text: text });

  // 2. Thinking state
  const feed = document.getElementById('chat-feed');
  const loader = document.createElement('div');
  loader.className = 'msg-container bot thinking-msg';
  loader.innerHTML = `<div class="msg-bubble" style="color: var(--text-muted);"><span class="laser-pulse">⚡</span> Analyzing telemetry & query...</div>`;
  feed.appendChild(loader);
  feed.scrollTop = feed.scrollHeight;

  setTimeout(async () => {
    loader.remove();

    // Check if command
    if (text.startsWith('/')) {
      const resp = runCommand(text);
      db.addMessage(currentSessionId, 'bot', MODELS[activeModel]?.name || 'Sovereign Core', resp);
      renderMessage({ role: 'bot', sender: MODELS[activeModel]?.name || 'Sovereign Core', text: resp });
      synth.playSuccess();
      return;
    }

    // Try communicating with server
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, model: activeModel })
      });
      const data = await response.json();
      
      const botResponseText = data.reply || "Done.";
      
      if (data.isSummary) {
        db.addMessage(currentSessionId, 'bot', MODELS[activeModel].name, botResponseText, true, data.summaryData);
        renderMessage({ role: 'bot', sender: MODELS[activeModel].name, text: botResponseText, isSummary: true, summaryData: data.summaryData });
      } else {
        db.addMessage(currentSessionId, 'bot', MODELS[activeModel].name, botResponseText);
        renderMessage({ role: 'bot', sender: MODELS[activeModel].name, text: botResponseText });
      }
      
      synth.playBeep();
    } catch (e) {
      const fallbackReply = generateFallbackBotReply(text);
      db.addMessage(currentSessionId, 'bot', MODELS[activeModel].name, fallbackReply.text, fallbackReply.isSummary, fallbackReply.summaryData);
      renderMessage({ role: 'bot', sender: MODELS[activeModel].name, text: fallbackReply.text, isSummary: fallbackReply.isSummary, summaryData: fallbackReply.summaryData });
      synth.playBeep();
    }
  }, 700);
}

function generateFallbackBotReply(input) {
  const query = input.toLowerCase();
  
  if (query.includes('summary') || query.includes('plan') || query.includes('build')) {
    return {
      text: "Generating structure plan summary.",
      isSummary: true,
      summaryData: {
        title: "Sovereign Framework Architecture Plan",
        scope: "Global System Core Deployment",
        status: "APPROVED",
        objective: "Build an ultra-responsive, beautiful AI interface based on glassmorphic layouts, embedded audio visualizers, and state persistence.",
        code: `// Initializing Sovereign Interface Loop\nconst SovereignHub = {\n  version: "3.0.0-PRO",\n  diagnostics: true,\n  bus: new EventBus(),\n  init() {\n    this.bus.register("core_boot");\n    console.log("Sovereign Matrix running.");\n  }\n};`,
        codeLang: "javascript"
      }
    };
  }

  if (query.includes('status') || query.includes('check')) {
    return {
      text: "### Active Cores Diagnostics\n\n- **Brain module**: ACTIVE (99% capacity)\n- **Web Audio Synthesizer**: READY\n- **Voice Recognition**: STANDBY\n- **File Scan Integrity**: VERIFIED\n\nAll systems are operating nominally. No action required.",
      isSummary: false
    };
  }

  return {
    text: `Understood Commander. I have dispatched your instruction to the **${MODELS[activeModel]?.name || 'Sovereign Core'}** grid.\n\nYou can execute \`/diagnostics\` to check cluster performance, or \`/export\` to download your session transcript.`,
    isSummary: false
  };
}

function renderSidebar() {
  const list = document.getElementById('history-scroll-area');
  if (!list) return;

  const searchInput = document.getElementById('search-history');
  const filter = searchInput ? searchInput.value.toLowerCase().trim() : '';

  list.innerHTML = '';
  const filteredSessions = db.sessions.filter(s => {
    if (!filter) return true;
    return s.title.toLowerCase().includes(filter) || s.messages.some(m => m.text && m.text.toLowerCase().includes(filter));
  });

  filteredSessions.forEach(sess => {
    const item = document.createElement('div');
    item.className = `history-item ${sess.id === currentSessionId ? 'active' : ''}`;
    item.dataset.id = sess.id;
    item.onclick = (e) => {
      if (e.target.closest('.btn-delete-history')) return;
      synth.playClick();
      loadSession(sess.id);
    };

    const details = document.createElement('div');
    details.className = 'history-details';

    const title = document.createElement('div');
    title.className = 'history-title';
    title.textContent = sess.title;

    const meta = document.createElement('div');
    meta.className = 'history-meta';
    meta.innerHTML = `
      <span class="history-tag">${sess.tag}</span>
      <span>${sess.timestamp}</span>
    `;

    details.appendChild(title);
    details.appendChild(meta);

    const delBtn = document.createElement('button');
    delBtn.className = 'btn-delete-history';
    delBtn.innerHTML = '🗑️';
    delBtn.title = 'Delete Session';
    delBtn.onclick = (e) => {
      e.stopPropagation();
      synth.playWarning();
      db.deleteSession(sess.id);
      renderSidebar();
      if (currentSessionId === sess.id) {
        if (db.sessions && db.sessions[0]) {
          loadSession(db.sessions[0].id);
        }
      }
    };

    item.appendChild(details);
    item.appendChild(delBtn);
    list.appendChild(item);
  });
}

function createNewSession() {
  synth.playSuccess();
  const id = db.addSession('System Task Command', activeModel, 'SYS');
  renderSidebar();
  loadSession(id);
}

function clearActiveSession() {
  const sess = db.getSession(currentSessionId);
  if (sess) {
    sess.messages = [];
    db.save();
    loadSession(currentSessionId);
    synth.playWarning();
    addEventLog("Active chat session messages cleared.", "warning");
  }
}

function exportActiveChat(format = 'md') {
  const session = db.getSession(currentSessionId);
  if (!session) return;

  synth.playSuccess();
  let content = "";
  let mimeType = "text/markdown";
  let filename = `sovereign_chat_${Date.now()}.${format}`;

  if (format === 'json') {
    content = JSON.stringify(session, null, 2);
    mimeType = "application/json";
  } else {
    content = `# Sovereign Matrix Chat Transcript\n`;
    content += `**Session Title**: ${session.title}\n`;
    content += `**Model**: ${MODELS[session.model]?.name || session.model}\n`;
    content += `**Date**: ${session.timestamp}\n\n---\n\n`;

    session.messages.forEach(m => {
      content += `### ${m.sender} (${m.role.toUpperCase()})\n`;
      content += `${m.text}\n\n`;
      if (m.isSummary && m.summaryData) {
        content += `> **Summary Plan: ${m.summaryData.title}**\n`;
        content += `> Scope: ${m.summaryData.scope} | Status: ${m.summaryData.status}\n`;
        content += `> Objective: ${m.summaryData.objective}\n\n`;
        if (m.summaryData.code) {
          content += "```" + (m.summaryData.codeLang || '') + "\n" + m.summaryData.code + "\n```\n\n";
        }
      }
      content += `---\n\n`;
    });
  }

  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
  addEventLog(`Exported session transcript to ${filename}`, "success");
}

function changeTheme(themeName) {
  synth.playClick();
  document.body.className = '';
  if (themeName === 'squadron') {
    document.body.classList.add('theme-squadron42');
  } else if (themeName === 'amber') {
    document.body.classList.add('theme-amber');
  }
  
  // Update theme pill states
  document.querySelectorAll('.theme-pill').forEach(pill => {
    pill.classList.remove('active');
    if (pill.dataset.theme === themeName) {
      pill.classList.add('active');
    }
  });
  
  addEventLog(`UI theme configuration shifted to ${themeName.toUpperCase()}`, "success");
}

function toggleSidebar() {
  synth.playClick();
  const bar = document.getElementById('sidebar-panel');
  if (bar) {
    bar.classList.toggle('collapsed');
  }
}

// ── UTILITY FUNCTIONS FOR CODES ──
function copyCodeText(button) {
  const codeBlock = button.closest('.custom-code-block').querySelector('code');
  if (codeBlock) {
    navigator.clipboard.writeText(codeBlock.textContent).then(() => {
      synth.playSuccess();
      button.innerHTML = '✅ Copied!';
      setTimeout(() => {
        button.innerHTML = '<span class="copy-icon">📋</span> Copy';
      }, 2000);
    });
  }
}

// ── COMMAND AUTOCOMPLETE FLOATING BOX ──
function setupCommandAutocomplete() {
  const input = document.getElementById('composer-text');
  const box = document.getElementById('command-autocomplete-box');
  if (!input || !box) return;

  input.addEventListener('input', (e) => {
    synth.playKeyTick();
    const val = input.value;
    if (val.startsWith('/')) {
      const query = val.slice(1).toLowerCase();
      const matches = COMMAND_LIST.filter(c => c.cmd.slice(1).toLowerCase().startsWith(query));
      if (matches.length > 0) {
        box.innerHTML = matches.map((m, idx) => `
          <div class="cmd-item ${idx === 0 ? 'selected' : ''}" onclick="selectCommand('${m.cmd}')">
            <span class="cmd-name">${m.cmd}</span>
            <span class="cmd-desc">${m.desc}</span>
          </div>
        `).join('');
        box.classList.add('visible');
      } else {
        box.classList.remove('visible');
      }
    } else {
      box.classList.remove('visible');
    }
  });
}

function selectCommand(cmd) {
  const input = document.getElementById('composer-text');
  if (input) {
    input.value = cmd;
    input.focus();
  }
  hideCommandAutocomplete();
}

function hideCommandAutocomplete() {
  const box = document.getElementById('command-autocomplete-box');
  if (box) box.classList.remove('visible');
}

// ── FULLSCREEN MATRIX RAIN OVERLAY ──
let matrixRainActive = false;
let matrixCanvas = null;
let matrixAnimId = null;

function toggleMatrixRain() {
  matrixCanvas = document.getElementById('matrix-fullscreen-canvas');
  if (!matrixCanvas) return;

  matrixRainActive = !matrixRainActive;
  matrixCanvas.classList.toggle('active', matrixRainActive);

  if (matrixRainActive) {
    const ctx = matrixCanvas.getContext('2d');
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンSOVEREIGNMATRIX';
    const fontSize = 14;
    const columns = Math.floor(matrixCanvas.width / fontSize);
    const drops = Array.from({ length: columns }, () => Math.floor(Math.random() * -50));

    const drawMatrix = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

      ctx.fillStyle = '#00f3ff';
      ctx.font = `${fontSize}px "Share Tech Mono"`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > matrixCanvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      if (matrixRainActive) {
        matrixAnimId = requestAnimationFrame(drawMatrix);
      }
    };

    drawMatrix();
  } else {
    if (matrixAnimId) cancelAnimationFrame(matrixAnimId);
  }
}

// ── BOOTSTRAPPING ENGINE ──
window.addEventListener('DOMContentLoaded', () => {
  // Setup Model Switchers
  document.querySelectorAll('.model-card').forEach(card => {
    card.onclick = () => {
      const modelId = card.dataset.model;
      if (modelId && MODELS[modelId]) {
        synth.playClick();
        activeModel = modelId;
        document.querySelectorAll('.model-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        
        // Update active indicators
        document.getElementById('active-model-label').textContent = MODELS[modelId].name;
        db.getSession(currentSessionId).model = activeModel;
        db.save();

        addEventLog(`Switched active processing cluster to ${MODELS[modelId].name}`, "info");
      }
    };
  });

  // Setup Theme Switchers
  document.querySelectorAll('.theme-pill').forEach(pill => {
    pill.onclick = () => {
      changeTheme(pill.dataset.theme);
    };
  });

  // Setup Visualizer
  visualizer = new Visualizer('voice-canvas');
  visualizer.start();

  // Setup Visualizer mode buttons
  document.querySelectorAll('.vis-mode-btn').forEach(btn => {
    btn.onclick = () => {
      if (visualizer) visualizer.setStyle(btn.dataset.style);
    };
  });

  // Setup Ambient Sound Toggle
  const soundBtn = document.getElementById('btn-sound-toggle');
  if (soundBtn) {
    soundBtn.onclick = () => {
      const active = synth.toggleAmbientDrone();
      soundBtn.classList.toggle('active', active);
      if (active) {
        soundBtn.innerHTML = '🔊 Synth Drone: ON';
        addEventLog("Ambient Cyber Synth drone started.", "success");
      } else {
        soundBtn.innerHTML = '🔇 Synth Drone: OFF';
        addEventLog("Ambient Cyber Synth drone stopped.", "info");
      }
    };
  }

  // Setup STT
  initSTT();

  // Setup mic button
  const micBtn = document.getElementById('btn-mic');
  if (micBtn) {
    micBtn.onclick = () => toggleListening();
  }

  // Setup send click / enter
  const sendBtn = document.getElementById('btn-send');
  if (sendBtn) sendBtn.onclick = handleSendMessage;

  const textInput = document.getElementById('composer-text');
  if (textInput) {
    textInput.onkeydown = (e) => {
      if (e.key === 'Enter') handleSendMessage();
    };
  }

  // Voice selector
  const voiceSelect = document.getElementById('voice-select');
  if (voiceSelect) {
    voiceSelect.onchange = (e) => {
      voiceEngine.setVoice(e.target.value);
    };
  }

  // Setup command autocomplete
  setupCommandAutocomplete();

  // Initialize view
  renderSidebar();
  loadSession(currentSessionId);
  runStatsLoop();

  // Add system boot logs
  addEventLog("Sovereign matrix nervous system online.", "success");
  addEventLog("Audio synthesis nodes bound to interaction loops.", "info");
});

