import { memo } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { BugFinder } from '../games/BugFinder/BugFinder.component';

type GameplayAreaProps = {
  isPaused: boolean;
  isFullscreen: boolean;
};

export const GameplayArea = memo(({ isPaused }: GameplayAreaProps) => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-js/20 bg-dark-800">
      <div className="absolute inset-0">
        {slug === 'bug-finder' ? (
          <BugFinder />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-400 font-mono">
              Gra niedostępna
            </div>
          </div>
        )}
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

GameplayArea.displayName = 'GameplayArea'; 