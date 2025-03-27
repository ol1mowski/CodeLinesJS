import { Group } from '../../../models/group.model.js';
import { GroupMember } from '../../../models/groupMember.model.js';

export const getGroupsController = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    
    const groups = await Group.find()
      .populate('owner', 'username avatar')
      .lean();
    
    let userMemberships = [];
    if (userId) {
      userMemberships = await GroupMember.find({ user: userId })
        .populate('group')
        .lean();
    }
    
    const mappedGroups = groups.map(group => {
      const userMembership = userMemberships.find(
        membership => membership.group._id.toString() === group._id.toString()
      );
      
      return {
        ...group,
        isMember: !!userMembership,
        isOwner: userId && group.owner._id.toString() === userId,
        role: userMembership ? userMembership.role : null,
        joinedAt: userMembership ? userMembership.createdAt : null,
      };
    });
    
    res.json({
      status: 'success',
      data: {
        groups: mappedGroups,
        total: groups.length,
      },
    });
  } catch (error) {
    next(error);
  }
}; 