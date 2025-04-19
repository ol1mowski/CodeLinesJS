import { Request, Response, NextFunction } from 'express';
import { GroupService } from '../../../services/group.service.js';

export const createGroupController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.userId;
    
    if (!userId) {
      res.fail('Brak identyfikatora użytkownika. Zaloguj się ponownie.', [
        { code: 'AUTH_REQUIRED', message: 'Brak autoryzacji' }
      ]);
      return;
    }

    const { name, description, tags } = req.body;
    
    if (!name || name.trim() === '') {
      res.fail('Nazwa grupy jest wymagana', [
        { code: 'MISSING_NAME', message: 'Nazwa grupy jest wymagana', field: 'name' }
      ]);
      return;
    }

    const result = await GroupService.createGroup({
      name,
      description,
      tags,
      userId
    });
    
    if (!result) {
      res.error('Błąd podczas tworzenia grupy');
      return;
    }

    res.success(result, 'Grupa została utworzona pomyślnie', 201);
  } catch (error) {
    next(error);
  }
}; 