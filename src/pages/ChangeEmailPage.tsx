import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackButton } from '../components/ui/BackButton';
import { ASSETS } from '../constants/assets';

export function ChangeEmailPage() {
  const navigate = useNavigate();
  const [currentEmail, setCurrentEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="flex flex-col h-dvh max-w-[420px] mx-auto bg-white border-x border-gray-100">
      <div className="flex items-center justify-between p-4 shrink-0">
        <span />
        <button onClick={() => navigate(-1)} className="text-gray-500 text-xl">✕</button>
      </div>
      <div className="flex-1 px-6">
        <div className="flex items-center gap-3 mb-2">
          <img src={ASSETS.passwordLock} alt="" className="h-10 object-contain" />
          <h2 className="text-gray-400 text-2xl font-light">Email</h2>
        </div>
        <div className="border-b border-gray-200 mb-6" />

        <label className="text-gray-700 text-base mb-1 block">Email Atual</label>
        <input type="email" value={currentEmail} onChange={e => setCurrentEmail(e.target.value)}
          className="w-full bg-gray-100 rounded-xl px-4 py-3 mb-5 text-gray-800 outline-none" />

        <label className="text-gray-700 text-base mb-1 block">Novo Email</label>
        <input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)}
          className="w-full bg-gray-100 rounded-xl px-4 py-3 mb-5 text-gray-800 outline-none" />

        <label className="text-gray-700 text-base mb-1 block">Password Atual</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)}
          className="w-full bg-gray-100 rounded-xl px-4 py-3 mb-8 text-gray-800 outline-none" />

        <button id="btn-change-email-submit"
          className="w-full py-3.5 bg-[#4A6CF7] rounded-2xl flex items-center justify-center transition-transform active:scale-95 mb-6">
          <span className="text-white text-xl">☑️</span>
        </button>

        <div className="flex justify-center">
          <BackButton onClick={() => navigate(-1)} />
        </div>
      </div>
    </div>
  );
}
