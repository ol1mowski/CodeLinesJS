import { User } from '../../models/user.model.js';
import { LearningPath } from '../../models/learningPath.model.js';
import { ValidationError, AuthError } from '../../utils/errors.js';
import { IUser } from '../../types/index.d.js';
import { 
  UserStatsDTO, 
  UpdateStatsDTO, 
  LearningPathProgressDTO,
  StatsSuccessResponseDTO,
  DailyStatsResponseDTO,
  ChartDataDTO,
  StatsSummaryDTO
} from './types.js';
import { STATS_CONFIG } from './config.js';
import { LevelService } from './level.service.js';
import { StreakService } from './streak.service.js';
import { ChartsService } from './charts.service.js';
import { calculateLearningPathsProgress } from './utils/learningPath.utils.js';

export class StatsService {
  static async getUserStats(userId: string): Promise<StatsSuccessResponseDTO> {
    const [user, learningPaths] = await Promise.all([
      User.findById(userId)
        .select('stats username')
        .lean(),
      LearningPath.find({ 'lessons': { $exists: true, $not: { $size: 0 } } })
        .lean()
    ]);

    if (!user) {
      throw new ValidationError('Nie znaleziono użytkownika');
    }

    const levelStats = LevelService.getUserLevelStats(user as unknown as IUser);

    const learningPathsProgress = this.calculateLearningPathsProgress(user, learningPaths);

    const stats: UserStatsDTO = {
      username: user.username,
      level: levelStats.level,
      points: levelStats.points,
      xp: user.stats?.xp || 0,
      pointsToNextLevel: levelStats.pointsToNextLevel,
      levelProgress: levelStats.progress,
      streak: user.stats?.streak || 0,
      bestStreak: user.stats?.bestStreak || 0,
      lastActive: user.stats?.lastActive || new Date(),
      experiencePoints: user.stats?.xp || 0,
      nextLevelThreshold: levelStats.pointsToNextLevel,
      completedChallenges: user.stats?.completedChallenges || 0,
      currentStreak: user.stats?.streak || 0,
      averageScore: user.stats?.averageScore || 0,
      totalTimeSpent: user.stats?.totalTimeSpent || 0,
      badges: user.stats?.badges || [],
      unlockedFeatures: user.stats?.unlockedFeatures || [],
      chartData: {
        daily: (user.stats?.chartData?.daily || []).map(d => ({
          date: d.date || '',
          points: d.points || 0,
          timeSpent: d.timeSpent || 0
        })),
        progress: (user.stats?.chartData?.progress || []).map(p => ({
          name: p.name || '',
          progress: p.progress || 0,
          timeSpent: p.timeSpent || 0
        }))
      },
      learningPaths: learningPathsProgress,
      summary: this.calculateStatsSummary(learningPathsProgress)
    };

    return {
      status: 'success',
      data: stats
    };
  }

  static async getDailyStats(userId: string): Promise<DailyStatsResponseDTO> {
    const user = await User.findById(userId)
      .select('stats.chartData.daily')
      .lean();

    if (!user) {
      throw new ValidationError('Nie znaleziono użytkownika');
    }

    const dailyStats = (user.stats?.chartData?.daily || []).map(d => ({
      date: d.date || '',
      points: d.points || 0,
      timeSpent: d.timeSpent || 0
    }));

    return {
      status: 'success',
      data: dailyStats
    };
  }

  static async updateStats(userId: string, statsData: UpdateStatsDTO): Promise<StatsSuccessResponseDTO> {
    const user = await User.findById(userId);
    if (!user) {
      throw new ValidationError('Nie znaleziono użytkownika');
    }

    this.initializeUserStats(user);

    let levelUpdate = { leveledUp: false, levelsGained: 0 };
    if (statsData.points) {
      levelUpdate = await LevelService.updateUserLevel(user as unknown as IUser, statsData.points);
    }

    const streakResult = StreakService.updateUserStreak(user as unknown as IUser);

    if (statsData.points || statsData.timeSpent) {
      ChartsService.updateUserDailyStats(
        user as unknown as IUser, 
        statsData.points || 0, 
        statsData.timeSpent || 0
      );
    }

    if (statsData.completedChallenges) {
      user.stats.completedChallenges = (user.stats.completedChallenges || 0) + statsData.completedChallenges;
    }

    if (statsData.averageScore !== undefined) {
      user.stats.averageScore = statsData.averageScore;
    }

    if (statsData.totalTimeSpent) {
      user.stats.totalTimeSpent = (user.stats.totalTimeSpent || 0) + statsData.totalTimeSpent;
    }

    user.markModified('stats');
    await user.save();

    const levelStats = LevelService.getUserLevelStats(user as unknown as IUser);

    const chartData: ChartDataDTO = {
      daily: (user.stats.chartData?.daily || []).map(d => ({
        date: d.date || '',
        points: d.points || 0,
        timeSpent: d.timeSpent || 0
      })),
      progress: (user.stats.chartData?.progress || []).map(p => ({
        name: p.name || '',
        progress: p.progress || 0,
        timeSpent: p.timeSpent || 0
      }))
    };

    const stats: UserStatsDTO = {
      level: levelStats.level,
      points: levelStats.points,
      xp: user.stats.xp,
      pointsToNextLevel: levelStats.pointsToNextLevel,
      levelProgress: levelStats.progress,
      streak: user.stats.streak,
      bestStreak: user.stats.bestStreak,
      lastActive: user.stats.lastActive,
      experiencePoints: user.stats.xp,
      nextLevelThreshold: levelStats.pointsToNextLevel,
      completedChallenges: user.stats.completedChallenges,
      currentStreak: user.stats.streak,
      averageScore: user.stats.averageScore,
      totalTimeSpent: user.stats.totalTimeSpent,
      badges: user.stats.badges || [],
      unlockedFeatures: user.stats.unlockedFeatures || [],
      chartData
    };

    return {
      status: 'success',
      data: {
        ...stats,
        leveledUp: levelUpdate.leveledUp,
        levelsGained: levelUpdate.levelsGained
      }
    };
  }

  private static initializeUserStats(user: any): void {
    if (!user.stats) {
      user.stats = {
        points: STATS_CONFIG.DEFAULT_VALUES.points,
        xp: STATS_CONFIG.DEFAULT_VALUES.xp,
        level: STATS_CONFIG.DEFAULT_VALUES.level,
        streak: STATS_CONFIG.DEFAULT_VALUES.streak,
        bestStreak: STATS_CONFIG.DEFAULT_VALUES.bestStreak,
        lastActive: new Date(),
        completedChallenges: STATS_CONFIG.DEFAULT_VALUES.completedChallenges,
        averageScore: STATS_CONFIG.DEFAULT_VALUES.averageScore,
        totalTimeSpent: STATS_CONFIG.DEFAULT_VALUES.totalTimeSpent,
        badges: [],
        unlockedFeatures: [],
        chartData: {
          daily: [],
          progress: []
        }
      };
    }
  }

  private static calculateLearningPathsProgress(user: any, learningPaths: any[]): LearningPathProgressDTO[] {
    const userLearningPaths = user.stats?.learningPaths || [];
    return calculateLearningPathsProgress(learningPaths, userLearningPaths);
  }

  private static calculateStatsSummary(learningPaths: LearningPathProgressDTO[]): StatsSummaryDTO {
    return {
      totalPaths: learningPaths.length,
      completedPaths: learningPaths.filter(p => p.progress.status === 'completed').length,
      inProgress: learningPaths.filter(p => p.progress.status === 'active').length,
      averageCompletion: Math.round(
        learningPaths.reduce((acc, curr) => acc + curr.progress.percentage, 0) / 
        Math.max(learningPaths.length, 1)
      )
    };
  }
} 