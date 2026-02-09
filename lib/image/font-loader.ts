import { readFile } from 'fs/promises';
import { join } from 'path';

interface FontData {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 700;
  style: 'normal';
}

let fontsCache: FontData[] | null = null;

export async function loadFonts(): Promise<FontData[]> {
  if (fontsCache) return fontsCache;

  const fontDir = join(process.cwd(), 'public', 'fonts');

  const [interRegular, interBold, pretendardRegular, pretendardBold] = await Promise.all([
    readFile(join(fontDir, 'Inter-Regular.woff')),
    readFile(join(fontDir, 'Inter-Bold.woff')),
    readFile(join(fontDir, 'Pretendard-Regular.woff')),
    readFile(join(fontDir, 'Pretendard-Bold.woff')),
  ]);

  fontsCache = [
    { name: 'Inter', data: interRegular.buffer as ArrayBuffer, weight: 400, style: 'normal' },
    { name: 'Inter', data: interBold.buffer as ArrayBuffer, weight: 700, style: 'normal' },
    { name: 'Pretendard', data: pretendardRegular.buffer as ArrayBuffer, weight: 400, style: 'normal' },
    { name: 'Pretendard', data: pretendardBold.buffer as ArrayBuffer, weight: 700, style: 'normal' },
  ];

  return fontsCache;
}
