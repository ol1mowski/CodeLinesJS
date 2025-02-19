import React, { memo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameStats } from '../../../../types/asyncQuest.types';
import { asyncChallenges } from '../../../../data/asyncChallenges.data';
import { useGameTimer } from '../JSTypoHunter/hooks/useGameTimer';
import { AsyncQuestStats } from './AsyncQuestStats/AsyncQuestStats.component';

type AsyncQuestProps = {
  isPaused: boolean;
};

export const AsyncQuest = memo(({ isPaused }: AsyncQuestProps) => {
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

  const { timeElapsed, resetTimer } = useGameTimer({
    maxTime: gameStats.maxTime,
    onTimeEnd: () => {
      setIsGameOver(true);
      setFinalTime(timeElapsed);
      resetTimer();
    },
    isPaused,
  });

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
      <div className="flex-1 overflow-y-auto py-6">
        {/* Game content will go here */}
      </div>
    </motion.div>
  );
});

AsyncQuest.displayName = 'AsyncQuest'; 