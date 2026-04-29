import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ASSETS } from '../constants/assets';
import { useAuth } from '../hooks/useAuth';
import { trpc } from '../lib/trpc';
import { Camera, X, CheckCircle, ChevronDown } from 'lucide-react';

/**
 * TELA 03 — COMPLETAR PERFIL (Step 2/2)
 * Mockup: Registo2/2.png
 *
 * After registration, user completes their profile here.
 * Calls auth.completeProfile via tRPC to persist to database.
 */

const YEARS = Array.from({ length: 80 }, (_, i) => new Date().getFullYear() - 6 - i);

const COUNTRIES = [
  { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
  { code: 'BR', name: 'Brasil', flag: '🇧🇷' },
  { code: 'ES', name: 'España', flag: '🇪🇸' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'DE', name: 'Deutschland', flag: '🇩🇪' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'IT', name: 'Italia', flag: '🇮🇹' },
  { code: 'AO', name: 'Angola', flag: '🇦🇴' },
  { code: 'MZ', name: 'Moçambique', flag: '🇲🇿' },
  { code: 'CV', name: 'Cabo Verde', flag: '🇨🇻' },
];

export function CompleteProfilePage() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const completeProfile = trpc.auth.completeProfile.useMutation();
  const utils = trpc.useUtils();

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [country, setCountry] = useState('');
  const [bonusCode, setBonusCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string | null;
    birthYear?: string | null;
    country?: string | null;
    bonusCode?: string | null;
  }>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Display user's Supabase ID (short version)
  const displayId = user?.id ? user.id.slice(0, 8) : '—';

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setAvatarPreview(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const newErrors: typeof errors = {};

    if (!name || name.length < 3) {
      newErrors.name = name ? 'Mínimo 3 caracteres' : 'Escolha um nome';
    }
    if (name && !/^[a-zA-Z0-9_]+$/.test(name)) {
      newErrors.name = 'Apenas letras, números, e underscore (_)';
    }
    if (!birthYear) {
      newErrors.birthYear = 'Diga-nos em que ano nasceu';
    }
    if (!country) {
      newErrors.country = 'Diga-nos o seu País';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSubmitting(true);

    try {
      // Call backend tRPC to persist profile
      await completeProfile.mutateAsync({
        username: name,
        country: country,
        yearOfBirth: parseInt(birthYear),
        bonusCode: bonusCode || undefined,
      });

      // Force refresh of whoami so ProfileGuard knows we have a profile now
      await utils.auth.whoami.invalidate();

      // Navigate to inventory (main game screen)
      navigate('/inventory', { replace: true });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro ao guardar perfil. Tenta novamente.';
      setErrors({ name: message });
      setSubmitting(false);
    }
  };

  const handleClose = async () => {
    await signOut();
    navigate('/login', { replace: true });
  };

  const selectedCountry = COUNTRIES.find(c => c.code === country);

  return (
    <div className="flex flex-col h-dvh max-w-[420px] mx-auto bg-gray-200 relative overflow-hidden">

      {/* White card container */}
      <div className="flex-1 flex flex-col mx-4 my-4 bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] overflow-y-auto">

        {/* Close button */}
        <div className="flex justify-end p-4">
          <button
            id="btn-complete-close"
            onClick={handleClose}
            className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors"
          >
            <X size={28} strokeWidth={2} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center px-6 pb-6">

          {/* AVATAR */}
          <div className="relative mb-2">
            <button
              id="btn-complete-avatar"
              onClick={handleAvatarClick}
              className="w-[120px] h-[120px] rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200 shadow-md flex items-center justify-center group hover:border-[#4A6CF7] transition-colors"
            >
              <img
                src={avatarPreview || ASSETS.avatarPlaceholder}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </button>
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-200">
              <Camera size={16} className="text-gray-600" />
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* Player ID */}
          <p id="complete-profile-id" className="text-gray-800 text-[16px] font-bold mb-5">
            {displayId}
          </p>

          {/* NAME INPUT */}
          <div className="w-full mb-0">
            <div className={`relative flex items-center w-full h-[52px] rounded-2xl bg-gray-50 border ${errors.name ? 'border-red-400' : 'border-gray-200'} shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden`}>
              <input
                id="input-complete-name"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => { setName(e.target.value); if (errors.name) setErrors(prev => ({ ...prev, name: null })); }}
                className="w-full h-full bg-transparent px-4 text-gray-800 placeholder:text-gray-400 outline-none text-[14px] text-center"
              />
            </div>
            <div className="min-h-[20px] px-2 pt-1">
              {errors.name && <span className="text-[12px] text-[#E8A0A0]">{errors.name}</span>}
            </div>
          </div>

          {/* YEAR OF BIRTH */}
          <div className="w-full mb-0">
            <div className={`relative flex items-center w-full h-[52px] rounded-2xl bg-gray-50 border ${errors.birthYear ? 'border-red-400' : 'border-gray-200'} shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden`}>
              <select
                id="input-complete-year"
                value={birthYear}
                onChange={(e) => { setBirthYear(e.target.value); if (errors.birthYear) setErrors(prev => ({ ...prev, birthYear: null })); }}
                className="w-full h-full bg-transparent px-4 text-gray-800 outline-none text-[14px] appearance-none cursor-pointer text-center"
                style={{ color: birthYear ? '#1f2937' : '#9ca3af' }}
              >
                <option value="" disabled>Ano em que nasceu</option>
                {YEARS.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <div className="absolute right-3 pointer-events-none text-gray-400">
                <ChevronDown size={18} />
              </div>
            </div>
            <div className="min-h-[20px] px-2 pt-1">
              {errors.birthYear && <span className="text-[12px] text-[#E8A0A0]">{errors.birthYear}</span>}
            </div>
          </div>

          {/* COUNTRY */}
          <div className="w-full mb-0">
            <div className={`relative flex items-center w-full h-[52px] rounded-2xl bg-gray-50 border ${errors.country ? 'border-red-400' : 'border-gray-200'} shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden`}>
              <div className="flex items-center pl-3 gap-2 pointer-events-none shrink-0">
                <span className="text-gray-400 text-[18px]">⊞</span>
                {selectedCountry && (
                  <span className="text-[20px]">{selectedCountry.flag}</span>
                )}
              </div>
              <select
                id="input-complete-country"
                value={country}
                onChange={(e) => { setCountry(e.target.value); if (errors.country) setErrors(prev => ({ ...prev, country: null })); }}
                className="w-full h-full bg-transparent pl-2 pr-8 text-gray-800 outline-none text-[14px] appearance-none cursor-pointer"
                style={{ color: country ? '#1f2937' : '#9ca3af' }}
              >
                <option value="" disabled>País</option>
                {COUNTRIES.map(c => (
                  <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
                ))}
              </select>
              <div className="absolute right-3 pointer-events-none text-gray-400">
                <ChevronDown size={18} />
              </div>
            </div>
            <div className="min-h-[20px] px-2 pt-1">
              {errors.country && <span className="text-[12px] text-[#E8A0A0]">{errors.country}</span>}
            </div>
          </div>

          {/* BONUS CODE */}
          <p className="text-gray-500 text-[12px] text-center mb-1 mt-1">
            Se não tens um código de bonus deixa em branco
          </p>
          <div className="w-full mb-0">
            <div className={`relative flex items-center w-full h-[52px] rounded-2xl bg-gray-50 border ${errors.bonusCode ? 'border-red-400' : 'border-gray-200'} shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden`}>
              <input
                id="input-complete-bonus"
                type="text"
                placeholder="Código Bônus"
                value={bonusCode}
                onChange={(e) => { setBonusCode(e.target.value); if (errors.bonusCode) setErrors(prev => ({ ...prev, bonusCode: null })); }}
                className="w-full h-full bg-transparent px-4 text-gray-800 placeholder:text-gray-400 outline-none text-[14px] text-center"
              />
            </div>
            <div className="min-h-[20px] px-2 pt-1">
              {errors.bonusCode && <span className="text-[12px] text-[#E8A0A0]">{errors.bonusCode}</span>}
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            id="btn-complete-submit"
            onClick={handleSubmit}
            disabled={submitting}
            className={`w-full max-w-[320px] h-[56px] rounded-2xl bg-[#4A6CF7] text-white flex items-center justify-center font-bold text-[16px] transition-all shadow-[0_4px_15px_rgba(74,108,247,0.4)] hover:shadow-[0_6px_20px_rgba(74,108,247,0.5)] active:scale-[0.98] mt-2 ${
              submitting ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            {submitting ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <CheckCircle size={28} strokeWidth={2.5} />
            )}
          </button>

        </div>
      </div>
    </div>
  );
}
