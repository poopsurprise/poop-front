import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 sm:justify-center sm:p-4">
      <div 
        className="w-full h-full sm:h-auto max-w-[420px] mx-auto bg-[#c4c4c4] sm:rounded-3xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300 relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center text-gray-800"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
