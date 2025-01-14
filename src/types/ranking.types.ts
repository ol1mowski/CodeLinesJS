export type RankingUser = {
  id: string;
  name: string;
  avatar?: string;
  rank: number;
  points: number;
  level: number;
  badges: Array<{
    id: string;
    name: string;
    icon: string;
  }>;
  stats: {
    completedChallenges: number;
    winStreak: number;
    accuracy: number;
  };
};

export type RankingPeriod = "daily" | "weekly" | "monthly" | "allTime"; 