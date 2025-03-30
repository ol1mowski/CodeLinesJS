// @ts-nocheck
import { User } from "../../../models/user.model.js";

export const getLeaderboardController = async (req, res, next) => {
  try {
    const { limit = 10, type = 'points' } = req.query;
    const userId = req.user.userId;
    
    let sortField;
    
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
      
    const userRank = await User.countDocuments({
      [sortField]: { $gt: currentUser[sortField.split('.')[0]][sortField.split('.')[1]] }
    }) + 1;
    
    const formattedLeaderboard = leaderboard.map((user, index) => {
      const value = type === 'time' 
        ? Math.round(user.stats[type.split('.')[1]] / 60) 
        : user.stats[type.split('.')[1]] || 0;
        
      return {
        id: user._id,
        username: user.username,
        avatar: user.avatar,
        level: user.stats.level,
        rank: index + 1,
        value,
        isCurrentUser: user._id.toString() === userId
      };
    });
    
    const currentUserData = {
      id: currentUser._id,
      username: currentUser.username,
      avatar: currentUser.avatar,
      level: currentUser.stats.level,
      rank: userRank,
      value: type === 'time' 
        ? Math.round(currentUser.stats[type.split('.')[1]] / 60) 
        : currentUser.stats[type.split('.')[1]] || 0
    };
    
    res.json({
      leaderboard: formattedLeaderboard,
      currentUser: currentUserData
    });
  } catch (error) {
    next(error);
  }
}; 