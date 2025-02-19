import React, { memo, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameStats } from '../../../../types/scopeExplorer.types';
import { scopeChallenges } from '../../../../data/scopeChallenges.data';
import { useGameTimer } from '../JSTypoHunter/hooks/useGameTimer';
import { ScopeExplorerStats } from './ScopeExplorerStats/ScopeExplorerStats.component';
import { ScopeExplorerGame } from './ScopeExplorerGame/ScopeExplorerGame.component';

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
          <motion.div
            key="game-over"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 bg-dark-800/50 border border-js/10 rounded-lg text-center"
          >
            <h2 className="text-2xl font-bold text-js mb-4">
              {gameStats.currentLevel > scopeChallenges.length ? 'Gratulacje!' : 'Koniec gry!'}
            </h2>
            <p className="text-gray-400 mb-6">
              Twój wynik: {gameStats.score} punktów
            </p>
            <button
              onClick={handleRestart}
              className="px-6 py-3 rounded-lg bg-js text-dark font-medium hover:bg-js/90 transition-colors"
            >
              Zagraj ponownie
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

ScopeExplorer.displayName = 'ScopeExplorer'; 