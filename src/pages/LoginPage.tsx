import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthInput } from '../components/ui/AuthInput';
import { ASSETS } from '../constants/assets';
import { useAuth } from '../hooks/useAuth';
import { trpc } from '../lib/trpc';

/**
 * TELA 01 — LOGIN
 * Mockup: Login.png
 * Wired to Supabase signInWithPassword + Google OAuth
 */
export function LoginPage() {
  const navigate = useNavigate();
  const { signIn, signInWithGoogle, loading } = useAuth();
  const pingQuery = trpc.ping.useQuery();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

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

  const handleLogin = async () => {
    // Local validation
    if (!email.includes('@')) {
      setLocalError('Email inválido');
      return;
    }
    if (!password) {
      setLocalError('Introduz a password');
      return;
    }

    setLocalError(null);
    setAuthError(null);
    setSubmitting(true);

    const result = await signIn(email, password);
    setSubmitting(false);

    if (result.success) {
      navigate('/inventory', { replace: true });
    } else {
      setAuthError(result.error ?? 'Erro ao fazer login');
    }
  };

  const handleGoogleLogin = async () => {
    setAuthError(null);
    const result = await signInWithGoogle();
    if (!result.success && result.error) {
      setAuthError(result.error);
    }
  };

  const displayError = localError || authError;

  return (
    <div className="flex flex-col h-dvh max-w-[420px] mx-auto bg-white relative overflow-hidden">

      <div className="flex-1 flex flex-col px-6 pt-12 pb-6 z-10">
        
        {/* LOGO */}
        <div className="flex justify-center mb-10 w-full">
           <img 
             src={ASSETS.logoFull} 
             alt="Poop Surprise" 
             className="w-[260px] h-auto object-contain drop-shadow-md"
           />
        </div>

        {/* tRPC connectivity indicator (dev only) */}
        {import.meta.env.DEV && (
          <div className="w-full rounded-xl bg-gray-100 p-2 text-center text-xs mb-4">
            {pingQuery.isLoading && (
              <span className="text-gray-500">⏳ A ligar ao backend...</span>
            )}
            {pingQuery.isError && (
              <span className="text-red-500">❌ Backend: {pingQuery.error.message}</span>
            )}
            {pingQuery.data && (
              <span className="text-green-600">✅ Backend online</span>
            )}
          </div>
        )}

        {/* INPUTS */}
        <AuthInput
          id="input-login-email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(v) => { setEmail(v); setLocalError(null); setAuthError(null); }}
          error={displayError && displayError.toLowerCase().includes('email') ? displayError : null}
        />

        <AuthInput
          id="input-login-password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(v) => { setPassword(v); setLocalError(null); setAuthError(null); }}
          error={displayError && !displayError.toLowerCase().includes('email') ? displayError : null}
        />

        {/* LINKS — Remember + Forgot password */}
        <div className="flex justify-between items-center w-full px-1 mt-1 mb-8">
          <label className="flex items-center gap-2 cursor-pointer">
             <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#4A6CF7] focus:ring-[#4A6CF7]" />
             <span className="text-gray-600 text-[14px]">Remember</span>
          </label>
          <button className="text-gray-500 text-[14px] hover:text-[#4A6CF7] transition-colors">
            Forgot password?
          </button>
        </div>

        {/* CTA */}
        <button
          id="btn-login-submit"
          onClick={handleLogin}
          disabled={submitting || loading}
          className={`w-full h-[56px] rounded-2xl bg-[#4A6CF7] text-white flex items-center justify-center font-bold text-[16px] transition-all shadow-[0_4px_15px_rgba(74,108,247,0.4)] hover:shadow-[0_6px_20px_rgba(74,108,247,0.5)] active:scale-[0.98] ${
            (submitting || loading) ? 'opacity-60 cursor-not-allowed' : ''
          }`}
        >
          {submitting ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            'Login'
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
            id="btn-login-google"
            onClick={handleGoogleLogin}
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
          Don't have an account?{' '}
          <a 
            id="link-signup" 
            href="/register"
            className="text-[#4A6CF7] font-bold hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>

      {/* BARRA DE COR NO FUNDO */}
      <div className="h-6 w-full bg-[#4CAF50] shrink-0" />
    </div>
  );
}
