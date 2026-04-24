// =============================================================================
// TRPCProvider — React Query + tRPC wrapper
// =============================================================================
// Envolve a app com os providers necessários para tRPC funcionar:
// - QueryClientProvider (React Query)
// - trpc.Provider (tRPC)
//
// Uso no main.tsx:
//   <TRPCProvider>
//     <App />
//   </TRPCProvider>

import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { trpc, createTRPCClient } from '@/lib/trpc';

interface TRPCProviderProps {
  children: ReactNode;
}

export function TRPCProvider({ children }: TRPCProviderProps) {
  // Lazy init: cria uma vez e reutiliza entre re-renders
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Stale time: 30s — dados ficam "frescos" durante 30s
            staleTime: 30_000,
            // Retry: 1 tentativa em caso de erro
            retry: 1,
            // Não refetch ao focar a janela (mobile-friendly)
            refetchOnWindowFocus: false,
          },
          mutations: {
            retry: 0,
          },
        },
      }),
  );

  const [trpcClient] = useState(() => createTRPCClient());

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
