import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopToolbar } from '../components/layout/TopToolbar';
import { trpc } from '../lib/trpc';
import { ASSETS } from '../constants/assets';

/**
 * GAME RANKING ARENA — 4x5 grid game board
 * Mockup: Game ranking.png
 */

const mockPoops = Array.from({ length: 20 }, (_, i) => ({
  position: i,
  hasPoop: Math.random() > 0.45,
}));

export function GameArenaPage() {
  const navigate = useNavigate();
  const meQuery = trpc.auth.me.useQuery(undefined, { staleTime: 60_000 });
  const user = meQuery.data;
  const [score] = useState(500);

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

      {/* Arena field */}
      <div className="mx-3 rounded-xl overflow-hidden relative h-[140px] bg-gradient-to-b from-sky-300 to-amber-700 flex items-end">
        {/* Dirt ground */}
        <div className="absolute bottom-0 w-full h-[60%] bg-amber-800/80" />
        {/* Player avatars */}
        <div className="absolute bottom-6 left-8 w-14 h-14 rounded-full bg-gray-300 border-2 border-white" />
        <div className="absolute bottom-6 right-8 w-14 h-14 rounded-full bg-gray-300 border-2 border-white overflow-hidden">
          <img src={ASSETS.madPoop} alt="" className="w-full h-full object-cover" />
        </div>
        {/* Score bar */}
        <div className="absolute bottom-1 left-2 flex items-center gap-1 bg-black/30 rounded px-2 py-0.5">
          <img src={playerData.avatarUrl} alt="" className="w-5 h-5 rounded-full" />
          <span className="text-white text-[10px]">100</span>
          <img src={playerData.avatarUrl} alt="" className="w-5 h-5 rounded-full ml-1" />
          <span className="text-white text-[10px]">100</span>
        </div>
        <div className="absolute bottom-1 right-2 bg-black/30 rounded px-2 py-0.5">
          <span className="text-green-400 font-bold text-sm">{score}</span>
        </div>
      </div>

      {/* Game grid */}
      <div className="flex-1 px-3 pt-2 pb-2">
        <div className="grid grid-cols-4 gap-2 h-full content-start">
          {mockPoops.map(slot => (
            <button key={slot.position}
              className="bg-white rounded-xl aspect-square flex items-center justify-center transition-transform active:scale-90">
              {slot.hasPoop && (
                <img src={ASSETS.madPoop} alt="" className="w-[70%] h-[70%] object-contain" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom players bar */}
      <div className="h-[56px] w-full bg-[#4CAF50] flex items-center justify-around px-4 shrink-0">
        <div className="flex items-center gap-1">
          <img src={playerData.avatarUrl} alt="" className="w-10 h-10 rounded-full border-2 border-white" />
        </div>
        <span className="text-3xl">🤝</span>
        <div className="flex items-center gap-1">
          <img src={playerData.avatarUrl} alt="" className="w-10 h-10 rounded-full border-2 border-white" />
        </div>
      </div>
    </div>
  );
}
