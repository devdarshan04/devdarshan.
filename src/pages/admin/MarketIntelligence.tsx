import { mockMonthlyData } from '@/mock/data';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { AlertTriangle, TrendingUp } from 'lucide-react';

const SECTORS = [
  { name: 'Export Buyers', value: 520, color: '#f97316' },
  { name: 'Hotel & Resort Décor', value: 240, color: '#6366f1' },
  { name: 'Corporate Gifting', value: 180, color: '#16a34a' },
  { name: 'Home Décor Retail', value: 140, color: '#0891b2' },
  { name: 'Handicraft Stores', value: 85, color: '#dc2626' },
];

const SEASONAL = [
  { month: 'Jan', index: 60 },{ month: 'Feb', index: 55 },{ month: 'Mar', index: 70 },
  { month: 'Apr', index: 65 },{ month: 'May', index: 80 },{ month: 'Jun', index: 75 },
  { month: 'Jul', index: 85 },{ month: 'Aug', index: 90 },{ month: 'Sep', index: 130 },
  { month: 'Oct', index: 185 },{ month: 'Nov', index: 340 },{ month: 'Dec', index: 220 },
];

const GROWTH_CATS = [
  { name: 'Eco-friendly Gifting', growth: 18 },
  { name: 'Sustainable Décor', growth: 14 },
  { name: 'Organic Textiles', growth: 11 },
  { name: 'Bamboo Products', growth: 22 },
  { name: 'Natural Dye Textiles', growth: 9 },
];

const INSIGHTS = [
  { icon: '📈', color: 'bg-green-50 border-green-200 text-green-800', text: 'Eco-friendly home décor demand increased 18% in simulated dataset' },
  { icon: '🎁', color: 'bg-blue-50 border-blue-200 text-blue-800', text: 'Corporate gifting for Indian crafts growing at 23% YoY (simulated)' },
  { icon: '🌍', color: 'bg-orange-50 border-orange-200 text-orange-800', text: 'South Indian crafts gaining international visibility — export enquiries up 31%' },
  { icon: '🌸', color: 'bg-purple-50 border-purple-200 text-purple-800', text: 'Festival season demand spike: 340% above baseline in October–November' },
  { icon: '💰', color: 'bg-yellow-50 border-yellow-200 text-yellow-800', text: 'Average artisan product price appreciated 12% over the simulated period' },
  { icon: '🤝', color: 'bg-teal-50 border-teal-200 text-teal-800', text: 'B2B matching conversion rate improved from 8% to 23% with AI-assisted catalog' },
];

export default function MarketIntelligence() {
  return (
    <div className="p-4 md:p-6 max-w-7xl space-y-6">
      <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-300 rounded-xl px-4 py-2 text-yellow-800 text-sm">
        <AlertTriangle className="w-4 h-4 shrink-0" />
        <strong>Prototype Analytics — Simulated Data</strong>. Not real market intelligence.
      </div>

      <div>
        <h1 className="text-2xl font-bold text-gray-900">National Craft Market Intelligence</h1>
        <p className="text-gray-500 text-sm mt-1">Simulated market signals for SIH 2026 prototype</p>
      </div>

      {/* Insight Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {INSIGHTS.map((ins) => (
          <div key={ins.text} className={`border rounded-xl p-4 text-sm flex items-start gap-3 ${ins.color}`}>
            <span className="text-xl shrink-0">{ins.icon}</span>
            <span className="leading-relaxed">{ins.text}</span>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* B2B Sector Sizes */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-1 text-sm">Top B2B Market Sectors (₹ Cr) <span className="text-gray-400 font-normal">· simulated</span></h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={SECTORS} layout="vertical" barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={120} />
              <Tooltip formatter={(v) => `₹${v} Cr`} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {SECTORS.map((s, i) => <Cell key={i} fill={s.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Seasonal Demand */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-1 text-sm">Seasonal Demand Index <span className="text-gray-400 font-normal">· simulated</span></h3>
          <p className="text-xs text-gray-400 mb-3">Base = 100. Festival peak visible in Oct–Nov.</p>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={SEASONAL}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Line type="monotone" dataKey="index" stroke="#f97316" strokeWidth={2.5} dot={{ fill: '#f97316', r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Fast-Growing Categories */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-3 text-sm">Fast-Growing Categories (YoY %) <span className="text-gray-400 font-normal">· simulated</span></h3>
          <div className="space-y-3">
            {GROWTH_CATS.map((c) => (
              <div key={c.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{c.name}</span>
                  <span className="font-bold text-green-600">+{c.growth}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full" style={{ width: `${c.growth * 4}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Export vs Domestic */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-3 text-sm">Export vs Domestic Split <span className="text-gray-400 font-normal">· simulated</span></h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={[{ name: 'Domestic', value: 68 }, { name: 'Export', value: 32 }]} dataKey="value" cx="50%" cy="50%" outerRadius={80} label={({ name, value }) => `${name} ${value}%`}>
                <Cell fill="#f97316" />
                <Cell fill="#6366f1" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="text-center text-xs text-indigo-600 font-medium mt-1">
            <TrendingUp className="w-3 h-3 inline mr-1" />Export share growing +4% from simulated baseline
          </div>
        </div>
      </div>
    </div>
  );
}
