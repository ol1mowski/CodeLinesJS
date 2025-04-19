import { Request, Response, NextFunction } from 'express';
import { GroupService } from '../../../services/group.service.js';

export const transferOwnership = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.userId;
    
    if (!userId) {
      res.fail('Brak identyfikatora użytkownika. Zaloguj się ponownie.', [
        { code: 'AUTH_REQUIRED', message: 'Brak autoryzacji' }
      ]);
      return;
    }

    const { groupId, newOwnerId } = req.body;

    if (!groupId) {
      res.fail('ID grupy jest wymagane', [
        { code: 'MISSING_GROUP_ID', message: 'ID grupy jest wymagane', field: 'groupId' }
      ]);
      return;
    }

    if (!newOwnerId) {
      res.fail('ID nowego właściciela jest wymagane', [
        { code: 'MISSING_NEW_OWNER_ID', message: 'ID nowego właściciela jest wymagane', field: 'newOwnerId' }
      ]);
      return;
    }
    
    const result = await GroupService.transferOwnership(userId, {
      userId: newOwnerId,
      groupId
    });
    
    if (!result.success) {
      res.fail(result.message, [
        { code: 'TRANSFER_OWNERSHIP_FAILED', message: result.message }
      ]);
      return;
    }
    
    res.success({
      success: true,
      group: result.group
    }, result.message || 'Własność grupy została przekazana pomyślnie');
  } catch (error) {
    next(error);
  }
}; 