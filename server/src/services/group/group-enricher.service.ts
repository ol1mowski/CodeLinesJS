import { Types } from 'mongoose';

import { GroupWithUserInfo } from '../../types/group.types.js';

export class GroupEnricher {
  static enrichWithUserInfo(group: any, members: any[], userId?: string): GroupWithUserInfo {
    const userMembership = userId
      ? members.find((member) => {
          if (typeof member.user === 'object' && member.user) {
            return member.user._id.toString() === userId;
          }
          return member.user && member.user.toString() === userId;
        })
      : null;

    let isOwner = false;
    if (userId) {
      if (typeof group.owner === 'object' && group.owner) {
        isOwner = group.owner._id.toString() === userId;
      } else if (typeof group.owner === 'string') {
        isOwner = group.owner === userId;
      } else if (group.owner instanceof Types.ObjectId) {
        isOwner = group.owner.toString() === userId;
      }
    }

    return {
      ...group,
      members,
      isMember: !!userMembership,
      isOwner,
      role: userMembership ? userMembership.role : null,
      joinedAt: userMembership ? userMembership.createdAt : null,
    } as GroupWithUserInfo;
  }
}
