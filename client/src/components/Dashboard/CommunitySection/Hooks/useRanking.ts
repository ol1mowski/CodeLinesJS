import { useQuery } from '@tanstack/react-query';

import { fetchRanking } from '../api/FetchRanking.api';
import { RankingUserStats, RankingUser } from '../../../../types/ranking.types';

const RANKING_QUERY_KEY = 'ranking';

export type RankingResponse = {
  users: RankingUser[];
  userStats: RankingUserStats;
};

export const useRanking = () => {
  return useQuery<RankingResponse, Error>({
    queryKey: [RANKING_QUERY_KEY],
    queryFn: async () => {
      const response = await fetchRanking();
      return response as unknown as RankingResponse;
    },
    staleTime: 1000 * 60 * 5,
  });
};
