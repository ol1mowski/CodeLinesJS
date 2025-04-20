import { useQuery } from '@tanstack/react-query';

import { useAuth } from '../../../../../hooks/useAuth';
import { fetchRanking } from '../api/fetchRanking.api';
import { RankingResponse, RankingUser } from '../types/ranking.types';

const RANKING_QUERY_KEY = 'ranking';

export type { RankingResponse, RankingUser };

export const useRanking = () => {
  const { token } = useAuth();

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery<{
    status: string;
    code: number;
    message: string;
    data: RankingResponse;
    meta: any;
  }, Error>({
    queryKey: [RANKING_QUERY_KEY],
    queryFn: () => fetchRanking(token || ''),
    staleTime: 5 * 60 * 1000, // 5 minut
    retry: (failureCount, error) => {
      return failureCount < 3 && !error.message.includes('autoryzacji');
    },
    enabled: !!token,
  });

  const rankingData = data?.data;
  const ranking = rankingData?.ranking || [];
  const totalUsers = rankingData?.totalUsers || 0;
  const userStats = rankingData?.userStats || null;
  
  return {
    data: rankingData,
    ranking,
    totalUsers,
    userStats,
    isLoading,
    error,
    refetch,
  };
};
