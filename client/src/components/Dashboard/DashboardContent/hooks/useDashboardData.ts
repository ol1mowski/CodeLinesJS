import { useQuery } from '@tanstack/react-query';
import { DashboardData } from '../types/dashboard.types';
import { useAuth } from '../../../../hooks/useAuth';
import { fetchDashboardData } from '../api/fetchDashboardData.api';

export const useDashboardData = () => {
  const { isAuthenticated, isAuthChecking } = useAuth();

  const query = useQuery<DashboardData, Error>({
    queryKey: ['userProgress'],
    queryFn: () => fetchDashboardData(),
    enabled: isAuthenticated && !isAuthChecking,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60,
    retry: (failureCount, error) => {
      return failureCount < 2 && !error.message.includes('autoryzacji');
    },
  });

  // Loading jest true, jeśli query się ładuje LUB jeśli sprawdzamy autoryzację
  const isLoading = query.isLoading || isAuthChecking;

  return {
    ...query,
    isLoading,
  };
};
