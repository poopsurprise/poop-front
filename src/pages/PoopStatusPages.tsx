import { useNavigate } from 'react-router-dom';
import { ASSETS } from '../constants/assets';

/**
 * POOP MORTO — Dead poop screen
 * Mockup: Morto.png
 */
export function PoopDeadPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-dvh max-w-[420px] mx-auto bg-[#383838] border-x border-white/5 items-center justify-center px-6">
      <div className="bg-white rounded-3xl p-8 flex flex-col items-center gap-4 max-w-[320px] w-full">
        <img src={ASSETS.skeleton} alt="Dead" className="h-24 object-contain" />
        <img src={ASSETS.tombstone} alt="RIP" className="h-20 object-contain" />
        <h2 className="text-gray-800 font-bold text-xl">O teu poop morreu!</h2>
        <p className="text-gray-500 text-sm text-center">
          A saúde chegou a 0%. Podes ressuscitar com diamantes ou começar de novo.
        </p>
        <div className="flex gap-3 w-full mt-2">
          <button id="btn-resurrect" onClick={() => navigate('/medicine')}
            className="flex-1 py-3 bg-[#4A6CF7] rounded-2xl text-white font-medium text-sm flex items-center justify-center gap-1 transition-transform active:scale-95">
            <img src={ASSETS.diamond} alt="" className="h-4" /> Ressuscitar
          </button>
          <button onClick={() => navigate('/inventory')}
            className="flex-1 py-3 bg-gray-200 rounded-2xl text-gray-600 font-medium text-sm transition-transform active:scale-95">
            Inventário
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * POOP RESSUSCITADO — Resurrected poop screen
 * Mockup: Morto resuscitado.png
 */
export function PoopResurrectedPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-dvh max-w-[420px] mx-auto bg-[#383838] border-x border-white/5 items-center justify-center px-6">
      <div className="bg-white rounded-3xl p-8 flex flex-col items-center gap-4 max-w-[320px] w-full">
        <div className="text-5xl">🎉</div>
        <img src={ASSETS.madPoop} alt="Alive" className="h-20 object-contain" />
        <h2 className="text-gray-800 font-bold text-xl">Ressuscitado!</h2>
        <p className="text-gray-500 text-sm text-center">
          O teu poop voltou à vida. Cuida bem dele desta vez!
        </p>
        <button onClick={() => navigate('/inventory')}
          className="w-full py-3 bg-[#4A6CF7] rounded-2xl text-white font-medium transition-transform active:scale-95">
          Voltar ao Inventário
        </button>
      </div>
    </div>
  );
}
