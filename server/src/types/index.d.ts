import { Request } from 'express';

// Rozszerzenie interfejsu Request Express
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

// Interfejsy dla modeli MongoDB
interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: 'user' | 'admin' | 'instructor';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
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

// Eksportujemy typy
export {
  IUser,
  IProgress,
  ILesson
}; 