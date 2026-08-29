import { FolderGit2, Github, Globe, ServerCrash } from 'lucide-react';

export default function Projects() {
  const projectsList = [
    { name: 'LILJR Empire v5', platform: 'Vercel', status: 'Online', repo: 'liljr-empire', url: 'liljr.com' },
    { name: 'IPO Brain API', platform: 'Railway', status: 'Online', repo: 'ipo-brain-backend', url: 'api.ipobrain.net' },
    { name: 'Omni-Sovereign Core', platform: 'Local Daemon', status: 'Online', repo: 'omni-sovereign_v2', url: 'localhost:8055' },
    { name: 'CosmicFaith Workspace', platform: 'Netlify', status: 'Offline', repo: 'cosmicfaith-easy', url: 'cosmicfaith.com' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="pb-4 border-b border-white/10 flex items-center gap-3">
        <FolderGit2 className="w-8 h-8 text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Active Projects</h1>
          <p className="text-gray-400 mt-1">Manage deployments and repositories across your empire.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {projectsList.map((proj, i) => (
          <div key={i} className="glass-panel rounded-2xl p-6 border border-white/10 hover:border-blue-500/50 transition-colors group cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-500/20 transition-colors"></div>
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-widest ${proj.status === 'Online' ? 'bg-[#00ffcc]/10 text-[#00ffcc]' : 'bg-red-500/10 text-red-500'}`}>
                {proj.status}
              </div>
              {proj.status === 'Offline' ? <ServerCrash className="w-5 h-5 text-red-500" /> : <Globe className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />}
            </div>
            
            <h3 className="text-xl font-bold text-white mb-1 relative z-10">{proj.name}</h3>
            <p className="text-sm text-gray-400 mb-6 relative z-10">Hosted on {proj.platform}</p>
            
            <div className="flex items-center gap-4 border-t border-white/10 pt-4 relative z-10">
              <a href="#" className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors">
                <Github className="w-4 h-4" /> {proj.repo}
              </a>
              <a href="#" className="flex items-center gap-2 text-xs text-gray-400 hover:text-blue-400 transition-colors ml-auto">
                {proj.url}
              </a>
            </div>
          </div>
        ))}

        <div className="glass-panel rounded-2xl p-6 border border-white/10 border-dashed flex flex-col items-center justify-center text-gray-500 hover:text-white hover:border-white/30 transition-colors cursor-pointer min-h-[200px]">
          <span className="text-4xl mb-2">+</span>
          <span className="font-bold tracking-widest uppercase text-sm">Deploy New Module</span>
        </div>
      </div>
    </div>
  );
}
