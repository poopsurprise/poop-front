import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopToolbar } from '../components/layout/TopToolbar';
import { BannerSlot } from '../components/layout/BannerSlot';
import { FriendCard } from '../components/cards/FriendCard';
import { trpc } from '../lib/trpc';
import { usePlayerData } from '../hooks/usePlayerData';
import { ASSETS } from '../constants/assets';

/**
 * TELA 06 — DELIVERY
 * Dados reais via tRPC: social.friends + sending.delivery
 */

export function DeliveryPage() {
  const navigate = useNavigate();
  const { playerData } = usePlayerData();
  const friendsQuery = trpc.social.friends.useQuery(undefined, { staleTime: 30_000 });
  const deliveryMutation = trpc.sending.delivery.useMutation();
  const utils = trpc.useUtils();

  const [recipientUsername, setRecipientUsername] = useState('');
  const [selectedPosition, setSelectedPosition] = useState(1); // TODO: receive from inventory selection
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const friends = friendsQuery.data?.friends ?? [];

  const handleSend = async () => {
    if (!recipientUsername.trim()) {
      setError('Introduz o username do destinatário');
      return;
    }
    setError(null);
    setSuccess(null);

    try {
      const result = await deliveryMutation.mutateAsync({
        position: selectedPosition,
        recipientUsername: recipientUsername.trim(),
      });

      if (result.success) {
        setSuccess(`Enviado para ${recipientUsername}!`);
        setRecipientUsername('');
        utils.inventory.getAll.invalidate();
      } else if (result.sickApplied) {
        setError('Username inválido — penalização sick aplicada');
      }
    } catch (err: any) {
      setError(err.message ?? 'Falha no envio');
    }
  };

  const handleFriendClick = (friendUsername: string) => {
    setRecipientUsername(friendUsername);
    setError(null);
    setSuccess(null);
  };

  // Map friend status to FriendCard variant
  const getFriendVariant = (friend: typeof friends[0]): 'available' | 'full' | 'ceasefire' | 'dead' | 'noreturn_poop' | 'noreturn_coin' | 'in_boost_game' => {
    if (friend.healthPercent === 0) return 'dead';
    if (friend.status === 'BLOCKED') return 'ceasefire';
    return 'available';
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
                value={recipientUsername}
                onChange={(e) => { setRecipientUsername(e.target.value); setError(null); }}
                placeholder="Username"
                className="flex-1 bg-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder:text-white/30 outline-none border border-white/10 focus:border-[#0A84FF]"
              />
              <button
                id="btn-delivery-send"
                onClick={handleSend}
                disabled={deliveryMutation.isPending}
                className="bg-[#0A84FF] rounded-lg px-4 py-2 text-white text-sm font-bold transition-transform active:scale-95 disabled:opacity-50"
              >
                {deliveryMutation.isPending ? '...' : '✈️ ENVIAR'}
              </button>
            </div>
          </div>
        </div>

        {/* Error/Success space */}
        <div className="h-5 shrink-0 px-1">
          {error && <span className="text-red-400 text-xs">{error}</span>}
          {success && <span className="text-green-400 text-xs">{success}</span>}
        </div>

        {/* Friends Grid */}
        <div className="flex-1 overflow-y-auto mt-1">
          {friendsQuery.isLoading ? (
            <div className="text-white/40 text-sm text-center py-8 animate-pulse">A carregar amigos...</div>
          ) : friends.length === 0 ? (
            <div className="text-white/40 text-sm text-center py-8">Sem amigos adicionados. Adiciona amigos na página de amigos!</div>
          ) : (
            <div className="grid grid-cols-4 gap-1">
              {friends.map((f) => (
                <FriendCard
                  key={f.id}
                  id={f.id}
                  username={f.username}
                  avatar={f.avatar}
                  variant={getFriendVariant(f)}
                  occupationPercent={0}
                  ceasefireTimer="07:59"
                  onClick={() => handleFriendClick(f.username)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Banner */}
      <BannerSlot type="ad" />
    </div>
  );
}
