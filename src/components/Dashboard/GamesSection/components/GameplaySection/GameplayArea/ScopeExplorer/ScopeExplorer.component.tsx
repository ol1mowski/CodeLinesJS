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
    maxTime: 300,
    correctAnswers: 0,
    categoryStats: {
      scope: { total: 0, correct: 0, points: 0 },
      closure: { total: 0, correct: 0, points: 0 },
      hoisting: { total: 0, correct: 0, points: 0 }
    }
  });

  const [isGameOver, setIsGameOver] = useState(false);

  const handleTimeEnd = useCallback(() => {
    setIsGameOver(true);
  }, []);

  const handleGameOver = useCallback(() => {
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

  useEffect(() => {
    const initialCategoryStats = {
      scope: { total: 0, correct: 0, points: 0 },
      closure: { total: 0, correct: 0, points: 0 },
      hoisting: { total: 0, correct: 0, points: 0 }
    };

    scopeChallenges.forEach(challenge => {
      initialCategoryStats[challenge.category].total++;
      initialCategoryStats[challenge.category].points += challenge.points || 0;
    });

    setGameStats(prev => ({
      ...prev,
      categoryStats: initialCategoryStats
    }));
  }, []);

  const handleScoreUpdate = useCallback((points: number, category: 'scope' | 'closure' | 'hoisting') => {
    setGameStats(prev => ({
      ...prev,
      score: prev.score + points,
      correctAnswers: prev.correctAnswers + 1,
      categoryStats: {
        ...prev.categoryStats,
        [category]: {
          ...prev.categoryStats[category],
          correct: prev.categoryStats[category].correct + 1
        }
      }
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
    const initialCategoryStats = {
      scope: { total: 0, correct: 0, points: 0 },
      closure: { total: 0, correct: 0, points: 0 },
      hoisting: { total: 0, correct: 0, points: 0 }
    };

    scopeChallenges.forEach(challenge => {
      initialCategoryStats[challenge.category].total++;
      initialCategoryStats[challenge.category].points += challenge.points || 0;
    });

    setGameStats({
      currentLevel: 1,
      totalLevels: scopeChallenges.length,
      score: 0,
      timeElapsed: 0,
      maxTime: 300,
      correctAnswers: 0,
      categoryStats: initialCategoryStats
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
          <motion.div
            key={`level-${gameStats.currentLevel}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <ScopeExplorerGame
              currentChallenge={scopeChallenges[gameStats.currentLevel - 1]}
              onScoreUpdate={handleScoreUpdate}
              onLevelComplete={handleLevelComplete}
              currentLevel={gameStats.currentLevel}
              totalLevels={gameStats.totalLevels}
              onGameOver={handleGameOver}
            />
          </motion.div>
        ) : (
          <motion.div
            key="game-over"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <ScopeExplorerSummary
              score={gameStats.score}
              timeElapsed={gameStats.timeElapsed}
              challenges={scopeChallenges}
              correctAnswers={gameStats.correctAnswers}
              categoryStats={gameStats.categoryStats}
              onRestart={handleRestart}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

ScopeExplorer.displayName = 'ScopeExplorer'; 