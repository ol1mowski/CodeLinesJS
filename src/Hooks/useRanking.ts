import { useQuery } from '@tanstack/react-query';
import { RankingPeriod, RankingUser } from '../types/ranking.types';

const PAGE_SIZE = 10;

const generateMockData = (period: RankingPeriod): RankingUser[] => {
  return Array.from({ length: 100 }, (_, i) => ({
    id: (i + 1).toString(),
    name: `Użytkownik ${i + 1}`,
    avatar: `https://i.pravatar.cc/150?img=${(i % 10) + 1}`,
    rank: i + 1,
    points: Math.floor(Math.random() * 100000),
    level: Math.floor(Math.random() * 100),
    badges: [
      { id: '1', name: `${period} Champion`, icon: '👑' },
      { id: '2', name: 'Code Master', icon: '💎' },
    ],
    stats: {
      completedChallenges: Math.floor(Math.random() * 1000),
      winStreak: Math.floor(Math.random() * 50),
      accuracy: Math.floor(Math.random() * 20) + 80,
    },
  }));
};

const mockRankingData: Record<RankingPeriod, RankingUser[]> = {
  daily: generateMockData('daily'),
  weekly: generateMockData('weekly'),
  monthly: generateMockData('monthly'),
  allTime: generateMockData('allTime'),
};

export const useRanking = (period: RankingPeriod, page: number = 0) => {
  const { data, isLoading, isPreviousData } = useQuery({
    queryKey: ['ranking', period, page],
    queryFn: async () => {
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
    },
    keepPreviousData: true
  });

  return {
    ...data,
    isLoading,
    isPreviousData
  };
}; 