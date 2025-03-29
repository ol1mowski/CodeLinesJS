import { Group } from '../models/group.model.js';
import { Document, Types } from 'mongoose';

interface GroupDocument extends Document {
  name: string;
  description: string;
  members: Types.ObjectId[];
  membersCount: number;
  lastActive: Date;
  [key: string]: any;
}

export const getGroups = async (): Promise<GroupDocument[]> => {
  return await Group.find()
    .sort({ lastActive: -1 });
};

export const joinGroup = async (groupId: string, userId: string): Promise<GroupDocument> => {
  const group = await Group.findById(groupId) as GroupDocument;
  if (!group) {
    throw new Error('Grupa nie istnieje');
  }

  const isMember = group.members.some(member => member.toString() === userId);
  if (isMember) {
    group.members = group.members.filter((member) => member.toString() !== userId);
    group.membersCount--;
  } else {
    group.members.push(new Types.ObjectId(userId));
    group.membersCount++;
  }

  await group.save();
  return group;
}; 