// =============================================================================
// useAuth() Hook — Auth Abstraction Layer
// =============================================================================
// Abstrai o Supabase Auth para o frontend.
// O dev de UI nunca interage directamente com Supabase — usa só este hook.
// Quando migrarmos para Better Auth, só este ficheiro muda.
//
// Uso: const { user, signIn, signUp, signOut, signInWithGoogle } = useAuth();

import { useContext } from 'react';
import { AuthContext } from '@/providers/AuthProvider';
import type { AuthContextValue } from '@/providers/AuthProvider';

/**
 * Hook que expõe o estado e métodos de autenticação.
 *
 * Deve ser usado dentro de um <AuthProvider>.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { user, isAuthenticated, signIn, signOut } = useAuth();
 *
 *   if (!isAuthenticated) {
 *     return <button onClick={() => signIn('email@ex.com', 'pass')}>Login</button>;
 *   }
 *
 *   return <p>Olá, {user?.email}</p>;
 * }
 * ```
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth() deve ser usado dentro de um <AuthProvider>. ' +
      'Envolva o seu componente com <AuthProvider> no main.tsx.'
    );
  }

  return context;
}
