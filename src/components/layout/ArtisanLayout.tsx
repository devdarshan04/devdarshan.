import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  PlusCircle,
  Package,
  Sparkles,
  Mic,
  DollarSign,
  Users,
  MessageSquare,
  TrendingUp,
  Fingerprint,
  Bot,
  ShoppingCart,
  UserCircle,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Globe,
  ChevronDown,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

const NAV_ITEMS = [
  { to: '/artisan/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/artisan/add-product', icon: PlusCircle, label: 'Add Product' },
  { to: '/artisan/my-products', icon: Package, label: 'My Products' },
  { to: '/artisan/ai-image-studio', icon: Sparkles, label: 'AI Image Studio' },
  { to: '/artisan/voice-catalog', icon: Mic, label: 'Voice Catalog' },
  { to: '/artisan/pricing', icon: DollarSign, label: 'Pricing Assistant' },
  { to: '/artisan/find-buyers', icon: Users, label: 'Find Buyers' },
  { to: '/artisan/enquiries', icon: MessageSquare, label: 'Buyer Enquiries' },
  { to: '/artisan/growth-engine', icon: TrendingUp, label: 'Growth Engine' },
  { to: '/artisan/craft-identity', icon: Fingerprint, label: 'Craft Identity' },
  { to: '/artisan/orders', icon: ShoppingCart, label: 'Orders' },
  { to: '/artisan/ai-manager', icon: Bot, label: 'AI Manager' },
  { to: '/artisan/profile', icon: UserCircle, label: 'Profile' },
];

const LANGUAGES = ['English', 'हिंदी', 'தமிழ்', 'বাংলা', 'తెలుగు'];

export default function ArtisanLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');
  const [notifOpen, setNotifOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div
      className={`flex flex-col h-full ${
        mobile ? 'w-72' : 'w-64'
      } bg-white border-r border-orange-100 shadow-sm`}
    >
      {/* Logo */}
      <div className="px-5 py-5 border-b border-orange-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-sm">KG</span>
          </div>
          <div>
            <p className="font-bold text-gray-900 text-sm leading-tight">KarigarAI</p>
            <p className="text-[10px] text-orange-500 font-medium">Artisan Portal</p>
          </div>
        </div>
        {mobile && (
          <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Artisan quick info */}
      <div className="px-5 py-3 bg-orange-50 border-b border-orange-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center text-white text-xs font-bold">
            {user?.avatar ?? 'MD'}
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-800">{user?.name ?? 'Meera Devi'}</p>
            <p className="text-[10px] text-gray-500">{user?.craft ?? 'Block Print Textiles'}</p>
          </div>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5 scrollbar-thin">
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => mobile && setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md shadow-orange-200'
                  : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  className={`w-4.5 h-4.5 shrink-0 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-orange-500'}`}
                  size={18}
                />
                <span className="truncate">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom actions */}
      <div className="border-t border-orange-100 p-3 space-y-0.5">
        <NavLink
          to="/artisan/profile"
          onClick={() => mobile && setSidebarOpen(false)}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-all"
        >
          <Settings size={18} className="text-gray-400" />
          Settings
        </NavLink>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all cursor-pointer"
        >
          <LogOut size={18} className="text-gray-400" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col shrink-0">
        <Sidebar />
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -288 }}
              animate={{ x: 0 }}
              exit={{ x: -288 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="fixed left-0 top-0 h-full z-50 lg:hidden flex flex-col shadow-2xl"
            >
              <Sidebar mobile />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            {/* Hamburger */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-orange-50 hover:text-orange-500 transition-colors cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Mobile logo */}
            <div className="flex lg:hidden items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <span className="text-white font-bold text-xs">KG</span>
              </div>
              <span className="font-bold text-sm text-gray-800">KarigarAI</span>
            </div>

            {/* DEMO badge */}
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 text-[10px] font-bold tracking-widest">
              DEMO
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language selector */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{selectedLang}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute right-0 mt-1 w-36 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50"
                  >
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => { setSelectedLang(lang); setLangOpen(false); }}
                        className={`w-full text-left px-3 py-2 text-xs hover:bg-orange-50 hover:text-orange-600 transition-colors cursor-pointer ${selectedLang === lang ? 'text-orange-500 font-semibold' : 'text-gray-700'}`}
                      >
                        {lang}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2 rounded-lg text-gray-500 hover:bg-orange-50 hover:text-orange-500 transition-colors cursor-pointer"
              >
                <Bell className="w-4.5 h-4.5" size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    className="absolute right-0 mt-1 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50"
                  >
                    <p className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">Notifications</p>
                    {[
                      { title: 'New buyer enquiry received', time: '5m ago', dot: 'bg-orange-400' },
                      { title: 'AI pricing suggestion ready', time: '1h ago', dot: 'bg-blue-400' },
                      { title: 'Order #KG-2024-089 shipped', time: '3h ago', dot: 'bg-green-400' },
                    ].map((n, i) => (
                      <div key={i} className="flex items-start gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer">
                        <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.dot}`} />
                        <div>
                          <p className="text-xs font-medium text-gray-800">{n.title}</p>
                          <p className="text-[10px] text-gray-400">{n.time} · Simulated</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Avatar */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-xs font-bold shadow-md cursor-pointer">
                {user?.avatar ?? 'MD'}
              </div>
              <div className="hidden md:block">
                <p className="text-xs font-semibold text-gray-800">{user?.name ?? 'Meera Devi'}</p>
                <p className="text-[10px] text-gray-400">Artisan</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
