import { useMemo } from 'react';
import { useRanking } from './useRanking';

interface ProcessedUserStats {
  username?: string;
  rank: number | string;
  level: number | string;
  points: number | string;
}

export const useRankingData = () => {
  const { data, ranking, userStats, isLoading, error, pagination } = useRanking();

  const users = useMemo(() => {
    if (ranking && ranking.length > 0) {
      return ranking;
    }

    if (data && 'ranking' in data) {
      return data.ranking;
    }

    return [];
  }, [ranking, data]);

  const currentUserStats = useMemo<ProcessedUserStats | null>(() => {
    if (userStats) {
      return {
        username: userStats.username,
        rank: userStats.rank,
        level: userStats.stats?.level || '-',
        points: userStats.stats?.points || '-',
      };
    }

    if (data && 'userStats' in data) {
      const stats = data.userStats;
      return {
        username: stats.username,
        rank: stats.rank,
        level: stats.stats?.level || '-',
        points: stats.stats?.points || '-',
      };
    }

    return null;
  }, [userStats, data]);

  return {
    users,
    currentUserStats,
    isLoading,
    error,
    pagination,
  };
};
