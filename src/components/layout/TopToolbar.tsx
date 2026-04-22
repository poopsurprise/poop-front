import React from 'react';
import type { TopToolbarProps } from '../../types/components';
import { ASSETS } from '../../constants/assets';

export function TopToolbar({
  player,
  activeGames = 0,
  onAvatarClick,
  onFriendsClick,
  onShopClick,
  onGamesClick,
}: TopToolbarProps) {
  // Select health icon based on percentage
  let healthIcon = ASSETS.healthBody1;
  if (player.healthPercent === 0) {
    healthIcon = ASSETS.skeleton;
  } else if (player.healthPercent < 30) {
    healthIcon = ASSETS.healthBody3;
  } else if (player.healthPercent < 70) {
    healthIcon = ASSETS.healthBody2;
  }

  return (
    <div className="h-[72px] w-full flex items-center justify-between px-3 bg-[#1C1C1E] border-b border-white/10 shrink-0">
      
      {/* 1. Avatar */}
      <button 
        id="toolbar-avatar" 
        onClick={onAvatarClick}
        className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 hover:border-white/40 transition-colors shrink-0"
      >
        <img 
          src={player.avatarUrl || ASSETS.defaultAvatar} 
          alt="Avatar" 
          className="w-full h-full object-cover bg-gray-800"
        />
      </button>

      {/* 2. Health */}
      <div 
        id="toolbar-health" 
        className="flex items-center gap-1 bg-black/30 rounded-full px-2 py-1"
      >
        <img src={healthIcon} alt="Health" className="h-7 object-contain" />
        <span className="text-sm font-bold text-white">{player.healthPercent}%</span>
      </div>

      {/* 3. Diamonds */}
      <div 
        id="toolbar-diamonds" 
        className="flex items-center gap-1 bg-black/30 rounded-full px-2 py-1"
      >
        <span className="text-base">💎</span>
        <span className="text-sm font-bold text-white">{player.diamondBalance.toFixed(1)}</span>
      </div>

      {/* 4. Games [V2] */}
      <button 
        id="toolbar-games" 
        onClick={onGamesClick}
        className="relative flex items-center justify-center bg-black/30 w-10 h-10 rounded-full shrink-0 transition-transform active:scale-95"
      >
        <img src={ASSETS.swords} alt="Games" className="h-6 object-contain" />
        {activeGames > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
            {activeGames}
          </span>
        )}
      </button>

      <div className="flex items-center gap-1">
        {/* 5. Friends */}
        <button 
          id="toolbar-friends" 
          onClick={onFriendsClick}
          className="shrink-0 transition-transform active:scale-95"
        >
          <img src={ASSETS.friends} alt="Friends" className="w-10 h-10 object-contain" />
        </button>

        {/* 6. Shop */}
        <button 
          id="toolbar-shop" 
          onClick={onShopClick}
          className="shrink-0 transition-transform active:scale-95"
        >
          <img src={ASSETS.shop} alt="Shop" className="w-10 h-10 object-contain" />
        </button>
      </div>

    </div>
  );
}
