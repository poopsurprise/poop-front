import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { ASSETS } from '../../constants/assets';

export interface ManageFriendModalProps {
  isOpen: boolean;
  onClose: () => void;
  friendId: string;
  friendName: string;
  friendAvatar: string;
  friendshipProgress: number; // 0 to 100
  onUpdateName: (newName: string) => void;
  onUnfriend: () => void;
  onSendPoop: () => void;
  onChallenge: () => void;
  onToggleNotification: (enabled: boolean) => void;
}

export function ManageFriendModal({
  isOpen,
  onClose,
  friendId,
  friendName,
  friendAvatar,
  friendshipProgress,
  onUpdateName,
  onUnfriend,
  onSendPoop,
  onChallenge,
  onToggleNotification,
}: ManageFriendModalProps) {
  const [nameInput, setNameInput] = useState(friendName);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full bg-white rounded-3xl p-6 flex flex-col items-center relative -mx-6 mb-4">
        {/* Border wrapper for avatar */}
        <div className="w-32 h-32 rounded-full border-[6px] border-[#42a5f5] p-1 mb-4">
          <div className="w-full h-full rounded-full bg-[#4db6ac] overflow-hidden flex items-end justify-center">
             <img src={friendAvatar} alt={friendName} className="w-[80%] h-[80%] object-cover" />
          </div>
        </div>

        {/* ID */}
        <h3 className="text-[18px] font-bold text-gray-800 mb-1">ID</h3>
        {/* Name */}
        <p className="text-[16px] text-gray-800 mb-4">{friendName}</p>

        {/* Progress Bar */}
        <div className="w-full max-w-[200px] h-4 border-2 border-gray-200 rounded-full overflow-hidden relative mb-6">
          <div 
            className="h-full bg-[#4db6ac]" 
            style={{ width: `${friendshipProgress}%` }}
          />
          <span className="absolute right-2 top-0 bottom-0 text-[10px] font-bold text-gray-500 flex items-center">
            {friendshipProgress}%
          </span>
        </div>

        {/* Name Input */}
        <div className="w-full max-w-[240px] mb-8">
          <input 
            type="text" 
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            onBlur={() => onUpdateName(nameInput)}
            placeholder="Name"
            className="w-full h-12 bg-white border border-gray-200 rounded-xl px-4 text-center text-gray-500 shadow-sm focus:outline-none focus:border-[#42a5f5]"
          />
        </div>

        {/* Actions Row 1 */}
        <div className="flex w-full items-center justify-between px-6 mb-8 border-b border-gray-100 pb-6">
          {/* Send Poop Button */}
          <button onClick={onSendPoop} className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <span className="text-3xl">🤝</span>
              <img src={ASSETS.smileVector} alt="Poop" className="w-8 h-8 drop-shadow" />
            </div>
            <span className="text-xl font-bold text-gray-800">1000</span>
          </button>
        </div>

        {/* Actions Row 2 */}
        <div className="flex w-full items-center justify-center gap-6 mb-8">
          {/* Special Actions (Shield, Swords, Bomb) */}
          <button className="w-14 h-14 relative flex items-center justify-center">
            <img src={ASSETS.shieldRanking} alt="Shield" className="w-full h-full object-contain" />
          </button>
          
          <button onClick={onChallenge} className="w-14 h-14 relative flex items-center justify-center rounded-full bg-white shadow-[0_0_10px_rgba(0,0,0,0.1)] border border-gray-100">
            <img src={ASSETS.swords} alt="Swords" className="w-10 h-10 object-contain" />
          </button>

          <button className="w-14 h-14 relative flex items-center justify-center">
            <img src={ASSETS.bombIcon} alt="Bomb" className="w-10 h-10 object-contain" />
          </button>
        </div>

        {/* Notification Toggle */}
        <div className="flex items-center gap-2 mb-8">
          <button 
            onClick={() => {
              const newVal = !notificationsEnabled;
              setNotificationsEnabled(newVal);
              onToggleNotification(newVal);
            }}
            className="w-6 h-6 rounded bg-gray-200 flex items-center justify-center"
          >
            {notificationsEnabled && (
              <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
          <img src={ASSETS.bell} alt="Bell" className="w-8 h-8 object-contain" />
        </div>

        {/* Bottom Actions (Delete / Confirm) */}
        <div className="w-full max-w-[240px] h-14 bg-[#4A72D6] rounded-xl shadow-[0_4px_0_#3352A3] flex overflow-hidden">
          <button 
            onClick={onUnfriend}
            className="flex-1 h-full flex items-center justify-center border-r border-[#3352A3] active:bg-[#3352A3] transition-colors"
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
          <button 
            onClick={onClose}
            className="flex-1 h-full flex items-center justify-center active:bg-[#3352A3] transition-colors"
          >
            <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </Modal>
  );
}
