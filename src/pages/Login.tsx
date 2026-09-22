import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  ShoppingBag,
  Shield,
  Eye,
  EyeOff,
  Globe,
  Loader2,
  ArrowRight,
  Sparkles,
  Info,
} from 'lucide-react';
import { useAuthStore, DEMO_USERS, type UserRole } from '@/store/authStore';

const ROLE_CONFIG = {
  artisan: {
    label: 'Artisan',
    icon: User,
    color: 'from-orange-500 to-red-500',
    activeTab: 'border-orange-500 text-orange-600',
    btnGradient: 'from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600',
    credColor: 'bg-orange-50 border-orange-200',
    tagline: 'Sell your craft to the world 🪔',
    redirect: '/artisan/dashboard',
    description: 'Manage products, pricing, buyers, and grow your craft business with AI.',
  },
  buyer: {
    label: 'Buyer',
    icon: ShoppingBag,
    color: 'from-indigo-500 to-blue-600',
    activeTab: 'border-indigo-500 text-indigo-600',
    btnGradient: 'from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700',
    credColor: 'bg-indigo-50 border-indigo-200',
    tagline: 'Source authentic Indian crafts 🛍️',
    redirect: '/buyer/dashboard',
    description: 'Post requirements, discover artisans, and manage bulk procurement.',
  },
  admin: {
    label: 'Admin',
    icon: Shield,
    color: 'from-gray-700 to-gray-900',
    activeTab: 'border-gray-700 text-gray-800',
    btnGradient: 'from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black',
    credColor: 'bg-gray-50 border-gray-300',
    tagline: 'Institutional oversight 🏛️',
    redirect: '/admin/dashboard',
    description: 'Analytics, market intelligence, and platform management.',
  },
} as const;

const LANGUAGES = ['English', 'हिंदी', 'தமிழ்', 'বাংলা', 'Español'];

export default function Login() {
  const [role, setRole] = useState<UserRole>('artisan');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [forgotToast, setForgotToast] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  const roleConf = ROLE_CONFIG[role];
  const demoUser = DEMO_USERS[role];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    // Simulate network latency
    await new Promise((r) => setTimeout(r, 1200));

    if (email === demoUser.email && password === demoUser.password) {
      const { password: _pw, ...user } = demoUser;
      login(user);
      navigate(roleConf.redirect);
    } else {
      setError('Invalid credentials. Use the demo credentials shown below.');
    }
    setLoading(false);
  };

  const fillDemo = () => {
    setEmail(demoUser.email);
    setPassword(demoUser.password);
    setError('');
  };

  const showForgot = () => {
    setForgotToast(true);
    setTimeout(() => setForgotToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative craft pattern background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-300/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-300/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

      {/* Language selector top-right */}
      <div className="absolute top-4 right-4 z-10">
        <select
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value)}
          className="text-xs text-gray-600 bg-white/80 backdrop-blur border border-gray-200 rounded-lg px-2 py-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-300"
        >
          {LANGUAGES.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
      </div>

      {/* Forgot password toast */}
      <AnimatePresence>
        {forgotToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-sm px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2"
          >
            <Info className="w-4 h-4 text-orange-400" />
            Demo mode — use the demo credentials shown below ✨
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-orange-100/50 overflow-hidden border border-orange-100">
          {/* Header */}
          <div className={`bg-gradient-to-r ${roleConf.color} p-6 text-white`}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">KarigarAI</h1>
                <p className="text-white/80 text-xs">AI-Powered Virtual Business Manager</p>
              </div>
            </div>
            <p className="text-white/90 text-sm mt-3">{roleConf.tagline}</p>
            <p className="text-white/60 text-xs mt-1">{roleConf.description}</p>
          </div>

          <div className="p-6">
            {/* Role tabs */}
            <div className="flex border-b border-gray-200 mb-5">
              {(Object.keys(ROLE_CONFIG) as UserRole[]).map((r) => {
                const { label, icon: Icon } = ROLE_CONFIG[r];
                return (
                  <button
                    key={r}
                    onClick={() => { setRole(r); setError(''); setEmail(''); setPassword(''); }}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium border-b-2 transition-all cursor-pointer ${
                      role === r
                        ? ROLE_CONFIG[r].activeTab
                        : 'border-transparent text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={demoUser.email}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition-all bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition-all bg-gray-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl px-4 py-2.5"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading}
                whileTap={{ scale: 0.97 }}
                className={`w-full bg-gradient-to-r ${roleConf.btnGradient} text-white py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing in…
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>

              {/* Forgot */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={showForgot}
                  className="text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2 cursor-pointer transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            </form>

            {/* Demo credentials */}
            <div className={`mt-5 rounded-2xl border p-4 ${roleConf.credColor}`}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Demo Credentials
                </p>
                <button
                  onClick={fillDemo}
                  className="text-[10px] font-semibold text-orange-600 hover:text-orange-700 underline underline-offset-2 cursor-pointer transition-colors"
                >
                  Auto-fill →
                </button>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-700">
                  <span className="font-semibold">Email:</span>{' '}
                  <code className="text-[11px] bg-white/70 px-1.5 py-0.5 rounded">{demoUser.email}</code>
                </p>
                <p className="text-xs text-gray-700">
                  <span className="font-semibold">Password:</span>{' '}
                  <code className="text-[11px] bg-white/70 px-1.5 py-0.5 rounded">{demoUser.password}</code>
                </p>
                <p className="text-[10px] text-gray-400 mt-1.5">
                  Simulated data only · No real account needed
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1.5">
          <Globe className="w-3 h-3" />
          KarigarAI · SIH 2026 Prototype · Simulated Demo Environment
        </p>
      </motion.div>
    </div>
  );
}
