import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopToolbar } from '../components/layout/TopToolbar';
import { trpc } from '../lib/trpc';
import { ASSETS } from '../constants/assets';

/**
 * GAME MATCHMAKING — Countdown before match starts
 * Mockup: game emparelhamento.png
 */

export function GameMatchmakingPage() {
  const navigate = useNavigate();
  const meQuery = trpc.auth.me.useQuery(undefined, { staleTime: 60_000 });
  const user = meQuery.data;
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const t = setInterval(() => setCountdown(prev => {
      if (prev <= 1) { clearInterval(t); navigate('/game/arena'); return 0; }
      return prev - 1;
    }), 1000);
    return () => clearInterval(t);
  }, [navigate]);

  const playerData = {
    id: user?.id ?? '', username: user?.username ?? '...', email: user?.email ?? '',
    avatarUrl: user?.avatarUrl ?? '/assets/img/avatar-fallback.png',
    healthPercent: user?.healthPercent ?? 100, level: user?.level ?? 1,
    piggyBalance: user?.piggyBalance ?? 0, diamondBalance: Number(user?.diamondBalance ?? 0),
    rankingScore: Number(user?.rankingScore ?? 0), country: user?.country ?? null,
    yearOfBirth: 2000, bonusCode: null, lastActiveAt: null,
    createdAt: user?.createdAt ? String(user.createdAt) : new Date().toISOString(),
  };

  const mockPoops = Array.from({ length: 20 }, (_, i) => ({ position: i, hasPoop: Math.random() > 0.45 }));

  return (
    <div className="flex flex-col h-dvh max-w-[420px] mx-auto bg-[#383838] border-x border-white/5">
      <TopToolbar player={playerData} activeGames={0} onAvatarClick={() => navigate('/profile')} />

      {/* Arena with countdown */}
      <div className="mx-3 rounded-xl overflow-hidden relative h-[160px] bg-gradient-to-b from-sky-300 to-amber-700">
        <div className="absolute bottom-0 w-full h-[60%] bg-amber-800/80" />
        {/* Two avatars facing off */}
        <div className="absolute bottom-8 left-8">
          <img src={playerData.avatarUrl} alt="" className="w-16 h-16 rounded-full border-3 border-white" />
        </div>
        <div className="absolute bottom-8 right-8">
          <img src="/assets/img/avatar-fallback.png" alt="" className="w-16 h-16 rounded-full border-3 border-gray-300" />
        </div>
        {/* Countdown */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="text-gray-800 text-6xl font-black">{countdown}</span>
        </div>
        {/* Score bar */}
        <div className="absolute bottom-1 left-2 flex items-center gap-1 bg-black/30 rounded px-2 py-0.5">
          <img src={playerData.avatarUrl} alt="" className="w-5 h-5 rounded-full" /><span className="text-white text-[10px]">0</span>
          <img src="/assets/img/avatar-fallback.png" alt="" className="w-5 h-5 rounded-full ml-1" /><span className="text-white text-[10px]">0</span>
        </div>
        <button onClick={() => navigate('/game/parking')}
          className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-[#4A6CF7] text-white text-sm font-medium px-6 py-1 rounded-lg">Sair</button>
        <div className="absolute bottom-1 right-2 bg-black/30 rounded px-2 py-0.5"><span className="text-green-400 font-bold text-sm">500</span></div>
      </div>

      {/* Grid (disabled during matchmaking) */}
      <div className="flex-1 px-3 pt-2 pb-2 opacity-60">
        <div className="grid grid-cols-4 gap-2 h-full content-start">
          {mockPoops.map(slot => (
            <div key={slot.position} className="bg-white rounded-xl aspect-square flex items-center justify-center">
              {slot.hasPoop && <img src={ASSETS.madPoop} alt="" className="w-[70%] h-[70%] object-contain" />}
            </div>
          ))}
        </div>
      </div>

      <div className="h-[56px] w-full bg-[#4CAF50] flex items-center justify-around px-4 shrink-0">
        <img src={playerData.avatarUrl} alt="" className="w-10 h-10 rounded-full border-2 border-white" />
        <span className="text-3xl">🤝</span>
        <img src="/assets/img/avatar-fallback.png" alt="" className="w-10 h-10 rounded-full border-2 border-white" />
      </div>
    </div>
  );
}
