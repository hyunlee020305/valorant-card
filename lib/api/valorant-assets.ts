import { VALORANT_API_BASE } from '@/lib/constants';
import { getCache, setCache } from '@/lib/cache';

const ASSET_CACHE_TTL = 60 * 60 * 1000; // 1 hour

interface AgentData {
  uuid: string;
  displayName: string;
  displayIcon: string;
  fullPortrait: string;
  bustPortrait: string;
  role: {
    displayName: string;
  };
}

interface TierData {
  tier: number;
  tierName: string;
  largeIcon: string;
  smallIcon: string;
}

let agentMapCache: Map<string, AgentData> | null = null;
let tierMapCache: Map<number, TierData> | null = null;

export async function getAgentMap(): Promise<Map<string, AgentData>> {
  if (agentMapCache) return agentMapCache;

  const cached = getCache<Map<string, AgentData>>('agents-map');
  if (cached) {
    agentMapCache = cached;
    return cached;
  }

  const res = await fetch(`${VALORANT_API_BASE}/agents?isPlayableCharacter=true`);
  const json = await res.json();
  const map = new Map<string, AgentData>();

  for (const agent of json.data) {
    map.set(agent.displayName.toLowerCase(), agent);
  }

  agentMapCache = map;
  setCache('agents-map', map, ASSET_CACHE_TTL);
  return map;
}

export async function getAgentImage(agentName: string): Promise<string> {
  const map = await getAgentMap();
  const agent = map.get(agentName.toLowerCase());
  return agent?.displayIcon ?? '';
}

export async function getAgentPortrait(agentName: string): Promise<string> {
  const map = await getAgentMap();
  const agent = map.get(agentName.toLowerCase());
  return agent?.bustPortrait ?? agent?.fullPortrait ?? '';
}

export async function getTierMap(): Promise<Map<number, TierData>> {
  if (tierMapCache) return tierMapCache;

  const cached = getCache<Map<number, TierData>>('tier-map');
  if (cached) {
    tierMapCache = cached;
    return cached;
  }

  const res = await fetch(`${VALORANT_API_BASE}/competitivetiers`);
  const json = await res.json();
  const latestSeason = json.data[json.data.length - 1];
  const map = new Map<number, TierData>();

  for (const tier of latestSeason.tiers) {
    map.set(tier.tier, {
      tier: tier.tier,
      tierName: tier.tierName,
      largeIcon: tier.largeIcon,
      smallIcon: tier.smallIcon,
    });
  }

  tierMapCache = map;
  setCache('tier-map', map, ASSET_CACHE_TTL);
  return map;
}

export async function getTierImage(tier: number): Promise<string> {
  const map = await getTierMap();
  const tierData = map.get(tier);
  return tierData?.largeIcon ?? '';
}
