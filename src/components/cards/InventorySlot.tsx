import React from 'react';
import { ASSETS } from '../../constants/assets';

export interface SlotItem {
  id: string;
  type: string;        // 'poop_soft' | 'poop_attack' | 'coin' | 'collectible'
  name: string;
  image: string;
  state: string;       // 'active' | 'sick' | 'dead'
  badge?: string | null;     
  senderAvatar?: string | null;
  occupationPercent?: number;  
  occupationCount?: number;    
}

export interface InventorySlotProps {
  position: number;
  unlocked: boolean;
  item: SlotItem | null;
  lockLevel?: number;    
  onClick?: () => void;
  isSelected?: boolean;
}

function getBadgeIcon(badge: string | null | undefined): string | null {
  switch (badge) {
    case 'sound':   return '🔊';
    case 'medical': return '➕';
    case 'spy':     return '🔍';
    case 'thief':   return '🏴‍☠️';
    case 'pirate':  return '🏴‍☠️';
    case 'book':    return '📖';
    case 'banned':  return '⊘';
    default:        return null;
  }
}

export function InventorySlot({ position, unlocked, item, lockLevel, onClick, isSelected }: InventorySlotProps) {
  
  // ── Variação C — Bloqueado ──
  if (!unlocked) {
    return (
      <div id={`inventory-slot-${position - 1}`} className="relative w-full aspect-square cursor-not-allowed">
        {/* Number Tab */}
        <div className="absolute -top-1 -left-1 w-7 h-7 rounded-full bg-white/30 backdrop-blur-sm shadow-sm z-20 flex items-center justify-center">
          <span className="text-[11px] font-bold text-white/50">{position}</span>
        </div>
        {/* Main Glass Body */}
        <div className="absolute inset-0 bg-white/30 backdrop-blur-sm rounded-[18px] flex flex-col items-center justify-center border border-white/10 shadow-inner">
          <img src={ASSETS.box} alt="Locked" className="w-[50%] h-[50%] object-contain drop-shadow-sm opacity-80" />
        </div>
      </div>
    );
  }

  // ── Variação B — Vazio ──
  if (!item) {
    return (
      <button id={`inventory-slot-${position - 1}`} onClick={onClick} className="relative w-full aspect-square">
        {/* Number Tab (Círculo de Amigos) */}
        <div className="absolute -top-1 -left-1 w-7 h-7 rounded-full bg-white shadow-md z-30 flex items-center justify-center border-2 border-white/80">
          <span className="text-[12px] font-bold text-gray-400">{position}</span>
        </div>
        {/* Main Body */}
        <div className="absolute inset-0 bg-white rounded-[18px] border border-white/40 shadow-sm flex items-center justify-center overflow-hidden">
           <img src={ASSETS.faintSmile} alt="Empty Smile" className="w-[45%] h-[45%] opacity-15 object-contain mix-blend-multiply" />
        </div>
      </button>
    );
  }

  // ── Variação A — Ocupado ──
  const isSick = item.state === 'sick';
  const isDead = item.state === 'dead';
  const badgeIcon = getBadgeIcon(item.badge);

  return (
    <button
      id={`inventory-slot-${position - 1}`}
      onClick={onClick}
      className={`relative w-full aspect-square transition-transform active:scale-95 ${
        isSick ? 'opacity-80' : isDead ? 'opacity-50 grayscale' : ''
      }`}
    >
      {/* Top-left Indicator: Selection Checkmark OR Sender Avatar */}
      {isSelected ? (
        <div className="absolute -top-1 -left-1 w-7 h-7 rounded-full bg-blue-600 border-2 border-white shadow-md z-40 flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      ) : item.senderAvatar ? (
        <div className="absolute -top-1 -left-1 w-7 h-7 rounded-full overflow-hidden border-2 border-white shadow-md bg-white z-30">
          <img src={item.senderAvatar} alt="Sender" className="w-full h-full object-cover" />
        </div>
      ) : item.senderType === 'system' ? (
        <div className="absolute -top-1 -left-1 w-7 h-7 rounded-full bg-white shadow-md z-30 flex items-center justify-center border-2 border-white/80">
          <img src={ASSETS.systemFan} alt="System" className="w-4 h-4 object-contain" />
        </div>
      ) : (
        <div className="absolute -top-1 -left-1 w-7 h-7 rounded-full bg-white shadow-md z-30 flex items-center justify-center border-2 border-white/80">
          <img src={ASSETS.smileVector} alt="Default" className="w-4 h-4 object-contain" />
        </div>
      )}

      {/* Main Container */}
      <div className="absolute inset-0 bg-white rounded-[18px] border border-white/40 shadow-sm flex flex-col justify-between overflow-hidden">
        
        {/* Badge icon — top-right */}
        {badgeIcon && (
          <div className="absolute top-1 right-1 text-[12px] z-20">
            {badgeIcon}
          </div>
        )}

        {/* Main poop image — centered */}
        <div className="flex-1 flex items-center justify-center p-2 pt-3">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-[85%] h-[85%] object-contain drop-shadow-md" 
          />
        </div>
      </div>
    </button>
  );
}
