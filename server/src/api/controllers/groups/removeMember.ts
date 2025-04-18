import { Request, Response, NextFunction } from 'express';
import { GroupService } from '../../../services/group.service.js';

export const removeMember = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.userId;
    
    if (!userId) {
      res.fail('Brak identyfikatora użytkownika. Zaloguj się ponownie.', [
        { code: 'AUTH_REQUIRED', message: 'Brak autoryzacji' }
      ]);
      return;
    }

    const { groupId, memberId } = req.body;

    if (!groupId) {
      res.fail('ID grupy jest wymagane', [
        { code: 'MISSING_GROUP_ID', message: 'ID grupy jest wymagane', field: 'groupId' }
      ]);
      return;
    }

    if (!memberId) {
      res.fail('ID członka jest wymagane', [
        { code: 'MISSING_MEMBER_ID', message: 'ID członka jest wymagane', field: 'memberId' }
      ]);
      return;
    }
    
    const result = await GroupService.removeMember(userId, {
      userId: memberId,
      groupId
    });
    
    if (!result.success) {
      res.fail(result.message, [
        { code: 'REMOVE_MEMBER_FAILED', message: result.message }
      ]);
      return;
    }
    
    res.success({
      success: true,
      removedMemberId: memberId,
      group: result.group
    }, result.message || 'Członek został usunięty z grupy pomyślnie');
  } catch (error) {
    next(error);
  }
}; 