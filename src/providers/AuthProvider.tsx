// =============================================================================
// AuthProvider — React Context para Auth
// =============================================================================
// Gere o estado de autenticação com Supabase.
// Escuta auth state changes (onAuthStateChange) e expõe via React context.
//
// Uso no main.tsx:
//   <AuthProvider>
//     <App />
//   </AuthProvider>

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

/** Resultado de uma operação de auth (sign in / sign up) */
export interface AuthResult {
  success: boolean;
  error?: string;
}

/** Valor exposto pelo AuthProvider via useAuth() */
export interface AuthContextValue {
  /** User do Supabase (null se não autenticado) */
  user: User | null;
  /** Session activa (null se não autenticado) */
  session: Session | null;
  /** true enquanto o estado inicial está a carregar */
  loading: boolean;
  /** Atalho: user !== null && !loading */
  isAuthenticated: boolean;

  /** Registo com email + password */
  signUp: (email: string, password: string) => Promise<AuthResult>;
  /** Login com email + password */
  signIn: (email: string, password: string) => Promise<AuthResult>;
  /** Login com Google OAuth (redirect) */
  signInWithGoogle: () => Promise<AuthResult>;
  /** Logout */
  signOut: () => Promise<AuthResult>;
}

// -----------------------------------------------------------------------------
// Context
// -----------------------------------------------------------------------------

export const AuthContext = createContext<AuthContextValue | null>(null);

// -----------------------------------------------------------------------------
// Helper
// -----------------------------------------------------------------------------

function formatError(error: AuthError | null): string | undefined {
  if (!error) return undefined;
  return error.message;
}

// -----------------------------------------------------------------------------
// Provider
// -----------------------------------------------------------------------------

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // ---------------------------------------------------------------------------
  // Escutar auth state changes
  // ---------------------------------------------------------------------------

  useEffect(() => {
    // 1. Obter sessão inicial
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      setSession(initialSession);
      setUser(initialSession?.user ?? null);
      setLoading(false);
    });

    // 2. Escutar mudanças (login, logout, token refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // ---------------------------------------------------------------------------
  // Auth methods
  // ---------------------------------------------------------------------------

  // Define the base redirect URL based on environment variables or window.location
  // Using an explicit environment variable allows overriding the local localhost:5173
  // with a pre-approved redirect URI (like https://poopsurprise.lol) if needed.
  const getRedirectUrl = () => {
    return import.meta.env.VITE_SUPABASE_REDIRECT_URL || window.location.origin;
  };

  const signUp = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    const { error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        emailRedirectTo: getRedirectUrl()
      }
    });
    return { success: !error, error: formatError(error) };
  }, []);

  const signIn = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { success: !error, error: formatError(error) };
  }, []);

  const signInWithGoogle = useCallback(async (): Promise<AuthResult> => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: getRedirectUrl(),
      },
    });
    return { success: !error, error: formatError(error) };
  }, []);

  const signOut = useCallback(async (): Promise<AuthResult> => {
    const { error } = await supabase.auth.signOut();
    return { success: !error, error: formatError(error) };
  }, []);

  // ---------------------------------------------------------------------------
  // Context value (memoized)
  // ---------------------------------------------------------------------------

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      session,
      loading,
      isAuthenticated: !loading && user !== null,
      signUp,
      signIn,
      signInWithGoogle,
      signOut,
    }),
    [user, session, loading, signUp, signIn, signInWithGoogle, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
