import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getGroupsController } from '../../../../src/api/controllers/groups/getGroups.js';
import { GroupService } from '../../../../src/services/group.service.js';
import { NextFunction, Request } from 'express';
import { GroupsResponse } from '../../../../src/types/group.types.js';
import { mockResponseUtils } from '../../../setup/setupResponseMocks.js';

declare global {
  namespace Express {
    interface Response {
      success: any;
      fail: any;
      error: any;
      paginated: any;
    }
  }
}

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
  let res: ReturnType<typeof mockResponseUtils.createMockResponse>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      query: {},
      user: { userId: 'user123' }
    } as unknown as Request;

    res = mockResponseUtils.createMockResponse();

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

    await getGroupsController(req, res as any, next);

    // Kontroler ustawia domyślne wartości page i limit
    expect(mockedGroupService.getGroups).toHaveBeenCalledWith({
      userId: 'user123',
      tag: undefined,
      search: undefined,
      page: 1,
      limit: 10
    });

    // Sprawdź wywołanie res.paginated z danymi paginacji
    expect(res.paginated).toHaveBeenCalledWith(
      mockGroups.groups,
      1,
      10,
      mockGroups.total,
      'Grupy pobrane pomyślnie'
    );

    expect(next).not.toHaveBeenCalled();
  });

  it('should pass query parameters to GroupService.getGroups', async () => {
    req.query = {
      tag: 'javascript',
      search: 'coding',
      page: '2',
      limit: '15'
    };

    const mockGroups = {
      groups: [
        { _id: 'group3', name: 'Group 3', tags: ['javascript'] },
        { _id: 'group4', name: 'Group 4', tags: ['javascript'] }
      ],
      total: 10,
      page: 2,
      limit: 15,
      hasNextPage: false
    } as unknown as GroupsResponse;

    mockedGroupService.getGroups.mockResolvedValue(mockGroups as GroupsResponse);

    await getGroupsController(req, res as any, next);

    expect(mockedGroupService.getGroups).toHaveBeenCalledWith({
      userId: 'user123',
      tag: 'javascript',
      search: 'coding',
      page: 2,
      limit: 15
    });

    // Sprawdź wywołanie res.paginated z danymi paginacji
    expect(res.paginated).toHaveBeenCalledWith(
      mockGroups.groups,
      2,
      15,
      mockGroups.total,
      'Grupy pobrane pomyślnie'
    );
  });

  it('should handle requests from unauthenticated users', async () => {
    req.user = undefined;

    await getGroupsController(req, res as any, next);

    // Kontroler powinien zatrzymać się na walidacji userId i wywołać res.fail
    expect(mockedGroupService.getGroups).not.toHaveBeenCalled();
    expect(res.fail).toHaveBeenCalledWith(
      'Brak identyfikatora użytkownika. Zaloguj się ponownie.',
      [{ code: 'AUTH_REQUIRED', message: 'Brak identyfikatora użytkownika. Zaloguj się ponownie.' }]
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next with error if GroupService.getGroups throws', async () => {
    const mockError = new Error('Service error');
    mockedGroupService.getGroups.mockRejectedValue(mockError);

    await getGroupsController(req, res as any, next);

    expect(mockedGroupService.getGroups).toHaveBeenCalled();
    expect(res.success).not.toHaveBeenCalled();
    expect(res.paginated).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(mockError);
  });
}); 