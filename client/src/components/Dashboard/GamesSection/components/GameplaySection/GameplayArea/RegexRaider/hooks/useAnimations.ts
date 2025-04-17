import { useMemo } from 'react';

export const useAnimations = () => {
  const containerAnimation = useMemo(
    () => ({
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.3 },
    }),
    []
  );

  const gameAnimation = useMemo(
    () => ({
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { duration: 0.3 },
    }),
    []
  );

  const summaryAnimation = useMemo(
    () => ({
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
      transition: { duration: 0.3 },
    }),
    []
  );

  return {
    containerAnimation,
    gameAnimation,
    summaryAnimation,
  };
};
