import React, { memo } from 'react';
import { GameStats } from '../../../../../types/scopeExplorer.types';
import { CategoryProgress } from '../CategoryProgress/CategoryProgress.component';

type ScopeExplorerStatsProps = {
  stats: GameStats;
  isGameOver?: boolean;
  finalTime?: number;
};

export const ScopeExplorerStats = memo(({ 
  stats, 
  isGameOver = false, 
  finalTime = 0 
}: ScopeExplorerStatsProps) => {
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const displayTime = isGameOver ? finalTime : stats.timeElapsed;

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-1 space-y-2">
        <div className="p-4 bg-dark-800/50 rounded-lg">
          <div className="text-sm text-gray-400 mb-1">Wynik</div>
          <div className="text-2xl font-bold text-js">{stats.score}</div>
        </div>
        <div className="p-4 bg-dark-800/50 rounded-lg">
          <div className="text-sm text-gray-400 mb-1">Czas</div>
          <div className="text-2xl font-bold text-js">
            {formatTime(displayTime)}
          </div>
        </div>
      </div>
      <div className="col-span-3 space-y-2">
        <CategoryProgress category="scope" stats={stats.categoryStats.scope} />
        <CategoryProgress category="closure" stats={stats.categoryStats.closure} />
        <CategoryProgress category="hoisting" stats={stats.categoryStats.hoisting} />
      </div>
    </div>
  );
});

ScopeExplorerStats.displayName = 'ScopeExplorerStats'; 