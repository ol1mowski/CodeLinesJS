import React, { memo, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameStats } from '../../../../types/scopeExplorer.types';
import { scopeChallenges } from '../../../../data/scopeChallenges.data';
import { useGameTimer } from '../JSTypoHunter/hooks/useGameTimer';
import { ScopeExplorerStats } from './ScopeExplorerStats/ScopeExplorerStats.component';
import { ScopeExplorerGame } from './ScopeExplorerGame/ScopeExplorerGame.component';
import { ScopeExplorerSummary } from './ScopeExplorerSummary/ScopeExplorerSummary.component';

type ScopeExplorerProps = {
  isPaused: boolean;
};

export const ScopeExplorer = memo(({ isPaused }: ScopeExplorerProps) => {
  const [gameStats, setGameStats] = useState<GameStats>({
    currentLevel: 1,
    totalLevels: scopeChallenges.length,
    score: 0,
    timeElapsed: 0,
    maxTime: 300
  });

  const [isGameOver, setIsGameOver] = useState(false);

  const handleTimeEnd = useCallback(() => {
    setIsGameOver(true);
  }, []);

  const { timeElapsed, resetTimer } = useGameTimer({
    maxTime: gameStats.maxTime,
    onTimeEnd: handleTimeEnd,
    isPaused,
  });

  useEffect(() => {
    setGameStats(prev => ({
      ...prev,
      timeElapsed
    }));
  }, [timeElapsed]);

  const handleScoreUpdate = useCallback((points: number) => {
    setGameStats(prev => ({
      ...prev,
      score: prev.score + points
    }));
  }, []);

  const handleLevelComplete = useCallback(() => {
    const nextLevel = gameStats.currentLevel + 1;
    if (nextLevel > scopeChallenges.length) {
      setIsGameOver(true);
      return;
    }

    setGameStats(prev => ({
      ...prev,
      currentLevel: nextLevel
    }));
  }, [gameStats.currentLevel]);

  const handleRestart = useCallback(() => {
    setGameStats({
      currentLevel: 1,
      totalLevels: scopeChallenges.length,
      score: 0,
      timeElapsed: 0,
      maxTime: 300
    });
    setIsGameOver(false);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full space-y-6"
    >
      <ScopeExplorerStats stats={gameStats} />
      <AnimatePresence mode="wait">
        {!isGameOver ? (
          <ScopeExplorerGame
            key={gameStats.currentLevel}
            currentChallenge={scopeChallenges[gameStats.currentLevel - 1]}
            onScoreUpdate={handleScoreUpdate}
            onLevelComplete={handleLevelComplete}
            currentLevel={gameStats.currentLevel}
            totalLevels={gameStats.totalLevels}
          />
        ) : (
          <ScopeExplorerSummary
            key="game-over"
            score={gameStats.score}
            timeElapsed={gameStats.timeElapsed}
            challenges={scopeChallenges}
            onRestart={handleRestart}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
});

ScopeExplorer.displayName = 'ScopeExplorer'; 