import { Types } from 'mongoose';
import { AuthRequest } from '../../../services/stats/types.js';
import { IUser } from '../../../types/user.types.js';

export interface UserProfileResponse {
  status: string;
  data: {
    username: string;
    email: string;
    profile: any;
    preferences: any;
    stats: {
      level: number;
    };
  };
}

export interface ActiveUsersResponse {
  users: {
    username: string;
  }[];
}

export interface UserProgressResponse {
  status: string;
  data: {
    pathId: Types.ObjectId | string;
    title: string;
    status: string;
    progress: {
      completed: number;
      total: number;
      percentage: number;
      lastActivity?: Date;
      startedAt?: Date;
      completedAt?: Date;
    };
  }[];
}

export interface UserStatsResponse {
  status: string;
  data: {
    points: number;
    level: number;
    streak: number;
    bestStreak: number;
    pointsToNextLevel: number;
    completedChallenges: number;
    badges: any[];
    lastActive: Date;
    learningPaths: any[];
    chartData: {
      daily: any[];
      progress: any[];
    };
  };
}

export interface UpdateUserStatsRequest {
  points?: number;
  xp?: number;
}

export interface IUserService {
  getUserProfile(userId: string): Promise<UserProfileResponse>;
  getActiveUsers(): Promise<ActiveUsersResponse>;
  getUserProgress(userId: string): Promise<UserProgressResponse>;
  getUserStats(userId: string): Promise<UserStatsResponse>;
  updateUserStats(userId: string, statsData: UpdateUserStatsRequest): Promise<UserStatsResponse>;
} 