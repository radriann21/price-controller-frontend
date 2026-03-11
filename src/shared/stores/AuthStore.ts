import { create } from "zustand";
import { authApi } from "@/features/auth/api/AuthApi"
interface User {
  id: string;
  username: string;
}

interface AuthState {
  isAuthenticated: boolean;
  isChecking: boolean;
  user: User | null; 
  checkAuth: () => Promise<void>; 
  login: (user: User) => void; 
  logout: () => Promise<void>; 
}

export const useAuthStore = create<AuthState>()((set) => ({
  isAuthenticated: false,
  isChecking: true,
  user: null,

  checkAuth: async () => {
    try {
      const res = await authApi.getMe();
      set({ 
        user: res.data, 
        isAuthenticated: true, 
        isChecking: false 
      });
    } catch {
      set({ 
        user: null, 
        isAuthenticated: false, 
        isChecking: false 
      });
    }
  },

  login: (user: User) => {
    set({ 
      isAuthenticated: true, 
      user 
    });
  },

  logout: async () => {
    try {
      await authApi.logout(); 
    } finally {
      set({ 
        isAuthenticated: false, 
        user: null,
        isChecking: false 
      });
    }
  },
}));
