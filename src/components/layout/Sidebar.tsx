'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FolderGit2, Megaphone, Briefcase, BrainCircuit, MonitorPlay, Mic, Palette, Share2, BarChart3, CreditCard, Settings } from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Projects', href: '/projects', icon: FolderGit2 },
  { name: 'Marketing OS', href: '/marketing', icon: Megaphone },
  { name: 'Media Kit', href: '/portfolio', icon: Briefcase },
  { name: 'IPO Brain', href: '/ipo-brain', icon: BrainCircuit },
  { name: 'Video Studio', href: '/video', icon: MonitorPlay },
  { name: 'Voice Studio', href: '/voice', icon: Mic },
  { name: 'BrandKit', href: '/brandkit', icon: Palette },
  { name: 'Distribute', href: '/distribution', icon: Share2 },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Billing', href: '/billing', icon: CreditCard },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 glass-panel border-r border-white/10 h-screen fixed top-0 left-0 flex flex-col z-50">
      <div className="p-6 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#00ffcc] to-[#aa00ff]"></div>
        <h1 className="text-xl font-black tracking-tighter text-white drop-shadow-[0_0_8px_rgba(0,255,204,0.6)]">
          LILJR <span className="text-[#00ffcc]">SOVEREIGN</span>
        </h1>
      </div>
      <nav className="flex-1 overflow-y-auto py-6">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link href={item.href}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${isActive ? 'bg-[#00ffcc]/10 text-[#00ffcc] border border-[#00ffcc]/30 shadow-[0_0_15px_rgba(0,255,204,0.15)]' : 'text-gray-400 hover:text-white hover:bg-white/5 hover:translate-x-1 border border-transparent'}`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
