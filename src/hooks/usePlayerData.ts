// =============================================================================
// usePlayerData — Hook reutilizável para dados do player
// =============================================================================
// Extrai os dados do user via trpc.auth.me e formata para os componentes.
// Evita duplicar o mapping playerData em todas as páginas.

import { trpc } from '../lib/trpc';

export function usePlayerData() {
  const meQuery = trpc.auth.me.useQuery(undefined, { staleTime: 60_000 });
  const user = meQuery.data;

  const playerData = {
    id: user?.id ?? '',
    username: user?.username ?? '...',
    email: user?.email ?? '',
    avatarUrl: user?.avatarUrl ?? '/assets/img/avatar-fallback.png',
    healthPercent: user?.healthPercent ?? 100,
    level: user?.level ?? 1,
    piggyBalance: user?.piggyBalance ?? 0,
    diamondBalance: Number(user?.diamondBalance ?? 0),
    rankingScore: Number(user?.rankingScore ?? 0),
    country: user?.country ?? null,
    yearOfBirth: 2000,
    bonusCode: null,
    lastActiveAt: null,
    createdAt: user?.createdAt ? String(user.createdAt) : new Date().toISOString(),
  };

  return {
    playerData,
    user,
    isLoading: meQuery.isLoading,
    isError: meQuery.isError,
  };
}
