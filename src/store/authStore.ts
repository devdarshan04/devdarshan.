import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'artisan' | 'buyer' | 'admin';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  craft?: string; // for artisan
  company?: string; // for buyer
}

export const DEMO_USERS: Record<UserRole, AuthUser & { password: string }> = {
  artisan: {
    id: 'artisan-demo-001',
    name: 'Meera Devi',
    email: 'meera@demo.karigarai.in',
    password: 'demo1234',
    role: 'artisan',
    avatar: 'MD',
    craft: 'Block Print Textiles – Jaipur',
  },
  buyer: {
    id: 'buyer-demo-001',
    name: 'Arjun Sharma',
    email: 'arjun@demo.karigarai.in',
    password: 'demo1234',
    role: 'buyer',
    avatar: 'AS',
    company: 'Craftivo Retail Pvt. Ltd.',
  },
  admin: {
    id: 'admin-demo-001',
    name: 'Priya Iyer',
    email: 'priya@admin.karigarai.in',
    password: 'admin1234',
    role: 'admin',
    avatar: 'PI',
  },
};

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
  quickLogin: (role: UserRole) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      quickLogin: (role) => {
        const { password: _pw, ...user } = DEMO_USERS[role];
        set({ user, isAuthenticated: true });
      },
    }),
    { name: 'karigarai-auth' }
  )
);
