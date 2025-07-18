import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../../../Auth/hooks/useAuth.hook';
import { useApi } from '../../../../../api/hooks/useApi.hook';
import type { PathsResponse } from '../types/learning-paths.types';

export const useLearningPaths = () => {
  const { isAuthenticated, isAuthChecking } = useAuth();
  const api = useApi<PathsResponse>();

  const { data, isLoading, error, refetch } = useQuery<PathsResponse, Error>({
    queryKey: ['learningPaths', 'userProgress'],
    queryFn: async () => {
      const response = await api.get('Learning-paths');
      if (response.error) {
        throw new Error(response.error);
      }
      if (!response.data) {
        throw new Error('Brak danych z serwera');
      }
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    retry: 2,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    enabled: isAuthenticated && !isAuthChecking,
  });

  const isDataLoading = isLoading || (!data && !error);

  return {
    paths: data?.data.paths || [],
    userStats: data?.data.userStats,
    isLoading: isDataLoading,
    error,
    refetch,
    isEmpty: !data?.data.paths || data.data.paths.length === 0,
  };
};
