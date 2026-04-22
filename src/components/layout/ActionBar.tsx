import React from 'react';
import type { ActionBarProps } from '../../types/components';
import { ASSETS } from '../../constants/assets';

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

  const itemBase = "flex flex-col items-center justify-end h-full relative transition-transform active:scale-95";
  const labelStyle = "text-[11px] font-bold text-white mt-0.5";

  return (
    <div className="h-[100px] w-full flex items-end justify-between px-3 pb-2 bg-[#555555] shrink-0 gap-2">
      
      {/* 1. Piggy Balance — Rectângulo arredondado */}
      <button id="action-piggy" onClick={onPiggyClick} className={`flex-1 ${itemBase}`}>
        <div className="w-full bg-[#6b6b6b] rounded-xl h-[80px] flex flex-col items-center justify-center border border-white/10 relative overflow-visible">
          <img 
            src={ASSETS.piggyBank}
            alt="Piggy Bank" 
            className="w-14 h-14 object-contain -mt-2"
          />
          <span className={labelStyle}>{formatNumber(piggyBalance)}</span>
        </div>
      </button>

      {/* 2. Paper Stock — CÍRCULO com borda cyan (diferente dos outros!) */}
      <button id="action-paper" onClick={onPaperClick} className={`flex-1 ${itemBase}`}>
        <div className="w-[80px] h-[80px] rounded-2xl bg-[#6b6b6b] flex flex-col items-center justify-center border-[3px] border-[#4DD0E1] mx-auto relative overflow-visible">
          <img 
            src={ASSETS.toiletPaper}
            alt="Toilet Paper" 
            className="w-12 h-12 object-contain -mt-1"
          />
          <span className={labelStyle}>{paperStock}</span>
        </div>
      </button>

      {/* 3. Delivery — Rectângulo arredondado */}
      <button id="action-delivery" onClick={onDeliveryClick} className={`flex-1 ${itemBase}`}>
        <div className="w-full bg-[#6b6b6b] rounded-xl h-[80px] flex flex-col items-center justify-center border border-white/10 relative overflow-visible">
          <img 
            src={ASSETS.deliveryScooter}
            alt="Delivery Scooter" 
            className="w-14 h-14 object-contain -mt-2"
          />
          <span className={labelStyle}>{deliveryAvailable}</span>
        </div>
      </button>

      {/* 4. Fan — Rectângulo arredondado */}
      <button id="action-fan" onClick={onFanClick} className={`flex-1 ${itemBase}`}>
        <div className="w-full bg-[#6b6b6b] rounded-xl h-[80px] flex flex-col items-center justify-center border border-white/10 relative overflow-visible">
          <img 
            src={ASSETS.fan}
            alt="Fan" 
            className="w-14 h-14 object-contain -mt-2"
          />
          <span className={labelStyle}>{fanAvailable}</span>
        </div>
      </button>

    </div>
  );
}
