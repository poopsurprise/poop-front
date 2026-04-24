import { useNavigate } from 'react-router-dom';
import { ASSETS } from '../constants/assets';

/**
 * Gerir Amigo — Modal-style page
 * Mockup: gerir amigo.png
 */

const mockFriend = {
  id: '000000000001',
  username: 'Mery Domingosm',
  avatarUrl: '/assets/img/avatar-fallback.png',
  healthPercent: 20,
  poopsSent: 1000,
};

export function ManageFriendPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-dvh max-w-[420px] mx-auto bg-[#383838] border-x border-white/5">
      <div className="flex items-center justify-end p-4 shrink-0">
        <button onClick={() => navigate(-1)} className="text-gray-400 text-2xl">✕</button>
      </div>

      <div className="flex-1 flex items-start justify-center px-6">
        <div className="bg-white rounded-2xl w-full max-w-[340px] p-6 flex flex-col items-center gap-3">
          {/* Avatar */}
          <img src={mockFriend.avatarUrl} alt="" className="w-24 h-24 rounded-full object-cover border-2 border-gray-200" />
          <p className="text-gray-400 text-xs">ID</p>
          <p className="text-gray-800 font-bold text-lg">{mockFriend.username}</p>

          {/* Health bar */}
          <div className="w-full flex items-center gap-2">
            <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: `${mockFriend.healthPercent}%` }} />
            </div>
            <span className="text-gray-500 text-sm">{mockFriend.healthPercent}%</span>
          </div>

          {/* Nickname field */}
          <input type="text" placeholder="Name"
            className="w-full bg-gray-100 rounded-xl px-4 py-2.5 text-center text-gray-600 outline-none" />

          {/* Stats */}
          <div className="flex items-center gap-3 my-1">
            <span className="text-2xl">🤝</span>
            <span className="text-2xl">💩</span>
            <span className="text-gray-800 font-bold text-xl">{mockFriend.poopsSent.toLocaleString()}</span>
          </div>

          <div className="border-t border-gray-200 w-full" />

          {/* Game invite icons */}
          <div className="flex items-center justify-center gap-6 my-1">
            <img src={ASSETS.gameRanking} alt="Ranking" className="w-10 h-10 object-contain" />
            <img src={ASSETS.game1v1} alt="1v1" className="w-10 h-10 object-contain" />
            <img src={ASSETS.gameBomba} alt="Bomba" className="w-10 h-10 object-contain" />
          </div>

          <div className="border-t border-gray-200 w-full" />

          {/* Notification toggle */}
          <div className="flex items-center gap-2">
            <span className="text-xl">☑️</span>
            <span className="text-2xl">🔔</span>
          </div>

          {/* Action buttons */}
          <button id="btn-manage-friend-action"
            className="w-[80%] py-3 bg-[#4A6CF7] rounded-2xl flex items-center justify-center gap-3 transition-transform active:scale-95">
            <span className="text-white text-xl">🗑️</span>
            <span className="text-white text-xl">☑️</span>
          </button>
        </div>
      </div>
    </div>
  );
}
