import React from 'react';
import { useDroppable, useDraggable } from '@dnd-kit/core';
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

  // Drop zones
  const { setNodeRef: setPiggyRef, isOver: isPiggyOver } = useDroppable({ id: 'drop-piggy' });
  const { setNodeRef: setDeliveryRef, isOver: isDeliveryOver } = useDroppable({ id: 'drop-delivery' });
  const { setNodeRef: setFanRef, isOver: isFanOver } = useDroppable({ id: 'drop-fan' });

  // Draggable Paper
  const { attributes: paperAttrs, listeners: paperListeners, setNodeRef: setPaperRef, isDragging: isPaperDragging } = useDraggable({
    id: 'drag-paper',
    data: { type: 'paper' }
  });

  return (
    <div className="h-[100px] w-full flex items-end justify-between px-3 pb-2 bg-[#555555] shrink-0 gap-2">
      
      {/* 1. Piggy Balance */}
      <button ref={setPiggyRef} id="action-piggy" onClick={onPiggyClick} className={`flex-1 ${itemBase} ${isPiggyOver ? 'scale-105' : ''}`}>
        <div className={`w-full bg-[#6b6b6b] rounded-xl h-[80px] flex flex-col items-center justify-center border ${isPiggyOver ? 'border-green-400 bg-green-400/20' : 'border-white/10'} relative overflow-visible transition-colors`}>
          <img 
            src={ASSETS.piggyBank}
            alt="Piggy Bank" 
            className="w-14 h-14 object-contain -mt-2"
          />
          <span className={labelStyle}>{formatNumber(piggyBalance)}</span>
        </div>
      </button>

      {/* 2. Paper Stock */}
      <button ref={setPaperRef} {...paperListeners} {...paperAttrs} id="action-paper" onClick={onPaperClick} className={`flex-1 ${itemBase} ${isPaperDragging ? 'opacity-50' : ''}`}>
        <div className="w-full bg-[#6b6b6b] rounded-xl h-[80px] flex flex-col items-center justify-center border border-white/10 relative overflow-visible">
          <img 
            src={ASSETS.toiletPaper}
            alt="Toilet Paper" 
            className="w-12 h-12 object-contain -mt-2 drop-shadow-sm"
          />
          <span className={labelStyle}>{paperStock}</span>
        </div>
      </button>

      {/* 3. Delivery */}
      <button ref={setDeliveryRef} id="action-delivery" onClick={onDeliveryClick} className={`flex-1 ${itemBase} ${isDeliveryOver ? 'scale-105' : ''}`}>
        <div className={`w-full bg-[#6b6b6b] rounded-xl h-[80px] flex flex-col items-center justify-center border ${isDeliveryOver ? 'border-blue-400 bg-blue-400/20' : 'border-white/10'} relative overflow-visible transition-colors`}>
          <img 
            src={ASSETS.deliveryScooter}
            alt="Delivery Scooter" 
            className="w-14 h-14 object-contain -mt-2"
          />
          <span className={labelStyle}>{deliveryAvailable}</span>
        </div>
      </button>

      {/* 4. Fan */}
      <button ref={setFanRef} id="action-fan" onClick={onFanClick} className={`flex-1 ${itemBase} ${isFanOver ? 'scale-105' : ''}`}>
        <div className={`w-full bg-[#6b6b6b] rounded-xl h-[80px] flex flex-col items-center justify-center border ${isFanOver ? 'border-yellow-400 bg-yellow-400/20' : 'border-white/10'} relative overflow-visible transition-colors`}>
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
