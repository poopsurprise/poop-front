import React, { useState } from 'react';
import { AuthInput } from '../components/ui/AuthInput';
import { PrimaryButton } from '../components/ui/PrimaryButton';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = () => {
    if (!email.includes('@')) {
      setErrorMsg('Email inválido');
      return;
    }
    setErrorMsg(null);
    alert('Login submetido! (Mock)');
  };

  return (
    <div className="flex flex-col h-dvh max-w-[420px] mx-auto bg-white/95 relative overflow-hidden">
      
      {/* Decorative Bottom Scooter */}
      <img 
        src="/assets/img/scooter-bottom.png" 
        alt="Scooter" 
        className="absolute bottom-6 left-0 w-32 object-contain opacity-50 pointer-events-none"
      />

      <div className="flex-1 flex flex-col px-6 pt-12 pb-6 z-10">
        
        {/* LOGO */}
        <div className="flex justify-center mb-10 w-full">
           <img 
             src="/assets/img/LOGO_POOP_SURPRISE.png" 
             alt="Poop Surprise" 
             className="w-[200px] h-auto object-contain drop-shadow-md"
             onError={(e) => { e.currentTarget.style.display = 'none'; }}
           />
           {/* Fallback caso a imagem se chame logo-full.png */}
           <img 
             src="/assets/img/logo-full.png" 
             alt="Poop Surprise" 
             className="w-[200px] h-auto object-contain drop-shadow-md absolute"
             onError={(e) => { e.currentTarget.style.display = 'none'; }}
           />
        </div>

        {/* INPUTS */}
        <AuthInput
          id="input-login-email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={setEmail}
          error={errorMsg}
        />

        <AuthInput
          id="input-login-password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={setPassword}
        />

        {/* LINKS */}
        <div className="flex justify-between items-center w-full px-1 mt-1 mb-8">
          <label className="flex items-center gap-2 cursor-pointer">
             <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#0A84FF] focus:ring-[#0A84FF]" />
             <span className="text-gray-600 text-[14px]">Remember</span>
          </label>
          <button className="text-gray-500 text-[14px] hover:text-[#0A84FF] transition-colors">
            Forgot password?
          </button>
        </div>

        {/* CTA */}
        <PrimaryButton
          id="btn-login-submit"
          text="Login"
          onClick={handleLogin}
        />

        {/* OR DIVIDER */}
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-sm font-medium">Or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* GOOGLE BUTTON */}
        <div className="flex justify-center mb-auto">
          <button 
            id="btn-login-google"
            className="w-16 h-16 bg-white rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.1)] flex items-center justify-center hover:scale-105 transition-transform"
          >
            <img src="/assets/img/google-g.png" alt="Google" className="w-8 h-8 object-contain" />
          </button>
        </div>

        {/* FOOTER LINK */}
        <p className="text-center text-gray-600 text-[14px] mt-6 bg-white/80 py-2 rounded-lg inline-block w-max self-center border border-white/50 backdrop-blur-sm z-10 shadow-sm px-4">
          Don't have an account? <button id="link-signup" className="text-[#0A84FF] font-bold hover:underline">Sign Up</button>
        </p>

      </div>
      
      {/* BARRA DE COR NO FUNDO */}
      <div className="h-6 w-full bg-[#0A84FF]" />

    </div>
  );
}
