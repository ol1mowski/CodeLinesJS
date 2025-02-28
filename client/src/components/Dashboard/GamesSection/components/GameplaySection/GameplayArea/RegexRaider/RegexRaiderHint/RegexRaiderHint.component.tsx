import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { FaLightbulb } from 'react-icons/fa';

type RegexRaiderHintProps = {
  pattern: string;
  explanation: string;
  example?: string;
};

export const RegexRaiderHint = memo(({ pattern, explanation, example }: RegexRaiderHintProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 bg-dark-800/50 border border-js/10 rounded-lg"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-js/10">
          <FaLightbulb className="w-4 h-4 text-js" />
        </div>
        <div className="space-y-2">
          <div className="text-sm text-gray-400">
            {explanation}
          </div>
          {pattern && (
            <div className="font-mono text-sm bg-dark-900/50 p-2 rounded text-js">
              {pattern}
            </div>
          )}
          {example && (
            <div className="text-xs text-gray-500">
              Przykład: <span className="text-gray-400">{example}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
});

RegexRaiderHint.displayName = 'RegexRaiderHint'; 