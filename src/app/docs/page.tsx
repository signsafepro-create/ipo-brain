export default function Page() {
  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#1a1a1a]">
        <h1 className="text-3xl font-bold tracking-tight text-white capitalize">docs</h1>
        <p className="text-gray-400 mt-2">Manage your docs module and configurations.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="h-64 rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] p-6 flex items-center justify-center">
          <p className="text-sm text-gray-500 font-mono">[ docs Engine Ready ]</p>
        </div>
      </div>
    </div>
  );
}
