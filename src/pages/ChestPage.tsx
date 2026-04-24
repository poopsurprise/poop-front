import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PoopCard } from '../components/cards/PoopCard';
import { PoopSendModal } from '../components/modals/PoopSendModal';
import { BackButton } from '../components/ui/BackButton';
import { trpc } from '../lib/trpc';
import { ASSETS } from '../constants/assets';

/**
 * TELA 11 — CESTO (ARQUIVO)
 * Dados reais via tRPC: social.chestItems
 */
type FilterTab = 'all' | 'attack' | 'soft' | 'boost';

const categoryFilter: Record<FilterTab, string[] | null> = {
  all: null,
  attack: ['ATTACK_POOP'],
  soft: ['SOFT_POOP', 'COLLECTIBLE_POOP'],
  boost: ['BOOST'],
};

export function ChestPage() {
  const navigate = useNavigate();
  const chestQuery = trpc.social.chestItems.useQuery(undefined, { staleTime: 30_000 });
  const [filter, setFilter] = useState<FilterTab>('all');
  const [search, setSearch] = useState('');
  const [selectedPoopId, setSelectedPoopId] = useState<string | null>(null);

  const allItems = chestQuery.data?.items ?? [];

  const filtered = allItems.filter(p => {
    if (filter !== 'all') {
      const cats = categoryFilter[filter];
      if (cats && !cats.includes(p.category)) return false;
    }
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const selectedPoop = allItems.find(p => p.id === selectedPoopId);

  const tabs: { key: FilterTab; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'attack', label: 'Ataque' },
    { key: 'soft', label: 'Soft' },
    { key: 'boost', label: 'BOOST' },
  ];

  const getBadge = (item: typeof allItems[0]) => {
    if (item.badge === 'sound') return 'sound' as const;
    if (item.badge === 'thief') return 'thief' as const;
    if (item.badge === 'collectible') return 'collectible' as const;
    if (item.badge === 'boost') return 'boost' as const;
    if (item.badge === 'search') return 'search' as const;
    return null;
  };

  return (
    <div className="flex flex-col h-dvh max-w-[420px] mx-auto bg-[#383838] border-x border-white/5 relative">
      <div className="flex items-center gap-2 p-3 shrink-0">
        <span className="text-white text-lg">🧺</span>
        <div className="flex-1 flex items-center bg-white/10 rounded-xl px-3 py-1.5 border border-white/10">
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar..." className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-white/30" />
          <span className="text-white/40">🔍</span>
        </div>
        <span className="text-white/50 text-sm font-mono">{filtered.length}</span>
        <button onClick={() => navigate(-1)} className="text-gray-500 text-xl">✕</button>
      </div>
      <div className="flex gap-1 px-3 pb-2 shrink-0">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setFilter(t.key)}
            className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === t.key ? 'bg-[#0A84FF] text-white' : 'bg-white/10 text-white/60'}`}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto px-3 pb-4">
        {chestQuery.isLoading ? (
          <div className="text-white/40 text-sm text-center py-8 animate-pulse">A carregar baú...</div>
        ) : filtered.length === 0 ? (
          <div className="text-white/40 text-sm text-center py-8">Baú vazio. Compra items na loja!</div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {filtered.map(p => (
              <PoopCard key={p.id} id={p.id} name={p.name}
                image={p.image || ASSETS.poop3}
                badge={getBadge(p)} displayMode="chest"
                onClick={() => setSelectedPoopId(p.id)} />
            ))}
          </div>
        )}
        <div className="mt-4"><BackButton onClick={() => navigate(-1)} /></div>
      </div>
      {selectedPoop && (
        <PoopSendModal isOpen={!!selectedPoopId} onClose={() => setSelectedPoopId(null)}
          poopName={selectedPoop.name}
          poopDescription={selectedPoop.description || 'Item do baú.'}
          poopImage={selectedPoop.image || ASSETS.poop3}
          isBoost={selectedPoop.category === 'BOOST'}
          onSend={(method) => { console.log('Send', selectedPoop.name, 'via', method); setSelectedPoopId(null); }}
        />
      )}
    </div>
  );
}
