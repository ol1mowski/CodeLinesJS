import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { FaRedo } from 'react-icons/fa';

interface ResultsActionsProps {
  onRestart: () => void;
}

export const ResultsActions: React.FC<ResultsActionsProps> = memo(({ onRestart }) => {
  return (
    <div className="flex gap-4 justify-center">
      <motion.button
        onClick={onRestart}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-js to-js/80 text-dark font-medium rounded-xl hover:shadow-lg hover:shadow-js/20 transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaRedo />
        Rozpocznij ponownie
      </motion.button>
    </div>
  );
});

ResultsActions.displayName = 'ResultsActions'; 