import { ASSETS } from '../constants/assets';

/**
 * Maps backend item images to actual asset paths.
 * The backend stores generic paths like /items/soft-poop-default.png
 * We map these to the real assets in /assets/img/
 */
const IMAGE_MAP: Record<string, string> = {
  '/items/soft-poop-default.png': ASSETS.poop3,
  '/items/coin-default.png': ASSETS.coinGold,
  '/items/attack-poop-default.png': ASSETS.poop5,
  '/items/collectible-poop-default.png': ASSETS.poop6,
  '/items/toilet-paper-default.png': ASSETS.toiletPaper,
  '/items/boost-default.png': ASSETS.poop7,

  // Fallbacks para os paths criados pelo backend na inicialização
  '/assets/poops/smill.png': ASSETS.poop3,
  '/assets/poops/nome.png': ASSETS.poop4,
  '/assets/poops/soft1.png': ASSETS.poop5,
  '/assets/poops/soft2.png': ASSETS.poop6,
  '/assets/poops/soft3.png': ASSETS.poop7,

  // Coins
  '/assets/poops/moeda_furada.png': ASSETS.coinHole,
  '/assets/poops/moeda furada.png': ASSETS.coinHole,
  '/items/moeda furada.png': ASSETS.coinHole,
  '/assets/poops/coin.png': ASSETS.coinGold,
  '/items/coin.png': ASSETS.coinGold,
};

/**
 * Resolve a backend item image path to a real frontend asset path.
 * Falls back to a poop image if not mapped.
 */
export function resolveItemImage(backendPath: string | null | undefined): string {
  if (!backendPath) return ASSETS.poop3;
  
  // Clean up URL just in case
  const path = backendPath.replace(' ', '-');
  
  if (IMAGE_MAP[backendPath]) return IMAGE_MAP[backendPath];
  if (IMAGE_MAP[path]) return IMAGE_MAP[path];
  
  // If it starts with /assets/img/, it's a direct frontend path we can trust
  if (backendPath.startsWith('/assets/img/')) return backendPath;
  
  return ASSETS.poop3;
}

/**
 * Deduz o tipo de badge (ícone no canto superior direito) com base no itemType ou image.
 */
export function resolveItemBadge(itemType: string, backendPath?: string | null): string | null {
  if (!itemType) return null;
  const typeUpper = itemType.toUpperCase();
  
  if (typeUpper.includes('ATTACK') || backendPath?.includes('attack')) return 'thief'; // 🏴‍☠️
  if (typeUpper.includes('COLLECTIBLE') || backendPath?.includes('collectible')) return 'book'; // 📖
  if (typeUpper.includes('BOOST') || backendPath?.includes('boost')) return 'medical'; // ➕
  
  // Por defeito, os poops normais têm som
  if (typeUpper.includes('SOFT') || typeUpper.includes('POOP')) return 'sound'; // 🔊
  
  return null;
}
