import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt, audience, platform } = await req.json();

    // 1. Check for API Keys
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey.includes('placeholder')) {
      return NextResponse.json(
        { error: 'API Key not configured. Please add your GEMINI_API_KEY to .env.local' },
        { status: 500 }
      );
    }

    // 2. Stripe Check (Mocking the paywall check for now)
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey || stripeKey.includes('placeholder')) {
      return NextResponse.json(
        { error: 'Stripe is not configured. Payments are disabled. Add STRIPE_SECRET_KEY to .env.local' },
        { status: 500 }
      );
    }

    // 3. Make real call to Gemini AI
    const systemInstruction = `You are an expert marketing AI. Generate a campaign for audience: ${audience} on platform: ${platform}.`;
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${systemInstruction}\n\nUser Prompt: ${prompt}`
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error('Failed to generate content from AI');
    }

    const data = await response.json();
    const generatedText = data.candidates[0].content.parts[0].text;

    return NextResponse.json({ success: true, result: generatedText });

  } catch (error: any) {
    console.error('Marketing API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
