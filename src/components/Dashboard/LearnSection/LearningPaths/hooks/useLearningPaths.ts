import { useQuery } from '@tanstack/react-query';
import { fetchLearningPaths } from '../../lib/api/paths';
import type { PathsResponse } from '../types/learning-paths.types';

export const useLearningPaths = () => {
  const {
    data,
    isLoading,
    error,
    refetch
  } = useQuery<PathsResponse>({
    queryKey: ['learningPaths'],
    queryFn: fetchLearningPaths,
    staleTime: 1000 * 60 * 5,
    retry: 2,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
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