import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GroupFacadeService } from '../../../src/services/group/group-facade.service.js';
import { GroupRepository, GroupMemberRepository, LeanGroup, LeanGroupMember } from '../../../src/repositories/group.repository.js';
import { GroupEnricher } from '../../../src/services/group/group-enricher.service.js';
import { ValidationError, AuthError } from '../../../src/utils/errors.js';
import { Types } from 'mongoose';
import { GroupWithUserInfo } from '../../../src/types/group.types.js';

vi.mock('../../../src/repositories/group.repository.js', () => ({
  GroupRepository: {
    findAll: vi.fn(),
    count: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn()
  },
  GroupMemberRepository: {
    findByUserId: vi.fn(),
    findByGroupId: vi.fn(),
    create: vi.fn(),
    removeAllFromGroup: vi.fn()
  }
}));

vi.mock('../../../src/services/group/group-enricher.service.js', () => ({
  GroupEnricher: {
    enrichWithUserInfo: vi.fn()
  }
}));

vi.mock('../../../src/services/group/group-validator.service.js', () => ({
  GroupValidatorService: {
    validateGroupCreate: vi.fn(),
    validateGroupName: vi.fn(),
    checkGroupName: vi.fn()
  }
}));

import { GroupValidatorService } from '../../../src/services/group/group-validator.service.js';

const mockedGroupRepository = vi.mocked(GroupRepository);
const mockedGroupMemberRepository = vi.mocked(GroupMemberRepository);
const mockedGroupEnricher = vi.mocked(GroupEnricher);
const mockedGroupValidatorService = vi.mocked(GroupValidatorService);

describe('GroupFacadeService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getGroups', () => {
    it('should return groups with pagination', async () => {
      const mockGroups = [
        { 
          _id: 'group1', 
          name: 'Group 1', 
          members: [],
          owner: new Types.ObjectId(),
          tags: [],
          createdAt: new Date(),
          updatedAt: new Date() 
        },
        { 
          _id: 'group2', 
          name: 'Group 2',
          members: [],
          owner: new Types.ObjectId(),
          tags: [],
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ] as unknown as LeanGroup[];
      const mockTotal = 10;
      const mockOptions = { page: 2, limit: 5 };

      mockedGroupRepository.findAll.mockResolvedValue(mockGroups);
      mockedGroupRepository.count.mockResolvedValue(mockTotal);
      mockedGroupMemberRepository.findByUserId.mockResolvedValue([]);
      mockedGroupEnricher.enrichWithUserInfo.mockImplementation((group) => ({
        ...group,
        isMember: false
      }));

      const result = await GroupFacadeService.getGroups(mockOptions);

      expect(mockedGroupRepository.findAll).toHaveBeenCalledWith(mockOptions);
      expect(mockedGroupRepository.count).toHaveBeenCalledWith(mockOptions);
      expect(mockedGroupEnricher.enrichWithUserInfo).toHaveBeenCalledTimes(2);
      expect(result).toEqual({
        groups: expect.any(Array),
        total: mockTotal,
        page: mockOptions.page,
        limit: mockOptions.limit,
        hasNextPage: false // page 2 * limit 5 = 10, which is equal to total
      });
    });

    it('should include user membership information when userId is provided', async () => {
      const userId = 'user123';
      const mockGroups = [{
        _id: new Types.ObjectId('507f1f77bcf86cd799439011'), 
        name: 'Group 1',
        members: [],
        owner: new Types.ObjectId(),
        tags: [],
        createdAt: new Date(),
        updatedAt: new Date()
      }] as unknown as LeanGroup[];
      const mockMemberships = [
        { 
          _id: new Types.ObjectId(),
          user: 'user123', 
          group: { _id: new Types.ObjectId('507f1f77bcf86cd799439011') }, 
          role: 'member',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ] as unknown as LeanGroupMember[];

      mockedGroupRepository.findAll.mockResolvedValue(mockGroups);
      mockedGroupRepository.count.mockResolvedValue(1);
      mockedGroupMemberRepository.findByUserId.mockResolvedValue(mockMemberships);
      mockedGroupEnricher.enrichWithUserInfo.mockImplementation((group, members) => ({
        ...group,
        isMember: members.length > 0
      }));

      const result = await GroupFacadeService.getGroups({ userId });

      expect(mockedGroupMemberRepository.findByUserId).toHaveBeenCalledWith(userId);
      expect(mockedGroupEnricher.enrichWithUserInfo).toHaveBeenCalledWith(
        mockGroups[0],
        expect.any(Array),
        userId
      );
      expect(result.groups[0].isMember).toBe(true);
    });
  });

  describe('getGroupById', () => {
    it('should return a group by id with member information', async () => {
      const groupId = 'group123';
      const userId = 'user456';
      const mockGroup = { 
        _id: groupId, 
        name: 'Test Group',
        members: [],
        owner: new Types.ObjectId(),
        tags: [],
        createdAt: new Date(),
        updatedAt: new Date()
      } as unknown as LeanGroup;
      const mockMembers = [
        { 
          _id: new Types.ObjectId(),
          user: 'user123', 
          group: groupId, 
          role: 'owner',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        { 
          _id: new Types.ObjectId(),
          user: userId, 
          group: groupId, 
          role: 'member',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ] as unknown as LeanGroupMember[];
      const mockEnrichedGroup = { 
        ...mockGroup, 
        members: mockMembers,
        isMember: true,
        isOwner: false,
        role: 'member',
        joinedAt: expect.any(Date)
      };

      mockedGroupRepository.findById.mockResolvedValue(mockGroup);
      mockedGroupMemberRepository.findByGroupId.mockResolvedValue(mockMembers);
      mockedGroupEnricher.enrichWithUserInfo.mockReturnValue(mockEnrichedGroup as unknown as GroupWithUserInfo);

      const result = await GroupFacadeService.getGroupById(groupId, userId);

      expect(mockedGroupRepository.findById).toHaveBeenCalledWith(groupId);
      expect(mockedGroupMemberRepository.findByGroupId).toHaveBeenCalledWith(groupId);
      expect(mockedGroupEnricher.enrichWithUserInfo).toHaveBeenCalledWith(
        mockGroup,
        mockMembers,
        userId
      );
      expect(result).toEqual({ group: mockEnrichedGroup });
    });

    it('should throw ValidationError if group does not exist', async () => {
      const groupId = 'nonexistent';
      
      mockedGroupRepository.findById.mockResolvedValue(null);

      await expect(GroupFacadeService.getGroupById(groupId))
        .rejects.toThrow(ValidationError);
    });
  });

  describe('createGroup', () => {
    it('should create a new group and add the creator as owner', async () => {
      const userId = '507f1f77bcf86cd799439011'; // Valid ObjectId string
      const groupData = {
        name: 'New Group',
        description: 'A test group',
        tags: ['test', 'new'],
        userId
      };
      const mockGroup = {
        _id: new Types.ObjectId('507f191e810c19729de860ea'), // Valid ObjectId
        ...groupData,
        owner: new Types.ObjectId(userId),
        members: [],
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
      } as unknown as LeanGroup;
      const mockMember = {
        _id: new Types.ObjectId('507f191e810c19729de860eb'), // Valid ObjectId
        user: new Types.ObjectId(userId),
        group: new Types.ObjectId('507f191e810c19729de860ea'),
        role: 'owner',
        createdAt: new Date(),
        updatedAt: new Date()
      } as unknown as LeanGroupMember;
      const mockEnrichedGroup = {
        ...mockGroup,
        isOwner: true,
        isMember: true,
        role: 'owner',
        joinedAt: expect.any(Date)
      };

      mockedGroupValidatorService.validateGroupCreate.mockResolvedValue(undefined);
      mockedGroupRepository.create.mockResolvedValue(mockGroup);
      mockedGroupMemberRepository.create.mockResolvedValue(mockMember);
      mockedGroupRepository.update.mockResolvedValue(mockGroup);
      mockedGroupRepository.findById.mockResolvedValue(mockGroup);
      mockedGroupMemberRepository.findByGroupId.mockResolvedValue([mockMember]);
      mockedGroupEnricher.enrichWithUserInfo.mockReturnValue(mockEnrichedGroup as unknown as GroupWithUserInfo);

      const result = await GroupFacadeService.createGroup(groupData);
        
      expect(mockedGroupValidatorService.validateGroupCreate).toHaveBeenCalledWith(groupData);
      expect(mockedGroupRepository.create).toHaveBeenCalledWith(expect.objectContaining({
        name: groupData.name,
        description: groupData.description,
        tags: groupData.tags,
        owner: expect.any(Types.ObjectId)
      }));
      expect(mockedGroupMemberRepository.create).toHaveBeenCalledWith(expect.objectContaining({
        user: expect.any(Types.ObjectId),
        group: expect.any(Types.ObjectId),
        role: 'owner'
      }));
      expect(mockedGroupRepository.update).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ members: [mockMember._id] })
      );
      expect(result.group).toEqual(mockEnrichedGroup);
    });
  });

  describe('deleteGroup', () => {
    it('should delete a group if the user is the owner', async () => {
      const groupId = 'group123';
      const userId = 'user123';
      const mockGroup = {
        _id: groupId,
        name: 'Test Group',
        isOwner: true,
        role: 'owner',
        members: [],
        owner: new Types.ObjectId(),
        tags: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        isMember: true,
        joinedAt: new Date()
      };

      mockedGroupRepository.findById.mockResolvedValue(mockGroup as unknown as LeanGroup);
      mockedGroupMemberRepository.findByGroupId.mockResolvedValue([]);
      mockedGroupEnricher.enrichWithUserInfo.mockReturnValue(mockGroup as unknown as GroupWithUserInfo);
      mockedGroupMemberRepository.removeAllFromGroup.mockResolvedValue(true);
      mockedGroupRepository.delete.mockResolvedValue(true);

      const result = await GroupFacadeService.deleteGroup(groupId, userId);

      expect(mockedGroupMemberRepository.removeAllFromGroup).toHaveBeenCalledWith(groupId);
      expect(mockedGroupRepository.delete).toHaveBeenCalledWith(groupId);
      expect(result).toEqual({
        success: true,
        message: 'Grupa została usunięta'
      });
    });

    it('should throw AuthError if the user is not the owner', async () => {
      const groupId = 'group123';
      const userId = 'user123';
      const mockGroup = {
        _id: groupId,
        name: 'Test Group',
        isOwner: false,
        role: 'member',
        members: [],
        owner: new Types.ObjectId(),
        tags: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        isMember: true,
        joinedAt: new Date()
      };
      
      mockedGroupRepository.findById.mockResolvedValue(mockGroup as unknown as LeanGroup);
      mockedGroupMemberRepository.findByGroupId.mockResolvedValue([]);
      mockedGroupEnricher.enrichWithUserInfo.mockReturnValue(mockGroup as unknown as GroupWithUserInfo);

      await expect(GroupFacadeService.deleteGroup(groupId, userId))
        .rejects.toThrow(AuthError);
    });

    it('should throw ValidationError if the group cannot be deleted', async () => {
      const groupId = 'group123';
      const userId = 'user123';
      const mockGroup = {
        _id: groupId,
        name: 'Test Group',
        isOwner: true,
        role: 'owner',
        members: [],
        owner: new Types.ObjectId(),
        tags: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        isMember: true,
        joinedAt: new Date()
      };
      
      mockedGroupRepository.findById.mockResolvedValue(mockGroup as unknown as LeanGroup);
      mockedGroupMemberRepository.findByGroupId.mockResolvedValue([]);
      mockedGroupEnricher.enrichWithUserInfo.mockReturnValue(mockGroup as unknown as GroupWithUserInfo);
      mockedGroupMemberRepository.removeAllFromGroup.mockResolvedValue(true);
      mockedGroupRepository.delete.mockResolvedValue(false);

      await expect(GroupFacadeService.deleteGroup(groupId, userId))
        .rejects.toThrow(ValidationError);
    });
  });
}); 