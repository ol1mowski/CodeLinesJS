import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { JSTypoHunter } from './JSTypoHunter/JSTypoHunter.component';

type GameplayAreaProps = {
  isPaused: boolean;
  isFullscreen: boolean;
};

export const GameplayArea = memo(({ isPaused, isFullscreen }: GameplayAreaProps) => {
  const { slug } = useParams<{ slug: string }>();

  const renderGame = () => {
    switch (slug) {
      case 'js-typo-hunter':
        return <JSTypoHunter isPaused={isPaused} />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-400 font-mono">
              Gra niedostępna
            </div>
          </div>
        );
    }
  };

  return (
    <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-js/20 bg-dark-800">
      <div className="absolute inset-0">
        {renderGame()}
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