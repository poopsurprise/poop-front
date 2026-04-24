import { ASSETS } from '../../constants/assets';

export type FriendVariant = 'available' | 'full' | 'ceasefire' | 'noreturn_poop' | 'noreturn_coin' | 'dead' | 'in_boost_game';

interface FriendCardProps {
  id: string;
  username: string;
  avatar: string;
  occupationPercent?: number;
  variant: FriendVariant;
  ceasefireTimer?: string;
  onClick?: () => void;
}

export function FriendCard({
  id,
  username,
  avatar,
  occupationPercent = 0,
  variant,
  ceasefireTimer,
  onClick,
}: FriendCardProps) {
  const isDisabled = variant !== 'available' && variant !== 'in_boost_game';

  return (
    <button
      id={`friend-card-${variant}-${id}`}
      onClick={onClick}
      className="flex flex-col items-center gap-1 py-2 transition-transform active:scale-95"
    >
      {/* Avatar */}
      <div className={`relative w-14 h-14 rounded-full overflow-hidden border-[3px] ${
        variant === 'available' ? 'border-green-400' :
        variant === 'in_boost_game' ? 'border-orange-400' :
        'border-gray-400'
      } ${isDisabled ? 'opacity-40' : ''}`}>
        <img src={avatar || ASSETS.defaultAvatar} alt={username} className="w-full h-full object-cover" />
        
        {/* Overlay icons for special states */}
        {variant === 'full' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <img src={ASSETS.flies} alt="Full" className="w-8 h-8 object-contain" />
          </div>
        )}
      </div>

      {/* Name or timer */}
      {variant === 'ceasefire' ? (
        <span className="text-white/60 text-[11px] font-mono">{ceasefireTimer ?? '07:59'}</span>
      ) : variant === 'full' || variant === 'dead' ? (
        <span className="text-white/30 text-[11px]">
          {variant === 'dead' ? '💀' : ''}
        </span>
      ) : variant === 'noreturn_poop' ? (
        <span className="text-white/40 text-[11px]">🔄</span>
      ) : variant === 'noreturn_coin' ? (
        <span className="text-white/40 text-[11px]">🐷</span>
      ) : variant === 'in_boost_game' ? (
        <span className="text-orange-300 text-[10px]">Em jogo</span>
      ) : (
        <span className="text-white text-[11px] truncate max-w-[64px]">{username}</span>
      )}

      {/* Occupation bar for available */}
      {variant === 'available' && (
        <div className="w-12 h-1 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-400 rounded-full"
            style={{ width: `${Math.min(occupationPercent, 100)}%` }}
          />
        </div>
      )}
    </button>
  );
}
