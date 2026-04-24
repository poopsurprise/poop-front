import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopToolbar } from '../components/layout/TopToolbar';
import { BackButton } from '../components/ui/BackButton';
import { DiamondPackCard } from '../components/cards/DiamondPackCard';
import { trpc } from '../lib/trpc';
import { ASSETS } from '../constants/assets';

/**
 * TELA 19 — DIAMANTES / P2P
 * Mockup: Diamantes.png (was Loja-1.png)
 */

export function DiamondsPage() {
  const navigate = useNavigate();
  const meQuery = trpc.auth.me.useQuery(undefined, { staleTime: 60_000 });
  const user = meQuery.data;
  const [transferAmount, setTransferAmount] = useState('');
  const [transferId, setTransferId] = useState('');
  const [redeemCode, setRedeemCode] = useState('');
  const [transferError, setTransferError] = useState<string | null>(null);
  const [redeemError, setRedeemError] = useState<string | null>(null);

  const playerData = {
    id: user?.id ?? '', username: user?.username ?? '...',
    email: user?.email ?? '', avatarUrl: user?.avatarUrl ?? '/assets/img/avatar-fallback.png',
    healthPercent: user?.healthPercent ?? 100, level: user?.level ?? 1,
    piggyBalance: user?.piggyBalance ?? 0, diamondBalance: Number(user?.diamondBalance ?? 0),
    rankingScore: Number(user?.rankingScore ?? 0), country: user?.country ?? null,
    yearOfBirth: 2000, bonusCode: null, lastActiveAt: null,
    createdAt: user?.createdAt ? String(user.createdAt) : new Date().toISOString(),
  };

  return (
    <div className="flex flex-col h-dvh max-w-[420px] mx-auto bg-[#383838] border-x border-white/5">
      <TopToolbar player={playerData} activeGames={0} onAvatarClick={() => navigate('/profile')} />

      <div className="flex-1 overflow-y-auto px-4 pt-3 pb-6">
        {/* Diamond balance */}
        <div className="bg-white/10 rounded-2xl p-4 flex items-center justify-center gap-3 mb-5">
          <img src={ASSETS.diamond} alt="" className="h-8" />
          <span className="text-white text-3xl font-bold">{playerData.diamondBalance.toFixed(2)}</span>
        </div>

        {/* Buy Diamonds */}
        <h3 className="text-white/60 text-xs uppercase tracking-wider mb-2">Comprar Diamantes</h3>
        <div className="flex gap-3 overflow-x-auto pb-3 mb-5">
          {[
            { qty: 100, orig: '10€', disc: '9.70€' },
            { qty: 500, orig: '40€', disc: '38.50€' },
            { qty: 1000, orig: '70€', disc: '67.00€' },
          ].map((p, i) => (
            <DiamondPackCard key={i} index={i} quantity={p.qty} originalPrice={p.orig} discountedPrice={p.disc} />
          ))}
        </div>

        {/* Transfer */}
        <h3 className="text-white/60 text-xs uppercase tracking-wider mb-2">Transferência</h3>
        <div className="bg-white/10 rounded-xl p-4 mb-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-[#4DD0E1] shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-white/60 text-sm">💎</span>
                <input id="input-transfer-amount" type="text" value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  placeholder="1.00" className="flex-1 bg-white/10 rounded-lg px-3 py-1.5 text-white text-sm placeholder:text-white/30 outline-none border border-white/10 focus:border-[#0A84FF]" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white/60 text-sm">ID</span>
                <input id="input-transfer-id" type="text" value={transferId}
                  onChange={(e) => setTransferId(e.target.value)}
                  placeholder="10235" className="flex-1 bg-white/10 rounded-lg px-3 py-1.5 text-white text-sm placeholder:text-white/30 outline-none border border-white/10 focus:border-[#0A84FF]" />
              </div>
            </div>
          </div>
          <div className="h-5">{transferError && <span className="text-red-400 text-xs">{transferError}</span>}</div>
          <button id="btn-transfer-send" onClick={() => console.log('Transfer', transferAmount, transferId)}
            className="w-full py-2.5 bg-[#0A84FF] rounded-xl text-white text-sm font-bold transition-transform active:scale-95">
            ✈️ ENVIAR
          </button>
        </div>

        {/* Redeem */}
        <h3 className="text-white/60 text-xs uppercase tracking-wider mb-2 mt-5">Resgatar Código</h3>
        <div className="bg-white/10 rounded-xl p-4 mb-1">
          <div className="flex items-center gap-2">
            <input id="input-redeem-code" type="text" value={redeemCode}
              onChange={(e) => setRedeemCode(e.target.value)}
              placeholder="Your Code" className="flex-1 bg-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder:text-white/30 outline-none border border-white/10 focus:border-[#0A84FF]" />
            <button id="btn-redeem" onClick={() => console.log('Redeem', redeemCode)}
              className="bg-[#0A84FF] rounded-lg px-4 py-2 text-white text-sm font-bold shrink-0 transition-transform active:scale-95">
              🎁
            </button>
          </div>
          <div className="h-5">{redeemError && <span className="text-red-400 text-xs">{redeemError}</span>}</div>
        </div>

        <div className="mt-4"><BackButton onClick={() => navigate(-1)} /></div>
      </div>
    </div>
  );
}
