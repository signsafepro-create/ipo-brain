'use client';
import { useState, useRef, useEffect } from 'react';
import { BrainCircuit, Terminal, Cpu, Database, Activity, Send } from 'lucide-react';

export default function IPOBrain() {
  const [command, setCommand] = useState('');
  const [logs, setLogs] = useState([
    { time: '05:40:01', source: 'SYSTEM', msg: 'Omni-Sovereign ASI initialized.' },
    { time: '05:40:15', source: 'MEMORY', msg: 'InfiniteMemoryMatrix loaded (41 cores).' },
    { time: '05:42:00', source: 'AGENT', msg: 'Awaiting prime directive...' }
  ]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    setLogs(prev => [...prev, { time, source: 'USER', msg: command }]);
    setCommand('');
    
    // Simulate Agent Thinking
    setTimeout(() => {
      setLogs(prev => [...prev, { time: new Date().toLocaleTimeString('en-US', { hour12: false }), source: 'AGENT', msg: 'Processing command trajectory... routing to FastAPI.' }]);
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="pb-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BrainCircuit className="w-8 h-8 text-[#aa00ff] drop-shadow-[0_0_10px_rgba(170,0,255,0.8)]" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">IPO Brain <span className="text-[#aa00ff] text-lg">v4.0</span></h1>
            <p className="text-gray-400 mt-1">Autonomous God-Mode Agent Console</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-2"><Cpu className="w-4 h-4 text-[#00ffcc]"/> CPU: 12%</div>
          <div className="flex items-center gap-2"><Database className="w-4 h-4 text-blue-400"/> DB: CONNECTED</div>
          <div className="flex items-center gap-2"><Activity className="w-4 h-4 text-green-400"/> ASI: IDLE</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
        {/* Terminal Window */}
        <div className="lg:col-span-3 glass-panel rounded-2xl border border-white/10 flex flex-col overflow-hidden relative shadow-[0_0_30px_rgba(170,0,255,0.05)]">
          <div className="bg-black/80 p-3 border-b border-white/10 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-gray-400" />
            <span className="text-xs font-mono text-gray-400">root@omni-sovereign:~#</span>
          </div>
          
          <div className="flex-1 p-6 font-mono text-sm overflow-y-auto space-y-3 bg-[#030303]">
            {logs.map((log, i) => (
              <div key={i} className="flex gap-4">
                <span className="text-gray-600">[{log.time}]</span>
                <span className={`w-16 font-bold ${log.source === 'USER' ? 'text-white' : log.source === 'AGENT' ? 'text-[#aa00ff]' : log.source === 'MEMORY' ? 'text-blue-400' : 'text-[#00ffcc]'}`}>
                  {log.source}
                </span>
                <span className={log.source === 'USER' ? 'text-gray-300' : 'text-gray-400'}>{log.msg}</span>
              </div>
            ))}
            <div className="animate-pulse flex gap-4">
              <span className="text-gray-600">[{new Date().toLocaleTimeString('en-US', { hour12: false })}]</span>
              <span className="text-[#00ffcc] w-16">_</span>
            </div>
          </div>

          <form onSubmit={handleCommand} className="p-4 bg-black/50 border-t border-white/10">
            <div className="relative">
              <input 
                type="text" 
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                placeholder="Command the ASI (e.g., 'Execute live trade on AAPL' or 'Deploy new React module')..."
                className="w-full bg-black border border-white/20 rounded-xl pl-4 pr-12 py-4 text-white font-mono focus:outline-none focus:border-[#aa00ff] transition-colors shadow-inner"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-[#aa00ff] text-white rounded-lg hover:bg-[#8800cc] transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Side Panel */}
        <div className="space-y-6 flex flex-col">
          <div className="glass-panel rounded-2xl p-6 border border-white/10 flex-1">
            <h3 className="font-bold text-white uppercase tracking-widest text-xs mb-4">Neural Pillars</h3>
            <div className="space-y-4">
              {['Memory Matrix', 'Swarm Actuation', 'Economy Engine', 'Web 4.0 Interface'].map((pillar, i) => (
                <div key={i} className="p-3 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between">
                  <span className="text-sm text-gray-300 font-medium">{pillar}</span>
                  <div className="w-2 h-2 rounded-full bg-[#00ffcc] shadow-[0_0_8px_rgba(0,255,204,0.8)] animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-panel rounded-2xl p-6 border border-[#aa00ff]/30 bg-[#aa00ff]/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-[#aa00ff]/20 to-transparent translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500"></div>
            <h3 className="font-bold text-[#aa00ff] uppercase tracking-widest text-xs mb-2 relative z-10">Jarvis Night-Watch</h3>
            <p className="text-xs text-gray-400 relative z-10 mb-4">Autonomous execution while offline.</p>
            <button className="w-full py-2 bg-[#aa00ff] text-white text-xs font-bold uppercase tracking-widest rounded relative z-10 hover:bg-[#8800cc] transition-colors">
              Engage Protocol
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
