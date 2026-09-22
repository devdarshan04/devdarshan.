import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  Mic,
  Globe,
  ShieldCheck,
  TrendingUp,
  Users,
  Star,
} from 'lucide-react';

const features = [
  { icon: Sparkles, title: 'AI Image Studio', desc: 'Generate professional product photos with AI', color: 'bg-purple-100 text-purple-600' },
  { icon: Mic, title: 'Voice Catalog', desc: 'Add products by speaking in your language', color: 'bg-orange-100 text-orange-600' },
  { icon: TrendingUp, title: 'Smart Pricing', desc: 'AI-powered dynamic pricing recommendations', color: 'bg-green-100 text-green-600' },
  { icon: Globe, title: 'B2B Marketplace', desc: 'Connect directly with global buyers', color: 'bg-blue-100 text-blue-600' },
  { icon: ShieldCheck, title: 'GI Tag Protection', desc: 'Authenticate your craft heritage digitally', color: 'bg-red-100 text-red-600' },
  { icon: Users, title: 'AI Business Manager', desc: '24/7 virtual manager in your language', color: 'bg-indigo-100 text-indigo-600' },
];

const stats = [
  { value: '2.3M+', label: 'Artisans Supported', color: 'text-orange-500' },
  { value: '180+', label: 'Craft Categories', color: 'text-green-500' },
  { value: '₹47Cr', label: 'Revenue Generated', color: 'text-blue-500' },
  { value: '94%', label: 'Artisan Satisfaction', color: 'text-purple-500' },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-100/40 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 pt-20 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              SIH 2026 — AI for Marginalized Artisans
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                KarigarAI
              </span>
              <br />
              <span className="text-3xl md:text-5xl text-gray-800">Your AI Business Partner</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              Empowering India's 7 crore artisans with AI-powered tools for{' '}
              <strong>product listing, smart pricing, B2B matching</strong>, and digital identity —
              in their own language.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/login')}
                className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-orange-200/50 hover:shadow-orange-300/60 transition-all cursor-pointer"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/login')}
                className="flex items-center gap-2 bg-white border-2 border-orange-200 text-gray-700 px-8 py-4 rounded-2xl font-bold text-lg hover:border-orange-400 transition-all cursor-pointer"
              >
                View Demo
                <Star className="w-5 h-5 text-orange-400" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100"
            >
              <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
              <p className="text-[10px] text-gray-300 mt-1">Simulated Data</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">Everything an Artisan Needs</h2>
        <p className="text-center text-gray-500 mb-10">Powered by AI · Designed for Low Digital Literacy</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * i }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-2xl ${f.color} flex items-center justify-center mb-4`}>
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Ready to Transform Your Craft Business?
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Join thousands of artisans already using KarigarAI · SIH 2026 Demo
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/login')}
            className="bg-white text-orange-600 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            Start for Free →
          </motion.button>
        </div>
      </section>

      <footer className="text-center py-8 text-xs text-gray-400">
        KarigarAI · SIH 2026 Hackathon Prototype · All data simulated · No real transactions
      </footer>
    </div>
  );
}
