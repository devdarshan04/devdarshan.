import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, Mic, Sparkles } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  time: string;
}

const GREETING = `Namaste! 🙏 I'm your AI Business Manager. Ask me anything about pricing, buyers, product listings, or growing your craft business!`;

const DEMO_REPLIES: Record<string, string> = {
  default: "I'm analyzing your business data… Based on your craft profile, I suggest focusing on premium packaging to increase perceived value by 30%. (Simulated suggestion)",
  price: "Your block-print dupatta should be priced at ₹1,200–₹1,800 based on current market demand in Delhi NCR. Export pricing: $22–$28. (Simulated Data)",
  buyer: "3 new buyers from Mumbai and 1 from Germany are looking for block-print textiles this week. Want me to send them your catalogue? (Simulated)",
  order: "You have 2 pending orders: Order #KG-089 (₹4,500) and Order #KG-091 (₹12,000). Shipment due in 3 days. (Simulated Data)",
  hello: "Hello! Great to see you. Your shop has had 47 visitors today — up 23% from yesterday! Shall I help you with pricing or finding new buyers? 😊",
};

function getReply(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes('price') || lower.includes('pricing')) return DEMO_REPLIES.price;
  if (lower.includes('buyer') || lower.includes('buy')) return DEMO_REPLIES.buyer;
  if (lower.includes('order')) return DEMO_REPLIES.order;
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('namaste')) return DEMO_REPLIES.hello;
  return DEMO_REPLIES.default;
}

export default function FloatingAIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '0', role: 'assistant', text: GREETING, time: 'Now' },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    await new Promise((r) => setTimeout(r, 900 + Math.random() * 600));
    const reply: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      text: getReply(input),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setTyping(false);
    setMessages((prev) => [...prev, reply]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="w-80 sm:w-96 bg-white rounded-3xl shadow-2xl shadow-orange-200/40 border border-orange-100 overflow-hidden flex flex-col"
            style={{ height: 480 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">AI Business Manager</p>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-300 rounded-full" />
                    <p className="text-white/70 text-[10px]">Online · Simulated Demo</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/70 hover:text-white transition-colors cursor-pointer p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center mr-2 mt-1 shrink-0">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[78%] px-3 py-2.5 rounded-2xl text-xs leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-tr-sm'
                        : 'bg-white text-gray-700 shadow-sm border border-gray-100 rounded-tl-sm'
                    }`}
                  >
                    {msg.text}
                    <p className={`text-[9px] mt-1 ${msg.role === 'user' ? 'text-white/60 text-right' : 'text-gray-400'}`}>
                      {msg.time}
                    </p>
                  </div>
                </motion.div>
              ))}
              {typing && (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center shrink-0">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                  <div className="bg-white rounded-2xl px-3 py-2.5 shadow-sm border border-gray-100 flex gap-1 items-center">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                        className="w-1.5 h-1.5 bg-orange-400 rounded-full"
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
              <button className="p-2 text-orange-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-colors cursor-pointer">
                <Mic className="w-4 h-4" />
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask me anything…"
                className="flex-1 text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all"
              />
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={sendMessage}
                disabled={!input.trim()}
                className="p-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl disabled:opacity-40 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        onClick={() => setOpen(!open)}
        className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-full shadow-xl shadow-orange-300/50 flex items-center justify-center text-white cursor-pointer relative"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
        )}
      </motion.button>
    </div>
  );
}
