import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PoopCard } from '../components/cards/PoopCard';
import { BackButton } from '../components/ui/BackButton';
import { ASSETS } from '../constants/assets';

/**
 * TELA 10 — CATÁLOGO DE POOPS (LOJA)
 * Mockup: Menu de poops.png
 */

type FilterTab = 'all' | 'attack' | 'soft' | 'boost';

const mockCatalog = [
  { id: '1', name: 'Smill', image: ASSETS.poop3, priceCoins: 50, priceDiamonds: 0.02, badge: 'sound' as const, type: 'attack' },
  { id: '2', name: 'Pirata', image: ASSETS.poop4, priceCoins: 100, priceDiamonds: 0.02, badge: 'thief' as const, type: 'attack' },
  { id: '3', name: 'Soft 1', image: ASSETS.poop5, priceCoins: 30, priceDiamonds: 0.01, badge: null, type: 'soft' },
  { id: '4', name: 'Soft 2', image: ASSETS.poop6, priceCoins: 40, priceDiamonds: 0.01, badge: null, type: 'soft' },
  { id: '5', name: 'Collector', image: ASSETS.poop7, priceCoins: 200, priceDiamonds: 0.05, badge: 'collectible' as const, type: 'attack' },
  { id: '6', name: 'Search', image: ASSETS.poop8, priceCoins: 500, priceDiamonds: 0.10, badge: 'search' as const, type: 'attack' },
  { id: '7', name: 'Soft 3', image: ASSETS.poop9, priceCoins: 20, priceDiamonds: 0.01, badge: null, type: 'soft' },
  { id: '8', name: 'Boost Green', image: ASSETS.poop10, priceCoins: 500, priceDiamonds: 0.05, badge: 'boost' as const, type: 'boost' },
  { id: '9', name: 'Boost Gold', image: ASSETS.poop11, priceCoins: 2000, priceDiamonds: 0.20, badge: 'boost' as const, type: 'boost' },
];

import { PoopPurchaseModal } from '../components/modals/PoopPurchaseModal';

export function CatalogPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterTab>('all');
  const [search, setSearch] = useState('');
  const [selectedPoopId, setSelectedPoopId] = useState<string | null>(null);

  const filtered = mockCatalog.filter(p => {
    if (filter !== 'all' && p.type !== filter) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const selectedPoop = mockCatalog.find(p => p.id === selectedPoopId);

  const tabs: { key: FilterTab; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'attack', label: 'Ataque' },
    { key: 'soft', label: 'Soft' },
    { key: 'boost', label: 'BOOST' },
  ];

  return (
    <div className="flex flex-col h-dvh max-w-[420px] mx-auto bg-[#383838] border-x border-white/5 relative">
      {/* Header */}
      <div className="flex items-center gap-2 p-3 shrink-0">
        <span className="text-white text-lg">📦</span>
        <div className="flex-1 flex items-center bg-white/10 rounded-xl px-3 py-1.5 border border-white/10">
          <input
            type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar..." className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-white/30"
          />
          <span className="text-white/40">🔍</span>
        </div>
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
              priceCoins={p.priceCoins} priceDiamonds={p.priceDiamonds}
              badge={p.badge} displayMode="catalog"
              onClick={() => setSelectedPoopId(p.id)}
            />
          ))}
        </div>
        <div className="mt-4"><BackButton onClick={() => navigate(-1)} /></div>
      </div>

      {/* Purchase Modal */}
      {selectedPoop && (
        <PoopPurchaseModal
          isOpen={!!selectedPoopId}
          onClose={() => setSelectedPoopId(null)}
          poopName={selectedPoop.name}
          poopDescription="Poop de ataque, que emite um som engraçado e aumenta o dano em 20% na vida de quem o recebe, caso não se defenda. Clica no Play para ouvir o som."
          poopImage={selectedPoop.image}
          coinPrice={selectedPoop.priceCoins}
          diamondPrice={selectedPoop.priceDiamonds}
          piggyBalance={300005}
          diamondBalance={0.0}
          onPurchase={(type, qty) => {
            console.log('Purchase', type, qty, 'of', selectedPoop.name);
            setSelectedPoopId(null);
          }}
        />
      )}
    </div>
  );
}
