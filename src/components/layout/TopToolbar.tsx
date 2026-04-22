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
    <div className="h-[76px] w-full flex items-center justify-between px-3 bg-white shrink-0 shadow-sm z-50">
      
      <div className="flex items-center gap-3">
        {/* 1. Avatar */}
        <button 
          id="toolbar-avatar" 
          onClick={onAvatarClick}
          className="relative w-14 h-14 rounded-full overflow-hidden border-[3px] border-[#0A84FF]/20 hover:border-[#0A84FF]/40 transition-colors shrink-0 bg-[#4DD0E1]"
        >
          <img 
            src={player.avatarUrl || ASSETS.defaultAvatar} 
            alt="Avatar" 
            className="w-full h-full object-cover" 
          />
        </button>

        {/* 2. Health */}
        <div 
          id="toolbar-health" 
          className="flex items-end gap-0.5"
        >
          <img src={healthIcon} alt="Health" className="h-9 object-contain" />
          <span className="text-[17px] font-medium text-black leading-none mb-1">{player.healthPercent}</span>
        </div>

        {/* 3. Diamonds */}
        <div 
          id="toolbar-diamonds" 
          className="flex items-end gap-1 ml-1"
        >
          <img src={ASSETS.diamond} alt="Diamonds" className="h-8 object-contain" />
          <span className="text-[17px] font-medium text-black leading-none mb-1">{player.diamondBalance.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* 4. Games [V2] */}
        <button 
          id="toolbar-games" 
          onClick={onGamesClick}
          className="relative flex items-center justify-center w-12 h-12 shrink-0 transition-transform active:scale-95"
        >
          <img src={ASSETS.swords} alt="Games" className="w-10 h-10 object-contain" />
          <span className="absolute bottom-0 -right-1 text-black font-medium text-[15px]">
            {activeGames}
          </span>
        </button>

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
          <img src={ASSETS.shop} alt="Shop" className="w-[46px] h-[46px] object-contain" />
        </button>
      </div>

    </div>
  );
}
