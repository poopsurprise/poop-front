// =============================================================================
// Component Props — Interfaces para todos os componentes React
// =============================================================================
// O dev importa estas interfaces e implementa os componentes.
// Callbacks (on*) são opcionais — serão ligados depois pela AI.

import type {
  Player,
  Friend,
  CatalogItem,
  BoostPoopItem,
  InventorySlot,
  DiamondPack,
  GameParkingState,
  GameActiveState,
  GameResult,
  BoostZoneSlot,
  CollectionAlbum,
} from './index';

// =============================================================================
// LAYOUT
// =============================================================================

export interface TopToolbarProps {
  player: Player;
  activeGames?: number;
  onAvatarClick?: () => void;
  onFriendsClick?: () => void;
  onShopClick?: () => void;
  onGamesClick?: () => void;
}

export interface ActionBarProps {
  piggyBalance: number;
  paperStock: number;
  deliveryAvailable: string; // '1/1'
  fanAvailable: string;      // '2/2'
  onPiggyClick?: () => void;
  onPaperClick?: () => void;
  onDeliveryClick?: () => void;
  onFanClick?: () => void;
}

export interface BottomBarProps {
  level: number;
  progress: string; // '29/30'
  onChestClick?: () => void;
}

export interface BannerSlotProps {
  type: 'ad' | 'ranking';
  rankingPosition?: number;
}

export interface SaldoBarProps {
  piggyBalance: number;
  diamondBalance: number;
}

// =============================================================================
// UI
// =============================================================================

export interface AuthInputProps {
  id: string;
  type?: 'text' | 'email' | 'password';
  placeholder: string;
  value?: string;
  error?: string | null;
  icon?: 'eye' | 'eyeOff' | 'search' | null;
  onChange?: (value: string) => void;
  onIconClick?: () => void;
}

export interface PrimaryButtonProps {
  id: string;
  variant?: 'text' | 'icon';
  text?: string;
  icon?: string; // URL do asset ou nome Lucide
  disabled?: boolean;
  onClick?: () => void;
}

export interface BackButtonProps {
  onClick?: () => void;
}

export interface ToastProps {
  type: 'success' | 'info' | 'error';
  message: string;
  visible: boolean;
  onClose?: () => void;
}

// =============================================================================
// CARDS
// =============================================================================

export interface InventorySlotProps {
  slot: InventorySlot;
  variant: 'occupied' | 'empty' | 'locked';
  lockLevel?: number;
  onClick?: () => void;
}

export interface FriendCardProps {
  friend: Friend;
  variant: 'available' | 'full' | 'ceasefire' | 'noreturn_poop' | 'noreturn_coin' | 'dead' | 'in_boost_game';
  ceasefireTimer?: string; // '07:59'
  onClick?: () => void;
}

export interface PoopCardProps {
  item: CatalogItem;
  displayMode: 'catalog' | 'chest'; // catalog = preço, chest = nome
  onClick?: () => void;
}

export interface BoostPoopCardProps {
  id: string;
  name: string;
  image: string;
  boostColor: string;
  boostIcon: string;
  onClick?: () => void;
}

export interface DiamondPackCardProps {
  pack: DiamondPack;
  onBuyClick?: () => void;
}

export interface UtilityRowProps {
  id: string;
  name: string;
  image: string;
  priceCoins: number;
  priceDiamonds: number;
  onInfoClick?: () => void;
  onBuyClick?: () => void;
}

// =============================================================================
// MODALS
// =============================================================================

export interface PoopDetailProps {
  mode: 'buy' | 'send';
  item: CatalogItem;
  piggyBalance: number;
  diamondBalance: number;
  onBuy?: (currency: 'coins' | 'diamonds', quantity: number) => void;
  onClose?: () => void;
}

export interface PoopSendDetailProps {
  item: CatalogItem;
  selectedMethod?: 'fan' | 'gift' | 'delivery';
  onSelectMethod?: (method: 'fan' | 'gift' | 'delivery') => void;
  onSend?: () => void;
  onClose?: () => void;
}

export interface PoopSendBoostProps {
  poop: BoostPoopItem;
  onSelectMethod?: (method: 'fan' | 'gift' | 'delivery') => void;
  onSend?: () => void;
  onClose?: () => void;
}

export interface SickPoopModalProps {
  poopImage: string;
  daysRemaining: number;
  onClose?: () => void;
}

export interface BurialModalProps {
  poopImage: string;
  senderName: string;
  onBury?: () => void;
  onClose?: () => void;
}

export interface ManageFriendModalProps {
  friend: Friend;
  stats: { handshake: number; streakDays: number; isReciprocal: boolean };
  gameStatus: { ranking: string; onevsone: string; bomba: string };
  onSave?: (nickname: string) => void;
  onDelete?: () => void;
  onToggleNotifications?: (enabled: boolean) => void;
  onClose?: () => void;
}

export interface ChangePasswordModalProps {
  onSubmit?: (currentPassword: string, newPassword: string) => void;
  onClose?: () => void;
}

export interface ChangeEmailModalProps {
  currentEmail: string;
  onSubmit?: (newEmail: string, password: string) => void;
  onClose?: () => void;
}

export interface ReferralModalProps {
  code: string;
  link: string;
  inviterRewards: { type: string; name?: string; quantity: number; image?: string }[];
  inviteeRewards: { type: string; name?: string; quantity: number; image?: string }[];
  disclaimer: string;
  onCopyCode?: () => void;
  onCopyLink?: () => void;
  onClose?: () => void;
}

export interface MedicineQuizModalProps {
  question: string;
  options: { letter: string; text: string; isCorrect: boolean }[];
  onAnswer?: (letter: string) => void;
  onClose?: () => void;
}

export interface CoinRewardModalProps {
  freeAmount: number;
  adAmount: number;
  onCollectFree?: () => void;
  onWatchAd?: () => void;
}

export interface MedicineShopProps {
  healthPercent: number;
  isDead: boolean;
  piggyBalance: number;
  diamondBalance: number;
  medicinePriceCoins: number;
  medicinePriceDiamonds: number;
  onBuy?: (currency: 'coins' | 'diamonds', quantity: number) => void;
  onBack?: () => void;
}

// =============================================================================
// GAME COMPONENTS [V2]
// =============================================================================

export interface GameParkingProps {
  parking: GameParkingState;
  onJoinGame?: (gameId: string) => void;
  onCreateGame?: (type: 'ranking' | '1x1' | 'bomba') => void;
  onBack?: () => void;
}

export interface GameParkingCardProps {
  variant: 'live' | 'bomba' | 'bot' | 'create';
  data: Record<string, unknown>;
  onClick?: () => void;
}

export interface GameArenaProps {
  game: GameActiveState;
  onPoopDrag?: (slotIndex: number) => void;
  onLeave?: () => void;
}

export interface GameBoostZoneProps {
  slots: BoostZoneSlot[];
  maxSlots?: number; // Default: 6
}

export interface GameBoostSlotProps {
  slot: BoostZoneSlot;
}

export interface GamePortalProps {
  position: { x: number; y: number };
  isTarget?: boolean; // Se o jogador está a arrastar algo
}

export interface GameTimerProps {
  seconds: number;
  isWarning?: boolean; // Últimos 10 segundos — cor vermelha
}

export interface GameScorebarProps {
  playerA: { username: string; avatar: string; poopsSent: number; boostValue?: number };
  playerB: { username: string; avatar: string; poopsSent: number; boostValue?: number };
  showBoostCounters?: boolean;
}

export interface GameMatchmakingProps {
  playerA: { username: string; avatar: string };
  playerB: { username: string; avatar: string };
  countdown: number; // 5→0
}

export interface GameResultScreenProps {
  result: GameResult;
  gameType: 'ranking' | '1x1' | 'bomba';
  onLeave?: () => void;
  onRematch?: () => void;
}

export interface GameCreateFormProps {
  gameType: 'ranking' | '1x1' | 'bomba';
  friends: Friend[];
  piggyBalance: number;
  onSubmit?: (config: Record<string, unknown>) => void;
  onClose?: () => void;
}
