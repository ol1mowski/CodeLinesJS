import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LessonService } from '../../../src/services/lesson/lesson.service.js';
import { LessonRepository, LessonContentRepository, UserRepository } from '../../../src/services/lesson/lesson.repository.js';
import { LessonMapper } from '../../../src/services/lesson/lesson.mapper.js';
import { LevelService } from '../../../src/services/level.service.js';
import { ValidationError } from '../../../src/utils/errors.js';
import { Types } from 'mongoose';

vi.mock('../../../src/services/lesson/lesson.repository.js', () => ({
  LessonRepository: {
    findAll: vi.fn(),
    findById: vi.fn(),
    findBySlug: vi.fn()
  },
  LessonContentRepository: {
    findBySlug: vi.fn()
  },
  UserRepository: {
    findById: vi.fn(),
    findUserWithStats: vi.fn(),
    getCompletedLessons: vi.fn(),
    isLessonCompleted: vi.fn(),
    addCompletedLesson: vi.fn(),
    saveUser: vi.fn()
  }
}));

vi.mock('../../../src/services/lesson/lesson.mapper.js', () => ({
  LessonMapper: {
    toLessonResponse: vi.fn(),
    groupLessonsByCategory: vi.fn(),
    createUserStats: vi.fn(),
    toLessonDetailResponse: vi.fn(),
    toCompleteLessonResponse: vi.fn()
  }
}));

vi.mock('../../../src/services/level.service.js', () => ({
  LevelService: {
    getUserLevelStats: vi.fn(),
    updateUserLevelAndStreak: vi.fn()
  }
}));

const mockedLessonRepository = vi.mocked(LessonRepository);
const mockedLessonContentRepository = vi.mocked(LessonContentRepository);
const mockedUserRepository = vi.mocked(UserRepository);
const mockedLessonMapper = vi.mocked(LessonMapper);
const mockedLevelService = vi.mocked(LevelService);

describe('LessonService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getLessons', () => {
    it('should return lessons grouped by category with user stats', async () => {
      const userId = 'user123';
      const options = {
        category: 'javascript',
        difficulty: 'beginner',
        search: 'functions'
      };

      const mockLessons = [
        {
          _id: new Types.ObjectId(),
          title: 'JS Functions',
          description: 'Learn JavaScript functions',
          category: 'javascript',
          difficulty: 'beginner',
          duration: 30,
          points: 100,
          slug: 'js-functions',
          requirements: [],
          requiredLevel: 1,
          isPublished: true,
          isAvailable: true,
          order: 1
        },
        {
          _id: new Types.ObjectId(),
          title: 'JS Variables',
          description: 'Learn JavaScript variables',
          category: 'javascript',
          difficulty: 'beginner',
          duration: 20,
          points: 80,
          slug: 'js-variables',
          requirements: [],
          requiredLevel: 1,
          isPublished: true,
          isAvailable: true,
          order: 0
        }
      ];

      const mockUser = {
        stats: {
          level: 2,
          points: 300,
          pointsToNextLevel: 200,
          streak: 3,
          bestStreak: 5,
          learningPaths: [
            {
              progress: {
                completedLessons: [
                  { _id: mockLessons[0]._id, completedAt: new Date() }
                ]
              }
            }
          ]
        }
      };

      const mockCompletedLessons = [
        { _id: mockLessons[0]._id, completedAt: new Date() }
      ];

      const mockFormattedLessons = [
        {
          id: mockLessons[0]._id.toString(),
          title: 'JS Functions',
          description: 'Learn JavaScript functions',
          category: 'javascript',
          difficulty: 'beginner',
          duration: 30,
          points: 100,
          slug: 'js-functions',
          requirements: [],
          requiredLevel: 1,
          isCompleted: true
        },
        {
          id: mockLessons[1]._id.toString(),
          title: 'JS Variables',
          description: 'Learn JavaScript variables',
          category: 'javascript',
          difficulty: 'beginner',
          duration: 20,
          points: 80,
          slug: 'js-variables',
          requirements: [],
          requiredLevel: 1,
          isCompleted: false
        }
      ];

      const mockGroupedLessons = [
        {
          name: 'javascript',
          lessons: mockFormattedLessons
        }
      ];

      const mockLevelStats = {
        level: 2,
        points: 300,
        pointsToNextLevel: 200,
        progress: 60
      };

      const mockUserStats = {
        level: 2,
        points: 300,
        pointsRequired: 200,
        levelProgress: 60,
        streak: 3,
        bestStreak: 5,
        total: 2,
        completed: 1,
        progress: 50
      };

      mockedLessonRepository.findAll.mockResolvedValue(mockLessons as any);
      mockedUserRepository.findUserWithStats.mockResolvedValue(mockUser as any);
      mockedUserRepository.getCompletedLessons.mockReturnValue(mockCompletedLessons);
      mockedUserRepository.isLessonCompleted
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(false);
      mockedLessonMapper.toLessonResponse
        .mockImplementation((lesson, isCompleted) => {
          return {
            id: lesson._id.toString(),
            title: lesson.title,
            description: lesson.description,
            category: lesson.category,
            difficulty: lesson.difficulty,
            duration: lesson.duration,
            points: lesson.points,
            slug: lesson.slug,
            requirements: lesson.requirements,
            requiredLevel: lesson.requiredLevel,
            isCompleted
          };
        });
      mockedLessonMapper.groupLessonsByCategory.mockReturnValue(mockGroupedLessons);
      mockedLevelService.getUserLevelStats.mockReturnValue(mockLevelStats);
      mockedLessonMapper.createUserStats.mockReturnValue(mockUserStats);

      const result = await LessonService.getLessons(userId, options);

      expect(mockedLessonRepository.findAll).toHaveBeenCalledWith({
        isPublished: true,
        isAvailable: true,
        category: 'javascript',
        difficulty: 'beginner',
        $or: [
          { title: { $regex: 'functions', $options: 'i' } },
          { description: { $regex: 'functions', $options: 'i' } }
        ]
      });
      expect(mockedUserRepository.findUserWithStats).toHaveBeenCalledWith(userId);
      expect(mockedUserRepository.getCompletedLessons).toHaveBeenCalledWith(mockUser);
      expect(mockedLessonMapper.toLessonResponse).toHaveBeenCalledTimes(2);
      expect(mockedLessonMapper.groupLessonsByCategory).toHaveBeenCalledWith(mockFormattedLessons);
      expect(mockedLevelService.getUserLevelStats).toHaveBeenCalledWith(mockUser);
      expect(mockedLessonMapper.createUserStats).toHaveBeenCalledWith(
        2,
        1,
        {
          ...mockLevelStats,
          streak: 3,
          bestStreak: 5
        }
      );
      expect(result).toEqual({
        lessons: mockGroupedLessons,
        stats: mockUserStats
      });
    });

    it('should handle empty query parameters', async () => {
      const userId = 'user123';
      const options = {};

      const mockLessons = [
        {
          _id: new Types.ObjectId(),
          title: 'JS Functions',
          description: 'Learn JavaScript functions',
          category: 'javascript',
          difficulty: 'beginner',
          duration: 30,
          points: 100,
          slug: 'js-functions',
          requirements: [],
          requiredLevel: 1,
          isPublished: true,
          isAvailable: true,
          order: 1
        }
      ];

      const mockUser = {
        stats: {
          level: 1,
          points: 50,
          pointsToNextLevel: 150,
          streak: 1,
          bestStreak: 1,
          learningPaths: [
            {
              progress: {
                completedLessons: []
              }
            }
          ]
        }
      };

      mockedLessonRepository.findAll.mockResolvedValue(mockLessons as any);
      mockedUserRepository.findUserWithStats.mockResolvedValue(mockUser as any);
      mockedUserRepository.getCompletedLessons.mockReturnValue([]);
      mockedUserRepository.isLessonCompleted.mockReturnValue(false);
      mockedLessonMapper.toLessonResponse.mockReturnValue({
        id: mockLessons[0]._id.toString(),
        title: mockLessons[0].title,
        slug: mockLessons[0].slug,
        description: mockLessons[0].description,
        category: mockLessons[0].category,
        difficulty: mockLessons[0].difficulty,
        duration: mockLessons[0].duration,
        points: mockLessons[0].points,
        requirements: mockLessons[0].requirements,
        requiredLevel: mockLessons[0].requiredLevel,
        isCompleted: false
      });
      mockedLessonMapper.groupLessonsByCategory.mockReturnValue([
        { 
          name: 'javascript', 
          lessons: [{
            id: mockLessons[0]._id.toString(),
            title: mockLessons[0].title,
            slug: mockLessons[0].slug,
            description: mockLessons[0].description,
            category: mockLessons[0].category,
            difficulty: mockLessons[0].difficulty,
            duration: mockLessons[0].duration,
            points: mockLessons[0].points,
            requirements: mockLessons[0].requirements,
            requiredLevel: mockLessons[0].requiredLevel,
            isCompleted: false
          }] 
        }
      ]);
      mockedLevelService.getUserLevelStats.mockReturnValue({
        level: 1,
        points: 50,
        pointsToNextLevel: 150,
        progress: 25
      });
      mockedLessonMapper.createUserStats.mockReturnValue({
        level: 1,
        points: 50,
        pointsRequired: 150,
        levelProgress: 25,
        streak: 1,
        bestStreak: 1,
        total: 1,
        completed: 0,
        progress: 0
      });

      await LessonService.getLessons(userId, options);

      expect(mockedLessonRepository.findAll).toHaveBeenCalledWith({
        isPublished: true,
        isAvailable: true
      });
    });
  });

  describe('getLessonBySlug', () => {
    it('should return lesson detail when lesson exists and user meets requirements', async () => {
      const slug = 'js-functions';
      const userId = 'user123';

      const mockLesson = {
        _id: new Types.ObjectId(),
        title: 'JS Functions',
        description: 'Learn JavaScript functions',
        category: 'javascript',
        difficulty: 'beginner',
        duration: 30,
        points: 100,
        slug: 'js-functions',
        requirements: [],
        requiredLevel: 1,
        isPublished: true,
        isAvailable: true
      };

      const mockLessonContent = {
        _id: new Types.ObjectId(),
        lessonSlug: 'js-functions',
        xp: 100,
        rewards: [],
        sections: [
          {
            title: 'Introduction',
            content: 'Functions are blocks of code...',
            type: 'text'
          }
        ],
        quiz: {
          questions: []
        }
      };

      const mockUser = {
        stats: {
          level: 2,
          points: 300,
          pointsToNextLevel: 200,
          streak: 3,
          bestStreak: 5,
          learningPaths: [
            {
              progress: {
                completedLessons: []
              }
            }
          ]
        }
      };

      const mockLevelStats = {
        level: 2,
        points: 300,
        pointsToNextLevel: 200,
        progress: 60
      };

      const mockDetailResponse = {
        id: mockLesson._id.toString(),
        title: 'JS Functions',
        slug: 'js-functions',
        description: 'Learn JavaScript functions',
        category: 'javascript',
        difficulty: 'beginner',
        duration: 30,
        points: 100,
        requiredLevel: 1,
        isCompleted: false,
        content: {
          xp: 100,
          rewards: [],
          sections: mockLessonContent.sections,
          quiz: mockLessonContent.quiz
        },
        userStats: {
          level: 2,
          points: 300,
          pointsRequired: 200,
          levelProgress: 60,
          streak: 3,
          bestStreak: 5
        }
      };

      mockedLessonRepository.findBySlug.mockResolvedValue(mockLesson as any);
      mockedLessonContentRepository.findBySlug.mockResolvedValue(mockLessonContent as any);
      mockedUserRepository.findUserWithStats.mockResolvedValue(mockUser as any);
      mockedUserRepository.getCompletedLessons.mockReturnValue([]);
      mockedUserRepository.isLessonCompleted.mockReturnValue(false);
      mockedLevelService.getUserLevelStats.mockReturnValue(mockLevelStats);
      mockedLessonMapper.toLessonDetailResponse.mockReturnValue(mockDetailResponse);

      const result = await LessonService.getLessonBySlug(slug, userId);

      expect(mockedLessonRepository.findBySlug).toHaveBeenCalledWith(slug);
      expect(mockedLessonContentRepository.findBySlug).toHaveBeenCalledWith(slug);
      expect(mockedUserRepository.findUserWithStats).toHaveBeenCalledWith(userId);
      expect(mockedUserRepository.getCompletedLessons).toHaveBeenCalledWith(mockUser);
      expect(mockedUserRepository.isLessonCompleted).toHaveBeenCalledWith([], mockLesson._id.toString());
      expect(mockedLevelService.getUserLevelStats).toHaveBeenCalledWith(mockUser);
      expect(mockedLessonMapper.toLessonDetailResponse).toHaveBeenCalledWith(
        mockLesson,
        mockLessonContent,
        false,
        {
          ...mockLevelStats,
          streak: 3,
          bestStreak: 5
        }
      );
      expect(result).toEqual(mockDetailResponse);
    });

    it('should throw error when lesson is not found', async () => {
      const slug = 'non-existent-lesson';
      const userId = 'user123';

      mockedLessonRepository.findBySlug.mockResolvedValue(null);
      mockedLessonContentRepository.findBySlug.mockResolvedValue({} as any);
      mockedUserRepository.findUserWithStats.mockResolvedValue({} as any);

      await expect(LessonService.getLessonBySlug(slug, userId))
        .rejects.toThrow(ValidationError);
      expect(mockedLessonRepository.findBySlug).toHaveBeenCalledWith(slug);
    });

    it('should throw error when lesson content is not found', async () => {
      const slug = 'js-functions';
      const userId = 'user123';

      const mockLesson = {
        _id: new Types.ObjectId(),
        title: 'JS Functions',
        slug: 'js-functions',
      };

      mockedLessonRepository.findBySlug.mockResolvedValue(mockLesson as any);
      mockedLessonContentRepository.findBySlug.mockResolvedValue(null);
      mockedUserRepository.findUserWithStats.mockResolvedValue({} as any);

      await expect(LessonService.getLessonBySlug(slug, userId))
        .rejects.toThrow(ValidationError);
      expect(mockedLessonRepository.findBySlug).toHaveBeenCalledWith(slug);
      expect(mockedLessonContentRepository.findBySlug).toHaveBeenCalledWith(slug);
    });

    it('should throw error when user level is too low', async () => {
      const slug = 'advanced-js';
      const userId = 'user123';

      const mockLesson = {
        _id: new Types.ObjectId(),
        title: 'Advanced JS',
        description: 'Advanced JavaScript concepts',
        requiredLevel: 5, // Higher than user level
      };

      const mockLessonContent = {
        _id: new Types.ObjectId(),
        lessonSlug: 'advanced-js',
      };

      const mockUser = {
        stats: {
          level: 2, // Lower than required level
        }
      };

      mockedLessonRepository.findBySlug.mockResolvedValue(mockLesson as any);
      mockedLessonContentRepository.findBySlug.mockResolvedValue(mockLessonContent as any);
      mockedUserRepository.findUserWithStats.mockResolvedValue(mockUser as any);

      await expect(LessonService.getLessonBySlug(slug, userId))
        .rejects.toThrow(ValidationError);
      expect(mockedLessonRepository.findBySlug).toHaveBeenCalledWith(slug);
      expect(mockedLessonContentRepository.findBySlug).toHaveBeenCalledWith(slug);
      expect(mockedUserRepository.findUserWithStats).toHaveBeenCalledWith(userId);
    });
  });

  describe('completeLesson', () => {
    it('should mark lesson as completed and update user stats', async () => {
      const lessonId = '507f1f77bcf86cd799439011';
      const userId = 'user123';

      const mockLesson = {
        _id: new Types.ObjectId(lessonId),
        title: 'JS Functions',
        points: 100,
        duration: 30,
      };

      const mockUser = {
        _id: new Types.ObjectId(),
        stats: {
          level: 2,
          points: 300,
          xp: 500,
          learningPaths: [
            {
              progress: {
                completedLessons: []
              }
            }
          ]
        },
        save: vi.fn().mockResolvedValue(true)
      };

      const mockLevelStats = {
        level: 2,
        points: 400, // After completing the lesson
        pointsToNextLevel: 100,
        progress: 80
      };

      const mockLevelUpdate = {
        level: {
          leveledUp: false,
          levelsGained: 0,
          level: 2
        },
        streak: {
          streakUpdated: true
        },
        dailyProgress: {}
      };

      const mockCompletionResponse = {
        message: 'Lekcja ukończona',
        stats: {
          points: 400,
          pointsRequired: 100,
          xp: 500,
          level: 2,
          levelProgress: 80,
          completedLessons: 1,
          leveledUp: false,
          streak: 1,
          bestStreak: 1
        }
      };

      mockedUserRepository.addCompletedLesson.mockImplementation((user, lessonId) => {
        user.stats.learningPaths[0].progress.completedLessons.push({
          _id: mockLesson._id,
          completedAt: new Date()
        });
      });

      mockedLessonRepository.findById.mockResolvedValue(mockLesson as any);
      mockedUserRepository.findById.mockResolvedValue(mockUser as any);
      mockedUserRepository.getCompletedLessons.mockReturnValue([]);
      mockedUserRepository.isLessonCompleted.mockReturnValue(false);
      mockedLevelService.updateUserLevelAndStreak.mockResolvedValue(mockLevelUpdate as any);
      mockedLevelService.getUserLevelStats.mockReturnValue(mockLevelStats);
      mockedLessonMapper.toCompleteLessonResponse.mockReturnValue(mockCompletionResponse);

      const result = await LessonService.completeLesson(lessonId, userId);

      expect(mockedLessonRepository.findById).toHaveBeenCalledWith(lessonId);
      expect(mockedUserRepository.findById).toHaveBeenCalledWith(userId);
      expect(mockedUserRepository.getCompletedLessons).toHaveBeenCalledWith(mockUser);
      expect(mockedUserRepository.isLessonCompleted).toHaveBeenCalledWith([], lessonId);
      expect(mockedUserRepository.addCompletedLesson).toHaveBeenCalledWith(mockUser, lessonId);
      expect(mockedLevelService.updateUserLevelAndStreak).toHaveBeenCalledWith(
        userId,
        100,
        {
          points: 100,
          challenges: 1,
          timeSpent: 30
        }
      );
      expect(mockedUserRepository.saveUser).toHaveBeenCalledWith(mockUser);
      expect(mockedLevelService.getUserLevelStats).toHaveBeenCalledWith(mockUser);
      
      // Symulacja, że po dodaniu lekcji, completedLessons będzie miało długość 1
      expect(mockUser.stats.learningPaths[0].progress.completedLessons).toHaveLength(1);
      
      expect(mockedLessonMapper.toCompleteLessonResponse).toHaveBeenCalledWith(
        false,
        mockLevelUpdate,
        {
          ...mockLevelStats,
          xp: 500
        },
        1  // Oczekujemy 1, bo po dodaniu lekcji jest jedna ukończona lekcja
      );
      expect(result).toEqual(mockCompletionResponse);
    });

    it('should return appropriate response when lesson is already completed', async () => {
      const lessonId = '507f1f77bcf86cd799439011';
      const userId = 'user123';

      const mockLesson = {
        _id: new Types.ObjectId(lessonId),
        title: 'JS Functions',
      };

      const mockCompletedLessons = [
        { _id: new Types.ObjectId(lessonId), completedAt: new Date() }
      ];

      const mockUser = {
        _id: new Types.ObjectId(),
        stats: {
          level: 2,
          points: 300,
          xp: 500,
          learningPaths: [
            {
              progress: {
                completedLessons: mockCompletedLessons
              }
            }
          ]
        }
      };

      const mockLevelStats = {
        level: 2,
        points: 300,
        pointsToNextLevel: 200,
        progress: 60
      };

      const mockCompletionResponse = {
        message: 'Lekcja została już wcześniej ukończona',
        stats: {
          points: 300,
          pointsRequired: 200,
          xp: 500,
          level: 2,
          levelProgress: 60,
          completedLessons: 1,
          streak: 1,
          bestStreak: 1
        }
      };

      // Mock repository and service functions
      mockedLessonRepository.findById.mockResolvedValue(mockLesson as any);
      mockedUserRepository.findById.mockResolvedValue(mockUser as any);
      mockedUserRepository.getCompletedLessons.mockReturnValue(mockCompletedLessons);
      mockedUserRepository.isLessonCompleted.mockReturnValue(true);
      mockedLevelService.getUserLevelStats.mockReturnValue(mockLevelStats);
      mockedLessonMapper.toCompleteLessonResponse.mockReturnValue(mockCompletionResponse);

      const result = await LessonService.completeLesson(lessonId, userId);

      // Assert
      expect(mockedLessonRepository.findById).toHaveBeenCalledWith(lessonId);
      expect(mockedUserRepository.findById).toHaveBeenCalledWith(userId);
      expect(mockedUserRepository.getCompletedLessons).toHaveBeenCalledWith(mockUser);
      expect(mockedUserRepository.isLessonCompleted).toHaveBeenCalledWith(mockCompletedLessons, lessonId);
      expect(mockedUserRepository.addCompletedLesson).not.toHaveBeenCalled();
      expect(mockedLevelService.updateUserLevelAndStreak).not.toHaveBeenCalled();
      expect(mockedUserRepository.saveUser).not.toHaveBeenCalled();
      expect(mockedLevelService.getUserLevelStats).toHaveBeenCalledWith(mockUser);
      expect(mockedLessonMapper.toCompleteLessonResponse).toHaveBeenCalledWith(
        true,
        null,
        {
          ...mockLevelStats,
          xp: 500
        },
        1
      );
      expect(result).toEqual(mockCompletionResponse);
    });

    it('should throw error when lesson is not found', async () => {
      const lessonId = 'nonexistentid';
      const userId = 'user123';

      mockedLessonRepository.findById.mockResolvedValue(null);
      mockedUserRepository.findById.mockResolvedValue({} as any);

      await expect(LessonService.completeLesson(lessonId, userId))
        .rejects.toThrow(ValidationError);
      expect(mockedLessonRepository.findById).toHaveBeenCalledWith(lessonId);
    });

    it('should throw error when user has no learning paths', async () => {
      const lessonId = '507f1f77bcf86cd799439011';
      const userId = 'user123';

      const mockLesson = {
        _id: new Types.ObjectId(lessonId),
        title: 'JS Functions',
      };

      const mockUser = {
        _id: new Types.ObjectId(),
        stats: {
        }
      };

      mockedLessonRepository.findById.mockResolvedValue(mockLesson as any);
      mockedUserRepository.findById.mockResolvedValue(mockUser as any);

      await expect(LessonService.completeLesson(lessonId, userId))
        .rejects.toThrow(ValidationError);
      expect(mockedLessonRepository.findById).toHaveBeenCalledWith(lessonId);
      expect(mockedUserRepository.findById).toHaveBeenCalledWith(userId);
    });
  });
}); 