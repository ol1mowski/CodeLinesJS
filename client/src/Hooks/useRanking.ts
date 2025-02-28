import { QueryClient, useQuery } from '@tanstack/react-query';
import { RankingUser, RankingUserStats } from '../types/ranking.types';
import { rankingApi } from '../api/ranking/ranking.api';

const RANKING_QUERY_KEY = 'ranking';

type RankingResponse = {
  users: RankingUser[];
  userStats: RankingUserStats;
}

export const useRanking = () => {
  return useQuery<RankingResponse>({
    queryKey: [RANKING_QUERY_KEY],
    queryFn: async () => {
      const response = await rankingApi.getRanking();
      return response as unknown as RankingResponse;
    },
    staleTime: 1000 * 60 * 5, 
  });
};

export const prefetchRanking = async (queryClient: QueryClient) => {
  await queryClient.prefetchQuery({
    queryKey: [RANKING_QUERY_KEY],
    queryFn: () => rankingApi.getRanking(),
  });
}; 