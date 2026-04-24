import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PoopCard } from '../components/cards/PoopCard';
import { BackButton } from '../components/ui/BackButton';
import { ASSETS } from '../constants/assets';

/**
 * TELA 11 — CESTO (ARQUIVO)
 * Mockup: inventario cesto.png / Menu de poops-2.png
 */

type FilterTab = 'all' | 'attack' | 'soft' | 'boost';

const mockChest = [
  { id: 'c1', name: 'Smill', image: ASSETS.poop3, type: 'attack', badge: 'sound' as const },
  { id: 'c2', name: 'Pirata', image: ASSETS.poop4, type: 'attack', badge: 'thief' as const },
  { id: 'c3', name: 'Soft A', image: ASSETS.poop5, type: 'soft', badge: null },
  { id: 'c4', name: 'Soft B', image: ASSETS.poop6, type: 'soft', badge: null },
  { id: 'c5', name: 'Boost Verde', image: ASSETS.poop10, type: 'boost', badge: 'boost' as const },
  { id: 'c6', name: 'Boost Gold', image: ASSETS.poop11, type: 'boost', badge: 'boost' as const },
  { id: 'c7', name: 'Collector', image: ASSETS.poop7, type: 'attack', badge: 'collectible' as const },
  { id: 'c8', name: 'Soft C', image: ASSETS.poop9, type: 'soft', badge: null },
];

export function ChestPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterTab>('all');
  const [search, setSearch] = useState('');

  const filtered = mockChest.filter(p => {
    if (filter !== 'all' && p.type !== filter) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const tabs: { key: FilterTab; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'attack', label: 'Ataque' },
    { key: 'soft', label: 'Soft' },
    { key: 'boost', label: 'BOOST' },
  ];

  return (
    <div className="flex flex-col h-dvh max-w-[420px] mx-auto bg-[#383838] border-x border-white/5">
      {/* Header */}
      <div className="flex items-center gap-2 p-3 shrink-0">
        <span className="text-white text-lg">🧺</span>
        <div className="flex-1 flex items-center bg-white/10 rounded-xl px-3 py-1.5 border border-white/10">
          <input
            type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar..." className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-white/30"
          />
          <span className="text-white/40">🔍</span>
        </div>
        <span className="text-white/50 text-sm font-mono">{filtered.length}</span>
        <button onClick={() => navigate(-1)} className="text-gray-500 text-xl">✕</button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 px-3 pb-2 shrink-0">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setFilter(t.key)}
            className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filter === t.key ? 'bg-[#0A84FF] text-white' : 'bg-white/10 text-white/60'
            }`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto px-3 pb-4">
        <div className="grid grid-cols-3 gap-2">
          {filtered.map(p => (
            <PoopCard
              key={p.id} id={p.id} name={p.name} image={p.image}
              badge={p.badge} displayMode="chest"
              onClick={() => console.log('Open chest poop', p.id)}
            />
          ))}
        </div>
        <div className="mt-4"><BackButton onClick={() => navigate(-1)} /></div>
      </div>
    </div>
  );
}
