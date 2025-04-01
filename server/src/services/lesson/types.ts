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

export interface LessonDocument extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration: number;
  points: number;
  slug: string;
  requirements: Types.ObjectId[] | LessonDocument[];
  requiredLevel: number;
  isPublished: boolean;
  isAvailable: boolean;
  order: number;
}

export interface LessonContentDocument extends Document {
  _id: Types.ObjectId;
  lessonSlug: string;
  xp: number;
  rewards: {
    type: string;
    value: number;
  }[];
  sections: {
    title: string;
    content: string;
    type: string;
  }[];
  quiz: {
    questions: {
      question: string;
      options: string[];
      correctAnswer: number;
    }[];
  };
}

export interface UserDocument extends Document {
  _id: Types.ObjectId;
  stats?: {
    level: number;
    points: number;
    pointsToNextLevel: number;
    xp: number;
    streak: number;
    bestStreak: number;
    learningPaths: {
      pathId: Types.ObjectId;
      progress: {
        completedLessons: {
          _id: Types.ObjectId;
          completedAt: Date;
        }[];
      };
    }[];
  };
}

export interface LessonQuery {
  isPublished?: boolean;
  isAvailable?: boolean;
  category?: string;
  difficulty?: string;
  $or?: Array<{
    title?: { $regex: string; $options: string };
    description?: { $regex: string; $options: string };
  }>;
}

export interface LessonResponse {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  difficulty: string;
  duration: number;
  points: number;
  isCompleted: boolean;
  requirements?: any[];
  requiredLevel?: number;
}

export interface LessonCategory {
  name: string;
  lessons: LessonResponse[];
}

export interface GroupedLessons {
  [key: string]: LessonResponse[];
}

export interface UserStats {
  level: number;
  points: number;
  pointsRequired: number;
  levelProgress: number;
  streak: number;
  bestStreak: number;
  total: number;
  completed: number;
  progress: number;
}

export interface LessonsResponse {
  lessons: LessonCategory[];
  stats: UserStats;
}

export interface LessonContent {
  _id: string;
  slug: string;
  content: string;
  examples?: Array<{
    title: string;
    code: string;
    language: string;
  }>;
  quiz?: Array<{
    question: string;
    options: string[];
    correctOption: number;
  }>;
}

export interface LessonDetailResponse {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: {
    xp: number;
    rewards: any[];
    sections: any[];
    quiz: any;
  };
  category: string;
  difficulty: string;
  duration: number;
  points: number;
  requiredLevel?: number;
  isCompleted: boolean;
  userStats: {
    level: number;
    points: number;
    pointsRequired: number;
    levelProgress: number;
    streak: number;
    bestStreak: number;
  };
}

export interface LevelUpdate {
  levelUp: boolean;
  newLevel?: number;
  pointsToNextLevel?: number;
}

export interface CompleteLessonResponse {
  message: string;
  stats: {
    points: number;
    pointsRequired: number;
    xp: number;
    level: number;
    levelProgress: number;
    completedLessons: number;
    leveledUp?: boolean;
    levelsGained?: number;
    streak: number;
    bestStreak: number;
    streakUpdated?: boolean;
  };
}

export interface IUser {
  stats?: {
    level: number;
    points: number;
    pointsToNextLevel: number;
    xp?: number;
    streak?: number;
    bestStreak?: number;
    badges?: Array<{
      id: string;
      name: string;
      icon: string;
      [key: string]: any;
    }>;
    learningPaths?: Array<{
      pathId: Types.ObjectId;
      progress: {
        completedLessons: Array<{
          _id: Types.ObjectId | string;
          completedAt: Date;
        }>;
      };
    }>;
  };
  [key: string]: any;
} 