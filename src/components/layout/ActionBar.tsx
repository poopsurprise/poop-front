import React from 'react';
import type { ActionBarProps } from '../../types/components';

export function ActionBar({
  piggyBalance,
  paperStock,
  deliveryAvailable,
  fanAvailable,
  onPiggyClick,
  onPaperClick,
  onDeliveryClick,
  onFanClick,
}: ActionBarProps) {
  
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="h-[90px] w-full flex items-end justify-between px-4 pb-2 bg-[#1C1C1E] shrink-0 gap-2">
      
      {/* 1. Piggy Balance */}
      <button 
        id="action-piggy"
        onClick={onPiggyClick}
        className="flex-1 flex flex-col items-center justify-end h-full relative group transition-transform active:scale-95"
      >
        <div className="w-full bg-[#2C2C2E] rounded-xl h-20 flex flex-col items-center justify-end pb-1 border border-white/5 relative z-0">
           {/* Overlapping icon */}
           <img 
            src="/assets/img/porquinho 1.png" 
            alt="Piggy Bank" 
            className="absolute -top-4 w-12 object-contain z-10"
          />
          <span className="text-[12px] font-bold text-white">{formatNumber(piggyBalance)}</span>
        </div>
      </button>

      {/* 2. Paper Stock */}
      <button 
        id="action-paper"
        onClick={onPaperClick}
        className="flex-1 flex flex-col items-center justify-end h-full relative group transition-transform active:scale-95"
      >
        <div className="w-[72px] h-[72px] rounded-full bg-[#2C2C2E] flex flex-col items-center justify-end pb-2 border border-white/5 relative z-0 mx-auto">
          <img 
            src="/assets/img/papel sem fundo2 1.png" 
            alt="Toilet Paper" 
            className="absolute -top-3 w-10 object-contain z-10"
          />
          <span className="text-[12px] font-bold text-white">{paperStock}</span>
        </div>
      </button>

      {/* 3. Delivery */}
      <button 
        id="action-delivery"
        onClick={onDeliveryClick}
        className="flex-1 flex flex-col items-center justify-end h-full relative group transition-transform active:scale-95"
      >
        <div className="w-full bg-[#2C2C2E] rounded-xl h-20 flex flex-col items-center justify-end pb-1 border border-white/5 relative z-0">
          <img 
            src="/assets/img/delivery 1.png" 
            alt="Delivery Scooter" 
            className="absolute -top-3 w-12 object-contain z-10"
          />
          <span className="text-[12px] font-bold text-white">{deliveryAvailable}</span>
        </div>
      </button>

      {/* 4. Fan */}
      <button 
        id="action-fan"
        onClick={onFanClick}
        className="flex-1 flex flex-col items-center justify-end h-full relative group transition-transform active:scale-95"
      >
        <div className="w-full bg-[#2C2C2E] rounded-xl h-20 flex flex-col items-center justify-end pb-1 border border-white/5 relative z-0">
          <img 
            src="/assets/img/ventildor 1.png" 
            alt="Fan" 
            className="absolute -top-4 w-12 object-contain z-10"
          />
          <span className="text-[12px] font-bold text-white">{fanAvailable}</span>
        </div>
      </button>

    </div>
  );
}
