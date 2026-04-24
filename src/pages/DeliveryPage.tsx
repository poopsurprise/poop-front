import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopToolbar } from '../components/layout/TopToolbar';
import { BannerSlot } from '../components/layout/BannerSlot';
import { FriendCard } from '../components/cards/FriendCard';
import { AuthInput } from '../components/ui/AuthInput';
import { trpc } from '../lib/trpc';
import { ASSETS } from '../constants/assets';

/**
 * TELA 06 — DELIVERY
 * Mockup: Delivery e lista de amigos disponiveis.png
 */

const mockFriends = [
  { id: '1', username: 'Mery Domingosm', avatar: '', variant: 'available' as const, occupationPercent: 20 },
  { id: '2', username: 'João Silva', avatar: '', variant: 'full' as const, occupationPercent: 100 },
  { id: '3', username: 'Ana Costa', avatar: '', variant: 'ceasefire' as const, occupationPercent: 50 },
  { id: '4', username: 'Carlos', avatar: '', variant: 'noreturn_poop' as const, occupationPercent: 30 },
  { id: '5', username: 'Maria', avatar: '', variant: 'available' as const, occupationPercent: 10 },
  { id: '6', username: 'Pedro', avatar: '', variant: 'dead' as const, occupationPercent: 0 },
  { id: '7', username: 'Sara', avatar: '', variant: 'noreturn_coin' as const, occupationPercent: 60 },
  { id: '8', username: 'Rui', avatar: '', variant: 'in_boost_game' as const, occupationPercent: 40 },
  { id: '9', username: 'Tiago', avatar: '', variant: 'available' as const, occupationPercent: 55 },
  { id: '10', username: 'Inês', avatar: '', variant: 'available' as const, occupationPercent: 15 },
  { id: '11', username: 'Miguel', avatar: '', variant: 'available' as const, occupationPercent: 75 },
  { id: '12', username: 'Sofia', avatar: '', variant: 'available' as const, occupationPercent: 90 },
];

export function DeliveryPage() {
  const navigate = useNavigate();
  const meQuery = trpc.auth.me.useQuery(undefined, { staleTime: 60_000 });
  const user = meQuery.data;
  const [recipientId, setRecipientId] = useState('');
  const [error, setError] = useState<string | null>(null);

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

  const handleSend = () => {
    if (!recipientId.trim()) {
      setError('ID não encontrado');
      return;
    }
    setError(null);
    console.log('Send to:', recipientId);
  };

  const handleFriendClick = (friendId: string) => {
    setRecipientId(friendId);
    setError(null);
  };

  return (
    <div className="flex flex-col h-dvh max-w-[420px] mx-auto bg-[#383838] relative border-x border-white/5">
      
      <TopToolbar
        player={playerData}
        activeGames={0}
        onAvatarClick={() => navigate('/profile')}
      />

      {/* Close button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-5 right-3 z-50 w-8 h-8 flex items-center justify-center text-xl text-gray-500 hover:text-white"
      >
        ✕
      </button>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex flex-col px-4 pt-3">
        
        {/* Sender Card */}
        <div className="bg-white/10 rounded-xl p-3 flex items-center gap-3 mb-3 shrink-0">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-[#4DD0E1] shrink-0">
            <img src={playerData.avatarUrl} alt="Me" className="w-full h-full object-cover scale-[1.75]" />
          </div>
          <div>
            <p className="text-white font-medium text-sm">{playerData.username}</p>
            <p className="text-white/50 text-xs font-mono">#{playerData.id.slice(0, 6)}</p>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center mb-2 shrink-0">
          <span className="text-white/40 text-xl">↓</span>
        </div>

        {/* Item + Send Card */}
        <div className="bg-white/10 rounded-xl p-3 flex items-center gap-3 mb-1 shrink-0">
          <div className="w-14 h-14 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
            <img src={ASSETS.poop3} alt="Poop" className="w-10 h-10 object-contain" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-white text-sm font-medium">🪙 1000</span>
              <span className="text-red-400 text-sm">💔</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                id="input-delivery-id"
                type="text"
                value={recipientId}
                onChange={(e) => { setRecipientId(e.target.value); setError(null); }}
                placeholder="ID"
                className="flex-1 bg-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder:text-white/30 outline-none border border-white/10 focus:border-[#0A84FF]"
              />
              <button
                id="btn-delivery-send"
                onClick={handleSend}
                className="bg-[#0A84FF] rounded-lg px-4 py-2 text-white text-sm font-bold transition-transform active:scale-95"
              >
                ✈️ ENVIAR
              </button>
            </div>
          </div>
        </div>

        {/* Error space */}
        <div className="h-5 shrink-0 px-1">
          {error && <span className="text-red-400 text-xs">{error}</span>}
        </div>

        {/* Friends Grid */}
        <div className="flex-1 overflow-y-auto mt-1">
          <div className="grid grid-cols-4 gap-1">
            {mockFriends.map((f) => (
              <FriendCard
                key={f.id}
                id={f.id}
                username={f.username}
                avatar={f.avatar}
                variant={f.variant}
                occupationPercent={f.occupationPercent}
                ceasefireTimer="07:59"
                onClick={() => handleFriendClick(f.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Banner */}
      <BannerSlot type="ad" />
    </div>
  );
}
