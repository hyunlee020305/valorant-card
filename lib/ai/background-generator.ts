import type { ProcessedPlayerStats } from '@/types';

function buildBackgroundPrompt(stats: ProcessedPlayerStats): string {
  const { topAgents, playstyle, rank } = stats;
  const mainAgent = topAgents[0]?.agent ?? 'unknown';
  const role = playstyle.rolePreference;

  const moodMap: Record<string, string> = {
    Duelist: 'aggressive fiery energy, red and orange flames, dynamic action',
    Controller: 'mysterious smoky atmosphere, purple and dark clouds, strategic',
    Sentinel: 'fortified defensive energy, green shields, protective aura',
    Initiator: 'electric scanning energy, blue lightning, reconnaissance',
    Flex: 'balanced energy, mixed colors, versatile',
  };

  const rankMood = rank.tier >= 24 ? 'legendary golden radiant glow, elite'
    : rank.tier >= 21 ? 'ascendant cosmic purple energy, powerful'
    : rank.tier >= 18 ? 'diamond crystalline blue sparkles, sharp'
    : rank.tier >= 15 ? 'platinum silver metallic sheen, polished'
    : 'dark atmospheric, gritty';

  const mood = moodMap[role] ?? moodMap.Flex;

  return `abstract gaming wallpaper, ${mood}, ${rankMood}, inspired by valorant agent ${mainAgent}, dark background, no text, no characters, no faces, digital art, 4k, cinematic lighting, volumetric fog`;
}

export async function generateBackground(stats: ProcessedPlayerStats): Promise<string> {
  const prompt = encodeURIComponent(buildBackgroundPrompt(stats));
  const seed = Math.floor(Math.random() * 100000);
  const url = `https://image.pollinations.ai/prompt/${prompt}?width=800&height=450&nologo=true&model=flux&seed=${seed}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Pollinations API error: ${res.status}`);
  }

  const buffer = await res.arrayBuffer();
  const base64 = Buffer.from(buffer).toString('base64');
  return `data:image/jpeg;base64,${base64}`;
}
