import React, { useState } from 'react';
import type { AuthInputProps } from '../../types/components';
import { Eye, EyeOff, Search } from 'lucide-react';

export function AuthInput({
  id,
  type = 'text',
  placeholder,
  value,
  error,
  icon,
  onChange,
  onIconClick
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const displayType = isPassword && showPassword ? 'text' : type;

  const handleIconClick = () => {
    if (isPassword) {
      setShowPassword(!showPassword);
    } else if (onIconClick) {
      onIconClick();
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className={`relative flex items-center w-full h-[56px] rounded-2xl bg-white border ${error ? 'border-red-500' : 'border-gray-200'} shadow-[0_4px_10px_rgba(0,0,0,0.05)] overflow-hidden`}>
        <input
          id={id}
          type={displayType}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full h-full bg-transparent px-4 text-gray-800 placeholder:text-gray-400 outline-none text-[14px]"
        />
        
        {(icon || isPassword) && (
          <button 
            type="button"
            onClick={handleIconClick}
            className="px-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {isPassword ? (
               showPassword ? <EyeOff size={20} /> : <Eye size={20} />
            ) : icon === 'search' ? (
               <Search size={20} />
            ) : null}
          </button>
        )}
      </div>
      
      {/* 20px error space reserved so layout doesn't jump */}
      <div className="min-h-[20px] px-2 pt-1">
        {error && <span className="text-[12px] text-red-500">{error}</span>}
      </div>
    </div>
  );
}
