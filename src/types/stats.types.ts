export type UserStats = {
  totalPoints: number;
  completedChallenges: number;
  currentStreak: number;
  bestStreak: number;
  averageScore: number;
  totalTimeSpent: number;
  level: number;
  experiencePoints: number;
  nextLevelThreshold: number;
  chartData: {
    daily: Array<{
      date: string;
      points: number;
      challenges: number;
    }>;
    categories: Array<{
      name: string;
      completed: number;
      total: number;
    }>;
  };
};

export type StatsContextType = {
  stats: UserStats | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}; 