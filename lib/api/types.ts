// Henrik API response types

export interface HenrikAccountResponse {
  status: number;
  data: {
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
  };
}

export interface HenrikMMRResponse {
  status: number;
  data: {
    name: string;
    tag: string;
    puuid: string;
    current_data: {
      currenttier: number;
      currenttierpatched: string;
      ranking_in_tier: number;
      mmr_change_to_last_game: number;
      elo: number;
      images: {
        small: string;
        large: string;
        triangle_down: string;
        triangle_up: string;
      };
    };
  };
}

export interface HenrikMatchResponse {
  status: number;
  data: Array<{
    metadata: {
      matchid: string;
      map: string;
      game_start: number;
      game_length: number;
      mode: string;
      rounds_played: number;
    };
    players: {
      all_players: Array<{
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
      }>;
      red: Array<{
        puuid: string;
        name: string;
        tag: string;
        team: string;
        character: string;
      }>;
      blue: Array<{
        puuid: string;
        name: string;
        tag: string;
        team: string;
        character: string;
      }>;
    };
    teams: {
      red: { has_won: boolean; rounds_won: number; rounds_lost: number };
      blue: { has_won: boolean; rounds_won: number; rounds_lost: number };
    };
  }>;
}
