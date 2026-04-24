import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { ASSETS } from '../../constants/assets';

export interface PoopPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  poopName: string;
  poopDescription: string;
  poopImage: string;
  coinPrice: number;
  diamondPrice: number;
  onPurchase: (type: 'coin' | 'diamond', quantity: number) => void;
  piggyBalance: number;
  diamondBalance: number;
}

export function PoopPurchaseModal({
  isOpen,
  onClose,
  poopName,
  poopDescription,
  poopImage,
  coinPrice,
  diamondPrice,
  onPurchase,
  piggyBalance,
  diamondBalance,
}: PoopPurchaseModalProps) {
  const [coinQty, setCoinQty] = useState(0);
  const [diamondQty, setDiamondQty] = useState(0);

  const handleBuy = () => {
    if (coinQty > 0) onPurchase('coin', coinQty);
    else if (diamondQty > 0) onPurchase('diamond', diamondQty);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* Header text */}
      <h2 className="text-[24px] font-bold text-gray-700 mt-4 mb-2">{poopName}</h2>
      <p className="text-[14px] text-gray-500 text-center leading-tight mb-8 max-w-[85%]">
        {poopDescription}
      </p>

      {/* Main Image & Icons */}
      <div className="flex items-center justify-center gap-4 mb-4">
        {/* Sound Button */}
        <button className="w-12 h-12 bg-gray-400/50 rounded-xl flex items-center justify-center shadow-inner">
          <span className="text-2xl">🔊</span>
        </button>
        
        {/* Poop Image */}
        <div className="w-32 h-32 flex items-center justify-center">
          <img src={poopImage} alt={poopName} className="max-w-full max-h-full object-contain drop-shadow-xl" />
        </div>
        
        {/* Play Button */}
        <button className="w-12 h-12 bg-gray-400/50 rounded-xl flex items-center justify-center shadow-inner">
          <span className="text-2xl">▶</span>
        </button>
      </div>

      {/* Prices */}
      <div className="flex flex-col items-center gap-1 mb-6">
        <div className="flex items-center gap-1 text-[24px] font-bold text-gray-500">
          <img src={ASSETS.coinGold} alt="Coin" className="w-6 h-6" />
          <span>{coinPrice}</span>
        </div>
        <div className="flex items-center gap-1 text-[12px] text-gray-500 font-medium">
          <span className="text-[10px]">or</span>
          <img src={ASSETS.diamond} alt="Diamond" className="w-3 h-4" />
          <span>{diamondPrice}</span>
        </div>
      </div>

      {/* Quantity Selectors */}
      <div className="flex w-full gap-4 px-2 mb-8">
        {/* Coins Qty */}
        <div className="flex-1 bg-white rounded-xl shadow-md p-3 flex flex-col items-center">
          <div className="w-full h-10 border border-gray-300 rounded-lg flex items-center justify-center mb-2 font-bold text-gray-700 text-lg">
            {coinQty}
          </div>
          <div className="flex items-center gap-1 mb-3">
            <img src={ASSETS.coinGold} alt="Coin" className="w-4 h-4" />
            <span className="text-gray-500 font-bold text-sm">{coinPrice * coinQty}</span>
          </div>
          <div className="flex gap-2 w-full">
            <button 
              onClick={() => setCoinQty(q => Math.max(0, q - 1))}
              className="flex-1 h-8 bg-white border border-gray-200 shadow-sm rounded-lg flex items-center justify-center text-gray-600 text-xl font-bold active:bg-gray-100"
            >+</button>
            <button 
              onClick={() => setCoinQty(q => q + 1)}
              className="flex-1 h-8 bg-white border border-gray-200 shadow-sm rounded-lg flex items-center justify-center text-gray-600 text-xl font-bold active:bg-gray-100"
            >-</button>
          </div>
        </div>

        {/* Diamonds Qty */}
        <div className="flex-1 bg-white rounded-xl shadow-md p-3 flex flex-col items-center">
          <div className="w-full h-10 border border-gray-300 rounded-lg flex items-center justify-center mb-2 font-bold text-gray-700 text-lg">
            {diamondQty}
          </div>
          <div className="flex items-center gap-1 mb-3">
            <img src={ASSETS.diamond} alt="Diamond" className="w-3 h-4" />
            <span className="text-gray-500 font-bold text-sm">{(diamondPrice * diamondQty).toFixed(2)}</span>
          </div>
          <div className="flex gap-2 w-full">
            <button 
              onClick={() => setDiamondQty(q => Math.max(0, q - 1))}
              className="flex-1 h-8 bg-white border border-gray-200 shadow-sm rounded-lg flex items-center justify-center text-gray-600 text-xl font-bold active:bg-gray-100"
            >+</button>
            <button 
              onClick={() => setDiamondQty(q => q + 1)}
              className="flex-1 h-8 bg-white border border-gray-200 shadow-sm rounded-lg flex items-center justify-center text-gray-600 text-xl font-bold active:bg-gray-100"
            >-</button>
          </div>
        </div>
      </div>

      {/* Buy Button */}
      <button 
        onClick={handleBuy}
        className="w-[80%] h-14 bg-[#4A72D6] rounded-xl shadow-[0_4px_0_#3352A3] flex items-center justify-center active:translate-y-1 active:shadow-none transition-all mb-4"
      >
        <img src={ASSETS.cashRegister} alt="Buy" className="w-8 h-8 object-contain" />
      </button>

      {/* Bottom Balance Bar */}
      <div className="w-[115%] -mx-8 -mb-6 h-14 bg-white flex items-center justify-between px-8 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <img src={ASSETS.piggyBank} alt="Piggy" className="w-8 h-8" />
          <span className="text-gray-400 font-medium">{piggyBalance}</span>
        </div>
        <div className="w-px h-6 bg-gray-300"></div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400 font-medium">{diamondBalance.toFixed(2)}</span>
          <img src={ASSETS.diamond} alt="Diamond" className="w-4 h-6" />
        </div>
      </div>
    </Modal>
  );
}
