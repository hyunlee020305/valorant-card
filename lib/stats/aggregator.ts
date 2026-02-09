import type { AccountData, AgentStats, ProcessedPlayerStats } from '@/types';
import type { HenrikMMRResponse, HenrikMatchResponse } from '@/lib/api/types';
import { getAgentImage } from '@/lib/api/valorant-assets';
import { getTierImage } from '@/lib/api/valorant-assets';
import { analyzePlaystyle } from './playstyle-analyzer';

export async function aggregateStats(
  account: AccountData,
  mmrData: HenrikMMRResponse,
  matchData: HenrikMatchResponse
): Promise<ProcessedPlayerStats> {
  const puuid = account.puuid;
  const matches = matchData.data ?? [];

  let totalKills = 0;
  let totalDeaths = 0;
  let totalAssists = 0;
  let totalScore = 0;
  let totalHeadshots = 0;
  let totalBodyshots = 0;
  let totalLegshots = 0;
  let totalDamage = 0;
  let totalRounds = 0;
  let wins = 0;
  const agentMap = new Map<string, { games: number; wins: number; kills: number; deaths: number; assists: number }>();
  const lastFiveResults: ('W' | 'L')[] = [];

  for (const match of matches) {
    if (!match.players?.all_players) continue;
    const player = match.players.all_players.find(p => p.puuid === puuid);
    if (!player) continue;

    const playerTeam = player.team.toLowerCase();
    const teamData = playerTeam === 'red' ? match.teams.red : match.teams.blue;
    const won = teamData.has_won;

    totalKills += player.stats.kills;
    totalDeaths += player.stats.deaths;
    totalAssists += player.stats.assists;
    totalScore += player.stats.score;
    totalHeadshots += player.stats.headshots;
    totalBodyshots += player.stats.bodyshots;
    totalLegshots += player.stats.legshots;
    totalDamage += player.damage_made;
    totalRounds += match.metadata.rounds_played;

    if (won) wins++;

    if (lastFiveResults.length < 5) {
      lastFiveResults.push(won ? 'W' : 'L');
    }

    const agentName = player.character;
    const existing = agentMap.get(agentName) ?? { games: 0, wins: 0, kills: 0, deaths: 0, assists: 0 };
    existing.games++;
    if (won) existing.wins++;
    existing.kills += player.stats.kills;
    existing.deaths += player.stats.deaths;
    existing.assists += player.stats.assists;
    agentMap.set(agentName, existing);
  }

  const totalGames = matches.length;
  const totalShots = totalHeadshots + totalBodyshots + totalLegshots;

  // Top agents (sorted by games played)
  const topAgentEntries = Array.from(agentMap.entries())
    .sort((a, b) => b[1].games - a[1].games)
    .slice(0, 3);

  const topAgents: AgentStats[] = await Promise.all(
    topAgentEntries.map(async ([agent, stats]) => ({
      agent,
      agentImage: await getAgentImage(agent),
      games: stats.games,
      wins: stats.wins,
      kills: stats.kills,
      deaths: stats.deaths,
      assists: stats.assists,
      kd: stats.deaths > 0 ? Number((stats.kills / stats.deaths).toFixed(2)) : stats.kills,
      winRate: stats.games > 0 ? Number(((stats.wins / stats.games) * 100).toFixed(1)) : 0,
    }))
  );

  const recentWins = lastFiveResults.filter(r => r === 'W').length;
  const recentLosses = lastFiveResults.filter(r => r === 'L').length;
  const trend = recentWins >= 4 ? 'improving' as const : recentLosses >= 4 ? 'declining' as const : 'stable' as const;

  // Calculate recent K/D from last 5 matches
  let recentKills = 0;
  let recentDeaths = 0;
  for (let i = 0; i < Math.min(5, matches.length); i++) {
    const player = matches[i].players?.all_players?.find(p => p.puuid === puuid);
    if (player) {
      recentKills += player.stats.kills;
      recentDeaths += player.stats.deaths;
    }
  }

  const overallStats = {
    totalGames,
    wins,
    losses: totalGames - wins,
    winRate: totalGames > 0 ? Number(((wins / totalGames) * 100).toFixed(1)) : 0,
    avgKills: totalGames > 0 ? Number((totalKills / totalGames).toFixed(1)) : 0,
    avgDeaths: totalGames > 0 ? Number((totalDeaths / totalGames).toFixed(1)) : 0,
    avgAssists: totalGames > 0 ? Number((totalAssists / totalGames).toFixed(1)) : 0,
    kd: totalDeaths > 0 ? Number((totalKills / totalDeaths).toFixed(2)) : totalKills,
    headshotPercent: totalShots > 0 ? Number(((totalHeadshots / totalShots) * 100).toFixed(1)) : 0,
    avgDamagePerRound: totalRounds > 0 ? Number((totalDamage / totalRounds).toFixed(0)) : 0,
    avgScore: totalGames > 0 ? Number((totalScore / totalGames).toFixed(0)) : 0,
  };

  const mmr = mmrData.data?.current_data;
  const tierImage = await getTierImage(mmr?.currenttier ?? 0);

  const playstyle = analyzePlaystyle(overallStats, topAgents);

  return {
    account,
    rank: {
      tier: mmr?.currenttier ?? 0,
      tierName: mmr?.currenttierpatched ?? 'Unrated',
      rankInTier: mmr?.ranking_in_tier ?? 0,
      tierImage: mmr?.images?.large ?? tierImage,
    },
    overall: overallStats,
    topAgents,
    recentForm: {
      lastFiveResults,
      trend,
      recentKD: recentDeaths > 0 ? Number((recentKills / recentDeaths).toFixed(2)) : recentKills,
    },
    playstyle,
  };
}
