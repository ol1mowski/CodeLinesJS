import { User } from "../../../models/user.model.js";
import { LevelService } from "../../../services/level.service.js";

export const getUserProgressController = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    
    const user = await User.findById(userId)
      .select("stats.level stats.points stats.pointsToNextLevel stats.streak stats.bestStreak stats.learningPaths stats.completedChallenges stats.timeSpent")
      .populate({
        path: "stats.learningPaths.pathId",
        select: "title difficulty totalLessons"
      })
      .lean();
      
    const levelStats = LevelService.getUserLevelStats(user);
    
    const learningPaths = user.stats.learningPaths.map(path => {
      const completedLessons = path.progress?.completedLessons?.length || 0;
      const totalLessons = path.pathId?.totalLessons || 0;
      
      return {
        id: path.pathId?._id,
        title: path.pathId?.title,
        difficulty: path.pathId?.difficulty,
        progress: {
          completed: completedLessons,
          total: totalLessons,
          percentage: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
        }
      };
    });
    
    const response = {
      level: levelStats.level,
      points: levelStats.points,
      pointsToNextLevel: levelStats.pointsToNextLevel,
      levelProgress: levelStats.progress,
      streak: user.stats?.streak || 0,
      bestStreak: user.stats?.bestStreak || 0,
      completedChallenges: user.stats?.completedChallenges || 0,
      timeSpent: user.stats?.timeSpent || 0,
      learningPaths
    };
    
    res.json(response);
  } catch (error) {
    next(error);
  }
}; 