import React, { memo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameStats } from '../../../../types/asyncQuest.types';
import { asyncChallenges } from '../../../../data/asyncChallenges.data';
import { useGameTimer } from '../JSTypoHunter/hooks/useGameTimer';
import { AsyncQuestStats } from './AsyncQuestStats/AsyncQuestStats.component';
import { AsyncQuestSummary } from './AsyncQuestSummary/AsyncQuestSummary.component';
import { AsyncQuestGame } from './AsyncQuestGame/AsyncQuestGame.component';

export const AsyncQuest = memo(({ isPaused }: { isPaused: boolean }) => {
  const [gameStats, setGameStats] = useState<GameStats>({
    currentLevel: 1,
    totalLevels: asyncChallenges.length,
    score: 0,
    timeElapsed: 0,
    maxTime: 300,
    correctAnswers: 0,
    categoryStats: {
      promises: { total: 0, correct: 0, points: 0 },
      'async-await': { total: 0, correct: 0, points: 0 },
      callbacks: { total: 0, correct: 0, points: 0 }
    }
  });

  const [isGameOver, setIsGameOver] = useState(false);
  const [finalTime, setFinalTime] = useState(0);

  const { timeElapsed, resetTimer, startTimer, stopTimer } = useGameTimer({
    maxTime: gameStats.maxTime,
    onTimeEnd: () => {
      setIsGameOver(true);
      setFinalTime(timeElapsed);
      stopTimer();
    },
    isPaused,
  });

  useEffect(() => {
    if (!isGameOver && !isPaused) {
      setGameStats(prev => ({ ...prev, timeElapsed }));
    }
  }, [timeElapsed, isGameOver, isPaused]);

  useEffect(() => {
    if (!isGameOver && !isPaused) {
      startTimer();
    }
  }, [isGameOver, isPaused, startTimer]);

  const handleScoreUpdate = (points: number, category: 'promises' | 'async-await' | 'callbacks') => {
    setGameStats(prev => ({
      ...prev,
      score: prev.score + points,
      correctAnswers: prev.correctAnswers + 1,
      categoryStats: {
        ...prev.categoryStats,
        [category]: {
          ...prev.categoryStats[category],
          total: prev.categoryStats[category].total + 1,
          correct: prev.categoryStats[category].correct + 1,
          points: prev.categoryStats[category].points + points
        }
      }
    }));
  };

  const handleLevelComplete = () => {
    setGameStats(prev => ({ ...prev, currentLevel: prev.currentLevel + 1 }));
  };

  const handleGameOver = () => {
    setIsGameOver(true);
    setFinalTime(timeElapsed);
    stopTimer();
  };

  const handleRestart = () => {
    setGameStats({
      currentLevel: 1,
      totalLevels: asyncChallenges.length,
      score: 0,
      timeElapsed: 0,
      maxTime: 300,
      correctAnswers: 0,
      categoryStats: {
        promises: { total: 0, correct: 0, points: 0 },
        'async-await': { total: 0, correct: 0, points: 0 },
        callbacks: { total: 0, correct: 0, points: 0 }
      }
    });
    setIsGameOver(false);
    resetTimer();
    startTimer();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-full flex flex-col"
    >
      <AsyncQuestStats 
        stats={gameStats}
        isGameOver={isGameOver}
        finalTime={finalTime}
      />
      <AnimatePresence mode="wait">
        <div className="flex-1 overflow-y-auto py-6">
          {!isGameOver ? (
            <motion.div
              key={`level-${gameStats.currentLevel}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <AsyncQuestGame
                currentChallenge={asyncChallenges[gameStats.currentLevel - 1]}
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
              <AsyncQuestSummary
                score={gameStats.score}
                timeElapsed={finalTime}
                challenges={asyncChallenges}
                correctAnswers={gameStats.correctAnswers}
                categoryStats={gameStats.categoryStats}
                onRestart={handleRestart}
              />
            </motion.div>
          )}
        </div>
      </AnimatePresence>
    </motion.div>
  );
});

AsyncQuest.displayName = 'AsyncQuest'; 