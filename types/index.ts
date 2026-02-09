export interface AccountData {
  puuid: string;
  region: string;
  account_level: number;
  name: string;
  tag: string;
  card: {
    small: string;
    large: string;
    wide: string;
    id: string;
  };
}

export interface MMRData {
  currenttier: number;
  currenttierpatched: string;
  ranking_in_tier: number;
  elo: number;
  images: {
    small: string;
    large: string;
    triangle_down: string;
    triangle_up: string;
  };
}

export interface MatchPlayer {
  puuid: string;
  name: string;
  tag: string;
  team: string;
  character: string;
  stats: {
    kills: number;
    deaths: number;
    assists: number;
    score: number;
    headshots: number;
    bodyshots: number;
    legshots: number;
  };
  damage_made: number;
  damage_received: number;
}

export interface MatchData {
  metadata: {
    matchid: string;
    map: string;
    game_start: number;
    game_length: number;
    mode: string;
    rounds_played: number;
  };
  players: {
    all_players: MatchPlayer[];
    red: MatchPlayer[];
    blue: MatchPlayer[];
  };
  teams: {
    red: { has_won: boolean; rounds_won: number; rounds_lost: number };
    blue: { has_won: boolean; rounds_won: number; rounds_lost: number };
  };
}

export interface AgentStats {
  agent: string;
  agentImage: string;
  games: number;
  wins: number;
  kills: number;
  deaths: number;
  assists: number;
  kd: number;
  winRate: number;
}

export interface ProcessedPlayerStats {
  account: AccountData;
  rank: {
    tier: number;
    tierName: string;
    rankInTier: number;
    tierImage: string;
  };
  overall: {
    totalGames: number;
    wins: number;
    losses: number;
    winRate: number;
    avgKills: number;
    avgDeaths: number;
    avgAssists: number;
    kd: number;
    headshotPercent: number;
    avgDamagePerRound: number;
    avgScore: number;
  };
  topAgents: AgentStats[];
  recentForm: {
    lastFiveResults: ('W' | 'L')[];
    trend: 'improving' | 'declining' | 'stable';
    recentKD: number;
  };
  playstyle: PlaystyleProfile;
}

export interface PlaystyleProfile {
  aggression: number; // 0-100
  accuracy: number; // 0-100
  consistency: number; // 0-100
  teamplay: number; // 0-100
  rolePreference: 'Duelist' | 'Controller' | 'Sentinel' | 'Initiator' | 'Flex';
  playstyleTag: string; // e.g., "Aggressive Duelist", "Tactical Controller"
  strengths: string[];
  weaknesses: string[];
}

export interface CardData {
  playerStats: ProcessedPlayerStats;
  bio: string;
  template: 'neon-cyber' | 'clean-minimal' | 'valorant-classic';
  language: 'ko' | 'en';
  backgroundImage?: string; // base64 data URI from AI generation
}

export type TemplateComponent = (props: { data: CardData }) => React.JSX.Element;
