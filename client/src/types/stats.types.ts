export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
}

export type UnlockedFeature = 'custom_themes' | 'create_challenges';

export type LegacyUserStats = {
  data: {
    progress: {
      level: number;
      points: number;
      pointsToNextLevel: number;
    };
    achievements: {
      streak: {
        current: number;
        best: number;
      };
      completedChallenges: number;
      badges: Badge[];
    };
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
};

export type UserStats = {
  user: {
    lastActive: string;
  };
  progress: {
    level: number;
    points: number;
    pointsToNextLevel: number;
    levelUp?: boolean;
  };
  achievements: {
    streak: {
      current: number;
      best: number;
    };
    completedChallenges: number;
    badges: Badge[];
  };
  stats: {
    daily: Array<{
      date: string;
      points: number;
      challenges: number;
    }>;
    progress: Array<any>; // Można uszczegółowić ten typ jeśli mamy więcej informacji
  };
  learning: {
    paths: Array<any>; // Można uszczegółowić ten typ jeśli mamy więcej informacji
  };
};

export type StatsContextType = {
  stats: UserStats | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
};
