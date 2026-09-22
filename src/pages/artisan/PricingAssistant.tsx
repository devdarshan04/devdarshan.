import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calculator, RefreshCw, ArrowRight, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { sleep } from '@/lib/utils';

const CATEGORIES = ['Bamboo Craft', 'Handloom', 'Pottery', 'Block Print', 'Metal Craft', 'Leather Craft', 'Silk Weaving', 'Terracotta'];
const DEMAND_OPTS = ['Low', 'Medium', 'High', 'Very High'];
const SEASON_OPTS = ['Regular', 'Festival', 'Wedding', 'Export'];
const REGION_OPTS = ['Local', 'Regional', 'National', 'Export'];

interface Inputs {
  material: number; labourDays: number; labourRate: number;
  category: string; quantity: number; demand: string; season: string; region: string;
}

interface Result {
  material: number; labour: number; overhead: number; market: number; demand: number; seasonPremium: number;
  min: number; max: number; recommended: number;
  insights: string[];
}

function computePrice(inputs: Inputs): Result {
  const { material, labourDays, labourRate, demand, season, region } = inputs;
  const labour = labourDays * labourRate;
  const overhead = Math.round((material + labour) * 0.15);
  const base = material + labour + overhead;
  const marketBoost = Math.round(base * (region === 'Export' ? 0.45 : region === 'National' ? 0.32 : 0.18));
  const demandMap: Record<string, number> = { Low: 0, Medium: 100, High: 200, 'Very High': 350 };
  const demandAdj = demandMap[demand] ?? 0;
  const seasonMap: Record<string, number> = { Regular: 0, Festival: Math.round(base * 0.08), Wedding: Math.round(base * 0.12), Export: Math.round(base * 0.18) };
  const seasonPremium = seasonMap[season] ?? 0;
  const total = base + marketBoost + demandAdj + seasonPremium;
  const min = Math.round(total * 0.94 / 50) * 50;
  const max = Math.round(total * 1.15 / 50) * 50;
  const recommended = Math.round(total / 50) * 50;
  const insights = [
    `${season} season adds ${season === 'Regular' ? 'no' : '+'  + Math.round(seasonPremium / total * 100) + '%'} premium in your category`,
    `Similar products sell between ₹${(min - 200).toLocaleString('en-IN')}–₹${(max + 200).toLocaleString('en-IN')} in the ${region.toLowerCase()} market`,
    `${demand} demand ${demandAdj > 0 ? `boosts recommended price by ₹${demandAdj.toLocaleString('en-IN')}` : 'keeps price at base level'}`,
    `Your margin at recommended price: ${Math.round((recommended - material - labour) / recommended * 100)}%`,
  ];
  return { material, labour, overhead, market: marketBoost, demand: demandAdj, seasonPremium, min, max, recommended, insights };
}

export default function PricingAssistant() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<Inputs>({
    material: 1200, labourDays: 3, labourRate: 300,
    category: 'Bamboo Craft', quantity: 50, demand: 'High', season: 'Festival', region: 'National',
  });
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);

  const set = (key: keyof Inputs, val: string | number) => setInputs((p) => ({ ...p, [key]: val }));

  const calculate = async () => {
    setLoading(true);
    await sleep(1400);
    setResult(computePrice(inputs));
    setLoading(false);
  };

  const chartData = result ? [
    { name: 'Material', value: result.material, fill: '#f97316' },
    { name: 'Labour', value: result.labour, fill: '#6366f1' },
    { name: 'Overhead', value: result.overhead, fill: '#9ca3af' },
    { name: 'Market +', value: result.market, fill: '#16a34a' },
    { name: 'Demand +', value: result.demand, fill: '#0891b2' },
    { name: 'Season +', value: result.seasonPremium, fill: '#ca8a04' },
  ] : [];

  return (
    <div className="p-4 md:p-6 max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Calculator className="w-7 h-7 text-emerald-600" /> AI Pricing Assistant
        </h1>
        <p className="text-gray-500 mt-1">Get an AI-recommended price range based on cost, market data, and demand signals</p>
        <div className="flex items-center gap-2 mt-2 text-xs text-yellow-700 bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-1.5 w-fit">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
          ⚠️ Simulated Data — Not real market prices
        </div>
      </div>

      {/* Input Form */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h2 className="font-bold text-gray-900 mb-4">Product Cost Inputs</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { label: 'Raw Material Cost (₹)', key: 'material', type: 'number' },
            { label: 'Labour Days', key: 'labourDays', type: 'number' },
            { label: 'Labour Rate per Day (₹)', key: 'labourRate', type: 'number' },
            { label: 'Quantity Available', key: 'quantity', type: 'number' },
          ].map(({ label, key, type }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input type={type} value={(inputs as unknown as Record<string, number | string>)[key]}
                onChange={(e) => set(key as keyof Inputs, Number(e.target.value))}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-400 text-sm" />
            </div>
          ))}
          {[
            { label: 'Product Category', key: 'category', opts: CATEGORIES },
            { label: 'Current Demand', key: 'demand', opts: DEMAND_OPTS },
            { label: 'Season', key: 'season', opts: SEASON_OPTS },
            { label: 'Market Region', key: 'region', opts: REGION_OPTS },
          ].map(({ label, key, opts }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <select value={(inputs as unknown as Record<string, string>)[key]} onChange={(e) => set(key as keyof Inputs, e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-400 text-sm bg-white">
                {opts.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
        <button onClick={calculate} disabled={loading}
          className="mt-5 w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-base">
          {loading ? <><RefreshCw className="w-5 h-5 animate-spin" /> Calculating AI Price…</> : <><Calculator className="w-5 h-5" /> Calculate AI Price</>}
        </button>
      </div>

      {/* Result */}
      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            {/* Price recommendation card */}
            <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl p-6 shadow-xl">
              <div className="text-sm font-medium text-white/80 mb-1">AI Recommended Price Range</div>
              <div className="text-4xl font-black mb-1">₹{result.min.toLocaleString('en-IN')} – ₹{result.max.toLocaleString('en-IN')}</div>
              <div className="text-lg font-bold text-white/90">Recommended Test Price: ₹{result.recommended.toLocaleString('en-IN')}</div>
              <p className="text-xs text-white/70 mt-2">⚠️ Simulated Data — Based on mock market analysis</p>
            </div>

            {/* Breakdown + Chart */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-3">Cost Breakdown</h3>
                <div className="space-y-2 text-sm">
                  {[
                    ['Raw Material', result.material, 'text-gray-700'],
                    ['Labour', result.labour, 'text-gray-700'],
                    ['Overhead (15%)', result.overhead, 'text-gray-700'],
                    ['Market Comparison', result.market, 'text-green-700'],
                    ['Demand Adjustment', result.demand, 'text-blue-700'],
                    ['Season Premium', result.seasonPremium, 'text-yellow-700'],
                  ].map(([label, val, cls]) => (
                    <div key={label as string} className="flex justify-between py-1 border-b border-gray-50">
                      <span className="text-gray-500">{label as string}</span>
                      <span className={`font-semibold ${cls as string}`}>₹{(val as number).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-2 font-bold text-lg border-t-2 border-gray-200">
                    <span>Recommended</span>
                    <span className="text-emerald-600">₹{result.recommended.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-3">Price Components Chart</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={chartData} barSize={28}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip formatter={(v) => `₹${Number(v).toLocaleString('en-IN')}`} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {chartData.map((entry, i) => (
                        <rect key={i} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Insights */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
              <h3 className="font-bold text-blue-900 mb-3">💡 AI Insights</h3>
              <ul className="space-y-2">
                {result.insights.map((insight) => (
                  <li key={insight} className="text-sm text-blue-800 flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">•</span> {insight}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3 flex-wrap">
              <button onClick={() => navigate('/artisan/find-buyers')}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm">
                Find Buyers at This Price <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => setResult(null)}
                className="px-5 py-3 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium">
                Adjust & Recalculate
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
