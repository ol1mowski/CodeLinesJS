import { useMemo } from 'react';

export const useTopNavAnimation = () => {
  return useMemo(
    () => ({
      container: {
        initial: { y: -20, opacity: 0 },
        animate: {
          y: 0,
          opacity: 1,
          transition: {
            duration: 0.3,
            ease: 'easeOut',
          },
        },
      },
    }),
    []
  );
};
