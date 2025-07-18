import { useQuery } from '@tanstack/react-query';
import { fetchLearningPaths } from '../../lib/api/paths';
import type { PathsResponse } from '../types/learning-paths.types';
import { useAuth } from '../../../../Auth/hooks/useAuth.hook';

export const useLearningPaths = () => {
  const { isAuthenticated, isAuthChecking } = useAuth();

  const { data, isLoading, error, refetch } = useQuery<PathsResponse, Error>({
    queryKey: ['learningPaths', 'userProgress'],
    queryFn: () => fetchLearningPaths(),
    staleTime: 1000 * 60 * 5,
    retry: 2,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    enabled: isAuthenticated && !isAuthChecking,
  });

  // Loading jest true, jeśli query się ładuje LUB jeśli dane nie są jeszcze dostępne
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
