import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackButton } from '../components/ui/BackButton';

function ToggleRow({ id, label, value, onChange }: { id: string; label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between h-12">
      <span className="text-white text-sm">{label}</span>
      <button id={id} onClick={() => onChange(!value)}
        className={`w-12 h-7 rounded-full transition-colors relative ${value ? 'bg-[#4CAF50]' : 'bg-white/20'}`}>
        <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${value ? 'translate-x-5' : 'translate-x-0.5'}`} />
      </button>
    </div>
  );
}

function SectionLabel({ text }: { text: string }) {
  return <div className="pt-4 pb-1"><span className="text-white/40 text-xs uppercase tracking-wider">{text}</span><div className="border-b border-white/10 mt-1" /></div>;
}

export function NotificationsPage() {
  const navigate = useNavigate();
  const [friendsExpanded, setFriendsExpanded] = useState(false);
  const [t, setT] = useState({
    master: true, invFull: true, invFull24: true, h70: true, h3: true, h2: true, h1: true, dead: true,
    purchase: true, friendPoop: true, coin: true, collect: true, gift: true,
    proRecv: true, proLost: true, proWon: true,
    gameInv: true, gameStart: true, gameRes: true, boostRecv: true,
    bonus: true, diamonds: true, collection: true, inspector: true,
  });
  const s = (k: keyof typeof t) => (v: boolean) => setT(p => ({ ...p, [k]: v }));

  return (
    <div className="flex flex-col h-dvh max-w-[420px] mx-auto bg-[#383838] border-x border-white/5">
      <div className="flex items-center justify-between p-4 shrink-0">
        <span />
        <h2 className="text-white font-bold">Configurar Notificações</h2>
        <button onClick={() => navigate(-1)} className="text-gray-500 text-xl">✕</button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-6">
        <ToggleRow id="notif-master" label="🔔 Activar Todas" value={t.master} onChange={s('master')} />
        <div className="border-b border-white/10 mb-2" />

        <SectionLabel text="Inventário" />
        <ToggleRow id="n-inv" label="Inventário cheio" value={t.invFull} onChange={s('invFull')} />
        <ToggleRow id="n-inv24" label="Inventário cheio (24h)" value={t.invFull24} onChange={s('invFull24')} />
        <ToggleRow id="n-h70" label="Vida a 70%" value={t.h70} onChange={s('h70')} />
        <ToggleRow id="n-h3" label="Vida a 3%" value={t.h3} onChange={s('h3')} />
        <ToggleRow id="n-h2" label="Vida a 2%" value={t.h2} onChange={s('h2')} />
        <ToggleRow id="n-h1" label="Vida a 1%" value={t.h1} onChange={s('h1')} />
        <ToggleRow id="n-dead" label="Poop morto (enterro)" value={t.dead} onChange={s('dead')} />

        <SectionLabel text="Receber Itens" />
        <ToggleRow id="n-purch" label="Poop comprado recebido" value={t.purchase} onChange={s('purchase')} />
        <ToggleRow id="n-fpoop" label="Poop de amigo recebido" value={t.friendPoop} onChange={s('friendPoop')} />
        <ToggleRow id="n-coin" label="Moeda recebida" value={t.coin} onChange={s('coin')} />
        <ToggleRow id="n-coll" label="Poop coleccionável" value={t.collect} onChange={s('collect')} />
        <ToggleRow id="n-gift" label="Presente recebido" value={t.gift} onChange={s('gift')} />

        <SectionLabel text="Modo Pro" />
        <ToggleRow id="n-proR" label="Proposta de desafio" value={t.proRecv} onChange={s('proRecv')} />
        <ToggleRow id="n-proL" label="Desafio perdido" value={t.proLost} onChange={s('proLost')} />
        <ToggleRow id="n-proW" label="Desafio ganho" value={t.proWon} onChange={s('proWon')} />

        <SectionLabel text="Jogos" />
        <ToggleRow id="n-gInv" label="Convite para jogo" value={t.gameInv} onChange={s('gameInv')} />
        <ToggleRow id="n-gStr" label="Jogo a começar" value={t.gameStart} onChange={s('gameStart')} />
        <ToggleRow id="n-gRes" label="Resultado de jogo" value={t.gameRes} onChange={s('gameRes')} />
        <ToggleRow id="n-boost" label="BOOST recebido" value={t.boostRecv} onChange={s('boostRecv')} />

        <SectionLabel text="Social/Economia" />
        <ToggleRow id="n-bon" label="Código bónus usado" value={t.bonus} onChange={s('bonus')} />
        <ToggleRow id="n-dia" label="Diamantes recebidos" value={t.diamonds} onChange={s('diamonds')} />
        <ToggleRow id="n-colC" label="Coleção completa" value={t.collection} onChange={s('collection')} />
        <ToggleRow id="n-insp" label="Inspector revelou saldo" value={t.inspector} onChange={s('inspector')} />

        <div className="mt-4">
          <button onClick={() => setFriendsExpanded(!friendsExpanded)}
            className="w-full bg-white/10 rounded-xl px-4 py-3 flex items-center justify-between border border-white/10">
            <span className="text-white text-sm">📱 Notificação de amigos</span>
            <span className="text-white/50">{friendsExpanded ? '▲' : '▶'}</span>
          </button>
          {friendsExpanded && (
            <div className="mt-2 space-y-1 pl-2">
              {['Mery', 'João', 'Ana'].map((n, i) => (
                <div key={i} className="flex items-center gap-3 py-2">
                  <div className="w-10 h-10 rounded-full bg-[#4DD0E1] shrink-0" />
                  <span className="text-white text-sm flex-1">{n}</span>
                  <div className="w-10 h-6 rounded-full bg-[#4CAF50] relative">
                    <div className="absolute top-0.5 right-0.5 w-5 h-5 bg-white rounded-full shadow" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="mt-6"><BackButton onClick={() => navigate(-1)} /></div>
      </div>
    </div>
  );
}
