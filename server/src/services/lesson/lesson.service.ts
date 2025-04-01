import { ValidationError } from '../../utils/errors.js';
import { LessonRepository, LessonContentRepository, UserRepository } from './lesson.repository.js';
import { LessonMapper } from './lesson.mapper.js';
import { LevelService } from '../level.service.js';
import { LessonsResponse, LessonDetailResponse, CompleteLessonResponse, IUser } from './types.js';

export class LessonService {
  static async getLessons(
    userId: string, 
    options: { 
      category?: string; 
      difficulty?: string; 
      search?: string; 
    }
  ): Promise<LessonsResponse> {
    const { category, difficulty, search } = options;
    
    const query: any = {
      isPublished: true,
      isAvailable: true,
    };

    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const [lessons, user] = await Promise.all([
      LessonRepository.findAll(query),
      UserRepository.findUserWithStats(userId)
    ]);

    const completedLessons = UserRepository.getCompletedLessons(user);
    
    const formattedLessons = lessons.map(lesson => {
      const isCompleted = UserRepository.isLessonCompleted(
        completedLessons, 
        lesson._id.toString()
      );
      
      return LessonMapper.toLessonResponse(lesson, isCompleted);
    });

    const groupedLessons = LessonMapper.groupLessonsByCategory(formattedLessons);
    
    const levelStats = LevelService.getUserLevelStats(user as unknown as IUser);
    
    const userStats = LessonMapper.createUserStats(
      lessons.length,
      completedLessons.length,
      {
        ...levelStats,
        streak: user.stats?.streak || 0,
        bestStreak: user.stats?.bestStreak || 0
      }
    );

    return {
      lessons: groupedLessons,
      stats: userStats
    };
  }

  static async getLessonBySlug(slug: string, userId: string): Promise<LessonDetailResponse> {
    const [lesson, lessonContent, user] = await Promise.all([
      LessonRepository.findBySlug(slug),
      LessonContentRepository.findBySlug(slug),
      UserRepository.findUserWithStats(userId)
    ]);

    if (!lesson) {
      throw new ValidationError('Lekcja nie została znaleziona');
    }

    if (!lessonContent) {
      throw new ValidationError('Treść lekcji nie została znaleziona');
    }

    const userLevel = user.stats?.level || 1;

    if (userLevel < lesson.requiredLevel) {
      throw new ValidationError(
        `Wymagany poziom ${lesson.requiredLevel} do odblokowania tej lekcji`
      );
    }

    const completedLessons = UserRepository.getCompletedLessons(user);

    if (lesson.requirements?.length > 0) {
      const hasCompletedRequirements = lesson.requirements.every(req =>
        completedLessons.some(completedLesson => 
          completedLesson._id.toString() === req._id.toString()
        )
      );

      if (!hasCompletedRequirements) {
        throw new ValidationError(
          'Musisz ukończyć wymagane lekcje przed rozpoczęciem tej'
        );
      }
    }
    
    const levelStats = LevelService.getUserLevelStats(user as unknown as IUser);
    
    const isCompleted = UserRepository.isLessonCompleted(
      completedLessons,
      lesson._id.toString()
    );
    
    return LessonMapper.toLessonDetailResponse(
      lesson,
      lessonContent,
      isCompleted,
      {
        ...levelStats,
        streak: user.stats?.streak || 0,
        bestStreak: user.stats?.bestStreak || 0
      }
    );
  }

  static async completeLesson(lessonId: string, userId: string): Promise<CompleteLessonResponse> {
    const [lesson, user] = await Promise.all([
      LessonRepository.findById(lessonId),
      UserRepository.findById(userId)
    ]);

    if (!lesson) {
      throw new ValidationError('Lekcja nie została znaleziona');
    }

    if (!user.stats.learningPaths || user.stats.learningPaths.length === 0) {
      throw new ValidationError('Użytkownik nie ma przypisanych ścieżek nauki');
    }

    const completedLessons = UserRepository.getCompletedLessons(user);
    
    const isCompleted = UserRepository.isLessonCompleted(
      completedLessons,
      lessonId
    );

    if (!isCompleted) {
      // Dodaj lekcję do ukończonych
      UserRepository.addCompletedLesson(user, lessonId);

      // Przyznaj punkty i zaktualizuj poziom
      const earnedPoints = lesson.points || 0;
      const timeSpent = lesson.duration || 0;
      
      const update = await LevelService.updateUserLevelAndStreak(userId, earnedPoints, {
        points: earnedPoints,
        challenges: 1,
        timeSpent: timeSpent
      });

      await UserRepository.saveUser(user);
      
      const levelStats = LevelService.getUserLevelStats(user as unknown as IUser);
      
      return LessonMapper.toCompleteLessonResponse(
        false,
        update,
        {
          ...levelStats,
          xp: user.stats.xp
        },
        user.stats.learningPaths[0].progress.completedLessons.length
      );
    }

    const levelStats = LevelService.getUserLevelStats(user as unknown as IUser);
    
    return LessonMapper.toCompleteLessonResponse(
      true,
      null,
      {
        ...levelStats,
        xp: user.stats.xp
      },
      completedLessons.length
    );
  }
} 