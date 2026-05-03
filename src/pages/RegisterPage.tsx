import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthInput } from '../components/ui/AuthInput';
import { ASSETS } from '../constants/assets';
import { useAuth } from '../hooks/useAuth';
import { CheckCircle } from 'lucide-react';

/**
 * TELA 02 — REGISTO (Step 1/2)
 * Mockup: Registo 1/2.png
 * Wired to Supabase signUp + Google OAuth
 *
 * Fluxo: Register → email confirmation → login → complete-profile
 * Se email confirmation estiver desactivado, vai directo para complete-profile.
 */
export function RegisterPage() {
  const navigate = useNavigate();
  const { signUp, signInWithGoogle } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    email?: string | null;
    password?: string | null;
    confirm?: string | null;
  }>({});
  const [authError, setAuthError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Check for OAuth or Email link errors in the URL
  useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      const query = window.location.search;
      const params = new URLSearchParams(hash ? hash.replace('#', '?') : query);
      const errDesc = params.get('error_description');
      if (errDesc) {
        setAuthError(decodeURIComponent(errDesc.replace(/\+/g, ' ')));
        // Optional: clear the hash so it doesn't persist on reload
        window.history.replaceState(null, '', window.location.pathname);
      }
    }
  });

  const handleRegister = async () => {
    const newErrors: typeof errors = {};

    if (!email.includes('@')) {
      newErrors.email = 'Email inválido';
    }
    if (password.length < 6) {
      newErrors.password = 'Mínimo 6 caracteres';
    }
    if (password !== confirmPassword) {
      newErrors.confirm = 'As passwords não coincidem';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setAuthError(null);
    setSubmitting(true);

    const result = await signUp(email, password);
    setSubmitting(false);

    if (result.success) {
      // TODO: Check if email confirmation is required
      // For now, show success message to check email
      setSuccess(true);
    } else {
      setAuthError(result.error ?? 'Erro ao registar');
    }
  };

  const handleGoogleRegister = async () => {
    setAuthError(null);
    const result = await signInWithGoogle();
    if (!result.success && result.error) {
      setAuthError(result.error);
    }
  };

  // Show success message after registration
  if (success) {
    return (
      <div className="flex flex-col h-dvh max-w-[420px] mx-auto bg-white relative overflow-hidden">
        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
          <div className="w-20 h-20 bg-[#4CAF50]/10 rounded-full flex items-center justify-center">
            <CheckCircle size={48} className="text-[#4CAF50]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Verifica o teu email
          </h2>
          <p className="text-gray-500 text-center text-[14px] leading-relaxed max-w-[300px]">
            Enviámos um link de confirmação para <strong className="text-gray-800">{email}</strong>. 
            Clica no link para activar a tua conta.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="mt-4 text-[#4A6CF7] font-bold text-[14px] hover:underline"
          >
            Ir para o Login
          </button>
        </div>
        <div className="h-6 w-full bg-[#4CAF50] shrink-0" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-dvh max-w-[420px] mx-auto bg-white relative overflow-hidden">

      <div className="flex-1 flex flex-col px-6 pt-12 pb-6 z-10">
        
        {/* LOGO */}
        <div className="flex justify-center mb-8 w-full">
           <img 
             src={ASSETS.logoFull} 
             alt="Poop Surprise" 
             className="w-[260px] h-auto object-contain drop-shadow-md"
           />
        </div>

        {/* INPUTS */}
        <AuthInput
          id="input-register-email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(v) => { setEmail(v); setErrors(p => ({ ...p, email: null })); setAuthError(null); }}
          error={errors.email || (authError && authError.toLowerCase().includes('email') ? authError : null)}
        />

        <AuthInput
          id="input-register-password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(v) => { setPassword(v); setErrors(p => ({ ...p, password: null })); setAuthError(null); }}
          error={errors.password || (authError && authError.toLowerCase().includes('password') ? authError : null)}
        />

        <AuthInput
          id="input-register-confirm"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(v) => { setConfirmPassword(v); setErrors(p => ({ ...p, confirm: null })); }}
          error={errors.confirm}
        />

        {/* General error */}
        {authError && !authError.toLowerCase().includes('email') && !authError.toLowerCase().includes('password') && (
          <p className="text-red-500 text-[12px] text-center mb-2">{authError}</p>
        )}

        {/* Spacer */}
        <div className="h-4" />

        {/* CTA — CheckCircle button */}
        <button
          id="btn-register-submit"
          onClick={handleRegister}
          disabled={submitting}
          className={`w-full h-[56px] rounded-2xl bg-[#4A6CF7] text-white flex items-center justify-center font-bold text-[16px] transition-all shadow-[0_4px_15px_rgba(74,108,247,0.4)] hover:shadow-[0_6px_20px_rgba(74,108,247,0.5)] active:scale-[0.98] ${
            submitting ? 'opacity-60 cursor-not-allowed' : ''
          }`}
        >
          {submitting ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <CheckCircle size={28} strokeWidth={2.5} />
          )}
        </button>

        {/* OR DIVIDER */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-sm font-medium">Or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* GOOGLE BUTTON */}
        <div className="flex justify-center mb-auto">
          <button 
            id="btn-register-google"
            onClick={handleGoogleRegister}
            className="w-16 h-16 bg-white rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.1)] flex items-center justify-center hover:scale-105 transition-transform border border-gray-100"
          >
            <img 
              src={ASSETS.googleG} 
              alt="Google" 
              className="w-8 h-8 object-contain"
            />
          </button>
        </div>

      </div>

      {/* Decorative scooter */}
      <img 
        src={ASSETS.scooterBottom} 
        alt="Scooter" 
        className="absolute bottom-10 left-2 w-24 object-contain opacity-90 pointer-events-none z-10"
      />

      {/* FOOTER */}
      <div className="relative z-10 pb-2 text-center">
        <p className="text-gray-600 text-[14px] mb-2">
          Already have an account?{' '}
          <a 
            id="link-login" 
            href="/login"
            className="text-[#4A6CF7] font-bold hover:underline"
          >
            Login
          </a>
        </p>
      </div>

      {/* BARRA DE COR NO FUNDO */}
      <div className="h-6 w-full bg-[#4CAF50] shrink-0" />
    </div>
  );
}
