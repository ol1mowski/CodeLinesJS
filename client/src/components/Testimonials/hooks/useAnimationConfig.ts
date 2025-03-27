import { useMemo } from 'react';

type AnimationConfig = {
  header: {
    initial: { opacity: number; y: number };
    animate: { opacity: number; y: number };
    transition: { duration: number };
  };
  testimonial: {
    initial: { opacity: number; y: number };
    animate: { opacity: number; y: number };
    transition: (index: number) => { duration: number; delay: number };
  };
  cta: {
    initial: { opacity: number; y: number };
    animate: { opacity: number; y: number };
    transition: { duration: number; delay: number };
  };
};


export const useAnimationConfig = (): AnimationConfig => {
  return useMemo(
    () => ({
      header: {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
      },
      testimonial: {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: (index: number) => ({ duration: 0.5, delay: index * 0.2 })
      },
      cta: {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay: 0.4 }
      }
    }),
    []
  );
}; 