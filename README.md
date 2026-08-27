# Sovereign Matrix AI Command Hub (LILJR 3.0)

An ultra-premium, interactive scifi HUD command portal with built-in voice feedback, canvas wave frequency visualizers, responsive left-aligned plan summaries, multi-model selection, and real-time metric trackers.

---

## 🛠️ Architecture Overview

- **`index.html`**: Holographic scifi dashboard layout containing sidebar chat history, active model spec cards, a prompt composer console, a canvas visualizer, a speech options drop-down, system statistics sliders, and event bus logs.
- **`style.css`**: Styling sheets configuring fonts (`Orbitron`, `Share Tech Mono`), glassmorphic containers (backdrop-blurs, glowing neon borders, reflection sweeps), and three separate high-end themes (Nebula Core, Squadron 42, Amber).
- **`app.js`**: Dynamic interaction controller managing audio synthesis beep effects (Web Audio API), simulated speech synthesis reading (TTS) + voice capturing (STT), canvas audio frequency rendering loops, localStorage conversation records, and random stats fluctuates.
- **`server.py`**: Lightweight, multi-threaded python server hosting all codebase pages and providing JSON chat endpoints (`/api/chat`).

---

## 🚀 Getting Started

### Prerequisites
- Python 3 installed.
- A modern browser with SpeechSynthesis capabilities (Google Chrome, Microsoft Edge, or Safari).

### Quick Start Instruction
1. Execute the following command from the workspace terminal directory:
   ```bash
   python server.py
   ```
2. Once booted, navigate your browser to:
   ```
   http://localhost:8794
   ```

---

## 📟 Sovereign CLI Console Triggers

You can execute diagnostic system operations directly from the composer console bar:
- `/help`: Returns a catalog of available system commands.
- `/status`: Checks core module diagnostics and heartbeat details.
- `/scan`: Audits folders and files inside the current workspace repository.
- `/compile`: Performs safe syntax check compilations on app assets.
- `/deploy`: Displays the release checklist and confirmation statuses.
- `/theme <nebula|squadron|amber>`: Switches the current color configuration theme.

---

## 🌟 Interactive Highlights

- **Acoustic feedback**: Trigger clicks, success beeps, and detuned warnings procedurally generated on keypress, clicks, and page loads.
- **Live Visualizer**: Real-time canvas wave lines that react to voice readings and microphone recordings.
- **Plan Summaries**: Generate left-aligned cards with neutral glass configurations, badges, scope indicators, objectives, and copyable unified diffs. To view a summary card, type `summary` or `plan` in the composer input box.
