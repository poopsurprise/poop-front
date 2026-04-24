interface PoopCardProps {
  id: string;
  name: string;
  image: string;
  priceCoins?: number;
  priceDiamonds?: number;
  badge?: 'sound' | 'thief' | 'collectible' | 'search' | 'boost' | null;
  displayMode: 'catalog' | 'chest';
  onClick?: () => void;
}

const BADGE_ICONS: Record<string, string> = {
  sound: '🔊',
  thief: '🏴‍☠️',
  collectible: '📖',
  search: '🔍',
  boost: '🅱️',
};

export function PoopCard({
  id,
  name,
  image,
  priceCoins,
  priceDiamonds,
  badge,
  displayMode,
  onClick,
}: PoopCardProps) {
  return (
    <button
      id={`poop-card-${id}`}
      onClick={onClick}
      className="bg-white rounded-xl p-2 flex flex-col items-center gap-1 shadow-sm border border-gray-100 transition-transform active:scale-95 relative"
    >
      {/* Info badge top-left */}
      <span className="absolute top-1.5 left-1.5 text-[10px] text-blue-400">ⓘ</span>

      {/* Type badge top-right */}
      {badge && (
        <span className="absolute top-1.5 right-1.5 text-xs">
          {BADGE_ICONS[badge] ?? ''}
        </span>
      )}

      {/* Poop image */}
      <div className="w-16 h-16 flex items-center justify-center">
        <img src={image} alt={name} className="max-w-full max-h-full object-contain" />
      </div>

      {/* Price or Name */}
      {displayMode === 'catalog' ? (
        <div className="flex items-center gap-1 text-xs text-gray-600">
          {priceCoins != null && <span>🪙 {priceCoins.toLocaleString()}</span>}
          {priceDiamonds != null && priceCoins != null && <span className="text-gray-300">|</span>}
          {priceDiamonds != null && <span>💎 {priceDiamonds}</span>}
        </div>
      ) : (
        <span className="text-xs text-gray-700 truncate max-w-full">{name}</span>
      )}
    </button>
  );
}
