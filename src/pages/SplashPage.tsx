import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ASSETS } from '../constants/assets';

export function SplashPage() {
  const navigate = useNavigate();
  // We use a simple slider for the captcha to simulate dragging a coin into a target
  const [sliderValue, setSliderValue] = useState(0);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setSliderValue(val);
    if (val >= 95) {
      // Captcha resolved
      setTimeout(() => {
        navigate('/login');
      }, 500);
    }
  };

  return (
    <div className="w-full min-h-[100dvh] bg-[#f5f5f5] flex flex-col items-center justify-between py-10 px-4 relative overflow-hidden">
      
      {/* Logo */}
      <div className="flex flex-col items-center mt-6 mb-8 z-10">
        <img src={ASSETS.logoFull} alt="Poop Surprise" className="h-28 object-contain" />
      </div>

      {/* Ad Placeholder */}
      <div className="w-full max-w-[360px] h-[45vh] bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center p-6 z-10">
        <span className="text-gray-300 font-medium text-lg uppercase tracking-widest text-center">
          ESPAÇO<br/>PUBLICITÁRIO
        </span>
      </div>

      {/* Captcha Area */}
      <div className="w-full max-w-[360px] mt-8 z-10 flex flex-col items-center">
        <div className="w-full h-24 bg-[#333333] rounded-2xl relative flex items-center px-4 mb-4 overflow-hidden shadow-lg">
          
          {/* Target Circle (Right) */}
          <div className="absolute right-6 w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-inner">
             {/* Inner dark circle to show it's a hole/target */}
             {/* <div className="w-10 h-10 rounded-full bg-gray-100 shadow-inner"></div> */}
          </div>

          {/* Draggable Coin (Slider) */}
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={sliderValue} 
            onChange={handleSliderChange}
            className="w-full h-14 bg-transparent appearance-none z-20 cursor-pointer"
            style={{
              // Hiding the track, customizing the thumb via CSS if needed, 
              // but standard input range is tricky to style a custom thumb cross-browser perfectly inline.
              // For a simple PoC, we rely on the thumb being invisible or styled in global css.
            }}
          />
          {/* Visual Coin overlaying the thumb */}
          <div 
            className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 pointer-events-none transition-transform"
            style={{ 
              transform: `translate(calc(${sliderValue} * (300px - 56px) / 100), -50%)` // approximate width calculation
            }}
          >
            <img src={ASSETS.coinGold} alt="Coin" className="w-full h-full object-contain" />
          </div>
        </div>

        {/* Instructions */}
        <div className="flex items-start gap-3 w-full px-2">
          <img src={ASSETS.deliveryScooter} alt="Scooter" className="w-10 h-10 object-contain -scale-x-100" />
          <div>
            <p className="text-gray-800 font-medium text-[16px] leading-tight">
              Arraste a moeda até ao circulo
            </p>
            <p className="text-[#4A72D6] font-bold text-[16px]">
              Para entrar
            </p>
          </div>
        </div>
      </div>
      
      {/* Add slider styles globally or inline */}
      <style>{`
        input[type=range] {
          -webkit-appearance: none;
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 56px;
          width: 56px;
          border-radius: 50%;
          background: transparent;
          cursor: pointer;
        }
        input[type=range]::-moz-range-thumb {
          height: 56px;
          width: 56px;
          border-radius: 50%;
          background: transparent;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}
