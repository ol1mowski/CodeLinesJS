import { User } from '../../../models/user.model.js';
import { Request, Response, NextFunction } from 'express';

export const getRanking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId;
    
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const validPage = page > 0 ? page : 1;
    const validLimit = limit > 0 && limit <= 50 ? limit : 10;
    
    const skip = (validPage - 1) * validLimit;

    const totalUsers = await User.countDocuments();

    const users = await User.find({})
      .select('username stats.points stats.level stats.streak stats.bestStreak stats.lastActive avatar')
      .sort({ 'stats.level': -1, 'stats.points': -1 })
      .skip(skip)
      .limit(validLimit)
      .lean();

    const userRankDoc = await User.findOne({ _id: userId })
      .select('username stats.points stats.level');
      
    let userRank = null;
    let userRankData = null;
    
    if (userRankDoc) {
      const betterUsers = await User.countDocuments({
        $or: [
          { 'stats.level': { $gt: userRankDoc.stats?.level || 1 } },
          { 
            'stats.level': userRankDoc.stats?.level || 1,
            'stats.points': { $gt: userRankDoc.stats?.points || 0 }
          }
        ]
      });
      
      userRank = betterUsers + 1;
      
      userRankData = {
        rank: userRank,
        total: totalUsers,
        username: userRankDoc.username,
        avatar: userRankDoc.avatar,
        stats: {
          points: userRankDoc.stats?.points || 0,
          level: userRankDoc.stats?.level || 1,
        },
        isCurrentUser: true
      };
    }

    const formattedUsers = users.map((user, index) => ({
      rank: skip + index + 1,
      username: user.username,
      avatar: user.avatar,
      stats: {
        points: user.stats?.points || 0,
        level: user.stats?.level || 1,
        streak: user.stats?.streak || 0,
        bestStreak: user.stats?.bestStreak || 0,
        lastActive: user.stats?.lastActive || null
      },
      isCurrentUser: user._id.toString() === userId
    }));

    const totalPages = Math.ceil(totalUsers / validLimit);

    res.success({
      ranking: formattedUsers,
      userStats: userRankData,
      totalUsers: totalUsers,
      meta: {
        page: validPage,
        limit: validLimit,
        totalPages: totalPages,
        totalResults: totalUsers
      }
    }, 'Ranking pobrany pomyślnie');

  } catch (error) {
    next(error);
  }
}; 