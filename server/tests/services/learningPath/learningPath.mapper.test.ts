import { describe, it, expect } from 'vitest';
import { LearningPathMapper } from '../../../src/services/learningPath/learningPath.mapper.js';
import { Types } from 'mongoose';

describe('LearningPathMapper', () => {
  describe('toLearningPathResponse', () => {
    it('should transform path to LearningPathResponse format', () => {
      const path = {
        _id: new Types.ObjectId('507f1f77bcf86cd799439011'),
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
      };
      
      const userLevel = 2;
      const userLearningPaths: any[] = [];

      const result = LearningPathMapper.toLearningPathResponse(path, userLevel, userLearningPaths);

      expect(result).toEqual({
        id: path._id,
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
      });
    });

    it('should include user progress information when user has progress for the path', () => {
      const pathId = new Types.ObjectId('507f1f77bcf86cd799439011');
      const completedLessons = [
        new Types.ObjectId('507f1f77bcf86cd799439021'),
        new Types.ObjectId('507f1f77bcf86cd799439022')
      ];
      
      const path = {
        _id: pathId,
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
      };
      
      const userLevel = 2;
      const userLearningPaths = [
        {
          pathId,
          progress: {
            completedLessons
          }
        }
      ];

      const result = LearningPathMapper.toLearningPathResponse(path, userLevel, userLearningPaths);

      expect(result.progress).toEqual({
        completed: completedLessons,
        total: 10,
        percentage: 20, // 2 out of 10 = 20%
        isStarted: true,
        isCompleted: false
      });
    });

    it('should mark path as completed when all lessons are done', () => {
      const pathId = new Types.ObjectId('507f1f77bcf86cd799439011');
      const completedLessons = [
        new Types.ObjectId('507f1f77bcf86cd799439021'),
        new Types.ObjectId('507f1f77bcf86cd799439022'),
        new Types.ObjectId('507f1f77bcf86cd799439023')
      ];
      
      const path = {
        _id: pathId,
        title: 'JavaScript Basics',
        description: 'Learn JavaScript fundamentals',
        difficulty: 'beginner',
        category: 'javascript',
        estimatedTime: 120,
        requirements: ['Basic HTML knowledge'],
        outcomes: ['Understand JS basics'],
        requiredLevel: 1,
        totalLessons: 3,
        isActive: true
      };
      
      const userLevel = 2;
      const userLearningPaths = [
        {
          pathId,
          progress: {
            completedLessons
          }
        }
      ];

      const result = LearningPathMapper.toLearningPathResponse(path, userLevel, userLearningPaths);

      expect(result.progress).toEqual({
        completed: completedLessons,
        total: 3,
        percentage: 100, // 3 out of 3 = 100%
        isStarted: true,
        isCompleted: true
      });
    });

    it('should mark path as unavailable when user level is lower than required', () => {
      const path = {
        _id: new Types.ObjectId('507f1f77bcf86cd799439011'),
        title: 'Advanced JavaScript',
        description: 'Advanced JavaScript concepts',
        difficulty: 'advanced',
        category: 'javascript',
        estimatedTime: 240,
        requirements: ['JavaScript Basics'],
        outcomes: ['Master JS concepts'],
        requiredLevel: 5,
        totalLessons: 15,
        isActive: true
      };
      
      const userLevel = 3; // Lower than required
      const userLearningPaths: any[] = [];

      const result = LearningPathMapper.toLearningPathResponse(path, userLevel, userLearningPaths);

      expect(result.isAvailable).toBe(false);
    });
  });

  describe('toLearningPathDetailResponse', () => {
    it('should transform detailed path information including lessons', () => {
      const learningPath = {
        _id: new Types.ObjectId('507f1f77bcf86cd799439011'),
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
            _id: new Types.ObjectId('507f1f77bcf86cd799439021'),
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
            _id: new Types.ObjectId('507f1f77bcf86cd799439022'),
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
            _id: new Types.ObjectId('507f1f77bcf86cd799439023'),
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
      
      const userLevel = 2;
      const userPathProgress = null;
      const completedLessons: Types.ObjectId[] = [];

      const result = LearningPathMapper.toLearningPathDetailResponse(
        learningPath, 
        userLevel, 
        userPathProgress, 
        completedLessons
      );

      expect(result).toEqual({
        id: learningPath._id,
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
          completed: [],
          total: 3,
          percentage: 0
        },
        completedLessons: [],
        lessons: [
          {
            id: learningPath.lessons[0]._id,
            title: 'Lesson 1',
            description: 'Introduction to JS',
            category: 'javascript',
            difficulty: 'beginner',
            duration: 30,
            points: 100,
            slug: 'lesson-1',
            isCompleted: false,
            requirements: []
          },
          {
            id: learningPath.lessons[1]._id,
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
            id: learningPath.lessons[2]._id,
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
      });
    });

    it('should mark lessons as completed based on user progress', () => {
      const learningPath = {
        _id: new Types.ObjectId('507f1f77bcf86cd799439011'),
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
            _id: new Types.ObjectId('507f1f77bcf86cd799439021'),
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
            _id: new Types.ObjectId('507f1f77bcf86cd799439022'),
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
            _id: new Types.ObjectId('507f1f77bcf86cd799439023'),
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
      
      const userLevel = 2;
      const userPathProgress = {
        pathId: learningPath._id,
        progress: {
          completedLessons: [learningPath.lessons[0]._id, learningPath.lessons[1]._id]
        }
      };
      const completedLessons = [learningPath.lessons[0]._id, learningPath.lessons[1]._id];

      const result = LearningPathMapper.toLearningPathDetailResponse(
        learningPath, 
        userLevel, 
        userPathProgress, 
        completedLessons
      );

      expect(result.progress.percentage).toBe(67); // 2 out of 3 = ~67%
      expect(result.lessons[0].isCompleted).toBe(true);
      expect(result.lessons[1].isCompleted).toBe(true);
      expect(result.lessons[2].isCompleted).toBe(false);
    });
  });

  describe('calculateUserStats', () => {
    it('should calculate user stats based on learning paths', () => {
      const paths = [
        {
          id: new Types.ObjectId('507f1f77bcf86cd799439011'),
          title: 'Path 1',
          description: 'Description 1',
          difficulty: 'beginner',
          estimatedTime: 120,
          requirements: [],
          outcomes: [],
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
          id: new Types.ObjectId('507f1f77bcf86cd799439012'),
          title: 'Path 2',
          description: 'Description 2',
          difficulty: 'intermediate',
          estimatedTime: 180,
          requirements: [],
          outcomes: [],
          requiredLevel: 2,
          isAvailable: true,
          totalLessons: 5,
          progress: {
            completed: [new Types.ObjectId(), new Types.ObjectId(), new Types.ObjectId(), new Types.ObjectId(), new Types.ObjectId()],
            total: 5,
            percentage: 100,
            isStarted: true,
            isCompleted: true
          }
        },
        {
          id: new Types.ObjectId('507f1f77bcf86cd799439013'),
          title: 'Path 3',
          description: 'Description 3',
          difficulty: 'advanced',
          estimatedTime: 240,
          requirements: [],
          outcomes: [],
          requiredLevel: 5,
          isAvailable: false,
          totalLessons: 8,
          progress: {
            completed: [],
            total: 8,
            percentage: 0,
            isStarted: false,
            isCompleted: false
          }
        }
      ];
      
      const userLevel = 3;
      const userPoints = 750;

      const result = LearningPathMapper.calculateUserStats(paths, userLevel, userPoints);

      expect(result).toEqual({
        level: 3,
        totalPoints: 750,
        totalPaths: 3,
        completedPaths: 1,
        pathsInProgress: 1
      });
    });
  });
}); 