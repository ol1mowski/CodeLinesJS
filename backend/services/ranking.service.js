import { User } from '../models/user.model.js';

class RankingService {
  async getRanking(period) {
    try {
      const users = await User.find()
        .select('name avatar level points stats')
        .sort({ points: -1 })
        .limit(50);

      return users.map((user, index) => ({
        id: user._id,
        name: user.name,
        avatar: user.avatar,
        level: user.level,
        points: user.points,
        stats: {
          completedChallenges: user.stats?.completedChallenges || 0,
          accuracy: user.stats?.accuracy || 0
        }
      }));
    } catch (error) {
      console.error('Error fetching ranking:', error);
      throw new Error('Failed to fetch ranking data');
    }
  }
}

export default new RankingService(); 