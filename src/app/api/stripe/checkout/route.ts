import { NextRequest, NextResponse } from 'next/server';

const PLANS: Record<string, { name: string; amount: number; desc: string }> = {
  Starter: { name: 'Sovereign Starter Plan', amount: 4900, desc: 'Core modules, 10k API calls, community support.' },
  Growth: { name: 'Sovereign Growth AI Studio', amount: 19900, desc: 'Full AI Studio access, 100k API calls, priority support.' },
  Sovereign: { name: 'Sovereign Command Stack (God-Mode)', amount: 99900, desc: 'Unlimited projects, dedicated server, autonomous agent swarm.' },
};

export async function POST(req: NextRequest) {
  try {
    const { planName } = await req.json();
    const plan = PLANS[planName] || PLANS['Growth'];

    const stripeKey = process.env.STRIPE_SECRET_KEY || '';
    const origin = req.headers.get('origin') || 'https://ipo-brain.com';

    // If placeholder or missing key, provide graceful sandbox fallback
    if (!stripeKey || stripeKey.includes('placeholder')) {
      return NextResponse.json({
        success: true,
        mode: 'SIMULATED',
        planName: plan.name,
        amount: plan.amount / 100,
        message: 'Stripe test mode initialized. Add your live sk_live_... key to .env.local to activate automated charge collection.',
        url: `${origin}/billing?session_id=simulated_${Date.now()}&status=success`
      });
    }

    // Call Stripe API natively with zero external dependencies
    const params = new URLSearchParams();
    params.append('mode', 'subscription');
    params.append('success_url', `${origin}/billing?session_id={CHECKOUT_SESSION_ID}&status=success`);
    params.append('cancel_url', `${origin}/billing?status=cancelled`);
    params.append('line_items[0][price_data][currency]', 'usd');
    params.append('line_items[0][price_data][product_data][name]', plan.name);
    params.append('line_items[0][price_data][product_data][description]', plan.desc);
    params.append('line_items[0][price_data][unit_amount]', plan.amount.toString());
    params.append('line_items[0][price_data][recurring][interval]', 'month');
    params.append('line_items[0][quantity]', '1');

    const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const session = await res.json();

    if (session.error) {
      return NextResponse.json({ success: false, error: session.error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, url: session.url });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
