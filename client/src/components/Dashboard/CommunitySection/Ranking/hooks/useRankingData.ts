import { useMemo } from 'react';
import { RankingResponse, useRanking } from './useRanking';

interface ProcessedUserStats {
  username?: string;
  rank: number | string;
  level: number | string;
  points: number | string;
}

export const useRankingData = () => {
  const { data, isLoading, error } = useRanking();

  const users = useMemo(() => {
    if (!data) return [];
    
    if (data && typeof data === 'object' && 'ranking' in data) {
      return (data as RankingResponse).ranking;
    }
    
    return Array.isArray(data) ? data : [];
  }, [data]);

  const currentUserStats = useMemo<ProcessedUserStats | null>(() => {
    if (!data) return null;
    
    let userStats = null;
    
    if (data && typeof data === 'object' && 'userStats' in data) {
      const stats = (data as RankingResponse).userStats;
      userStats = {
        username: stats.username,
        rank: stats.rank,
        level: stats.stats?.level || '-',
        points: stats.stats?.points || '-'
      };
    } else if (Array.isArray(data)) {
      const currentUser = data.find(u => u.rank !== undefined || u.position !== undefined);
      if (currentUser) {
        userStats = {
          username: currentUser.username,
          rank: currentUser.rank || currentUser.position || '-',
          level: currentUser.stats?.level || currentUser.level || '-',
          points: currentUser.stats?.points || currentUser.points || '-'
        };
      }
    }
    
    return userStats;
  }, [data]);

  return {
    users,
    currentUserStats,
    isLoading,
    error
  };
}; 