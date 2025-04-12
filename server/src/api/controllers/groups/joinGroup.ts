import { Request, Response, NextFunction } from 'express';
import { GroupService } from '../../../services/group.service.js';
import { AuthError } from '../../../utils/errors.js';
import { GroupValidatorService } from '../../../services/group/group-validator.service.js';

export const joinGroupController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { groupId } = req.params;
    const userId = req.user?.userId;
    
    if (!userId) throw new AuthError('Brak autoryzacji');
    
    GroupValidatorService.validateGroupId(groupId);
    
    const result = await GroupService.joinGroup({
      userId,
      groupId
    });
    
    res.json({
      status: 'success',
      message: result.message,
      data: {
        success: result.success,
        group: result.group
      }
    });
  } catch (error) {
    next(error);
  }
}; 