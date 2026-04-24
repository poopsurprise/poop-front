// =============================================================================
// UI Store — Zustand
// =============================================================================
// Gere estado global de UI: toasts, loading, modals.
// Separado do auth store para evitar re-renders desnecessários.

import { create } from 'zustand';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type ToastType = 'success' | 'info' | 'error';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number; // ms, default 3000
}

interface UIState {
  // Toasts
  toasts: Toast[];
  addToast: (message: string, type?: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;

  // Global loading
  isLoading: boolean;
  setLoading: (loading: boolean) => void;

  // Dev menu
  showDevMenu: boolean;
  toggleDevMenu: () => void;
}

// -----------------------------------------------------------------------------
// Store
// -----------------------------------------------------------------------------

let toastCounter = 0;

export const useUIStore = create<UIState>((set) => ({
  // Toasts
  toasts: [],
  addToast: (message, type = 'success', duration = 3000) => {
    const id = `toast-${++toastCounter}`;
    const toast: Toast = { id, message, type, duration };

    set((state) => ({
      toasts: [...state.toasts, toast],
    }));

    // Auto-remove após duração
    if (duration > 0) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      }, duration);
    }
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),

  // Global loading
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),

  // Dev menu
  showDevMenu: import.meta.env.DEV,
  toggleDevMenu: () =>
    set((state) => ({ showDevMenu: !state.showDevMenu })),
}));
