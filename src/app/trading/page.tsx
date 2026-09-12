'use client';
import { useState, useEffect } from 'react';
import { TrendingUp, Activity, Zap, Play, Pause, BarChart2, Shield, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface TradeOrder {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  size: string;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
  strategy: string;
  time: string;
}

const ASSET_PAIRS = [
  { symbol: 'ANTH/USD', name: 'Anthropic Pre-IPO Token', price: 924.50, change: 4.82, high: 940.00, low: 885.20, volume: '$42.8M' },
  { symbol: 'OPEN/USD', name: 'OpenAI Pre-IPO Token', price: 284.10, change: -1.24, high: 295.00, low: 278.40, volume: '$78.1M' },
  { symbol: 'DATA/USD', name: 'Databricks Pre-IPO Token', price: 79.60, change: 2.15, high: 82.00, low: 76.50, volume: '$18.4M' },
  { symbol: 'STRIP/USD', name: 'Stripe Pre-IPO Token', price: 68.25, change: 1.40, high: 70.10, low: 66.80, volume: '$25.6M' },
  { symbol: 'BTC/USD', name: 'Bitcoin Spot', price: 89450.00, change: 3.42, high: 91200.00, low: 86400.00, volume: '$1.4B' }
];

const INITIAL_ORDERS: TradeOrder[] = [
  { id: 'TRD-8821', symbol: 'ANTH/USD', type: 'BUY', size: '25.0', entryPrice: 882.00, currentPrice: 924.50, pnl: 1062.50, pnlPercent: 4.82, strategy: 'Pre-IPO Momentum', time: '14:22:04' },
  { id: 'TRD-8820', symbol: 'DATA/USD', type: 'BUY', size: '100.0', entryPrice: 77.90, currentPrice: 79.60, pnl: 170.00, pnlPercent: 2.18, strategy: 'Grid Scalper v4', time: '13:58:12' },
  { id: 'TRD-8819', symbol: 'OPEN/USD', type: 'SELL', size: '40.0', entryPrice: 289.50, currentPrice: 284.10, pnl: 216.00, pnlPercent: 1.87, strategy: 'Mean Reversion', time: '12:30:45' },
  { id: 'TRD-8818', symbol: 'BTC/USD', type: 'BUY', size: '0.5', entryPrice: 87100.00, currentPrice: 89450.00, pnl: 1175.00, pnlPercent: 2.70, strategy: 'Breakout Hunter', time: '11:15:30' }
];

export default function TradingTerminal() {
  const [selectedAsset, setSelectedAsset] = useState(ASSET_PAIRS[0]);
  const [strategy, setStrategy] = useState('Pre-IPO Momentum & Signal Engine');
  const [isBotRunning, setIsBotRunning] = useState(true);
  const [timeframe, setTimeframe] = useState('24H');
  const [orders, setOrders] = useState<TradeOrder[]>(INITIAL_ORDERS);
  const [totalEquity, setTotalEquity] = useState(148290.45);
  const [pnlDay, setPnlDay] = useState(2623.50);

  // Simulated live ticker fluctuation
  useEffect(() => {
    if (!isBotRunning) return;
    const interval = setInterval(() => {
      const delta = (Math.random() - 0.48) * (selectedAsset.price * 0.003);
      setSelectedAsset(prev => {
        const nextPrice = Number((prev.price + delta).toFixed(2));
        return { ...prev, price: nextPrice };
      });
      setPnlDay(prev => Number((prev + (Math.random() - 0.45) * 8).toFixed(2)));
      setTotalEquity(prev => Number((prev + (Math.random() - 0.45) * 8).toFixed(2)));
    }, 2000);
    return () => clearInterval(interval);
  }, [isBotRunning, selectedAsset.symbol, selectedAsset.price]);

  const handleExecuteNewTrade = () => {
    const newOrder: TradeOrder = {
      id: `TRD-${Math.floor(1000 + Math.random() * 9000)}`,
      symbol: selectedAsset.symbol,
      type: Math.random() > 0.3 ? 'BUY' : 'SELL',
      size: (Math.random() * 15 + 5).toFixed(1),
      entryPrice: selectedAsset.price,
      currentPrice: selectedAsset.price,
      pnl: 0,
      pnlPercent: 0,
      strategy: strategy.split('&')[0].trim(),
      time: new Date().toLocaleTimeString()
    };
    setOrders(prev => [newOrder, ...prev.slice(0, 7)]);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-4 animate-in fade-in duration-500">
      {/* Top Header */}
      <div className="pb-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-[#aa00ff]/10 border border-[#aa00ff]/30">
              <TrendingUp className="w-8 h-8 text-[#aa00ff] drop-shadow-[0_0_10px_rgba(170,0,255,0.8)]" />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white">
              Sovereign <span className="text-[#00ffcc]">Quant</span> Trading Terminal
            </h1>
          </div>
          <p className="text-gray-400 text-sm">
            High-frequency algorithmic execution, pre-IPO sentiment arbitrage, and automated grid trading engine.
          </p>
        </div>

        {/* Bot Status & Control */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsBotRunning(!isBotRunning)}
            className={`px-4 py-2.5 rounded-xl border text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
              isBotRunning
                ? 'bg-green-500/10 text-green-400 border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.2)]'
                : 'bg-red-500/10 text-red-400 border-red-500/30'
            }`}
          >
            {isBotRunning ? (
              <>
                <span className="w-2 h-2 rounded-full bg-green-400 animate-ping"></span>
                <Play className="w-3.5 h-3.5" /> Bot Active
              </>
            ) : (
              <>
                <Pause className="w-3.5 h-3.5" /> Bot Paused
              </>
            )}
          </button>

          <button
            onClick={handleExecuteNewTrade}
            className="px-4 py-2.5 bg-[#00ffcc] text-black font-mono font-black text-xs uppercase tracking-wider rounded-xl hover:bg-[#00ccaa] transition-all shadow-[0_0_15px_rgba(0,255,204,0.3)] flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5" /> Trigger Order
          </button>
        </div>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-panel rounded-2xl p-5 border border-white/10">
          <span className="text-xs font-mono text-gray-400 uppercase tracking-widest block mb-1">Portfolio Equity</span>
          <span className="text-3xl font-black font-mono text-white">
            ${totalEquity.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className="text-xs font-mono text-green-400 block mt-2 font-bold">+18.4% All-Time</span>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-white/10">
          <span className="text-xs font-mono text-gray-400 uppercase tracking-widest block mb-1">24h Net PnL</span>
          <span className="text-3xl font-black font-mono text-[#00ffcc]">
            +${pnlDay.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className="text-xs font-mono text-[#00ffcc] block mt-2 font-bold">+2.34% Realized</span>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-white/10">
          <span className="text-xs font-mono text-gray-400 uppercase tracking-widest block mb-1">Win Rate</span>
          <span className="text-3xl font-black font-mono text-white">78.4%</span>
          <span className="text-xs font-mono text-gray-400 block mt-2">142 Wins / 39 Losses</span>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-white/10">
          <span className="text-xs font-mono text-gray-400 uppercase tracking-widest block mb-1">Sharpe Ratio</span>
          <span className="text-3xl font-black font-mono text-[#aa00ff]">3.24</span>
          <span className="text-xs font-mono text-gray-400 block mt-2">Max Drawdown: 4.1%</span>
        </div>
      </div>

      {/* Main Trading Area: Chart & Asset Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Chart Viewport (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="glass-panel rounded-2xl p-6 border border-white/10 flex flex-col min-h-[460px]">
            {/* Chart Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="text-2xl font-black font-mono text-white">{selectedAsset.symbol}</div>
                <div className="text-sm text-gray-400 hidden sm:block font-mono">{selectedAsset.name}</div>
                <div className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${selectedAsset.change >= 0 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                  {selectedAsset.change >= 0 ? '+' : ''}{selectedAsset.change}%
                </div>
              </div>

              {/* Timeframe selector */}
              <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/10 text-xs font-mono">
                {['1H', '24H', '7D', '30D', 'ALL'].map(tf => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-2.5 py-1 rounded transition-colors ${timeframe === tf ? 'bg-[#00ffcc] text-black font-bold' : 'text-gray-400 hover:text-white'}`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive SVG Candlestick / Neon Line Chart */}
            <div className="flex-1 w-full relative py-6 flex items-center justify-center overflow-hidden">
              <svg className="w-full h-[280px]" viewBox="0 0 700 280" fill="none">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00ffcc" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#00ffcc" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                
                {/* Horizontal Grid lines */}
                <line x1="0" y1="50" x2="700" y2="50" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                <line x1="0" y1="120" x2="700" y2="120" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                <line x1="0" y1="190" x2="700" y2="190" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />

                {/* Shaded Area */}
                <polygon
                  points="20,220 70,180 120,200 170,150 220,165 270,120 320,140 370,95 420,110 470,80 520,105 570,60 620,75 670,45 670,260 20,260"
                  fill="url(#chartGradient)"
                />

                {/* Primary Trend Line */}
                <polyline
                  points="20,220 70,180 120,200 170,150 220,165 270,120 320,140 370,95 420,110 470,80 520,105 570,60 620,75 670,45"
                  fill="none"
                  stroke="#00ffcc"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="drop-shadow(0 0 10px rgba(0,255,204,0.8))"
                />

                {/* Current Pulse Node */}
                <circle cx="670" cy="45" r="5" fill="#00ffcc" className="animate-ping" />
                <circle cx="670" cy="45" r="4" fill="#ffffff" />
              </svg>

              {/* Float Live Price Tag */}
              <div className="absolute top-8 right-6 glass-panel border border-[#00ffcc]/30 bg-black/60 px-3 py-1.5 rounded-lg text-right">
                <span className="text-[10px] font-mono text-gray-400 block uppercase">Real-Time Quote</span>
                <span className="text-lg font-black font-mono text-[#00ffcc]">
                  ${selectedAsset.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Bottom Bar Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs font-mono text-gray-400">
              <div>24h High: <span className="text-white font-bold">${selectedAsset.high}</span></div>
              <div>24h Low: <span className="text-white font-bold">${selectedAsset.low}</span></div>
              <div>24h Volume: <span className="text-white font-bold">{selectedAsset.volume}</span></div>
            </div>
          </div>
        </div>

        {/* Pair Selector & Strategy Config (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Asset List */}
          <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-[#00ffcc]" /> Tracked Pre-IPO & Liquid Pairs
            </h3>

            <div className="space-y-2">
              {ASSET_PAIRS.map(asset => (
                <div
                  key={asset.symbol}
                  onClick={() => setSelectedAsset(asset)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    selectedAsset.symbol === asset.symbol
                      ? 'bg-white/10 border-[#00ffcc]/50 shadow-[0_0_15px_rgba(0,255,204,0.15)]'
                      : 'bg-black/30 border-white/5 hover:border-white/20'
                  }`}
                >
                  <div>
                    <span className="font-bold font-mono text-sm text-white block">{asset.symbol}</span>
                    <span className="text-[10px] text-gray-400 truncate max-w-[140px] block">{asset.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-sm text-white block">
                      ${asset.price.toLocaleString()}
                    </span>
                    <span className={`text-[10px] font-mono font-bold ${asset.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {asset.change >= 0 ? '+' : ''}{asset.change}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strategy Selection Box */}
          <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#aa00ff]" /> Autonomous Strategy Model
            </h3>

            <select
              value={strategy}
              onChange={(e) => setStrategy(e.target.value)}
              className="w-full bg-black/60 border border-white/20 rounded-xl p-3 text-xs font-mono text-white focus:outline-none focus:border-[#aa00ff]"
            >
              <option>Pre-IPO Momentum & Signal Engine</option>
              <option>Grid Scalper v4 (High-Frequency)</option>
              <option>Mean Reversion Volatility Harvester</option>
              <option>Sentiment Arbitrage (SEC Filing Triggers)</option>
            </select>

            <p className="text-xs text-gray-400 leading-relaxed font-mono">
              Engine calculates order sizing based on Kelly Criterion and 2% max risk per trade.
            </p>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-mono uppercase tracking-widest text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#00ffcc]" /> Live Executed Positions & Telemetry
          </h3>
          <span className="text-xs font-mono text-gray-500">Auto-refresh: 2.0s</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 uppercase">
                <th className="py-3 px-2">Order ID</th>
                <th className="py-3 px-2">Asset</th>
                <th className="py-3 px-2">Side</th>
                <th className="py-3 px-2">Size</th>
                <th className="py-3 px-2">Entry</th>
                <th className="py-3 px-2">Mark Price</th>
                <th className="py-3 px-2">PnL</th>
                <th className="py-3 px-2">Strategy</th>
                <th className="py-3 px-2">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.map(o => (
                <tr key={o.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-2 text-gray-400">{o.id}</td>
                  <td className="py-3 px-2 font-bold text-white">{o.symbol}</td>
                  <td className="py-3 px-2">
                    <span className={`px-2 py-0.5 rounded font-bold ${o.type === 'BUY' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                      {o.type}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-gray-300">{o.size}</td>
                  <td className="py-3 px-2 text-gray-300">${o.entryPrice.toLocaleString()}</td>
                  <td className="py-3 px-2 text-white font-bold">${o.currentPrice.toLocaleString()}</td>
                  <td className="py-3 px-2">
                    <span className={`font-bold flex items-center gap-1 ${o.pnl >= 0 ? 'text-[#00ffcc]' : 'text-red-400'}`}>
                      {o.pnl >= 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                      ${Math.abs(o.pnl).toFixed(2)} ({o.pnlPercent}%)
                    </span>
                  </td>
                  <td className="py-3 px-2 text-gray-400">{o.strategy}</td>
                  <td className="py-3 px-2 text-gray-500">{o.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
