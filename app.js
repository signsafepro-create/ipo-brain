/* ═══════════════════════════════════════════════════════════════
   SOVEREIGN MATRIX INTERACTIVE ENGINE v3.0 — app.js
   Handles: Speech Synthesis, Audio FX, Visualizers, & Chat Database
   ═══════════════════════════════════════════════════════════════ */

// ── AUDIO FX SYNTHESIZER (WEB AUDIO API) ──
class CyberSynth {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  playClick() {
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1500, this.ctx.currentTime + 0.08);
    
    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  playBeep() {
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, this.ctx.currentTime);
    
    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  }

  playSuccess() {
    this.init();
    const time = this.ctx.currentTime;
    
    const playNote = (freq, start, duration) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);
      
      gain.gain.setValueAtTime(0.04, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
      
      osc.start(start);
      osc.stop(start + duration);
    };
    
    playNote(523.25, time, 0.1); // C5
    playNote(659.25, time + 0.08, 0.1); // E5
    playNote(783.99, time + 0.16, 0.2); // G5
    playNote(1046.50, time + 0.24, 0.3); // C6
  }

  playWarning() {
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(180, this.ctx.currentTime + 0.3);
    
    gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.3);
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
    } catch (e) {
      this.sessions = [];
    }
    if (this.sessions.length === 0) {
      this.createDefaultSession();
    }
  }

  save() {
    localStorage.setItem(this.key, JSON.stringify(this.sessions));
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
    this.voices = this.synth.getVoices();
    const select = document.getElementById('voice-select');
    if (select) {
      select.innerHTML = '';
      this.voices.forEach((v, idx) => {
        const opt = document.createElement('option');
        opt.value = idx;
        opt.textContent = `${v.name} (${v.lang})`;
        if (v.name.includes('Google') || v.name.includes('Natural') || v.default) {
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

// ── CANVAS WAVEFORM VISUALIZER ──
class Visualizer {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.animationId = null;
    this.mode = 'idle'; // idle, speaking, listening
    this.points = [];
    this.initPoints();
  }

  initPoints() {
    this.points = [];
    for (let i = 0; i < 40; i++) {
      this.points.push({
        x: (this.canvas.width / 40) * i + 5,
        targetHeight: 2,
        currentHeight: 2,
        speed: 0.1 + Math.random() * 0.15
      });
    }
  }

  setMode(mode) {
    this.mode = mode;
  }

  start() {
    const draw = () => {
      if (!this.canvas || !this.ctx) return;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      const color = MODELS[activeModel].color;
      this.ctx.fillStyle = color;
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = color;

      for (let i = 0; i < this.points.length; i++) {
        const pt = this.points[i];
        
        // Calculate dynamic wave amplitude
        if (this.mode === 'speaking') {
          pt.targetHeight = Math.sin(Date.now() * 0.005 + i * 0.4) * 25 + 30;
        } else if (this.mode === 'listening') {
          pt.targetHeight = Math.random() * 45 + 5;
        } else {
          pt.targetHeight = Math.sin(Date.now() * 0.001 + i * 0.2) * 4 + 6;
        }

        // Interpolate heights
        pt.currentHeight += (pt.targetHeight - pt.currentHeight) * pt.speed;

        const w = 4;
        const h = pt.currentHeight;
        const x = (this.canvas.width / this.points.length) * i;
        const y = (this.canvas.height - h) / 2;

        this.ctx.beginPath();
        this.ctx.roundRect(x, y, w, h, 2);
        this.ctx.fill();
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

// ── SYSTEM COMMAND RUNNER ──
const MOCK_COMMANDS = {
  "help": {
    text: "Sovereign CLI Triggers:\n- `/scan`: Searches local repository structures.\n- `/compile`: Triggers safe code evaluation checks.\n- `/deploy`: Displays platform release checklist.\n- `/status`: Returns active system heartbeat stats.\n- `/theme <nebula|squadron|amber>`: Toggles color configurations."
  },
  "scan": {
    text: "Scanning project directory: c:\\Users\\wjhmo\\Downloads\\ipo-brain (2)\nFiles detected: 5\n- style.css (Modified Scifi HUD Style Sheet)\n- app.js (Interaction Controller Code)\n- index.html (Sovereign Portal Page)\n- server.py (Multi-Threaded Server Engine)\n- README.md (Setup Details)\n\nScan integrity audit passed successfully. No vulnerabilities identified."
  },
  "compile": {
    text: "Running safe syntax diagnostics...\nChecking index.html syntax... [OK]\nValidating CSS configurations... [OK]\nRunning JS integrity loops... [OK]\nCompilation successful. Codebase ready for release."
  },
  "deploy": {
    text: "Platform Release Checklist:\n1. Event Bus activation check [DONE]\n2. Custom visualizer engine rendering loops [DONE]\n3. API Route compilation [DONE]\n4. TTS/STT sound synthesis testing [DONE]\n\nRelease candidates are green. Deploy check finished."
  },
  "status": {
    text: "Heartbeat status overview:\n- Sovereign Core: Online\n- Auto-Fix Engine: Available\n- Visualizer: Active\n- Audio Synth: Loaded\n- Stripe Sync Token: Active"
  }
};

function runCommand(commandText) {
  const cleanCmd = commandText.replace('/', '').trim().toLowerCase();
  
  if (cleanCmd.startsWith('theme ')) {
    const parts = cleanCmd.split(' ');
    const tName = parts[1];
    if (tName === 'nebula' || tName === 'squadron' || tName === 'amber') {
      changeTheme(tName);
      return `Theme successfully swapped to: ${tName.toUpperCase()}`;
    }
    return "Incorrect theme. Try: /theme nebula, /theme squadron, or /theme amber";
  }

  if (MOCK_COMMANDS[cleanCmd]) {
    return MOCK_COMMANDS[cleanCmd].text;
  }

  return `System error: Unknown trigger command "${commandText}". Type /help to see all commands.`;
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
  document.getElementById('active-model-label').textContent = MODELS[activeModel].name;

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
          <span class="summary-tag">Status: ${data.status}</span>
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
      </div>
    `;
  } else {
    bubble.textContent = msg.text;
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
  synth.playClick();

  // 1. Add User message
  db.addMessage(currentSessionId, 'user', 'Commander', text);
  renderMessage({ role: 'user', sender: 'Commander', text: text });

  // 2. Mock thinking state
  const feed = document.getElementById('chat-feed');
  const loader = document.createElement('div');
  loader.className = 'msg-container bot thinking-msg';
  loader.innerHTML = `<div class="msg-bubble" style="color: var(--text-muted);">Thinking...</div>`;
  feed.appendChild(loader);
  feed.scrollTop = feed.scrollHeight;

  setTimeout(async () => {
    // Remove thinking message
    loader.remove();

    // Check if command
    if (text.startsWith('/')) {
      const resp = runCommand(text);
      db.addMessage(currentSessionId, 'bot', MODELS[activeModel].name, resp);
      renderMessage({ role: 'bot', sender: MODELS[activeModel].name, text: resp });
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
      // Offline fallback processing
      const fallbackReply = generateFallbackBotReply(text);
      db.addMessage(currentSessionId, 'bot', MODELS[activeModel].name, fallbackReply.text, fallbackReply.isSummary, fallbackReply.summaryData);
      renderMessage({ role: 'bot', sender: MODELS[activeModel].name, text: fallbackReply.text, isSummary: fallbackReply.isSummary, summaryData: fallbackReply.summaryData });
      synth.playBeep();
    }
  }, 1000);
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
      text: "Diagnosing active cores:\n\n- Brain module: ACTIVE (99% capacity)\n- Web Audio Synthesizer: READY\n- Voice Recognition: STANDBY\n- File Scan Integrity: VERIFIED\n\nAll systems are operating nominally. No action required.",
      isSummary: false
    };
  }

  return {
    text: `Understood commander. I have forwarded your message to the Sovereign Overmind model grid. Let me know if you would like to run any file checks or evaluate compilation logs.`,
    isSummary: false
  };
}

function renderSidebar() {
  const list = document.getElementById('history-scroll-area');
  if (!list) return;

  list.innerHTML = '';
  db.sessions.forEach(sess => {
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
    delBtn.onclick = () => {
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
      synth.playClick();
      button.innerHTML = '✅ Copied!';
      setTimeout(() => {
        button.innerHTML = '<span class="copy-icon">📋</span> Copy';
      }, 2000);
    });
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

  // Initialize view
  renderSidebar();
  loadSession(currentSessionId);
  runStatsLoop();

  // Add system boot logs
  addEventLog("Sovereign matrix nervous system online.", "success");
  addEventLog("Audio synthesis nodes bound to interaction loops.", "info");
});
