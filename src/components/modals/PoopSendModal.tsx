import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { ASSETS } from '../../constants/assets';

export interface PoopSendModalProps {
  isOpen: boolean;
  onClose: () => void;
  poopName: string;
  poopDescription: string;
  poopImage: string;
  isBoost?: boolean;
  onSend: (method: 'fan' | 'gift' | 'delivery') => void;
}

export function PoopSendModal({
  isOpen,
  onClose,
  poopName,
  poopDescription,
  poopImage,
  isBoost = false,
  onSend,
}: PoopSendModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<'fan' | 'gift' | 'delivery'>(isBoost ? 'delivery' : 'gift');

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* Header text */}
      <h2 className="text-[24px] font-bold text-gray-700 mt-4 mb-2">{poopName}</h2>
      <p className="text-[14px] text-gray-500 text-center leading-tight mb-8 max-w-[85%]">
        {poopDescription}
      </p>

      {/* Main Image & Icons */}
      <div className="flex items-center justify-center gap-4 mb-10">
        {/* Sound/No-Sound Button */}
        <button className="w-12 h-12 bg-gray-400/50 rounded-xl flex items-center justify-center shadow-inner">
          <span className="text-2xl">{isBoost ? '🔇' : '🔊'}</span>
        </button>
        
        {/* Poop Image */}
        <div className="w-32 h-32 flex items-center justify-center">
          <img src={poopImage} alt={poopName} className="max-w-full max-h-full object-contain drop-shadow-xl" />
        </div>
        
        {/* Right Button (Play or Boost) */}
        <button className="w-12 h-12 bg-gray-400/50 rounded-xl flex items-center justify-center shadow-inner">
          {isBoost ? (
            <span className="text-2xl font-bold text-red-600">B</span> // Placeholder para o ícone BOOST
          ) : (
            <span className="text-2xl">▶</span>
          )}
        </button>
      </div>

      {/* Send Methods */}
      <div className="flex justify-center gap-4 mb-10">
        {/* Fan */}
        <button 
          onClick={() => !isBoost && setSelectedMethod('fan')}
          className={`w-[80px] h-[80px] rounded-xl flex items-center justify-center bg-white shadow-sm transition-all ${
            isBoost ? 'opacity-50 cursor-not-allowed grayscale' : 'cursor-pointer'
          } ${
            selectedMethod === 'fan' ? 'border-4 border-gray-800 scale-105' : 'border border-gray-200'
          }`}
        >
          <img src={ASSETS.fan} alt="Fan" className="w-[60px] h-[60px] object-contain" />
        </button>

        {/* Gift */}
        <button 
          onClick={() => setSelectedMethod('gift')}
          className={`w-[80px] h-[80px] rounded-xl flex items-center justify-center bg-white shadow-sm transition-all cursor-pointer ${
            selectedMethod === 'gift' ? 'border-4 border-gray-800 scale-105' : 'border border-gray-200'
          }`}
        >
          <img src={ASSETS.giftBox} alt="Gift" className="w-[60px] h-[60px] object-contain" />
        </button>

        {/* Delivery */}
        <button 
          onClick={() => setSelectedMethod('delivery')}
          className={`w-[80px] h-[80px] rounded-xl flex items-center justify-center bg-white shadow-sm transition-all cursor-pointer ${
            selectedMethod === 'delivery' ? 'border-4 border-gray-800 scale-105' : 'border border-gray-200'
          }`}
        >
          <img src={ASSETS.scooterDelivery} alt="Delivery" className="w-[60px] h-[60px] object-contain" />
        </button>
      </div>

      {/* Send Button */}
      <button 
        onClick={() => onSend(selectedMethod)}
        className="w-[80%] h-14 bg-[#4A72D6] rounded-xl shadow-[0_4px_0_#3352A3] flex items-center justify-center active:translate-y-1 active:shadow-none transition-all mb-8"
      >
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      </button>

      {/* Bottom bar is replaced by a Back Button in the spec, but we use the "X" on the top right for Modals. 
          The design shows a back button below the blue button, but we can stick to standard modal closing. */}
      <div className="w-full flex justify-center mb-6">
        <button 
          onClick={onClose}
          className="w-12 h-12 rounded-xl bg-orange-400 flex items-center justify-center shadow-[0_4px_0_#c26e11] active:translate-y-1 active:shadow-none"
        >
          <svg className="w-6 h-6 text-white rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </Modal>
  );
}
