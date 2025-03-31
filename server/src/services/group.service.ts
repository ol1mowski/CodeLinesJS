import { Types } from 'mongoose';
import { GroupRepository, GroupMemberRepository } from '../repositories/group.repository.js';
import { AuthError, ValidationError } from '../utils/errors.js';
import {
  IGroup,
  IGroupMember,
  GroupWithUserInfo,
  GroupRole,
  GroupQueryOptions,
  GroupsResponse,
  GroupResponse,
  GroupCreateData,
  GroupUpdateData,
  GroupMembershipData,
  MembershipChangeResult
} from '../types/group.types.js';

/**
 * Fasada dla operacji na grupach - wzorzec Facade Pattern
 * Zapewnia prosty interfejs dla złożonych operacji
 */
export class GroupService {
  /**
   * Wzbogaca dane grupy o informacje o członkostwie użytkownika
   * @param group Dane grupy
   * @param members Lista członków grupy
   * @param userId ID użytkownika 
   * @returns Grupa z informacjami o członkostwie
   */
  static enrichGroupWithUserInfo(
    group: IGroup,
    members: IGroupMember[],
    userId?: string
  ): GroupWithUserInfo {
    const userMembership = userId
      ? members.find(member => 
          typeof member.user === 'object' 
            ? member.user._id.toString() === userId
            : member.user.toString() === userId
        )
      : null;

    const isOwner = userId && typeof group.owner === 'object'
      ? group.owner._id.toString() === userId
      : group.owner.toString() === userId;

    return {
      ...group,
      members,
      isMember: !!userMembership,
      isOwner,
      role: userMembership ? userMembership.role : null,
      joinedAt: userMembership ? userMembership.createdAt : null,
    };
  }

  /**
   * Pobiera wszystkie grupy
   * @param options Opcje zapytania
   * @returns Lista grup z informacjami o paginacji
   */
  static async getGroups(options: GroupQueryOptions = {}): Promise<GroupsResponse> {
    const { page = 1, limit = 20, userId } = options;
    
    const [groups, total] = await Promise.all([
      GroupRepository.findAll(options),
      GroupRepository.count(options)
    ]);
    
    let userMemberships: IGroupMember[] = [];
    if (userId) {
      userMemberships = await GroupMemberRepository.findByUserId(userId);
    }
    
    const enrichedGroups = groups.map(group => {
      const groupMembers = userMemberships
        .filter(membership => 
          typeof membership.group === 'object' && 
          membership.group._id.toString() === group._id.toString()
        );
      
      return this.enrichGroupWithUserInfo(group, groupMembers, userId);
    });
    
    const hasNextPage = (page * limit) < total;
    
    return {
      groups: enrichedGroups,
      total,
      page,
      limit,
      hasNextPage
    };
  }

  /**
   * Pobiera grupę po ID
   * @param groupId ID grupy
   * @param userId ID użytkownika
   * @returns Dane grupy
   */
  static async getGroupById(groupId: string, userId?: string): Promise<GroupResponse> {
    const group = await GroupRepository.findById(groupId);
    
    if (!group) {
      throw new ValidationError('Grupa nie istnieje');
    }
    
    const members = await GroupMemberRepository.findByGroupId(groupId);
    const groupWithUserInfo = this.enrichGroupWithUserInfo(group, members, userId);
    
    return { group: groupWithUserInfo };
  }

  /**
   * Tworzy nową grupę
   * @param data Dane grupy
   * @returns Utworzona grupa
   */
  static async createGroup(data: GroupCreateData): Promise<GroupResponse> {
    if (!data.userId) {
      throw new AuthError('Brak autoryzacji');
    }

    if (!data.name) {
      throw new ValidationError('Nazwa grupy jest wymagana');
    }

    if (data.name.length < 3 || data.name.length > 50) {
      throw new ValidationError('Nazwa grupy musi mieć od 3 do 50 znaków');
    }

    const existingGroup = await GroupRepository.findByName(data.name);
    if (existingGroup) {
      throw new ValidationError('Grupa o takiej nazwie już istnieje');
    }

    // Wzorzec Builder do budowania obiektu grupy
    const newGroup = await GroupRepository.create({
      name: data.name,
      description: data.description || '',
      tags: data.tags || [],
      owner: new Types.ObjectId(data.userId),
      members: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    // Dodajemy właściciela jako członka grupy
    const newMember = await GroupMemberRepository.create({
      user: new Types.ObjectId(data.userId),
      group: new Types.ObjectId(newGroup._id),
      role: 'owner',
    });

    // Aktualizujemy grupę - dodajemy członka
    await GroupRepository.update(newGroup._id.toString(), {
      members: [newMember._id]
    });

    // Pobieramy świeżo utworzoną grupę z uzupełnionymi danymi
    return this.getGroupById(newGroup._id.toString(), data.userId);
  }

  /**
   * Aktualizuje dane grupy
   * @param groupId ID grupy
   * @param userId ID użytkownika dokonującego aktualizacji
   * @param data Dane do aktualizacji
   * @returns Zaktualizowana grupa
   */
  static async updateGroup(
    groupId: string, 
    userId: string, 
    data: GroupUpdateData
  ): Promise<GroupResponse> {
    const { group } = await this.getGroupById(groupId, userId);
    
    if (!group.isOwner && group.role !== 'admin') {
      throw new AuthError('Nie masz uprawnień do edycji tej grupy');
    }
    
    // Sprawdzamy, czy nowa nazwa nie jest już zajęta
    if (data.name && data.name !== group.name) {
      const existingGroup = await GroupRepository.findByName(data.name);
      if (existingGroup && existingGroup._id.toString() !== groupId) {
        throw new ValidationError('Grupa o takiej nazwie już istnieje');
      }
    }
    
    const updatedGroup = await GroupRepository.update(groupId, {
      ...data,
      updatedAt: new Date()
    });
    
    if (!updatedGroup) {
      throw new ValidationError('Nie udało się zaktualizować grupy');
    }
    
    return this.getGroupById(groupId, userId);
  }

  /**
   * Usuwa grupę
   * @param groupId ID grupy
   * @param userId ID użytkownika dokonującego usunięcia
   * @returns Informacja o sukcesie
   */
  static async deleteGroup(groupId: string, userId: string): Promise<{ success: boolean, message: string }> {
    const { group } = await this.getGroupById(groupId, userId);
    
    if (!group.isOwner) {
      throw new AuthError('Tylko właściciel może usunąć grupę');
    }
    
    // Strategia usuwania - najpierw usuwamy wszystkich członków
    await GroupMemberRepository.removeAllFromGroup(groupId);
    
    // Następnie usuwamy grupę
    const deleted = await GroupRepository.delete(groupId);
    
    if (!deleted) {
      throw new ValidationError('Nie udało się usunąć grupy');
    }
    
    return {
      success: true,
      message: 'Grupa została usunięta'
    };
  }

  /**
   * Dołącza użytkownika do grupy
   * @param data Dane dołączenia
   * @returns Rezultat operacji
   */
  static async joinGroup(data: GroupMembershipData): Promise<MembershipChangeResult> {
    const { userId, groupId, role = 'member' } = data;
    
    const { group } = await this.getGroupById(groupId, userId);
    
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
    
    // Aktualizujemy grupę - dodajemy członka
    await GroupRepository.update(groupId, {
      $push: { members: newMember._id }
    });
    
    const updatedGroup = await this.getGroupById(groupId, userId);
    
    return {
      success: true,
      message: 'Pomyślnie dołączono do grupy',
      group: updatedGroup.group
    };
  }

  /**
   * Opuszcza grupę
   * @param data Dane opuszczenia
   * @returns Rezultat operacji
   */
  static async leaveGroup(data: GroupMembershipData): Promise<MembershipChangeResult> {
    const { userId, groupId } = data;
    
    const { group } = await this.getGroupById(groupId, userId);
    
    if (!group.isMember) {
      return {
        success: false,
        message: 'Nie jesteś członkiem tej grupy'
      };
    }
    
    if (group.isOwner) {
      throw new ValidationError('Właściciel nie może opuścić grupy. Przenieś najpierw własność grupy.');
    }
    
    // Usuwamy członkostwo
    await GroupMemberRepository.remove(userId, groupId);
    
    // Aktualizujemy grupę - usuwamy członka
    await GroupRepository.update(groupId, {
      $pull: { members: { user: new Types.ObjectId(userId) } }
    });
    
    return {
      success: true,
      message: 'Pomyślnie opuszczono grupę'
    };
  }

  /**
   * Usuwa członka z grupy
   * @param adminId ID administratora/właściciela
   * @param data Dane usunięcia
   * @returns Rezultat operacji
   */
  static async removeMember(
    adminId: string, 
    data: GroupMembershipData
  ): Promise<MembershipChangeResult> {
    const { userId, groupId } = data;
    
    const { group } = await this.getGroupById(groupId, adminId);
    
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
    
    // Nie można usunąć właściciela
    if (targetMembership.role === 'owner') {
      throw new ValidationError('Nie można usunąć właściciela grupy');
    }
    
    // Admin nie może usunąć innego admina
    if (targetMembership.role === 'admin' && !group.isOwner) {
      throw new ValidationError('Administrator nie może usunąć innego administratora');
    }
    
    // Usuwamy członkostwo
    await GroupMemberRepository.remove(userId, groupId);
    
    // Aktualizujemy grupę - usuwamy członka
    await GroupRepository.update(groupId, {
      $pull: { members: { user: new Types.ObjectId(userId) } }
    });
    
    const updatedGroup = await this.getGroupById(groupId, adminId);
    
    return {
      success: true,
      message: 'Pomyślnie usunięto członka',
      group: updatedGroup.group
    };
  }

  /**
   * Aktualizuje rolę członka grupy
   * @param adminId ID administratora/właściciela
   * @param data Dane aktualizacji
   * @returns Rezultat operacji
   */
  static async updateMemberRole(
    adminId: string, 
    data: GroupMembershipData
  ): Promise<MembershipChangeResult> {
    const { userId, groupId, role } = data;
    
    if (!role) {
      throw new ValidationError('Nie podano roli');
    }
    
    const { group } = await this.getGroupById(groupId, adminId);
    
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
    
    // Nie można zmienić roli właściciela
    if (targetMembership.role === 'owner') {
      throw new ValidationError('Nie można zmienić roli właściciela grupy');
    }
    
    // Admin nie może zmienić roli innego admina
    if (targetMembership.role === 'admin' && !group.isOwner) {
      throw new ValidationError('Administrator nie może zmienić roli innego administratora');
    }
    
    // Aktualizujemy rolę
    await GroupMemberRepository.updateRole(userId, groupId, role);
    
    const updatedGroup = await this.getGroupById(groupId, adminId);
    
    return {
      success: true,
      message: `Rola została zmieniona na "${role}"`,
      group: updatedGroup.group
    };
  }

  /**
   * Przekazuje własność grupy
   * @param ownerId ID obecnego właściciela
   * @param data Dane transferu własności
   * @returns Rezultat operacji
   */
  static async transferOwnership(
    ownerId: string, 
    data: GroupMembershipData
  ): Promise<MembershipChangeResult> {
    const { userId, groupId } = data;
    
    const { group } = await this.getGroupById(groupId, ownerId);
    
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
    
    // Aktualizujemy role - zmiana właściciela na admina
    await GroupMemberRepository.updateRole(ownerId, groupId, 'admin');
    
    // Nowy właściciel
    await GroupMemberRepository.updateRole(userId, groupId, 'owner');
    
    // Aktualizujemy grupę
    await GroupRepository.update(groupId, {
      owner: new Types.ObjectId(userId)
    });
    
    const updatedGroup = await this.getGroupById(groupId, ownerId);
    
    return {
      success: true,
      message: 'Własność grupy została przekazana',
      group: updatedGroup.group
    };
  }

  /**
   * Sprawdza, czy nazwa grupy jest dostępna
   * @param name Nazwa grupy
   * @param currentGroupId Opcjonalne ID grupy, którą aktualizujemy
   * @returns Informacja o dostępności nazwy
   */
  static async checkGroupName(
    name: string, 
    currentGroupId?: string
  ): Promise<{ available: boolean, message: string }> {
    if (name.length < 3 || name.length > 50) {
      return {
        available: false,
        message: 'Nazwa grupy musi mieć od 3 do 50 znaków'
      };
    }
    
    const existingGroup = await GroupRepository.findByName(name);
    
    if (!existingGroup) {
      return {
        available: true,
        message: 'Nazwa jest dostępna'
      };
    }
    
    if (currentGroupId && existingGroup._id.toString() === currentGroupId) {
      return {
        available: true,
        message: 'To jest aktualna nazwa tej grupy'
      };
    }
    
    return {
      available: false,
      message: 'Grupa o takiej nazwie już istnieje'
    };
  }
} 