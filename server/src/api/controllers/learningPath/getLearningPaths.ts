import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../../services/learningPath/types.js';
import { LearningPathService } from '../../../services/learningPath/learningPath.service.js';

export const getLearningPathsController = async (
  req: AuthRequest, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user.userId;
    const { difficulty, search } = req.query as { 
      difficulty?: string;
      search?: string;
    };

    const result = await LearningPathService.getLearningPaths(userId, {
      difficulty,
      search
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
}; 