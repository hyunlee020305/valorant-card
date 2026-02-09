import type { AgentStats, PlaystyleProfile } from '@/types';
import { AGENT_ROLES } from '@/lib/constants';

interface OverallStats {
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
}

export function analyzePlaystyle(
  overall: OverallStats,
  topAgents: AgentStats[]
): PlaystyleProfile {
  // Aggression: based on K/D and avg kills
  const aggression = Math.min(100, Math.round(
    (overall.kd * 25) + (overall.avgKills * 3) + (overall.avgDamagePerRound / 10)
  ));

  // Accuracy: based on headshot %
  const accuracy = Math.min(100, Math.round(overall.headshotPercent * 3.5));

  // Consistency: based on win rate and K/D stability
  const consistency = Math.min(100, Math.round(
    (overall.winRate * 0.8) + (Math.min(overall.kd, 2) * 15)
  ));

  // Teamplay: based on assists and win rate relative to K/D
  const teamplay = Math.min(100, Math.round(
    (overall.avgAssists * 8) + (overall.winRate * 0.5)
  ));

  // Role preference
  const roleCounts: Record<string, number> = {};
  for (const agent of topAgents) {
    const role = AGENT_ROLES[agent.agent] ?? 'Flex';
    roleCounts[role] = (roleCounts[role] ?? 0) + agent.games;
  }

  const sortedRoles = Object.entries(roleCounts).sort((a, b) => b[1] - a[1]);
  const primaryRole = sortedRoles[0]?.[0] ?? 'Flex';
  const totalGamesInRoles = sortedRoles.reduce((sum, [, count]) => sum + count, 0);
  const primaryRoleRatio = totalGamesInRoles > 0 ? (sortedRoles[0]?.[1] ?? 0) / totalGamesInRoles : 0;

  const rolePreference = primaryRoleRatio > 0.5
    ? primaryRole as PlaystyleProfile['rolePreference']
    : 'Flex';

  // Playstyle tag
  const playstyleTag = generatePlaystyleTag(aggression, accuracy, rolePreference);

  // Strengths and weaknesses
  const strengths: string[] = [];
  const weaknesses: string[] = [];

  if (overall.kd >= 1.3) strengths.push('High fragging power');
  else if (overall.kd < 0.9) weaknesses.push('Low kill efficiency');

  if (overall.headshotPercent >= 25) strengths.push('Precise aim');
  else if (overall.headshotPercent < 15) weaknesses.push('Low headshot accuracy');

  if (overall.winRate >= 55) strengths.push('Clutch mentality');
  else if (overall.winRate < 45) weaknesses.push('Struggling in close games');

  if (overall.avgAssists >= 5) strengths.push('Strong team support');

  if (overall.avgDamagePerRound >= 150) strengths.push('High damage output');
  else if (overall.avgDamagePerRound < 100) weaknesses.push('Low damage contribution');

  if (strengths.length === 0) strengths.push('Balanced playstyle');
  if (weaknesses.length === 0) weaknesses.push('No major weaknesses');

  return {
    aggression,
    accuracy,
    consistency,
    teamplay,
    rolePreference,
    playstyleTag,
    strengths: strengths.slice(0, 3),
    weaknesses: weaknesses.slice(0, 2),
  };
}

function generatePlaystyleTag(aggression: number, accuracy: number, role: string): string {
  const aggressionLabel = aggression >= 70 ? 'Aggressive' : aggression >= 40 ? 'Balanced' : 'Tactical';
  const accuracyLabel = accuracy >= 70 ? 'Sharpshooter' : '';

  if (accuracyLabel) {
    return `${aggressionLabel} ${accuracyLabel}`;
  }

  return `${aggressionLabel} ${role}`;
}
