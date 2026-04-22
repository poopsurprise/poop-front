/**
 * Mapa centralizado de assets.
 * Todos os componentes devem importar os paths daqui.
 * Quando um asset novo for adicionado, actualizar apenas este ficheiro.
 */
export const ASSETS = {
  // === LOGO ===
  logo: '/assets/img/LOGO_POOP_SURPRISE.png',
  logoFull: '/assets/img/Group 14.png',           // Logo horizontal completo "Poop Surprise"

  // === TOOLBAR / LAYOUT ===
  healthBody1: '/assets/img/human body-1.png',     // Saúde > 70%
  healthBody2: '/assets/img/human body-2.png',     // Saúde 30-70%
  healthBody3: '/assets/img/human body-3.png',     // Saúde < 30%
  skeleton: '/assets/img/esqueleto 2.png',         // Morto (0%)
  swords: '/assets/img/image 145.png',             // Espadas cruzadas (jogos)
  friends: '/assets/img/image 4.png',              // Grupo de amigos
  shop: '/assets/img/store.png',                // Caixa registadora (loja)
  
  // === ACTION BAR ===
  piggyBank: '/assets/img/porquinho 1.png',
  toiletPaper: '/assets/img/papel sem fundo2 1.png',
  deliveryScooter: '/assets/img/delivery 1.png',
  fan: '/assets/img/ventildor 1.png',
  
  // === BOTTOM BAR ===
  chest: '/assets/img/image 90.png',               // Baú do tesouro
  box: '/assets/img/image 47.png',                   // Caixa ocupação/nível
  smileVector: '/assets/img/Vector.png',           // Icone grid original (se precisar)
  faintSmile: '/assets/img/Slightly Smilling.png', // Smile para o centro do empty slot
  systemFan: '/assets/img/Vector-1.png',           // O pequeno icone preto em forma de ventoinha para o slot
  
  // === ITEMS / ICONS ===
  coinGold: '/assets/img/1 2.png',                 // Moeda gold
  coinHole: '/assets/img/moeda furada.png',        // Moeda furada
  diamond: '/assets/img/diamante.png',             // Diamante (placeholder círculo azul)
  bomb: '/assets/img/image 179.png',               // Bomba
  gift: '/assets/img/image 97.png',                // Presente
  bell: '/assets/img/image 46.png',                // Sino notificações
  book: '/assets/img/image 98.png',                // Livro roxo (caderneta)
  backButton: '/assets/img/image 48.png',          // Botão voltar laranja
  infoIcon: '/assets/img/image 54.png',            // Ícone info (i)
  send: '/assets/img/send.png',                    // Ícone enviar
  add: '/assets/img/Add.png',                      // Ícone adicionar
  deleteIcon: '/assets/img/Delete.png',            // Ícone remover
  search: '/assets/img/Search.png',                // Ícone procurar
  prohibited: '/assets/img/Prohibited.png',        // Ícone proibido
  box: '/assets/img/image 47.png',                 // Caixa (package)
  flies: '/assets/img/Group 5.png',                // Moscas (inventário cheio)
  lockIcon: '/assets/img/image 134.png',           // Cadeado segurança
  affiliates: '/assets/img/image 135.png',         // Afiliados
  
  // === GAME ===
  trophy: '/assets/img/image 124.png',             // Troféu mascote
  madPoop: '/assets/img/image 177.png',            // Poop zangado (bomba)
  
  // === UTILITIES (Loja) ===
  medicine: '/assets/img/medical-icon_i-cardiology.png',
  vip: '/assets/img/vip 1.png',
  bossCard: '/assets/img/image 112.png',
  
  // === DECORATIVE ===
  tombstone: '/assets/img/campa 1.png',
  nivel: '/assets/img/nivel gold 1.png',
  poopLevel: '/assets/img/poop level large 1.png',
  
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
  
  // === DEFAULT / FALLBACK ===
  defaultAvatar: '/assets/img/image 12.png',
  slotBackground: '/assets/img/Rectangle 84.png',  // Fundo slot (cinza arredondado)
} as const;
