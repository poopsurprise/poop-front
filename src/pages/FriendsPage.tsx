import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BannerSlot } from '../components/layout/BannerSlot';
import { ManageFriendModal } from '../components/modals/ManageFriendModal';
import { trpc } from '../lib/trpc';
import { ASSETS } from '../constants/assets';

/**
 * TELA 13 — LISTA DE AMIGOS
 * Dados reais via tRPC: social.friends + social.addFriend + social.removeFriend
 */

export function FriendsPage() {
  const navigate = useNavigate();
  const utils = trpc.useUtils();
  const friendsQuery = trpc.social.friends.useQuery(undefined, { staleTime: 30_000 });
  const addFriendMutation = trpc.social.addFriend.useMutation({
    onSuccess: () => utils.social.friends.invalidate(),
  });
  const removeFriendMutation = trpc.social.removeFriend.useMutation({
    onSuccess: () => utils.social.friends.invalidate(),
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFriendId, setSelectedFriendId] = useState<string | null>(null);
  const [addError, setAddError] = useState<string | null>(null);

  const friends = friendsQuery.data?.friends ?? [];

  const filtered = friends.filter(f =>
    f.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedFriend = friends.find(f => f.id === selectedFriendId);

  const handleAddFriend = async () => {
    if (!searchQuery.trim()) return;
    setAddError(null);
    try {
      await addFriendMutation.mutateAsync({ targetUsername: searchQuery.trim() });
      setSearchQuery('');
    } catch (err: any) {
      setAddError(err.message ?? 'Erro ao adicionar amigo');
    }
  };

  return (
    <div className="flex flex-col h-dvh max-w-[420px] mx-auto bg-[#828282] border-x border-white/5 relative">
      {/* Header Area */}
      <div className="bg-[#b38f4d] flex items-center justify-between p-4 shrink-0 shadow-sm z-10">
        <h1 className="text-white text-xl font-medium tracking-wide">
          Amigos ({friends.length})
        </h1>
        <button onClick={() => navigate(-1)} className="text-white text-2xl">✕</button>
      </div>

      {/* Search Bar Area */}
      <div className="bg-white/20 p-3 mx-4 mt-4 rounded-xl shadow-inner flex items-center gap-3">
        <button className="w-12 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm shrink-0">
          <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <div className="flex-1 h-10 bg-white rounded-lg px-3 flex items-center shadow-sm">
          <span className="text-gray-500 text-sm font-medium mr-2">ID</span>
          <input
            id="input-friend-search"
            type="text"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setAddError(null); }}
            className="flex-1 bg-transparent text-gray-700 text-sm outline-none"
            placeholder="Username do amigo..."
          />
        </div>
        
        <button
          onClick={handleAddFriend}
          disabled={addFriendMutation.isPending}
          className="w-10 h-10 bg-[#4A72D6] rounded-lg flex items-center justify-center shadow-sm shrink-0 disabled:opacity-50"
        >
          <img src={ASSETS.search} alt="Search" className="w-5 h-5 invert" />
        </button>
      </div>

      {addError && (
        <div className="mx-4 mt-2 text-red-400 text-xs px-2">{addError}</div>
      )}

      {/* Friends Grid */}
      <div className="flex-1 overflow-y-auto px-3 pb-4 pt-4">
        {friendsQuery.isLoading ? (
          <div className="text-white/40 text-sm text-center py-8 animate-pulse">A carregar amigos...</div>
        ) : filtered.length === 0 ? (
          <div className="text-white/40 text-sm text-center py-8">
            {friends.length === 0
              ? 'Sem amigos. Pesquisa um username para adicionar!'
              : 'Nenhum resultado encontrado.'}
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {filtered.map((f) => (
              <button
                key={f.id}
                id={`friend-list-${f.id}`}
                onClick={() => setSelectedFriendId(f.id)}
                className="relative flex flex-col bg-white rounded-2xl pt-6 pb-2 px-1 items-center shadow-sm border border-gray-200 mt-6 transition-transform active:scale-95"
              >
                {/* Overlapping Avatar */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full overflow-hidden border-2 border-white bg-[#4DD0E1] shadow-sm">
                  <img src={f.avatar || ASSETS.defaultAvatar} alt={f.username} className="w-full h-full object-cover" />
                </div>
                
                <span className="text-gray-800 text-[9px] font-bold truncate w-full text-center mt-1">
                  {f.username}
                </span>
                
                <div className="w-full border-t border-dotted border-gray-300 my-1"></div>
                
                <div className="w-full px-1">
                  <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden mb-0.5">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${f.healthPercent}%` }} />
                  </div>
                  <div className="text-[8px] text-gray-400 text-right font-medium w-full">
                    Lv.{f.level}
                  </div>
                </div>
                
                <div className="w-full border-t border-dotted border-gray-300 my-1"></div>
                
                <div className="flex items-center justify-between w-full px-1 text-[8px]">
                  <span className="text-gray-500 text-[10px]">🤝</span>
                  <span className={`font-bold flex items-center gap-0.5 ${f.isReciprocal ? 'text-orange-500' : 'text-gray-400'}`}>
                    💩 {f.streak}
                  </span>
                  <span className="text-green-600 text-[10px]">⚔</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <BannerSlot type="ad" />
      <div className="h-6 bg-gradient-to-r from-orange-400 via-yellow-400 to-green-400 shrink-0" />

      {/* Manage Friend Modal */}
      {selectedFriend && (
        <ManageFriendModal
          isOpen={!!selectedFriendId}
          onClose={() => setSelectedFriendId(null)}
          friendId={selectedFriend.id}
          friendName={selectedFriend.username}
          friendAvatar={selectedFriend.avatar || ASSETS.defaultAvatar}
          friendshipProgress={selectedFriend.healthPercent}
          onUpdateName={(name) => console.log('Update name', name)}
          onUnfriend={async () => {
            await removeFriendMutation.mutateAsync({ friendId: selectedFriend.id });
            setSelectedFriendId(null);
          }}
          onSendPoop={() => {
            setSelectedFriendId(null);
            navigate('/delivery');
          }}
          onChallenge={() => {
            setSelectedFriendId(null);
            navigate('/game/parking');
          }}
          onToggleNotification={(enabled) => console.log('Notifications:', enabled)}
        />
      )}
    </div>
  );
}
