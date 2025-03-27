import { useQuery } from '@tanstack/react-query';
import { fetchLearningPaths } from '../../lib/api/paths';
import type { PathsResponse } from '../types/learning-paths.types';
import { useAuth } from '../../../../../Hooks/useAuth';

export const useLearningPaths = () => {
  const { token } = useAuth();
  
  const {
    data,
    isLoading,
    error,
    refetch
  } = useQuery<PathsResponse, Error>({
    queryKey: ['learningPaths', 'userProgress'],
    queryFn: () => fetchLearningPaths(token || ''),
    staleTime: 1000 * 60 * 5,
    retry: 2,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    enabled: !!token
  });

  return {
    paths: data?.paths || [],
    userStats: data?.userStats,
    isLoading,
    error,
    refetch,
    isEmpty: !data?.paths || data.paths.length === 0
  };
}; 