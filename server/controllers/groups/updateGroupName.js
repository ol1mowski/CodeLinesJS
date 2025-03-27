import { Group } from '../../models/group.model.js';
import { GroupMember } from '../../models/groupMember.model.js';
import { AuthError, ValidationError } from '../../utils/errors.js';

export const updateGroupName = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new AuthError('Brak autoryzacji');

    const { groupId, name } = req.body;

    if (!groupId) {
      throw new ValidationError('ID grupy jest wymagane');
    }

    if (!name) {
      throw new ValidationError('Nazwa grupy jest wymagana');
    }

    if (name.length < 3 || name.length > 50) {
      throw new ValidationError('Nazwa grupy musi mieć od 3 do 50 znaków');
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
      throw new AuthError('Tylko właściciel może zmienić nazwę grupy');
    }

    const existingGroup = await Group.findOne({ name, _id: { $ne: groupId } });
    if (existingGroup) {
      throw new ValidationError('Grupa o takiej nazwie już istnieje');
    }

    group.name = name;
    group.updatedAt = new Date();
    await group.save();

    res.json({
      status: 'success',
      message: 'Nazwa grupy została zaktualizowana pomyślnie',
      data: {
        group: {
          _id: group._id,
          name: group.name,
        },
      },
    });
  } catch (error) {
    next(error);
  }
}; 