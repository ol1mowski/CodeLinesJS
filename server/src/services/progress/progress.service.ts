import { User } from '../../models/user.model.js';
import { Lesson } from '../../models/lesson.model.js';
import { LearningPath } from '../../models/learningPath.model.js';
import { ValidationError } from '../../utils/errors.js';
import { LevelService } from './level.service.js';
import { StreakService } from './streak.service.js';
import { 
  IUser, 
  ILesson, 
  ILearningPath, 
  IProgressUpdate, 
  IUserProgressResponse,
  ILeaderboardResponse,
  ILeaderboardUserEntry,
  ILearningPathProgress,
  LeaderboardQueryDTO
} from '../../types/progress/index.js';

export class ProgressService {
  public static async getUserProgress(userId: string): Promise<IUserProgressResponse> {
    const user = await User.findById(userId)
      .select("stats.level stats.points stats.pointsToNextLevel stats.streak stats.bestStreak stats.learningPaths stats.completedChallenges stats.timeSpent")
      .populate({
        path: "stats.learningPaths.pathId",
        select: "title difficulty totalLessons"
      })
      .lean();
      
    if (!user) {
      throw new ValidationError("Użytkownik nie znaleziony");
    }
    
    const levelStats = LevelService.getUserLevelStats(user as unknown as IUser);
    
    const learningPaths = user.stats.learningPaths.map(path => {
      const completedLessons = path.progress?.completedLessons?.length || 0;
      const pathData = path.pathId as unknown as { _id: any; title: string; difficulty: string; totalLessons: number };
      const totalLessons = pathData?.totalLessons || 0;
      
      return {
        id: pathData?._id,
        title: pathData?.title,
        difficulty: pathData?.difficulty,
        progress: {
          completed: completedLessons,
          total: totalLessons,
          percentage: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
        }
      } as ILearningPathProgress;
    });
    
    return {
      level: levelStats.level,
      points: levelStats.points,
      pointsToNextLevel: levelStats.pointsToNextLevel,
      levelProgress: levelStats.progress,
      streak: user.stats?.streak || 0,
      bestStreak: user.stats?.bestStreak || 0,
      completedChallenges: user.stats?.completedChallenges || 0,
      timeSpent: (user.stats as any)?.timeSpent || 0,
      learningPaths
    };
  }
  
  public static async updateLessonProgress(userId: string, lessonId: string): Promise<Record<string, any>> {
    const lesson = await Lesson.findOne({ slug: lessonId }) as ILesson;
    if (!lesson) {
      throw new ValidationError("Lekcja nie znaleziona");
    }

    const [user, learningPath] = await Promise.all([
      User.findById(userId) as Promise<IUser>,
      LearningPath.findOne({ lessons: { $in: [lesson._id] } }) as Promise<ILearningPath>,
    ]);

    if (!user || !learningPath) {
      throw new ValidationError("Nie znaleziono użytkownika lub ścieżki nauki");
    }

    if (!user.stats.learningPaths) {
      user.stats.learningPaths = [];
    }

    let userPathIndex = user.stats.learningPaths.findIndex(
      path => path.pathId.toString() === learningPath._id.toString()
    );

    if (userPathIndex === -1) {
      user.stats.learningPaths.push({
        pathId: learningPath._id,
        status: "active",
        progress: {
          completedLessons: [{
            lessonId: lesson._id,
            completedAt: new Date()
          }],
          totalLessons: learningPath.totalLessons,
          lastLesson: lesson._id,
          lastActivity: new Date(),
          startedAt: new Date()
        }
      });
      userPathIndex = user.stats.learningPaths.length - 1;
    } else {
      const userPath = user.stats.learningPaths[userPathIndex];
      const isCompleted = userPath.progress.completedLessons.some(
        completedLesson => completedLesson.lessonId.toString() === lesson._id.toString()
      );

      if (isCompleted) {
        throw new ValidationError("Lekcja została już ukończona");
      }

      userPath.progress.completedLessons.push({
        lessonId: lesson._id,
        completedAt: new Date()
      });
      userPath.progress.lastLesson = lesson._id;
      userPath.progress.lastActivity = new Date();

      if (userPath.progress.completedLessons.length === learningPath.totalLessons) {
        userPath.status = "completed";
        userPath.progress.completedAt = new Date();
      }
    }

    user.markModified('stats.learningPaths');

    const earnedPoints = lesson.points || 0;
    const timeSpent = lesson.duration || 0;

    await this.updateUserStats(user, earnedPoints, {
      points: earnedPoints,
      challenges: 1,
      timeSpent: timeSpent
    });

    await user.save();

    const updatedUser = await User.findById(userId) as IUser;
    const levelStats = LevelService.getUserLevelStats(updatedUser);
    const updatedPath = updatedUser.stats.learningPaths[userPathIndex];

    return {
      message: "Postęp zaktualizowany pomyślnie",
      stats: {
        points: levelStats.points,
        pointsRequired: levelStats.pointsToNextLevel,
        xp: updatedUser.stats.xp,
        level: levelStats.level,
        levelProgress: levelStats.progress,
        streak: updatedUser.stats.streak,
        bestStreak: updatedUser.stats.bestStreak,
        lastActive: updatedUser.stats.lastActive,
        pathProgress: {
          completedLessons: updatedPath.progress.completedLessons.length,
          totalLessons: learningPath.totalLessons,
          percentage: Math.round(
            (updatedPath.progress.completedLessons.length / learningPath.totalLessons) * 100
          ),
          status: updatedPath.status
        }
      }
    };
  }
    
  public static async updateUserStats(
    user: IUser,
    earnedPoints: number,
    statsUpdate: { points: number; challenges?: number; timeSpent?: number; }
  ): Promise<IProgressUpdate> {
    if (typeof earnedPoints !== 'number' || earnedPoints < 0) {
      throw new ValidationError("Nieprawidłowa wartość punktów");
    }
    
    const levelStats = LevelService.updateLevel(user, earnedPoints);
    
    const streakStats = StreakService.updateStreak(user);
    
    user.stats.completedChallenges = (user.stats.completedChallenges || 0) + (statsUpdate.challenges || 0);
    user.stats.timeSpent = (user.stats.timeSpent || 0) + (statsUpdate.timeSpent || 0);
    user.stats.lastActive = new Date();
    
    return {
      level: levelStats,
      streak: streakStats
    };
  }
  
  public static async getLeaderboard(
    userId: string, 
    query: LeaderboardQueryDTO
  ): Promise<ILeaderboardResponse> {
    const { limit = '10', type = 'points' } = query;
    
    let sortField: string;
    
    switch (type) {
      case 'streak':
        sortField = 'stats.streak';
        break;
      case 'challenges':
        sortField = 'stats.completedChallenges';
        break;
      case 'time':
        sortField = 'stats.timeSpent';
        break;
      case 'points':
      default:
        sortField = 'stats.points';
    }
    
    const leaderboard = await User.find({})
      .select(`username avatar stats.level ${sortField}`)
      .sort({ [sortField]: -1 })
      .limit(parseInt(limit, 10))
      .lean();
      
    const currentUser = await User.findById(userId)
      .select(`username avatar stats.level ${sortField}`)
      .lean();
      
    if (!currentUser) {
      throw new ValidationError("Użytkownik nie znaleziony");
    }
    
    const field = sortField.split('.')[1];
    const userRank = await User.countDocuments({
      [sortField]: { $gt: currentUser.stats[field] || 0 }
    }) + 1;
    
    const formattedLeaderboard = leaderboard.map((user, index) => {
      const value = type === 'time' 
        ? Math.round((user.stats[field] || 0) / 60) 
        : user.stats[field] || 0;
        
      return {
        id: user._id,
        username: user.username,
        avatar: user.avatar,
        level: user.stats.level,
        rank: index + 1,
        value,
        isCurrentUser: user._id.toString() === userId
      } as ILeaderboardUserEntry;
    });
    
    const currentUserValue = type === 'time' 
      ? Math.round((currentUser.stats[field] || 0) / 60) 
      : currentUser.stats[field] || 0;
    
    const currentUserData: ILeaderboardUserEntry = {
      id: currentUser._id,
      username: currentUser.username,
      avatar: currentUser.avatar,
      level: currentUser.stats.level,
      rank: userRank,
      value: currentUserValue
    };
    
    return {
      leaderboard: formattedLeaderboard,
      currentUser: currentUserData
    };
  }
} 