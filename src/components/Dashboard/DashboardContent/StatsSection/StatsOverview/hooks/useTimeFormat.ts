import { useCallback } from 'react';

export const useTimeFormat = () => {
  return useCallback((minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }, []);
}; 