import { Types } from 'mongoose';
import { LearningPathProgressDTO } from '../types.js';

export interface LearningPath {
  _id: Types.ObjectId | string;
  title: string;
  totalLessons: number;
}

export interface UserLearningPath {
  pathId: Types.ObjectId | string;
  status: 'active' | 'completed' | 'locked';
  progress?: {
    completedLessons?: string[];
  };
}

export const calculateLearningPathProgress = (
  learningPath: LearningPath,
  userPath?: UserLearningPath
): LearningPathProgressDTO => {
  const completedLessons = userPath?.progress?.completedLessons?.length || 0;
  const totalLessons = learningPath.totalLessons || 0;
  const percentage = totalLessons > 0 
    ? Math.round((completedLessons / totalLessons) * 100) 
    : 0;
  
  return {
    pathId: learningPath._id,
    title: learningPath.title,
    progress: {
      completed: completedLessons,
      total: totalLessons,
      percentage,
      status: userPath?.status || 'locked'
    }
  };
};

export const calculateLearningPathsProgress = (
  learningPaths: LearningPath[],
  userLearningPaths: UserLearningPath[]
): LearningPathProgressDTO[] => {
  return learningPaths.map(path => {
    const userPath = userLearningPaths.find(
      up => up.pathId.toString() === path._id.toString()
    );
    
    return calculateLearningPathProgress(path, userPath);
  });
}; 