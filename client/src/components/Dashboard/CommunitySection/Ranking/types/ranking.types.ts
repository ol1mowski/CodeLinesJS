export interface RankingUser {
  position: number;
  username: string;
  avatar: string | null;
  isCurrentUser?: boolean;
  stats: {
    level: number;
    points: number;
    streak: number;
    bestStreak: number;
    lastActive: Date | null;
  };
}

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