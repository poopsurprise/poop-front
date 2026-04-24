/**
 * Mapa centralizado de assets.
 * Todos os componentes devem importar os paths daqui.
 * Quando um asset novo for adicionado, actualizar apenas este ficheiro.
 *
 * Nomenclatura segue ESPECIFICACAO_TELAS_JOGO.md §2.6 — kebab-case.
 */
export const ASSETS = {
  // === LOGO ===
  logo: '/assets/img/logo-full.png',
  logoFull: '/assets/img/logo-horizontal.png',        // Logo horizontal completo "Poop Surprise"

  // === TOOLBAR / LAYOUT ===
  healthBody1: '/assets/img/health-figure-green.png',  // Saúde > 70%
  healthBody2: '/assets/img/health-figure-yellow.png', // Saúde 30-70%
  healthBody3: '/assets/img/health-figure-red.png',    // Saúde < 30%
  skeleton: '/assets/img/skeleton.png',                // Morto (0%)
  swords: '/assets/img/swords-icon.png',               // Espadas cruzadas (jogos)
  friends: '/assets/img/friends-group.png',             // Grupo de amigos
  shop: '/assets/img/shop-icon.png',                   // Loja

  // === ACTION BAR ===
  piggyBank: '/assets/img/piggy-bank.png',
  toiletPaper: '/assets/img/toilet-paper.png',
  deliveryScooter: '/assets/img/delivery-scooter.png',
  fan: '/assets/img/fan.png',

  // === BOTTOM BAR ===
  chest: '/assets/img/chest-icon.png',                 // Baú do tesouro
  box: '/assets/img/box-locked.png',                   // Caixa ocupação/nível
  smileVector: '/assets/img/avatar-fallback.png',      // Silhouette guy fallback
  faintSmile: '/assets/img/smile-watermark.png',       // Center watermark
  systemFan: '/assets/img/system-fan.png',             // O ventilador preto circular correcto

  // === ITEMS / ICONS ===
  coinGold: '/assets/img/coin-gold.png',               // Moeda gold
  coinHole: '/assets/img/coin-hole.png',               // Moeda furada
  diamond: '/assets/img/diamond.png',                  // Diamante
  bomb: '/assets/img/bomb-icon.png',                   // Bomba
  gift: '/assets/img/gift-box.png',                    // Presente
  bell: '/assets/img/bell-icon.png',                   // Sino notificações
  book: '/assets/img/book-purple.png',                 // Livro roxo (caderneta)
  backButton: '/assets/img/back-arrow-orange.png',     // Botão voltar laranja
  cashRegister: '/assets/img/cash-register.png',       // Caixa registadora (compra)
  basketGreen: '/assets/img/basket-green.png',         // Cesto verde
  infoIcon: '/assets/img/info-icon.png',               // Ícone info (i)
  send: '/assets/img/send.png',                        // Ícone enviar
  add: '/assets/img/Add.png',                          // Ícone adicionar
  deleteIcon: '/assets/img/Delete.png',                // Ícone remover
  search: '/assets/img/Search.png',                    // Ícone procurar
  prohibited: '/assets/img/Prohibited.png',            // Ícone proibido
  flies: '/assets/img/flies.png',                      // Moscas (inventário cheio)
  lockIcon: '/assets/img/lock-icon.png',               // Cadeado segurança
  affiliates: '/assets/img/affiliates-icon.png',       // Afiliados

  // === GAME ===
  trophy: '/assets/img/trophy-mascot.png',             // Troféu mascote
  madPoop: '/assets/img/mad-poop.png',                 // Poop zangado (bomba)
  gameRanking: '/assets/img/game-ranking-icon.png',    // Ranking shield
  game1v1: '/assets/img/swords-icon.png',              // 1v1 espadas
  gameBomba: '/assets/img/bomb-icon.png',              // Bomba game
  doctorMascot: '/assets/img/doctor-mascot.png',       // Doutor quiz

  // === SECURITY ===
  passwordLock: '/assets/img/lock-icon.png',

  // === UTILITIES (Loja) ===
  medicine: '/assets/img/medicine-cross.png',
  vip: '/assets/img/vip-pass.png',
  bossCard: '/assets/img/boss-card.png',

  // === DECORATIVE ===
  tombstone: '/assets/img/tombstone.png',
  scooterBottom: '/assets/img/scooter-bottom.png',     // Scooter decorativo (login/registo)
  nivel: '/assets/img/nivel-gold.png',
  poopLevel: '/assets/img/poop-level-large.png',

  // === POOP CATALOG (sample) ===
  poop3: '/assets/img/poop3 6.png',
  poop4: '/assets/img/poop4 1.png',
  poop5: '/assets/img/poop5 1.png',
  poop6: '/assets/img/poop6 1.png',
  poop7: '/assets/img/poop7 1.png',
  poop8: '/assets/img/poop8 1.png',
  poop9: '/assets/img/poop9 1.png',
  poop10: '/assets/img/poop10 1.png',
  poop11: '/assets/img/poop11 1.png',
  poop12: '/assets/img/poop12 1.png',
  poop14: '/assets/img/poop14 1.png',
  poop15: '/assets/img/poop15 1.png',
  poop16: '/assets/img/poop16 1.png',
  poop17: '/assets/img/poop17 1.png',
  poop18: '/assets/img/poop18 1.png',
  poop19: '/assets/img/poop19 1.png',
  poop20: '/assets/img/poop20 1.png',
  poop21: '/assets/img/poop21 1.png',
  poop22: '/assets/img/poop22 1.png',
  poop24: '/assets/img/poop24 1.png',
  poop25: '/assets/img/poop25 1.png',
  poop26: '/assets/img/poop26 1.png',
  poop27: '/assets/img/poop27 1.png',
  poop28: '/assets/img/poop28 1.png',
  poop29: '/assets/img/poop29 1.png',
  poop30: '/assets/img/poop30 1.png',
  poop31: '/assets/img/poop31 1.png',
  poop32: '/assets/img/poop32 1.png',
  poop33: '/assets/img/poop33 1.png',
  poop34: '/assets/img/poop34 1.png',

  // === AUTH ===
  googleG: '/assets/img/google-g.svg',                  // Google G logo (auth)
  avatarPlaceholder: '/assets/img/avatar-placeholder.png', // Smiley face placeholder (registo)

  // === DEFAULT / FALLBACK ===
  defaultAvatar: '/assets/img/avatar.png',
  slotBackground: '/assets/img/slot-background.png',   // Fundo slot (cinza arredondado)
} as const;
