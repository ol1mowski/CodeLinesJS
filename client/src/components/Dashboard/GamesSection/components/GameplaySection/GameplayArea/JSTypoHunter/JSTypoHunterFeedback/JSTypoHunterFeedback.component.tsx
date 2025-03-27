import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck, FaTimes } from 'react-icons/fa';

type FeedbackType = 'success' | 'error' | null;

type JSTypoHunterFeedbackProps = {
  type: FeedbackType;
  message: string;
};

export const JSTypoHunterFeedback = memo(({ type, message }: JSTypoHunterFeedbackProps) => {
  if (!type) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={`
          absolute top-4 left-1/2 -translate-x-1/2 
          px-4 py-2 rounded-lg flex items-center gap-2
          ${type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}
        `}
      >
        {type === 'success' ? (
          <FaCheck className="w-4 h-4" />
        ) : (
          <FaTimes className="w-4 h-4" />
        )}
        <span className="font-medium">{message}</span>
      </motion.div>
    </AnimatePresence>
  );
});

JSTypoHunterFeedback.displayName = 'JSTypoHunterFeedback'; 