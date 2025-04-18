import { Request, Response, NextFunction } from 'express';
import { GroupService } from '../../../services/group.service.js';

export const getGroupById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;
    
    if (!userId) {
      res.fail('Brak identyfikatora użytkownika. Zaloguj się ponownie.', [
        { code: 'AUTH_REQUIRED', message: 'Brak identyfikatora użytkownika. Zaloguj się ponownie.' }
      ]);
      return;
    }
    
    if (!id) {
      res.fail('Brak identyfikatora grupy', [
        { code: 'MISSING_GROUP_ID', message: 'Brak identyfikatora grupy', field: 'id' }
      ]);
      return;
    }

    const result = await GroupService.getGroupById(id, userId);
    
    if (!result) {
      res.fail('Grupa nie została znaleziona', [
        { code: 'GROUP_NOT_FOUND', message: 'Grupa nie została znaleziona', field: 'id' }
      ], 404);
      return;
    }

    res.success(result, 'Grupa pobrana pomyślnie');
  } catch (error) {
    next(error);
  }
}; 