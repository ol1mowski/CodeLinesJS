import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GroupMembershipService } from '../../src/services/group/group-membership.service.js';
import { GroupRepository, GroupMemberRepository } from '../../src/repositories/group.repository.js';
import { ValidationError, AuthError } from '../../src/utils/errors.js';
import { Types } from 'mongoose';
import { GroupRole } from '../../src/types/group.types.js';

vi.mock('../../src/repositories/group.repository.js', () => ({
  GroupRepository: {
    findById: vi.fn(),
    update: vi.fn()
  },
  GroupMemberRepository: {
    findByGroupId: vi.fn(),
    findByUserAndGroup: vi.fn(),
    create: vi.fn(),
    delete: vi.fn(),
    remove: vi.fn(),
    findMembership: vi.fn(),
    updateRole: vi.fn(),
    update: vi.fn()
  }
}));

const mockGroupFacadeService = {
  getGroupById: vi.fn()
};

const validMongoIds = {
  group: '507f1f77bcf86cd799439011',
  user: '507f191e810c19729de860ea',
  owner: '507f191e810c19729de860eb',
  admin: '507f191e810c19729de860ec',
  member: '507f191e810c19729de860ed'
};

describe('GroupMembershipService', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    GroupMembershipService.setGroupFacadeService(mockGroupFacadeService);
  });

  describe('joinGroup', () => {
    it('should allow a user to join a group', async () => {
      const groupId = validMongoIds.group;
      const userId = validMongoIds.user;
      const data = { groupId, userId };

      const mockGroup = {
        _id: groupId,
        name: 'Test Group',
        owner: validMongoIds.owner,
        members: [],
        isMember: false
      };

      const mockGroupWithUserInfo = {
        ...mockGroup,
        isMember: true,
        memberCount: 1
      };


      const mockNewMember = {
        _id: validMongoIds.member,
        user: userId,
        group: groupId,
        role: 'member' as GroupRole
      };

      mockGroupFacadeService.getGroupById
        .mockResolvedValueOnce({ group: mockGroup })
        .mockResolvedValueOnce({ group: mockGroupWithUserInfo });

      (GroupMemberRepository.create as any).mockResolvedValue(mockNewMember);
      (GroupRepository.update as any).mockResolvedValue({ ...mockGroup, members: [...mockGroup.members, mockNewMember._id] });

      const result = await GroupMembershipService.joinGroup(data);

      expect(mockGroupFacadeService.getGroupById).toHaveBeenCalledWith(groupId, userId);
      expect(GroupMemberRepository.create).toHaveBeenCalledWith({
        user: expect.any(Types.ObjectId),
        group: expect.any(Types.ObjectId),
        role: 'member'
      });
      expect(GroupRepository.update).toHaveBeenCalledWith(
        groupId,
        expect.any(Object)
      );
      expect(mockGroupFacadeService.getGroupById).toHaveBeenCalledTimes(2);

      expect(result).toEqual({
        success: true,
        message: 'Pomyślnie dołączono do grupy',
        group: mockGroupWithUserInfo
      });
    });

    it('should throw ValidationError if user is already a member', async () => {
      const groupId = validMongoIds.group;
      const userId = validMongoIds.user;
      const data = { groupId, userId };

      const mockGroup = {
        _id: groupId,
        name: 'Test Group',
        isMember: true
      };

      mockGroupFacadeService.getGroupById.mockResolvedValue({ group: mockGroup });

      const result = await GroupMembershipService.joinGroup(data);

      expect(result).toEqual({
        success: false,
        message: 'Już jesteś członkiem tej grupy'
      });

      expect(mockGroupFacadeService.getGroupById).toHaveBeenCalledWith(groupId, userId);
      expect(GroupMemberRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('leaveGroup', () => {
    it('should allow a member to leave a group', async () => {
      const groupId = validMongoIds.group;
      const userId = validMongoIds.user;
      const data = { groupId, userId };

      const mockGroup = {
        _id: groupId,
        name: 'Test Group',
        owner: validMongoIds.owner,
        members: [validMongoIds.member],
        isMember: true,
        isOwner: false
      };

      const mockMembership = {
        _id: validMongoIds.member,
        user: userId,
        group: groupId,
        role: 'member' as GroupRole
      };

      mockGroupFacadeService.getGroupById.mockResolvedValue({ group: mockGroup });
      (GroupMemberRepository.remove as any).mockResolvedValue(true);
      (GroupRepository.update as any).mockResolvedValue({ ...mockGroup, members: [] });

      const result = await GroupMembershipService.leaveGroup(data);

      expect(mockGroupFacadeService.getGroupById).toHaveBeenCalledWith(groupId, userId);
      expect(GroupMemberRepository.remove).toHaveBeenCalledWith(userId, groupId);
      expect(GroupRepository.update).toHaveBeenCalledWith(
        groupId,
        expect.any(Object)
      );

      expect(result).toEqual({
        success: true,
        message: 'Pomyślnie opuszczono grupę'
      });
    });

    it('should throw ValidationError if user is not a member', async () => {
      const groupId = validMongoIds.group;
      const userId = validMongoIds.user;
      const data = { groupId, userId };

      const mockGroup = {
        _id: groupId,
        name: 'Test Group',
        isMember: false
      };

      mockGroupFacadeService.getGroupById.mockResolvedValue({ group: mockGroup });

      const result = await GroupMembershipService.leaveGroup(data);

      expect(result).toEqual({
        success: false,
        message: 'Nie jesteś członkiem tej grupy'
      });

      expect(mockGroupFacadeService.getGroupById).toHaveBeenCalledWith(groupId, userId);
      expect(GroupMemberRepository.remove).not.toHaveBeenCalled();
    });

    it('should throw ValidationError if user is the owner', async () => {
      const groupId = validMongoIds.group;
      const userId = validMongoIds.owner;
      const data = { groupId, userId };

      const mockGroup = {
        _id: groupId,
        name: 'Test Group',
        isMember: true,
        isOwner: true
      };

      mockGroupFacadeService.getGroupById.mockResolvedValue({ group: mockGroup });

      await expect(GroupMembershipService.leaveGroup(data))
        .rejects.toThrow(ValidationError);

      expect(mockGroupFacadeService.getGroupById).toHaveBeenCalledWith(groupId, userId);
      expect(GroupMemberRepository.remove).not.toHaveBeenCalled();
    });
  });

  describe('updateMemberRole', () => {
    it('should allow an admin to update member role', async () => {
      const adminId = validMongoIds.admin;
      const userId = validMongoIds.user;
      const groupId = validMongoIds.group;
      const role = 'admin' as GroupRole;
      const data = { groupId, userId, role };

      const mockGroup = {
        _id: groupId,
        name: 'Test Group',
        owner: validMongoIds.owner,
        members: [validMongoIds.admin, validMongoIds.user],
        isOwner: false,
        role: 'admin' as GroupRole,
        isMember: true
      };

      const mockGroupWithUserInfo = {
        ...mockGroup,
        memberCount: 2
      };

      const mockMembership = {
        _id: validMongoIds.user,
        user: userId,
        group: groupId,
        role: 'member' as GroupRole
      };

      mockGroupFacadeService.getGroupById
        .mockResolvedValueOnce({ group: mockGroup })
        .mockResolvedValueOnce({ group: mockGroupWithUserInfo });

      (GroupMemberRepository.findMembership as any).mockResolvedValue(mockMembership);
      (GroupMemberRepository.updateRole as any).mockResolvedValue({ ...mockMembership, role });

      const result = await GroupMembershipService.updateMemberRole(adminId, data);

      expect(mockGroupFacadeService.getGroupById).toHaveBeenCalledWith(groupId, adminId);
      expect(GroupMemberRepository.findMembership).toHaveBeenCalledWith(userId, groupId);
      expect(GroupMemberRepository.updateRole).toHaveBeenCalledWith(
        userId,
        groupId,
        role
      );
      expect(mockGroupFacadeService.getGroupById).toHaveBeenCalledTimes(2);

      expect(result).toEqual({
        success: true,
        message: 'Rola została zmieniona na "admin"',
        group: mockGroupWithUserInfo
      });
    });

    it('should throw AuthError if admin does not have permission', async () => {
      const adminId = validMongoIds.user;
      const userId = validMongoIds.member;
      const groupId = validMongoIds.group;
      const role = 'admin' as GroupRole;
      const data = { groupId, userId, role };

      const mockGroup = {
        _id: groupId,
        name: 'Test Group',
        role: 'member' as GroupRole,
        isOwner: false
      };

      mockGroupFacadeService.getGroupById.mockResolvedValue({ group: mockGroup });

      await expect(GroupMembershipService.updateMemberRole(adminId, data))
        .rejects.toThrow(AuthError);

      expect(mockGroupFacadeService.getGroupById).toHaveBeenCalledWith(groupId, adminId);
      expect(GroupMemberRepository.updateRole).not.toHaveBeenCalled();
    });

    it('should throw ValidationError if target user is not a member', async () => {
      const adminId = validMongoIds.admin;
      const userId = '507f191e810c19729de860ff'; // non-existent
      const groupId = validMongoIds.group;
      const role = 'admin' as GroupRole;
      const data = { groupId, userId, role };

      const mockGroup = {
        _id: groupId,
        name: 'Test Group',
        isOwner: true,
        role: 'owner' as GroupRole
      };

      mockGroupFacadeService.getGroupById.mockResolvedValue({ group: mockGroup });
      (GroupMemberRepository.findMembership as any).mockResolvedValue(null);

      const result = await GroupMembershipService.updateMemberRole(adminId, data);

      expect(result).toEqual({
        success: false,
        message: 'Użytkownik nie jest członkiem tej grupy'
      });

      expect(mockGroupFacadeService.getGroupById).toHaveBeenCalledWith(groupId, adminId);
      expect(GroupMemberRepository.findMembership).toHaveBeenCalledWith(userId, groupId);
      expect(GroupMemberRepository.updateRole).not.toHaveBeenCalled();
    });

    it('should throw ValidationError if trying to change the owner role', async () => {
      const adminId = validMongoIds.admin;
      const ownerId = validMongoIds.owner;
      const groupId = validMongoIds.group;
      const role = 'member' as GroupRole;
      const data = { groupId, userId: ownerId, role };

      const mockGroup = {
        _id: groupId,
        name: 'Test Group',
        isOwner: true,
        role: 'owner' as GroupRole
      };

      const mockOwnerMembership = {
        _id: validMongoIds.owner,
        user: ownerId,
        group: groupId,
        role: 'owner' as GroupRole
      };

      mockGroupFacadeService.getGroupById.mockResolvedValue({ group: mockGroup });
      (GroupMemberRepository.findMembership as any).mockResolvedValue(mockOwnerMembership);

      await expect(GroupMembershipService.updateMemberRole(adminId, data))
        .rejects.toThrow(ValidationError);

      expect(mockGroupFacadeService.getGroupById).toHaveBeenCalledWith(groupId, adminId);
      expect(GroupMemberRepository.findMembership).toHaveBeenCalledWith(ownerId, groupId);
      expect(GroupMemberRepository.updateRole).not.toHaveBeenCalled();
    });
  });
});