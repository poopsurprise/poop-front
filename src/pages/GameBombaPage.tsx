import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopToolbar } from '../components/layout/TopToolbar';
import { trpc } from '../lib/trpc';
import { ASSETS } from '../constants/assets';

/**
 * GAME BOMBA — Circle of players with countdown
 * Mockup: game bomba.png
 */

const mockPlayers = Array.from({ length: 8 }, (_, i) => ({
  id: `p${i}`,
  avatarUrl: '/assets/img/avatar-fallback.png',
}));

export function GameBombaPage() {
  const navigate = useNavigate();
  const meQuery = trpc.auth.me.useQuery(undefined, { staleTime: 60_000 });
  const user = meQuery.data;
  const [timer, setTimer] = useState(300);

  useEffect(() => {
    const t = setInterval(() => setTimer(prev => Math.max(0, prev - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  const playerData = {
    id: user?.id ?? '', username: user?.username ?? '...', email: user?.email ?? '',
    avatarUrl: user?.avatarUrl ?? '/assets/img/avatar-fallback.png',
    healthPercent: user?.healthPercent ?? 100, level: user?.level ?? 1,
    piggyBalance: user?.piggyBalance ?? 0, diamondBalance: Number(user?.diamondBalance ?? 0),
    rankingScore: Number(user?.rankingScore ?? 0), country: user?.country ?? null,
    yearOfBirth: 2000, bonusCode: null, lastActiveAt: null,
    createdAt: user?.createdAt ? String(user.createdAt) : new Date().toISOString(),
  };

  // Position players in a circle
  const positions = mockPlayers.map((_, i) => {
    const angle = (i / mockPlayers.length) * 2 * Math.PI - Math.PI / 2;
    const r = 38;
    return { x: 50 + r * Math.cos(angle), y: 50 + r * Math.sin(angle) };
  });

  return (
    <div className="flex flex-col h-dvh max-w-[420px] mx-auto bg-[#383838] border-x border-white/5">
      <TopToolbar player={playerData} activeGames={0} onAvatarClick={() => navigate('/profile')} />

      {/* Exit button */}
      <div className="px-4 py-2">
        <button onClick={() => navigate('/game/parking')}
          className="w-full bg-[#4A6CF7] text-white font-medium py-2 rounded-xl">Sair</button>
      </div>

      {/* Arena field */}
      <div className="mx-3 rounded-xl overflow-hidden h-[200px] bg-gradient-to-b from-sky-300 to-amber-700 relative">
        <div className="absolute bottom-0 w-full h-[55%] bg-amber-800/80" />
      </div>

      {/* Player circle + timer */}
      <div className="flex-1 relative">
        <div className="absolute inset-0">
          {mockPlayers.map((p, i) => (
            <div key={p.id} className="absolute" style={{ left: `${positions[i].x}%`, top: `${positions[i].y}%`, transform: 'translate(-50%, -50%)' }}>
              <img src={p.avatarUrl} alt="" className="w-12 h-12 rounded-full border-2 border-gray-300 bg-white" />
            </div>
          ))}
          {/* Center timer */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <span className="text-gray-500 text-4xl font-bold font-mono">{minutes}:{seconds.toString().padStart(2, '0')}</span>
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
