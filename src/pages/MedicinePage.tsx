import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopToolbar } from '../components/layout/TopToolbar';
import { ActionBar } from '../components/layout/ActionBar';
import { BackButton } from '../components/ui/BackButton';
import { trpc } from '../lib/trpc';
import { ASSETS } from '../constants/assets';

/**
 * TELA 16/17 — ESTADO MORTO + RESSUSCITADO (Medicamentos)
 * Mockups: Morto.png, Morto resuscitado.png
 */

export function MedicinePage() {
  const navigate = useNavigate();
  const meQuery = trpc.auth.me.useQuery(undefined, { staleTime: 60_000 });
  const user = meQuery.data;
  const [coinsQty, setCoinsQty] = useState(0);
  const [diamondsQty, setDiamondsQty] = useState(0);

  const healthPercent = user?.healthPercent ?? 0;
  const isDead = healthPercent === 0;
  const piggyBalance = user?.piggyBalance ?? 0;
  const diamondBalance = Number(user?.diamondBalance ?? 0);

  const medicinePriceCoins = 5000;
  const medicinePriceDiamonds = 0.001;

  // Health figure color
  let healthIcon: string = ASSETS.healthBody1;
  let healthColor = 'text-green-400';
  if (isDead) {
    healthIcon = ASSETS.skeleton;
    healthColor = 'text-red-400';
  } else if (healthPercent < 30) {
    healthIcon = ASSETS.healthBody3;
    healthColor = 'text-red-400';
  } else if (healthPercent < 70) {
    healthIcon = ASSETS.healthBody2;
    healthColor = 'text-yellow-400';
  }

  const playerData = {
    id: user?.id ?? '', username: user?.username ?? '...',
    email: user?.email ?? '', avatarUrl: user?.avatarUrl ?? '/assets/img/avatar-fallback.png',
    healthPercent, level: user?.level ?? 1, piggyBalance, diamondBalance,
    rankingScore: Number(user?.rankingScore ?? 0), country: user?.country ?? null,
    yearOfBirth: 2000, bonusCode: null, lastActiveAt: null,
    createdAt: user?.createdAt ? String(user.createdAt) : new Date().toISOString(),
  };

  return (
    <div className="flex flex-col h-dvh max-w-[420px] mx-auto bg-[#383838] border-x border-white/5">
      <TopToolbar player={playerData} activeGames={0} onAvatarClick={() => navigate('/profile')} />
      <ActionBar piggyBalance={piggyBalance} paperStock={0} deliveryAvailable="0/1" fanAvailable="0/2" />

      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-4">
        {/* Balance bar */}
        <div className="w-full flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <img src={ASSETS.piggyBank} alt="" className="h-7" />
            <span className="text-white text-sm font-medium">{piggyBalance.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <img src={ASSETS.medicine} alt="" className="h-5" />
          </div>
          <div className="flex items-center gap-2">
            <img src={ASSETS.diamond} alt="" className="h-5" />
            <span className="text-white text-sm font-medium">{diamondBalance.toFixed(2)}</span>
          </div>
        </div>

        {/* Progress bars */}
        <div className="w-full flex gap-2">
          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-pink-400 rounded-full" style={{ width: `${Math.min((piggyBalance / 1000000) * 100, 100)}%` }} />
          </div>
          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-purple-400 rounded-full" style={{ width: `${Math.min((diamondBalance / 10) * 100, 100)}%` }} />
          </div>
        </div>

        {/* Medicine icon */}
        <img src={ASSETS.medicine} alt="Medicine" className="h-10 object-contain" />

        {/* Health figure */}
        <img src={healthIcon} alt="Health" className="h-28 object-contain" />
        <span className={`text-4xl font-bold ${healthColor}`}>{healthPercent}%</span>

        {/* Quantity cards */}
        <div className="w-full flex gap-3">
          {/* Coins card */}
          <div className="flex-1 bg-white/10 rounded-xl p-3 text-center">
            <p id="medicine-qty-coins" className="text-white text-2xl font-bold">{coinsQty}</p>
            <p className="text-white/60 text-sm">🪙 {(coinsQty * medicinePriceCoins).toLocaleString()}</p>
            <div className="flex justify-center gap-2 mt-2">
              <button id="btn-medicine-coins-minus" onClick={() => setCoinsQty(Math.max(0, coinsQty - 1))}
                className="w-10 h-10 bg-white/10 rounded-lg text-white text-xl transition-transform active:scale-90">−</button>
              <button id="btn-medicine-coins-plus" onClick={() => setCoinsQty(coinsQty + 1)}
                className="w-10 h-10 bg-white/10 rounded-lg text-white text-xl transition-transform active:scale-90">+</button>
            </div>
          </div>
          {/* Diamonds card */}
          <div className="flex-1 bg-white/10 rounded-xl p-3 text-center">
            <p id="medicine-qty-diamonds" className="text-white text-2xl font-bold">{diamondsQty}</p>
            <p className="text-white/60 text-sm">💎 {(diamondsQty * medicinePriceDiamonds).toFixed(3)}</p>
            <div className="flex justify-center gap-2 mt-2">
              <button id="btn-medicine-diamonds-minus" onClick={() => setDiamondsQty(Math.max(0, diamondsQty - 1))}
                className="w-10 h-10 bg-white/10 rounded-lg text-white text-xl transition-transform active:scale-90">−</button>
              <button id="btn-medicine-diamonds-plus" onClick={() => setDiamondsQty(diamondsQty + 1)}
                className="w-10 h-10 bg-white/10 rounded-lg text-white text-xl transition-transform active:scale-90">+</button>
            </div>
          </div>
        </div>

        {/* Buy button */}
        <button id="btn-buy-medicine"
          className="w-[70%] py-3.5 bg-[#0A84FF] rounded-2xl flex items-center justify-center transition-transform active:scale-95">
          <img src={ASSETS.cashRegister} alt="Buy" className="h-7 object-contain" />
        </button>

        <BackButton onClick={() => navigate(-1)} />
      </div>
    </div>
  );
}
