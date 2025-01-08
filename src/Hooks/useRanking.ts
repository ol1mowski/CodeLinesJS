import { useQuery, useQueryClient, QueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { RankingPeriod, RankingUser } from '../types/ranking.types';
import { useRankingWorker } from './useRankingWorker';

const RANKING_QUERY_KEY = 'ranking';
const PAGE_SIZE = 10;

const generateMockData = (period: RankingPeriod): RankingUser[] => {
  // ... istniejący kod
};

const mockRankingData: Record<RankingPeriod, RankingUser[]> = {
  daily: generateMockData('daily'),
  weekly: generateMockData('weekly'),
  monthly: generateMockData('monthly'),
  allTime: generateMockData('allTime'),
};

const fetchRanking = async (period: RankingPeriod, page: number) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const start = page * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const users = mockRankingData[period].slice(start, end);
  const totalPages = Math.ceil(mockRankingData[period].length / PAGE_SIZE);
  
  return {
    users,
    totalPages,
    currentPage: page,
    hasNextPage: page < totalPages - 1,
    hasPreviousPage: page > 0
  };
};

export const prefetchRanking = async (
  queryClient: QueryClient,
  period: RankingPeriod,
  page: number
) => {
  await queryClient.prefetchQuery({
    queryKey: [RANKING_QUERY_KEY, period, page],
    queryFn: () => fetchRanking(period, page),
  });
};

export const useRanking = (period: RankingPeriod, page: number = 0) => {
  const queryClient = useQueryClient();
  const { sortUsers } = useRankingWorker();

  const { data, isLoading, isPreviousData } = useQuery({
    queryKey: [RANKING_QUERY_KEY, period, page],
    queryFn: async () => {
      const result = await fetchRanking(period, page);
  
      const sortedUsers = await sortUsers(result.users);
      return { ...result, users: sortedUsers };
    },
    keepPreviousData: true,
    staleTime: 10 * 60 * 1000,
  });


  useEffect(() => {
    if (data?.hasNextPage) {
      queryClient.prefetchQuery({
        queryKey: [RANKING_QUERY_KEY, period, page + 1],
        queryFn: () => fetchRanking(period, page + 1),
      });
    }
  }, [queryClient, period, page, data?.hasNextPage]);

  return {
    ...data,
    isLoading,
    isPreviousData
  };
}; 