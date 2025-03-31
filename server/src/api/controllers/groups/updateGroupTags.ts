import { Request, Response, NextFunction } from 'express';
import { GroupService } from '../../../services/group.service.js';
import { AuthError } from '../../../utils/errors.js';

export const updateGroupTags = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { tags } = req.body;
    const userId = req.user?.userId;
    
    if (!userId) throw new AuthError('Brak autoryzacji');
    
    const result = await GroupService.updateGroup(id, userId, { tags });
    
    res.json({
      status: 'success',
      message: 'Tagi grupy zostały zaktualizowane',
      data: result
    });
  } catch (error) {
    next(error);
  }
}; 