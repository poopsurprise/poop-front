import { useNavigate } from 'react-router-dom';
import { TopToolbar } from '../components/layout/TopToolbar';
import { SaldoBar } from '../components/ui/SaldoBar';
import { BackButton } from '../components/ui/BackButton';
import { DiamondPackCard } from '../components/cards/DiamondPackCard';
import { UtilityRow } from '../components/cards/UtilityRow';
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
  { id: 'paper', name: 'Papel Higiénico', image: ASSETS.toiletPaper, priceCoins: 5000, priceDiamonds: 0.001 },
  { id: 'medicine', name: 'Medicamento', image: ASSETS.medicine, priceCoins: 5000, priceDiamonds: 0.001 },
  { id: 'fan', name: 'Ventilador', image: ASSETS.fan, priceCoins: 5000000, priceDiamonds: 0.10 },
  { id: 'vip', name: 'VIP Pass', image: ASSETS.vip, priceCoins: 500000000, priceDiamonds: 2.99 },
  { id: 'boss', name: 'Boss Card', image: ASSETS.bossCard, priceCoins: 350000000, priceDiamonds: 1.99 },
];

export function ShopPage() {
  const navigate = useNavigate();
  const meQuery = trpc.auth.me.useQuery(undefined, { staleTime: 60_000 });
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

  return (
    <div className="flex flex-col h-dvh max-w-[420px] mx-auto bg-[#383838] relative border-x border-white/5">
      
      <TopToolbar
        player={playerData}
        activeGames={0}
        onAvatarClick={() => navigate('/profile')}
      />

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 pt-3 pb-2">

        {/* Diamond Packs Carousel */}
        <div className="mb-5">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {mockDiamondPacks.map((pack, i) => (
              <DiamondPackCard
                key={i}
                index={i}
                quantity={pack.quantity}
                originalPrice={pack.originalPrice}
                discountedPrice={pack.discountedPrice}
              />
            ))}
          </div>
        </div>

        {/* Poop Previews Normal */}
        <div className="mb-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {mockPoopPreviews.map((img, i) => (
              <button
                key={i}
                className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10 transition-transform active:scale-95"
              >
                <img src={img} alt={`Poop ${i}`} className="w-10 h-10 object-contain" />
              </button>
            ))}
            <button
              id="btn-poop-catalog"
              onClick={() => navigate('/catalog')}
              className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 text-white/40 text-xl"
            >
              📦
            </button>
          </div>
        </div>

        {/* Poop Previews BOOST */}
        <div className="mb-5">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {[ASSETS.poop8, ASSETS.poop9, ASSETS.poop10].map((img, i) => (
              <button
                key={i}
                className="w-14 h-14 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0 border border-orange-400/30 transition-transform active:scale-95"
              >
                <img src={img} alt={`Boost ${i}`} className="w-10 h-10 object-contain" />
              </button>
            ))}
            <button
              className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 text-white/40 text-xl"
            >
              📦
            </button>
          </div>
        </div>

        {/* Utilities List */}
        <div className="space-y-2 mb-4">
          {mockUtilities.map((u) => (
            <UtilityRow
              key={u.id}
              id={u.id}
              name={u.name}
              image={u.image}
              priceCoins={u.priceCoins}
              priceDiamonds={u.priceDiamonds}
            />
          ))}
        </div>

        <BackButton onClick={() => navigate(-1)} />
      </div>

      {/* SaldoBar fixed bottom */}
      <SaldoBar
        piggyBalance={playerData.piggyBalance}
        diamondBalance={playerData.diamondBalance}
      />
    </div>
  );
}
