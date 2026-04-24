/**
 * useAuth — Hook centralizado de autenticação
 *
 * Gere o estado da sessão Supabase e expõe:
 *   - session / user / loading / error
 *   - signUp, signIn, signInWithGoogle, signOut
 *
 * A sessão é monitorizada via onAuthStateChange (Supabase realtime).
 */
import { useState, useEffect, useCallback } from 'react';
import type { Session, User, AuthError } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthState {
  session: Session | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    session: null,
    user: null,
    loading: true,
    error: null,
  });

  // ── Listen for auth changes ───────────────────────────────────
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setState(prev => ({
        ...prev,
        session,
        user: session?.user ?? null,
        loading: false,
      }));
    });

    // Subscribe to changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setState(prev => ({
          ...prev,
          session,
          user: session?.user ?? null,
          loading: false,
        }));
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // ── Sign Up (email + password) ────────────────────────────────
  const signUp = useCallback(async (email: string, password: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/complete-profile`,
      },
    });

    if (error) {
      setState(prev => ({ ...prev, loading: false, error: mapAuthError(error) }));
      return { success: false as const, error: mapAuthError(error) };
    }

    setState(prev => ({
      ...prev,
      session: data.session,
      user: data.user,
      loading: false,
    }));

    return { success: true as const, user: data.user, session: data.session };
  }, []);

  // ── Sign In (email + password) ────────────────────────────────
  const signIn = useCallback(async (email: string, password: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setState(prev => ({ ...prev, loading: false, error: mapAuthError(error) }));
      return { success: false as const, error: mapAuthError(error) };
    }

    setState(prev => ({
      ...prev,
      session: data.session,
      user: data.user,
      loading: false,
    }));

    return { success: true as const, user: data.user, session: data.session };
  }, []);

  // ── Google OAuth ──────────────────────────────────────────────
  const signInWithGoogle = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/complete-profile`,
      },
    });

    if (error) {
      setState(prev => ({ ...prev, loading: false, error: mapAuthError(error) }));
    }
    // Note: on success, the browser redirects — no further state update needed
  }, []);

  // ── Sign Out ──────────────────────────────────────────────────
  const signOut = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    await supabase.auth.signOut();
    setState({ session: null, user: null, loading: false, error: null });
  }, []);

  // ── Clear error ───────────────────────────────────────────────
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    clearError,
    isAuthenticated: !!state.session,
  };
}

// ── Error mapping (Supabase → PT-friendly) ────────────────────
function mapAuthError(error: AuthError): string {
  const msg = error.message.toLowerCase();

  if (msg.includes('invalid login credentials') || msg.includes('invalid_credentials')) {
    return 'Email ou password incorrectos';
  }
  if (msg.includes('user already registered') || msg.includes('already been registered')) {
    return 'Email já registado';
  }
  if (msg.includes('email not confirmed')) {
    return 'Email não confirmado. Verifica a tua caixa de correio';
  }
  if (msg.includes('signup is disabled')) {
    return 'Registos desactivados temporariamente';
  }
  if (msg.includes('rate limit') || msg.includes('too many requests')) {
    return 'Demasiadas tentativas. Aguarda um momento';
  }
  if (msg.includes('password') && msg.includes('at least')) {
    return 'Password deve ter pelo menos 6 caracteres';
  }
  if (msg.includes('email')) {
    return 'Email inválido';
  }

  // Fallback
  return error.message;
}
