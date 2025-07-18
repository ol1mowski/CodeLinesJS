import { useQuery } from '@tanstack/react-query';
import { UserStats } from '../types/stats.types';
import { useAuth } from '../../../Auth/hooks/useAuth.hook';
import { useApi } from '../../../../api/hooks/useApi.hook';

export const useStats = () => {
  const { isAuthenticated, isAuthChecking } = useAuth();
  const api = useApi<UserStats>();

  const query = useQuery<UserStats, Error>({
    queryKey: ['userStats'],
    queryFn: async () => {
      const response = await api.get('users/stats');
      if (response.error) {
        throw new Error(response.error);
      }
      if (!response.data) {
        throw new Error('Brak danych z serwera');
      }
      return response.data;
    },
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
