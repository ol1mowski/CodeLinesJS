import { Group } from '../../../models/group.model.js';
import { GroupMember } from '../../../models/groupMember.model.js';
import { AuthError, ValidationError } from '../../../utils/errors.js';

export const removeMember = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new AuthError('Brak autoryzacji');

    const { groupId, memberId } = req.body;

    if (!groupId) {
      throw new ValidationError('ID grupy jest wymagane');
    }

    if (!memberId) {
      throw new ValidationError('ID członka jest wymagane');
    }

    const group = await Group.findById(groupId);
    if (!group) {
      throw new ValidationError('Grupa nie istnieje');
    }

    const userMembership = await GroupMember.findOne({
      user: userId,
      group: groupId,
    });

    if (!userMembership || !['owner', 'admin'].includes(userMembership.role)) {
      throw new AuthError('Nie masz uprawnień do usuwania członków grupy');
    }

    const memberToRemove = await GroupMember.findById(memberId);
    if (!memberToRemove) {
      throw new ValidationError('Członek nie istnieje');
    }

    if (memberToRemove.group.toString() !== groupId) {
      throw new ValidationError('Członek nie należy do tej grupy');
    }

    if (memberToRemove.role === 'owner') {
      throw new ValidationError('Nie można usunąć właściciela grupy');
    }

    if (userMembership.role === 'admin' && memberToRemove.role === 'admin') {
      throw new AuthError('Administrator nie może usunąć innego administratora');
    }

    await GroupMember.findByIdAndDelete(memberId);

    group.members = group.members.filter(
      (id) => id.toString() !== memberId
    );
    await group.save();

    res.json({
      status: 'success',
      message: 'Członek został usunięty z grupy pomyślnie',
      data: {
        removedMemberId: memberId,
      },
    });
  } catch (error) {
    next(error);
  }
}; 