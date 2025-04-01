import { Request, Response, NextFunction } from 'express';
import { GroupService } from '../../../services/group.service.js';
import { AuthError } from '../../../utils/errors.js';

export const deleteGroup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;
    
    if (!userId) throw new AuthError('Brak autoryzacji');
    
    const result = await GroupService.deleteGroup(id, userId);
    
    res.json({
      status: 'success',
      message: result.message,
      data: { success: result.success }
    });
  } catch (error) {
    next(error);
  }
}; 