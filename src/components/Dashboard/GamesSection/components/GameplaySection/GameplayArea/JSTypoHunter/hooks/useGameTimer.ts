import { useState, useEffect, useCallback } from 'react';

type UseGameTimerProps = {
  maxTime: number;
  onTimeEnd: () => void;
  isPaused?: boolean;
};

export const useGameTimer = ({ maxTime, onTimeEnd, isPaused = false }: UseGameTimerProps) => {
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    if (isPaused || timeElapsed >= maxTime) return;

    const timer = setInterval(() => {
      setTimeElapsed(prev => {
        const newTime = prev + 1;
        if (newTime >= maxTime) {
          clearInterval(timer);
          onTimeEnd();
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [maxTime, onTimeEnd, isPaused, timeElapsed]);

  const resetTimer = useCallback(() => {
    setTimeElapsed(0);
  }, []);

  return {
    timeElapsed,
    resetTimer,
  };
}; 