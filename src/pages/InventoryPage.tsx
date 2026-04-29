import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DndContext, PointerSensor, useSensor, useSensors, DragEndEvent, DragStartEvent, DragOverlay, useDroppable } from '@dnd-kit/core';
import { TopToolbar } from '../components/layout/TopToolbar';
import { ActionBar } from '../components/layout/ActionBar';
import { BottomBar } from '../components/layout/BottomBar';
import { DraggableSlot } from '../components/cards/DraggableSlot';
import { trpc } from '../lib/trpc';
import { resolveItemImage, resolveItemBadge } from '../lib/imageResolver';
import { ASSETS } from '../constants/assets';

function InventoryGridDroppable({ children }: { children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id: 'drop-inventory' });
  return (
    <div ref={setNodeRef} className={`flex-1 overflow-hidden px-4 pb-4 ${isOver ? 'bg-white/5' : ''}`}>
      {children}
    </div>
  );
}

export function InventoryPage() {
  const navigate = useNavigate();
  const utils = trpc.useUtils();

  const [selectedSlots, setSelectedSlots] = useState<Set<number>>(new Set());
  const [activeDragData, setActiveDragData] = useState<any>(null);

  // ── Data queries ──
  const meQuery = trpc.auth.me.useQuery(undefined, { staleTime: 60_000 });
  const inventoryQuery = trpc.inventory.getAll.useQuery(undefined, { staleTime: 30_000 });

  const initAccount = trpc.auth.initializeAccount.useMutation({
    onSuccess: () => utils.inventory.getAll.invalidate(),
  });

  useEffect(() => {
    if (inventoryQuery.data && inventoryQuery.data.slots.length === 0 && !initAccount.isPending) {
      initAccount.mutate();
    }
  }, [inventoryQuery.data]);

  const user = meQuery.data;
  const playerData = {
    id: user?.id ?? '',
    username: user?.username ?? '...',
    email: user?.email ?? '',
    avatarUrl: user?.avatarUrl ?? '/assets/img/avatar-fallback.png',
    healthPercent: user?.healthPercent ?? 100,
    level: user?.level ?? 1,
    piggyBalance: user?.piggyBalance ?? 0,
    diamondBalance: Number(user?.diamondBalance ?? 0),
    rankingScore: Number(user?.rankingScore ?? 0),
    country: user?.country ?? null,
    yearOfBirth: 2000,
    bonusCode: null,
    lastActiveAt: null,
    createdAt: user?.createdAt ? String(user.createdAt) : new Date().toISOString(),
  };

  const stats = inventoryQuery.data?.stats;
  const realSlots = inventoryQuery.data?.slots ?? [];

  const slots = realSlots.length > 0
    ? realSlots.map((slot) => ({
        position: slot.position,
        unlocked: slot.unlocked,
          item: slot.itemType ? {
          id: slot.id,
          type: slot.itemType,
          name: slot.itemName ?? slot.itemType,
          image: (slot.itemType === 'COIN' && slot.itemState === 'PIERCED') 
                 ? '/assets/img/coin-hole.png' 
                 : resolveItemImage(slot.itemImage),
          state: slot.itemState ?? 'HEALTHY',
          badge: resolveItemBadge(slot.itemType, slot.itemImage),
          senderAvatar: slot.senderAvatar ?? null,
          senderType: (slot.senderType?.toLowerCase() as 'fan' | 'system' | 'friend' | 'delivery' | null) ?? null,
        } : null,
      }))
    : Array.from({ length: 20 }, (_, i) => ({
        position: i + 1,
        unlocked: i < 3,
        item: null,
      }));

  // ── Actions ──
  const collectCoinMutation = trpc.inventory.collectCoin.useMutation({
    onSuccess: () => {
      utils.inventory.getAll.invalidate();
      utils.auth.me.invalidate();
    }
  });

  const buryItemMutation = trpc.inventory.buryItem.useMutation({
    onSuccess: () => {
      utils.inventory.getAll.invalidate();
      utils.auth.me.invalidate();
    }
  });

  const useToiletPaperMutation = trpc.inventory.useToiletPaper.useMutation({
    onSuccess: () => {
      utils.inventory.getAll.invalidate();
      utils.auth.me.invalidate();
    }
  });

  const handleSlotClick = (slot: any) => {
    if (!slot.unlocked || !slot.item) return;

    // Toggle selection
    const newSelected = new Set(selectedSlots);
    if (newSelected.has(slot.position)) {
      newSelected.delete(slot.position);
    } else {
      newSelected.add(slot.position);
    }
    setSelectedSlots(newSelected);
  };

  // ── Drag & Drop ──
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Ensures clicks work normally
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveDragData(event.active.data.current);
  };

  const handleDragCancel = () => {
    setActiveDragData(null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveDragData(null);
    const { active, over } = event;
    if (!over) return;

    // IF DRAGGING TOILET PAPER
    if (active.id === 'drag-paper') {
      if (over.id === 'drop-inventory') {
        // Confirm use toilet paper
        if (confirm("Gastar 1 Papel Higiénico para limpar todos os poops mortos?")) {
          useToiletPaperMutation.mutate();
          setSelectedSlots(new Set()); // clear selection
        }
      }
      return;
    }

    // IF DRAGGING A SLOT
    if (String(active.id).startsWith('slot-')) {
      const activeData = active.data.current;
      if (!activeData || !activeData.item) return;

      const position = activeData.position;
      const type = activeData.item.type;

      // Ensure the dragged item is part of the selection, otherwise just drag this one
      const positionsToProcess = selectedSlots.has(position) ? Array.from(selectedSlots) : [position];

      if (over.id === 'drop-piggy') {
        // Collect coins
        positionsToProcess.forEach(pos => {
          const s = slots.find(s => s.position === pos);
          if (s?.item?.type === 'COIN') {
             collectCoinMutation.mutate({ position: pos, watchedAd: false });
          }
        });
        setSelectedSlots(new Set());
      } 
      else if (over.id === 'drop-delivery') {
        // Send via delivery
        if (type !== 'COIN') {
          // If multiple selected, we could pass an array, but delivery currently takes 1 position.
          // For now, pass the first selected poop's position to the delivery page
          navigate('/delivery', { state: { selectedPosition: position, selectedItemImage: activeData.item.image } });
        }
      }
      else if (over.id === 'drop-fan') {
        // Send via fan
        if (type !== 'COIN') {
           // We have a sending.fan mutation that takes multiple positions!
           // We can do it directly or navigate to a fan confirmation page.
           // For now, let's navigate to fan sending or just trigger it if we had a modal.
           // Since we don't have a FanPage yet, alert for now:
           alert(`Arrastaste ${positionsToProcess.length} itens para o Ventilador! (Integração de envio em massa pendente)`);
        }
      }
    }
  };

  return (
    <DndContext 
      sensors={sensors} 
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex flex-col h-dvh max-w-[420px] mx-auto bg-[#383838] relative border-x border-white/5">
        
        <TopToolbar 
          player={playerData} 
          activeGames={0}
          onAvatarClick={() => navigate('/profile')}
          onFriendsClick={() => navigate('/friends')}
          onShopClick={() => navigate('/shop')}
          onGamesClick={() => navigate('/game/parking')}
        />
        
        <ActionBar 
          piggyBalance={playerData.piggyBalance}
          paperStock={0}
          deliveryAvailable={`0/${stats?.slotsUnlocked ? Math.min(stats.slotsUnlocked, 1) : 1}`}
          fanAvailable="0/2"
        />
        
        {/* Banner Slot */}
        <div className="h-[50px] shrink-0 bg-[#2C2C2E] flex items-center justify-center my-2 mx-4 rounded-xl border border-white/10">
          <span className="text-white/40 text-sm">Banner Publicitário</span>
        </div>
        
        {/* Inventory Grid */}
        <InventoryGridDroppable>
          {inventoryQuery.isLoading || initAccount.isPending ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-white/50 animate-pulse">A carregar inventário...</div>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2 h-full content-start pt-2">
              {slots.map((slot) => (
                <DraggableSlot 
                   key={slot.position}
                   position={slot.position}
                   unlocked={slot.unlocked}
                   item={slot.item}
                   isSelected={selectedSlots.has(slot.position)}
                   isVisuallyDragging={!!activeDragData && selectedSlots.has(slot.position)}
                   lockLevel={!slot.unlocked ? slot.position + 3 : undefined}
                   onClick={() => handleSlotClick(slot)}
                 />
              ))}
            </div>
          )}
        </InventoryGridDroppable>
        
        <BottomBar 
          level={playerData.level} 
          progress={`${user?.poopsSentTotal ?? 0}/30`}
          onChestClick={() => navigate('/chest')}
        />
        
      </div>

      <DragOverlay dropAnimation={null}>
        {activeDragData ? (
          activeDragData.type === 'slot' && activeDragData.item ? (
            <div className="relative flex items-center justify-center w-16 h-16 drop-shadow-2xl">
              {selectedSlots.size > 1 && selectedSlots.has(activeDragData.position) ? (
                // Render stacked items
                Array.from(selectedSlots).map((pos, index) => {
                  const s = slots.find(s => s.position === pos);
                  if (!s || !s.item) return null;
                  return (
                    <img 
                      key={pos}
                      src={s.item.image} 
                      className="absolute w-14 h-14 object-contain"
                      style={{
                        transform: `translate(${index * 4}px, ${index * -4}px) rotate(${index * 5}deg)`,
                        zIndex: 10 + index,
                      }} 
                    />
                  );
                })
              ) : (
                <img src={activeDragData.item.image} className="w-full h-full object-contain" />
              )}
              {selectedSlots.size > 1 && selectedSlots.has(activeDragData.position) && (
                <div className="absolute -top-4 -right-4 bg-blue-600 text-white text-[10px] font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-md z-50">
                  {selectedSlots.size}
                </div>
              )}
            </div>
          ) : activeDragData.type === 'paper' ? (
            <div className="w-16 h-16 flex items-center justify-center drop-shadow-2xl">
              <img src={ASSETS.toiletPaper} className="w-12 h-12 object-contain" />
            </div>
          ) : null
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
