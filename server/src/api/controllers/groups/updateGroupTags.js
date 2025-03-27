import { Group } from '../../../models/group.model.js';
import { GroupMember } from '../../../models/groupMember.model.js';
import { AuthError, ValidationError } from '../../../utils/errors.js';

export const updateGroupTags = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new AuthError('Brak autoryzacji');

    const { groupId, tags } = req.body;

    if (!groupId) {
      throw new ValidationError('ID grupy jest wymagane');
    }

    if (!Array.isArray(tags)) {
      throw new ValidationError('Tagi muszą być tablicą');
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
      throw new AuthError('Tylko właściciel może zmienić tagi grupy');
    }
    
    group.tags = tags;
    group.updatedAt = new Date();
    await group.save();

    res.json({
      status: 'success',
      message: 'Tagi grupy zostały zaktualizowane pomyślnie',
      data: {
        group: {
          _id: group._id,
          tags: group.tags,
        },
      },
    });
  } catch (error) {
    next(error);
  }
}; 