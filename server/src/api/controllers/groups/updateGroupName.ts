import { Request, Response, NextFunction } from 'express';
import { GroupService } from '../../../services/group.service.js';
import { AuthError } from '../../../utils/errors.js';

export const updateGroupName = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const userId = req.user?.userId;
    
    if (!userId) throw new AuthError('Brak autoryzacji');
    
    const result = await GroupService.updateGroup(id, userId, { name });
    
    res.json({
      status: 'success',
      message: 'Nazwa grupy została zaktualizowana',
      data: result
    });
  } catch (error) {
    next(error);
  }
}; 