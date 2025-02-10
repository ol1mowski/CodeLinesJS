import { QueryClient, useQuery } from '@tanstack/react-query';
import { RankingPeriod, RankingStats, RankingUser } from '../types/ranking.types';
import { rankingApi } from '../api/ranking/ranking.api';

const RANKING_QUERY_KEY = 'ranking';

interface RankingResponse {
  users: RankingUser[];
  stats: RankingStats;
}

export const useRanking = (period: RankingPeriod) => {
  return useQuery<RankingResponse>({
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