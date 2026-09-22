import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Notification { id: string; type: 'info' | 'success' | 'warning'; message: string; read: boolean; }

interface AppState {
  language: 'en' | 'ta' | 'hi';
  setLanguage: (lang: 'en' | 'ta' | 'hi') => void;
  demoMode: boolean;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  notifications: Notification[];
  addNotification: (n: Omit<Notification, 'id' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (language) => set({ language }),
      demoMode: true,
      isDarkMode: false,
      toggleDarkMode: () => set((s) => ({ isDarkMode: !s.isDarkMode })),
      notifications: [
        { id: 'n1', type: 'success', message: 'New enquiry from Priya Hotels (500 units)', read: false },
        { id: 'n2', type: 'info', message: 'AI Pricing: Festival season adjustment applied', read: false },
        { id: 'n3', type: 'warning', message: 'Update product dimensions for 3 listings', read: true },
      ],
      addNotification: (n) => set((s) => ({ notifications: [{ ...n, id: Date.now().toString(), read: false }, ...s.notifications] })),
      markNotificationRead: (id) => set((s) => ({ notifications: s.notifications.map((n) => n.id === id ? { ...n, read: true } : n) })),
      sidebarCollapsed: false,
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
    }),
    { name: 'karigarai-app' }
  )
);
