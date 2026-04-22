import React from 'react';
import type { TopToolbarProps } from '../../types/components';

export function TopToolbar({
  player,
  activeGames = 0,
  onAvatarClick,
  onFriendsClick,
  onShopClick,
  onGamesClick,
}: TopToolbarProps) {
  // Select health icon based on percentage
  let healthIcon = '/assets/img/health-figure.png'; // Need to map correctly if multiple exists. There are "human body-1.png", "human body-2.png", "human body-3.png", "esqueleto 2.png"
  if (player.healthPercent === 0) {
    healthIcon = '/assets/img/esqueleto 2.png';
  } else if (player.healthPercent < 30) {
    healthIcon = '/assets/img/human body-3.png';
  } else if (player.healthPercent < 70) {
    healthIcon = '/assets/img/human body-2.png';
  } else {
    healthIcon = '/assets/img/human body-1.png';
  }

  return (
    <div className="h-[72px] w-full flex items-center justify-between px-4 bg-[#1C1C1E] border-b border-white/10 shrink-0">
      
      {/* 1. Avatar */}
      <button 
        id="toolbar-avatar" 
        onClick={onAvatarClick}
        className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 hover:border-white/40 transition-colors"
      >
        <img 
          src={player.avatarUrl || '/assets/img/image 12.png'} 
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
        <img src="/assets/img/diamond.png" alt="Diamonds" className="h-5 object-contain" />
        <span className="text-sm font-bold text-white">{player.diamondBalance.toFixed(1)}</span>
      </div>

      {/* 4. Games [V2] */}
      <button 
        id="toolbar-games" 
        onClick={onGamesClick}
        className="relative flex items-center justify-center bg-black/30 w-10 h-10 rounded-full"
      >
        <img src="/assets/img/swords-icon.png" alt="Games" className="h-5 object-contain" />
        {activeGames > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
            {activeGames}
          </span>
        )}
      </button>

      <div className="flex items-center gap-2">
        {/* 5. Friends */}
        <button 
          id="toolbar-friends" 
          onClick={onFriendsClick}
          className="shrink-0 transition-transform active:scale-95"
        >
          <img src="/assets/img/friends-group.png" alt="Friends" className="w-14 h-12 object-contain" />
        </button>

        {/* 6. Shop */}
        <button 
          id="toolbar-shop" 
          onClick={onShopClick}
          className="shrink-0 transition-transform active:scale-95"
        >
          <img src="/assets/img/shop-icon.png" alt="Shop" className="w-14 h-12 object-contain" />
        </button>
      </div>

    </div>
  );
}
