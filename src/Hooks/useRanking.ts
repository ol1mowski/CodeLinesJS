import { useQuery, useQueryClient, QueryClient, useEffect } from '@tanstack/react-query';
import { RankingPeriod, RankingUser } from '../types/ranking.types';

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

  const { data, isLoading, isPreviousData } = useQuery({
    queryKey: [RANKING_QUERY_KEY, period, page],
    queryFn: () => fetchRanking(period, page),
    keepPreviousData: true,
    staleTime: 10 * 60 * 1000, // 10 minut dla rankingu
  });

  // Prefetch next page
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