import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { mockProducts, mockArtisans } from '@/mock/data';
import { useAuthStore } from '@/store/authStore';
import { ShoppingBag, Plus, Search, RefreshCw, ArrowRight, Star, MapPin } from 'lucide-react';
import { sleep } from '@/lib/utils';

const CRAFTS = ['All', 'Bamboo Craft', 'Handloom', 'Pottery', 'Block Print', 'Metal Craft'];
const REGIONS = ['All India', 'Tamil Nadu', 'Rajasthan', 'West Bengal', 'Odisha', 'Gujarat'];

export default function BuyerDashboard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [craft, setCraft] = useState('All');
  const [region, setRegion] = useState('All India');
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<typeof mockProducts | null>(null);

  const doSearch = async () => {
    setSearching(true);
    await sleep(1200);
    const filtered = mockProducts.filter((p) =>
      (craft === 'All' || p.category === craft) &&
      (search === '' || p.name.toLowerCase().includes(search.toLowerCase()) || p.keywords.some((k) => k.includes(search.toLowerCase())))
    );
    setResults(filtered.length ? filtered : mockProducts.slice(0, 4));
    setSearching(false);
  };

  return (
    <div className="p-4 md:p-6 max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name?.split(' ')[0]} 👋</h1>
          <p className="text-gray-500 mt-1 text-sm">Intelligent B2B Market Linkage — Find the right artisan for your procurement needs</p>
        </div>
        <button onClick={() => navigate('/buyer/post-requirement')}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl font-semibold transition-colors text-sm">
          <Plus className="w-4 h-4" /> Post Requirement
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[['Active Requirements', '3', '📋'],['Matched Artisans', '47', '🤝'],['Enquiries Sent', '12', '📨'],['Quotations Received', '8', '📝']].map(([label, value, icon]) => (
          <div key={label as string} className="bg-white border border-indigo-100 rounded-2xl p-4 shadow-sm text-center">
            <div className="text-2xl mb-1">{icon as string}</div>
            <div className="text-2xl font-black text-indigo-700">{value as string}</div>
            <div className="text-xs text-gray-500">{label as string}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
        <h2 className="font-bold text-gray-900 mb-3">Search Artisan Products</h2>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products, craft type, material…"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 text-sm" />
          </div>
          <select value={craft} onChange={(e) => setCraft(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-indigo-400">
            {CRAFTS.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select value={region} onChange={(e) => setRegion(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-indigo-400">
            {REGIONS.map((r) => <option key={r}>{r}</option>)}
          </select>
          <button onClick={doSearch} disabled={searching}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-bold px-6 py-2.5 rounded-xl transition-colors text-sm flex items-center gap-2 shrink-0">
            {searching ? <><RefreshCw className="w-4 h-4 animate-spin" />Searching…</> : <><Search className="w-4 h-4" />Search</>}
          </button>
        </div>
      </div>

      {/* Search Results */}
      <AnimatePresence>
        {results && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <h3 className="font-bold text-gray-700 text-sm">{results.length} products found</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((p) => (
                <div key={p.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <img src={p.image} alt={p.name} className="w-full h-40 object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x160'; }} />
                  <div className="p-4">
                    <h4 className="font-bold text-gray-900 text-sm">{p.name}</h4>
                    <div className="text-xs text-gray-500 mt-0.5">{p.category} · {p.origin}</div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-black text-indigo-700">₹{p.price.toLocaleString('en-IN')}</span>
                      <span className="text-xs text-gray-400">{p.enquiries} enquiries</span>
                    </div>
                    <button onClick={() => navigate('/buyer/post-requirement')}
                      className="mt-3 w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold py-2 rounded-xl text-xs transition-colors flex items-center justify-center gap-1">
                      <ShoppingBag className="w-3.5 h-3.5" /> Send Enquiry
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recommended Artisans */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-900">Recommended Artisans</h2>
          <button onClick={() => navigate('/buyer/match-artisans')} className="text-xs text-indigo-600 hover:underline font-medium">View All →</button>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {mockArtisans.slice(0, 3).map((a) => (
            <div key={a.id} className="bg-indigo-50 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">{a.avatar}</div>
                <div>
                  <div className="font-bold text-sm text-gray-900">{a.name}</div>
                  <div className="text-xs text-gray-500">{a.craft}</div>
                </div>
              </div>
              <div className="text-xs text-gray-600 space-y-1">
                <div className="flex items-center gap-1"><MapPin className="w-3 h-3 text-indigo-500" />{a.region}, {a.state}</div>
                <div className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-500" />{a.rating} rating · {a.products} products</div>
                <div>Capacity: {a.capacity} units/month</div>
              </div>
              <button onClick={() => navigate('/buyer/post-requirement')}
                className="mt-3 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-1.5 rounded-lg text-xs transition-colors flex items-center justify-center gap-1">
                Connect <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
