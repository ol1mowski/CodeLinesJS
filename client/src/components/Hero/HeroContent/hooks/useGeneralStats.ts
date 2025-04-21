import { useQuery } from '@tanstack/react-query';
import { fetchGeneralStats, GeneralGameStats } from '../api/stats.api';

export const GENERAL_STATS_QUERY_KEY = ['generalStats'];

export const useGeneralStats = () => {
  const { data, isLoading, error } = useQuery<GeneralGameStats>({
    queryKey: GENERAL_STATS_QUERY_KEY,
    queryFn: fetchGeneralStats,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });

  const statsArray = data ? [
    { value: data.lessons.value, label: data.lessons.label },
    { value: data.games.value, label: data.games.label },
    { value: data.users.value, label: data.users.label },
  ] : [];

  return {
    stats: statsArray,
    isLoading,
    error,
    data,
  };
}; 