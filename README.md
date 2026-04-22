# Poop Surprise — Frontend Components

> **Para o Dev**: Este repositório contém tudo o que precisas para criar os componentes visuais do jogo.
> **NÃO** precisas de te preocupar com lógica, API, estado, ou WebSocket — isso será integrado depois.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

## 📁 Estrutura

```
src/
├── components/          ← CRIA OS COMPONENTES AQUI
│   ├── layout/          ← TopToolbar, ActionBar, BottomBar, BannerSlot
│   ├── cards/           ← InventorySlot, FriendCard, PoopCard, etc.
│   ├── modals/          ← PoopDetail, PoopSendDetail, BurialModal, etc.
│   ├── game/            ← GameArena, GameBoostZone, etc.
│   └── ui/              ← AuthInput, PrimaryButton, BackButton, etc.
├── types/               ← Interfaces TypeScript (NÃO EDITAR)
├── mocks/               ← Dados fictícios para testes (NÃO EDITAR)
├── pages/               ← Páginas de preview para testar componentes
└── assets/              ← Imagens e ícones (serão adicionados)

docs/
├── GUIA_DEV.md          ← LEIA ISTO PRIMEIRO
└── mockups/             ← Mockups visuais de referência
```

## 📋 Regras

1. **Não inventes cores** — usa as cores dos mockups em `docs/mockups/`
2. **Usa IDs únicos** em todos os elementos interactivos (formato: `{contexto}-{tipo}-{id}`)
3. **Importa mock data** de `src/mocks/` — nunca hardcodes
4. **Importa tipos** de `src/types/` — nunca cries interfaces novas
5. **Um componente = um ficheiro** — nomes em PascalCase (ex: `TopToolbar.tsx`)
6. **Deixa props vazias** para lógica futura (callbacks como `onSend`, `onDragEnd`)

## 🛠 Tecnologias

- **React 19** + **TypeScript**
- **Vite** (dev server)
- **Tailwind CSS v4**
- **Lucide React** (ícones de sistema)
- **Inter** (fonte — via Google Fonts)
