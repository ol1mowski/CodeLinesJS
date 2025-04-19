import { Request, Response, NextFunction } from 'express';
import { GroupService } from '../../../services/group.service.js';

export const updateGroupName = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { name } = req.body;
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
    
    if (!name || name.trim() === '') {
      res.fail('Nazwa grupy jest wymagana', [
        { code: 'MISSING_NAME', message: 'Nazwa grupy jest wymagana', field: 'name' }
      ]);
      return;
    }
    
    const result = await GroupService.updateGroup(id, userId, { name });
    
    res.success(result, 'Nazwa grupy została zaktualizowana');
  } catch (error) {
    next(error);
  }
}; 