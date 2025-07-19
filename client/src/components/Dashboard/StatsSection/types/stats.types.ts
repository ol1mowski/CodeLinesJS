export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
}

export type UnlockedFeature = 'custom_themes' | 'create_challenges';

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
    progress: Array<{
      name: string;
      progress: number;
      timeSpent: number;
    }>; 
  };
  learning: {
    paths: Array<{
      pathId: string;
      title: string;
      progress: {
        completed: number;
        total: number;
        percentage: number;
        status: 'active' | 'completed' | 'paused' | 'locked';
      }
    }>; 
  };
};

export type LegacyUserStats = {
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

export type StatsContextType = {
  stats: UserStats | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
};
