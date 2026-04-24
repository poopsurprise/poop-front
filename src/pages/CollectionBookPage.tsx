import { useNavigate } from 'react-router-dom';
import { ASSETS } from '../constants/assets';

/**
 * CADERNETA (Coleção) — Poop collection book
 * Mockup: caderneta inventario.png
 */

const mockPoopList = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  number: `#${String(i + 1).padStart(4, '0')}`,
  name: i % 3 === 0 ? 'Smill' : 'Nome',
  img: i < 11 ? ASSETS.madPoop : null, // last one is locked/unknown
}));

export function CollectionBookPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-dvh max-w-[420px] mx-auto bg-gray-100 border-x border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-3 p-3 shrink-0">
        <img src={ASSETS.book} alt="Book" className="h-10 object-contain" />
        <div className="flex-1 flex gap-2">
          <select className="bg-white border border-gray-300 rounded-lg px-2 py-1 text-sm text-gray-600 flex-1">
            <option>Nome Da coleção</option>
            <option>Nome Da coleção 3</option>
          </select>
          <div className="flex items-center bg-white border border-gray-300 rounded-lg px-2 flex-1">
            <img src={ASSETS.search} alt="" className="h-4 opacity-50" />
            <input type="text" className="flex-1 bg-transparent outline-none text-sm px-1" />
          </div>
        </div>
        <button onClick={() => navigate(-1)} className="text-gray-500 text-xl">✕</button>
      </div>

      {/* Cost info */}
      <div className="px-3 pb-2 shrink-0">
        <p className="text-gray-500 text-xs">Nome Da coleção 1</p>
        <div className="flex items-center gap-1">
          <span className="text-gray-700 text-sm font-medium">Coletar um poop para esta coleção custa</span>
          <span>🪙</span>
          <span className="text-gray-800 font-bold">5000</span>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto px-3 pb-20">
        <div className="grid grid-cols-3 gap-2">
          {mockPoopList.map(p => (
            <div key={p.id} className="bg-white rounded-xl p-3 flex flex-col items-center gap-1 shadow-sm">
              {p.img ? (
                <img src={p.img} alt="" className="w-16 h-16 object-contain" />
              ) : (
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center opacity-40">
                  <span className="text-gray-400 text-2xl">?</span>
                </div>
              )}
              <span className="text-gray-500 text-xs font-bold">{p.number}</span>
              <span className="text-gray-400 text-[10px]">{p.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 max-w-[420px] w-full bg-white border-t border-gray-200 px-4 py-2 flex items-center gap-3">
        <img src={ASSETS.trophy} alt="" className="h-10 object-contain" />
        <div className="flex items-center gap-1">
          <img src={ASSETS.diamond} alt="" className="h-5 object-contain" />
          <span className="text-gray-800 font-bold">10</span>
        </div>
        <span className="text-gray-500 text-sm flex-1 text-right">0003 / 1000</span>
        <button id="btn-collect-poop"
          className="bg-[#4A6CF7] text-white px-4 py-2 rounded-xl text-sm transition-transform active:scale-95">⬇️</button>
      </div>
    </div>
  );
}
