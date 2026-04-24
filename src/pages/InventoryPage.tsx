import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopToolbar } from '../components/layout/TopToolbar';
import { ActionBar } from '../components/layout/ActionBar';
import { BottomBar } from '../components/layout/BottomBar';
import { InventorySlot as InventorySlotCard } from '../components/cards/InventorySlot';
import { trpc } from '../lib/trpc';
import { resolveItemImage } from '../lib/imageResolver';

/**
 * TELA 04 — INVENTÁRIO (Main Game Screen)
 * Dados reais via tRPC: auth.me + inventory.getAll
 */
export function InventoryPage() {
  const navigate = useNavigate();
  const utils = trpc.useUtils();

  // ── Data queries ──
  const meQuery = trpc.auth.me.useQuery(undefined, { staleTime: 60_000 });
  const inventoryQuery = trpc.inventory.getAll.useQuery(undefined, { staleTime: 30_000 });

  // ── Auto-initialize account if inventory is empty ──
  const initAccount = trpc.auth.initializeAccount.useMutation({
    onSuccess: () => {
      // Refetch inventory after initialization
      utils.inventory.getAll.invalidate();
    },
  });

  useEffect(() => {
    // If inventory loaded but has 0 slots, initialize the account
    if (inventoryQuery.data && inventoryQuery.data.slots.length === 0 && !initAccount.isPending) {
      initAccount.mutate();
    }
  }, [inventoryQuery.data]);

  // ── Build player data from real backend ──
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

  // ── Build slots from real inventory or loading state ──
  const stats = inventoryQuery.data?.stats;
  const realSlots = inventoryQuery.data?.slots ?? [];

  // Map backend slots to component props
  const slots = realSlots.length > 0
    ? realSlots.map((slot) => ({
        position: slot.position,
        unlocked: slot.unlocked,
        item: slot.itemType ? {
          id: slot.id,
          type: slot.itemType,
          name: slot.itemName ?? slot.itemType,
          image: resolveItemImage(slot.itemImage),
          state: slot.itemState ?? 'HEALTHY',
          badge: null,
          senderAvatar: slot.senderAvatar ?? null,
          senderType: (slot.senderType?.toLowerCase() as 'fan' | 'system' | 'friend' | 'delivery' | null) ?? null,
        } : null,
      }))
    : // Fallback: generate 20 empty slots while loading
      Array.from({ length: 20 }, (_, i) => ({
        position: i + 1,
        unlocked: i < 3,
        item: null,
      }));

  // ── Navigation ──
  const handleProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="flex flex-col h-dvh max-w-[420px] mx-auto bg-[#383838] relative border-x border-white/5">
      
      <TopToolbar 
        player={playerData} 
        activeGames={0}
        onAvatarClick={handleProfile}
        onFriendsClick={() => navigate('/friends')}
        onShopClick={() => navigate('/shop')}
        onGamesClick={() => navigate('/delivery')}
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
      <div className="flex-1 overflow-hidden px-4 pb-4">
        {inventoryQuery.isLoading || initAccount.isPending ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-white/50 animate-pulse">A carregar inventário...</div>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2 h-full content-start pt-2">
            {slots.map((slot) => (
               <InventorySlotCard 
                 key={slot.position}
                 position={slot.position}
                 unlocked={slot.unlocked}
                 item={slot.item}
                 lockLevel={!slot.unlocked ? slot.position + 3 : undefined}
                 onClick={() => {
                   if (slot.unlocked && slot.item) {
                     console.log('Clicked slot:', slot.position, slot.item);
                   }
                 }}
               />
            ))}
          </div>
        )}
      </div>
      
      <BottomBar 
        level={playerData.level} 
        progress={`${user?.poopsSentTotal ?? 0}/30`}
        onChestClick={() => navigate('/chest')}
      />
      
    </div>
  );
}
