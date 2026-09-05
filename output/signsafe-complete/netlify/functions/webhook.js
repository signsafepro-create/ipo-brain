// Netlify function: Handle Stripe webhooks
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const sig = event.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      endpointSecret
    );
  } catch (err) {
    console.log('⚠️ Webhook signature failed:', err.message);
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  // Handle events
  switch (stripeEvent.type) {
    case 'checkout.session.completed':
      const session = stripeEvent.data.object;
      console.log('✅ Payment succeeded:', session.id);
      console.log('   Customer:', session.customer_email);
      console.log('   Amount: $', session.amount_total / 100, 'CAD');

      // TODO: Activate account, send welcome email
      // await sendWelcomeEmail(session.customer_email);
      break;

    case 'invoice.paid':
      const invoice = stripeEvent.data.object;
      console.log('✅ Subscription renewed:', invoice.id);
      break;

    case 'invoice.payment_failed':
      const failed = stripeEvent.data.object;
      console.log('❌ Payment failed:', failed.id);
      // TODO: Send retry email
      break;

    default:
      console.log('Unhandled event:', stripeEvent.type);
  }

  return { statusCode: 200, body: JSON.stringify({ received: true }) };
};