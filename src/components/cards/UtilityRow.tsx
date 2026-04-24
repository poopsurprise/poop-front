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
      className="flex items-center gap-3 bg-white rounded-2xl px-3 py-2 shadow-sm border border-gray-100"
    >
      {/* Icon Area */}
      <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center shrink-0 border border-gray-100 p-1">
        <img src={image} alt={name} className="w-full h-full object-contain" />
      </div>

      {/* Prices */}
      <div className="flex-1 flex items-center justify-between pl-2">
         <div className="flex items-center gap-3 text-sm text-gray-500 font-bold">
           <div className="flex items-center gap-1">
             <img src="/assets/img/moeda furada.png" alt="Coin" className="w-4 h-4 object-contain" />
             <span>{priceCoins >= 1000000 ? `${priceCoins / 1000000}M` : priceCoins}</span>
           </div>
           <span className="text-gray-300">|</span>
           <div className="flex items-center gap-1">
             <img src="/assets/img/diamante.png" alt="Diamond" className="w-4 h-4 object-contain" />
             <span>{priceDiamonds}</span>
           </div>
         </div>

         {/* Info button */}
         <button
           onClick={onInfoClick}
           className="text-gray-400 text-lg shrink-0 px-2 active:scale-95 transition-transform"
           aria-label={`Info about ${name}`}
         >
           ⓘ
         </button>
      </div>

      {/* Buy button */}
      <button
        onClick={onBuyClick}
        className="w-14 h-14 bg-[#4A72D6] rounded-xl shadow-[0_4px_0_#3352A3] flex items-center justify-center shrink-0 transition-transform active:translate-y-1 active:shadow-none"
        aria-label={`Buy ${name}`}
      >
        <img src="/assets/img/caixa registadora.png" alt="Buy" className="w-8 h-8 object-contain" onError={(e) => { e.currentTarget.src = ''; e.currentTarget.alt = '🏪' }} />
      </button>
    </div>
  );
}
