import { Request, Response, NextFunction } from 'express';
import { GroupService } from '../../../services/group.service.js';
import { ValidationError } from '../../../utils/errors.js';

export const checkGroupName = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, currentGroupId } = req.body;
    
    if (!name) {
      throw new ValidationError('Nazwa grupy jest wymagana');
    }
    
    const result = await GroupService.checkGroupName(name, currentGroupId);
    
    res.json({
      status: 'success',
      data: result
    });
  } catch (error) {
    next(error);
  }
}; 