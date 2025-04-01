import { Request } from 'express';
import { Types } from 'mongoose';

export interface AuthRequest extends Request {
  user: {
    userId: string;
    email: string;
    username?: string;
    role: string;
    accountType?: string;
    [key: string]: any;
  };
}

export interface UserStatsDTO {
  level: number;
  points: number;
  xp: number;
  pointsToNextLevel: number;
  levelProgress: number;
  streak: number;
  bestStreak: number;
  lastActive: Date | string;
  experiencePoints: number;
  nextLevelThreshold: number;
  completedChallenges: number;
  currentStreak: number;
  averageScore: number;
  totalTimeSpent: number;
  badges: BadgeDTO[];
  unlockedFeatures: string[];
  chartData: ChartDataDTO;
  username?: string;
  learningPaths?: LearningPathProgressDTO[];
  summary?: StatsSummaryDTO;
}

export interface StatsSummaryDTO {
  totalPaths: number;
  completedPaths: number;
  inProgress: number;
  averageCompletion: number;
}

export interface BadgeDTO {
  name: string;
  icon: string;
  earnedAt: Date | string;
  description: string;
}

export interface DailyStatsDTO {
  date: string;
  points: number;
  timeSpent: number;
}

export interface ProgressStatsDTO {
  name: string;
  progress: number;
  timeSpent: number;
}

export interface ChartDataDTO {
  daily: DailyStatsDTO[];
  progress: ProgressStatsDTO[];
}

export interface LearningPathProgressDTO {
  pathId: Types.ObjectId | string;
  title: string;
  progress: {
    completed: number;
    total: number;
    percentage: number;
    status: 'active' | 'completed' | 'locked';
  };
}

export interface UpdateStatsDTO {
  points?: number;
  xp?: number;
  completedChallenges?: number;
  challenges?: number;
  averageScore?: number;
  totalTimeSpent?: number;
  timeSpent?: number;
}

export interface LevelUpdateResult {
  leveledUp: boolean;
  levelsGained: number;
}

export interface StatsSuccessResponseDTO {
  status: 'success';
  data: UserStatsDTO & {
    leveledUp?: boolean;
    levelsGained?: number;
    summary?: StatsSummaryDTO;
  };
}

export interface DailyStatsResponseDTO {
  status: 'success';
  data: DailyStatsDTO[];
}

export interface DefaultStatsConfig {
  DEFAULT_VALUES: {
    points: number;
    xp: number;
    level: number;
    streak: number;
    bestStreak: number;
    completedChallenges: number;
    averageScore: number;
    totalTimeSpent: number;
    pointsToNextLevel: number;
  };
} 