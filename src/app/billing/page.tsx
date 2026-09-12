'use client';
import { useState, useEffect } from 'react';
import { CreditCard, CheckCircle2, Shield, Sparkles, ArrowRight, RefreshCw } from 'lucide-react';

export default function BillingPage() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [bannerMessage, setBannerMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('status') === 'success') {
        setBannerMessage('Payment successfully processed! Your Sovereign plan is now activated.');
      } else if (params.get('status') === 'cancelled') {
        setBannerMessage('Checkout session was cancelled.');
      }
    }
  }, []);

  const handleCheckout = async (planName: string) => {
    setLoadingPlan(planName);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planName }),
      });

      const data = await res.json();
      if (data.success && data.url) {
        if (data.mode === 'SIMULATED') {
          setBannerMessage(`[TEST MODE] ${data.message} (${data.planName} - $${data.amount}/mo)`);
        } else {
          window.location.href = data.url;
        }
      } else {
        alert(data.error || 'Failed to initialize checkout session.');
      }
    } catch (err) {
      alert(`Network error: ${(err as Error).message}`);
    } finally {
      setLoadingPlan(null);
    }
  };

  const plans = [
    {
      name: 'Starter',
      price: '$49',
      desc: 'Core sovereign modules, IPO Brain candidate scanner, and limited API access.',
      features: ['1 Production Seat', '10k API Tokens / Month', 'SignSafe Basic Scanner', 'Standard Community Support'],
      highlight: false,
      ctaText: 'Get Starter'
    },
    {
      name: 'Growth',
      price: '$199',
      desc: 'Full AI Studio access, neural voice synthesis, and quantitative trading bot.',
      features: ['5 Production Seats', '100k API Tokens / Month', 'Uncapped SignSafe Contract Redlining', 'Quant Trading Terminal Access', 'Realtime Neural Voice Studio', 'Priority Developer Discord'],
      highlight: true,
      ctaText: 'Upgrade to Growth'
    },
    {
      name: 'Sovereign',
      price: '$999',
      desc: 'The God-Mode unified command stack. Complete autonomy and dedicated daemon clustering.',
      features: ['Unlimited Production Seats', 'Unlimited API Execution', '103-Micro-Agent Swarm Coordinator', 'Dedicated Cloudflare Tunnel Routing', 'Sellvia Autonomous Dropship Pipelines', 'Direct Architect Phone Support (705-542-1615)'],
      highlight: false,
      ctaText: 'Deploy Sovereign Stack'
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-4 animate-in fade-in duration-500">
      {/* Header */}
      <div className="pb-6 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#00ffcc]/10 border border-[#00ffcc]/30">
            <CreditCard className="w-8 h-8 text-[#00ffcc] drop-shadow-[0_0_10px_rgba(0,255,204,0.8)]" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white">
              Billing & <span className="text-[#00ffcc]">Monetization</span>
            </h1>
            <p className="text-gray-400 text-sm">
              Instant Stripe checkout, enterprise tier subscriptions, and multi-tenant billing.
            </p>
          </div>
        </div>
      </div>

      {/* Status Banner if returning from checkout */}
      {bannerMessage && (
        <div className="p-4 rounded-xl border border-[#00ffcc]/30 bg-[#00ffcc]/10 text-[#00ffcc] text-xs font-mono flex items-center justify-between">
          <span>{bannerMessage}</span>
          <button onClick={() => setBannerMessage(null)} className="text-white hover:underline ml-4">Dismiss</button>
        </div>
      )}

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`glass-panel rounded-2xl p-8 border relative flex flex-col justify-between transition-all duration-300 ${
              plan.highlight
                ? 'border-[#00ffcc] shadow-[0_0_35px_rgba(0,255,204,0.15)] bg-black/70 -translate-y-2'
                : 'border-white/10 hover:border-white/20 bg-black/40'
            }`}
          >
            {plan.highlight && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#00ffcc] text-black text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest shadow-[0_0_15px_rgba(0,255,204,0.5)]">
                Most Popular
              </div>
            )}

            <div>
              <h3 className="text-xl font-black text-white mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-4xl font-black text-white font-mono">{plan.price}</span>
                <span className="text-xs text-gray-400 font-mono">/month</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed mb-6 font-mono">{plan.desc}</p>

              <div className="space-y-3 mb-8 border-t border-white/10 pt-6">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-[#00ffcc] flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleCheckout(plan.name)}
              disabled={loadingPlan === plan.name}
              className={`w-full py-3.5 rounded-xl font-mono font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 ${
                plan.highlight
                  ? 'bg-[#00ffcc] text-black hover:bg-[#00ccaa] shadow-[0_0_20px_rgba(0,255,204,0.3)]'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
              }`}
            >
              {loadingPlan === plan.name ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Redirecting to Stripe...
                </>
              ) : (
                <>
                  {plan.ctaText} <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Security & Guarantee Seal */}
      <div className="p-6 glass-panel rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-400">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-green-400" />
          <span>256-Bit SSL Encrypted Checkout via Stripe • Cancel Anytime • Instant Activation</span>
        </div>
        <div className="flex items-center gap-2 text-[#00ffcc]">
          <Sparkles className="w-4 h-4" />
          <span>Enterprise Custom Billing Available Upon Request</span>
        </div>
      </div>
    </div>
  );
}
