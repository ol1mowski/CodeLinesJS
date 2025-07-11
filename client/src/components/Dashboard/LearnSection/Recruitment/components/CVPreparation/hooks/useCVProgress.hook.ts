import { useCallback } from 'react';
import { updateProgress } from '../api/cv.api';

interface UseCVProgressProps {
  refreshStats: () => Promise<void>;
}

export const useCVProgress = ({ refreshStats }: UseCVProgressProps) => {
  const trackProgress = useCallback(async (
    type: 'tip_viewed' | 'example_viewed' | 'example_copied', 
    itemId: string
  ) => {
    try {
      await updateProgress({ type, itemId });
      await refreshStats();
    } catch (err) {
      console.error('Błąd podczas śledzenia postępu:', err);
    }
  }, [refreshStats]);

  return {
    trackProgress
  };
}; 