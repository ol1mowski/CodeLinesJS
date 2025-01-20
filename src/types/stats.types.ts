export interface Badge {
  id: string;
  name: string;
  icon: string;
  earnedAt: string;
}

export type UnlockedFeature = 'custom_themes' | 'create_challenges';

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
  unlockedFeatures: UnlockedFeature[];
  levelUp?: boolean;
  rewards?: {
    badges: Badge[];
    bonusPoints: number;
    unlockedFeatures: UnlockedFeature[];
  };
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