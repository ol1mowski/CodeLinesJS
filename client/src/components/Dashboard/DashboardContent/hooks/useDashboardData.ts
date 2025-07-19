import { httpClient } from "../../../../api/httpClient.api";
import { useQuery } from '@tanstack/react-query';
import { DashboardData } from '../types/dashboard.types';
import { useAuth } from '../../../Auth/hooks/useAuth.hook';


export const useDashboardData = () => {
  const { isAuthenticated, isAuthChecking } = useAuth();
  

  const query = useQuery<DashboardData, Error>({
    queryKey: ['userProgress'],
    queryFn: async () => {
      const response = await httpClient.get('users/stats');
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
    refetchInterval: 1000 * 60,
    retry: (failureCount, error) => {
      return failureCount < 2 && !error.message.includes('autoryzacji');
    },
  });

  const isLoading = query.isLoading || isAuthChecking;

  return {
    ...query,
    isLoading,
  };
};
