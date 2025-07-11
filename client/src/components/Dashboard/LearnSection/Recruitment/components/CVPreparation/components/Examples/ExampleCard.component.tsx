import React, { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown, FaChevronUp, FaCopy, FaCheck, FaCode, FaFileAlt } from 'react-icons/fa';
import type { CVExample } from '../../types/cv.types';

interface ExampleCardProps {
  example: CVExample;
  index: number;
}

export const ExampleCard: React.FC<ExampleCardProps> = memo(({ example, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const levelColors = {
    junior: { bg: 'bg-green-500/10', border: 'border-green-500/20', text: 'text-green-400' },
    mid: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400' },
    senior: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400' }
  };

  const typeIcons = {
    'full-cv': FaFileAlt,
    'section': FaCode,
    'skill-description': FaCode,
    'project-description': FaCode
  };

  const colors = levelColors[example.level];
  const TypeIcon = typeIcons[example.type];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(example.content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-dark-700/30 border border-js/10 rounded-xl overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-js/10 border border-js/20">
              <TypeIcon className="w-6 h-6 text-js" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold text-white">{example.title}</h3>
                <span className={`
                  px-2 py-1 rounded text-xs ${colors.bg} ${colors.border} ${colors.text} border
                `}>
                  {example.level}
                </span>
                <span className="px-2 py-1 rounded text-xs bg-gray-500/10 border border-gray-500/20 text-gray-400">
                  {example.field}
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed">{example.description}</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-2 bg-js/10 border border-js/20 rounded-lg hover:bg-js/20 transition-colors"
          >
            {isCopied ? (
              <>
                <FaCheck className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-400">Skopiowano!</span>
              </>
            ) : (
              <>
                <FaCopy className="w-4 h-4 text-js" />
                <span className="text-sm text-js">Kopiuj</span>
              </>
            )}
          </motion.button>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-3 bg-dark-700/50 border border-js/10 rounded-lg hover:border-js/20 transition-colors"
        >
          <span className="text-js font-medium">
            {isExpanded ? 'Ukryj przykład' : 'Pokaż przykład'}
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
          <div className="bg-dark-700/50 border border-js/10 rounded-lg p-4 mb-4">
            <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono leading-relaxed">
              {example.content}
            </pre>
          </div>

          {example.highlightPoints.length > 0 && (
            <div>
              <h4 className="text-js font-semibold mb-3 flex items-center gap-2">
                <FaCheck className="w-4 h-4" />
                Kluczowe elementy:
              </h4>
              <ul className="space-y-2">
                {example.highlightPoints.map((point, idx) => (
                  <li key={idx} className="text-sm text-gray-300 p-3 bg-js/5 border border-js/20 rounded-lg flex items-start gap-2">
                    <FaCheck className="w-4 h-4 text-js mt-0.5 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
});

ExampleCard.displayName = 'ExampleCard'; 