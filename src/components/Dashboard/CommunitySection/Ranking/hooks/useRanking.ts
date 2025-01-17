import { useQuery, useQueryClient, QueryClient } from '@tanstack/react-query';
import { RankingPeriod } from '../../../../../types/ranking.types';

const RANKING_QUERY_KEY = 'ranking';

const fetchRanking = async (period: RankingPeriod) => {
  const response = await fetch(`http://localhost:5001/api/ranking?period=${period}`);
  if (!response.ok) {
    throw new Error('Failed to fetch ranking');
  }
  return response.json();
};

export const prefetchRanking = async (
  queryClient: QueryClient,
  period: RankingPeriod
) => {
  await queryClient.prefetchQuery({
    queryKey: [RANKING_QUERY_KEY, period],
    queryFn: () => fetchRanking(period),
  });
};

export const useRanking = (period: RankingPeriod) => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: [RANKING_QUERY_KEY, period],
    queryFn: () => fetchRanking(period),
    staleTime: 5 * 60 * 1000, 
  });

  const prefetchNextPeriod = async (nextPeriod: RankingPeriod) => {
    await prefetchRanking(queryClient, nextPeriod);
  };

  return {
    data,
    isLoading,
    error,
    prefetchNextPeriod
  };
}; 