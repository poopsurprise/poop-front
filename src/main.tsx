// =============================================================================
// main.tsx — PWA Entry Point
// =============================================================================
// Provider order (outer → inner):
//   1. React.StrictMode  — dev checks
//   2. AuthProvider      — Supabase auth state
//   3. TRPCProvider      — tRPC + React Query (precisa de auth para headers)
//   4. App               — Router + pages

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { AuthProvider } from '@/providers/AuthProvider';
import { TRPCProvider } from '@/providers/TRPCProvider';
import { App } from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <TRPCProvider>
        <App />
      </TRPCProvider>
    </AuthProvider>
  </React.StrictMode>,
);
