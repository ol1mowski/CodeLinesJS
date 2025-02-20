import React, { memo, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameStats } from '../../../../types/jsTypoHunter.types';
import { JSTypoHunterStats } from './JSTypoHunterStats/JSTypoHunterStats.component';
import { JSTypoHunterGame } from './JSTypoHunterGame/JSTypoHunterGame.component';
import { useGameTimer } from './hooks/useGameTimer';
import { useGamesQuery } from '../../../../hooks/useGamesQuery';

const getDifficultyPoints = (difficulty: 'easy' | 'medium' | 'hard'): number => {
  switch (difficulty) {
    case 'easy':
      return 10;
    case 'medium':
      return 20;
    case 'hard':
      return 30;
    default:
      return 10;
  }
};

type JSTypoHunterProps = {
  isPaused: boolean;
};

const JSTypoHunter = memo(({ isPaused = false }: { isPaused?: boolean }) => {
  const { data, isLoading, error } = useGamesQuery();
  const gameContent = data?.games.find(game => game.slug === 'js-typo-hunter');

  const [gameStats, setGameStats] = useState<GameStats>({
    currentLevel: 1,
    totalLevels: 0,
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

  const handleScoreUpdate = useCallback((points: number) => {
    const currentChallenge = gameContent?.gameData[gameStats.currentLevel - 1];
    const difficultyPoints = getDifficultyPoints(currentChallenge?.difficulty || 'easy');
    const totalPoints = points + difficultyPoints;

    setGameStats(prev => ({
      ...prev,
      score: prev.score + totalPoints
    }));
  }, [gameStats.currentLevel]);

  const handleLevelComplete = useCallback(() => {
    setTimeout(() => {
      const nextLevel = gameStats.currentLevel + 1;
      if (nextLevel > (gameContent?.gameData.length || 0)) {
        setIsGameOver(true);
      } else {
        setGameStats(prev => ({
          ...prev,
          currentLevel: nextLevel
        }));
      }
    }, 1000);
  }, [gameStats.currentLevel]);

  const handleRestart = useCallback(() => {
    setGameStats({
      currentLevel: 1,
      totalLevels: gameContent?.gameData.length || 0,
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

  useEffect(() => {
    if (gameContent) {
      setGameStats(prev => ({
        ...prev,
        totalLevels: gameContent.gameData.length
      }));
    }
  }, [gameContent]);

  if (isLoading) return <div>Ładowanie...</div>;
  if (error) return <div>Błąd: {error.message}</div>;
  if (!gameContent) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full space-y-6"
    >
      <JSTypoHunterStats stats={gameStats} />
      <AnimatePresence mode="wait">
        {isGameOver ? (
          <motion.div
            key="game-over"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="p-6 bg-dark-800/50 border border-js/10 rounded-lg text-center"
          >
            <h2 className="text-2xl font-bold text-js mb-4">
              {gameStats.currentLevel > (gameContent?.gameData.length || 0) ? 'Gratulacje!' : 'Koniec gry!'}
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
        ) : (
          <motion.div
            key={`level-${gameStats.currentLevel}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <JSTypoHunterGame 
              currentChallenge={gameContent?.gameData[gameStats.currentLevel - 1]}
              onScoreUpdate={handleScoreUpdate}
              onLevelComplete={handleLevelComplete}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

JSTypoHunter.displayName = 'JSTypoHunter'; 

export default JSTypoHunter;
