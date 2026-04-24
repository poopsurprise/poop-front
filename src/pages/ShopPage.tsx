import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopToolbar } from '../components/layout/TopToolbar';
import { SaldoBar } from '../components/ui/SaldoBar';
import { BackButton } from '../components/ui/BackButton';
import { DiamondPackCard } from '../components/cards/DiamondPackCard';
import { UtilityRow } from '../components/cards/UtilityRow';
import { PoopPurchaseModal } from '../components/modals/PoopPurchaseModal';
import { trpc } from '../lib/trpc';
import { ASSETS } from '../constants/assets';

/**
 * TELA 07 — LOJA (Marketplace)
 * Mockup: Loja.png
 */

const mockDiamondPacks = [
  { quantity: 100, originalPrice: '10€', discountedPrice: '9.70€' },
  { quantity: 500, originalPrice: '40€', discountedPrice: '38.50€' },
  { quantity: 1000, originalPrice: '70€', discountedPrice: '67.00€' },
];

const mockPoopPreviews = [
  ASSETS.poop3, ASSETS.poop4, ASSETS.poop5, ASSETS.poop6, ASSETS.poop7,
];

const mockUtilities = [
  { id: 'paper', name: 'Papel Higiénico', image: ASSETS.toiletPaper, priceCoins: 5000, priceDiamonds: 0.001, description: 'Limpe a sujeira mais rápido.' },
  { id: 'medicine', name: 'Medicamento', image: ASSETS.medicine, priceCoins: 5000, priceDiamonds: 0.001, description: 'Cure o seu Poop instantaneamente.' },
  { id: 'fan', name: 'Ventilador', image: ASSETS.fan, priceCoins: 5000000, priceDiamonds: 0.10, description: 'Acelere o envio de poops pelo sistema de ventilação.' },
  { id: 'vip', name: 'VIP Pass', image: ASSETS.vip, priceCoins: 500000000, priceDiamonds: 2.99, description: 'Acesso antecipado a itens exclusivos e status VIP.' },
  { id: 'boss', name: 'Boss Card', image: ASSETS.bossCard, priceCoins: 350000000, priceDiamonds: 1.99, description: 'Mostre a todos quem manda.' },
];

export function ShopPage() {
  const navigate = useNavigate();
  const meQuery = trpc.auth.me.useQuery(undefined, { staleTime: 60_000 });
  const user = meQuery.data;

  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

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

  const selectedItem = mockUtilities.find(u => u.id === selectedItemId);

  return (
    <div className="flex flex-col h-dvh max-w-[420px] mx-auto bg-[#6e6e6e] relative border-x border-white/5">
      
      <TopToolbar
        player={playerData}
        activeGames={0}
        onAvatarClick={() => navigate('/profile')}
      />

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-2">

        {/* Diamond Packs Carousel */}
        <div className="mb-6">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x">
            {mockDiamondPacks.map((pack, i) => (
              <div key={i} className="snap-start shrink-0">
                <DiamondPackCard
                  index={i}
                  quantity={pack.quantity}
                  originalPrice={pack.originalPrice}
                  discountedPrice={pack.discountedPrice}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Poops Catalog Link Banner */}
        <div className="mb-6 flex items-center justify-between gap-3">
           <div className="flex-1 bg-white rounded-2xl h-14 flex items-center justify-between px-3 shadow-sm border border-gray-100">
             {mockPoopPreviews.map((img, i) => (
               <img key={i} src={img} alt={`Poop ${i}`} className="w-10 h-10 object-contain" />
             ))}
           </div>
           
           <button
             id="btn-poop-catalog"
             onClick={() => navigate('/catalog')}
             className="w-14 h-14 rounded-xl bg-[#4A72D6] shadow-[0_4px_0_#3352A3] flex items-center justify-center shrink-0 transition-transform active:translate-y-1 active:shadow-none"
           >
             {/* Grid icon */}
             <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
               <path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z" />
             </svg>
           </button>
        </div>

        {/* Utilities List */}
        <div className="space-y-3 mb-4">
          {mockUtilities.map((u) => (
            <UtilityRow
              key={u.id}
              id={u.id}
              name={u.name}
              image={u.image}
              priceCoins={u.priceCoins}
              priceDiamonds={u.priceDiamonds}
              onInfoClick={() => setSelectedItemId(u.id)}
              onBuyClick={() => setSelectedItemId(u.id)}
            />
          ))}
        </div>

        <div className="mt-8 mb-4 flex justify-center">
          <BackButton onClick={() => navigate(-1)} />
        </div>
      </div>

      {/* SaldoBar fixed bottom */}
      <SaldoBar
        piggyBalance={playerData.piggyBalance}
        diamondBalance={playerData.diamondBalance}
      />

      {/* Item Purchase Modal */}
      {selectedItem && (
        <PoopPurchaseModal
          isOpen={!!selectedItemId}
          onClose={() => setSelectedItemId(null)}
          poopName={selectedItem.name}
          poopDescription={selectedItem.description}
          poopImage={selectedItem.image}
          coinPrice={selectedItem.priceCoins}
          diamondPrice={selectedItem.priceDiamonds}
          piggyBalance={playerData.piggyBalance}
          diamondBalance={playerData.diamondBalance}
          onPurchase={(type, qty) => {
            console.log('Purchase', type, qty, 'of', selectedItem.name);
            setSelectedItemId(null);
          }}
        />
      )}
    </div>
  );
}
