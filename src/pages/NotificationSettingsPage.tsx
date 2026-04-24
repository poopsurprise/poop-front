import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackButton } from '../components/ui/BackButton';
import { ASSETS } from '../constants/assets';

/**
 * CONFIGURAR NOTIFICAÇÕES
 * Mockup: Configurar Notificações.png
 */

const defaultSettings = [
  { id: 'delivery', label: 'Delivery de poop', enabled: true },
  { id: 'games', label: 'Jogos', enabled: true },
  { id: 'friends', label: 'Pedidos de amizade', enabled: true },
  { id: 'medicine', label: 'Medicamentos', enabled: false },
  { id: 'rewards', label: 'Recompensas diárias', enabled: true },
  { id: 'system', label: 'Sistema', enabled: true },
];

export function NotificationSettingsPage() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState(defaultSettings);

  const toggle = (id: string) => {
    setSettings(prev => prev.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));
  };

  return (
    <div className="flex flex-col h-dvh max-w-[420px] mx-auto bg-white border-x border-gray-100">
      <div className="flex items-center justify-between p-4 shrink-0">
        <span />
        <button onClick={() => navigate(-1)} className="text-gray-500 text-xl">✕</button>
      </div>

      <div className="flex-1 px-6">
        <div className="flex items-center gap-3 mb-2">
          <img src={ASSETS.bell} alt="" className="h-10 object-contain" />
          <h2 className="text-gray-400 text-2xl font-light">Notificações</h2>
        </div>
        <div className="border-b border-gray-200 mb-6" />

        {settings.map(s => (
          <div key={s.id} className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-gray-700 text-sm">{s.label}</span>
            <button onClick={() => toggle(s.id)}
              className={`w-12 h-6 rounded-full transition-colors relative ${s.enabled ? 'bg-[#4A6CF7]' : 'bg-gray-300'}`}>
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${s.enabled ? 'right-0.5' : 'left-0.5'}`} />
            </button>
          </div>
        ))}

        <button id="btn-save-notifications"
          className="w-full py-3.5 bg-[#4A6CF7] rounded-2xl flex items-center justify-center transition-transform active:scale-95 mt-8 mb-6">
          <span className="text-white text-xl">☑️</span>
        </button>

        <div className="flex justify-center">
          <BackButton onClick={() => navigate(-1)} />
        </div>
      </div>
    </div>
  );
}
