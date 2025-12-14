// src/store/auth.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = { phone: string; role: 'user' | 'admin' };
type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (phone: string, role: 'user' | 'admin') => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (phone, role) => set({ 
        user: { phone, role }, 
        isAuthenticated: true 
      }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'auth-storage' }
  )
);
