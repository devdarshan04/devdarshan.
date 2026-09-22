import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, ChevronDown, ChevronUp, CheckCircle2, ArrowRight } from 'lucide-react';
import { mockGrowthRecommendations } from '@/mock/data';
import GrowthOrb3D from '@/components/3d/GrowthOrb3D';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

const CYCLE = ['Product','Customer Signals','Market Demand','AI Analysis','Recommendation','Artisan Action','Feedback','AI Learns','Next Action'];

const TYPE_STYLES: Record<string, { border: string; badge: string; icon: string }> = {
  produce: { border: 'border-green-300', badge: 'bg-green-100 text-green-800', icon: '📦' },
  price: { border: 'border-blue-300', badge: 'bg-blue-100 text-blue-800', icon: '💰' },
  market: { border: 'border-purple-300', badge: 'bg-purple-100 text-purple-800', icon: '🌍' },
  seasonal: { border: 'border-yellow-300', badge: 'bg-yellow-100 text-yellow-800', icon: '🌸' },
  improve: { border: 'border-orange-300', badge: 'bg-orange-100 text-orange-800', icon: '⚡' },
};

const PRIORITY_BADGE: Record<string, string> = {
  high: 'bg-red-100 text-red-700 border border-red-200',
  medium: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
  low: 'bg-gray-100 text-gray-600 border border-gray-200',
};

const GROWTH_DIMS = [
  { subject: 'Digital', value: 82 }, { subject: 'Quality', value: 76 },
  { subject: 'Market', value: 71 }, { subject: 'Engagement', value: 84 },
  { subject: 'Catalog', value: 79 },
];

export default function GrowthEngine() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [activeStep, setActiveStep] = useState(0);
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg: string) => { setToastMsg(msg); setTimeout(() => setToastMsg(''), 3000); };

  return (
    <div className="p-4 md:p-6 max-w-6xl space-y-8">
      {/* Toast */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="fixed top-4 right-4 z-50 bg-orange-600 text-white px-5 py-3 rounded-xl shadow-xl font-medium text-sm">
            ✓ {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
          🚀 Artisan Growth Engine
        </h1>
        <p className="text-gray-500 mt-1 max-w-2xl">AI doesn't just help you sell today's product. It helps you decide what to do next.</p>
      </div>

      {/* 3D + Cycle */}
      <div className="grid md:grid-cols-2 gap-6 items-center">
        {/* 3D Orb */}
        <div className="bg-gray-950 rounded-2xl overflow-hidden shadow-xl">
          <GrowthOrb3D />
          <div className="px-4 pb-3 text-center text-white/50 text-xs">↑ Interactive 3D Growth Orb — drag to rotate</div>
        </div>

        {/* Cycle Steps */}
        <div>
          <h2 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">AI Learning Cycle</h2>
          <div className="flex flex-col gap-1">
            {CYCLE.map((step, i) => (
              <motion.div key={step} onClick={() => setActiveStep(i)} whileHover={{ x: 4 }}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer transition-all ${activeStep === i ? 'bg-orange-500 text-white shadow-md' : 'bg-gray-50 text-gray-700 hover:bg-orange-50'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${activeStep === i ? 'bg-white text-orange-600' : 'bg-orange-100 text-orange-600'}`}>{i + 1}</span>
                <span className="text-sm font-medium">{step}</span>
                {i < CYCLE.length - 1 && <span className={`ml-auto text-xs ${activeStep === i ? 'text-white/60' : 'text-gray-300'}`}>↓</span>}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Quote */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl p-6">
        <p className="text-lg font-semibold leading-relaxed text-center italic text-white/90">
          "KarigarAI doesn't stop at digitizing a product. It continuously learns from markets and helps artisans decide what to make next, who to sell to, how much to charge, and when to act."
        </p>
      </div>

      {/* Recommendation Cards */}
      <div>
        <h2 className="font-bold text-gray-900 text-lg mb-4">🎯 AI Recommendations for You</h2>
        <div className="space-y-4">
          {mockGrowthRecommendations.map((rec, i) => {
            const style = TYPE_STYLES[rec.type];
            const isExpanded = expanded === rec.id;
            const isDone = completed.has(rec.id);
            return (
              <motion.div key={rec.id} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                className={`bg-white border-l-4 ${style.border} border border-gray-100 rounded-2xl shadow-sm overflow-hidden ${isDone ? 'opacity-60' : ''}`}>
                <div className="p-5">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{style.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-gray-900">{rec.title}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${style.badge}`}>{rec.type}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold uppercase ${PRIORITY_BADGE[rec.priority]}`}>{rec.priority}</span>
                        {isDone && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1"><CheckCircle2 className="w-3 h-3" />Done</span>}
                      </div>
                      <p className="text-sm text-gray-600 mt-1 leading-relaxed">{rec.reason}</p>
                    </div>
                    <button onClick={() => setExpanded(isExpanded ? null : rec.id)} className="text-gray-400 hover:text-gray-700 shrink-0 mt-0.5">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden">
                        <div className="mt-4 space-y-3 text-sm">
                          <div className="bg-blue-50 rounded-xl p-3"><span className="font-semibold text-blue-800">📊 Evidence: </span><span className="text-blue-700">{rec.evidence}</span></div>
                          <div className="bg-orange-50 rounded-xl p-3"><span className="font-semibold text-orange-800">✅ Recommended Action: </span><span className="text-orange-700">{rec.action}</span></div>
                          <div className="bg-green-50 rounded-xl p-3"><span className="font-semibold text-green-800">💰 Opportunity: </span><span className="text-green-700">{rec.opportunity}</span></div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex gap-2 mt-3 flex-wrap">
                    {!isDone && (
                      <button onClick={() => { showToast(`Action plan for "${rec.title}" started!`); navigate('/artisan/pricing'); }}
                        className="px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1">
                        Take Action <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                    <button onClick={() => setCompleted((prev) => { const next = new Set(prev); isDone ? next.delete(rec.id) : next.add(rec.id); return next; })}
                      className={`px-4 py-1.5 text-xs font-bold rounded-lg border transition-colors ${isDone ? 'border-gray-200 text-gray-500 hover:bg-gray-50' : 'border-green-200 text-green-700 hover:bg-green-50'}`}>
                      {isDone ? 'Undo' : 'Mark as Done'}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Growth Score */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-600" /> Artisan Growth Score
            </h2>
            <p className="text-green-600 text-sm font-medium">↑ Increased by 12 points this month!</p>
          </div>
          <div className="text-5xl font-black text-purple-600">78<span className="text-lg text-gray-400 font-normal">/100</span></div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            {[['Digital Readiness', 82, 'bg-orange-500'], ['Product Quality', 76, 'bg-purple-500'], ['Market Reach', 71, 'bg-blue-500'], ['Buyer Engagement', 84, 'bg-green-500'], ['Catalog Quality', 79, 'bg-yellow-500']].map(([label, val, color]) => (
              <div key={label as string} className="mb-3">
                <div className="flex justify-between text-sm mb-1"><span className="text-gray-600">{label as string}</span><span className="font-bold text-gray-800">{val as number}%</span></div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${val}%` }} transition={{ duration: 1, ease: 'easeOut' }}
                    className={`h-full rounded-full ${color as string}`} />
                </div>
              </div>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={GROWTH_DIMS}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
              <Radar dataKey="value" stroke="#f97316" fill="#f97316" fillOpacity={0.25} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
