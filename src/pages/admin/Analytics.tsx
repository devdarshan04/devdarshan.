import { mockMonthlyData, mockCraftCategories, mockRegionalData, mockAdminStats } from '@/mock/data';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from 'recharts';
import { AlertTriangle } from 'lucide-react';

const COLORS = ['#f97316','#6366f1','#16a34a','#0891b2','#dc2626','#ca8a04','#9ca3af'];

const LANG_DATA = mockAdminStats.languageBreakdown.map((l) => ({ name: l.language, value: l.percentage, fill: l.color }));

const GROWTH_DIST = [
  { score: '40-50', count: 8200 }, { score: '50-60', count: 22400 }, { score: '60-70', count: 38600 },
  { score: '70-80', count: 41200 }, { score: '80-90', count: 15400 }, { score: '90-100', count: 2650 },
];

export default function AdminAnalytics() {
  return (
    <div className="p-4 md:p-6 max-w-7xl space-y-6">
      <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-300 rounded-xl px-4 py-2 text-yellow-800 text-sm">
        <AlertTriangle className="w-4 h-4 shrink-0" />
        <strong>Prototype Analytics — Simulated Data</strong>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-gray-900">Platform Analytics</h1>
        <p className="text-gray-500 text-sm mt-1">Deep-dive metrics — All data simulated for SIH 2026 demo</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* 1 */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-3 text-sm">Monthly Artisan Onboarding <span className="text-gray-400 font-normal">· simulated</span></h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={mockMonthlyData}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis dataKey="month" tick={{fontSize:10}} interval={2}/><YAxis tick={{fontSize:10}}/><Tooltip/><Line type="monotone" dataKey="artisans" stroke="#f97316" strokeWidth={2} dot={false}/></LineChart>
          </ResponsiveContainer>
        </div>
        {/* 2 */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-3 text-sm">Products Digitized per Month <span className="text-gray-400 font-normal">· simulated</span></h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={mockMonthlyData} barSize={20}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/><XAxis dataKey="month" tick={{fontSize:10}} interval={2}/><YAxis tick={{fontSize:10}}/><Tooltip/><Bar dataKey="products" fill="#6366f1" radius={[4,4,0,0]}/></BarChart>
          </ResponsiveContainer>
        </div>
        {/* 3 */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-3 text-sm">Craft Category Distribution <span className="text-gray-400 font-normal">· simulated</span></h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart><Pie data={mockCraftCategories} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label={({name,value})=>`${name} ${value}%`} labelLine={false}>{mockCraftCategories.map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}</Pie><Tooltip/></PieChart>
          </ResponsiveContainer>
        </div>
        {/* 4 */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-3 text-sm">Regional Adoption by State <span className="text-gray-400 font-normal">· simulated</span></h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={mockRegionalData} layout="vertical" barSize={14}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false}/><XAxis type="number" tick={{fontSize:10}}/><YAxis type="category" dataKey="state" tick={{fontSize:10}} width={80}/><Tooltip/><Bar dataKey="artisans" fill="#16a34a" radius={[0,4,4,0]}/></BarChart>
          </ResponsiveContainer>
        </div>
        {/* 5 */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-3 text-sm">Language Usage Distribution <span className="text-gray-400 font-normal">· simulated</span></h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart><Pie data={LANG_DATA} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label={({name,value})=>`${name} ${value}%`} labelLine={false}>{LANG_DATA.map((entry,i)=><Cell key={i} fill={entry.fill}/>)}</Pie><Tooltip/></PieChart>
          </ResponsiveContainer>
        </div>
        {/* 6 */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-3 text-sm">B2B Enquiry vs Orders <span className="text-gray-400 font-normal">· simulated</span></h3>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={mockMonthlyData}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/><XAxis dataKey="month" tick={{fontSize:10}} interval={2}/><YAxis tick={{fontSize:10}}/><Tooltip/><Area type="monotone" dataKey="enquiries" stroke="#6366f1" fill="#e0e7ff" strokeWidth={2}/><Area type="monotone" dataKey="orders" stroke="#16a34a" fill="#dcfce7" strokeWidth={2}/><Legend/></AreaChart>
          </ResponsiveContainer>
        </div>
        {/* 7 */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-3 text-sm">Growth Score Distribution <span className="text-gray-400 font-normal">· simulated</span></h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={GROWTH_DIST} barSize={24}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/><XAxis dataKey="score" tick={{fontSize:10}}/><YAxis tick={{fontSize:10}}/><Tooltip/><Bar dataKey="count" radius={[4,4,0,0]}>{GROWTH_DIST.map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}</Bar></BarChart>
          </ResponsiveContainer>
        </div>
        {/* 8 */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-3 text-sm">Regional B2B Demand <span className="text-gray-400 font-normal">· simulated</span></h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={mockRegionalData} barSize={18}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/><XAxis dataKey="state" tick={{fontSize:10}}/><YAxis tick={{fontSize:10}}/><Tooltip/><Bar dataKey="enquiries" fill="#f97316" radius={[4,4,0,0]}/></BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
