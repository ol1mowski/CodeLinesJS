import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getResources } from '../../../../src/api/controllers/resources/resources.controller.js';
import { Resource } from '../../../../src/models/resource.model.js';
import { User } from '../../../../src/models/user.model.js';
import { NextFunction, Response, Request } from 'express';
import { Types } from 'mongoose';
import { mockResponseUtils } from '../../../setup/setupResponseMocks.js';

interface CustomResponse extends Response {
  success: (data: any, message?: string) => void;
  fail: (errors: any, message?: string) => void;
  error: (code: number, message: string) => void;
}

vi.mock('../../../../src/models/resource.model.js', () => ({
  Resource: {
    find: vi.fn(() => ({
      sort: vi.fn(() => ({
        lean: vi.fn()
      }))
    }))
  }
}));

vi.mock('../../../../src/models/user.model.js', () => ({
  User: {
    findById: vi.fn(() => ({
      select: vi.fn(() => ({
        lean: vi.fn()
      }))
    }))
  }
}));

describe('Resources Controller', () => {
  let req: Partial<Request & { user: any }>;
  let res: Partial<CustomResponse>;
  let next: NextFunction;
  let mockResources: any[];
  let mockUser: any;
  
  beforeEach(() => {
    req = {
      query: {},
      user: {
        id: '507f1f77bcf86cd799439011',
        userId: '507f1f77bcf86cd799439011',
        email: 'user@example.com',
        role: 'user'
      }
    };
    
    res = mockResponseUtils.createMockResponse() as unknown as Partial<CustomResponse>;
    
    next = vi.fn() as unknown as NextFunction;
    
    const resource1Id = new Types.ObjectId('507f1f77bcf86cd799439001');
    const resource2Id = new Types.ObjectId('507f1f77bcf86cd799439002');
    
    mockResources = [
      {
        _id: resource1Id,
        title: 'JavaScript Basics',
        description: 'Learn JavaScript fundamentals',
        url: 'https://example.com/js-basics',
        type: 'article',
        category: 'javascript',
        difficulty: 'beginner',
        tags: ['javascript', 'basics', 'tutorial'],
        isRecommended: true,
        author: {
          name: 'John Doe',
          url: 'https://example.com/johndoe'
        },
        isPublished: true,
        createdAt: new Date('2023-01-01')
      },
      {
        _id: resource2Id,
        title: 'React Hooks',
        description: 'Advanced React hooks usage',
        url: 'https://example.com/react-hooks',
        type: 'tutorial',
        category: 'react',
        difficulty: 'intermediate',
        tags: ['react', 'hooks', 'frontend'],
        isRecommended: false,
        author: {
          name: 'Jane Smith',
          url: 'https://example.com/janesmith'
        },
        isPublished: true,
        createdAt: new Date('2023-02-01')
      }
    ];
    
    mockUser = {
      _id: new Types.ObjectId('507f1f77bcf86cd799439011'),
      preferences: {
        savedResources: [
          resource1Id
        ]
      },
      stats: {
        progress: {
          currentLevel: 2
        }
      }
    };
    
    const userSelectMock = vi.fn().mockReturnValue({
      lean: vi.fn().mockResolvedValue(mockUser)
    });
    
    const userFindByIdMock = vi.fn().mockReturnValue({
      select: userSelectMock
    });
    
    User.findById = userFindByIdMock;
    
    const resourceSortMock = vi.fn().mockReturnValue({
      lean: vi.fn().mockResolvedValue(mockResources)
    });
    
    const resourceFindMock = vi.fn().mockReturnValue({
      sort: resourceSortMock
    });
    
    Resource.find = resourceFindMock;
    
    vi.clearAllMocks();
  });
  
  it('should fetch and format resources', async () => {
    await getResources(req as Request, res as Response, next);
    
    expect(User.findById).toHaveBeenCalledWith(req.user?.userId);
    expect(Resource.find).toHaveBeenCalledWith({ isPublished: true });
    expect(res.success).toHaveBeenCalledWith({
      resources: [
        {
          id: mockResources[0]._id,
          title: mockResources[0].title,
          description: mockResources[0].description,
          url: mockResources[0].url,
          type: mockResources[0].type,
          category: mockResources[0].category,
          difficulty: mockResources[0].difficulty,
          tags: mockResources[0].tags,
          isRecommended: mockResources[0].isRecommended,
          author: mockResources[0].author,
          isSaved: true,
          createdAt: mockResources[0].createdAt
        },
        {
          id: mockResources[1]._id,
          title: mockResources[1].title,
          description: mockResources[1].description,
          url: mockResources[1].url,
          type: mockResources[1].type,
          category: mockResources[1].category,
          difficulty: mockResources[1].difficulty,
          tags: mockResources[1].tags,
          isRecommended: mockResources[1].isRecommended,
          author: mockResources[1].author,
          isSaved: false,
          createdAt: mockResources[1].createdAt
        }
      ],
      total: 2
    }, 'Zasoby pobrane pomyślnie');
  });
  
  it('should apply query filters correctly', async () => {
    req.query = {
      category: 'javascript',
      type: 'article',
      difficulty: 'beginner',
      tag: 'basics'
    };
    
    await getResources(req as Request, res as Response, next);
    
    expect(Resource.find).toHaveBeenCalledWith({
      isPublished: true,
      category: 'javascript',
      type: 'article',
      difficulty: 'beginner',
      tags: 'basics'
    });
  });
  
  it('should apply search filter correctly', async () => {
    req.query = {
      search: 'javascript'
    };
    
    await getResources(req as Request, res as Response, next);
    
    expect(Resource.find).toHaveBeenCalledWith({
      isPublished: true,
      $or: [
        { title: { $regex: 'javascript', $options: 'i' } },
        { description: { $regex: 'javascript', $options: 'i' } },
        { tags: { $regex: 'javascript', $options: 'i' } }
      ]
    });
  });
  
  it('should call next with error when an exception occurs', async () => {
    const mockError = new Error('Database error');
    
    User.findById = vi.fn().mockImplementation(() => {
      throw mockError;
    });
    
    await getResources(req as Request, res as Response, next);
    
    expect(next).toHaveBeenCalledWith(mockError);
    expect(res.json).not.toHaveBeenCalled();
  });
}); 