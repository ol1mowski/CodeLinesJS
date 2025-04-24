import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useAuth } from '../../../../../hooks/useAuth';
import { fetchRanking } from '../api/fetchRanking.api';
import { RankingResponse, RankingUser } from '../types/ranking.types';

const RANKING_QUERY_KEY = 'ranking';

export type { RankingResponse, RankingUser };

export const useRanking = () => {
  const { token } = useAuth();
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Stała wartość, można dodać opcję zmiany

  const {
    data,
    isLoading,
    error,
    refetch,
    isFetching,
    isPending
  } = useQuery({
    queryKey: [RANKING_QUERY_KEY, page, limit],
    queryFn: () => fetchRanking(token || '', { page, limit }),
    staleTime: 5 * 60 * 1000, // 5 minut
    retry: (failureCount, error) => {
      return failureCount < 3 && !error.message.includes('autoryzacji');
    },
    enabled: !!token,
    placeholderData: (previousData) => previousData, // Zastępuje keepPreviousData w nowszej wersji
  });

  const responseData = data;
  const rankingData = responseData?.data;
  const ranking = rankingData?.ranking || [];
  const totalUsers = rankingData?.totalUsers || 0;
  const userStats = rankingData?.userStats || null;
  
  // Obliczanie całkowitej liczby stron
  const totalPages = Math.ceil(totalUsers / limit);
  
  // Funkcje do nawigacji między stronami
  const nextPage = () => {
    if (page < totalPages) {
      setPage(p => p + 1);
    }
  };
  
  const prevPage = () => {
    if (page > 1) {
      setPage(p => p - 1);
    }
  };
  
  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setPage(pageNumber);
    }
  };
  
  return {
    data: rankingData,
    ranking,
    totalUsers,
    userStats,
    isLoading,
    error,
    refetch,
    pagination: {
      page,
      limit,
      totalPages,
      nextPage,
      prevPage,
      goToPage,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
      isLoadingPage: isFetching || isPending
    },
  };
};
