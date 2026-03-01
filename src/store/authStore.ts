import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'docente' | 'family' | 'alumno' | 'admin' | 'demo_docente' | 'demo_family' | 'demo_alumno';

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isDemo: boolean;
  favorites?: string[]; // Array of opportunity IDs
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  toggleFavorite: (opportunityId: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      toggleFavorite: (opportunityId) => set((state) => {
        if (!state.user) return state;
        const currentFavorites = state.user.favorites || [];
        const isFavorite = currentFavorites.includes(opportunityId);
        const newFavorites = isFavorite
          ? currentFavorites.filter(id => id !== opportunityId)
          : [...currentFavorites, opportunityId];
        
        return {
          user: {
            ...state.user,
            favorites: newFavorites
          }
        };
      }),
    }),
    {
      name: 'apulab-auth',
    }
  )
);
