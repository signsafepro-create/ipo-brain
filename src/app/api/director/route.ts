import { NextRequest, NextResponse } from 'next/server';
import { executeDirectorWorkflow, queryParallelSearch, SceneDirective } from '@/lib/director-engine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const directive: SceneDirective = {
      sceneTitle: body.sceneTitle || 'Act I: The Sovereign Awakening',
      genre: body.genre || 'Sci-Fi / Cyberpunk Noir',
      logline: body.logline || 'A decentralized agent OS orchestrates a media studio against overwhelming corporate entropy.',
      characters: body.characters || ['The Director', 'OMNIBRAIN Core', 'Parallel Grounding Agent'],
      tone: body.tone || 'Cinematic, Epic, Precise',
      researchQuery: body.researchQuery,
    };

    const response = await executeDirectorWorkflow(directive);
    return NextResponse.json(response);
  } catch (error) {
    console.error('Director Agent Error:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || 'cinematic production agent workflows';
  const intelligence = await queryParallelSearch(q);
  return NextResponse.json({
    engine: 'X-Sovereign Director Agent',
    partner: 'Parallel Search API',
    runtime: 'Google Gemini & Agent Builder',
    query: q,
    intelligence
  });
}
