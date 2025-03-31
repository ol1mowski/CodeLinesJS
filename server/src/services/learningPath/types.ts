import { Document, Types } from 'mongoose';
import { Request } from 'express';

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

export interface LearningPathDocument extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  difficulty: string;
  category: string;
  estimatedTime: number;
  requirements: string[];
  outcomes: string[];
  requiredLevel: number;
  totalLessons: number;
  lessons: LessonDocument[];
  isActive: boolean;
}

export interface LessonDocument extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration: number;
  points: number;
  slug: string;
  requirements: string[];
}

export interface UserDocument extends Document {
  _id: Types.ObjectId;
  stats?: {
    level: number;
    points: number;
    learningPaths: UserLearningPath[];
  };
}

export interface UserLearningPath {
  pathId: Types.ObjectId;
  progress: {
    completedLessons: Types.ObjectId[];
  };
}

export interface LearningPathQuery {
  isActive: boolean;
  difficulty?: string;
  $or?: Array<{
    title: { $regex: string; $options: string };
  } | {
    description: { $regex: string; $options: string };
  }>;
}

export interface LearningPathResponse {
  id: Types.ObjectId;
  title: string;
  description: string;
  difficulty: string;
  estimatedTime: number;
  requirements: string[];
  outcomes: string[];
  requiredLevel: number;
  isAvailable: boolean;
  totalLessons: number;
  progress: {
    completed: any;
    total: number;
    percentage: number;
    isStarted?: boolean;
    isCompleted?: boolean;
  };
}

export interface LearningPathDetailResponse extends LearningPathResponse {
  category: string;
  completedLessons: any;
  lessons: Array<{
    id: Types.ObjectId;
    title: string;
    description: string;
    category: string;
    difficulty: string;
    duration: number;
    points: number;
    slug: string;
    isCompleted: boolean;
    requirements: string[];
  }>;
}

export interface LearningPathsResponse {
  paths: LearningPathResponse[];
  userStats: {
    level: number;
    totalPoints: number;
    totalPaths: number;
    completedPaths: number;
    pathsInProgress: number;
  };
} 