import React from 'react';
import { ASSETS } from '../../constants/assets';

/**
 * InventorySlot — 3 variações conforme especificação:
 * 
 * A — Ocupado: fundo claro, badge tipo top-right, poop centrado, 
 *               mini avatar bottom-left, barra ocupação bottom
 * B — Vazio:   fundo cinza médio, sem conteúdo
 * C — Bloqueado: overlay de "vidro" (Rectangle 43.png) 
 *                com caixa centrada + nível de desbloqueio
 */

export interface SlotItem {
  id: string;
  type: string;        // 'poop_soft' | 'poop_attack' | 'coin' | 'collectible'
  name: string;
  image: string;
  state: string;       // 'active' | 'sick' | 'dead'
  badge?: string | null;     // 'sound' | 'medical' | 'spy' | 'thief' | 'pirate' | null
  senderAvatar?: string | null;
  occupationPercent?: number;  // 0-100
  occupationCount?: number;    // raw number shown next to bar
}

export interface InventorySlotProps {
  position: number;
  unlocked: boolean;
  item: SlotItem | null;
  lockLevel?: number;    // Level needed to unlock
  onClick?: () => void;
}

// Badge icon mapping
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

export function InventorySlot({ position, unlocked, item, lockLevel, onClick }: InventorySlotProps) {
  
  // ── Variação C — Bloqueado ──
  if (!unlocked) {
    return (
      <div
        id={`inventory-slot-${position - 1}`}
        className="relative w-full aspect-square rounded-xl overflow-hidden cursor-not-allowed"
      >
        {/* Glass overlay - using the Rectangle 43 asset as glass effect */}
        <img 
          src={ASSETS.slotBackground} 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        {/* Box icon + level number  */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 z-10">
          <img src={ASSETS.box} alt="Locked" className="w-8 h-8 object-contain opacity-70" />
          {lockLevel && (
            <span className="text-[10px] font-bold text-gray-500/70">+{lockLevel}</span>
          )}
        </div>
      </div>
    );
  }

  // ── Variação B — Vazio (desbloqueado mas sem item) ──
  if (!item) {
    return (
      <div 
        id={`inventory-slot-${position - 1}`}
        className="w-full aspect-square rounded-xl bg-[#6b6b6b] border border-white/5"
      />
    );
  }

  // ── Variação A — Ocupado ──
  const isSick = item.state === 'sick';
  const isDead = item.state === 'dead';
  const badgeIcon = getBadgeIcon(item.badge);
  const occupPercent = item.occupationPercent ?? 50;
  const occupCount = item.occupationCount ?? 20;

  // Occupation bar color based on percentage
  let barColor = '#4CAF50'; // green
  if (occupPercent > 70) barColor = '#FF9800'; // orange
  if (occupPercent > 90) barColor = '#F44336'; // red

  return (
    <button
      id={`inventory-slot-${position - 1}`}
      onClick={onClick}
      className={`relative w-full aspect-square rounded-xl overflow-hidden transition-transform active:scale-95 ${
        isSick ? 'opacity-80' : isDead ? 'opacity-50 grayscale' : ''
      }`}
      style={{ backgroundColor: '#d0d0d0' }} // Light gray background for occupied slots (matching mockup)
    >
      {/* Badge icon — top-right */}
      {badgeIcon && (
        <span className="absolute top-1 right-1.5 text-[12px] z-20 drop-shadow-sm">
          {badgeIcon}
        </span>
      )}

      {/* Main poop/item image — centered */}
      <div className="absolute inset-0 flex items-center justify-center p-2">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-[65%] h-[65%] object-contain drop-shadow-sm" 
        />
      </div>

      {/* Mini sender avatar — bottom-left in circle */}
      {item.senderAvatar && (
        <div className="absolute left-1 bottom-5 w-5 h-5 rounded-full overflow-hidden border-[1.5px] border-white shadow-sm bg-white z-20">
          <img src={item.senderAvatar} alt="Sender" className="w-full h-full object-cover" />
        </div>
      )}

      {/* Occupation bar — bottom of slot */}
      <div className="absolute bottom-1 left-1 right-1 flex items-center gap-1 z-20">
        <div className="flex-1 h-[4px] bg-white/40 rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all" 
            style={{ width: `${occupPercent}%`, backgroundColor: barColor }}
          />
        </div>
        <span className="text-[8px] font-bold text-gray-600 min-w-[14px] text-right">{occupCount}</span>
      </div>
    </button>
  );
}
