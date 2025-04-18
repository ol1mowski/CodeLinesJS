import { Request, Response, NextFunction } from 'express';
import { GroupService } from '../../../services/group.service.js';

export const deleteGroup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
      res.fail('Brak identyfikatora grupy', [
        { code: 'MISSING_GROUP_ID', message: 'Brak identyfikatora grupy', field: 'id' }
      ]);
      return;
    }
    
    const result = await GroupService.deleteGroup(id, userId);
    
    if (!result.success) {
      res.fail(result.message, [
        { code: 'DELETE_GROUP_FAILED', message: result.message }
      ]);
      return;
    }
    
    res.success({ success: true }, result.message);
  } catch (error) {
    next(error);
  }
}; 