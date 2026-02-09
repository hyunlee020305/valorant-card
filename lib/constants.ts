export const REGIONS = [
  { value: 'na', label: 'North America', short: 'NA' },
  { value: 'eu', label: 'Europe', short: 'EU' },
  { value: 'ap', label: 'Asia Pacific', short: 'AP' },
  { value: 'kr', label: 'Korea', short: 'KR' },
  { value: 'br', label: 'Brazil', short: 'BR' },
  { value: 'latam', label: 'Latin America', short: 'LATAM' },
] as const;

export type Region = (typeof REGIONS)[number]['value'];

export const TIER_NAMES: Record<number, string> = {
  0: 'Unrated',
  3: 'Iron 1', 4: 'Iron 2', 5: 'Iron 3',
  6: 'Bronze 1', 7: 'Bronze 2', 8: 'Bronze 3',
  9: 'Silver 1', 10: 'Silver 2', 11: 'Silver 3',
  12: 'Gold 1', 13: 'Gold 2', 14: 'Gold 3',
  15: 'Platinum 1', 16: 'Platinum 2', 17: 'Platinum 3',
  18: 'Diamond 1', 19: 'Diamond 2', 20: 'Diamond 3',
  21: 'Ascendant 1', 22: 'Ascendant 2', 23: 'Ascendant 3',
  24: 'Immortal 1', 25: 'Immortal 2', 26: 'Immortal 3',
  27: 'Radiant',
};

export const AGENT_ROLES: Record<string, string> = {
  Jett: 'Duelist',
  Reyna: 'Duelist',
  Phoenix: 'Duelist',
  Raze: 'Duelist',
  Yoru: 'Duelist',
  Neon: 'Duelist',
  Iso: 'Duelist',
  Brimstone: 'Controller',
  Viper: 'Controller',
  Omen: 'Controller',
  Astra: 'Controller',
  Harbor: 'Controller',
  Clove: 'Controller',
  Sage: 'Sentinel',
  Cypher: 'Sentinel',
  Killjoy: 'Sentinel',
  Chamber: 'Sentinel',
  Deadlock: 'Sentinel',
  Vyse: 'Sentinel',
  Sova: 'Initiator',
  Breach: 'Initiator',
  Skye: 'Initiator',
  'KAY/O': 'Initiator',
  Fade: 'Initiator',
  Gekko: 'Initiator',
  Tejo: 'Initiator',
};

export const ROLE_COLORS: Record<string, string> = {
  Duelist: '#FF4655',
  Controller: '#8B5CF6',
  Sentinel: '#22C55E',
  Initiator: '#3B82F6',
  Flex: '#F59E0B',
};

export const HENRIK_BASE_URL = 'https://api.henrikdev.xyz';
export const VALORANT_API_BASE = 'https://valorant-api.com/v1';

export const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
export const MAX_MATCHES = 10;
