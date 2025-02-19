import React, { memo, useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GameStats } from '../../../../types/jsTypoHunter.types';
import { JSTypoHunterStats } from './JSTypoHunterStats/JSTypoHunterStats.component';
import { JSTypoHunterGame } from './JSTypoHunterGame/JSTypoHunterGame.component';
import { challenges } from '../../../../data/challenges.data';
import { useGameTimer } from './hooks/useGameTimer';

export const JSTypoHunter = memo(() => {
  const [gameStats, setGameStats] = useState<GameStats>({
    currentLevel: 1,
    totalLevels: challenges.length,
    score: 0,
    timeElapsed: 0,
    maxTime: 300
  });

  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const handleTimeEnd = useCallback(() => {
    setIsGameOver(true);
  }, []);

  const { timeElapsed, resetTimer } = useGameTimer({
    maxTime: gameStats.maxTime,
    onTimeEnd: handleTimeEnd,
    isPaused,
  });

  const handleScoreUpdate = useCallback((points: number) => {
    setGameStats(prev => ({
      ...prev,
      score: prev.score + points
    }));
  }, []);

  const handleLevelComplete = useCallback(() => {
    const nextLevel = gameStats.currentLevel + 1;
    if (nextLevel > challenges.length) {
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
      totalLevels: challenges.length,
      score: 0,
      timeElapsed: 0,
      maxTime: 300
    });
    setIsGameOver(false);
    resetTimer();
  }, [resetTimer]);

  useEffect(() => {
    setGameStats(prev => ({
      ...prev,
      timeElapsed
    }));
  }, [timeElapsed]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full space-y-6"
    >
      <JSTypoHunterStats stats={gameStats} />
      {isGameOver ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 bg-dark-800/50 border border-js/10 rounded-lg text-center"
        >
          <h2 className="text-2xl font-bold text-js mb-4">
            {gameStats.currentLevel > challenges.length ? 'Gratulacje!' : 'Koniec gry!'}
          </h2>
          <p className="text-gray-400 mb-6">
            Twój wynik: {gameStats.score} punktów
          </p>
          <button
            onClick={handleRestart}
            className="px-6 py-3 rounded-lg bg-js text-dark-900 font-medium hover:bg-js/90 transition-colors"
          >
            Zagraj ponownie
          </button>
        </motion.div>
      ) : (
        <JSTypoHunterGame 
          currentChallenge={challenges[gameStats.currentLevel - 1]}
          onScoreUpdate={handleScoreUpdate}
          onLevelComplete={handleLevelComplete}
        />
      )}
    </motion.div>
  );
});

JSTypoHunter.displayName = 'JSTypoHunter'; 