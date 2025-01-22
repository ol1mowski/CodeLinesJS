import { User } from '../models/user.model.js';

class RankingService {
  async getRanking(period, userId) {
    try {
      const users = await User.find()
        .select('name avatar level points stats')
        .sort({ points: -1 })
        .limit(50);

      const totalUsers = await User.countDocuments();
      const activePlayers = await User.countDocuments({ 
        lastActive: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } 
      });

      const stats = {
        rank: userId ? users.findIndex(u => u._id.toString() === userId.toString()) + 1 : null,
        rankChange: 0,
        activePlayers,
        activePlayersChange: 0,
        completedChallenges: userId ? (await User.findById(userId))?.stats?.completedChallenges || 0 : 0,
        challengesChange: 0,
        accuracy: 0
      };

      return {
        users: users.map((user) => ({
          id: user._id,
          name: user.name,
          avatar: user.avatar,
          level: user.level,
          points: user.points,
          stats: {
            completedChallenges: user.stats?.completedChallenges || 0,
            accuracy: user.stats?.accuracy || 0
          }
        })),
        stats
      };
    } catch (error) {
      console.error('Error fetching ranking:', error);
      throw new Error('Failed to fetch ranking data');
    }
  }
}

export default new RankingService(); 