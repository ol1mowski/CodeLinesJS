import { useState, useEffect, useCallback } from 'react';

type UseGameTimerProps = {
  maxTime: number;
  onTimeEnd: () => void;
  isPaused: boolean;
};

export const useGameTimer = ({ maxTime, onTimeEnd, isPaused }: UseGameTimerProps) => {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const startTimer = useCallback(() => {
    setIsRunning(true);
  }, []);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resetTimer = useCallback(() => {
    setTimeElapsed(0);
    setIsRunning(false);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        setTimeElapsed(prev => {
          const newTime = prev + 1;
          if (newTime >= maxTime) {
            stopTimer();
            onTimeEnd();
            return maxTime;
          }
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, isPaused, maxTime, onTimeEnd, stopTimer]);

  return {
    timeElapsed,
    resetTimer,
    startTimer,
    stopTimer,
    isRunning
  };
}; 