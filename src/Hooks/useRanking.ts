import { useQuery } from '@tanstack/react-query';
import { RankingPeriod, RankingUser } from '../types/ranking.types';

const mockRankingData: Record<RankingPeriod, RankingUser[]> = {
  daily: [
    {
      id: '1',
      name: 'Anna Kowalska',
      avatar: 'https://i.pravatar.cc/150?img=1',
      rank: 1,
      points: 520,
      level: 42,
      badges: [
        { id: '1', name: 'Daily Champion', icon: '👑' },
        { id: '2', name: 'Code Master', icon: '💎' },
      ],
      stats: {
        completedChallenges: 12,
        winStreak: 5,
        accuracy: 94,
      },
    }
  ],
  weekly: [
    {
      id: '1',
      name: 'Anna Kowalska',
      avatar: 'https://i.pravatar.cc/150?img=1',
      rank: 1,
      points: 15420,
      level: 42,
      badges: [
        { id: '1', name: 'Weekly Leader', icon: '🏆' },
        { id: '2', name: 'Code Master', icon: '💎' },
      ],
      stats: {
        completedChallenges: 156,
        winStreak: 12,
        accuracy: 94,
      },
    }
  ],
  monthly: [
    {
      id: '1',
      name: 'Anna Kowalska',
      avatar: 'https://i.pravatar.cc/150?img=1',
      rank: 1,
      points: 45420,
      level: 42,
      badges: [
        { id: '1', name: 'Monthly Champion', icon: '🌟' },
        { id: '2', name: 'Code Master', icon: '💎' },
      ],
      stats: {
        completedChallenges: 456,
        winStreak: 25,
        accuracy: 94,
      },
    }
  ],
  allTime: [
    {
      id: '1',
      name: 'Anna Kowalska',
      avatar: 'https://i.pravatar.cc/150?img=1',
      rank: 1,
      points: 145420,
      level: 42,
      badges: [
        { id: '1', name: 'All-Time Legend', icon: '⭐' },
        { id: '2', name: 'Code Master', icon: '💎' },
      ],
      stats: {
        completedChallenges: 1256,
        winStreak: 45,
        accuracy: 94,
      },
    }
  ]
};

export const useRanking = (period: RankingPeriod) => {
  const { data, isLoading } = useQuery({
    queryKey: ['ranking', period],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockRankingData[period];
    }
  });

  return {
    users: data,
    isLoading
  };
}; 