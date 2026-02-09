import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { loadFonts } from './font-loader';
import type { CardData } from '@/types';
import { NeonCyberTemplate } from '@/templates/neon-cyber';
import { CleanMinimalTemplate } from '@/templates/clean-minimal';
import { ValorantClassicTemplate } from '@/templates/valorant-classic';

const CARD_WIDTH = 800;
const CARD_HEIGHT = 450;

const templateMap = {
  'neon-cyber': NeonCyberTemplate,
  'clean-minimal': CleanMinimalTemplate,
  'valorant-classic': ValorantClassicTemplate,
};

export async function renderCard(data: CardData): Promise<Buffer> {
  const fonts = await loadFonts();
  const Template = templateMap[data.template];
  const element = Template({ data });

  const svg = await satori(element, {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    fonts: fonts.map(f => ({
      name: f.name,
      data: f.data,
      weight: f.weight,
      style: f.style,
    })),
  });

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width' as const, value: CARD_WIDTH },
  });

  const pngData = resvg.render();
  return Buffer.from(pngData.asPng());
}

export async function renderCardSvg(data: CardData): Promise<string> {
  const fonts = await loadFonts();
  const Template = templateMap[data.template];
  const element = Template({ data });

  return satori(element, {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    fonts: fonts.map(f => ({
      name: f.name,
      data: f.data,
      weight: f.weight,
      style: f.style,
    })),
  });
}
