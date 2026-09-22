import { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Award, Edit3, Check, Package } from 'lucide-react';

const PORTFOLIO = [
  { name: 'Bamboo Basket Set', cat: 'Bamboo Craft', img: 'https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd?w=200' },
  { name: 'Block Print Saree', cat: 'Handloom', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200' },
  { name: 'Woven Wall Hanging', cat: 'Textile Art', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200' },
  { name: 'Bamboo Tray Set', cat: 'Bamboo Craft', img: 'https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd?w=200' },
];

const CERTS = [
  { icon: '🏛️', label: 'Government Recognized', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { icon: '🌿', label: 'Eco-Certified', color: 'bg-green-100 text-green-800 border-green-200' },
  { icon: '🤝', label: 'B2B Ready', color: 'bg-orange-100 text-orange-800 border-orange-200' },
];

const MILESTONES = [
  { year: '2006', event: 'Began bamboo weaving apprenticeship under master artisan Subramaniam' },
  { year: '2010', event: 'Started independent craft practice in Thanjavur' },
  { year: '2016', event: 'Received GI Tag certification for Thanjavur bamboo craft' },
  { year: '2022', event: 'First B2B export order to Singapore hotel chain' },
  { year: '2026', event: 'Joined KarigarAI — digital transformation begins!' },
];

export default function DigitalCraftIdentity() {
  const [editMode, setEditMode] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const showToast = (msg: string) => { setToastMsg(msg); setTimeout(() => setToastMsg(''), 3000); };

  return (
    <div className="p-4 md:p-6 max-w-4xl space-y-6">
      {toastMsg && <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-5 py-3 rounded-xl shadow-xl font-medium text-sm">✓ {toastMsg}</div>}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Digital Craft Identity</h1>
          <p className="text-gray-500 text-sm mt-1">Your premium digital artisan profile</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => showToast('Profile link copied to clipboard!')}
            className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">
            <Share2 className="w-4 h-4" /> Share
          </button>
          <button onClick={() => setEditMode(!editMode)}
            className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-orange-600 transition-colors">
            {editMode ? <><Check className="w-4 h-4" /> Save</> : <><Edit3 className="w-4 h-4" /> Edit Profile</>}
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-orange-500 to-terracotta-600 text-white rounded-2xl p-6 shadow-xl"
        style={{ background: 'linear-gradient(135deg, #f97316 0%, #de5a37 60%, #9a4710 100%)' }}>
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center text-4xl shrink-0 font-black text-white border-2 border-white/40">
            MD
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-black">Meera Devi</h2>
            <div className="text-white/80 text-sm mt-1">Bamboo &amp; Block Print Craft · Thanjavur, Tamil Nadu</div>
            <div className="flex flex-wrap gap-3 mt-3 text-sm">
              <span>⭐ 4.8 Rating</span>
              <span>📅 18 Years Experience</span>
              <span>📦 12 Products</span>
              <span>🏭 50 units/month</span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span className="bg-white/20 border border-white/40 text-white text-xs px-3 py-1 rounded-full font-bold">🏺 Thanjavur Craft — GI Certified</span>
            </div>
          </div>
          <div className="bg-white/10 border border-white/30 rounded-xl p-3 text-center shrink-0 hidden sm:block">
            <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center text-2xl mb-1">📱</div>
            <div className="text-xs text-white/70">QR Profile</div>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Identity Details */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
          <h3 className="font-bold text-gray-900">Craft Details</h3>
          {[
            ['Traditional Technique', 'Korai grass weaving combined with bamboo split technique, passed down 3 generations'],
            ['B2B Availability', 'Yes — MOQ 20 units, can scale to 150 units with advance orders'],
            ['Languages', 'Tamil (Native), Basic Hindi, Basic English'],
            ['Production Capacity', '50 units/month regular, 150 units/month with advance order (45 days)'],
          ].map(([label, val]) => (
            <div key={label as string}>
              <div className="text-xs text-gray-400 uppercase tracking-wide">{label as string}</div>
              <div className="text-sm text-gray-800 font-medium mt-0.5">{val as string}</div>
            </div>
          ))}
        </div>

        {/* Craft Story */}
        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-2">Craft Story</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            Born into a family of weavers in Thanjavur, Meera Devi learned bamboo weaving at age 8 from her grandmother.
            Her work carries the soul of Tamil Nadu's ancient korai grass tradition.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed mt-2">
            Today, she leads a small collective of 6 women artisans, blending heritage techniques with contemporary design
            to create products sought by luxury hotels and export buyers across 3 countries.
          </p>
        </div>
      </div>

      {/* Certifications */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><Award className="w-4 h-4 text-yellow-600" /> Certifications</h3>
        <div className="flex flex-wrap gap-3">
          {CERTS.map((c) => (
            <div key={c.label} className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold ${c.color}`}>
              <span className="text-lg">{c.icon}</span> {c.label}
            </div>
          ))}
        </div>
      </div>

      {/* Product Portfolio */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><Package className="w-4 h-4 text-orange-500" /> Product Portfolio</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {PORTFOLIO.map((p) => (
            <div key={p.name} className="rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
              <img src={p.img} alt={p.name} className="w-full h-24 object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x100'; }} />
              <div className="p-2">
                <div className="text-xs font-semibold text-gray-800 truncate">{p.name}</div>
                <div className="text-xs text-gray-400">{p.cat}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Milestones Timeline */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4">Achievement Timeline</h3>
        <div className="space-y-3">
          {MILESTONES.map((m, i) => (
            <div key={m.year} className="flex gap-4 items-start">
              <div className="flex flex-col items-center shrink-0">
                <div className={`w-3 h-3 rounded-full ${i === MILESTONES.length - 1 ? 'bg-orange-500' : 'bg-gray-300'}`} />
                {i < MILESTONES.length - 1 && <div className="w-0.5 h-8 bg-gray-200 mt-1" />}
              </div>
              <div>
                <span className="text-xs font-bold text-orange-600">{m.year}</span>
                <p className="text-sm text-gray-700">{m.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
