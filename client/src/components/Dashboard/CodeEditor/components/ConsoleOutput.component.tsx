import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaTrash } from 'react-icons/fa';
import DOMPurify from 'dompurify';

type ConsoleOutputProps = {
  output: string[];
  onClear: () => void;
  isExecuting: boolean;
};

export const ConsoleOutput = memo(({ output, onClear, isExecuting }: ConsoleOutputProps) => (
  <div className="h-[calc(100%-4rem)] bg-[#1e1e1e] rounded-lg overflow-hidden flex flex-col">
    <div className="flex items-center justify-between px-4 py-2 bg-dark/30 border-b border-js/10">
      <span className="text-sm text-gray-400">{isExecuting ? 'Wykonywanie...' : 'Gotowe'}</span>
      <button
        data-testid="clear-console-btn"
        onClick={onClear}
        className="p-1.5 text-gray-400 hover:text-js transition-colors"
        title="Wyczyść konsolę"
      >
        <FaTrash className="w-4 h-4" />
      </button>
    </div>
    <div data-testid="console-output" className="flex-1 p-4 font-mono text-sm overflow-auto">
      {output.map((log, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-gray-300 mb-1"
          dangerouslySetInnerHTML={{ 
            __html: DOMPurify.sanitize(log, {
              ALLOWED_TAGS: [], // Nie pozwalaj na żadne tagi HTML
              ALLOWED_ATTR: [], // Nie pozwalaj na żadne atrybuty
              KEEP_CONTENT: true // Zachowaj tekst, ale usuń HTML
            })
          }}
        />
      ))}
    </div>
  </div>
));

ConsoleOutput.displayName = 'ConsoleOutput';
