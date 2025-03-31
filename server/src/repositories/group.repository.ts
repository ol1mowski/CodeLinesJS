import { FilterQuery, Types } from 'mongoose';
import { Group } from '../models/group.model.js';
import { GroupMember } from '../models/groupMember.model.js';
import { 
  IGroup, 
  IGroupMember,
  GroupQueryOptions,
  GroupRole 
} from '../types/group.types.js';

/**
 * Repository Pattern dla operacji na grupach
 */
export class GroupRepository {
  /**
   * Pobiera wszystkie grupy z opcjonalnym filtrowaniem
   */
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

  /**
   * Pobiera grupę po ID
   */
  static async findById(groupId: string): Promise<IGroup | null> {
    return Group.findById(groupId)
      .populate('owner', 'username avatar')
      .lean();
  }

  /**
   * Pobiera grupę po nazwie
   */
  static async findByName(name: string): Promise<IGroup | null> {
    return Group.findOne({ name }).lean();
  }

  /**
   * Tworzy nową grupę
   */
  static async create(groupData: Partial<IGroup>): Promise<IGroup> {
    const group = new Group(groupData);
    await group.save();
    return group.toObject();
  }

  /**
   * Aktualizuje grupę
   */
  static async update(groupId: string, data: Partial<IGroup>): Promise<IGroup | null> {
    return Group.findByIdAndUpdate(
      groupId, 
      { ...data, updatedAt: new Date() }, 
      { new: true }
    )
    .populate('owner', 'username avatar')
    .lean();
  }

  /**
   * Usuwa grupę
   */
  static async delete(groupId: string): Promise<boolean> {
    const result = await Group.deleteOne({ _id: groupId });
    return result.deletedCount === 1;
  }

  /**
   * Liczy wszystkie grupy spełniające określone kryteria
   */
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

/**
 * Repository Pattern dla operacji na członkach grup
 */
export class GroupMemberRepository {
  /**
   * Pobiera wszystkich członków grupy
   */
  static async findByGroupId(groupId: string): Promise<IGroupMember[]> {
    return GroupMember.find({ group: groupId })
      .populate('user', 'username avatar')
      .lean();
  }

  /**
   * Pobiera członkostwo użytkownika w grupie
   */
  static async findMembership(userId: string, groupId: string): Promise<IGroupMember | null> {
    return GroupMember.findOne({ 
      user: userId, 
      group: groupId 
    }).lean();
  }

  /**
   * Pobiera wszystkie członkostwa użytkownika
   */
  static async findByUserId(userId: string): Promise<IGroupMember[]> {
    return GroupMember.find({ user: userId })
      .populate('group')
      .lean();
  }

  /**
   * Dodaje użytkownika do grupy
   */
  static async create(memberData: Partial<IGroupMember>): Promise<IGroupMember> {
    const member = new GroupMember({
      ...memberData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    await member.save();
    return member.toObject();
  }

  /**
   * Aktualizuje rolę użytkownika w grupie
   */
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

  /**
   * Usuwa użytkownika z grupy
   */
  static async remove(userId: string, groupId: string): Promise<boolean> {
    const result = await GroupMember.deleteOne({ 
      user: userId, 
      group: groupId 
    });
    return result.deletedCount === 1;
  }

  /**
   * Usuwa wszystkich członków grupy
   */
  static async removeAllFromGroup(groupId: string): Promise<boolean> {
    const result = await GroupMember.deleteMany({ group: groupId });
    return result.deletedCount > 0;
  }
} 