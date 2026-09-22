import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { mockProducts, mockEnquiries, mockGrowthRecommendations } from '@/mock/data';
import {
  Package, Star, Users, MessageSquare, TrendingUp, Zap, ArrowRight,
  Camera, Mic, ShoppingBag, BarChart3, Bell, Plus
} from 'lucide-react';

const STATS = [
  { label: 'Total Products', value: '12', icon: Package, color: 'bg-orange-50 text-orange-600', border: 'border-orange-200' },
  { label: 'Active Listings', value: '8', icon: Star, color: 'bg-green-50 text-green-600', border: 'border-green-200' },
  { label: 'Buyer Matches', value: '34', icon: Users, color: 'bg-blue-50 text-blue-600', border: 'border-blue-200' },
  { label: 'Pending Enquiries', value: '5', icon: MessageSquare, color: 'bg-yellow-50 text-yellow-700', border: 'border-yellow-200' },
  { label: 'Estimated Revenue', value: '₹24,500', icon: TrendingUp, color: 'bg-emerald-50 text-emerald-600', border: 'border-emerald-200' },
  { label: 'Growth Score', value: '78/100', icon: Zap, color: 'bg-purple-50 text-purple-600', border: 'border-purple-200' },
];

const QUICK_ACTIONS = [
  { label: 'Add Product', icon: Plus, route: '/artisan/add-product', color: 'bg-orange-500 hover:bg-orange-600' },
  { label: 'AI Image Studio', icon: Camera, route: '/artisan/ai-image-studio', color: 'bg-purple-500 hover:bg-purple-600' },
  { label: 'Voice Catalog', icon: Mic, route: '/artisan/voice-catalog', color: 'bg-green-600 hover:bg-green-700' },
  { label: 'Find Buyers', icon: ShoppingBag, route: '/artisan/find-buyers', color: 'bg-blue-600 hover:bg-blue-700' },
];

const GROWTH_DIMS = [
  { label: 'Digital Readiness', value: 82, color: 'bg-orange-500' },
  { label: 'Product Quality', value: 76, color: 'bg-purple-500' },
  { label: 'Market Reach', value: 71, color: 'bg-blue-500' },
  { label: 'Buyer Engagement', value: 84, color: 'bg-green-500' },
  { label: 'Catalog Quality', value: 79, color: 'bg-yellow-500' },
];

const cardVariants = { hidden: { opacity: 0, y: 20 }, visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }) };

export default function ArtisanDashboard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const recentProducts = mockProducts.slice(0, 3);
  const recentEnquiries = mockEnquiries.slice(0, 3);
  const topRec = mockGrowthRecommendations[0];

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Vanakkam, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-gray-500 mt-1">Here's your business overview for today</p>
        </div>
        <button onClick={() => navigate('/artisan/add-product')} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-semibold transition-colors text-sm">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {STATS.map((s, i) => (
          <motion.div key={s.label} custom={i} initial="hidden" animate="visible" variants={cardVariants}
            className={`bg-white border ${s.border} rounded-2xl p-4 flex flex-col gap-2 shadow-sm`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
              <s.icon className="w-5 h-5" />
            </div>
            <div className="text-xl font-bold text-gray-900">{s.value}</div>
            <div className="text-xs text-gray-500 leading-tight">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* AI Business Manager Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="relative overflow-hidden rounded-2xl p-6 text-white shadow-xl"
        style={{ background: 'linear-gradient(135deg, #f97316 0%, #c2590d 50%, #7c3d10 100%)' }}>
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white transform translate-x-20 -translate-y-20" />
          <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-white transform -translate-x-10 translate-y-10" />
        </div>
        <div className="relative flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">
                🤖
              </motion.div>
              <span className="font-bold text-lg">Your AI Business Manager</span>
            </div>
            <p className="text-white/90 text-sm leading-relaxed max-w-2xl">
              Your bamboo basket collection is receiving strong interest from corporate gifting buyers.
              Adding <strong>dimensions</strong> and <strong>bulk-order pricing</strong> could improve buyer conversion by 23%.
              Also: Festival season demand is expected to surge — start preparing inventory now.
            </p>
          </div>
          <button onClick={() => navigate('/artisan/ai-manager')}
            className="flex items-center gap-2 bg-white text-orange-700 font-bold px-5 py-2.5 rounded-xl hover:bg-orange-50 transition-colors shrink-0 text-sm">
            Ask AI <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Quick Actions */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Zap className="w-4 h-4 text-orange-500" /> Quick Actions</h2>
          <div className="grid grid-cols-2 gap-2">
            {QUICK_ACTIONS.map((a) => (
              <button key={a.label} onClick={() => navigate(a.route)}
                className={`${a.color} text-white rounded-xl p-3 flex flex-col items-center gap-2 transition-colors text-xs font-semibold`}>
                <a.icon className="w-5 h-5" />
                {a.label}
              </button>
            ))}
          </div>
        </div>

        {/* Growth Score */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-bold text-gray-900 flex items-center gap-2"><BarChart3 className="w-4 h-4 text-purple-500" /> Growth Score</h2>
            <span className="text-2xl font-black text-purple-600">78</span>
          </div>
          <p className="text-xs text-green-600 font-medium mb-3">↑ +12 points this month</p>
          <div className="space-y-2">
            {GROWTH_DIMS.map((d) => (
              <div key={d.label}>
                <div className="flex justify-between text-xs text-gray-500 mb-0.5"><span>{d.label}</span><span>{d.value}%</span></div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${d.value}%` }} transition={{ delay: 0.8, duration: 0.8 }}
                    className={`h-full rounded-full ${d.color}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Recommendation */}
        <div className="bg-white border border-green-100 rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-600" /> Top Recommendation</h2>
          {topRec && (
            <div>
              <span className="text-xs bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full">HIGH PRIORITY</span>
              <h3 className="font-semibold text-gray-900 mt-2 mb-1">{topRec.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{topRec.reason}</p>
              <p className="text-xs text-green-700 font-medium mt-2">💰 {topRec.opportunity}</p>
              <button onClick={() => navigate('/artisan/growth-engine')}
                className="mt-3 text-xs text-orange-600 font-semibold flex items-center gap-1 hover:underline">
                View Growth Engine <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Recent Products */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900 flex items-center gap-2"><Package className="w-4 h-4 text-orange-500" /> Recent Products</h2>
            <button onClick={() => navigate('/artisan/my-products')} className="text-xs text-orange-600 hover:underline font-medium">View All →</button>
          </div>
          <div className="space-y-3">
            {recentProducts.map((p) => (
              <div key={p.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                <img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover shrink-0" onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/48'; }} />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-gray-900 truncate">{p.name}</div>
                  <div className="text-xs text-gray-500">{p.category} · ₹{p.price.toLocaleString('en-IN')}</div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{p.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Enquiries */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900 flex items-center gap-2"><Bell className="w-4 h-4 text-blue-500" /> Buyer Enquiries</h2>
            <button onClick={() => navigate('/artisan/enquiries')} className="text-xs text-orange-600 hover:underline font-medium">View All →</button>
          </div>
          <div className="space-y-3">
            {recentEnquiries.map((e) => (
              <div key={e.id} className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                <div className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                  {e.buyerName[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-gray-900">{e.buyerName}</div>
                  <div className="text-xs text-gray-600">{e.product} · Qty: {e.quantity}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${e.status === 'new' ? 'bg-green-100 text-green-700' : e.status === 'quoted' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>{e.status}</span>
                    <span className="text-xs text-gray-400">{e.date}</span>
                  </div>
                </div>
                <div className="text-xs font-bold text-blue-700 shrink-0">{e.matchScore}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
