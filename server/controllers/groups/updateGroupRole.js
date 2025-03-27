import { Group } from '../../models/group.model.js';
import { GroupMember } from '../../models/groupMember.model.js';
import { AuthError, ValidationError } from '../../utils/errors.js';

export const updateGroupRole = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new AuthError('Brak autoryzacji');

    const { groupId, memberId, role } = req.body;

    if (!groupId) {
      throw new ValidationError('ID grupy jest wymagane');
    }

    if (!memberId) {
      throw new ValidationError('ID członka jest wymagane');
    }

    if (!role || !['admin', 'member'].includes(role)) {
      throw new ValidationError('Nieprawidłowa rola. Dozwolone wartości: admin, member');
    }

    const group = await Group.findById(groupId);
    if (!group) {
      throw new ValidationError('Grupa nie istnieje');
    }

    const userMembership = await GroupMember.findOne({
      user: userId,
      group: groupId,
    });

    if (!userMembership || userMembership.role !== 'owner') {
      throw new AuthError('Tylko właściciel może zmieniać role członków grupy');
    }

    const memberToUpdate = await GroupMember.findById(memberId);
    if (!memberToUpdate) {
      throw new ValidationError('Członek nie istnieje');
    }

    if (memberToUpdate.group.toString() !== groupId) {
      throw new ValidationError('Członek nie należy do tej grupy');
    }

    if (memberToUpdate.role === 'owner') {
      throw new ValidationError('Nie można zmienić roli właściciela grupy');
    }
    
    memberToUpdate.role = role;
    memberToUpdate.updatedAt = new Date();
    await memberToUpdate.save();

    res.json({
      status: 'success',
      message: 'Rola członka została zaktualizowana pomyślnie',
      data: {
        memberId: memberToUpdate._id,
        role: memberToUpdate.role,
      },
    });
  } catch (error) {
    next(error);
  }
}; 