import Link from 'next/link';
import { Zap } from 'lucide-react';

export default function Topbar() {
  return (
    <header className="h-20 glass-panel border-b border-white/10 flex items-center justify-between px-8 sticky top-0 z-40 w-full">
      <div className="flex items-center gap-3">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ffcc] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00ffcc]"></span>
        </span>
        <span className="text-xs font-bold text-[#00ffcc] tracking-[0.2em] uppercase">Omni-System Online</span>
      </div>
      <nav className="flex items-center gap-8 text-sm font-medium text-gray-400">
        <Link href="/docs" className="hover:text-[#00ffcc] transition-colors flex items-center gap-2"><Zap className="w-4 h-4"/> Docs</Link>
        <Link href="/support" className="hover:text-white transition-colors">Support</Link>
        <Link href="/settings" className="hover:text-white transition-colors border border-white/10 px-4 py-2 rounded-full hover:bg-white/5">Account</Link>
      </nav>
    </header>
  );
}
