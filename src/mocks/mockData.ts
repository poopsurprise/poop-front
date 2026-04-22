// =============================================================================
// Mock Data — Dados fictícios para desenvolvimento
// =============================================================================
// Usa estes dados nos componentes. Serão substituídos por dados reais depois.

import type {
  Player,
  Friend,
  CatalogItem,
  BoostPoopItem,
  InventorySlot,
  GameParkingState,
  GameActiveState,
  DiamondPack,
} from '../types';

// ---------------------------------------------------------------------------
// Player
// ---------------------------------------------------------------------------

export const mockPlayer: Player = {
  id: 'usr_001',
  username: 'ritinha',
  email: 'ritinha@example.com',
  avatarUrl: '/assets/img/image 12.png',
  healthPercent: 87,
  level: 7,
  piggyBalance: 250000,
  diamondBalance: 10.0,
  rankingScore: 1250,
  country: 'PT',
  yearOfBirth: 1995,
  bonusCode: null,
  lastActiveAt: new Date().toISOString(),
  createdAt: '2026-01-15T10:00:00Z',
};

export const mockPlayerDead: Player = {
  ...mockPlayer,
  healthPercent: 0,
};

// ---------------------------------------------------------------------------
// Friends
// ---------------------------------------------------------------------------

export const mockFriends: Friend[] = [
  {
    id: 'fr_001', friendId: 'usr_002', username: 'Mery Domingos', avatar: '/assets/img/Slightly Smilling.png',
    level: 12, occupationPercent: 20, notificationsEnabled: true, isMutual: true,
    inBoostGame: false, isOnline: true, streakDays: 5, cardPosition: 1,
  },
  {
    id: 'fr_002', friendId: 'usr_003', username: 'João Silva', avatar: '/assets/img/Slightly Smilling.png',
    level: 8, occupationPercent: 65, notificationsEnabled: false, isMutual: true,
    inBoostGame: true, isOnline: true, streakDays: 0, cardPosition: 2,
  },
  {
    id: 'fr_003', friendId: 'usr_004', username: 'Ana Costa', avatar: '/assets/img/Slightly Smilling.png',
    level: 15, occupationPercent: 10, notificationsEnabled: true, isMutual: false,
    inBoostGame: false, isOnline: false, streakDays: 12, cardPosition: 3,
  },
  {
    id: 'fr_004', friendId: 'usr_005', username: 'Carlos Mendes', avatar: '/assets/img/Slightly Smilling.png',
    level: 5, occupationPercent: 100, notificationsEnabled: true, isMutual: true,
    inBoostGame: false, isOnline: false, streakDays: 30, cardPosition: 4,
  },
  {
    id: 'fr_005', friendId: 'usr_006', username: 'Sofia Lima', avatar: '/assets/img/Slightly Smilling.png',
    level: 20, occupationPercent: 45, notificationsEnabled: true, isMutual: true,
    inBoostGame: false, isOnline: true, streakDays: 0, cardPosition: 5,
  },
];

// ---------------------------------------------------------------------------
// Catalog Items (Loja)
// ---------------------------------------------------------------------------

export const mockCatalogPoops: CatalogItem[] = [
  {
    id: 'poop_001', name: 'Smill', image: '/assets/img/poop3 6.png', category: 'attack',
    priceCoins: 50, priceDiamonds: 0.02, badge: 'sound', description: 'Poop com som irritante',
    isAttack: true, attackTimerMinutes: 10, lifeInSends: null, availableInShop: true,
  },
  {
    id: 'poop_002', name: 'Nome', image: '/assets/img/poop4 1.png', category: 'soft',
    priceCoins: 100, priceDiamonds: 0.02, badge: null, description: 'Poop suave',
    isAttack: false, attackTimerMinutes: null, lifeInSends: null, availableInShop: true,
  },
  {
    id: 'poop_003', name: 'Ladrão', image: '/assets/img/poop5 1.png', category: 'attack',
    priceCoins: 5000000, priceDiamonds: 0.02, badge: 'thief', description: 'Rouba 20% do saldo a cada hora',
    isAttack: true, attackTimerMinutes: 10, lifeInSends: 5, availableInShop: true,
  },
  {
    id: 'poop_004', name: 'Inspector', image: '/assets/img/poop6 1.png', category: 'attack',
    priceCoins: 500000, priceDiamonds: 0.01, badge: 'spy', description: 'Revela o saldo do alvo após 2 minutos',
    isAttack: true, attackTimerMinutes: 2, lifeInSends: null, availableInShop: true,
  },
];

// ---------------------------------------------------------------------------
// Boost Poops
// ---------------------------------------------------------------------------

export const mockBoostPoops: BoostPoopItem[] = [
  { id: 'bp_001', name: 'Boost Verde', image: '/assets/poops/boost-green.png', priceCoins: 500, priceDiamonds: 0.05, boostColor: '#4CAF50', boostIcon: '/assets/icons/boost-leaf.png', boostValue: 50 },
  { id: 'bp_002', name: 'Boost Dourado', image: '/assets/poops/boost-gold.png', priceCoins: 2000, priceDiamonds: 0.2, boostColor: '#FFD700', boostIcon: '/assets/icons/boost-star.png', boostValue: 200 },
  { id: 'bp_003', name: 'Boost Rubi', image: '/assets/poops/boost-ruby.png', priceCoins: 5000, priceDiamonds: 0.5, boostColor: '#E91E63', boostIcon: '/assets/icons/boost-gem.png', boostValue: 500 },
];

// ---------------------------------------------------------------------------
// Inventory (20 slots)
// ---------------------------------------------------------------------------

const SLOT_POOPS = [
  '/assets/img/poop7 1.png',
  '/assets/img/poop8 1.png',
  '/assets/img/poop9 1.png',
  '/assets/img/1 2.png', // Coin
];

export const mockInventorySlots: InventorySlot[] = Array.from({ length: 20 }, (_, i) => ({
  position: i + 1,
  unlocked: i < 7,
  item:
    i < 4
      ? {
          id: `item_${i + 1}`,
          type: i === 3 ? ('coin' as const) : ('poop_soft' as const),
          name: i === 3 ? 'Moeda' : `Poop ${i + 1}`,
          image: SLOT_POOPS[i],
          state: 'active' as const,
          senderType: 'fan' as const,
          senderId: `usr_00${i + 2}`,
          senderAvatar: '/assets/img/Slightly Smilling.png',
          timerSeconds: i === 3 ? 7200 : null,
          coinValue: i === 3 ? 1000 : null,
          receivedAt: new Date().toISOString(),
        }
      : null,
}));

// ---------------------------------------------------------------------------
// Diamond Packs (compra com €)
// ---------------------------------------------------------------------------

export const mockDiamondPacks: DiamondPack[] = [
  { id: 'dp_001', diamonds: 100, originalPrice: 10.00, discountPrice: 9.70, currency: '€', promoText: 'Special Offer!' },
  { id: 'dp_002', diamonds: 500, originalPrice: 40.00, discountPrice: 38.50, currency: '€', promoText: 'Special Offer!' },
  { id: 'dp_003', diamonds: 1000, originalPrice: 70.00, discountPrice: 67.00, currency: '€', promoText: 'Special Offer!' },
  { id: 'dp_004', diamonds: 2500, originalPrice: 150.00, discountPrice: 140.00, currency: '€', promoText: 'Best Value!' },
  { id: 'dp_005', diamonds: 5000, originalPrice: 250.00, discountPrice: 225.00, currency: '€', promoText: 'Best Value!' },
];

// ---------------------------------------------------------------------------
// Game Parking
// ---------------------------------------------------------------------------

export const mockGameParking: GameParkingState = {
  live: [
    { id: 'g_001', type: '1x1', opponent: { id: 'usr_003', username: 'João Silva', avatar: '/assets/avatars/friend2.png' }, ticket: 5000, status: 'playing', timer: 30 },
    { id: 'g_002', type: '1x1_boost', opponent: { id: 'usr_004', username: 'Ana Costa', avatar: '/assets/avatars/friend3.png' }, ticket: 5000, status: 'invited', timer: 15 },
  ],
  bomba: [
    { id: 'g_003', name: 'Torneio Amigos', creator: { id: 'usr_002', username: 'Mery', avatar: '/assets/avatars/friend1.png' }, ticket: 1000, players: 4, timer: 12 },
  ],
  bots: [
    { id: 'bot_001', avatar: '/assets/avatars/bot1.png', ticket: 1000 },
    { id: 'bot_002', avatar: '/assets/avatars/bot2.png', ticket: 5000 },
    { id: 'bot_003', avatar: '/assets/avatars/bot3.png', ticket: 10000 },
  ],
};

// ---------------------------------------------------------------------------
// Active Game
// ---------------------------------------------------------------------------

export const mockGameActive1x1: GameActiveState = {
  gameId: 'g_active_001', type: '1x1', isBoost: false, timer: 45,
  portalPosition: 3, portalDirection: 'a_to_b',
  playerA: { id: 'usr_001', username: 'Eu', avatar: '/assets/avatars/default.png', poopsSent: 35 },
  playerB: { id: 'usr_003', username: 'João Silva', avatar: '/assets/avatars/friend2.png', poopsSent: 32 },
  inventory: [
    { slot: 1, type: 'poop_soft', image: '/assets/poops/soft1.png' },
    { slot: 2, type: 'poop_soft', image: '/assets/poops/soft2.png' },
    { slot: 3, type: 'poop_bomb', image: '/assets/poops/bomb.png', timerSeconds: 3 },
  ],
};

// ---------------------------------------------------------------------------
// Utilities (Loja)
// ---------------------------------------------------------------------------

export const mockUtilities = [
  { id: 'util_paper', name: 'Papel Higiénico', image: '/assets/img/papel sem fundo2 1.png', priceCoins: 5000, priceDiamonds: 0.001 },
  { id: 'util_medicine', name: 'Medicamento', image: '/assets/img/medical-icon_i-cardiology.png', priceCoins: 5000, priceDiamonds: 0.001 },
  { id: 'util_fan', name: 'Ventilador', image: '/assets/img/ventildor 1.png', priceCoins: 5000000, priceDiamonds: 0.10 },
  { id: 'util_vip', name: 'VIP Pass', image: '/assets/img/vip 1.png', priceCoins: 500000000, priceDiamonds: 2.99 },
  { id: 'util_boss', name: 'Boss Card', image: '/assets/img/image 112.png', priceCoins: 350000000, priceDiamonds: 1.99 },
];

// ---------------------------------------------------------------------------
// Notifications toggles
// ---------------------------------------------------------------------------

export const mockNotifications = {
  masterToggle: true,
  inventoryFull: true, inventoryFull24h: true,
  health70: true, health3: true, health2: true, health1: true, poopDead: true,
  poopPurchaseReceived: true, poopFriendReceived: true, coinReceived: true,
  collectibleReceived: true, giftReceived: true,
  proChallengeReceived: true, proChallengeLost: true, proChallengeWon: true,
  bonusCodeUsed: true, diamondsReceived: true, collectionComplete: true, inspectorReveal: true,
  gameInvite: true, gameStarting: true, gameResult: true, boostReceived: true,
};

// ---------------------------------------------------------------------------
// Referral
// ---------------------------------------------------------------------------

export const mockReferral = {
  code: 'BlackBoy',
  link: 'https://www.poopsurprise.lol/ref/BlackBoy',
  inviterRewards: [
    { type: 'poop', name: 'Ladrão', quantity: 2, image: '/assets/poops/ladrao.png' },
    { type: 'coins', quantity: 2500 },
  ],
  inviteeRewards: [
    { type: 'utility', name: 'Ventilador', quantity: 1, image: '/assets/items/fan.png' },
    { type: 'coins', quantity: 500 },
  ],
  disclaimer: '*Seu amigo deve permanecer vivo e entrar no jogo 20 dias diferentes para receber o seu bonus',
};

// ---------------------------------------------------------------------------
// Medicine Quiz
// ---------------------------------------------------------------------------

export const mockMedicineQuiz = {
  question: 'Qual o efeito secundário mais comum do medicamento X?',
  options: [
    { letter: 'A', text: 'Dor de cabeça', isCorrect: true },
    { letter: 'B', text: 'Febre alta', isCorrect: false },
    { letter: 'C', text: 'Sonolência', isCorrect: false },
    { letter: 'D', text: 'Alergias cutâneas', isCorrect: false },
  ],
};
