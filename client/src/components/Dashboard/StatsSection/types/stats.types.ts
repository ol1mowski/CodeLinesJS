export type Badge = {
  id: string;
  name: string;
  icon: string;
  earnedAt: string;
  description?: string;
};

export type UserStats = {
  level: number;
  experiencePoints: number;
  nextLevelThreshold: number;
  completedChallenges: number;
  currentStreak: number;
  bestStreak: number;
  averageScore: number;
  totalTimeSpent: number;
  badges: Badge[];
  unlockedFeatures: string[];
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
