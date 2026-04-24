/**
 * Maps backend item images to actual asset paths.
 * The backend stores generic paths like /items/soft-poop-default.png
 * We map these to the real assets in /assets/img/
 */

const IMAGE_MAP: Record<string, string> = {
  '/items/soft-poop-default.png': '/assets/img/poop3 6.png',
  '/items/coin-default.png': '/assets/img/coin-gold.png',
  '/items/attack-poop-default.png': '/assets/img/poop3 3.png',
  '/items/collectible-poop-default.png': '/assets/img/poop3 4.png',
  '/items/toilet-paper-default.png': '/assets/img/papel.png',
  '/items/boost-default.png': '/assets/img/poop3 2.png',
};

/**
 * Resolve a backend item image path to a real frontend asset path.
 * Falls back to a poop image if not mapped.
 */
export function resolveItemImage(backendPath: string | null | undefined): string {
  if (!backendPath) return '/assets/img/poop3 6.png';
  
  // If it starts with /assets/, it's already a frontend path
  if (backendPath.startsWith('/assets/')) return backendPath;
  
  return IMAGE_MAP[backendPath] ?? '/assets/img/poop3 6.png';
}
