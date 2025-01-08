import { useQuery } from '@tanstack/react-query';
import { RankingPeriod, RankingUser } from '../types/ranking.types';

const mockRankingData: RankingUser[] = [
  {
    id: '1',
    name: 'Anna Kowalska',
    avatar: 'https://i.pravatar.cc/150?img=1',
    rank: 1,
    points: 15420,
    level: 42,
    badges: [
      { id: '1', name: 'Top Contributor', icon: '⭐' },
      { id: '2', name: 'Code Master', icon: '💎' },
    ],
    stats: {
      completedChallenges: 156,
      winStreak: 12,
      accuracy: 94,
    },
  },
  // Więcej użytkowników...
];

export const useRanking = (period: RankingPeriod) => {
  const { data, isLoading } = useQuery({
    queryKey: ['ranking', period],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockRankingData;
    }
  });

  return {
    users: data,
    isLoading
  };
}; 