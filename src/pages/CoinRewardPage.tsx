import { useNavigate } from 'react-router-dom';
import { TopToolbar } from '../components/layout/TopToolbar';
import { trpc } from '../lib/trpc';
import { ASSETS } from '../constants/assets';

/**
 * COIN REWARD / PUB — Receber moedas (grátis ou ver anúncio)
 * Mockup: pergunta para ver Pub.png
 */

export function CoinRewardPage() {
  const navigate = useNavigate();
  const meQuery = trpc.auth.me.useQuery(undefined, { staleTime: 60_000 });
  const user = meQuery.data;

  const playerData = {
    id: user?.id ?? '', username: user?.username ?? '...', email: user?.email ?? '',
    avatarUrl: user?.avatarUrl ?? '/assets/img/avatar-fallback.png',
    healthPercent: user?.healthPercent ?? 100, level: user?.level ?? 1,
    piggyBalance: user?.piggyBalance ?? 0, diamondBalance: Number(user?.diamondBalance ?? 0),
    rankingScore: Number(user?.rankingScore ?? 0), country: user?.country ?? null,
    yearOfBirth: 2000, bonusCode: null, lastActiveAt: null,
    createdAt: user?.createdAt ? String(user.createdAt) : new Date().toISOString(),
  };

  return (
    <div className="flex flex-col h-dvh max-w-[420px] mx-auto bg-[#383838] border-x border-white/5">
      <TopToolbar player={playerData} activeGames={0} onAvatarClick={() => navigate('/profile')} />

      <div className="flex-1 flex flex-col items-center px-4 pt-4">
        {/* Hero banner */}
        <div className="w-full rounded-2xl overflow-hidden bg-gradient-to-b from-yellow-400 to-amber-500 p-6 flex flex-col items-center mb-4">
          <img src={ASSETS.piggyBank} alt="Piggy" className="h-20 object-contain mb-2" />
          <img src={ASSETS.coinGold} alt="Coins" className="h-12 object-contain" />
        </div>

        {/* Two cards */}
        <div className="flex gap-3 w-full">
          {/* Free collect */}
          <div className="flex-1 bg-gray-200 rounded-2xl p-4 flex flex-col items-center gap-3">
            <p className="text-gray-600 font-medium">Receba</p>
            <img src={ASSETS.coinGold} alt="" className="h-16 object-contain" />
            <p className="text-gray-800 font-bold text-xl">20</p>
            <button id="btn-collect-free"
              className="w-full py-2.5 bg-[#4A6CF7] rounded-xl flex items-center justify-center transition-transform active:scale-95">
              <span className="text-white text-lg">⬇️</span>
            </button>
          </div>

          {/* Watch ad for more */}
          <div className="flex-1 bg-gray-200 rounded-2xl p-4 flex flex-col items-center gap-3">
            <p className="text-gray-600 font-medium">Receba</p>
            <img src={ASSETS.coinGold} alt="" className="h-16 object-contain" />
            <p className="text-gray-800 font-bold text-xl">3000</p>
            <button id="btn-collect-ad"
              className="w-full py-2.5 bg-[#4A6CF7] rounded-xl flex items-center justify-center transition-transform active:scale-95">
              <span className="text-white text-lg">▶️</span>
            </button>
          </div>
        </div>
      </div>

      <div className="h-6 w-full bg-[#4CAF50] shrink-0" />
    </div>
  );
}
