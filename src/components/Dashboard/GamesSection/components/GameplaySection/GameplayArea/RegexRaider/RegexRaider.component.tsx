import React, { memo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameStats } from '../../../../types/regexRaider.types';
import { useGameTimer } from '../JSTypoHunter/hooks/useGameTimer';
import { RegexRaiderStats } from './RegexRaiderStats/RegexRaiderStats.component';
import { RegexRaiderGame } from './RegexRaiderGame/RegexRaiderGame.component';

export const RegexRaider = memo(({ isPaused }: { isPaused: boolean }) => {
  const [gameStats, setGameStats] = useState<GameStats>({
    currentLevel: 1,
    totalLevels: 2,
    score: 0,
    timeElapsed: 0,
    maxTime: 300,
    correctAnswers: 0
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
    startTimer();
    return () => stopTimer();
  }, [startTimer, stopTimer]);

  useEffect(() => {
    if (!isGameOver && !isPaused) {
      setGameStats(prev => ({ ...prev, timeElapsed }));
    }
  }, [timeElapsed, isGameOver, isPaused]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full space-y-6"
    >
      <RegexRaiderStats 
        stats={gameStats}
        isGameOver={isGameOver}
        finalTime={finalTime}
      />
      <RegexRaiderGame />
    </motion.div>
  );
});

RegexRaider.displayName = 'RegexRaider'; 