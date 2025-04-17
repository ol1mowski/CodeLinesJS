import { Types } from 'mongoose';

import { GroupRepository, GroupMemberRepository } from '../../repositories/group.repository.js';
import { LeanGroupMember } from '../../repositories/group.repository.js';
import {
  GroupQueryOptions,
  GroupsResponse,
  GroupResponse,
  GroupCreateData,
  GroupUpdateData,
  GroupMembershipData,
  MembershipChangeResult,
} from '../../types/group.types.js';
import { AuthError, ValidationError } from '../../utils/errors.js';

import { GroupEnricher } from './group-enricher.service.js';
import { GroupMembershipService } from './group-membership.service.js';
import { GroupValidatorService } from './group-validator.service.js';

export class GroupFacadeService {
  static {
    GroupMembershipService.setGroupFacadeService(GroupFacadeService);
  }

  static async getGroups(options: GroupQueryOptions = {}): Promise<GroupsResponse> {
    const { page = 1, limit = 20, userId } = options;

    const [groups, total] = await Promise.all([
      GroupRepository.findAll(options),
      GroupRepository.count(options),
    ]);

    let userMemberships: LeanGroupMember[] = [];
    if (userId) {
      userMemberships = await GroupMemberRepository.findByUserId(userId);
    }

    const enrichedGroups = groups.map((group) => {
      const groupMembers = userMemberships.filter(
        (membership) =>
          typeof membership.group === 'object' &&
          membership.group._id.toString() === group._id.toString(),
      );

      return GroupEnricher.enrichWithUserInfo(group, groupMembers, userId);
    });

    const hasNextPage = page * limit < total;

    return {
      groups: enrichedGroups,
      total,
      page,
      limit,
      hasNextPage,
    };
  }

  static async getGroupById(groupId: string, userId?: string): Promise<GroupResponse> {
    const group = await GroupRepository.findById(groupId);

    if (!group) {
      throw new ValidationError('Grupa nie istnieje');
    }

    const members = await GroupMemberRepository.findByGroupId(groupId);
    const groupWithUserInfo = GroupEnricher.enrichWithUserInfo(group, members, userId);

    return { group: groupWithUserInfo };
  }

  static async createGroup(data: GroupCreateData): Promise<GroupResponse> {
    await GroupValidatorService.validateGroupCreate(data);

    const newGroup = await GroupRepository.create({
      name: data.name,
      description: data.description || '',
      tags: data.tags || [],
      owner: new Types.ObjectId(data.userId),
      members: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const newMember = await GroupMemberRepository.create({
      user: new Types.ObjectId(data.userId),
      group: new Types.ObjectId(newGroup._id),
      role: 'owner',
    });

    await GroupRepository.update(newGroup._id.toString(), {
      members: [newMember._id],
    });

    return this.getGroupById(newGroup._id.toString(), data.userId);
  }

  static async updateGroup(
    groupId: string,
    userId: string,
    data: GroupUpdateData,
  ): Promise<GroupResponse> {
    const { group } = await this.getGroupById(groupId, userId);

    if (!group.isOwner && group.role !== 'admin') {
      throw new AuthError('Nie masz uprawnień do edycji tej grupy');
    }

    if (data.name && data.name !== group.name) {
      await GroupValidatorService.validateGroupName(data.name, groupId);
    }

    const updatedGroup = await GroupRepository.update(groupId, {
      ...data,
      updatedAt: new Date(),
    });

    if (!updatedGroup) {
      throw new ValidationError('Nie udało się zaktualizować grupy');
    }

    return this.getGroupById(groupId, userId);
  }

  static async deleteGroup(
    groupId: string,
    userId: string,
  ): Promise<{ success: boolean; message: string }> {
    const { group } = await this.getGroupById(groupId, userId);

    if (!group.isOwner) {
      throw new AuthError('Tylko właściciel może usunąć grupę');
    }

    await GroupMemberRepository.removeAllFromGroup(groupId);

    const deleted = await GroupRepository.delete(groupId);

    if (!deleted) {
      throw new ValidationError('Nie udało się usunąć grupy');
    }

    return {
      success: true,
      message: 'Grupa została usunięta',
    };
  }

  static async joinGroup(data: GroupMembershipData): Promise<MembershipChangeResult> {
    return GroupMembershipService.joinGroup(data);
  }

  static async leaveGroup(data: GroupMembershipData): Promise<MembershipChangeResult> {
    return GroupMembershipService.leaveGroup(data);
  }

  static async removeMember(
    adminId: string,
    data: GroupMembershipData,
  ): Promise<MembershipChangeResult> {
    return GroupMembershipService.removeMember(adminId, data);
  }

  static async updateMemberRole(
    adminId: string,
    data: GroupMembershipData,
  ): Promise<MembershipChangeResult> {
    return GroupMembershipService.updateMemberRole(adminId, data);
  }

  static async transferOwnership(
    ownerId: string,
    data: GroupMembershipData,
  ): Promise<MembershipChangeResult> {
    return GroupMembershipService.transferOwnership(ownerId, data);
  }

  static async checkGroupName(
    name: string,
    currentGroupId?: string,
  ): Promise<{ available: boolean; message: string }> {
    return GroupValidatorService.checkGroupName(name, currentGroupId);
  }
}
