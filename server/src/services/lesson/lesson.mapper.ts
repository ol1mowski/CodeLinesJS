import { 
  LessonResponse, 
  LessonDetailResponse,
  UserStats,
  GroupedLessons,
  CompleteLessonResponse,
  LessonCategory
} from './types.js';

export class LessonMapper {
  static toLessonResponse(lesson: any, isCompleted: boolean): LessonResponse {
    return {
      id: lesson._id,
      title: lesson.title,
      description: lesson.description,
      category: lesson.category,
      difficulty: lesson.difficulty,
      duration: lesson.duration,
      points: lesson.points,
      slug: lesson.slug,
      requirements: lesson.requirements || [],
      requiredLevel: lesson.requiredLevel,
      isCompleted
    };
  }

  static toLessonDetailResponse(
    lesson: any, 
    lessonContent: any, 
    isCompleted: boolean,
    userStats: any
  ): LessonDetailResponse {
    return {
      id: lesson._id,
      slug: lesson.slug,
      title: lesson.title,
      description: lesson.description,
      category: lesson.category,
      difficulty: lesson.difficulty,
      duration: lesson.duration,
      points: lesson.points,
      requiredLevel: lesson.requiredLevel,
      isCompleted,
      content: {
        xp: lessonContent.xp,
        rewards: lessonContent.rewards,
        sections: lessonContent.sections,
        quiz: lessonContent.quiz
      },
      userStats: {
        level: userStats.level,
        points: userStats.points,
        pointsRequired: userStats.pointsToNextLevel,
        levelProgress: userStats.progress,
        streak: userStats.streak,
        bestStreak: userStats.bestStreak
      }
    };
  }

  static groupLessonsByCategory(lessons: LessonResponse[]): LessonCategory[] {
    const grouped = lessons.reduce((acc, lesson) => {
      if (!acc[lesson.category]) {
        acc[lesson.category] = [];
      }
      acc[lesson.category].push(lesson);
      return acc;
    }, {} as GroupedLessons);
    
    return Object.keys(grouped).map(category => ({
      name: category,
      lessons: grouped[category]
    }));
  }

  static createUserStats(
    totalLessons: number, 
    completedLessons: number, 
    levelStats: any
  ): UserStats {
    return {
      total: totalLessons,
      completed: completedLessons,
      progress: totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0,
      level: levelStats.level,
      points: levelStats.points,
      pointsRequired: levelStats.pointsToNextLevel,
      levelProgress: levelStats.progress,
      streak: levelStats.streak,
      bestStreak: levelStats.bestStreak
    };
  }

  static toCompleteLessonResponse(
    isAlreadyCompleted: boolean,
    update: any,
    userStats: any,
    completedLessonsCount: number
  ): CompleteLessonResponse {
    if (isAlreadyCompleted) {
      return {
        message: 'Lekcja została już wcześniej ukończona',
        stats: {
          points: userStats.points,
          pointsRequired: userStats.pointsToNextLevel,
          xp: userStats.xp,
          level: userStats.level,
          levelProgress: userStats.progress,
          completedLessons: completedLessonsCount,
          streak: userStats.streak,
          bestStreak: userStats.bestStreak
        }
      };
    }

    return {
      message: update.level.leveledUp 
        ? `Lekcja ukończona! Awansowałeś na poziom ${update.level.level}!` 
        : 'Lekcja ukończona',
      stats: {
        points: userStats.points,
        pointsRequired: userStats.pointsToNextLevel,
        xp: userStats.xp,
        level: userStats.level,
        levelProgress: userStats.progress,
        completedLessons: completedLessonsCount,
        leveledUp: update.level.leveledUp,
        levelsGained: update.level.levelsGained,
        streak: update.streak.streak,
        bestStreak: update.streak.bestStreak,
        streakUpdated: update.streak.streakUpdated
      }
    };
  }
} 