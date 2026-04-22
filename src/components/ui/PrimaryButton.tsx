import React from 'react';
import type { PrimaryButtonProps } from '../../types/components';

export function PrimaryButton({
  id,
  variant = 'text',
  text,
  icon,
  disabled,
  onClick
}: PrimaryButtonProps) {
  
  if (variant === 'icon') {
    return (
      <button
        id={id}
        disabled={disabled}
        onClick={onClick}
        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform active:scale-95 shadow-md ${
          disabled ? 'bg-gray-300 cursor-not-allowed opacity-50' : 'bg-[#0A84FF] text-white hover:bg-[#0A84FF]/90'
        }`}
      >
        {icon?.startsWith('/') ? (
          <img src={icon} alt="Icon" className="w-6 h-6 object-contain" />
        ) : (
          <span className="text-xl">{icon}</span> // Temporary fallback
        )}
      </button>
    );
  }

  return (
    <button
      id={id}
      disabled={disabled}
      onClick={onClick}
      className={`w-full h-[56px] rounded-2xl flex items-center justify-center font-bold text-[16px] transition-transform shadow-md ${
        disabled 
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50' 
          : 'bg-[#0A84FF] text-white hover:bg-[#0A84FF]/90 active:scale-[0.98]'
      }`}
    >
      {icon && icon.startsWith('/') && <img src={icon} alt="Icon" className="w-5 h-5 mr-2 object-contain" />}
      {text}
    </button>
  );
}
