import { Request, Response, NextFunction } from 'express';
import { GroupService } from '../../../services/group.service.js';

export const updateGroupTags = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { tags } = req.body;
    const userId = req.user?.userId;
    
    if (!userId) {
      res.fail('Brak identyfikatora użytkownika. Zaloguj się ponownie.', [
        { code: 'AUTH_REQUIRED', message: 'Brak autoryzacji' }
      ]);
      return;
    }
    
    if (!id) {
      res.fail('Brak identyfikatora grupy', [
        { code: 'MISSING_GROUP_ID', message: 'Brak identyfikatora grupy', field: 'id' }
      ]);
      return;
    }
    
    if (!tags || !Array.isArray(tags)) {
      res.fail('Nieprawidłowy format tagów', [
        { code: 'INVALID_TAGS', message: 'Nieprawidłowy format tagów', field: 'tags' }
      ]);
      return;
    }
    
    const result = await GroupService.updateGroup(id, userId, { tags });
    
    res.success(result, 'Tagi grupy zostały zaktualizowane');
  } catch (error) {
    next(error);
  }
}; 