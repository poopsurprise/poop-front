import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ASSETS } from '../constants/assets';

/**
 * CREATE GAME FORM — 1v1, Ranking, Bomba
 * Mockups: Formulario crair jogo 1x1.png, Formulario crair jogo Ranking ataque.png, Formulario crair jogo bomba.png
 */

type GameType = '1v1' | 'ranking' | 'bomba';

export function CreateGamePage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const initialType = (params.get('type') as GameType) || '1v1';

  const [type, setType] = useState<GameType>(initialType);
  const [time, setTime] = useState('20');
  const [poops, setPoops] = useState('Auto');
  const [opponent, setOpponent] = useState('');
  const [tournamentName, setTournamentName] = useState('');
  const [players, setPlayers] = useState('2');
  const [player2, setPlayer2] = useState('');
  const [bilhete, setBilhete] = useState('5000');
  const [payMode, setPayMode] = useState<'eu' | 'dividir'>('eu');

  const typeIcon = type === 'ranking' ? ASSETS.gameRanking : type === 'bomba' ? ASSETS.gameBomba : ASSETS.game1v1;
  const typeLabel = type === 'ranking' ? 'Ranking ataque' : type === 'bomba' ? 'Bomba' : '1x1';

  return (
    <div className="flex flex-col h-dvh max-w-[420px] mx-auto bg-[#383838] border-x border-white/5">
      <div className="flex items-center justify-end p-4 shrink-0">
        <button onClick={() => navigate(-1)} className="text-gray-400 text-2xl">✕</button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-6">
        <div className="bg-white rounded-2xl p-5">
          {/* Header */}
          <div className="flex items-center gap-3 mb-1">
            <img src={ASSETS.game1v1} alt="" className="h-8 object-contain" />
            <h2 className="text-gray-400 text-2xl font-light">Jogo</h2>
          </div>
          <div className="border-b border-gray-200 mb-4" />

          {/* Tipo */}
          <label className="text-gray-700 font-medium block mb-1">Tipo</label>
          <div className="flex gap-2 mb-4">
            <div className="flex-1 bg-gray-100 rounded-xl px-4 py-2.5 text-gray-700 text-center font-medium">{typeLabel}</div>
            <img src={typeIcon} alt="" className="h-10 w-10 object-contain" />
          </div>

          {/* Bomba-specific: tournament name */}
          {type === 'bomba' && (
            <>
              <label className="text-gray-700 font-medium block mb-1">Nome do torneio</label>
              <input type="text" value={tournamentName} onChange={e => setTournamentName(e.target.value)}
                className="w-full bg-gray-100 rounded-xl px-4 py-2.5 text-gray-700 outline-none mb-4" placeholder="Sapos coloridos" />
            </>
          )}

          {/* Tempo + Poops/Jogadores */}
          <div className="flex gap-3 mb-4">
            <div className="flex-1">
              <label className="text-gray-700 font-medium block mb-1">Tempo</label>
              <input type="text" value={time} onChange={e => setTime(e.target.value)}
                className="w-full bg-gray-100 rounded-xl px-4 py-2.5 text-gray-700 text-center outline-none" />
            </div>
            {type === 'bomba' ? (
              <div className="flex-1">
                <label className="text-gray-700 font-medium block mb-1">Jogadores</label>
                <input type="text" value={players} onChange={e => setPlayers(e.target.value)}
                  className="w-full bg-gray-100 rounded-xl px-4 py-2.5 text-gray-700 text-center outline-none" />
              </div>
            ) : type === '1v1' ? (
              <div className="flex-1">
                <label className="text-gray-700 font-medium block mb-1">Poops</label>
                <input type="text" value={poops} onChange={e => setPoops(e.target.value)}
                  className="w-full bg-gray-100 rounded-xl px-4 py-2.5 text-gray-700 text-center outline-none" />
              </div>
            ) : null}
          </div>

          {/* Desafiar / Convidar */}
          <label className="text-gray-700 font-medium block mb-1">
            {type === 'ranking' ? 'Convidar' : type === 'bomba' ? 'Jogador 1' : 'Desafiar'}
          </label>
          <div className="flex items-center gap-2 mb-2">
            <input type="text" value={opponent} onChange={e => setOpponent(e.target.value)}
              className="flex-1 bg-gray-100 rounded-xl px-4 py-2.5 text-gray-700 outline-none" />
            <img src={ASSETS.friends} alt="" className="h-8 object-contain" />
          </div>

          {type === 'bomba' && (
            <div className="flex items-center gap-2 mb-4">
              <input type="text" value={player2} onChange={e => setPlayer2(e.target.value)}
                className="flex-1 bg-gray-100 rounded-xl px-4 py-2.5 text-gray-700 outline-none" />
              <img src={ASSETS.friends} alt="" className="h-8 object-contain" />
            </div>
          )}

          {/* Bilhete */}
          <label className="text-gray-700 font-medium block mb-1 mt-2">Bilhete</label>
          <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-2.5 mb-3">
            <span>🪙</span>
            <input type="text" value={bilhete} onChange={e => setBilhete(e.target.value)}
              className="flex-1 bg-transparent text-gray-700 outline-none" />
          </div>

          {/* Bomba: Eu pago / Dividir */}
          {type === 'bomba' && (
            <div className="flex gap-2 mb-4">
              <button onClick={() => setPayMode('eu')}
                className={`flex-1 py-2 rounded-xl text-sm font-medium ${payMode === 'eu' ? 'bg-gray-200 text-gray-800' : 'bg-gray-100 text-gray-500'}`}>
                Eu pago
              </button>
              <button onClick={() => setPayMode('dividir')}
                className={`flex-1 py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-1 ${payMode === 'dividir' ? 'bg-gray-200 text-gray-800' : 'bg-gray-100 text-gray-500'}`}>
                <span className="text-xs">○</span> Dividir
              </button>
            </div>
          )}

          {/* Prize info */}
          <div className="flex items-center gap-2 mb-4">
            <img src={ASSETS.trophy} alt="" className="h-8 object-contain" />
            <span className="text-gray-500 text-sm">
              {type === 'ranking' ? 'Ganha Ranking' : `O vencedor ganha: 🪙 ${Math.floor(Number(bilhete) * 1.5)}`}
            </span>
          </div>

          {/* Submit */}
          <button id="btn-create-game-submit"
            className="w-full py-3.5 bg-[#4A6CF7] rounded-2xl flex items-center justify-center transition-transform active:scale-95">
            <span className="text-white text-xl">☑️</span>
          </button>
        </div>
      </div>
    </div>
  );
}
