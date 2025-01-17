import { QueryClient, useQuery } from '@tanstack/react-query';
import { RankingPeriod } from '../types/ranking.types';
import { rankingApi } from '../api/ranking/ranking.api';

const RANKING_QUERY_KEY = 'ranking';

export const useRanking = (period: RankingPeriod) => {
  return useQuery({
    queryKey: [RANKING_QUERY_KEY, period],
    queryFn: () => rankingApi.getRanking(period),
    staleTime: 1000 * 60 * 5, 
  });
};

export const prefetchRanking = async (queryClient: QueryClient, period: RankingPeriod) => {
  await queryClient.prefetchQuery({
    queryKey: [RANKING_QUERY_KEY, period],
    queryFn: () => rankingApi.getRanking(period),
  });
}; 