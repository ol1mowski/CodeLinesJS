import { User } from '../models/user.model.js';
import { AuthError } from '../utils/errors.js';

class DashboardService {
  async getDashboardData(userId) {
    try {
      const user = await User.findById(userId).select('stats profile');
      
      if (!user) {
        throw new AuthError('Użytkownik nie znaleziony');
      }

      // Pobierz podstawowe statystyki użytkownika
      const stats = {
        completedChallenges: user.stats?.completedChallenges || 0,
        totalPoints: user.stats?.totalPoints || 0,
        streak: user.stats?.streak || 0,
        lastActive: user.stats?.lastActive || new Date()
      };

      // Pobierz ostatnie aktywności (możemy rozszerzyć później)
      const recentActivities = [];

      // Pobierz powiadomienia (możemy rozszerzyć później)
      const notifications = [];
      const unreadCount = 0;

      return {
        stats,
        recentActivities,
        notifications,
        unreadCount,
        profile: {
          username: user.profile?.displayName || user.username,
          avatar: user.avatar,
          theme: user.profile?.preferences?.theme || 'dark'
        }
      };
    } catch (error) {
      if (error instanceof AuthError) {
        throw error;
      }
      console.error('Dashboard service error:', error);
      throw new Error('Błąd podczas pobierania danych dashboardu');
    }
  }

  async updateLastActive(userId) {
    try {
      await User.findByIdAndUpdate(userId, {
        $set: { 'stats.lastActive': new Date() }
      });
    } catch (error) {
      console.error('Error updating last active:', error);
    }
  }
}

export default DashboardService; 