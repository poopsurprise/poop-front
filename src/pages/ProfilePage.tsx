import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { trpc } from '../lib/trpc';
import { ASSETS } from '../constants/assets';

/**
 * TELA — PERFIL
 * Mockup: Perfil.png
 *
 * Secções:
 *  1. Avatar + ID
 *  2. Campos editáveis (Name, Year, Country, Language)
 *  3. Sound toggle
 *  4. Links (Affiliates, Notifications, Password, Email, Logout)
 */

const COUNTRIES = [
  { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
  { code: 'BR', name: 'Brasil', flag: '🇧🇷' },
  { code: 'ES', name: 'España', flag: '🇪🇸' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'DE', name: 'Deutschland', flag: '🇩🇪' },
  { code: 'IT', name: 'Italia', flag: '🇮🇹' },
  { code: 'AO', name: 'Angola', flag: '🇦🇴' },
  { code: 'MZ', name: 'Moçambique', flag: '🇲🇿' },
];

const LANGUAGES = [
  { code: 'pt', name: 'Português' },
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' },
];

export function ProfilePage() {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const meQuery = trpc.auth.me.useQuery(undefined, { staleTime: 60_000 });
  const user = meQuery.data;

  const [soundOn, setSoundOn] = useState(true);
  const [language, setLanguage] = useState('pt');

  const handleLogout = async () => {
    await signOut();
    navigate('/login', { replace: true });
  };

  const handleClose = () => {
    navigate(-1);
  };

  const currentCountry = COUNTRIES.find(c => c.code === user?.country);

  return (
    <div className="flex flex-col h-dvh max-w-[420px] mx-auto bg-[#F2F2F7] relative">
      
      {/* Header with close button */}
      <div className="flex justify-end p-4">
        <button 
          id="profile-close"
          onClick={handleClose}
          className="w-10 h-10 flex items-center justify-center text-2xl text-gray-500 hover:text-gray-800 transition-colors"
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-8">
        
        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-2">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg bg-[#4DD0E1]">
              <img 
                src={user?.avatarUrl || ASSETS.defaultAvatar}
                alt="Avatar"
                className="w-full h-full object-cover scale-[1.75]"
              />
            </div>
            <button
              id="profile-avatar-edit"
              className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-200"
            >
              <span className="text-base">📷</span>
            </button>
          </div>
          <span className="text-sm text-gray-500 font-mono">
            {user?.id ? `#${user.id.slice(0, 8).toUpperCase()}` : '...'}
          </span>
        </div>

        {/* Editable Fields */}
        <div className="space-y-3 mb-6">
          {/* Name */}
          <div className="bg-white rounded-xl px-4 py-3 shadow-sm">
            <input
              id="profile-name"
              type="text"
              value={user?.username ?? ''}
              readOnly
              className="w-full text-center text-lg text-gray-700 bg-transparent outline-none"
              placeholder="Name"
            />
          </div>

          {/* Year of Birth */}
          <div className="bg-white rounded-xl px-4 py-3 shadow-sm flex items-center justify-center">
            <span className="text-lg text-gray-400">
              {user?.country === 'PT' ? '1995' : '—'}
            </span>
            <span className="ml-auto text-gray-300">⌄</span>
          </div>

          {/* Country */}
          <div className="bg-white rounded-xl px-4 py-3 shadow-sm flex items-center gap-3">
            <span className="text-xl">⊞</span>
            <span className="text-2xl">{currentCountry?.flag ?? '🌍'}</span>
            <span className="text-lg text-gray-500">{currentCountry?.name ?? 'Select'}</span>
            <span className="ml-auto text-gray-300">⌄</span>
          </div>

          {/* Language */}
          <div className="bg-white rounded-xl px-4 py-3 shadow-sm flex items-center gap-3">
            <span className="text-xl">🌐</span>
            <select
              id="profile-language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="flex-1 text-lg text-gray-500 bg-transparent outline-none appearance-none"
            >
              {LANGUAGES.map(l => (
                <option key={l.code} value={l.code}>{l.name}</option>
              ))}
            </select>
            <span className="text-gray-300">⌄</span>
          </div>
        </div>

        {/* Sound Toggle */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            id="profile-sound-toggle"
            onClick={() => setSoundOn(!soundOn)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              soundOn 
                ? 'bg-white text-gray-700 shadow-sm' 
                : 'bg-gray-300 text-gray-400'
            }`}
          >
            <span className="text-xl">{soundOn ? '🔊' : '🔇'}</span>
            <span className="text-sm font-medium">{soundOn ? 'Sound ON' : 'Sound OFF'}</span>
          </button>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mb-6" />

        {/* Menu Links */}
        <div className="space-y-4">
          <MenuLink 
            id="profile-affiliates"
            label="Convida Amigos e Ganha"
            onClick={() => navigate('/affiliates')}
          />
          <MenuLink 
            id="profile-notifications"
            label="Configurar Notificações"
            onClick={() => navigate('/notifications')}
          />
          <MenuLink 
            id="profile-password"
            label="Alterar Password"
            onClick={() => console.log('password')}
          />
          <MenuLink 
            id="profile-email"
            label="Alterar Email"
            onClick={() => console.log('email')}
          />
          <MenuLink 
            id="profile-logout"
            label="Log Out"
            onClick={handleLogout}
            danger
          />
        </div>
      </div>
    </div>
  );
}

function MenuLink({ id, label, onClick, danger = false }: { 
  id: string; 
  label: string; 
  onClick: () => void; 
  danger?: boolean; 
}) {
  return (
    <button
      id={id}
      onClick={onClick}
      className={`w-full text-center text-lg font-medium transition-colors ${
        danger 
          ? 'text-red-400 hover:text-red-600' 
          : 'text-[#5B7FFF] hover:text-[#3D5FE0]'
      }`}
    >
      {label}
    </button>
  );
}
