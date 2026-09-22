import { useState } from 'react';
import { motion } from 'framer-motion';
import { mockEnquiries } from '@/mock/data';
import { MessageSquare, X, CheckCircle, Clock } from 'lucide-react';

const TABS = ['All', 'New', 'In Progress', 'Quoted', 'Closed'];
const STATUS_STYLE: Record<string, string> = {
  new: 'bg-green-100 text-green-700',
  in_progress: 'bg-blue-100 text-blue-700',
  quoted: 'bg-purple-100 text-purple-700',
  closed: 'bg-gray-100 text-gray-500',
};

export default function BuyerEnquiries() {
  const [tab, setTab] = useState('All');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState('');

  const filtered = tab === 'All' ? mockEnquiries : mockEnquiries.filter((e) => {
    if (tab === 'New') return e.status === 'new';
    if (tab === 'In Progress') return e.status === 'in_progress';
    if (tab === 'Quoted') return e.status === 'quoted';
    if (tab === 'Closed') return e.status === 'closed';
    return true;
  });

  const selected = mockEnquiries.find((e) => e.id === selectedId);
  const showToast = (msg: string) => { setToastMsg(msg); setTimeout(() => setToastMsg(''), 3000); };

  return (
    <div className="p-4 md:p-6 max-w-4xl space-y-5">
      {toastMsg && <div className="fixed top-4 right-4 z-50 bg-orange-600 text-white px-5 py-3 rounded-xl shadow-xl font-medium text-sm">✓ {toastMsg}</div>}

      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><MessageSquare className="w-6 h-6 text-blue-600" /> Buyer Enquiries</h1>
        <p className="text-gray-500 text-sm mt-1">Manage inbound buyer enquiries and send quotations</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap border-b border-gray-100 pb-3">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${tab === t ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {t}
          </button>
        ))}
      </div>

      {/* Enquiry list */}
      <div className="space-y-3">
        {filtered.map((e, i) => (
          <motion.div key={e.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            onClick={() => setSelectedId(e.id === selectedId ? null : e.id)}
            className={`bg-white border rounded-2xl p-5 shadow-sm cursor-pointer hover:border-orange-200 transition-colors ${selectedId === e.id ? 'border-orange-300' : 'border-gray-100'}`}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shrink-0">{e.buyerName[0]}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-gray-900">{e.buyerName}</span>
                  <span className="text-xs text-gray-400">·</span>
                  <span className="text-sm text-gray-500">{e.company}</span>
                  <span className={`ml-auto text-xs px-2 py-0.5 rounded-full font-semibold ${STATUS_STYLE[e.status]}`}>{e.status.replace('_', ' ')}</span>
                </div>
                <div className="text-sm text-gray-600 mt-0.5">{e.product} · Qty: {e.quantity} · Budget: ₹{e.budgetPerUnit.toLocaleString('en-IN')}/unit</div>
                <div className="flex gap-3 text-xs text-gray-400 mt-1"><span><Clock className="w-3 h-3 inline mr-1" />{e.date}</span><span className="text-blue-600 font-medium">Match: {e.matchScore}%</span></div>
              </div>
            </div>
            {selectedId === e.id && (
              <div className="mt-4 space-y-3 border-t border-gray-100 pt-4">
                <p className="text-sm text-gray-700 italic bg-gray-50 rounded-lg p-3">"{e.message}"</p>
                <div className="flex gap-2 flex-wrap">
                  <button onClick={(ev) => { ev.stopPropagation(); showToast('Quotation sent to buyer!'); }}
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-xl transition-colors flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" /> Send Quote
                  </button>
                  <button onClick={(ev) => { ev.stopPropagation(); showToast('Enquiry declined.'); }}
                    className="px-4 py-2 border border-red-200 text-red-600 text-sm font-medium rounded-xl hover:bg-red-50 transition-colors flex items-center gap-1">
                    <X className="w-4 h-4" /> Decline
                  </button>
                  <button onClick={(ev) => ev.stopPropagation()}
                    className="px-4 py-2 border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors">
                    Message Buyer
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        ))}
        {filtered.length === 0 && <div className="text-center py-12 text-gray-400">No enquiries in this category yet.</div>}
      </div>
    </div>
  );
}
