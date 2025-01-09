import { useQuery } from '@tanstack/react-query';
import { UserStats } from '../types/stats.types';
import { mockStatsData } from '../mocks/statsData.mock';

export const useStats = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['userStats'],
    queryFn: async () => {
      // Symulacja opóźnienia sieciowego
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockStatsData as UserStats;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });

  return {
    stats: data,
    isLoading,
    error: error ? (error as Error).message : null,
    refetch
  };
}; 