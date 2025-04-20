import { LearningPath } from '../../types/learning.types';

export interface UserStats {
  totalPoints: number;
  totalPaths: number;
  completedPaths: number;
  pathsInProgress: number;
  recentActivity: Array<{
    pathId: string;
    completedLessons: number;
    lastCompletedAt: string;
  }>;
}

export interface PathsResponse {
  data: {
    paths: LearningPath[];
    userStats: UserStats;
  };
}
