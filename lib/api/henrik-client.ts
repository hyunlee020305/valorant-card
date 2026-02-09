import { HENRIK_BASE_URL, MAX_MATCHES } from '@/lib/constants';
import { getCache, setCache } from '@/lib/cache';
import type { HenrikAccountResponse, HenrikMMRResponse, HenrikMatchResponse } from './types';

const CACHE_TTL = 5 * 60 * 1000;

async function henrikFetch<T>(path: string): Promise<T> {
  const cacheKey = `henrik:${path}`;
  const cached = getCache<T>(cacheKey);
  if (cached) return cached;

  const headers: Record<string, string> = {
    'Accept': 'application/json',
  };

  if (process.env.HENRIK_API_KEY) {
    headers['Authorization'] = process.env.HENRIK_API_KEY;
  }

  const res = await fetch(`${HENRIK_BASE_URL}${path}`, { headers });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Henrik API error ${res.status}: ${text}`);
  }

  const json = await res.json() as T;
  setCache(cacheKey, json, CACHE_TTL);
  return json;
}

export async function getAccount(name: string, tag: string): Promise<HenrikAccountResponse> {
  const path = `/valorant/v1/account/${encodeURIComponent(name)}/${encodeURIComponent(tag)}`;
  try {
    return await henrikFetch<HenrikAccountResponse>(path);
  } catch {
    return henrikFetch<HenrikAccountResponse>(`${path}?force=true`);
  }
}

export async function getMMR(region: string, name: string, tag: string): Promise<HenrikMMRResponse> {
  return henrikFetch<HenrikMMRResponse>(
    `/valorant/v2/mmr/${encodeURIComponent(region)}/${encodeURIComponent(name)}/${encodeURIComponent(tag)}`
  );
}

export async function getMatches(region: string, name: string, tag: string): Promise<HenrikMatchResponse> {
  return henrikFetch<HenrikMatchResponse>(
    `/valorant/v3/matches/${encodeURIComponent(region)}/${encodeURIComponent(name)}/${encodeURIComponent(tag)}?filter=competitive&size=${MAX_MATCHES}`
  );
}
