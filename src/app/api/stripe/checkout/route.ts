import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

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
    
    // Resolve origin reliably
    const host = req.headers.get('host') || 'ipo-brain.vercel.app';
    const proto = req.headers.get('x-forwarded-proto') || 'https';
    const origin = req.headers.get('origin') || `${proto}://${host}`;

    // If placeholder or missing key, provide graceful sandbox fallback
    if (!stripeKey || stripeKey.includes('placeholder')) {
      return NextResponse.json({
        success: true,
        mode: 'SIMULATED',
        planName: plan.name,
        amount: plan.amount / 100,
        message: 'Stripe API key missing. Configure STRIPE_SECRET_KEY to enable live checkout.',
        url: `${origin}/billing?session_id=simulated_${Date.now()}&status=success`
      });
    }

    const stripe = new Stripe(stripeKey);

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: plan.name,
              description: plan.desc,
            },
            unit_amount: plan.amount,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/billing?session_id={CHECKOUT_SESSION_ID}&status=success`,
      cancel_url: `${origin}/billing?status=cancelled`,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
    });

    return NextResponse.json({ success: true, url: session.url });
  } catch (error) {
    console.error('Stripe Checkout Error:', error);
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
