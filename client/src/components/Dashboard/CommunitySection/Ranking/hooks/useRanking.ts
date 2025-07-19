import { httpClient } from "../../../../../api/httpClient.api";
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { RankingUser } from '../types/ranking.types';


type UseRankingResult = {
  ranking: RankingUser[] | undefined;
  totalUsers: number;
  userStats: any;
  isLoading: boolean;
  error: Error | null;
  page: number;
  limit: number;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (pageNumber: number) => void;
  totalPages: number;
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  } | null;
};

export const useRanking = (
  initialPage = 1,
  initialLimit = 10
): UseRankingResult => {
  const [page, setPage] = useState(initialPage);
  const limit = initialLimit;
  

  const {
    data: response,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['ranking', page, limit],
    queryFn: async () => {
      const response = await httpClient.get(`ranking?page=${page}&limit=${limit}`);
      if (response.error) {
        throw new Error(response.error);
      }
      if (!response.data) {
        throw new Error('Brak danych z serwera');
      }
      return response.data;
    },
  });

  const ranking = response?.ranking;
  const totalUsers = response?.totalUsers || 0;
  const meta = response?.meta;
  const totalPages = meta?.totalPages || Math.ceil(totalUsers / limit);

  const nextPage = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setPage(pageNumber);
    }
  };

  return {
    ranking,
    totalUsers,
    userStats: response?.userStats,
    isLoading,
    error: error as Error | null,
    page,
    limit,
    nextPage,
    prevPage,
    goToPage,
    totalPages,
    pagination: meta ? {
      page: meta.page,
      limit: meta.limit,
      totalItems: meta.totalResults,
      totalPages: meta.totalPages
    } : null
  };
};
