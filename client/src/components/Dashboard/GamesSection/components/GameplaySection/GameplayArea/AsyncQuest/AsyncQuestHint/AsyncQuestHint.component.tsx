import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaLightbulb, FaExclamationTriangle } from 'react-icons/fa';

type AsyncQuestHintProps = {
  type: 'hint' | 'error';
  message: string;
  code?: string;
  explanation?: string;
};

export const AsyncQuestHint = memo(({ type, message, code, explanation }: AsyncQuestHintProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: type === 'hint' ? -10 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-lg ${
        type === 'hint' 
          ? 'bg-js/10 border border-js/20' 
          : 'bg-red-500/20 border border-red-500/30'
      }`}
    >
      <div className="flex items-start gap-3">
        {type === 'hint' ? (
          <FaLightbulb className="w-5 h-5 text-js flex-shrink-0 mt-0.5" />
        ) : (
          <FaExclamationTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
        )}
        <div className="space-y-2">
          <div className={`text-sm font-medium ${
            type === 'hint' ? 'text-js' : 'text-red-400'
          }`}>
            {type === 'hint' ? 'Podpowiedź:' : 'Błąd:'}
          </div>
          <div className="text-sm text-gray-400">{message}</div>
          {code && (
            <div className="mt-2 p-2 bg-dark-900 rounded-lg font-mono text-sm text-gray-300">
              {code}
            </div>
          )}
          {explanation && (
            <div className="mt-2 text-sm text-gray-400">
              <span className="font-medium text-js">Wyjaśnienie: </span>
              {explanation}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
});

AsyncQuestHint.displayName = 'AsyncQuestHint'; 