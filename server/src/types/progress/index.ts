import { Document, Types } from 'mongoose';
import { Request } from 'express';

export interface ICompletedLesson {
  lessonId: Types.ObjectId;
  completedAt: Date;
}

export interface IPathProgress {
  completedLessons: ICompletedLesson[];
  totalLessons: number;
  lastLesson?: Types.ObjectId;
  lastActivity: Date;
  startedAt: Date;
  completedAt?: Date;
}

export interface ILearningPathStats {
  pathId: Types.ObjectId;
  status: 'active' | 'completed' | 'paused';
  progress: IPathProgress;
}

export interface IUserStats {
  level: number;
  points: number;
  pointsToNextLevel: number;
  xp: number;
  streak: number;
  bestStreak: number;
  lastActive?: Date;
  completedChallenges: number;
  timeSpent: number;
  learningPaths: ILearningPathStats[];
}

export interface IUserDoc {
  _id: Types.ObjectId;
  username: string;
  avatar?: string;
  lastLogin?: Date;
  stats: IUserStats;
}

export type IUser = IUserDoc & Document;

export interface ILesson extends Document {
  _id: Types.ObjectId;
  slug: string;
  points: number;
  duration: number;
}

export interface ILearningPath extends Document {
  _id: Types.ObjectId;
  title: string;
  difficulty: string;
  totalLessons: number;
  lessons: Types.ObjectId[];
}

export interface IUserRequest extends Request {
  user: {
    userId: string;
    email: string;
    role: string;
    accountType?: string;
  };
}

export interface UpdateProgressDTO {
  lessonId: string;
}

export interface UpdateUserProgressDTO {
  points: number;
  challenges?: number;
  timeSpent?: number;
}

export interface LeaderboardQueryDTO {
  limit?: string;
  type?: 'points' | 'streak' | 'challenges' | 'time';
}

export interface ILevelStats {
  level: number;
  points: number;
  pointsToNextLevel: number;
  progress: number;
  leveledUp?: boolean;
  levelsGained?: number;
}

export interface IStreakStats {
  streak: number;
  bestStreak: number;
  streakUpdated?: boolean;
  streakBroken?: boolean;
}

export interface IProgressUpdate {
  level: ILevelStats;
  streak: IStreakStats;
}

export interface ILearningPathProgress {
  id: Types.ObjectId;
  title: string;
  difficulty: string;
  progress: {
    completed: number;
    total: number;
    percentage: number;
  };
}

export interface IUserProgressResponse {
  level: number;
  points: number;
  pointsToNextLevel: number;
  levelProgress: number;
  streak: number;
  bestStreak: number;
  completedChallenges: number;
  timeSpent: number;
  learningPaths: ILearningPathProgress[];
}

export interface ILeaderboardUserEntry {
  id: Types.ObjectId;
  username: string;
  avatar?: string;
  level: number;
  rank: number;
  value: number;
  isCurrentUser?: boolean;
}

export interface ILeaderboardResponse {
  leaderboard: ILeaderboardUserEntry[];
  currentUser: ILeaderboardUserEntry;
} 