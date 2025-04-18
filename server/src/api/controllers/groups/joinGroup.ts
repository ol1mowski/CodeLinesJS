import { Request, Response, NextFunction } from 'express';
import { GroupService } from '../../../services/group.service.js';
import { GroupValidatorService } from '../../../services/group/group-validator.service.js';

export const joinGroupController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { groupId } = req.params;
    const userId = req.user?.userId;
    
    if (!userId) {
      res.fail('Brak identyfikatora użytkownika. Zaloguj się ponownie.', [
        { code: 'AUTH_REQUIRED', message: 'Brak autoryzacji' }
      ]);
      return;
    }
    
    if (!groupId) {
      res.fail('Brak identyfikatora grupy', [
        { code: 'MISSING_GROUP_ID', message: 'Brak identyfikatora grupy', field: 'groupId' }
      ]);
      return;
    }
    
    try {
      GroupValidatorService.validateGroupId(groupId);
    } catch (validationError) {
      res.fail('Nieprawidłowy identyfikator grupy', [
        { code: 'INVALID_GROUP_ID', message: validationError.message, field: 'groupId' }
      ]);
      return;
    }
    
    const result = await GroupService.joinGroup({
      userId,
      groupId
    });
    
    if (!result.success) {
      res.fail(result.message, [
        { code: 'JOIN_GROUP_FAILED', message: result.message }
      ]);
      return;
    }
    
    res.success({
      success: result.success,
      group: result.group
    }, result.message);
  } catch (error) {
    next(error);
  }
}; 