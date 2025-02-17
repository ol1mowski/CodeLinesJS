import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaExpand, FaCompress } from 'react-icons/fa';

type GameplayAreaProps = {
  isPaused: boolean;
  isFullscreen: boolean;
};

export const GameplayArea = memo(({ isPaused, isFullscreen }: GameplayAreaProps) => {
  return (
    <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-js/20 bg-dark-800">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-gray-400 font-mono">
          Tutaj daj logike byczku
        </div>
      </div>

      {isPaused && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-dark-900/80 flex items-center justify-center"
        >
          <div className="text-js text-xl font-bold">PAUZA</div>
        </motion.div>
      )}
    </div>
  );
}); 