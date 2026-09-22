import { useState } from 'react';
import { motion } from 'framer-motion';
import { mockAdminStats, mockMonthlyData, mockCraftCategories, mockRegionalData } from '@/mock/data';
import IndiaMap3D from '@/components/3d/IndiaMap3D';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from 'recharts';
import { AlertTriangle, Users, Package, TrendingUp, MessageSquare, ShoppingCart, Zap } from 'lucide-react';

const STATS = [
  { label: 'Total Artisans', value: '1,28,450', icon: Users, color: 'text-orange-600', bg: 'bg-orange-50' },
  { label: 'Products Digitized', value: '3,84,920', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'B2B Matches', value: '42,680', icon: Zap, color: 'text-purple-600', bg: 'bg-purple-50' },
  { label: 'Buyer Enquiries', value: '18,430', icon: MessageSquare, color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Orders Generated', value: '12,760', icon: ShoppingCart, color: 'text-teal-600', bg: 'bg-teal-50' },
  { label: 'Market Value', value: '₹82 Cr', icon: TrendingUp, color: 'text-red-600', bg: 'bg-red-50' },
];

const COLORS = ['#f97316', '#6366f1', '#16a34a', '#0891b2', '#dc2626', '#ca8a04', '#9ca3af'];

export default function AdminDashboard() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const region = mockRegionalData.find((r) => r.state === selectedRegion);

  return (
    <div className="p-4 md:p-6 max-w-7xl space-y-6">
      {/* Prototype banner */}
      <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-300 rounded-xl px-4 py-2 text-yellow-800 text-sm">
        <AlertTriangle className="w-4 h-4 shrink-0" />
        <strong>Prototype Analytics — Simulated Data.</strong>&nbsp;All metrics are generated for SIH 2026 demonstration purposes only. Not real government data.
      </div>

      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">National Artisan Intelligence Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">KarigarAI Platform Overview · SIH 2026 Prototype · Simulated Data</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {STATS.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className={`${s.bg} rounded-2xl p-4 shadow-sm`}>
            <div className={`${s.color} mb-2`}><s.icon className="w-5 h-5" /></div>
            <div className={`text-xl font-black ${s.color}`}>{s.value}</div>
            <div className="text-xs text-gray-500 mt-1 leading-tight">{s.label}</div>
            <div className="text-xs text-gray-400 italic">*simulated</div>
          </motion.div>
        ))}
      </div>

      {/* 3D Map + Region Info */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gray-950 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-3 text-white/50 text-xs font-medium">🌍 Artisan Distribution Map — Click a region dot</div>
          <IndiaMap3D onRegionClick={setSelectedRegion} />
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-3">
            {region ? `📍 ${region.state}` : '📊 Regional Overview'}
          </h3>
          {region ? (
            <div className="space-y-3">
              {[
                ['Artisans', region.artisans.toLocaleString('en-IN')],
                ['Products', region.products.toLocaleString('en-IN')],
                ['B2B Enquiries', region.enquiries.toLocaleString('en-IN')],
                ['Top Craft', region.topCraft],
                ['Growth Rate', `+${region.growthRate}% MoM`],
              ].map(([k, v]) => (
                <div key={k as string} className="flex justify-between text-sm py-2 border-b border-gray-50">
                  <span className="text-gray-500">{k as string}</span>
                  <span className="font-bold text-gray-900">{v as string}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {mockRegionalData.map((r) => (
                <div key={r.state} className="flex items-center gap-3 text-sm cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors" onClick={() => setSelectedRegion(r.state)}>
                  <div className="w-2 h-2 rounded-full bg-orange-400 shrink-0" />
                  <span className="font-medium text-gray-700 flex-1">{r.state}</span>
                  <span className="text-gray-500">{r.artisans.toLocaleString('en-IN')}</span>
                  <span className="text-green-600 text-xs font-medium">+{r.growthRate}%</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 text-sm">Artisan Onboarding Trend (Monthly) <span className="text-gray-400 font-normal">· simulated</span></h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={mockMonthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} interval={2} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Area type="monotone" dataKey="artisans" stroke="#f97316" fill="#fed7aa" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 text-sm">Craft Category Distribution <span className="text-gray-400 font-normal">· simulated</span></h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={mockCraftCategories} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, value }) => `${name} ${value}%`} labelLine={false}>
                {mockCraftCategories.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 text-sm">B2B Enquiry Volume <span className="text-gray-400 font-normal">· simulated</span></h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={mockMonthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} interval={2} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Line type="monotone" dataKey="enquiries" stroke="#6366f1" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="orders" stroke="#16a34a" strokeWidth={2} dot={false} />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 text-sm">Regional Artisan Distribution <span className="text-gray-400 font-normal">· simulated</span></h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={mockRegionalData} layout="vertical" barSize={16}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis type="category" dataKey="state" tick={{ fontSize: 10 }} width={80} />
              <Tooltip />
              <Bar dataKey="artisans" fill="#f97316" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
