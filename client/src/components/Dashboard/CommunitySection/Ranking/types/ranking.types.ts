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
  level: number;
  points: number;
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
  username: string;
  avatar?: string;
  position: number;
  rank: number;
  points: number;
  level: number;
  badges: RankingBadge[];
  streak: number;
  stats: RankingStats;
  isCurrentUser?: boolean;
};

export interface RankingResponse {
  ranking: RankingUser[];
  totalUsers: number;
  userStats: {
    rank: number;
    total: number;
    username: string;
    avatar: string | null;
    stats: {
      level: number;
      points: number;
    };
    isCurrentUser: boolean;
  };
  meta: {
    page: number;
    limit: number;
    totalPages: number;
    totalResults: number;
  };
} 