import { Group } from '../../../models/group.model.js';
import { GroupMember } from '../../../models/groupMember.model.js';
import { ValidationError } from '../../../utils/errors.js';

export const getGroupById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    const group = await Group.findById(id)
      .populate('owner', 'username avatar')
      .lean();

    if (!group) {
      throw new ValidationError('Grupa nie istnieje');
    }

    const members = await GroupMember.find({ group: id })
      .populate('user', 'username avatar')
      .lean();

    let userMembership = null;
    if (userId) {
      userMembership = members.find(member => 
        member.user._id.toString() === userId
      );
    }

    res.json({
      status: 'success',
      data: {
        group: {
          ...group,
          members,
          isMember: !!userMembership,
          isOwner: userId && group.owner._id.toString() === userId,
          role: userMembership ? userMembership.role : null,
          joinedAt: userMembership ? userMembership.createdAt : null,
        },
      },
    });
  } catch (error) {
    next(error);
  }
}; 