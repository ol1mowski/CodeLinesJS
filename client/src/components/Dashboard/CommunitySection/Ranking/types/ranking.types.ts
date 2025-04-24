export interface RankingUser {
  id: string;
  _id: string;
  username: string;
  points: number;
  level: number;
  avatar: string | null;
  position: number;
  rank: string;
  isCurrentUser?: boolean;
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