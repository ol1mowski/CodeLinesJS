import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaHistory, FaTrash } from 'react-icons/fa';

type CodeHistoryProps = {
  history: { code: string; timestamp: number; }[];
  onSelect: (code: string) => void;
  onClear: () => void;
};

export const CodeHistory = memo(({ history, onSelect, onClear }: CodeHistoryProps) => (
  <div className="absolute top-full right-0 mt-2 w-64 bg-dark/95 rounded-lg border border-js/10 shadow-xl">
    <div className="flex items-center justify-between p-3 border-b border-js/10">
      <div className="flex items-center gap-2 text-js">
        <FaHistory className="w-4 h-4" />
        <span className="font-medium">Historia</span>
      </div>
      {history.length > 0 && (
        <button
          onClick={onClear}
          className="p-1.5 text-gray-400 hover:text-js transition-colors"
          title="Wyczyść historię"
        >
          <FaTrash className="w-4 h-4" />
        </button>
      )}
    </div>
    <div className="max-h-64 overflow-y-auto">
      {history.length === 0 ? (
        <div className="p-3 text-sm text-gray-400">
          Brak historii
        </div>
      ) : (
        history.map((entry, index) => (
          <motion.button
            key={entry.timestamp}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSelect(entry.code)}
            className="w-full p-3 text-left hover:bg-js/10 transition-colors border-b border-js/5 last:border-0"
          >
            <div className="text-sm text-gray-300 truncate">
              {entry.code.split('\n')[0]}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {new Date(entry.timestamp).toLocaleString()}
            </div>
          </motion.button>
        ))
      )}
    </div>
  </div>
));

CodeHistory.displayName = 'CodeHistory'; 