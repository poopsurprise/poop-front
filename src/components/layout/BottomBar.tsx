import React from 'react';
import type { BottomBarProps } from '../../types/components';
import { ASSETS } from '../../constants/assets';

export function BottomBar({ level, progress, onChestClick }: BottomBarProps) {
  return (
    <div className="h-[56px] w-full bg-[#4CAF50] flex items-center justify-between px-6 shrink-0 shadow-[0_-4px_10px_rgba(0,0,0,0.2)] z-50">
      
      {/* 1. Level */}
      <div className="flex items-center gap-2">
        <img src={ASSETS.nivel} alt="Level" className="w-6 h-6 object-contain" />
        <span className="text-white font-bold text-lg">{level}</span>
      </div>

      {/* 2. Chest Button */}
      <button 
        id="btn-chest"
        onClick={onChestClick}
        className="relative transition-transform active:scale-95 -top-4 w-16 h-16 bg-[#2C2C2E] rounded-full border-4 border-[#4CAF50] flex items-center justify-center shadow-lg"
      >
        <img src={ASSETS.chest} alt="Chest" className="w-10 h-10 object-contain" />
      </button>

      {/* 3. Progress */}
      <div className="flex items-center gap-2">
        <span className="text-white font-bold text-lg">{progress}</span>
        <img src={ASSETS.poopLevel} alt="Poop" className="w-6 h-6 object-contain" />
      </div>

    </div>
  );
}
