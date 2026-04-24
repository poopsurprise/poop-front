import React from 'react';
import { Modal } from '../ui/Modal';
import { ASSETS } from '../../constants/assets';

export interface AdRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClaimInstant: () => void;
  onWatchAd: () => void;
}

export function AdRewardModal({
  isOpen,
  onClose,
  onClaimInstant,
  onWatchAd,
}: AdRewardModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full bg-[#f0f0f0] rounded-t-3xl rounded-b-xl overflow-hidden relative -mt-6 -mx-6 mb-2">
        {/* Banner Area */}
        <div className="w-full h-48 bg-gradient-to-b from-[#ffd54f] to-[#ffb300] relative overflow-hidden flex items-end justify-center pb-2">
          {/* We use a placeholder div or an image here for the rainbow/stars */}
          <div className="absolute inset-0 flex items-center justify-center opacity-80">
             {/* If we have an exact asset we use it. For now, a CSS representation or generic image */}
             <div className="w-64 h-32 border-t-[20px] border-red-400 rounded-t-full absolute -bottom-10" />
             <div className="w-52 h-26 border-t-[20px] border-orange-400 rounded-t-full absolute -bottom-10" />
             <div className="w-40 h-20 border-t-[20px] border-yellow-400 rounded-t-full absolute -bottom-10" />
             <div className="w-28 h-14 border-t-[20px] border-green-400 rounded-t-full absolute -bottom-10" />
             <div className="w-16 h-8 border-t-[20px] border-blue-400 rounded-t-full absolute -bottom-10" />
          </div>
          
          <div className="relative z-10 flex flex-col items-center">
            {/* Bunch of coins */}
            <div className="flex -space-x-4 mb-2">
              <img src={ASSETS.coinGold} alt="Coins" className="w-12 h-12 relative z-20" />
              <img src={ASSETS.coinGold} alt="Coins" className="w-12 h-12 relative z-10 -translate-y-2" />
              <img src={ASSETS.coinGold} alt="Coins" className="w-12 h-12 relative z-30" />
            </div>
            {/* Podium */}
            <div className="w-40 h-8 bg-yellow-300 rounded-full border-b-4 border-yellow-500 shadow-lg"></div>
          </div>

          {/* Stars */}
          <div className="absolute left-6 bottom-8 w-12 h-12 bg-yellow-300 rotate-12 rounded-lg flex items-center justify-center">
             <span className="text-xl">⭐</span>
          </div>
          <div className="absolute right-6 bottom-8 w-12 h-12 bg-yellow-300 -rotate-12 rounded-lg flex items-center justify-center">
             <span className="text-xl">⭐</span>
          </div>
        </div>

        {/* Content Cards */}
        <div className="p-4 flex gap-4 h-64">
          {/* Instant Claim Card */}
          <div className="flex-1 bg-[#e0e0e0] rounded-2xl p-4 flex flex-col items-center justify-between shadow-inner">
            <span className="text-gray-500 font-bold text-sm">Receba</span>
            <div className="w-20 h-20 rounded-full bg-yellow-400 border-[4px] border-yellow-300 flex items-center justify-center shadow-md">
               <img src={ASSETS.coinGold} alt="Coin" className="w-[80%] h-[80%] object-contain" />
            </div>
            <span className="text-gray-600 font-bold text-lg">20</span>
            <button 
              onClick={onClaimInstant}
              className="w-full h-12 bg-[#4A72D6] rounded-xl shadow-[0_4px_0_#3352A3] flex items-center justify-center active:translate-y-1 active:shadow-none transition-all"
            >
              {/* Hand receiving icon */}
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>

          {/* Ad Watch Card */}
          <div className="flex-1 bg-[#e0e0e0] rounded-2xl p-4 flex flex-col items-center justify-between shadow-inner">
            <span className="text-gray-500 font-bold text-sm">Receba</span>
            <div className="w-24 h-24 rounded-full bg-yellow-400 border-[4px] border-yellow-300 flex items-center justify-center shadow-md -my-2">
               <img src={ASSETS.coinGold} alt="Coins" className="w-[80%] h-[80%] object-contain" />
            </div>
            <span className="text-gray-600 font-bold text-xl">3000</span>
            <button 
              onClick={onWatchAd}
              className="w-full h-12 bg-[#4A72D6] rounded-xl shadow-[0_4px_0_#3352A3] flex items-center justify-center active:translate-y-1 active:shadow-none transition-all"
            >
              {/* Play icon */}
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
