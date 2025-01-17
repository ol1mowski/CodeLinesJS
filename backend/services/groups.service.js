import { Group } from '../models/group.model.js';

export const getGroups = async () => {
  return await Group.find()
    .sort({ lastActive: -1 });
};

export const joinGroup = async (groupId, userId) => {
  const group = await Group.findById(groupId);
  if (!group) {
    throw new Error('Grupa nie istnieje');
  }

  const isMember = group.members.includes(userId);
  if (isMember) {
    group.members.pull(userId);
    group.membersCount--;
  } else {
    group.members.push(userId);
    group.membersCount++;
  }

  await group.save();
  return group;
}; 