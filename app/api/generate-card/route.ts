import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { generateCardImage } from '@/lib/ai/gemini-card-generator';

const bodySchema = z.object({
  playerStats: z.any(),
  bio: z.string(),
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

    const { playerStats, bio, language } = parsed.data;
    const png = await generateCardImage(playerStats, bio, language);

    return new NextResponse(new Uint8Array(png), {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': `inline; filename="valorant-card.png"; filename*=UTF-8''${encodeURIComponent(playerStats.account?.name ?? 'card')}-valorant-card.png`,
        'Cache-Control': 'public, max-age=300',
      },
    });
  } catch (error) {
    console.error('Card generation error:', error);
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
