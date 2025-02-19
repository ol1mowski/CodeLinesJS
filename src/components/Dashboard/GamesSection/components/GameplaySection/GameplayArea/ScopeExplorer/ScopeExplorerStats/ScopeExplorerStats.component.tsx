import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaStar, FaClock } from 'react-icons/fa';
import { GameStats } from '../../../../../types/scopeExplorer.types';

type ScopeExplorerStatsProps = {
  stats: GameStats;
};

export const ScopeExplorerStats = memo(({ stats }: ScopeExplorerStatsProps) => {
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-3 gap-4"
    >
      <div className="bg-dark-800/50 border border-js/10 rounded-lg p-4 flex items-center gap-3">
        <FaCode className="w-5 h-5 text-js" />
        <div>
          <div className="text-sm text-gray-400">Poziom</div>
          <div className="text-lg font-bold text-js">
            {stats.currentLevel}/{stats.totalLevels}
          </div>
        </div>
      </div>

      <div className="bg-dark-800/50 border border-js/10 rounded-lg p-4 flex items-center gap-3">
        <FaStar className="w-5 h-5 text-js" />
        <div>
          <div className="text-sm text-gray-400">Punkty</div>
          <div className="text-lg font-bold text-js">{stats.score}</div>
        </div>
      </div>

      <div className="bg-dark-800/50 border border-js/10 rounded-lg p-4 flex items-center gap-3">
        <FaClock className="w-5 h-5 text-js" />
        <div>
          <div className="text-sm text-gray-400">Czas</div>
          <div className="text-lg font-bold text-js">
            {formatTime(stats.timeElapsed)}/{formatTime(stats.maxTime)}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

ScopeExplorerStats.displayName = 'ScopeExplorerStats'; 