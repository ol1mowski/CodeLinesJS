import { Group } from '../../models/group.model.js';
import { GroupMember } from '../../models/groupMember.model.js';
import { AuthError, ValidationError } from '../../utils/errors.js';

export const joinGroupController = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new AuthError('Brak autoryzacji');

    const { groupId, action } = req.body;

    if (!groupId) {
      throw new ValidationError('ID grupy jest wymagane');
    }

    if (!action || !['join', 'leave'].includes(action)) {
      throw new ValidationError('Nieprawidłowa akcja');
    }

    const group = await Group.findById(groupId);
    if (!group) {
      throw new ValidationError('Grupa nie istnieje');
    }

    const existingMembership = await GroupMember.findOne({
      user: userId,
      group: groupId,
    });

    if (action === 'join' && existingMembership) {
      throw new ValidationError('Jesteś już członkiem tej grupy');
    }

    if (action === 'leave' && !existingMembership) {
      throw new ValidationError('Nie jesteś członkiem tej grupy');
    }

    if (action === 'leave' && existingMembership.role === 'owner') {
      throw new ValidationError('Właściciel nie może opuścić grupy');
    }

    let result;

    if (action === 'join') {
      const newMember = new GroupMember({
        user: userId,
        group: groupId,
        role: 'member',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await newMember.save();

      group.members.push(newMember._id);
      await group.save();

      result = {
        message: 'Dołączyłeś do grupy pomyślnie',
        isMember: true,
        role: 'member',
        joinedAt: newMember.createdAt,
      };
    } else {
      await GroupMember.findByIdAndDelete(existingMembership._id);
      
      group.members = group.members.filter(
        (memberId) => memberId.toString() !== existingMembership._id.toString()
      );
      await group.save();

      result = {
        message: 'Opuściłeś grupę pomyślnie',
        isMember: false,
        role: null,
        joinedAt: null,
      };
    }

    res.json({
      status: 'success',
      ...result,
    });
  } catch (error) {
    next(error);
  }
}; 