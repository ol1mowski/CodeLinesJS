import { Response, NextFunction } from 'express';
import { ProgressService } from '../../../services/progress/index.js';
import { IUserRequest } from '../../../types/progress/index.js';

export const getUserProgressController = async (
  req: IUserRequest, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user.userId;
    
    const progressData = await ProgressService.getUserProgress(userId);
    
    res.success(progressData, 'Postęp użytkownika pobrany pomyślnie');
  } catch (error) {
    next(error);
  }
}; 