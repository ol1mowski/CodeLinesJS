import { Types } from 'mongoose';
import { GroupRepository, GroupMemberRepository } from '../../repositories/group.repository.js';
import { AuthError, ValidationError } from '../../utils/errors.js';
import {
  GroupMembershipData,
  MembershipChangeResult,
  GroupResponse
} from '../../types/group.types.js';

interface IGroupFacadeService {
  getGroupById(groupId: string, userId?: string): Promise<GroupResponse>;
}

let groupFacadeService: IGroupFacadeService;

export class GroupMembershipService {
  static setGroupFacadeService(service: IGroupFacadeService) {
    groupFacadeService = service;
  }

  static async joinGroup(data: GroupMembershipData): Promise<MembershipChangeResult> {
    const { userId, groupId, role = 'member' } = data;
    
    const { group } = await groupFacadeService.getGroupById(groupId, userId);
    
    if (group.isMember) {
      return {
        success: false,
        message: 'Już jesteś członkiem tej grupy'
      };
    }
    
    const newMember = await GroupMemberRepository.create({
      user: new Types.ObjectId(userId),
      group: new Types.ObjectId(groupId),
      role
    });
    
    await GroupRepository.update(groupId, {
      $push: { members: newMember._id }
    } as any);
    
    const updatedGroup = await groupFacadeService.getGroupById(groupId, userId);
    
    return {
      success: true,
      message: 'Pomyślnie dołączono do grupy',
      group: updatedGroup.group
    };
  }

  static async leaveGroup(data: GroupMembershipData): Promise<MembershipChangeResult> {
    const { userId, groupId } = data;
    
    const { group } = await groupFacadeService.getGroupById(groupId, userId);
    
    if (!group.isMember) {
      return {
        success: false,
        message: 'Nie jesteś członkiem tej grupy'
      };
    }
    
    if (group.isOwner) {
      throw new ValidationError('Właściciel nie może opuścić grupy. Przenieś najpierw własność grupy.');
    }
    
    await GroupMemberRepository.remove(userId, groupId);
    
    await GroupRepository.update(groupId, {
      $pull: { members: { user: new Types.ObjectId(userId) } }
    } as any);
    
    return {
      success: true,
      message: 'Pomyślnie opuszczono grupę'
    };
  }

  static async removeMember(
    adminId: string, 
    data: GroupMembershipData
  ): Promise<MembershipChangeResult> {
    const { userId, groupId } = data;
    
    const { group } = await groupFacadeService.getGroupById(groupId, adminId);
    
    if (!group.isOwner && group.role !== 'admin') {
      throw new AuthError('Nie masz uprawnień do usuwania członków');
    }
    
    const targetMembership = await GroupMemberRepository.findMembership(userId, groupId);
    
    if (!targetMembership) {
      return {
        success: false,
        message: 'Użytkownik nie jest członkiem tej grupy'
      };
    }
    
    if (targetMembership.role === 'owner') {
      throw new ValidationError('Nie można usunąć właściciela grupy');
    }
    
    if (targetMembership.role === 'admin' && !group.isOwner) {
      throw new ValidationError('Administrator nie może usunąć innego administratora');
    }
    
    await GroupMemberRepository.remove(userId, groupId);
    
    await GroupRepository.update(groupId, {
      $pull: { members: { user: new Types.ObjectId(userId) } }
    } as any);
    
    const updatedGroup = await groupFacadeService.getGroupById(groupId, adminId);
    
    return {
      success: true,
      message: 'Pomyślnie usunięto członka',
      group: updatedGroup.group
    };
  }

  static async updateMemberRole(
    adminId: string, 
    data: GroupMembershipData
  ): Promise<MembershipChangeResult> {
    const { userId, groupId, role } = data;
    
    if (!role) {
      throw new ValidationError('Nie podano roli');
    }
    
    const { group } = await groupFacadeService.getGroupById(groupId, adminId);
    
    if (!group.isOwner && group.role !== 'admin') {
      throw new AuthError('Nie masz uprawnień do zmiany ról');
    }
    
    const targetMembership = await GroupMemberRepository.findMembership(userId, groupId);
    
    if (!targetMembership) {
      return {
        success: false,
        message: 'Użytkownik nie jest członkiem tej grupy'
      };
    }
    
    if (targetMembership.role === 'owner') {
      throw new ValidationError('Nie można zmienić roli właściciela grupy');
    }
    
    if (targetMembership.role === 'admin' && !group.isOwner) {
      throw new ValidationError('Administrator nie może zmienić roli innego administratora');
    }
    
    await GroupMemberRepository.updateRole(userId, groupId, role);
    
    const updatedGroup = await groupFacadeService.getGroupById(groupId, adminId);
    
    return {
      success: true,
      message: `Rola została zmieniona na "${role}"`,
      group: updatedGroup.group
    };
  }

  static async transferOwnership(
    ownerId: string, 
    data: GroupMembershipData
  ): Promise<MembershipChangeResult> {
    const { userId, groupId } = data;
    
    const { group } = await groupFacadeService.getGroupById(groupId, ownerId);
    
    if (!group.isOwner) {
      throw new AuthError('Tylko właściciel może przekazać własność grupy');
    }
    
    const targetMembership = await GroupMemberRepository.findMembership(userId, groupId);
    
    if (!targetMembership) {
      return {
        success: false,
        message: 'Użytkownik nie jest członkiem tej grupy'
      };
    }
    
    await GroupMemberRepository.updateRole(ownerId, groupId, 'admin');
    
    await GroupMemberRepository.updateRole(userId, groupId, 'owner');
    
    await GroupRepository.update(groupId, {
      owner: new Types.ObjectId(userId)
    });
    
    const updatedGroup = await groupFacadeService.getGroupById(groupId, ownerId);
    
    return {
      success: true,
      message: 'Własność grupy została przekazana',
      group: updatedGroup.group
    };
  }
} 