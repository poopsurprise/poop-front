import { useNavigate } from 'react-router-dom';
import { TopToolbar } from '../components/layout/TopToolbar';
import { trpc } from '../lib/trpc';
import { ASSETS } from '../constants/assets';

/**
 * GAME BOMBA RESULT — Who exploded + replay options
 * Mockup: game bomba quem rebentou e menus de repetir jogo para quem criou o jogo.png
 */

const mockPlayers = Array.from({ length: 8 }, (_, i) => ({
  id: `p${i}`, avatarUrl: '/assets/img/avatar-fallback.png',
}));

export function GameBombaResultPage() {
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

  const positions = mockPlayers.map((_, i) => {
    const angle = (i / mockPlayers.length) * 2 * Math.PI - Math.PI / 2;
    const r = 38;
    return { x: 50 + r * Math.cos(angle), y: 50 + r * Math.sin(angle) };
  });

  return (
    <div className="flex flex-col h-dvh max-w-[420px] mx-auto bg-[#383838] border-x border-white/5">
      <TopToolbar player={playerData} activeGames={0} onAvatarClick={() => navigate('/profile')} />

      {/* Action buttons */}
      <div className="flex gap-2 px-3 py-2">
        <button onClick={() => navigate('/game/parking')} className="flex-1 bg-[#4A6CF7] text-white font-medium py-2 rounded-xl text-sm">Sair</button>
        <button className="flex-1 bg-[#4A6CF7] text-white font-medium py-2 rounded-xl text-sm">Formulario</button>
        <button className="flex-1 bg-[#4A6CF7] text-white font-medium py-2 rounded-xl text-sm">Repetir</button>
      </div>

      {/* Arena with loser overlay */}
      <div className="mx-3 rounded-xl overflow-hidden h-[200px] bg-gradient-to-b from-sky-300 to-amber-700 relative">
        <div className="absolute bottom-0 w-full h-[55%] bg-amber-800/80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-gray-300/90 rounded-2xl p-5 flex flex-col items-center gap-2">
            <img src={playerData.avatarUrl} alt="" className="w-16 h-16 rounded-full border-2 border-white" />
            <p className="text-gray-600 text-sm">Username000000000000</p>
          </div>
        </div>
      </div>

      {/* Player circle */}
      <div className="flex-1 relative">
        <div className="absolute inset-0">
          {mockPlayers.map((p, i) => (
            <div key={p.id} className="absolute" style={{ left: `${positions[i].x}%`, top: `${positions[i].y}%`, transform: 'translate(-50%, -50%)' }}>
              <img src={p.avatarUrl} alt="" className="w-12 h-12 rounded-full border-2 border-gray-300 bg-white" />
            </div>
          ))}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <span className="text-gray-500 text-4xl font-bold font-mono">5:00</span>
            <div className="mt-2 bg-gray-200 rounded-xl p-2">
              <img src={ASSETS.madPoop} alt="" className="h-10 object-contain" />
            </div>
          </div>
        </div>
      </div>

      <div className="h-4 w-full bg-[#4CAF50] shrink-0" />
    </div>
  );
}
