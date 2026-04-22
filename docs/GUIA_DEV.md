# 📖 Guia do Developer — Poop Surprise Frontend

> **Lê este documento ANTES de começares a trabalhar.**

---

## 1. O Que É Esperado de Ti

Tu vais construir **componentes React** que definem a estrutura visual:
- Layouts, espaços, imagens, textos, botões, inputs
- Mock data estáticos (importas de `src/mocks/`)
- Tipos/interfaces (importas de `src/types/`)

**O que NÃO fazes:**
- WebSocket / Realtime
- Estado global (Zustand)
- Drag-and-drop (DnD Kit)
- Chamadas à API
- Validações / lógica de negócio
- Timers / contadores

Isso será integrado depois por mim (AI).

---

## 2. Stack

| Tecnologia | Uso |
|-----------|-----|
| **React 19** | Framework UI |
| **TypeScript** | Tipagem forte — usa as interfaces de `src/types/` |
| **Vite** | Dev server |
| **Tailwind CSS v4** | Estilização — classes utilitárias |
| **Lucide React** | Ícones de sistema (Search, X, CheckCircle, Camera, Bell, Eye/EyeOff, etc.) |
| **Inter** | Fonte principal (Google Fonts) |

---

## 3. Convenções

### Nomenclatura

| Tipo | Convenção | Exemplo |
|------|-----------|---------| 
| Componente | PascalCase | `TopToolbar.tsx` |
| Props type | `{Componente}Props` | `TopToolbarProps` |
| CSS class | kebab-case | `toolbar-container` |
| ID HTML | `{contexto}-{tipo}-{id}` | `inventory-slot-0` |
| Mock data | camelCase, prefixo `mock` | `mockPlayer` |
| Event handler | `on` + Verbo | `onDragEnd`, `onSend` |

### IDs Obrigatórios

**Todo elemento interactivo** (botão, input, slot, card clicável) DEVE ter um `id` único.

Exemplos:
- `id="inventory-slot-0"` a `id="inventory-slot-19"`
- `id="btn-login-submit"`
- `id="input-login-email"`
- `id="toolbar-avatar"`

### Estrutura de Componente

```tsx
// components/layout/TopToolbar.tsx
import type { TopToolbarProps } from '../../types/components';
import { mockPlayer } from '../../mocks/mockData';

export function TopToolbar({ 
  player = mockPlayer,
  onAvatarClick,
  onFriendsClick,
  onShopClick,
  onGamesClick,
}: TopToolbarProps) {
  return (
    <div id="top-toolbar" className="...">
      {/* Layout aqui */}
    </div>
  );
}
```

---

## 4. Regras Visuais Globais

### Tipografia

| Uso | Tamanho | Peso |
|-----|---------|------|
| Títulos de tela/modal | ~24px | Bold (700) |
| Valores grandes (% vida, saldo 💎) | ~32-48px | Bold |
| Texto normal | ~14px | Normal (400) |
| Subtítulos, preços, labels | ~12px | Normal/Medium |
| Botões com texto | ~16px | Bold, branco |

**Fonte**: Inter. Fallback: `system-ui, sans-serif`.

### Dimensões Fixas

| Elemento | Dimensão |
|----------|----------|
| Largura máxima (desktop) | 420px centrado |
| Mobile | 100% largura |
| Toolbar superior | 72px altura |
| Action bar | 90px altura |
| Barra inferior | 56px altura |
| Slot mínimo | 80×80px |
| Botão principal | H=56px, cantos 16px |
| Avatar toolbar | 48×48px circular |
| Touch target mínimo | 44×44px |

### Layout

As telas do jogo preenchem **100% da viewport** (100dvh). Toolbar superior e barra inferior **nunca ficam escondidas**. A zona de conteúdo central adapta-se (`flex-grow: 1`).

### Inputs — Espaço de Erro

Cada input tem um **espaço reservado** de `min-height: 20px` **sempre presente** abaixo dele. Quando não há erro, o espaço fica invisível. Quando há erro, o texto aparece sem o layout se mover.

---

## 5. Prioridade de Implementação Sugerida

1. **Componentes base**: `TopToolbar`, `ActionBar`, `BottomBar`, `SaldoBar`, `AuthInput`, `PrimaryButton`, `BackButton`
2. **Auth**: Login, Registo, Completar Perfil
3. **Inventário**: `InventorySlot` (3 variações), grelha 4×5, `BottomBar`
4. **Loja**: `DiamondPackCard`, `PoopCard`, `UtilityRow`, carrossel
5. **Delivery**: `FriendCard` (7 variações), card envio
6. **Modais**: `PoopDetail`, `PoopSendDetail`, `SickPoopModal`, `BurialModal`
7. **Jogos [V2]**: `GameArena`, `GameBoostZone`, etc.

---

## 6. Onde Ver os Mockups

Os mockups visuais de referência estão em `docs/mockups/`. Consulta-os para:
- Cores exactas
- Proporções e espaçamentos
- Posição dos elementos
- Estados visuais (hover, activo, desactivado, etc.)

---

## 7. Perguntas?

Se tiveres dúvidas sobre qualquer componente, consulta o ficheiro de especificação ou pergunta ao Pedro.
