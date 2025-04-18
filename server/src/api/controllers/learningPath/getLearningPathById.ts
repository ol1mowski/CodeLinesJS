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
    const userId = req.user?.userId;
    
    if (!userId) {
      res.fail('Brak identyfikatora użytkownika. Zaloguj się ponownie.', [
        { code: 'AUTH_REQUIRED', message: 'Brak autoryzacji' }
      ]);
      return;
    }
    
    if (!id) {
      res.fail('Identyfikator ścieżki nauki jest wymagany', [
        { code: 'MISSING_PATH_ID', message: 'Identyfikator ścieżki nauki jest wymagany', field: 'id' }
      ]);
      return;
    }

    try {
      const result = await LearningPathService.getLearningPathById(id, userId);
      res.success(result, 'Ścieżka nauki została pobrana');
    } catch (error) {
      if (error.message === 'Ścieżka nauki nie została znaleziona') {
        res.fail('Ścieżka nauki nie została znaleziona', [
          { code: 'PATH_NOT_FOUND', message: 'Ścieżka nauki nie została znaleziona', field: 'id' }
        ], 404);
        return;
      }
      
      if (error.message === 'Nie masz dostępu do tej ścieżki nauki') {
        res.fail('Nie masz dostępu do tej ścieżki nauki', [
          { code: 'PATH_NOT_AVAILABLE', message: 'Nie masz dostępu do tej ścieżki nauki. Wymagany wyższy poziom zaawansowania.' }
        ], 403);
        return;
      }
      
      throw error;
    }
  } catch (error) {
    next(error);
  }
}; 