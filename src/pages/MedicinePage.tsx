import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopToolbar } from '../components/layout/TopToolbar';
import { ActionBar } from '../components/layout/ActionBar';
import { BackButton } from '../components/ui/BackButton';
import { trpc } from '../lib/trpc';
import { usePlayerData } from '../hooks/usePlayerData';
import { ASSETS } from '../constants/assets';

/**
 * TELA 16/17 — ESTADO MORTO + RESSUSCITADO (Medicamentos)
 * Dados reais via tRPC: auth.me + health.useMedicine
 */
export function MedicinePage() {
  const navigate = useNavigate();
  const { playerData, user } = usePlayerData();
  const medicineMutation = trpc.health.useMedicine.useMutation();
  const utils = trpc.useUtils();
  const [coinsQty, setCoinsQty] = useState(0);
  const [diamondsQty, setDiamondsQty] = useState(0);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const healthPercent = user?.healthPercent ?? 0;
  const isDead = healthPercent === 0;
  const piggyBalance = user?.piggyBalance ?? 0;
  const diamondBalance = Number(user?.diamondBalance ?? 0);
  const medicinePriceCoins = 5000;
  const medicinePriceDiamonds = 0.001;

  let healthIcon: string = ASSETS.healthBody1;
  let healthColor = 'text-green-400';
  if (isDead) { healthIcon = ASSETS.skeleton; healthColor = 'text-red-400'; }
  else if (healthPercent < 30) { healthIcon = ASSETS.healthBody3; healthColor = 'text-red-400'; }
  else if (healthPercent < 70) { healthIcon = ASSETS.healthBody2; healthColor = 'text-yellow-400'; }

  const totalQty = coinsQty + diamondsQty;

  const handleBuy = async () => {
    if (totalQty === 0) { setMessage({ type: 'error', text: 'Seleciona pelo menos 1' }); return; }
    setMessage(null);
    try {
      const result = await medicineMutation.mutateAsync({ quantity: totalQty, answeredCorrectly: true });
      if (result.success) {
        setMessage({ type: 'success', text: `Vida restaurada para ${result.healthAfter}%!` });
        setCoinsQty(0); setDiamondsQty(0);
        utils.auth.me.invalidate(); utils.health.status.invalidate();
      }
    } catch (err: any) { setMessage({ type: 'error', text: err.message ?? 'Falha' }); }
  };

  return (
    <div className="flex flex-col h-dvh max-w-[420px] mx-auto bg-[#383838] border-x border-white/5">
      <TopToolbar player={playerData} activeGames={0} onAvatarClick={() => navigate('/profile')} />
      <ActionBar piggyBalance={piggyBalance} paperStock={0} deliveryAvailable="0/1" fanAvailable="0/2" />
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-4">
        <div className="w-full flex items-center justify-between mb-2">
          <div className="flex items-center gap-2"><img src={ASSETS.piggyBank} alt="" className="h-7" /><span className="text-white text-sm font-medium">{piggyBalance.toLocaleString()}</span></div>
          <div className="flex items-center gap-1"><img src={ASSETS.medicine} alt="" className="h-5" /></div>
          <div className="flex items-center gap-2"><img src={ASSETS.diamond} alt="" className="h-5" /><span className="text-white text-sm font-medium">{diamondBalance.toFixed(2)}</span></div>
        </div>
        <div className="w-full flex gap-2">
          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-pink-400 rounded-full" style={{ width: `${Math.min((piggyBalance / 1000000) * 100, 100)}%` }} /></div>
          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-purple-400 rounded-full" style={{ width: `${Math.min((diamondBalance / 10) * 100, 100)}%` }} /></div>
        </div>
        <img src={ASSETS.medicine} alt="Medicine" className="h-10 object-contain" />
        <img src={healthIcon} alt="Health" className="h-28 object-contain" />
        <span className={`text-4xl font-bold ${healthColor}`}>{healthPercent}%</span>
        {message && <span className={`text-sm ${message.type === 'error' ? 'text-red-400' : 'text-green-400'}`}>{message.text}</span>}
        <div className="w-full flex gap-3">
          <div className="flex-1 bg-white/10 rounded-xl p-3 text-center">
            <p className="text-white text-2xl font-bold">{coinsQty}</p>
            <p className="text-white/60 text-sm">🪙 {(coinsQty * medicinePriceCoins).toLocaleString()}</p>
            <div className="flex justify-center gap-2 mt-2">
              <button onClick={() => setCoinsQty(Math.max(0, coinsQty - 1))} className="w-10 h-10 bg-white/10 rounded-lg text-white text-xl active:scale-90">−</button>
              <button onClick={() => setCoinsQty(coinsQty + 1)} className="w-10 h-10 bg-white/10 rounded-lg text-white text-xl active:scale-90">+</button>
            </div>
          </div>
          <div className="flex-1 bg-white/10 rounded-xl p-3 text-center">
            <p className="text-white text-2xl font-bold">{diamondsQty}</p>
            <p className="text-white/60 text-sm">💎 {(diamondsQty * medicinePriceDiamonds).toFixed(3)}</p>
            <div className="flex justify-center gap-2 mt-2">
              <button onClick={() => setDiamondsQty(Math.max(0, diamondsQty - 1))} className="w-10 h-10 bg-white/10 rounded-lg text-white text-xl active:scale-90">−</button>
              <button onClick={() => setDiamondsQty(diamondsQty + 1)} className="w-10 h-10 bg-white/10 rounded-lg text-white text-xl active:scale-90">+</button>
            </div>
          </div>
        </div>
        <button onClick={handleBuy} disabled={medicineMutation.isPending || totalQty === 0}
          className="w-[70%] py-3.5 bg-[#0A84FF] rounded-2xl flex items-center justify-center active:scale-95 disabled:opacity-50">
          {medicineMutation.isPending ? <span className="text-white animate-pulse">...</span> : <img src={ASSETS.cashRegister} alt="Buy" className="h-7 object-contain" />}
        </button>
        <BackButton onClick={() => navigate(-1)} />
      </div>
    </div>
  );
}
