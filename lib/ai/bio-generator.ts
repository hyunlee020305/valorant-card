import Anthropic from '@anthropic-ai/sdk';
import type { ProcessedPlayerStats } from '@/types';
import { buildBioPrompt } from './prompts';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function generateBio(
  stats: ProcessedPlayerStats,
  language: 'ko' | 'en' = 'en'
): Promise<string> {
  try {
    const prompt = buildBioPrompt(stats, language);

    const message = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 256,
      messages: [{ role: 'user', content: prompt }],
    });

    const textBlock = message.content.find(b => b.type === 'text');
    if (textBlock && textBlock.type === 'text') {
      return textBlock.text.trim();
    }

    return generateFallbackBio(stats, language);
  } catch (error) {
    console.error('AI bio generation failed, using fallback:', error);
    return generateFallbackBio(stats, language);
  }
}

export function generateFallbackBio(
  stats: ProcessedPlayerStats,
  language: 'ko' | 'en' = 'en'
): string {
  const { account, rank, overall, topAgents, playstyle } = stats;
  const topAgent = topAgents[0]?.agent ?? 'Unknown';

  if (language === 'ko') {
    const tierKo = rank.tierName;
    if (overall.kd >= 1.3) {
      return `${tierKo} ${account.name}, K/D ${overall.kd}의 ${playstyle.playstyleTag}. ${topAgent} 메인으로 헤드샷 ${overall.headshotPercent}%의 정확한 에임을 자랑합니다.`;
    }
    if (overall.winRate >= 55) {
      return `승률 ${overall.winRate}%의 승리 전문가 ${account.name}. ${tierKo} ${topAgent} 메인으로 팀의 핵심 역할을 수행합니다.`;
    }
    return `${tierKo} ${topAgent} 메인 ${account.name}. K/D ${overall.kd}, 승률 ${overall.winRate}%로 꾸준한 성장세를 보여줍니다.`;
  }

  if (overall.kd >= 1.3) {
    return `${rank.tierName} ${playstyle.playstyleTag} with a ${overall.kd} K/D. ${topAgent} main dropping ${overall.headshotPercent}% headshots.`;
  }
  if (overall.winRate >= 55) {
    return `${account.name}, a ${rank.tierName} ${topAgent} main with ${overall.winRate}% win rate. A true team player and clutch specialist.`;
  }
  return `${rank.tierName} ${topAgent} main. ${overall.kd} K/D across ${overall.totalGames} games with a ${playstyle.playstyleTag} approach.`;
}
