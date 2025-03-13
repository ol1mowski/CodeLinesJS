import { Group } from '../../models/group.model.js';
import { GroupMember } from '../../models/groupMember.model.js';
import { AuthError, ValidationError } from '../../utils/errors.js';

export const deleteGroup = async (req, res, next) => {
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

    if (!membership || membership.role !== 'owner') {
      throw new AuthError('Tylko właściciel może usunąć grupę');
    }

    await GroupMember.deleteMany({ group: groupId });

    await Group.findByIdAndDelete(groupId);

    res.json({
      status: 'success',
      message: 'Grupa została usunięta pomyślnie',
    });
  } catch (error) {
    next(error);
  }
}; 