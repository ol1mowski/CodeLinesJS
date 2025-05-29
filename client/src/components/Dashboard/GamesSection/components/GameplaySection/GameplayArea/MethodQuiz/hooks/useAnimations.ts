import { useMemo } from 'react';

export const useAnimations = () => {
  return useMemo(() => {
    const containerAnimation = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { duration: 0.4, ease: 'easeOut' }
    };

    const gameAnimation = {
      initial: { opacity: 0, x: 50 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -50 },
      transition: { duration: 0.3 }
    };

    const summaryAnimation = {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
      transition: { duration: 0.4 }
    };

    const optionAnimation = {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.2 }
    };

    return {
      containerAnimation,
      gameAnimation,
      summaryAnimation,
      optionAnimation,
    };
  }, []);
}; 