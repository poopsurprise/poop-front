import { useNavigate } from 'react-router-dom';
import { ASSETS } from '../constants/assets';

/**
 * ENTERRO DE POOP — Burial animation screen
 * Mockup: Enterro de poop.png
 */

const mockBurial = {
  senderAvatar: '/assets/img/avatar-fallback.png',
  senderName: 'Mery Domingosm',
  senderScore: 325,
};

const mockGrid = Array.from({ length: 12 }, (_, i) => ({
  id: `slot-${i}`,
  avatarUrl: '/assets/img/avatar-fallback.png',
  name: 'Mery Domingosm',
  level: 20,
}));

export function BuryPoopPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-dvh max-w-[420px] mx-auto bg-[#383838] border-x border-white/5">
      <div className="flex items-center justify-end p-3 shrink-0">
        <button onClick={() => navigate(-1)} className="text-gray-400 text-2xl">✕</button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-4">
        {/* Sender card */}
        <div className="bg-gray-200 rounded-xl p-3 flex items-center gap-3 mb-2 mx-1">
          <img src={mockBurial.senderAvatar} alt="" className="w-12 h-12 rounded-full object-cover" />
          <span className="text-gray-700 font-medium flex-1">{mockBurial.senderName}</span>
          <span className="text-gray-600 font-bold">{mockBurial.senderScore}</span>
        </div>

        {/* Arrow */}
        <div className="flex justify-center my-1">
          <span className="text-white text-2xl">↓</span>
        </div>

        {/* Burial zone */}
        <div className="bg-gray-200 rounded-xl p-4 flex items-center justify-between mx-1 mb-4">
          <img src={ASSETS.madPoop} alt="Poop" className="h-12 object-contain" />
          <img src={ASSETS.tombstone} alt="RIP" className="h-16 object-contain" />
          <img src={ASSETS.cashRegister} alt="Buy" className="h-12 object-contain" />
        </div>

        {/* Grid of recipients */}
        <div className="grid grid-cols-4 gap-2">
          {mockGrid.map(s => (
            <div key={s.id} className="bg-gray-300/80 rounded-xl p-2 flex flex-col items-center gap-1">
              <img src={s.avatarUrl} alt="" className="w-10 h-10 rounded-full object-cover opacity-70" />
              <p className="text-gray-700 text-[9px] text-center truncate w-full">{s.name}</p>
              <div className="w-full h-1 bg-gray-400/50 rounded-full">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '60%' }} />
              </div>
              <span className="text-gray-500 text-[9px]">{s.level}</span>
            </div>
          ))}
        </div>

        {/* Banner ad slot */}
        <div className="h-[50px] bg-[#2C2C2E] rounded-xl flex items-center justify-center mt-4 border border-white/10">
          <span className="text-white/40 text-xs">Banner Publicitário</span>
        </div>
      </div>
    </div>
  );
}
