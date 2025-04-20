export interface RankingUser {
  id: string;
  _id: string;
  username: string;
  points: number;
  level: number;
  avatar: string | null;
  position: number;
  rank: string;
  progress: {
    currentPoints: number;
    nextRankPoints: number;
    percentage: number;
  };
  stats?: {
    level: number;
    points: number;
  };
}

export interface RankingResponse {
  ranking: RankingUser[];
  totalUsers: number;
  userStats: {
    rank: number;
    total: number;
    username: string;
    stats: {
      level: number;
      points: number;
    };
    isCurrentUser: boolean;
  };
} 