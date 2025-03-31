import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../../services/learningPath/types.js';
import { LearningPathService } from '../../../services/learningPath/learningPath.service.js';

export const getLearningPathByIdController = async (
  req: AuthRequest, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const result = await LearningPathService.getLearningPathById(id, userId);
    
    res.json(result);
  } catch (error) {
    next(error);
  }
}; 