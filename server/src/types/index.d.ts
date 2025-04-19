import { Request } from 'express';
import { Types } from 'mongoose';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
        [key: string]: any;
      };
    }
  }
}

interface IUser {
  _id?: string | Types.ObjectId;
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  role?: 'user' | 'admin' | 'instructor';
  accountType?: 'local' | 'google';
  isEmailVerified?: boolean;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  stats?: {
    points?: number;
    level?: number;
    xp?: number;
    streak?: number;
    bestStreak?: number;
    pointsToNextLevel?: number;
    lastActive?: Date;
    experiencePoints?: number;
    badges?: Array<{
      id: string;
      name: string;
      icon: string;
      [key: string]: any;
    }>;
    unlockedFeatures?: string[];
    totalTimeSpent?: number;
    completedChallenges?: number;
    nextLevelThreshold?: number;
    chartData?: {
      daily?: Array<{
        date: string;
        points: number;
        timeSpent: number;
        [key: string]: any;
      }>;
      [key: string]: any;
    };
    daily?: Array<{
      date: string;
      points: number;
      challenges: number;
      [key: string]: any;
    }>;
    [key: string]: any;
  };
  preferences?: {
    theme?: string;
    language?: string;
    [key: string]: any;
  };
  profile?: {
    avatar?: string;
    bio?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

interface IProgress {
  userId: string;
  lessonId: string;
  completed: boolean;
  score: number;
  timeSpent: number;
  lastActivity: Date;
}

interface ILesson {
  _id: string;
  title: string;
  description: string;
  content: string;
  order: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  tags: string[];
  pathId: string;
}

export {
  IUser,
  IProgress,
  ILesson
}; 