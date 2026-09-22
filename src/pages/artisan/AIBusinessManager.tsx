import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAIChatResponse, mockAIChatResponses } from '@/mock/data';
import { Mic, Send, RefreshCw } from 'lucide-react';

interface Message { id: string; role: 'user' | 'ai'; text: string; time: string; }

const SUGGESTED = [
  'What should I make next?','Where can I sell this?','How should I price my product?',
  'Which buyers are interested?','How can I improve my listing?',
  'Translate my product into Hindi','Create a bulk-order description','What is my growth score?',
];

const GREETING = `👋 Namaste! I'm **KarigarAI Business Manager**, your AI-powered advisor.\n\nI can help you with market insights, pricing, product improvements, and finding buyers. Ask me anything about your craft business!`;

function ChatBubble({ msg }: { msg: Message }) {
  const isAI = msg.role === 'ai';
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isAI ? '' : 'flex-row-reverse'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 font-bold ${isAI ? 'bg-orange-500 text-white' : 'bg-blue-600 text-white'}`}>
        {isAI ? '🤖' : 'MD'}
      </div>
      <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${isAI ? 'bg-orange-50 border border-orange-100 text-gray-800' : 'bg-blue-600 text-white'}`}>
        {msg.text.replace(/\*\*(.*?)\*\*/g, '$1')}
        <div className={`text-xs mt-1 ${isAI ? 'text-gray-400' : 'text-blue-200'}`}>{msg.time}</div>
      </div>
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm shrink-0">🤖</div>
      <div className="bg-orange-50 border border-orange-100 rounded-2xl px-4 py-3 flex gap-1 items-center">
        {[0, 1, 2].map((i) => (
          <motion.div key={i} className="w-2 h-2 bg-orange-400 rounded-full"
            animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
        ))}
      </div>
    </div>
  );
}

export default function AIBusinessManager() {
  const now = () => new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  const [messages, setMessages] = useState<Message[]>([
    { id: '0', role: 'ai', text: GREETING, time: now() },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

  const send = async (query: string) => {
    if (!query.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: query, time: now() };
    setMessages((p) => [...p, userMsg]);
    setInput('');
    setTyping(true);
    const response = await getAIChatResponse(query);
    setTyping(false);
    setMessages((p) => [...p, { id: Date.now().toString() + 'ai', role: 'ai', text: response, time: now() }]);
  };

  const handleKey = (e: React.KeyboardEvent) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); } };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-3xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-700 text-white rounded-2xl p-4 mb-4 flex items-center gap-3 shadow-sm">
        <div className="text-3xl">🤖</div>
        <div>
          <h1 className="font-bold text-lg">KarigarAI Business Manager</h1>
          <p className="text-white/80 text-xs">Your AI-powered 24/7 business advisor · Demo Mode</p>
        </div>
        <div className="ml-auto">
          <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Suggested chips */}
      <div className="flex flex-wrap gap-2 mb-3">
        {SUGGESTED.map((q) => (
          <button key={q} onClick={() => send(q)}
            className="text-xs px-3 py-1.5 bg-orange-50 border border-orange-200 text-orange-700 rounded-full hover:bg-orange-100 transition-colors font-medium">
            {q}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 p-1 scrollbar-thin">
        {messages.map((m) => <ChatBubble key={m.id} msg={m} />)}
        <AnimatePresence>{typing && <TypingIndicator />}</AnimatePresence>
      </div>

      {/* Input */}
      <div className="mt-3 flex gap-2 bg-white border border-gray-200 rounded-2xl p-2 shadow-sm">
        <button className="p-2 text-gray-400 hover:text-orange-500 transition-colors" title="Voice input (demo)">
          <Mic className="w-5 h-5" />
        </button>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          rows={1}
          placeholder="Ask anything about your business…"
          className="flex-1 resize-none text-sm focus:outline-none py-2 px-1 text-gray-800"
        />
        <button onClick={() => send(input)} disabled={!input.trim() || typing}
          className="p-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white rounded-xl transition-colors">
          {typing ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
