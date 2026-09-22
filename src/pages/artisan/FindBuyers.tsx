import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, RefreshCw, Users, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { mockMarketMatches, mockBuyerRequirements } from '@/mock/data';
import { sleep } from '@/lib/utils';

const PRODUCTS = ['Bamboo Storage Basket Set', 'Handwoven Cotton Saree', 'Block Print Bedsheet Set'];

function CircleScore({ score }: { score: number }) {
  const color = score >= 90 ? '#16a34a' : score >= 80 ? '#2563eb' : '#ca8a04';
  return (
    <div className="relative w-16 h-16 shrink-0">
      <svg viewBox="0 0 56 56" className="w-full h-full -rotate-90">
        <circle cx="28" cy="28" r="22" fill="none" stroke="#e5e7eb" strokeWidth="5" />
        <motion.circle cx="28" cy="28" r="22" fill="none" stroke={color} strokeWidth="5"
          strokeDasharray={`${2 * Math.PI * 22}`}
          initial={{ strokeDashoffset: 2 * Math.PI * 22 }}
          animate={{ strokeDashoffset: 2 * Math.PI * 22 * (1 - score / 100) }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-black" style={{ color }}>{score}%</span>
      </div>
    </div>
  );
}

export default function FindBuyers() {
  const navigate = useNavigate();
  const [product, setProduct] = useState(PRODUCTS[0]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState('');

  const analyze = async () => {
    setLoading(true);
    setResults(false);
    await sleep(1600);
    setLoading(false);
    setResults(true);
  };

  const showToast = (msg: string) => { setToastMsg(msg); setTimeout(() => setToastMsg(''), 3000); };

  const req = mockBuyerRequirements[0];
  const total = req.matchedArtisans.reduce((s, a) => s + a.units, 0);

  return (
    <div className="p-4 md:p-6 max-w-5xl space-y-6">
      {/* Toast */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="fixed top-4 right-4 z-50 bg-green-600 text-white px-5 py-3 rounded-xl shadow-xl font-medium text-sm">
            ✓ {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Search className="w-7 h-7 text-blue-600" /> Find My Market
        </h1>
        <p className="text-gray-500 mt-1">AI analyzes your products and matches you with the right B2B buyers</p>
      </div>

      {/* Product Selector */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row gap-3 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Product to Analyze</label>
          <select value={product} onChange={(e) => { setProduct(e.target.value); setResults(false); }}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-400 bg-white text-sm">
            {PRODUCTS.map((p) => <option key={p}>{p}</option>)}
          </select>
        </div>
        <button onClick={analyze} disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold px-6 py-2.5 rounded-xl transition-colors flex items-center gap-2 text-sm shrink-0">
          {loading ? <><RefreshCw className="w-4 h-4 animate-spin" /> Analyzing…</> : <><Search className="w-4 h-4" /> Analyze Market</>}
        </button>
      </div>

      {/* Market Match Results */}
      <AnimatePresence>
        {results && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            <h2 className="font-bold text-gray-900">B2B Market Matches for <span className="text-blue-700">{product}</span></h2>
            {mockMarketMatches.map((m, i) => (
              <motion.div key={m.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.12 }}
                className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="text-3xl shrink-0">{m.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-gray-900">{m.market}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${m.matchScore >= 90 ? 'bg-green-100 text-green-700' : m.matchScore >= 80 ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {m.matchScore >= 90 ? 'Excellent' : m.matchScore >= 80 ? 'Strong' : 'Good'} Match
                      </span>
                    </div>
                    <div className="flex gap-4 text-xs text-gray-500 mt-1">
                      <span>👥 {m.buyerCount} active buyers</span>
                      <span>💰 Avg order ₹{m.avgOrderValue.toLocaleString('en-IN')}</span>
                    </div>
                    <AnimatePresence>
                      {expanded === m.id && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden">
                          <p className="mt-2 text-sm text-gray-600 leading-relaxed border-l-4 border-blue-200 pl-3 italic">{m.reasoning}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <button onClick={() => setExpanded(expanded === m.id ? null : m.id)}
                      className="mt-1 text-xs text-blue-600 flex items-center gap-1 hover:underline">
                      {expanded === m.id ? <><ChevronUp className="w-3 h-3" /> Hide reasoning</> : <><ChevronDown className="w-3 h-3" /> Why this match?</>}
                    </button>
                  </div>
                  <CircleScore score={m.matchScore} />
                </div>
                <div className="flex gap-2 mt-3 flex-wrap">
                  <button onClick={() => showToast(`Interest sent to ${m.market} buyers!`)}
                    className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-lg transition-colors">
                    Send Interest
                  </button>
                  <button onClick={() => showToast(`Connection request sent to ${m.market}!`)}
                    className="px-3 py-1.5 border border-gray-200 text-gray-600 text-xs font-medium rounded-lg hover:bg-gray-50 transition-colors">
                    Request Connection
                  </button>
                  <button onClick={() => navigate('/artisan/enquiries')}
                    className="px-3 py-1.5 border border-blue-200 text-blue-700 text-xs font-medium rounded-lg hover:bg-blue-50 transition-colors">
                    View Buyer Types
                  </button>
                </div>
              </motion.div>
            ))}

            {/* Buyer Cluster Matching */}
            <div className="bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-6 mt-4">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-indigo-700" />
                <h3 className="font-bold text-indigo-900">Buyer Requirement Match</h3>
              </div>
              <div className="bg-white rounded-xl p-4 mb-4 border border-indigo-100">
                <p className="font-semibold text-gray-900 text-sm">"{req.title}"</p>
                <p className="text-xs text-gray-500 mt-1">Budget: ₹{req.budgetPerUnit.toLocaleString('en-IN')}/unit · Qty: {req.quantity.toLocaleString('en-IN')} units</p>
              </div>
              <div className="space-y-2 mb-4">
                {req.matchedArtisans.map((a) => (
                  <div key={a.artisanId} className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">{a.name[0]}</div>
                    <div className="flex-1">
                      <span className="font-medium text-gray-900">{a.name}</span>
                      <span className="text-gray-400"> — {a.region}</span>
                    </div>
                    <span className="text-indigo-700 font-bold">{a.units} units</span>
                    <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">{a.matchScore}%</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold text-sm pt-2 border-t border-indigo-100">
                  <span>Total Coverage</span>
                  <span className="text-green-700">{total} / {req.quantity} units ({Math.round(total / req.quantity * 100)}%)</span>
                </div>
              </div>
              <div className="bg-green-100 rounded-xl p-3 text-center font-bold text-green-800 mb-3">
                ✅ BEST CLUSTER MATCH: A + B + C — {Math.round(total / req.quantity * 100)}% Coverage
              </div>
              <div className="flex gap-2 flex-wrap">
                <button onClick={() => showToast('Bulk enquiry sent to artisan cluster!')}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl transition-colors text-sm flex items-center justify-center gap-2">
                  Send Bulk Enquiry <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => showToast('RFQ document generated!')}
                  className="px-5 py-2.5 border border-indigo-200 text-indigo-700 font-semibold rounded-xl text-sm hover:bg-indigo-50 transition-colors">
                  Generate RFQ
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
