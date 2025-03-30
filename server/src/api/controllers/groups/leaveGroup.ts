// @ts-nocheck
import { Group } from '../../../models/group.model.js';
import { GroupMember } from '../../../models/groupMember.model.js';
import { AuthError, ValidationError } from '../../../utils/errors.js';

export const leaveGroup = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new AuthError('Brak autoryzacji');

    const { groupId } = req.body;

    if (!groupId) {
      throw new ValidationError('ID grupy jest wymagane');
    }

    const group = await Group.findById(groupId);
    if (!group) {
      throw new ValidationError('Grupa nie istnieje');
    }

    const membership = await GroupMember.findOne({
      user: userId,
      group: groupId,
    });

    if (!membership) {
      throw new ValidationError('Nie jesteś członkiem tej grupy');
    }

    if (membership.role === 'owner') {
      throw new ValidationError('Właściciel nie może opuścić grupy. Najpierw przekaż własność innemu członkowi lub usuń grupę.');
    }

    await GroupMember.findByIdAndDelete(membership._id);

    group.members = group.members.filter(
      (memberId) => memberId.toString() !== membership._id.toString()
    );
    await group.save();

    res.json({
      status: 'success',
      message: 'Opuściłeś grupę pomyślnie',
      data: {
        groupId,
      },
    });
  } catch (error) {
    next(error);
  }
}; 