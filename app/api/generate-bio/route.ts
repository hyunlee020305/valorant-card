import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { generateBio } from '@/lib/ai/bio-generator';
import type { ProcessedPlayerStats } from '@/types';

const bodySchema = z.object({
  playerStats: z.any(),
  language: z.enum(['ko', 'en']).default('ko'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = bodySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request body', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { playerStats, language } = parsed.data;
    const bio = await generateBio(playerStats as ProcessedPlayerStats, language);

    return NextResponse.json({ bio });
  } catch (error) {
    console.error('Bio generation error:', error);
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
