import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopToolbar } from '../components/layout/TopToolbar';
import { trpc } from '../lib/trpc';
import { ASSETS } from '../constants/assets';

/**
 * MEDICINE QUIZ — Pergunta medicamentos
 * Mockup: pergunta medicamentos.png
 */

const mockQuestion = {
  text: 'Qual é o tratamento correcto para uma infecção bacteriana?',
  options: [
    { letter: 'A', text: 'Antibióticos', correct: true },
    { letter: 'B', text: 'Antifúngicos', correct: false },
    { letter: 'C', text: 'Antivirais', correct: false },
    { letter: 'D', text: 'Anti-histamínicos', correct: false },
  ],
};

export function MedicineQuizPage() {
  const navigate = useNavigate();
  const meQuery = trpc.auth.me.useQuery(undefined, { staleTime: 60_000 });
  const user = meQuery.data;
  const [selected, setSelected] = useState<string | null>(null);

  const playerData = {
    id: user?.id ?? '', username: user?.username ?? '...', email: user?.email ?? '',
    avatarUrl: user?.avatarUrl ?? '/assets/img/avatar-fallback.png',
    healthPercent: user?.healthPercent ?? 100, level: user?.level ?? 1,
    piggyBalance: user?.piggyBalance ?? 0, diamondBalance: Number(user?.diamondBalance ?? 0),
    rankingScore: Number(user?.rankingScore ?? 0), country: user?.country ?? null,
    yearOfBirth: 2000, bonusCode: null, lastActiveAt: null,
    createdAt: user?.createdAt ? String(user.createdAt) : new Date().toISOString(),
  };

  return (
    <div className="flex flex-col h-dvh max-w-[420px] mx-auto bg-[#383838] border-x border-white/5">
      <TopToolbar player={playerData} activeGames={0} onAvatarClick={() => navigate('/profile')} />

      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {/* Doctor mascot */}
        <img src={ASSETS.doctorMascot} alt="Doctor" className="h-20 object-contain mb-2" />

        {/* Question card */}
        <div className="bg-gray-200 rounded-2xl w-full overflow-hidden">
          <div className="bg-gray-300/50 p-4 text-center">
            <p className="text-gray-800 font-medium text-base">{mockQuestion.text}</p>
          </div>

          {mockQuestion.options.map(opt => {
            const isSelected = selected === opt.letter;
            const showResult = selected !== null;
            let bg = 'bg-gray-200';
            let icon = <div className="w-6 h-6 border-2 border-gray-400 rounded" />;

            if (showResult && isSelected) {
              bg = opt.correct ? 'bg-green-50' : 'bg-red-50';
              icon = opt.correct
                ? <span className="text-green-500 text-xl">✅</span>
                : <span className="text-red-500 text-xl">❌</span>;
            } else if (showResult && opt.correct) {
              bg = 'bg-green-50';
              icon = <span className="text-green-500 text-xl">✅</span>;
            }

            return (
              <button key={opt.letter} onClick={() => !selected && setSelected(opt.letter)}
                className={`w-full flex items-center px-4 py-3.5 border-t border-gray-300/50 ${bg} transition-colors`}>
                <span className="text-gray-400 text-2xl font-light w-10">{opt.letter}</span>
                <span className="text-gray-700 flex-1 text-left">{opt.text}</span>
                {icon}
              </button>
            );
          })}
        </div>
      </div>

      <div className="h-6 w-full bg-[#4CAF50] shrink-0" />
    </div>
  );
}
