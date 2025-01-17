export type RankingPeriod = 'daily' | 'weekly' | 'monthly' | 'allTime';

export interface RankingStats {
  rank: number;
  rankChange: number;
  activePlayers: number;
  activePlayersChange: number;
  completedChallenges: number;
  challengesChange: number;
  accuracy: number;
}

export interface RankingBadge {
  id: string;
  name: string;
  icon: string;
}

export interface RankingUser {
  id: string;
  name: string;
  avatar?: string;
  rank: number;
  points: number;
  level: number;
  badges: RankingBadge[];
  stats: RankingStats;
} 