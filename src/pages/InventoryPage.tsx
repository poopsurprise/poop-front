import React from 'react';
import { TopToolbar } from '../components/layout/TopToolbar';
import { ActionBar } from '../components/layout/ActionBar';
import { BottomBar } from '../components/layout/BottomBar';
import { InventorySlot as InventorySlotCard } from '../components/cards/InventorySlot';

import { mockPlayer, mockInventorySlots } from '../mocks/mockData';

export function InventoryPage() {
  return (
    <div className="flex flex-col h-dvh max-w-[420px] mx-auto bg-[#1C1C1E] relative border-x border-white/5">
      
      <TopToolbar 
        player={mockPlayer} 
        activeGames={0} 
      />
      
      <ActionBar 
        piggyBalance={mockPlayer.piggyBalance}
        paperStock={2}
        deliveryAvailable="1/1"
        fanAvailable="2/2"
      />
      
      {/* Banner Slot Placeholder */}
      <div className="h-[50px] shrink-0 bg-[#2C2C2E] flex items-center justify-center my-2 mx-4 rounded-xl border border-white/10">
        <span className="text-white/40 text-sm">Banner Publicitário</span>
      </div>
      
      {/* 20 slots grid */}
      <div className="flex-1 overflow-hidden px-4 pb-4">
        <div className="grid grid-cols-4 gap-2 h-full content-start pt-2">
          {mockInventorySlots.map((slot) => {
             const variant = !slot.unlocked ? 'locked' : slot.item ? 'occupied' : 'empty';
             return (
               <InventorySlotCard 
                 key={slot.position}
                 slot={slot}
                 variant={variant}
                 lockLevel={!slot.unlocked ? slot.position + 3 : undefined}
               />
             );
          })}
        </div>
      </div>
      
      <BottomBar 
        level={mockPlayer.level} 
        progress="29/30" 
      />
      
    </div>
  );
}
