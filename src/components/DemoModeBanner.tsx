import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, User, ShoppingBag, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, type UserRole } from '@/store/authStore';

const roleConfig: { role: UserRole; label: string; icon: React.ReactNode; route: string; color: string }[] = [
  {
    role: 'artisan',
    label: 'Artisan',
    icon: <User className="w-3.5 h-3.5" />,
    route: '/artisan/dashboard',
    color: 'bg-white/20 hover:bg-white/30 text-white border border-white/40',
  },
  {
    role: 'buyer',
    label: 'Buyer',
    icon: <ShoppingBag className="w-3.5 h-3.5" />,
    route: '/buyer/dashboard',
    color: 'bg-white/20 hover:bg-white/30 text-white border border-white/40',
  },
  {
    role: 'admin',
    label: 'Admin',
    icon: <Shield className="w-3.5 h-3.5" />,
    route: '/admin/dashboard',
    color: 'bg-white/20 hover:bg-white/30 text-white border border-white/40',
  },
];

export default function DemoModeBanner() {
  const [dismissed, setDismissed] = useState(false);
  const navigate = useNavigate();
  const quickLogin = useAuthStore((s) => s.quickLogin);

  const handleQuickLogin = (role: UserRole, route: string) => {
    quickLogin(role);
    navigate(route);
  };

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ y: -48, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -48, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="w-full bg-gradient-to-r from-saffron-600 to-terracotta-600 z-50 relative"
          style={{ background: 'linear-gradient(90deg, #f97316 0%, #de5a37 100%)' }}
        >
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-3 flex-wrap">
            {/* Left: message */}
            <div className="flex items-center gap-2 text-white text-xs sm:text-sm font-medium">
              <Zap className="w-4 h-4 shrink-0 text-yellow-200" />
              <span>
                🚀 <strong>SIH Demo Mode</strong> — All data is simulated. No real transactions.
              </span>
            </div>

            {/* Center: quick login buttons */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-white/80 text-xs hidden sm:inline">Login as:</span>
              {roleConfig.map(({ role, label, icon, route, color }) => (
                <button
                  key={role}
                  onClick={() => handleQuickLogin(role, route)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${color}`}
                >
                  {icon}
                  {label}
                </button>
              ))}
            </div>

            {/* Right: dismiss */}
            <button
              onClick={() => setDismissed(true)}
              className="text-white/70 hover:text-white transition-colors p-1 rounded cursor-pointer"
              aria-label="Dismiss demo banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
