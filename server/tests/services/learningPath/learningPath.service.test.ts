import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LearningPathService } from '../../../src/services/learningPath/learningPath.service.js';
import { LearningPathRepository, UserRepository } from '../../../src/services/learningPath/learningPath.repository.js';
import { LearningPathMapper } from '../../../src/services/learningPath/learningPath.mapper.js';
import { ValidationError } from '../../../src/utils/errors.js';
import { Types } from 'mongoose';

vi.mock('../../../src/services/learningPath/learningPath.repository.js', () => ({
  LearningPathRepository: {
    findAll: vi.fn(),
    findById: vi.fn(),
    checkPathExists: vi.fn()
  },
  UserRepository: {
    findUserWithLearningPathStats: vi.fn(),
    getUserLevel: vi.fn(),
    getUserLearningPathProgress: vi.fn()
  }
}));

vi.mock('../../../src/services/learningPath/learningPath.mapper.js', () => ({
  LearningPathMapper: {
    toLearningPathResponse: vi.fn(),
    toLearningPathDetailResponse: vi.fn(),
    calculateUserStats: vi.fn()
  }
}));

const mockedLearningPathRepository = vi.mocked(LearningPathRepository);
const mockedUserRepository = vi.mocked(UserRepository);
const mockedLearningPathMapper = vi.mocked(LearningPathMapper);

describe('LearningPathService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getLearningPaths', () => {
    it('should return formatted learning paths and user stats', async () => {
      const userId = 'user123';
      const mockQuery = {
        difficulty: 'beginner',
        search: 'javascript'
      };

      const mockPaths = [
        {
          _id: new Types.ObjectId(),
          title: 'JavaScript Basics',
          description: 'Learn JavaScript fundamentals',
          difficulty: 'beginner',
          category: 'javascript',
          estimatedTime: 120,
          requirements: ['Basic HTML knowledge'],
          outcomes: ['Understand JS basics'],
          requiredLevel: 1,
          totalLessons: 10,
          isActive: true
        },
        {
          _id: new Types.ObjectId(),
          title: 'Advanced JavaScript',
          description: 'Learn advanced JavaScript concepts',
          difficulty: 'advanced',
          category: 'javascript',
          estimatedTime: 240,
          requirements: ['JavaScript Basics'],
          outcomes: ['Understand advanced JS concepts'],
          requiredLevel: 3,
          totalLessons: 15,
          isActive: true
        }
      ];

      const mockUser = {
        _id: 'user123',
        stats: {
          level: 2,
          points: 500,
          learningPaths: [
            {
              pathId: mockPaths[0]._id,
              progress: {
                completedLessons: [new Types.ObjectId(), new Types.ObjectId()]
              }
            }
          ]
        }
      };

      const mockFormattedPaths = [
        {
          id: mockPaths[0]._id,
          title: 'JavaScript Basics',
          description: 'Learn JavaScript fundamentals',
          difficulty: 'beginner',
          estimatedTime: 120,
          requirements: ['Basic HTML knowledge'],
          outcomes: ['Understand JS basics'],
          requiredLevel: 1,
          isAvailable: true,
          totalLessons: 10,
          progress: {
            completed: [new Types.ObjectId(), new Types.ObjectId()],
            total: 10,
            percentage: 20,
            isStarted: true,
            isCompleted: false
          }
        },
        {
          id: mockPaths[1]._id,
          title: 'Advanced JavaScript',
          description: 'Learn advanced JavaScript concepts',
          difficulty: 'advanced',
          estimatedTime: 240,
          requirements: ['JavaScript Basics'],
          outcomes: ['Understand advanced JS concepts'],
          requiredLevel: 3,
          isAvailable: false,
          totalLessons: 15,
          progress: {
            completed: [],
            total: 15,
            percentage: 0,
            isStarted: false,
            isCompleted: false
          }
        }
      ];

      const mockUserStats = {
        level: 2,
        totalPoints: 500,
        totalPaths: 2,
        completedPaths: 0,
        pathsInProgress: 1
      };

      mockedLearningPathRepository.findAll.mockResolvedValue(mockPaths);
      mockedUserRepository.findUserWithLearningPathStats.mockResolvedValue(mockUser);
      mockedLearningPathMapper.toLearningPathResponse
        .mockImplementation((path) => {
          if (path._id.equals(mockPaths[0]._id)) {
            return mockFormattedPaths[0];
          } else {
            return mockFormattedPaths[1];
          }
        });
      mockedLearningPathMapper.calculateUserStats.mockReturnValue(mockUserStats);

      const result = await LearningPathService.getLearningPaths(userId, mockQuery);

      expect(mockedLearningPathRepository.findAll).toHaveBeenCalledWith({
        isActive: true,
        difficulty: 'beginner',
        $or: [
          { title: { $regex: 'javascript', $options: 'i' } },
          { description: { $regex: 'javascript', $options: 'i' } },
        ]
      });
      expect(mockedUserRepository.findUserWithLearningPathStats).toHaveBeenCalledWith(userId);
      expect(mockedLearningPathMapper.toLearningPathResponse).toHaveBeenCalledTimes(2);
      expect(mockedLearningPathMapper.calculateUserStats).toHaveBeenCalledWith(
        mockFormattedPaths,
        mockUser.stats.level,
        mockUser.stats.points
      );
      expect(result).toEqual({
        paths: mockFormattedPaths,
        userStats: mockUserStats
      });
    });

    it('should handle empty query parameters', async () => {
      const userId = 'user123';
      const mockQuery = {};

      const mockPaths = [
        {
          _id: new Types.ObjectId(),
          title: 'JavaScript Basics',
          description: 'Learn JavaScript fundamentals',
          difficulty: 'beginner',
          category: 'javascript',
          estimatedTime: 120,
          requirements: ['Basic HTML knowledge'],
          outcomes: ['Understand JS basics'],
          requiredLevel: 1,
          totalLessons: 10,
          isActive: true
        }
      ];

      const mockUser = {
        _id: 'user123',
        stats: {
          level: 2,
          points: 500,
          learningPaths: []
        }
      };

      const mockFormattedPaths = [
        {
          id: mockPaths[0]._id,
          title: 'JavaScript Basics',
          description: 'Learn JavaScript fundamentals',
          difficulty: 'beginner',
          estimatedTime: 120,
          requirements: ['Basic HTML knowledge'],
          outcomes: ['Understand JS basics'],
          requiredLevel: 1,
          isAvailable: true,
          totalLessons: 10,
          progress: {
            completed: [],
            total: 10,
            percentage: 0,
            isStarted: false,
            isCompleted: false
          }
        }
      ];

      const mockUserStats = {
        level: 2,
        totalPoints: 500,
        totalPaths: 1,
        completedPaths: 0,
        pathsInProgress: 1
      };

      mockedLearningPathRepository.findAll.mockResolvedValue(mockPaths);
      mockedUserRepository.findUserWithLearningPathStats.mockResolvedValue(mockUser);
      mockedLearningPathMapper.toLearningPathResponse.mockReturnValue(mockFormattedPaths[0]);
      mockedLearningPathMapper.calculateUserStats.mockReturnValue(mockUserStats);

      const result = await LearningPathService.getLearningPaths(userId, mockQuery);

      expect(mockedLearningPathRepository.findAll).toHaveBeenCalledWith({
        isActive: true
      });
      expect(result).toEqual({
        paths: mockFormattedPaths,
        userStats: mockUserStats
      });
    });

    it('should handle user with no stats', async () => {
      const userId = 'user123';
      const mockQuery = {};

      const mockPaths = [
        {
          _id: new Types.ObjectId(),
          title: 'JavaScript Basics',
          description: 'Learn JavaScript fundamentals',
          difficulty: 'beginner',
          category: 'javascript',
          estimatedTime: 120,
          requirements: ['Basic HTML knowledge'],
          outcomes: ['Understand JS basics'],
          requiredLevel: 1,
          totalLessons: 10,
          isActive: true
        }
      ];

      const mockUser = {
        _id: 'user123'
        };

      const mockFormattedPaths = [
        {
          id: mockPaths[0]._id,
          title: 'JavaScript Basics',
          description: 'Learn JavaScript fundamentals',
          difficulty: 'beginner',
          estimatedTime: 120,
          requirements: ['Basic HTML knowledge'],
          outcomes: ['Understand JS basics'],
          requiredLevel: 1,
          isAvailable: true,
          totalLessons: 10,
          progress: {
            completed: [],
            total: 10,
            percentage: 0,
            isStarted: false,
            isCompleted: false
          }
        }
      ];

      const mockUserStats = {
        level: 1,
        totalPoints: 0,
        totalPaths: 1,
        completedPaths: 0,
        pathsInProgress: 1
      };

      mockedLearningPathRepository.findAll.mockResolvedValue(mockPaths);
      mockedUserRepository.findUserWithLearningPathStats.mockResolvedValue(mockUser);
      mockedLearningPathMapper.toLearningPathResponse.mockReturnValue(mockFormattedPaths[0]);
      mockedLearningPathMapper.calculateUserStats.mockReturnValue(mockUserStats);

      const result = await LearningPathService.getLearningPaths(userId, mockQuery);

      expect(mockedLearningPathMapper.toLearningPathResponse).toHaveBeenCalledWith(
        mockPaths[0],
        1,  // Default level when user has no stats
        []   // Default empty learning paths array
      );
      expect(mockedLearningPathMapper.calculateUserStats).toHaveBeenCalledWith(
        mockFormattedPaths,
        1,  // Default level
        0   // Default points
      );
      expect(result.paths).toEqual(mockFormattedPaths);
      expect(result.userStats).toEqual(mockUserStats);
    });
  });

  describe('getLearningPathById', () => {
    it('should return detailed learning path by id', async () => {
      const pathId = '507f1f77bcf86cd799439011'; // prawidłowy format ObjectId
      const userId = 'user123';

      const mockLearningPath = {
        _id: new Types.ObjectId(pathId),
        title: 'JavaScript Basics',
        description: 'Learn JavaScript fundamentals',
        difficulty: 'beginner',
        category: 'javascript',
        estimatedTime: 120,
        requirements: ['Basic HTML knowledge'],
        outcomes: ['Understand JS basics'],
        requiredLevel: 1,
        totalLessons: 3,
        lessons: [
          {
            _id: new Types.ObjectId(),
            title: 'Lesson 1',
            description: 'Introduction to JS',
            category: 'javascript',
            difficulty: 'beginner',
            duration: 30,
            points: 100,
            slug: 'lesson-1',
            requirements: []
          },
          {
            _id: new Types.ObjectId(),
            title: 'Lesson 2',
            description: 'Variables and Data Types',
            category: 'javascript',
            difficulty: 'beginner',
            duration: 45,
            points: 150,
            slug: 'lesson-2',
            requirements: []
          },
          {
            _id: new Types.ObjectId(),
            title: 'Lesson 3',
            description: 'Functions and Scope',
            category: 'javascript',
            difficulty: 'beginner',
            duration: 45,
            points: 150,
            slug: 'lesson-3',
            requirements: []
          }
        ],
        isActive: true
      };

      const mockUser = {
        _id: 'user123',
        stats: {
          level: 2,
          points: 500,
          learningPaths: [
            {
              pathId: pathId,
              progress: {
                completedLessons: [mockLearningPath.lessons[0]._id]
              }
            }
          ]
        }
      };

      const mockPathProgress = {
        pathId: pathId,
        progress: {
          completedLessons: [mockLearningPath.lessons[0]._id]
        }
      };

      const mockCompletedLessons = [mockLearningPath.lessons[0]._id];

      const mockDetailResponse = {
        id: mockLearningPath._id,
        title: 'JavaScript Basics',
        description: 'Learn JavaScript fundamentals',
        difficulty: 'beginner',
        category: 'javascript',
        estimatedTime: 120,
        requirements: ['Basic HTML knowledge'],
        outcomes: ['Understand JS basics'],
        requiredLevel: 1,
        isAvailable: true,
        totalLessons: 3,
        progress: {
          completed: mockCompletedLessons,
          total: 3,
          percentage: 33
        },
        completedLessons: mockCompletedLessons,
        lessons: [
          {
            id: mockLearningPath.lessons[0]._id,
            title: 'Lesson 1',
            description: 'Introduction to JS',
            category: 'javascript',
            difficulty: 'beginner',
            duration: 30,
            points: 100,
            slug: 'lesson-1',
            isCompleted: true,
            requirements: []
          },
          {
            id: mockLearningPath.lessons[1]._id,
            title: 'Lesson 2',
            description: 'Variables and Data Types',
            category: 'javascript',
            difficulty: 'beginner',
            duration: 45,
            points: 150,
            slug: 'lesson-2',
            isCompleted: false,
            requirements: []
          },
          {
            id: mockLearningPath.lessons[2]._id,
            title: 'Lesson 3',
            description: 'Functions and Scope',
            category: 'javascript',
            difficulty: 'beginner',
            duration: 45,
            points: 150,
            slug: 'lesson-3',
            isCompleted: false,
            requirements: []
          }
        ]
      };

      mockedLearningPathRepository.findById.mockResolvedValue(mockLearningPath);
      mockedUserRepository.findUserWithLearningPathStats.mockResolvedValue(mockUser);
      mockedUserRepository.getUserLearningPathProgress.mockReturnValue({
        pathProgress: mockPathProgress,
        completedLessons: mockCompletedLessons
      });
      mockedLearningPathMapper.toLearningPathDetailResponse.mockReturnValue(mockDetailResponse);

      const result = await LearningPathService.getLearningPathById(pathId, userId);

      expect(mockedLearningPathRepository.findById).toHaveBeenCalledWith(pathId);
      expect(mockedUserRepository.findUserWithLearningPathStats).toHaveBeenCalledWith(userId);
      expect(mockedUserRepository.getUserLearningPathProgress).toHaveBeenCalledWith(
        mockUser,
        mockLearningPath._id
      );
      expect(mockedLearningPathMapper.toLearningPathDetailResponse).toHaveBeenCalledWith(
        mockLearningPath,
        mockUser.stats.level,
        mockPathProgress,
        mockCompletedLessons
      );
      expect(result).toEqual(mockDetailResponse);
    });

    it('should throw error if learning path does not exist', async () => {
      const pathId = 'nonexistentpath';
      const userId = 'user123';

      mockedLearningPathRepository.findById.mockResolvedValue(null);

      await expect(LearningPathService.getLearningPathById(pathId, userId))
        .rejects.toThrow(ValidationError);
      expect(mockedLearningPathRepository.findById).toHaveBeenCalledWith(pathId);
    });

    it('should throw error if user level is too low', async () => {
      const pathId = '507f1f77bcf86cd799439011'; // prawidłowy format ObjectId
      const userId = 'user123';

      const mockLearningPath = {
        _id: new Types.ObjectId(pathId),
        title: 'Advanced JavaScript',
        description: 'Learn advanced JavaScript concepts',
        difficulty: 'advanced',
        category: 'javascript',
        estimatedTime: 240,
        requirements: ['JavaScript Basics'],
        outcomes: ['Understand advanced JS concepts'],
        requiredLevel: 5,  // Higher than user level
        totalLessons: 15,
        lessons: [],
        isActive: true
      };

      const mockUser = {
        _id: 'user123',
        stats: {
          level: 3,  // Lower than required level
          points: 800,
          learningPaths: []
        }
      };

      mockedLearningPathRepository.findById.mockResolvedValue(mockLearningPath);
      mockedUserRepository.findUserWithLearningPathStats.mockResolvedValue(mockUser);

      await expect(LearningPathService.getLearningPathById(pathId, userId))
        .rejects.toThrow(ValidationError);
      expect(mockedLearningPathRepository.findById).toHaveBeenCalledWith(pathId);
      expect(mockedUserRepository.findUserWithLearningPathStats).toHaveBeenCalledWith(userId);
    });
  });
}); 