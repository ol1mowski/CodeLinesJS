import { FilterQuery } from 'mongoose';
import { Group } from '../models/group.model.js';
import { GroupMember } from '../models/groupMember.model.js';
import { 
  IGroup, 
  IGroupMember,
  GroupQueryOptions,
  GroupRole 
} from '../types/group.types.js';

export class GroupRepository {

  static async findAll(options: GroupQueryOptions = {}): Promise<IGroup[]> {
    const { limit = 20, page = 1, tag, search } = options;
    const skip = (page - 1) * limit;
    
    const query: FilterQuery<IGroup> = {};
    
    if (tag) {
      query.tags = tag;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    return Group.find(query)
      .populate('owner', 'username avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
  }

  static async findById(groupId: string): Promise<IGroup | null> {
    return Group.findById(groupId)
      .populate('owner', 'username avatar')
      .lean();
  }

  static async findByName(name: string): Promise<IGroup | null> {
    return Group.findOne({ name }).lean();
  }

  static async create(groupData: Partial<IGroup>): Promise<IGroup> {
    const group = new Group(groupData);
    await group.save();
    return group.toObject();
  }


  static async update(groupId: string, data: Partial<IGroup>): Promise<IGroup | null> {
    return Group.findByIdAndUpdate(
      groupId, 
      { ...data, updatedAt: new Date() }, 
      { new: true }
    )
    .populate('owner', 'username avatar')
    .lean();
  }

  static async delete(groupId: string): Promise<boolean> {
    const result = await Group.deleteOne({ _id: groupId });
    return result.deletedCount === 1;
  }

  static async count(options: GroupQueryOptions = {}): Promise<number> {
    const { tag, search } = options;
    
    const query: FilterQuery<IGroup> = {};
    
    if (tag) {
      query.tags = tag;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    return Group.countDocuments(query);
  }
}

export class GroupMemberRepository {
  static async findByGroupId(groupId: string): Promise<IGroupMember[]> {
    return GroupMember.find({ group: groupId })
      .populate('user', 'username avatar')
      .lean();
  }

  static async findMembership(userId: string, groupId: string): Promise<IGroupMember | null> {
    return GroupMember.findOne({ 
      user: userId, 
      group: groupId 
    }).lean();
  }
  static async findByUserId(userId: string): Promise<IGroupMember[]> {
    return GroupMember.find({ user: userId })
      .populate('group')
      .lean();
  }

  static async create(memberData: Partial<IGroupMember>): Promise<IGroupMember> {
    const member = new GroupMember({
      ...memberData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    await member.save();
    return member.toObject();
  }

  static async updateRole(
    userId: string, 
    groupId: string, 
    role: GroupRole
  ): Promise<IGroupMember | null> {
    return GroupMember.findOneAndUpdate(
      { user: userId, group: groupId },
      { role, updatedAt: new Date() },
      { new: true }
    ).lean();
  }

  static async remove(userId: string, groupId: string): Promise<boolean> {
    const result = await GroupMember.deleteOne({ 
      user: userId, 
      group: groupId 
    });
    return result.deletedCount === 1;
  }
  static async removeAllFromGroup(groupId: string): Promise<boolean> {
    const result = await GroupMember.deleteMany({ group: groupId });
    return result.deletedCount > 0;
  }
} 