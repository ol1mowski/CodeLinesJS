import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getGroupsController } from '../../../../src/api/controllers/groups/getGroups.js';
import { GroupService } from '../../../../src/services/group.service.js';
import { NextFunction, Request, Response } from 'express';
import { GroupsResponse } from '../../../../src/types/group.types.js';

declare module 'express' {
  interface Request {
    user?: { userId: string };
  }
}

vi.mock('../../../../src/services/group.service.js', () => ({
  GroupService: {
    getGroups: vi.fn()
  }
}));

const mockedGroupService = vi.mocked(GroupService);

describe('getGroupsController', () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      query: {},
      user: { userId: 'user123' }
    } as unknown as Request;

    res = {
      json: vi.fn()
    } as unknown as Response;

    next = vi.fn() as unknown as NextFunction;

    vi.clearAllMocks();
  });

  it('should call GroupService.getGroups and return groups with status success', async () => {
    const mockGroups = {
      groups: [
        { _id: 'group1', name: 'Group 1' },
        { _id: 'group2', name: 'Group 2' }
      ],
      total: 2,
      page: 1,
      limit: 20,
      hasNextPage: false
    } as unknown as GroupsResponse;

    mockedGroupService.getGroups.mockResolvedValue(mockGroups as GroupsResponse);

    await getGroupsController(req, res, next);

    expect(mockedGroupService.getGroups).toHaveBeenCalledWith({
      userId: 'user123',
      tag: undefined,
      search: undefined,
      page: undefined,
      limit: undefined
    });

    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      data: mockGroups
    });

    expect(next).not.toHaveBeenCalled();
  });

  it('should pass query parameters to GroupService.getGroups', async () => {
    req.query = {
      tag: 'javascript',
      search: 'coding',
      page: '2',
      limit: '10'
    };

    const mockGroups = {
      groups: [
        { _id: 'group3', name: 'Group 3', tags: ['javascript'] },
        { _id: 'group4', name: 'Group 4', tags: ['javascript'] }
      ],
      total: 10,
      page: 2,
      limit: 10,
      hasNextPage: false
    } as unknown as GroupsResponse;

    mockedGroupService.getGroups.mockResolvedValue(mockGroups as GroupsResponse);

    await getGroupsController(req, res, next);

    expect(mockedGroupService.getGroups).toHaveBeenCalledWith({
      userId: 'user123',
      tag: 'javascript',
      search: 'coding',
      page: 2,
      limit: 10
    });

    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      data: mockGroups
    });
  });

  it('should handle requests from unauthenticated users', async () => {
    req.user = undefined;

    const mockGroups = {
      groups: [
        { _id: 'group1', name: 'Group 1' },
        { _id: 'group2', name: 'Group 2' }
      ],
      total: 2,
      page: 1,
      limit: 20,
      hasNextPage: false
    } as unknown as GroupsResponse;

    mockedGroupService.getGroups.mockResolvedValue(mockGroups);

    await getGroupsController(req, res, next);

    expect(mockedGroupService.getGroups).toHaveBeenCalledWith({
      userId: undefined,
      tag: undefined,
      search: undefined,
      page: undefined,
      limit: undefined
    });

    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      data: mockGroups
    });
  });

  it('should call next with error if GroupService.getGroups throws', async () => {
    const mockError = new Error('Service error');
    mockedGroupService.getGroups.mockRejectedValue(mockError);

    await getGroupsController(req, res, next);

    expect(mockedGroupService.getGroups).toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(mockError);
  });
}); 