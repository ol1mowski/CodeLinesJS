import { useMemo } from 'react';

export const useBlockAnimation = () => {
  return useMemo(() => ({
    container: {
      hidden: { opacity: 0, y: 20 },
      show: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.3,
          ease: "easeOut"
        }
      }
    },
    button: {
      hover: { scale: 1.05 },
      tap: { scale: 0.95 }
    }
  }), []);
}; 