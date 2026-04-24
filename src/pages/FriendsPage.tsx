import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BannerSlot } from '../components/layout/BannerSlot';
import { ASSETS } from '../constants/assets';

/**
 * TELA 13 — LISTA DE AMIGOS
 * Mockup: Encontrar de amigos e lista de amigos.png
 */

const mockFriends = [
  { id: '1', username: 'Mery Domingosm', avatar: '', occupationPercent: 20, streak: 1000, isReciprocal: true },
  { id: '2', username: 'João Silva', avatar: '', occupationPercent: 65, streak: 500, isReciprocal: true },
  { id: '3', username: 'Ana Costa', avatar: '', occupationPercent: 10, streak: 0, isReciprocal: false },
  { id: '4', username: 'Carlos Mendes', avatar: '', occupationPercent: 30, streak: 45, isReciprocal: true },
  { id: '5', username: 'Maria Santos', avatar: '', occupationPercent: 15, streak: 120, isReciprocal: true },
  { id: '6', username: 'Pedro Alves', avatar: '', occupationPercent: 80, streak: 0, isReciprocal: false },
  { id: '7', username: 'Sara Lima', avatar: '', occupationPercent: 55, streak: 300, isReciprocal: true },
  { id: '8', username: 'Rui Gomes', avatar: '', occupationPercent: 40, streak: 12, isReciprocal: true },
];

import { ManageFriendModal } from '../components/modals/ManageFriendModal';

export function FriendsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFriendId, setSelectedFriendId] = useState<string | null>(null);

  const filtered = mockFriends.filter(f =>
    f.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedFriend = mockFriends.find(f => f.id === selectedFriendId);

  return (
    <div className="flex flex-col h-dvh max-w-[420px] mx-auto bg-[#828282] border-x border-white/5 relative">
      {/* Header Area */}
      <div className="bg-[#b38f4d] flex items-center justify-between p-4 shrink-0 shadow-sm z-10">
        <h1 className="text-white text-xl font-medium tracking-wide">
          Encontrar de amigos e list...
        </h1>
        <button onClick={() => navigate(-1)} className="text-white text-2xl">✕</button>
      </div>

      {/* Search Bar Area */}
      <div className="bg-white/20 p-3 mx-4 mt-4 rounded-xl shadow-inner flex items-center gap-3">
        {/* Menu Icon Button */}
        <button className="w-12 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm shrink-0">
          <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        {/* Input Field */}
        <div className="flex-1 h-10 bg-white rounded-lg px-3 flex items-center shadow-sm">
          <span className="text-gray-500 text-sm font-medium mr-2">ID</span>
          <input
            id="input-friend-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-gray-700 text-sm outline-none"
          />
        </div>
        
        {/* Search Button */}
        <button className="w-10 h-10 bg-[#4A72D6] rounded-lg flex items-center justify-center shadow-sm shrink-0">
          <img src={ASSETS.search} alt="Search" className="w-5 h-5 invert" />
        </button>
      </div>

      {/* Friends Grid */}
      <div className="flex-1 overflow-y-auto px-3 pb-4 pt-4">
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
              
              {/* Name */}
              <span className="text-gray-800 text-[9px] font-bold truncate w-full text-center mt-1">
                {f.username}
              </span>
              
              {/* Dotted separator */}
              <div className="w-full border-t border-dotted border-gray-300 my-1"></div>
              
              {/* Progress and percentage */}
              <div className="w-full px-1">
                <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden mb-0.5">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: `${f.occupationPercent}%` }} />
                </div>
                <div className="text-[8px] text-gray-400 text-right font-medium w-full">
                  {f.occupationPercent}%
                </div>
              </div>
              
              {/* Dotted separator */}
              <div className="w-full border-t border-dotted border-gray-300 my-1"></div>
              
              {/* Stats row */}
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
          friendshipProgress={selectedFriend.occupationPercent}
          onUpdateName={(name) => console.log('Update name', name)}
          onUnfriend={() => {
            console.log('Unfriend', selectedFriend.username);
            setSelectedFriendId(null);
          }}
          onSendPoop={() => {
            console.log('Send 1000 poop to', selectedFriend.username);
            // Poderíamos abrir o delivery com este amigo selecionado
            setSelectedFriendId(null);
            navigate('/delivery');
          }}
          onChallenge={() => {
            console.log('Challenge', selectedFriend.username);
            setSelectedFriendId(null);
            navigate('/game/parking');
          }}
          onToggleNotification={(enabled) => console.log('Notifications:', enabled)}
        />
      )}
    </div>
  );
}
