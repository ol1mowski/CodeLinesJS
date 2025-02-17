import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaPause, FaPlay } from 'react-icons/fa';

type GameplayHeaderProps = {
  title: string;
  isPaused: boolean;
  onPauseToggle: () => void;
};

export const GameplayHeader = memo(({ title, isPaused, onPauseToggle }: GameplayHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-js">{title}</h1>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onPauseToggle}
        className="p-2 rounded-lg bg-js/10 text-js hover:bg-js/20 transition-colors"
      >
        {isPaused ? <FaPlay className="w-5 h-5" /> : <FaPause className="w-5 h-5" />}
      </motion.button>
    </div>
  );
}); 