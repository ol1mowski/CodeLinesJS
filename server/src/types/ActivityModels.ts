export interface ActivityData {
  points: number;
  challenges: number;
  timeSpent: number;
}


export interface DailyProgress {
  date: string;
  points: number;
  challenges: number;
  timeSpent: number;
}


export interface StreakData {
  streak: number;
  bestStreak: number;
  streakUpdated: boolean;
  streakBroken: boolean;
  daysInactive: number;
}


export interface LevelData {
  level: number;
  points: number;
  pointsRequired: number;
  progress: number;
  leveledUp?: boolean;
  levelsGained?: number;
}


export interface StreakResponse {
  status: string;
  data: {
    streak: number;
    bestStreak: number;
  };
}


export interface DailyProgressResponse {
  status: string;
  data: {
    dailyProgress: DailyProgress;
    level: LevelData;
  };
}


export interface ActivityHistoryResponse {
  status: string;
  data: {
    activityHistory: Array<DailyProgress>;
  };
}

export interface ActivityResponse {
  status: string;
  message: string;
  data: {
    streak: {
      current: number;
      best: number;
      updated: boolean;
      broken: boolean;
      daysInactive: number;
    };
    dailyProgress: DailyProgress;
    level: LevelData;
    stats: {
      totalTimeSpent: number;
      completedChallenges: number;
    };
  };
}

export interface UpdateResult {
  level: LevelData;
  streak: StreakData;
  dailyProgress: {
    dailyProgress: DailyProgress;
    totalTimeSpent: number;
    completedChallenges: number;
  };
} 