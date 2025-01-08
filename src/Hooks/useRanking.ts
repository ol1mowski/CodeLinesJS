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
  {
    id: '2',
    name: 'Jan Nowak',
    avatar: 'https://i.pravatar.cc/150?img=2',
    rank: 2,
    points: 14250,
    level: 38,
    badges: [
      { id: '3', name: 'Problem Solver', icon: '🔥' },
      { id: '4', name: 'Quick Learner', icon: '⚡' },
    ],
    stats: {
      completedChallenges: 142,
      winStreak: 8,
      accuracy: 91,
    },
  },
  {
    id: '3',
    name: 'Marta Wiśniewska',
    avatar: 'https://i.pravatar.cc/150?img=3',
    rank: 3,
    points: 13800,
    level: 35,
    badges: [
      { id: '5', name: 'Code Ninja', icon: '🥷' },
    ],
    stats: {
      completedChallenges: 128,
      winStreak: 15,
      accuracy: 88,
    },
  }
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