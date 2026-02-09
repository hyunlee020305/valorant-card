import type { ProcessedPlayerStats } from '@/types';

export function buildBioPrompt(stats: ProcessedPlayerStats, language: 'ko' | 'en'): string {
  const { account, rank, overall, topAgents, recentForm, playstyle } = stats;

  const topAgentNames = topAgents.map(a => `${a.agent} (${a.games}games, ${a.kd}KD)`).join(', ');
  const formStr = recentForm.lastFiveResults.join('');

  const dataBlock = `
Player: ${account.name}#${account.tag}
Rank: ${rank.tierName} (${rank.rankInTier}RR)
Total Games: ${overall.totalGames}
Win Rate: ${overall.winRate}%
K/D: ${overall.kd}
Headshot%: ${overall.headshotPercent}%
Avg Damage/Round: ${overall.avgDamagePerRound}
Top Agents: ${topAgentNames}
Recent Form (last 5): ${formStr}
Recent K/D: ${recentForm.recentKD}
Playstyle: ${playstyle.playstyleTag}
Role: ${playstyle.rolePreference}
Aggression: ${playstyle.aggression}/100
Accuracy: ${playstyle.accuracy}/100
Strengths: ${playstyle.strengths.join(', ')}
`.trim();

  if (language === 'ko') {
    return `당신은 발로란트 e스포츠 전문 캐스터입니다. 아래 플레이어의 전적 데이터를 보고, 이 플레이어를 소개하는 임팩트 있는 프로필 바이오를 2-3문장으로 작성하세요.

규칙:
- 한국어로 작성
- e스포츠 캐스터처럼 역동적이고 인상적인 어투
- 플레이어의 강점과 플레이스타일을 강조
- 구체적인 수치를 자연스럽게 포함
- 과장하지 말고 데이터에 기반
- 2-3문장, 100자 이내

플레이어 데이터:
${dataBlock}

프로필 바이오:`;
  }

  return `You are a Valorant esports analyst. Based on the player stats below, write an impactful 2-3 sentence player bio.

Rules:
- Write in English
- Use dynamic, esports caster-like tone
- Highlight player strengths and playstyle
- Include specific stats naturally
- Don't exaggerate, stay data-driven
- 2-3 sentences, under 150 characters

Player Data:
${dataBlock}

Profile Bio:`;
}

export function buildCardImagePrompt(
  stats: ProcessedPlayerStats,
  bio: string,
  language: 'ko' | 'en'
): string {
  const { account, rank, overall, topAgents, playstyle, recentForm } = stats;
  const mainAgent = topAgents[0]?.agent ?? 'Unknown';
  const topAgentNames = topAgents.slice(0, 3).map(a => a.agent).join(', ');

  const agentColors: Record<string, string> = {
    Jett: 'cyan and white with wind streaks',
    Reyna: 'purple and magenta with soul orbs',
    Phoenix: 'orange and gold with fire effects',
    Raze: 'orange and yellow with explosive sparks',
    Yoru: 'dark blue and indigo with rift portals',
    Neon: 'electric cyan and blue with lightning bolts',
    Iso: 'violet and radiant purple glow',
    Sage: 'jade green and emerald with crystal healing',
    Cypher: 'gold and amber with surveillance wires',
    Killjoy: 'yellow and gold with tech circuits',
    Chamber: 'elegant gold and luxury black',
    Deadlock: 'steel blue-gray with cold metallic',
    Omen: 'deep purple and shadow dark',
    Brimstone: 'military orange-red with smoke',
    Astra: 'cosmic purple with star nebula',
    Viper: 'toxic green with poison mist',
    Harbor: 'ocean blue-teal with water waves',
    Clove: 'ethereal pink-purple with butterfly',
    Sova: 'recon blue with owl motif',
    Breach: 'seismic orange with fault lines',
    Skye: 'forest green with nature vines',
    KAY_O: 'robotic steel-blue with circuit lines',
    Fade: 'nightmare dark purple with shadow tendrils',
    Gekko: 'lime green with creature slime',
  };

  const agentTheme = agentColors[mainAgent] ?? 'Valorant red (#FF4655) with tactical dark theme';

  return `Generate a premium esports player card image for a Valorant player. This should look like a professional trading card or esports profile card.

CARD DESIGN REQUIREMENTS:
- Style: Dark, premium gaming aesthetic. Think esports tournament player cards.
- Aspect ratio: 16:9 widescreen format
- Color theme: ${agentTheme} (based on main agent: ${mainAgent})
- Background: Abstract gaming/esports themed with the agent's color palette. Dark base with glowing accents.
- Layout: Clean, modern, data-rich but not cluttered

TEXT CONTENT TO INCLUDE ON THE CARD (must be clearly readable):
- Player name: "${account.name}" (large, prominent)
- Tag: "#${account.tag}" (smaller, next to name)
- Rank: "${rank.tierName}" with ${rank.rankInTier} RR
- Main Agent: ${mainAgent}
- Top Agents: ${topAgentNames}

STATS TO DISPLAY:
- K/D: ${overall.kd}
- Win Rate: ${overall.winRate}%
- Headshot%: ${overall.headshotPercent}%
- ADR: ${overall.avgDamagePerRound}
- Games: ${overall.totalGames}

PLAYER BIO (include as a quote or subtitle):
"${bio}"

ADDITIONAL INFO:
- Role: ${playstyle.rolePreference}
- Playstyle: ${playstyle.playstyleTag}
- Aggression: ${playstyle.aggression}/100
- Accuracy: ${playstyle.accuracy}/100

IMPORTANT DESIGN NOTES:
- All text must be sharp, clear, and readable
- Use modern gaming typography (bold, clean sans-serif)
- Include subtle Valorant-inspired geometric patterns or angular shapes
- Add a slight glow/neon effect matching the agent's color theme
- The overall feel should be like a collectible esports card
- Do NOT include any real photos of people
- Do NOT include any copyrighted Valorant logos or exact character art`;
}
