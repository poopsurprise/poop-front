import { useNavigate } from 'react-router-dom';
import { TopToolbar } from '../components/layout/TopToolbar';
import { ActionBar } from '../components/layout/ActionBar';
import { BottomBar } from '../components/layout/BottomBar';
import { BackButton } from '../components/ui/BackButton';
import { ASSETS } from '../constants/assets';
import { trpc } from '../lib/trpc';

export function ChestSelectionPage() {
  const navigate = useNavigate();
  const utils = trpc.useUtils();
  
  // Dummy data for now, ideally fetch from trpc
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
    <div className="flex flex-col h-dvh max-w-[420px] mx-auto bg-[#6b6b6b] relative border-x border-white/5">
      
      <div className="bg-[#383838]">
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
          deliveryAvailable="0/1"
          fanAvailable="—"
        />
      </div>

      {/* Banner */}
      <div className="h-[50px] shrink-0 bg-[#2C2C2E] flex items-center justify-center my-2 mx-4 rounded-xl border border-white/10">
        <span className="text-white/40 text-sm">Banner Publicitário</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-8">
        
        {/* Back Button Center */}
        <div className="w-full flex justify-center mb-4">
          <BackButton onClick={() => navigate('/inventory')} />
        </div>

        {/* Selection Cards */}
        <div className="flex w-full justify-center gap-6">
          {/* Cesta (Basket) */}
          <button 
            onClick={() => navigate('/chest/basket')}
            className="w-32 h-36 bg-white rounded-xl shadow-lg flex flex-col items-center justify-center gap-2 border-b-4 border-gray-300 hover:-translate-y-1 transition-transform"
          >
            <img src={ASSETS.basketGreen} alt="Cesta" className="w-20 h-20 object-contain" />
            <span className="text-xl font-bold text-gray-400">2</span>
          </button>

          {/* Caderneta (Book) */}
          <button 
            onClick={() => navigate('/collection')}
            className="w-32 h-36 bg-white rounded-xl shadow-lg flex flex-col items-center justify-center gap-2 border-b-4 border-gray-300 hover:-translate-y-1 transition-transform"
          >
            <img src={ASSETS.book} alt="Caderneta" className="w-20 h-20 object-contain" />
            <span className="text-xl font-bold text-gray-400">2</span>
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
      <BottomBar 
        level={playerData.level} 
        progress={user?.progression 
          ? `${user.poopsSentTotal ?? 0}/${user.progression.poopsNeededForNext}`
          : `${user?.poopsSentTotal ?? 0}/—`}
        onChestClick={() => navigate('/inventory')}
      />
    </div>
  );
}
