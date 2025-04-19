import { Request, Response, NextFunction } from 'express';
import { GroupService } from '../../../services/group.service.js';

export const checkGroupName = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, currentGroupId } = req.body;
    
    if (!name) {
      res.fail('Nazwa grupy jest wymagana', [
        { code: 'MISSING_NAME', message: 'Nazwa grupy jest wymagana', field: 'name' }
      ]);
      return;
    }
    
    if (name.trim() === '') {
      res.fail('Nazwa grupy nie może być pusta', [
        { code: 'EMPTY_NAME', message: 'Nazwa grupy nie może być pusta', field: 'name' }
      ]);
      return;
    }
    
    const result = await GroupService.checkGroupName(name, currentGroupId);
    
    res.success(result, result.available ? 'Nazwa jest dostępna' : 'Nazwa jest zajęta');
  } catch (error) {
    next(error);
  }
}; 