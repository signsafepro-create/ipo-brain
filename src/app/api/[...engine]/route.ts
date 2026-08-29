import { NextRequest, NextResponse } from 'next/server';

// This acts as the Omni-Router. 
// It takes any request sent to /api/* from the UI and forwards it directly to your Python FastAPI backend.
const FASTAPI_URL = process.env.FASTAPI_URL || 'http://localhost:8000';

export async function POST(req: NextRequest, { params }: { params: { engine: string[] } }) {
  try {
    const endpoint = params.engine.join('/');
    const body = await req.json();

    const response = await fetch(${FASTAPI_URL}/api/${endpoint}, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: 'Omni-Router Backend Connection Failed. Is FastAPI running?' }, { status: 500 });
  }
}
