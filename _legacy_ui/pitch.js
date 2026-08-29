/* ═══════════════════════════════════════════════════════════════
   SOVEREIGN MATRIX PITCH & BLUEPRINT LOGIC v3.0 — pitch.js
   Handles: Presentation Slides, Dynamic SVG Math Charts, Swarm Sandbox
   ═══════════════════════════════════════════════════════════════ */

// ── AUDIBLE SYS SYNTH ──
class ClickerSynth {
  constructor() {
    this.ctx = null;
  }
  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }
  playTone(freq, duration = 0.1, type = 'sine') {
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    
    gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
    
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }
}
const clicker = new ClickerSynth();

// ── SLIDE DECK LOGIC ──
let currentSlide = 0;
let slides = [];

function initSlides() {
  slides = document.querySelectorAll('.deck-slide');
  updateSlides();

  document.getElementById('btn-prev-slide').onclick = () => {
    clicker.playTone(600, 0.08);
    if (currentSlide > 0) {
      currentSlide--;
      updateSlides();
    }
  };

  document.getElementById('btn-next-slide').onclick = () => {
    clicker.playTone(850, 0.08);
    if (currentSlide < slides.length - 1) {
      currentSlide++;
      updateSlides();
    }
  };
}

function updateSlides() {
  slides.forEach((s, idx) => {
    s.classList.remove('active');
    if (idx === currentSlide) {
      s.classList.add('active');
    }
  });

  const indicator = document.getElementById('slide-number-indicator');
  if (indicator) {
    indicator.textContent = `Slide ${currentSlide + 1} / ${slides.length}`;
  }
}

// ── PITCH TAB TOGGLER ──
function initTabs() {
  document.querySelectorAll('.pitch-tab').forEach(tab => {
    tab.onclick = () => {
      clicker.playTone(700, 0.06);
      
      // Toggle tab header highlight
      document.querySelectorAll('.pitch-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Toggle tab body visibility
      const targetView = tab.dataset.tab;
      document.querySelectorAll('.tab-view').forEach(v => v.classList.remove('active'));
      const activeView = document.getElementById(`view-${targetView}`);
      if (activeView) {
        activeView.classList.add('active');
      }

      // Re-trigger calculator chart draw if switching to calculator
      if (targetView === 'calculator') {
        setTimeout(runCalculator, 50);
      }
    };
  });
}

// ── ROI MATH & SVG GRAPHICS ENGINE ──
function runCalculator() {
  const employees = parseInt(document.getElementById('inp-employees').value) || 0;
  const saasRate = parseInt(document.getElementById('inp-saas').value) || 0;
  const apiBurn = parseInt(document.getElementById('inp-api').value) || 0;
  const devRate = parseInt(document.getElementById('inp-dev-rate').value) || 0;
  const billRate = parseInt(document.getElementById('inp-bill-rate').value) || 0;
  const billHours = parseInt(document.getElementById('inp-bill-hours').value) || 0;
  const marginPercent = parseInt(document.getElementById('inp-margin').value) || 0;

  // Monthly values
  const monthlyCloud = (employees * saasRate) + apiBurn;
  const monthlySovereign = 200; // Mock average hosting / maintain expense
  const monthlyRevenue = billRate * billHours;

  // 12-Month totals
  const totalCloud = monthlyCloud * 12;
  const totalSovereign = 2400 + (monthlySovereign * 12); // Base server fee + maintenance
  const netSavings = Math.max(0, totalCloud - totalSovereign);
  const totalRevenue = monthlyRevenue * 12;
  const totalArbitrage = Math.floor((netSavings + totalRevenue) * (marginPercent / 100));
  const totalFinancialValue = netSavings + totalRevenue + totalArbitrage;

  // Update DOM labels
  document.getElementById('out-cloud-burn').textContent = `$${totalCloud.toLocaleString()}`;
  document.getElementById('out-sov-cost').textContent = `$${totalSovereign.toLocaleString()}`;
  document.getElementById('out-savings').textContent = `$${netSavings.toLocaleString()}`;
  document.getElementById('out-revenue').textContent = `$${totalRevenue.toLocaleString()}`;
  document.getElementById('out-arbitrage').textContent = `$${totalArbitrage.toLocaleString()}`;
  document.getElementById('out-total-value').textContent = `$${totalFinancialValue.toLocaleString()}`;

  // Draw SVG Projections Chart
  const svg = document.getElementById('calc-svg');
  if (!svg) return;
  svg.innerHTML = ''; // Reset SVG contents

  const width = 560;
  const height = 200;
  const padding = 30;

  // Draw Grid lines
  for (let i = 0; i <= 4; i++) {
    const yVal = padding + (height - padding * 2) * (i / 4);
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", padding);
    line.setAttribute("y1", yVal);
    line.setAttribute("x2", width - padding);
    line.setAttribute("y2", yVal);
    line.setAttribute("stroke", "rgba(255, 255, 255, 0.05)");
    line.setAttribute("stroke-width", "1");
    svg.appendChild(line);
  }

  // Draw Month x-labels
  const xCoords = [];
  for (let m = 0; m <= 12; m += 2) {
    const xVal = padding + (width - padding * 2) * (m / 12);
    xCoords.push(xVal);
    
    const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
    txt.setAttribute("x", xVal);
    txt.setAttribute("y", height - 5);
    txt.setAttribute("fill", "var(--text-muted)");
    txt.setAttribute("font-family", "Share Tech Mono");
    txt.setAttribute("font-size", "10");
    txt.setAttribute("text-anchor", "middle");
    txt.textContent = m === 0 ? "Boot" : `M${m}`;
    svg.appendChild(txt);
  }

  // Projection math lines points
  const maxCost = Math.max(totalCloud, totalSovereign, totalFinancialValue, 10000);
  const getPoints = (lineType) => {
    const pts = [];
    for (let m = 0; m <= 12; m++) {
      const x = padding + (width - padding * 2) * (m / 12);
      
      let cost = 0;
      if (lineType === 'sov') {
        // Infrastructure overhead setup cost
        cost = 2400 + (monthlySovereign * m);
      } else if (lineType === 'cloud') {
        // Continuous compounding subscription burn
        cost = monthlyCloud * m;
      } else if (lineType === 'val') {
        // Compounding value generated = savings + billable income + arbitrage
        const mSavings = Math.max(0, (monthlyCloud * m) - (2400 + monthlySovereign * m));
        const mRev = monthlyRevenue * m;
        const mArb = (mSavings + mRev) * (marginPercent / 100);
        cost = mSavings + mRev + mArb;
      }
      
      const y = height - padding - (cost / maxCost) * (height - padding * 2);
      pts.push({ x, y });
    }
    return pts;
  };

  const drawPath = (points, color, isDashed = false) => {
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      d += ` L ${points[i].x} ${points[i].y}`;
    }
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", d);
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", color);
    path.setAttribute("stroke-width", "3");
    if (isDashed) {
      path.setAttribute("stroke-dasharray", "4,4");
    }
    svg.appendChild(path);

    // Draw point nodes at the end
    const last = points[points.length - 1];
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", last.x);
    circle.setAttribute("cy", last.y);
    circle.setAttribute("r", "5");
    circle.setAttribute("fill", color);
    svg.appendChild(circle);
  };

  const pSaaS = getPoints('cloud');
  const pSov = getPoints('sov');
  const pVal = getPoints('val');

  drawPath(pSaaS, "var(--accent-pink)", true);
  drawPath(pSov, "rgba(255,255,255,0.25)", false);
  drawPath(pVal, "var(--accent-cyan)", false);

  // Label graph lines
  const addLabel = (x, y, text, color) => {
    const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
    txt.setAttribute("x", x);
    txt.setAttribute("y", y);
    txt.setAttribute("fill", color);
    txt.setAttribute("font-family", "Orbitron");
    txt.setAttribute("font-size", "9");
    txt.setAttribute("font-weight", "bold");
    txt.textContent = text;
    svg.appendChild(txt);
  };

  addLabel(40, 20, "TOTAL SOVEREIGN FINANCIAL VALUE", "var(--accent-cyan)");
  addLabel(40, 40, "CLOUD SUBSCRIPTION BURN", "var(--accent-pink)");
  addLabel(40, 60, "SOVEREIGN SYSTEM OVERHEADS", "rgba(255,255,255,0.4)");
}

// ── SWARM SANDBOX NODE SELECTOR ──
const AGENT_INFO = {
  "developer": {
    name: "Developer Cluster",
    priority: "High Thread Group",
    desc: "Autonomous software development node. Handles environment bootstrapping, packages checkups, runs tests, and automates builds."
  },
  "legal": {
    name: "Legal Architect Node",
    priority: "Medium Thread Group",
    desc: "Legal engine parsing compliance metrics. Compiles jurisdiction documents, contract audits, and outputs non-disclosure templates."
  },
  "arbitrage": {
    name: "Arbitrage Swarm",
    priority: "High Thread Group",
    desc: "Financial agent querying exchange metrics. Monitors pricing anomalies, Stripe transaction intents, and audits invoice states."
  },
  "validator": {
    name: "Validator Core",
    priority: "High Thread Group",
    desc: "Nervous system auditor validating server tokens, active authentication sessions, database integrity blocks, and threat matrices."
  },
  "autofix": {
    name: "Auto-Fix Sandbox",
    priority: "Critical Thread Group",
    desc: "Self-healing debugger scanning error stack traces. Automatically produces Unified Diffs and proposes code patches safely."
  },
  "marketer": {
    name: "Marketer Swarm",
    priority: "Low Thread Group",
    desc: "Content generation worker drafting copies, emails, campaign targets, and mapping client engagement workflows."
  },
  "support": {
    name: "Support Client Portal",
    priority: "Medium Thread Group",
    desc: "Virtual help-desk parsing customer inquiries. Employs vector semantic indexes to fetch correct FAQ resources automatically."
  },
  "watchdog": {
    name: "Watchdog Engine",
    priority: "Critical Thread Group",
    desc: "System supervisor monitoring resource constraints. Kills locked loops and restarts idle network worker processes."
  }
};

function selectSimAgent(agentId) {
  clicker.playTone(800, 0.08);
  
  // Update node active states
  document.querySelectorAll('.agent-node').forEach(node => {
    node.classList.remove('active-sim');
    if (node.dataset.agent === agentId) {
      node.classList.add('active-sim');
    }
  });

  // Load specs
  const data = AGENT_INFO[agentId];
  if (data) {
    const card = document.getElementById('sim-agent-details');
    card.innerHTML = `
      <div class="blueprint-node-title">${data.name} [${data.priority}]</div>
      <p style="font-size: 13px; line-height: 1.5; color: var(--text-muted);">${data.desc}</p>
    `;
  }
}

// ── SIMULATED TERMINAL OUTPUT LOGGER ──
function addSimLog(text, type = "info") {
  const scroll = document.getElementById('sim-log-scroll-area');
  if (!scroll) return;

  const item = document.createElement('div');
  item.className = `log-item ${type}`;
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  item.innerHTML = `[${timestamp}] ${text}`;
  scroll.appendChild(item);
  scroll.scrollTop = scroll.scrollHeight;
}

function triggerSimAction(action) {
  if (action === 'boot') {
    clicker.playTone(440, 0.1, 'triangle');
    addSimLog("Spinning up 103 micro-agent thread pools...", "info");
    setTimeout(() => {
      addSimLog("Sovereign core linked to event bus nodes.", "success");
      addSimLog("Memory SQLite matrices initialized.", "success");
    }, 400);
  } else if (action === 'compile') {
    clicker.playTone(554.37, 0.1, 'triangle');
    addSimLog("Auditing repository codebase: c:\\Users\\wjhmo\\Downloads\\ipo-brain (2)", "info");
    setTimeout(() => {
      addSimLog("Validating index.html structures... [OK]", "success");
      addSimLog("Checking style.css syntax... [OK]", "success");
      addSimLog("Testing app.js sound synthesizer connections... [OK]", "success");
      addSimLog("Compilation smoke check passed cleanly.", "success");
    }, 500);
  } else if (action === 'arbitrage') {
    clicker.playTone(659.25, 0.1, 'triangle');
    addSimLog("Arbitrage Swarm querying coin pricing rates...", "warning");
    setTimeout(() => {
      addSimLog("Checked Uniswap v3 liquid pools.", "info");
      addSimLog("Checked ckBTC/ICP decentralized market margins.", "info");
      addSimLog("Result: No execution gap found. System standby.", "info");
    }, 600);
  } else if (action === 'lockdown') {
    clicker.playTone(330, 0.25, 'sawtooth');
    addSimLog("Triggering global threat scan checks...", "warning");
    setTimeout(() => {
      addSimLog("Evaluating active login sessions... [SAFE]", "success");
      addSimLog("Allowlist validator rules checked... [PASS]", "success");
      addSimLog("Threat assessment: 0 active conflicts found.", "success");
    }, 700);
  }
}

// ── INTERACTIVE ARCHITECTURE NODES SPEC SHEET ──
const BP_INFO = {
  "core": {
    title: "Sovereign Core Gateway (Orchestrator)",
    desc: `
      <div class="blueprint-grid-details">
        <div class="bp-detail-col">
          <h5>Class Registry Reference</h5>
          <p><code>core/gateway.py</code> &bull; IPC TCP Port: 8794</p>
          <h5 style="margin-top: 8px;">Orchestration Framework</h5>
          <p>Maintains high-priority system daemons. Evaluates parameter filters, checks access tokens, audits cryptographically signed payloads, and allocates CPU thread loops safely.</p>
        </div>
        <div class="bp-detail-col">
          <h5>Core API Entry Schema</h5>
          <pre>{\n  "session_token": "0xsecp256k1_token",\n  "intent": "system_diagnostic",\n  "parameters": {\n    "scan_depth": 2,\n    "verify_builds": true\n  },\n  "timestamp": 1786312540\n}</pre>
        </div>
      </div>
    `
  },
  "eventbus": {
    title: "Asynchronous Event Bus Middleware",
    desc: `
      <div class="blueprint-grid-details">
        <div class="bp-detail-col">
          <h5>Class Registry Reference</h5>
          <p><code>events/bus.py</code> &bull; Topic Broker Queue</p>
          <h5 style="margin-top: 8px;">Event Pub / Sub Broker</h5>
          <p>Handles message routing between asynchronous workers. Includes rate throttling, automatic thread locks collection, and schedules heartbeat telemetry updates.</p>
        </div>
        <div class="bp-detail-col">
          <h5>Event Message Schema</h5>
          <pre>{\n  "event_id": "9b1deb4d-3b7d-4bad",\n  "topic": "security.threat_alert",\n  "priority": "CRITICAL",\n  "timestamp": 1786312541,\n  "payload": {\n    "source_ip": "192.168.1.104",\n    "lockdown_triggered": false\n  }\n}</pre>
        </div>
      </div>
    `
  },
  "swarms": {
    title: "103-Agent Swarm Coordination Cluster",
    desc: `
      <div class="blueprint-grid-details">
        <div class="bp-detail-col">
          <h5>Class Registry Reference</h5>
          <p><code>core/agents.py</code> &bull; Honeycomb Matrix allocation</p>
          <h5 style="margin-top: 8px;">Task Allocation Grid</h5>
          <p>Distributes tasks dynamically to micro-agents. Coordinates marketing content engines, Stripe transaction lookups, legal contract checkers, and arbitrage valuation scrapers.</p>
        </div>
        <div class="bp-detail-col">
          <h5>Agent Node Telemetry State</h5>
          <pre>{\n  "agent_id": "arbitrage_swarm_03",\n  "category": "FINANCIAL",\n  "active_thread": 4352,\n  "status": "POLLING_PRICES",\n  "telemetry": {\n    "cpu_pct": 3.4,\n    "ram_mb": 24.8\n  }\n}</pre>
        </div>
      </div>
    `
  },
  "autofix": {
    title: "Self-Healing Auto-Fix Debug Sandbox",
    desc: `
      <div class="blueprint-grid-details">
        <div class="bp-detail-col">
          <h5>Class Registry Reference</h5>
          <p><code>healing/auto_repair.py</code> &bull; Sandbox compiler</p>
          <h5 style="margin-top: 8px;">Syntax Diagnostics & Patching</h5>
          <p>Listens for traceback errors. Captures exception scopes, generates Unified Diffs via LLM endpoints, and runs AST checks before applying patches to disk repository.</p>
        </div>
        <div class="bp-detail-col">
          <h5>Safe Patch Diff payload</h5>
          <pre>{\n  "file_path": "style.css",\n  "target_lines": [45, 48],\n  "diff": "- border: none;\\n+ border: 1px solid var(--accent-cyan);",\n  "ast_verify_check": "SUCCESS"\n}</pre>
        </div>
      </div>
    `
  },
  "database": {
    title: "SQLite Neural Memory Storage Vault",
    desc: `
      <div class="blueprint-grid-details">
        <div class="bp-detail-col">
          <h5>Class Registry Reference</h5>
          <p><code>database/models.py</code> &bull; SQLite Connection Pool</p>
          <h5 style="margin-top: 8px;">Persistence Engine</h5>
          <p>15 relation tables tracking sessions, event logs, allowlists, and credentials. Integrates automated daily AES-256 backup encryption cycles to local storage.</p>
        </div>
        <div class="bp-detail-col">
          <h5>Session Sync Record Schema</h5>
          <pre>{\n  "session_id": "sess_1786312400",\n  "messages_count": 14,\n  "active_model": "gemini",\n  "db_integrity_hash": "a8f3b2cd78e0",\n  "last_backup_time": 1786312410\n}</pre>
        </div>
      </div>
    `
  }
};

function selectBlueprintNode(nodeId) {
  clicker.playTone(900, 0.08);
  const data = BP_INFO[nodeId];
  if (data) {
    document.getElementById('bp-title').textContent = data.title;
    document.getElementById('bp-desc').innerHTML = data.desc;
  }
}

// ── LIVE CANVAS PARTICLE SYSTEM ──
function initLiveBlueprintCanvas() {
  const canvas = document.getElementById('live-blueprint-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();
  
  const particles = [];
  const particleCount = 150;
  
  for(let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 1.5,
      speedY: Math.random() * 2 + 0.5,
      color: Math.random() > 0.5 ? '#00f3ff' : '#10b981',
      alpha: Math.random()
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 0.5;
    
    for(let i = 0; i < particles.length; i++) {
      let p = particles[i];
      p.x += p.speedX;
      p.y -= p.speedY;
      
      if(p.y < 0) {
        p.y = canvas.height;
        p.x = Math.random() * canvas.width;
      }
      if(p.x < 0) p.x = canvas.width;
      if(p.x > canvas.width) p.x = 0;
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI*2);
      ctx.fillStyle = p.color === '#00f3ff' ? `rgba(0,243,255,${p.alpha})` : `rgba(16,185,129,${p.alpha})`;
      ctx.shadowBlur = 15;
      ctx.shadowColor = p.color;
      ctx.fill();
      
      // Cyber-mesh networking
      for(let j = i + 1; j < particles.length; j++) {
        let p2 = particles[j];
        let dx = p.x - p2.x;
        let dy = p.y - p2.y;
        let dist = Math.sqrt(dx*dx + dy*dy);
        if(dist < 70) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(0, 243, 255, ${0.4 - dist/175})`;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
}

// ── THEME MANAGER ──
function initThemes() {
  document.querySelectorAll('.theme-pill').forEach(pill => {
    pill.onclick = () => {
      const theme = pill.dataset.theme;
      clicker.playTone(700, 0.08);
      
      document.querySelectorAll('.theme-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      document.body.className = '';
      if (theme === 'squadron') {
        document.body.classList.add('theme-squadron42');
      } else if (theme === 'amber') {
        document.body.classList.add('theme-amber');
      }
    };
  });
}

// ── BOOTSTRAP INITIALIZATION ──
window.addEventListener('DOMContentLoaded', () => {
  initSlides();
  initTabs();
  initThemes();
  initLiveBlueprintCanvas();
  
  selectSimAgent('watchdog');
  selectBlueprintNode('core');
  
  addSimLog("Sovereign Pitch Sandbox engine online.", "success");
  addSimLog("Web Audio click chimes loaded successfully.", "info");
});
