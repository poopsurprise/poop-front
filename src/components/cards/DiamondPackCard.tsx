import { ASSETS } from '../../constants/assets';

interface DiamondPackCardProps {
  index: number;
  quantity: number;
  originalPrice: string;
  discountedPrice: string;
  promoText?: string;
  onBuyClick?: () => void;
}

export function DiamondPackCard({
  index,
  quantity,
  originalPrice,
  discountedPrice,
  promoText = 'Special Offer!',
  onBuyClick,
}: DiamondPackCardProps) {
  // More diamonds = more icons
  const diamondIcons = Math.min(Math.ceil(quantity / 200), 3);

  return (
    <div
      id={`diamond-pack-${index}`}
      className="min-w-[140px] bg-gradient-to-b from-[#7B61FF]/20 to-[#7B61FF]/5 rounded-2xl p-3 flex flex-col items-center gap-2 border border-[#7B61FF]/30 shrink-0"
    >
      {/* Diamond icons */}
      <div className="flex items-center gap-0.5">
        {Array.from({ length: diamondIcons }).map((_, i) => (
          <img key={i} src={ASSETS.diamond} alt="" className="w-6 h-6 object-contain" />
        ))}
      </div>

      {/* Quantity */}
      <span className="text-white font-bold text-xl">{quantity}</span>

      {/* Original price (strikethrough) */}
      <span className="text-white/40 text-sm line-through">{originalPrice}</span>

      {/* Discounted price */}
      <span className="text-white font-bold text-base">{discountedPrice}</span>

      {/* Promo text */}
      <span className="text-[#FFD700] text-[10px] font-medium">{promoText}</span>

      {/* Buy button */}
      <button
        id={`btn-buy-diamond-pack-${index}`}
        onClick={onBuyClick}
        className="w-full py-2 bg-[#0A84FF] rounded-xl text-white text-sm font-bold transition-all active:scale-95 hover:bg-[#0A84FF]/90"
      >
        BUY NOW
      </button>
    </div>
  );
}
