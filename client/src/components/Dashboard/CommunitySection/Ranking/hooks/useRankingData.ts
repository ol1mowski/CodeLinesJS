import { useMemo } from 'react';
import { useRanking } from './useRanking';

interface ProcessedUserStats {
  username?: string;
  rank: number | string;
  level: number | string;
  points: number | string;
  avatar?: string | null;
}

export const useRankingData = () => {
  const { 
    ranking, 
    userStats, 
    isLoading, 
    error, 
    page, 
    limit,
    totalPages, 
    nextPage, 
    prevPage, 
    goToPage 
  } = useRanking();

  const users = useMemo(() => {
    return ranking || [];
  }, [ranking]);

  const currentUserStats = useMemo<ProcessedUserStats | null>(() => {
    if (userStats) {
      return {
        username: userStats.username,
        rank: userStats.rank,
        level: userStats.stats?.level || '-',
        points: userStats.stats?.points || '-',
        avatar: userStats.avatar
      };
    }
    return null;
  }, [userStats]);

  const paginationData = useMemo(() => ({
    page,
    limit,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
    nextPage,
    prevPage,
    goToPage,
    isLoadingPage: isLoading && !!users.length,
  }), [page, limit, totalPages, nextPage, prevPage, goToPage, isLoading, users.length]);

  return {
    users,
    currentUserStats,
    isLoading,
    error,
    pagination: paginationData,
  };
};
