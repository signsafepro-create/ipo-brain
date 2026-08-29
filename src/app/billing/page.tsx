import { CreditCard, CheckCircle2 } from 'lucide-react';

export default function Billing() {
  const plans = [
    { name: 'Starter', price: '$49', desc: 'Core modules and limited API access.', features: ['1 Project', '10k API Calls', 'Community Support'], color: 'border-white/10' },
    { name: 'Growth', price: '$199', desc: 'Full AI Studio access for scaling teams.', features: ['5 Projects', '100k API Calls', 'Priority Support', 'Video/Voice Gen'], color: 'border-white/10' },
    { name: 'Sovereign', price: '$999', desc: 'The God-Mode unified command stack.', features: ['Unlimited Projects', 'Unlimited API Calls', 'Dedicated Server', 'Autonomous ASI Agent'], color: 'border-[#00ffcc]/50 shadow-[0_0_30px_rgba(0,255,204,0.15)]' },
  ];

  return (
    <div className="space-y-10 max-w-6xl mx-auto animate-in fade-in duration-500">
      <div className="pb-4 border-b border-white/10 flex items-center gap-3">
        <CreditCard className="w-8 h-8 text-[#00ffcc]" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Billing & Subscription</h1>
          <p className="text-gray-400 mt-1">Manage your Stripe payments and Sovereign Stack usage.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
        {plans.map((plan) => (
          <div key={plan.name} className={`glass-panel rounded-2xl p-8 border ${plan.color} relative flex flex-col`}>
            {plan.name === 'Sovereign' && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#00ffcc] text-black text-xs font-black px-4 py-1 rounded-full uppercase tracking-widest">
                Current Plan
              </div>
            )}
            <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-4xl font-black text-white">{plan.price}</span>
              <span className="text-gray-400">/mo</span>
            </div>
            <p className="text-sm text-gray-400 mb-8 flex-1">{plan.desc}</p>
            
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-[#00ffcc]" /> {feature}
                </li>
              ))}
            </ul>

            <button className={`w-full py-3 rounded-lg font-bold transition-colors ${plan.name === 'Sovereign' ? 'bg-white/5 text-gray-400 cursor-not-allowed' : 'bg-[#00ffcc] text-black hover:bg-[#00ccaa]'}`}>
              {plan.name === 'Sovereign' ? 'Active' : 'Upgrade'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
