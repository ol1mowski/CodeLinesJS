import { useQuery } from '@tanstack/react-query';
import { DashboardData } from '../types/dashboard.types';
import { useAuth } from '../../../../hooks/useAuth';
import { fetchDashboardData } from '../api/fetchDashboardData.api';

export const useDashboardData = () => {
  const { token } = useAuth();

  return useQuery<DashboardData, Error>({
    queryKey: ['userProgress'],
    queryFn: () => fetchDashboardData(token || ''),
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60,
    retry: (failureCount, error) => {
      return failureCount < 2 && !error.message.includes('autoryzacji');
    },
  });
};
