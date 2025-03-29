import { Document, Types } from 'mongoose';

/**
 * Interfejs reprezentujący model użytkownika
 */
export interface IUser extends Document {
  _id: string | Types.ObjectId;
  email: string;
  username: string;
  password: string;
  accountType: 'local' | 'google';
  isEmailVerified: boolean;
  googleId?: string;
  avatar?: string;
  role?: string;
  profile?: {
    displayName?: string;
    bio?: string;
    socialLinks?: {
      github?: string;
      linkedin?: string;
      twitter?: string;
    };
  };
  preferences?: {
    emailNotifications?: boolean;
    theme?: string;
    language?: string;
  };
  groups?: any[];
  stats?: {
    points?: number;
    level?: number;
    xp?: number;
    streak?: number;
    pointsToNextLevel?: number;
    bestStreak?: number;
    lastActive?: Date;
    experiencePoints?: number;
    nextLevelThreshold?: number;
    completedChallenges?: number;
    currentStreak?: number;
    averageScore?: number;
    totalTimeSpent?: number;
    badges?: Array<{
      name?: string;
      icon?: string;
      earnedAt?: Date;
      description?: string;
    }>;
    unlockedFeatures?: any[];
    chartData?: {
      daily?: Array<{
        date?: string;
        points?: number;
        timeSpent?: number;
      }>;
      progress?: Array<{
        name?: string;
        progress?: number;
        timeSpent?: number;
      }>;
    };
    learningPaths?: any[];
    categories?: Array<{
      name?: string;
      progress?: number;
      level?: number;
    }>;
    daily?: Array<{
      date?: string;
      points?: number;
      challenges?: number;
    }>;
  };
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  passwordChangedAt?: Date;
  lastLogin?: Date;
  isActive?: boolean;
  comparePassword?: (candidatePassword: string) => Promise<boolean>;
  createdAt?: Date;
  updatedAt?: Date;
} 