import { Group } from '../../../models/group.model.js';
import { GroupMember } from '../../../models/groupMember.model.js';
import { AuthError, ValidationError } from '../../../utils/errors.js';

export const transferOwnership = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new AuthError('Brak autoryzacji');

    const { groupId, newOwnerId } = req.body;

    if (!groupId) {
      throw new ValidationError('ID grupy jest wymagane');
    }

    if (!newOwnerId) {
      throw new ValidationError('ID nowego właściciela jest wymagane');
    }

    const group = await Group.findById(groupId);
    if (!group) {
      throw new ValidationError('Grupa nie istnieje');
    }

    const currentOwnerMembership = await GroupMember.findOne({
      user: userId,
      group: groupId,
      role: 'owner'
    });

    if (!currentOwnerMembership) {
      throw new AuthError('Tylko właściciel może przekazać własność grupy');
    }

    const newOwnerMembership = await GroupMember.findOne({
      user: newOwnerId,
      group: groupId
    });

    if (!newOwnerMembership) {
      throw new ValidationError('Nowy właściciel musi być członkiem grupy');
    }

    currentOwnerMembership.role = 'admin';
    currentOwnerMembership.updatedAt = new Date();
    await currentOwnerMembership.save();

    newOwnerMembership.role = 'owner';
    newOwnerMembership.updatedAt = new Date();
    await newOwnerMembership.save();

    group.owner = newOwnerId;
    group.updatedAt = new Date();
    await group.save();

    res.json({
      status: 'success',
      message: 'Własność grupy została przekazana pomyślnie',
      data: {
        group: {
          _id: group._id,
          name: group.name,
          owner: newOwnerId
        },
      },
    });
  } catch (error) {
    next(error);
  }
}; 