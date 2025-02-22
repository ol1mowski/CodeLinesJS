import { useMemo } from 'react';

export const useFormatTime = () => {
  return useMemo(() => (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }, []);
}; 