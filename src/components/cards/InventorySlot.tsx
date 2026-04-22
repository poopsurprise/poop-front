import React from 'react';
import type { InventorySlotProps } from '../../types/components';

export function InventorySlot({ slot, variant, lockLevel, onClick }: InventorySlotProps) {
  const isLocked = variant === 'locked';
  const isEmpty = variant === 'empty';
  
  if (isLocked) {
    return (
      <button
        id={`inventory-slot-${slot.position - 1}`}
        className="w-full aspect-square rounded-xl bg-black/40 flex flex-col items-center justify-center border border-white/5 opacity-70 cursor-not-allowed"
      >
        <span className="text-2xl opacity-50 mb-1">📦</span>
        {lockLevel && <span className="text-[10px] text-white/50">{lockLevel}</span>}
      </button>
    );
  }

  if (isEmpty || !slot.item) {
    return (
      <div 
        id={`inventory-slot-${slot.position - 1}`}
        className="w-full aspect-square rounded-xl bg-white/5 border border-white/10"
      />
    );
  }

  const { item } = slot;
  const isSick = item.state === 'sick';
  const isDead = item.state === 'dead';

  // Badges dir
  let badgeIcon = '';
  // According to mockups: 'attack' might have a specific badge, etc. Let's use generic emojis based on type temporarily.
  if (item.type === 'poop_attack') badgeIcon = '🔊';
  if (item.type === 'coin') badgeIcon = '';

  return (
    <button
      id={`inventory-slot-${slot.position - 1}`}
      onClick={onClick}
      className={`relative w-full aspect-square rounded-xl bg-[#2C2C2E] border border-white/10 flex flex-col items-center justify-center overflow-hidden transition-transform active:scale-95 ${
        isSick ? 'opacity-80' : isDead ? 'opacity-50 grayscale' : ''
      }`}
    >
      {/* Right top badge */}
      {badgeIcon && (
        <span className="absolute top-1 right-1 text-[10px]">{badgeIcon}</span>
      )}

      {/* Main image */}
      <img 
        src={item.image} 
        alt={item.name} 
        className="w-[60%] h-[60%] object-contain block mx-auto" 
      />

      {/* Mini avatar overlap */}
      {item.senderAvatar && (
        <div className="absolute left-1 bottom-1 w-5 h-5 rounded-full overflow-hidden border border-white/20 bg-gray-600">
          <img src={item.senderAvatar} alt="Sender" className="w-full h-full object-cover" />
        </div>
      )}

      {/* Occupation bar */}
      <div className="absolute right-1 bottom-2 flex flex-col items-end gap-0.5">
         {/* Fake occupation bar - just visuals */}
         <div className="w-8 h-1 bg-white/20 rounded overflow-hidden">
            <div className="h-full bg-green-500 w-[70%]" />
         </div>
         <span className="text-[8px] font-bold text-white/80">35</span>
      </div>
    </button>
  );
}
