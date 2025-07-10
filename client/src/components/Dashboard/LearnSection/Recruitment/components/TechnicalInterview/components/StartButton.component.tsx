import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';

type StartButtonProps = {
  questionCount: number;
  onStart: () => void;
};

export const StartButton = memo(({ questionCount, onStart }: StartButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onStart}
      className="w-full bg-gradient-to-r from-js to-js/80 text-dark font-bold py-4 px-8 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-3 text-lg"
    >
      <FaPlay className="w-5 h-5" />
      Rozpocznij test ({questionCount} pytań)
    </motion.button>
  );
});

StartButton.displayName = 'StartButton'; 