import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  avatar?: string;
  status: 'active' | 'inactive';
}

export interface DashboardState {
  user: User | null;
  isAuthenticated: boolean;
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

const mockUser: User = {
  id: '1',
  name: 'Admin User',
  email: 'admin@example.com',
  role: 'admin',
  status: 'active',
};

export const useAuthStore = create<DashboardState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      sidebarOpen: true,
      theme: 'light',
      
      login: async (email: string, password: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        if (email && password) {
          set({ user: mockUser, isAuthenticated: true });
          return true;
        }
        return false;
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      
      toggleSidebar: () => {
        set((state) => ({ sidebarOpen: !state.sidebarOpen }));
      },
      
      setTheme: (theme) => {
        set({ theme });
        document.documentElement.classList.toggle('dark', theme === 'dark');
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
