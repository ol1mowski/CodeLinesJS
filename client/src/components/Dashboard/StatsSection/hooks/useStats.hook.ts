import { useQuery } from '@tanstack/react-query';
import { UserStats } from '../../../../types/stats.types';
import { useAuth } from '../../../../hooks/useAuth';
import { fetchStats } from '../api/fetchStats.api';

export const useStats = () => {
  const { isAuthenticated } = useAuth();

  const {
    data: stats,
    isLoading,
    error,
  } = useQuery<UserStats, Error>({
    queryKey: ['userProgress'],
    queryFn: () => fetchStats('authenticated'),
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    retry: (failureCount, error) => {
      if (error.message === 'Brak autoryzacji') return false;
      return failureCount < 3;
    },
  });

  return { stats, isLoading, error };
};
