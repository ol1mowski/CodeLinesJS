import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { JSTypoHunter } from './JSTypoHunter/JSTypoHunter.component';
import { ScopeExplorer } from './ScopeExplorer/ScopeExplorer.component';

type GameplayAreaProps = {
  selectedGame: 'jsTypoHunter' | 'scopeExplorer';
  isPaused: boolean;
};

export const GameplayArea = memo(({ selectedGame, isPaused }: GameplayAreaProps) => {
  return (
    <motion.div
      layout
      className="w-full min-h-[600px] h-auto overflow-y-auto"
    >
      {selectedGame === 'jsTypoHunter' ? (
        <JSTypoHunter isPaused={isPaused} />
      ) : (
        <ScopeExplorer isPaused={isPaused} />
      )}
    </motion.div>
  );
});

GameplayArea.displayName = 'GameplayArea'; 