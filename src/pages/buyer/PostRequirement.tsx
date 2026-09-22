import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockArtisans, mockBuyerRequirements } from '@/mock/data';
import { RefreshCw, Star, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import { sleep } from '@/lib/utils';

const CATEGORIES = ['Bamboo Craft', 'Handloom', 'Pottery', 'Block Print', 'Metal Craft', 'Leather Craft'];
const QUALITIES = ['Basic', 'Premium', 'Export'];

export default function PostRequirement() {
  const [form, setForm] = useState({
    title: 'Need 1,000 Handmade Bamboo Baskets for Corporate Gifting',
    category: 'Bamboo Craft', craft: 'Bamboo Weaving',
    quantity: 1000, budgetPerUnit: 2500,
    region: 'All India', quality: 'Premium',
    timeline: '2026-11-01', notes: 'Need GI tag certification. Sample required before bulk order.',
    sampleRequired: true, bulkDiscount: true,
  });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const set = (k: string, v: string | number | boolean) => setForm((p) => ({ ...p, [k]: v }));
  const showToast = (msg: string) => { setToastMsg(msg); setTimeout(() => setToastMsg(''), 3000); };

  const find = async () => {
    setLoading(true);
    setResults(false);
    await sleep(1800);
    setLoading(false);
    setResults(true);
  };

  const matched = mockBuyerRequirements[0].matchedArtisans;

  return (
    <div className="p-4 md:p-6 max-w-4xl space-y-6">
      {toastMsg && <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-5 py-3 rounded-xl shadow-xl font-medium text-sm">✓ {toastMsg}</div>}

      <div>
        <h1 className="text-2xl font-bold text-gray-900">Post a Requirement</h1>
        <p className="text-gray-500 text-sm mt-1">Describe what you need — AI will match you with the perfect artisans</p>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Requirement Title</label>
            <input value={form.title} onChange={(e) => set('title', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-400 text-sm" />
          </div>
          {[
            { label: 'Product Category', key: 'category', opts: CATEGORIES },
            { label: 'Craft Type', key: 'craft', opts: ['Bamboo Weaving', 'Handloom Weaving', 'Block Printing', 'Pottery', 'Metal Casting'] },
            { label: 'Quality Standard', key: 'quality', opts: QUALITIES },
            { label: 'Region', key: 'region', opts: ['All India', 'Tamil Nadu', 'Rajasthan', 'West Bengal', 'Gujarat', 'Odisha'] },
          ].map(({ label, key, opts }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <select value={(form as unknown as Record<string, string>)[key]} onChange={(e) => set(key, e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-400 text-sm bg-white">
                {opts.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Required Quantity (units)</label>
            <input type="number" value={form.quantity} onChange={(e) => set('quantity', Number(e.target.value))}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Budget per Unit (₹)</label>
            <input type="number" value={form.budgetPerUnit} onChange={(e) => set('budgetPerUnit', Number(e.target.value))}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Budget</label>
            <div className="w-full border border-indigo-100 bg-indigo-50 rounded-xl px-4 py-2.5 text-sm font-bold text-indigo-700">
              ₹{(form.quantity * form.budgetPerUnit).toLocaleString('en-IN')}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Timeline</label>
            <input type="date" value={form.timeline} onChange={(e) => set('timeline', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-400 text-sm" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Special Requirements</label>
            <textarea rows={2} value={form.notes} onChange={(e) => set('notes', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-400 text-sm resize-none" />
          </div>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input type="checkbox" checked={form.sampleRequired} onChange={(e) => set('sampleRequired', e.target.checked)} className="w-4 h-4 accent-indigo-600" />
              Sample Required
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input type="checkbox" checked={form.bulkDiscount} onChange={(e) => set('bulkDiscount', e.target.checked)} className="w-4 h-4 accent-indigo-600" />
              Bulk Discount Expected
            </label>
          </div>
        </div>
        <button onClick={find} disabled={loading}
          className="mt-5 w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-base">
          {loading ? <><RefreshCw className="w-5 h-5 animate-spin" /> Finding Matching Artisans…</> : '🔍 Find Matching Artisans'}
        </button>
      </div>

      {/* Matching Results */}
      <AnimatePresence>
        {results && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <h2 className="font-bold text-gray-900">🎯 Matched Artisans ({matched.length} found)</h2>
            {matched.map((a, i) => (
              <motion.div key={a.artisanId} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.12 }}
                className="bg-white border border-indigo-100 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0">{a.name[0]}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-gray-900">{a.name}</span>
                      <span className="flex items-center gap-1 text-xs text-yellow-600"><Star className="w-3 h-3 fill-yellow-400 stroke-yellow-400" />{a.rating}</span>
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" />{a.region} · {a.craft}</div>
                    <div className="text-sm text-indigo-700 font-semibold mt-1">Can supply: {a.units} units</div>
                  </div>
                  <div className="text-2xl font-black text-indigo-600 shrink-0">{a.matchScore}%</div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => showToast(`Enquiry sent to ${a.name}!`)}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-xl text-sm transition-colors flex items-center justify-center gap-1">
                    <CheckCircle className="w-4 h-4" /> Send Enquiry
                  </button>
                  <button onClick={() => showToast(`Quotation requested from ${a.name}!`)}
                    className="flex-1 border border-indigo-200 text-indigo-700 font-semibold py-2 rounded-xl text-sm hover:bg-indigo-50 transition-colors flex items-center justify-center gap-1">
                    Request Quotation <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}

            {/* Cluster Coverage */}
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-5 text-center">
              <div className="text-2xl font-black text-green-700 mb-1">✅ Cluster Coverage: 105%</div>
              <p className="text-sm text-green-700">A + B + C can collectively fulfill your entire requirement of {form.quantity.toLocaleString('en-IN')} units</p>
              <button onClick={() => showToast('Bulk cluster enquiry sent to all matched artisans!')}
                className="mt-3 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors">
                Send Bulk Cluster Enquiry
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
