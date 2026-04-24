import { useNavigate } from 'react-router-dom';
import { BackButton } from '../components/ui/BackButton';
import { trpc } from '../lib/trpc';

/**
 * TELA 19G — AFILIADOS / CONVIDE AMIGOS
 * Dados reais via tRPC: social.affiliateInfo
 */
export function AffiliatesPage() {
  const navigate = useNavigate();
  const affiliateQuery = trpc.social.affiliateInfo.useQuery(undefined, { staleTime: 60_000 });
  const data = affiliateQuery.data;

  const code = data?.code ?? '...';
  const link = data?.link ?? '';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
  };

  return (
    <div className="flex flex-col h-dvh max-w-[420px] mx-auto bg-[#383838] border-x border-white/5">
      <div className="flex items-center justify-between p-4 shrink-0">
        <span />
        <h2 className="text-white font-bold text-lg">Convide Amigos</h2>
        <button onClick={() => navigate(-1)} className="text-gray-500 text-xl">✕</button>
      </div>
      <div className="flex-1 overflow-y-auto px-5 pb-6">
        <div className="border-b border-white/10 mb-4" />
        <p className="text-white/60 text-sm mb-2">Convidar amigos rende-lhe:</p>
        <div className="space-y-1 mb-5">
          <div className="flex items-center gap-2 text-white text-sm"><span>💩</span><span>2 poop de ataque Ladrão</span></div>
          <div className="flex items-center gap-2 text-white text-sm"><span>🪙</span><span>2500 moedas</span></div>
        </div>
        <p className="text-white/60 text-sm mb-2">Seu amigo Recebe:</p>
        <div className="space-y-1 mb-5">
          <div className="flex items-center gap-2 text-white text-sm"><span>🌀</span><span>1 Ventilador extra</span></div>
          <div className="flex items-center gap-2 text-white text-sm"><span>🪙</span><span>500 moedas</span></div>
        </div>
        <p className="text-white/60 text-sm mb-4">Envie o seu link ou código para seu amigo:</p>

        <label className="text-white/40 text-xs uppercase tracking-wider">Codigo:</label>
        <div className="flex items-center bg-white/10 rounded-xl px-4 py-3 mt-1 mb-4 border border-white/10">
          <span className="text-white flex-1 font-mono">{code}</span>
          <button id="btn-copy-referral-code" onClick={() => copyToClipboard(code)} className="text-white/60 hover:text-white text-lg">📋</button>
        </div>

        <label className="text-white/40 text-xs uppercase tracking-wider">Link:</label>
        <div className="flex items-center bg-white/10 rounded-xl px-4 py-3 mt-1 mb-4 border border-white/10">
          <span className="text-white text-sm flex-1 truncate font-mono">{link}</span>
          <button id="btn-copy-referral-link" onClick={() => copyToClipboard(link)} className="text-white/60 hover:text-white text-lg shrink-0 ml-2">📋</button>
        </div>

        {data && data.totalReferrals > 0 && (
          <div className="bg-white/5 rounded-xl p-3 mb-4">
            <p className="text-white/60 text-xs uppercase mb-2">Referidos ({data.totalReferrals})</p>
            {data.referrals.map((r, i) => (
              <div key={i} className="flex items-center justify-between py-1">
                <span className="text-white text-sm">{r.username}</span>
                <span className={`text-xs ${r.activated ? 'text-green-400' : 'text-white/30'}`}>{r.activated ? '✅ Activado' : '⏳ Pendente'}</span>
              </div>
            ))}
          </div>
        )}

        <p className="text-white/30 text-xs mt-4 leading-relaxed">
          *Seu amigo deve permanecer vivo e entrar no jogo 20 dias diferentes para receber o seu bonus
        </p>
        <div className="mt-6"><BackButton onClick={() => navigate(-1)} /></div>
      </div>
    </div>
  );
}
