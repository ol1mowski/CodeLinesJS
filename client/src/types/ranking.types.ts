export type RankingPeriod = 'daily' | 'weekly' | 'monthly' | 'allTime';

export type RankingStats = {
  rank: number;
  rankChange: number;
  activePlayers: number;
  activePlayersChange: number;
  completedChallenges: number;
  challengesChange: number;
  accuracy: number;
  winStreak: number;
};

export type RankingUserStats = {
  rank: number;
  points: number;
  level: number;
  streak: number;
};

export type RankingBadge = {
  id: string;
  name: string;
  icon: string;
};

export type RankingUser = {
  id: string;
  name: string;
  avatar?: string;
  rank: number;
  points: number;
  level: number;
  badges: RankingBadge[];
  streak: number;
  stats: RankingStats;
};
