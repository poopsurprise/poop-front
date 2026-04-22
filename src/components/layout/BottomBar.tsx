import React from 'react';
import type { BottomBarProps } from '../../types/components';

export function BottomBar({ level, progress, onChestClick }: BottomBarProps) {
  return (
    <div className="h-[56px] w-full bg-[#4CAF50] flex items-center justify-between px-6 shrink-0 shadow-[0_-4px_10px_rgba(0,0,0,0.2)] z-50">
      
      {/* 1. Level */}
      <div className="flex items-center gap-2">
        <span className="text-white text-2xl">⭐</span>
        <span className="text-white font-bold text-lg">{level}</span>
      </div>

      {/* 2. Chest Button */}
      <button 
        id="btn-chest"
        onClick={onChestClick}
        className="relative transition-transform active:scale-95 -top-4 w-16 h-16 bg-[#2C2C2E] rounded-full border-4 border-[#1C1C1E] flex items-center justify-center shadow-lg"
      >
        <span className="text-3xl">📦</span>
      </button>

      {/* 3. Progress */}
      <div className="flex items-center gap-2">
        <span className="text-white font-bold text-lg">{progress}</span>
        <span className="text-2xl">💩</span>
      </div>

    </div>
  );
}
