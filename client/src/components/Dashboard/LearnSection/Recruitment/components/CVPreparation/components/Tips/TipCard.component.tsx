import React, { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown, FaChevronUp, FaCheck, FaTimes } from 'react-icons/fa';
import type { CVTip } from '../../types/cv.types';

interface TipCardProps {
  tip: CVTip;
  index: number;
}

export const TipCard: React.FC<TipCardProps> = memo(({ tip, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const importanceColors = {
    low: { bg: 'bg-gray-500/10', border: 'border-gray-500/20', text: 'text-gray-400' },
    medium: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400' },
    high: { bg: 'bg-orange-500/10', border: 'border-orange-500/20', text: 'text-orange-400' },
    critical: { bg: 'bg-red-500/10', border: 'border-red-500/20', text: 'text-red-400' }
  };

  const colors = importanceColors[tip.importance];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-dark-700/30 border border-js/10 rounded-xl overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-white">{tip.title}</h3>
              <span className={`
                px-2 py-1 rounded text-xs ${colors.bg} ${colors.border} ${colors.text} border
              `}>
                {tip.importance === 'low' && 'Niska'}
                {tip.importance === 'medium' && 'Średnia'}
                {tip.importance === 'high' && 'Wysoka'}
                {tip.importance === 'critical' && 'Krytyczna'}
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">{tip.description}</p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-3 bg-dark-700/50 border border-js/10 rounded-lg hover:border-js/20 transition-colors"
        >
          <span className="text-js font-medium">
            {isExpanded ? 'Ukryj przykłady' : 'Pokaż przykłady'}
          </span>
          {isExpanded ? (
            <FaChevronUp className="w-4 h-4 text-js" />
          ) : (
            <FaChevronDown className="w-4 h-4 text-js" />
          )}
        </motion.button>
      </div>

      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="flex items-center gap-2 text-green-400 font-semibold mb-3">
                <FaCheck className="w-4 h-4" />
                Dobrze ✅
              </h4>
              <ul className="space-y-2">
                {tip.examples.good.map((example, idx) => (
                  <li key={idx} className="text-sm text-gray-300 p-3 bg-green-500/5 border border-green-500/20 rounded-lg">
                    {example}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="flex items-center gap-2 text-red-400 font-semibold mb-3">
                <FaTimes className="w-4 h-4" />
                Źle ❌
              </h4>
              <ul className="space-y-2">
                {tip.examples.bad.map((example, idx) => (
                  <li key={idx} className="text-sm text-gray-300 p-3 bg-red-500/5 border border-red-500/20 rounded-lg">
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

TipCard.displayName = 'TipCard'; 