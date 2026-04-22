import React, { useState } from 'react';
import { AuthInput } from '../components/ui/AuthInput';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { ASSETS } from '../constants/assets';

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
    <div className="flex flex-col h-dvh max-w-[420px] mx-auto bg-white relative overflow-hidden">

      <div className="flex-1 flex flex-col px-6 pt-12 pb-6 z-10">
        
        {/* LOGO */}
        <div className="flex justify-center mb-10 w-full">
           <img 
             src={ASSETS.logoFull} 
             alt="Poop Surprise" 
             className="w-[240px] h-auto object-contain drop-shadow-md"
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
            className="w-16 h-16 bg-white rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.1)] flex items-center justify-center hover:scale-105 transition-transform border border-gray-100"
          >
            {/* Google G – using text fallback since google-g.png not in assets */}
            <span className="text-2xl font-bold" style={{ color: '#4285F4' }}>G</span>
          </button>
        </div>

        {/* FOOTER LINK */}
        <p className="text-center text-gray-600 text-[14px] mt-6">
          Don't have an account? <button id="link-signup" className="text-[#0A84FF] font-bold hover:underline">Sign Up</button>
        </p>

      </div>
      
      {/* Decorative scooter */}
      <img 
        src={ASSETS.deliveryScooter} 
        alt="Scooter" 
        className="absolute bottom-8 left-4 w-24 object-contain opacity-30 pointer-events-none"
      />

      {/* BARRA DE COR NO FUNDO */}
      <div className="h-6 w-full bg-[#0A84FF] shrink-0" />

    </div>
  );
}
