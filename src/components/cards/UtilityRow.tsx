interface UtilityRowProps {
  id: string;
  name: string;
  image: string;
  priceCoins: number;
  priceDiamonds: number;
  onInfoClick?: () => void;
  onBuyClick?: () => void;
}

export function UtilityRow({
  id,
  name,
  image,
  priceCoins,
  priceDiamonds,
  onInfoClick,
  onBuyClick,
}: UtilityRowProps) {
  return (
    <div
      id={`utility-${id}`}
      className="flex items-center gap-3 bg-white/10 rounded-xl px-3 py-2.5 border border-white/10"
    >
      {/* Icon */}
      <img src={image} alt={name} className="w-10 h-10 object-contain shrink-0" />

      {/* Prices */}
      <div className="flex-1 flex items-center gap-1 text-sm text-white/80">
        <span>🪙 {priceCoins.toLocaleString()}</span>
        <span className="text-white/30">|</span>
        <span>💎 {priceDiamonds}</span>
      </div>

      {/* Info button */}
      <button
        onClick={onInfoClick}
        className="text-blue-400 text-lg shrink-0"
        aria-label={`Info about ${name}`}
      >
        ⓘ
      </button>

      {/* Buy button */}
      <button
        onClick={onBuyClick}
        className="w-12 h-12 bg-[#0A84FF] rounded-xl flex items-center justify-center shrink-0 transition-transform active:scale-90"
        aria-label={`Buy ${name}`}
      >
        <span className="text-xl">🏪</span>
      </button>
    </div>
  );
}
