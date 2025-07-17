import { useQuery } from '@tanstack/react-query';
import { UserStats } from '../../../../types/stats.types';
import { useAuth } from '../../../../hooks/useAuth';
import { fetchStats } from '../api/fetchStats.api';

export const useStats = () => {
  const { isAuthenticated, isAuthChecking } = useAuth();

  const query = useQuery<UserStats, Error>({
    queryKey: ['userStats'],
    queryFn: () => fetchStats(),
    enabled: isAuthenticated && !isAuthChecking,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    retry: (failureCount, error) => {
      if (error.message === 'Brak autoryzacji') return false;
      return failureCount < 3;
    },
  });

  // Loading jest true, jeśli query się ładuje LUB jeśli sprawdzamy autoryzację
  const isLoading = query.isLoading || isAuthChecking;

  return { 
    stats: query.data, 
    isLoading, 
    error: query.error 
  };
};
