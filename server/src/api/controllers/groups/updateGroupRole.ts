import { Request, Response, NextFunction } from 'express';
import { GroupService } from '../../../services/group.service.js';

export const updateGroupRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.userId;
    
    if (!userId) {
      res.fail('Brak identyfikatora użytkownika. Zaloguj się ponownie.', [
        { code: 'AUTH_REQUIRED', message: 'Brak autoryzacji' }
      ]);
      return;
    }

    const { groupId, memberId, role } = req.body;

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

    if (!role || !['admin', 'member'].includes(role)) {
      res.fail('Nieprawidłowa rola. Dozwolone wartości: admin, member', [
        { code: 'INVALID_ROLE', message: 'Nieprawidłowa rola. Dozwolone wartości: admin, member', field: 'role' }
      ]);
      return;
    }
    
    const result = await GroupService.updateMemberRole(userId, {
      userId: memberId,
      groupId,
      role
    });
    
    if (!result.success) {
      res.fail(result.message, [
        { code: 'UPDATE_ROLE_FAILED', message: result.message }
      ]);
      return;
    }
    
    res.success({
      memberId,
      role,
      group: result.group
    }, result.message || 'Rola członka została zaktualizowana pomyślnie');
  } catch (error) {
    next(error);
  }
}; 