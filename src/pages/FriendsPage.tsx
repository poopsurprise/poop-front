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

export function FriendsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = mockFriends.filter(f =>
    f.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-dvh max-w-[420px] mx-auto bg-[#383838] border-x border-white/5">
      {/* Header */}
      <div className="flex items-center gap-2 p-4 shrink-0">
        <span className="text-white text-xl">📋</span>
        <div className="flex-1 flex items-center bg-white/10 rounded-xl px-3 py-2 border border-white/10">
          <span className="text-white/40 text-sm mr-2">ID</span>
          <input
            id="input-friend-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar..."
            className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-white/30"
          />
        </div>
        <button className="w-10 h-10 bg-[#0A84FF] rounded-xl flex items-center justify-center shrink-0">
          <img src={ASSETS.search} alt="Search" className="w-5 h-5 invert" />
        </button>
        <button onClick={() => navigate(-1)} className="text-gray-500 text-xl ml-1">✕</button>
      </div>

      {/* Friends Grid */}
      <div className="flex-1 overflow-y-auto px-3 pb-4">
        <div className="grid grid-cols-4 gap-2">
          {filtered.map((f) => (
            <button
              key={f.id}
              id={`friend-list-${f.id}`}
              onClick={() => console.log('Open friend', f.id)}
              className="flex flex-col items-center gap-1 py-2 transition-transform active:scale-95"
            >
              {/* Avatar */}
              <div className="w-14 h-14 rounded-full overflow-hidden border-[3px] border-green-400 bg-[#4DD0E1]">
                <img src={f.avatar || ASSETS.defaultAvatar} alt={f.username} className="w-full h-full object-cover" />
              </div>
              {/* Name */}
              <span className="text-white text-[10px] truncate max-w-[72px] text-center leading-tight h-6">{f.username}</span>
              {/* Occupation bar */}
              <div className="w-12 h-1 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-green-400 rounded-full" style={{ width: `${f.occupationPercent}%` }} />
              </div>
              {/* Stats row */}
              <div className="flex items-center gap-1 text-[9px]">
                <span className="text-white/60">🤝</span>
                <span className={`${f.isReciprocal ? 'text-orange-400' : 'text-white/30'}`}>
                  💩 {f.streak}
                </span>
                <span className="text-white/40">⚔</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <BannerSlot type="ad" />
      <div className="h-6 bg-gradient-to-r from-orange-400 via-yellow-400 to-green-400 shrink-0" />
    </div>
  );
}
