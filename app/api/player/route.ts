import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getAccount, getMMR, getMatches } from '@/lib/api/henrik-client';
import { aggregateStats } from '@/lib/stats/aggregator';
import { getCache, setCache } from '@/lib/cache';
import type { ProcessedPlayerStats } from '@/types';

const querySchema = z.object({
  name: z.string().min(1).max(24),
  tag: z.string().min(1).max(8),
  region: z.enum(['na', 'eu', 'ap', 'kr', 'br', 'latam']),
});

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const parsed = querySchema.safeParse({
      name: searchParams.get('name'),
      tag: searchParams.get('tag'),
      region: searchParams.get('region'),
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid parameters', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, tag, region } = parsed.data;
    const cacheKey = `player:${region}:${name}:${tag}`;

    const cached = getCache<ProcessedPlayerStats>(cacheKey);
    if (cached) {
      return NextResponse.json({ data: cached });
    }

    // Account lookup first (may need force=true to index new accounts)
    const accountRes = await getAccount(name, tag);

    if (accountRes.status !== 200) {
      return NextResponse.json(
        { error: 'Player not found.' },
        { status: 404 }
      );
    }

    const [mmrRes, matchRes] = await Promise.all([
      getMMR(region, name, tag),
      getMatches(region, name, tag),
    ]);

    const stats = await aggregateStats(accountRes.data, mmrRes, matchRes);
    setCache(cacheKey, stats, 5 * 60 * 1000);

    return NextResponse.json({ data: stats });
  } catch (error) {
    console.error('Player API error:', error);
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
