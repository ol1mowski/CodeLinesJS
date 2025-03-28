import { User } from '../../../models/user.model.js';

export const getRanking = async (req, res, next) => {
  try {
    const userId = req.user?.userId;

    const users = await User.find({})
      .select('username stats.points stats.level stats.streak stats.bestStreak stats.lastActive')
      .sort({ 'stats.points': -1 })
      .lean();

    const userRankIndex = users.findIndex(user => user._id.toString() === userId);
    const userRank = userRankIndex !== -1 ? userRankIndex + 1 : null;

    const formattedUsers = users.map((user, index) => ({
      rank: index + 1,
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

    let rankingToReturn = formattedUsers.slice(0, 10);

    if (userRank > 10) {

      rankingToReturn.push({ isSeparator: true });
      
      const start = Math.max(userRankIndex - 2, 10);
      const end = Math.min(userRankIndex + 3, users.length);
      rankingToReturn = rankingToReturn.concat(formattedUsers.slice(start, end));
    }

    res.json({
      ranking: rankingToReturn,
      userStats: userRank ? {
        rank: userRank,
        total: users.length,
        ...formattedUsers[userRankIndex]
      } : null,
      totalUsers: users.length
    });

  } catch (error) {
    next(error);
  }
}; 