// =============================================================================
// tRPC Client — PWA
// =============================================================================
// Configura o tRPC client para ligar ao backend em produção.
// Usa httpBatchLink + superjson (match com o backend) + auth header automático.
//
// IMPORTANTE: O AppRouter type é importado directamente do backend package.
// Isto funciona porque o monorepo partilha tipos via workspace.

import { createTRPCReact, httpBatchLink } from '@trpc/react-query';
import superjson from 'superjson';
import { supabase } from './supabase';

// Type-only import do AppRouter — não arrasta runtime do backend
import type { AppRouter } from '@backend/trpc/router';

// tRPC React hooks (useQuery, useMutation, etc.)
export const trpc = createTRPCReact<AppRouter>();

// API base URL
// Em dev: usamos URL relativo '/trpc' → o Vite proxy faz forward para o backend.
// Em prod (build): usamos VITE_API_URL absoluto.
const API_URL = import.meta.env.DEV
  ? ''  // relativo — Vite proxy
  : (import.meta.env.VITE_API_URL ?? '');

/**
 * Cria o tRPC client com auth header automático.
 * O token Supabase é injectado em cada request via Authorization header.
 */
export function createTRPCClient() {
  return trpc.createClient({
    links: [
      httpBatchLink({
        url: `${API_URL}/trpc`,
        transformer: superjson,
        async headers() {
          // Obtém a session activa do Supabase (cached, não faz network call)
          const { data } = await supabase.auth.getSession();
          const token = data.session?.access_token;
          return token
            ? { Authorization: `Bearer ${token}` }
            : {};
        },
      }),
    ],
  });
}
