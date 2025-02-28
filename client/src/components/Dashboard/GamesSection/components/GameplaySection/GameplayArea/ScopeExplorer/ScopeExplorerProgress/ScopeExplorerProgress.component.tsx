import React, { memo } from 'react';
import { motion } from 'framer-motion';

type ScopeExplorerProgressProps = {
  currentLevel: number;
  totalLevels: number;
};

export const ScopeExplorerProgress = memo(({ currentLevel, totalLevels }: ScopeExplorerProgressProps) => {
  const progress = (currentLevel - 1) / totalLevels * 100;

  return (
    <div className="w-full bg-dark-800/50 h-1 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        className="h-full bg-js"
        transition={{ duration: 0.3 }}
      />
    </div>
  );
});

ScopeExplorerProgress.displayName = 'ScopeExplorerProgress'; 