import { useNavigate } from 'react-router-dom';
import { TopToolbar } from '../components/layout/TopToolbar';
import { BackButton } from '../components/ui/BackButton';
import { trpc } from '../lib/trpc';
import { ASSETS } from '../constants/assets';

/**
 * GAME PARKING — Lista de jogos live, bomba, game, criar
 * Mockup: Game parking.png
 */

type GameCardData = {
  id: string;
  type: 'live' | 'bomba' | 'game';
  avatarUrl: string;
  username: string;
  coins?: number;
  timer?: number;
};

const mockLive: GameCardData[] = [
  { id: 'l1', type: 'live', avatarUrl: '/assets/img/avatar-fallback.png', username: '000000000000Username', timer: 30 },
  { id: 'l2', type: 'live', avatarUrl: '/assets/img/avatar-fallback.png', username: '000000000000Username', timer: 30 },
];

const mockBomba: GameCardData[] = [
  { id: 'b1', type: 'bomba', avatarUrl: '/assets/img/avatar-fallback.png', username: 'Nome do torneio', coins: 5000, timer: 30 },
  { id: 'b2', type: 'bomba', avatarUrl: '/assets/img/avatar-fallback.png', username: 'Nome do torneio', coins: 5000, timer: 30 },
  { id: 'b3', type: 'bomba', avatarUrl: '/assets/img/avatar-fallback.png', username: 'Nome do torneio', coins: 5000, timer: 30 },
];

const mockGames: GameCardData[] = [
  { id: 'g1', type: 'game', avatarUrl: '/assets/img/avatar-fallback.png', username: '', coins: 5000 },
  { id: 'g2', type: 'game', avatarUrl: '/assets/img/avatar-fallback.png', username: '', coins: 5000 },
  { id: 'g3', type: 'game', avatarUrl: '/assets/img/avatar-fallback.png', username: '', coins: 5000 },
];

function GameCard({ card }: { card: GameCardData }) {
  return (
    <div className="bg-white rounded-xl p-2.5 flex flex-col items-center gap-1 min-w-[100px]">
      <img src={card.avatarUrl} alt="" className="w-12 h-12 rounded-full object-cover" />
      {card.type === 'bomba' && <img src={ASSETS.bomb} alt="" className="h-6 object-contain" />}
      {card.coins && <div className="flex items-center gap-1"><span className="text-xs">🪙</span><span className="text-gray-700 text-xs font-medium">{card.coins}</span></div>}
      {card.timer && <span className="text-[10px] bg-gray-100 rounded px-1.5 py-0.5 text-gray-500 font-mono">{card.timer}</span>}
      <p className="text-gray-600 text-[10px] text-center truncate w-full">{card.username}</p>
    </div>
  );
}

export function GameParkingPage() {
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

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {/* Live */}
        <h3 className="text-white/50 text-xl font-light mt-3 mb-2">Live</h3>
        <div className="border-b border-pink-400/40 mb-3" />
        <div className="flex gap-2 overflow-x-auto pb-2">{mockLive.map(c => <GameCard key={c.id} card={c} />)}</div>

        {/* Bomba */}
        <h3 className="text-white/50 text-xl font-light mt-4 mb-2">Bomba</h3>
        <div className="border-b border-white/10 mb-3" />
        <div className="flex gap-2 overflow-x-auto pb-2">{mockBomba.map(c => <GameCard key={c.id} card={c} />)}</div>

        {/* Game */}
        <h3 className="text-white/50 text-xl font-light mt-4 mb-2">Game</h3>
        <div className="border-b border-white/10 mb-3" />
        <div className="flex gap-2 overflow-x-auto pb-2">{mockGames.map(c => <GameCard key={c.id} card={c} />)}</div>

        {/* Criar */}
        <h3 className="text-white/50 text-xl font-light mt-4 mb-2">Criar</h3>
        <div className="border-b border-white/10 mb-3" />
        <div className="flex gap-3">
          <button onClick={() => navigate('/game/create?type=ranking')}
            className="flex-1 bg-white rounded-xl p-4 flex items-center justify-center transition-transform active:scale-95">
            <img src={ASSETS.gameRanking} alt="Ranking" className="h-12 object-contain" />
          </button>
          <button onClick={() => navigate('/game/create?type=1v1')}
            className="flex-1 bg-white rounded-xl p-4 flex items-center justify-center transition-transform active:scale-95">
            <img src={ASSETS.game1v1} alt="1v1" className="h-12 object-contain" />
          </button>
          <button onClick={() => navigate('/game/create?type=bomba')}
            className="flex-1 bg-white rounded-xl p-4 flex items-center justify-center transition-transform active:scale-95">
            <img src={ASSETS.gameBomba} alt="Bomba" className="h-12 object-contain" />
          </button>
        </div>

        <div className="mt-6 flex justify-center"><BackButton onClick={() => navigate(-1)} /></div>
      </div>
    </div>
  );
}
