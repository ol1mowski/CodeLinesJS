import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../../services/learningPath/types.js';
import { LearningPathService } from '../../../services/learningPath/learningPath.service.js';

export const getLearningPathsController = async (
  req: AuthRequest, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    
    if (!userId) {
      res.fail('Brak identyfikatora użytkownika. Zaloguj się ponownie.', [
        { code: 'AUTH_REQUIRED', message: 'Brak autoryzacji' }
      ]);
      return;
    }
    
    const { difficulty, search } = req.query as { 
      difficulty?: string;
      search?: string;
    };

    const result = await LearningPathService.getLearningPaths(userId, {
      difficulty,
      search
    });

    res.success(result, 'Ścieżki nauki zostały pobrane');
  } catch (error) {
    next(error);
  }
}; 