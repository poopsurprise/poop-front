// =============================================================================
// Player Types
// =============================================================================

/** Perfil completo do jogador */
export interface Player {
  id: string;
  username: string;
  email: string;
  avatarUrl: string | null;
  healthPercent: number;
  level: number;
  piggyBalance: number;
  diamondBalance: number;
  rankingScore: number;
  country: string | null;
  yearOfBirth: number;
  language: string | null;
  adminLocked: boolean;
  bonusCode: string | null;
  lastActiveAt: string | null;
  createdAt: string;
  activePasses: string[];
}

/** Perfil público visível para outros jogadores */
export interface PlayerPublic {
  id: string;
  username: string;
  avatarUrl: string | null;
  level: number;
  rankingScore: number;
  country: string | null;
}

/** Dados de progressão do jogador */
export interface PlayerProgression {
  level: number;
  poopsSentTotal: number;
  poopsNeededForNextLevel: number;
  slotsUnlocked: number;
  fansUnlocked: number;
  fanRecoveryMinutes: number;
}

// =============================================================================
// Inventory Types
// =============================================================================

/** Tipos de itens que podem ocupar um slot */
export type SlotItemType =
  | 'poop_normal'
  | 'poop_attack'
  | 'poop_soft'
  | 'poop_decorative'
  | 'poop_bomb'
  | 'coin'
  | 'collectible'
  | 'medicine';

/** Estado do item no slot */
export type SlotItemState =
  | 'active'
  | 'collected'
  | 'sick'
  | 'dead'
  | 'expired';

/** Um slot individual do inventário principal (20 slots) */
export interface InventorySlot {
  position: number;
  unlocked: boolean;
  item: InventoryItem | null;
}

/** Item dentro de um slot */
export interface InventoryItem {
  id: string;
  type: SlotItemType;
  name: string;
  image: string;
  state: SlotItemState;
  senderType: 'delivery' | 'fan' | 'paper' | 'backoffice' | 'auto' | 'system';
  senderId: string | null;
  senderAvatar: string | null;
  timerSeconds: number | null;
  coinValue: number | null;
  receivedAt: string;
}

/** Estado completo do inventário de um jogador */
export interface InventoryState {
  slots: InventorySlot[];
  waitingFolder: { items: InventoryItem[]; maxSlots: 16 };
  occupationPercent: number;
}

// =============================================================================
// Item Types
// =============================================================================

/** Categoria de poop no catálogo */
export type PoopCategory = 'normal' | 'attack' | 'soft' | 'decorative' | 'boost' | 'collectible';

/** Item do catálogo (loja/marketplace) */
export interface CatalogItem {
  id: string;
  name: string;
  image: string;
  category: PoopCategory;
  priceCoins: number;
  priceDiamonds: number;
  badge: string | null;
  description: string | null;
  isAttack: boolean;
  attackTimerMinutes: number | null;
  lifeInSends: number | null;
  availableInShop: boolean;
}

/** Poop de Boost (usado em jogos 1x1 BOOST) */
export interface BoostPoopItem {
  id: string;
  name: string;
  image: string;
  priceCoins: number;
  priceDiamonds: number;
  boostColor: string;
  boostIcon: string;
  boostValue: number;
}

/** Item no Cesto do Baú */
export interface ChestItem {
  id: string;
  itemId: string;
  name: string;
  image: string;
  quantity: number;
  acquiredAt: string;
}

/** Caderneta de colecção */
export interface CollectionAlbum {
  id: string;
  name: string;
  totalSlots: number;
  completedSlots: number;
  rewardDiamonds: number;
  isActive: boolean;
  isCompleted: boolean;
  slots: CollectionSlot[];
}

export interface CollectionSlot {
  position: number;
  itemId: string | null;
  itemImage: string | null;
  filled: boolean;
}

// =============================================================================
// Social Types
// =============================================================================

export type FriendshipStatus = 'mutual' | 'pending_sent' | 'pending_received';

export interface Friend {
  id: string;
  friendId: string;
  username: string;
  avatar: string;
  level: number;
  occupationPercent: number;
  notificationsEnabled: boolean;
  isMutual: boolean;
  inBoostGame: boolean;
  isOnline: boolean;
  streakDays: number;
  cardPosition: number;
}

export interface RankingEntry {
  position: number;
  playerId: string;
  username: string;
  avatar: string;
  country: string | null;
  value: number;
}

export type RankingType = 'level' | 'poops_sent' | 'piggy_balance';

// =============================================================================
// Economy Types
// =============================================================================

export type CurrencyType = 'piggy' | 'diamond';

export interface Wallet {
  playerId: string;
  piggyBalance: number;
  diamondBalance: number;
}

// =============================================================================
// Game Types
// =============================================================================

export type GameType = 'ranking' | '1x1' | '1x1_boost' | 'bomba';
export type GameStatus = 'pending' | 'matchmaking' | 'active' | 'completed' | 'cancelled';
export type GamePlayerStatus = 'invited' | 'accepted' | 'playing' | 'eliminated' | 'finished';
export type TicketSplit = 'each_pays' | 'creator_pays' | 'split';
export type BoostReceiver = 'player_a' | 'player_b' | 'both';

export interface GameConfig {
  type: GameType;
  durationSeconds: number;
  ticketAmount: number;
  ticketSplit?: TicketSplit;
  poopMode?: 'auto' | 'boost';
  boostReceiver?: BoostReceiver;
  portalLevel?: number;
  name?: string;
}

export interface ParkingLiveEntry {
  id: string;
  type: '1x1' | '1x1_boost';
  opponent: { id: string; username: string; avatar: string };
  ticket: number;
  status: 'playing' | 'invited';
  timer: number;
}

export interface ParkingBombaEntry {
  id: string;
  name: string;
  creator: { id: string; username: string; avatar: string };
  ticket: number;
  players: number;
  timer: number;
}

export interface ParkingBot {
  id: string;
  avatar: string;
  ticket: number;
}

export interface GameParkingState {
  live: ParkingLiveEntry[];
  bomba: ParkingBombaEntry[];
  bots: ParkingBot[];
}

export interface ArenaPoopSlot {
  slot: number;
  type: 'poop_soft' | 'poop_bomb';
  image: string;
  timerSeconds?: number;
}

export interface BoostZoneSlot {
  id: string;
  poopImage: string;
  poopColor: string;
  messageText: string;
  senderName: string;
}

export interface GameActiveState {
  gameId: string;
  type: GameType;
  isBoost: boolean;
  timer: number;
  portalPosition: number;
  portalDirection: 'a_to_b' | 'b_to_a';
  playerA: { id: string; username: string; avatar: string; poopsSent: number; boostValue?: number };
  playerB: { id: string; username: string; avatar: string; poopsSent: number; boostValue?: number };
  inventory: ArenaPoopSlot[];
  boostZone?: BoostZoneSlot[];
}

export interface GameResult {
  gameId: string;
  type: GameType;
  winnerId: string | null;
  isDraw: boolean;
  players: {
    id: string;
    username: string;
    avatar: string;
    poopsSent: number;
    coinsEarned: number;
    rankingEarned: number;
  }[];
}

// =============================================================================
// Diamond Pack (for purchase)
// =============================================================================

export interface DiamondPack {
  id: string;
  diamonds: number;
  originalPrice: number;
  discountPrice: number;
  currency: string; // '€'
  promoText: string | null; // 'Special Offer!'
}

// =============================================================================
// Item Domain Types
// =============================================================================

export type AdminItemKind = 'SINGLE' | 'GROUP';

export type AdminItemCategory =
  | 'SOFT_POOP'
  | 'ATTACK_POOP'
  | 'COLLECTIBLE_POOP'
  | 'COLLECTION_BOOK'
  | 'GIFT'
  | 'COIN'
  | 'TOILET_PAPER'
  | 'BOOST'
  | 'VIP'
  | 'BOSS';

export type AdminItemSubcategory =
  | 'SOFT'
  | 'SOUND_ATTACK'
  | 'INSPECTOR_ATTACK'
  | 'THIEF_ATTACK'
  | 'COLLECTION'
  | 'COLLECTION_BOOK'
  | 'GIFT'
  | 'COIN'
  | 'TOILET_PAPER'
  | 'BOOST'
  | 'CUSTOM';

export type ItemVisibilityChannel = 'SHOP' | 'POOP_SHOWCASE';

export type ItemQuantityMode = 'LIMITED' | 'UNLIMITED';

export type CollectionDistributionMode =
  | 'LEVEL_UP_EXTRA_INVENTORY'
  | 'RANDOM_FREE_INVENTORY';

export type CollectionDistributionPriority = 'OLDER_USERS' | 'MOST_TIME_IN_APP';

export type CollectionRewardType = 'DIAMONDS' | 'CODE';

export interface ItemCategoryMeta {
  id: AdminItemCategory;
  label: string;
  description: string;
  defaultSubcategory?: AdminItemSubcategory;
  supportsGrouping: boolean;
  supportsCollectionBinding: boolean;
  supportsTimerMinutes: boolean;
  supportsLifeInSends: boolean;
  supportsCountryTargeting: boolean;
}

export interface ItemSubcategoryMeta {
  id: AdminItemSubcategory;
  label: string;
  description: string;
  iconRequired: boolean;
  timerSupported: boolean;
  lifeInSendsSupported: boolean;
}

export interface OracleReferenceRates {
  euroToDiamonds: number;
  diamondToCoins: number;
  euroToCoins: number;
}

export interface OracleDisplayPrice {
  eur: number;
  diamonds: number;
  coins: number;
}
