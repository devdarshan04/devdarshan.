import { motion } from 'framer-motion';

interface PlaceholderProps {
  title: string;
  description: string;
  icon?: string;
  badge?: string;
  color?: string;
}

export default function PlaceholderPage({ title, description, icon = '🚧', badge, color = 'orange' }: PlaceholderProps) {
  const colorMap: Record<string, string> = {
    orange: 'from-orange-500 to-red-500',
    indigo: 'from-indigo-500 to-blue-600',
    gray: 'from-gray-700 to-gray-900',
    green: 'from-green-500 to-emerald-600',
    purple: 'from-purple-500 to-indigo-600',
  };

  return (
    <div className="min-h-full flex items-center justify-center p-8 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md text-center"
      >
        <div className={`w-20 h-20 bg-gradient-to-br ${colorMap[color] ?? colorMap.orange} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg text-4xl`}>
          {icon}
        </div>
        {badge && (
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold mb-4">
            {badge}
          </span>
        )}
        <h1 className="text-2xl font-black text-gray-900 mb-3">{title}</h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-6">{description}</p>
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3">
          <p className="text-xs text-amber-700 font-medium">
            🚀 This page is part of KarigarAI SIH 2026 Demo.
            Full implementation in progress.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
