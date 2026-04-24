/**
 * AuthGuard — Protege rotas que requerem autenticação
 *
 * Se não autenticado → redirige para /login
 * Se loading → mostra spinner
 * Se autenticado → renderiza children
 */
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-dvh max-w-[420px] mx-auto bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-[#4A6CF7] border-t-transparent rounded-full animate-spin" />
          <span className="text-gray-400 text-sm">A carregar...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

/**
 * GuestGuard — Protege rotas de auth (login/register)
 *
 * Se já autenticado → redirige para /inventory
 * Se loading → mostra spinner
 * Se não autenticado → renderiza children (login/register form)
 */
interface GuestGuardProps {
  children: React.ReactNode;
}

export function GuestGuard({ children }: GuestGuardProps) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-dvh max-w-[420px] mx-auto bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-[#4A6CF7] border-t-transparent rounded-full animate-spin" />
          <span className="text-gray-400 text-sm">A carregar...</span>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/inventory" replace />;
  }

  return <>{children}</>;
}
