import { useQuery } from '@tanstack/react-query';
import { type UserStats } from '../../../../types/stats.types';
import { fetchUserStats } from '../api/fetchUserStats.api';

export const useUserStats = () => {
  return useQuery<UserStats, Error>({
    queryKey: ['userStats'],
    queryFn: fetchUserStats,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      if (error instanceof Error && error.message.includes('401')) return false;
      if (error instanceof Error && error.message.includes('403')) return false;
      return failureCount < 3;
    },
  });
}; 