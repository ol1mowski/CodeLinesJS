import { User } from '../models/user.model.js';
import { Notification } from '../models/notification.model.js';
import { AuthError } from '../utils/errors.js';

class DashboardService {
  async getDashboardData(userId) {
    try {
      const [user, notifications] = await Promise.all([
        User.findById(userId).select('stats profile'),
        Notification.find({ userId })
          .sort({ createdAt: -1 })
          .limit(10)
      ]);
      
      if (!user) {
        throw new AuthError('Użytkownik nie znaleziony');
      }

      const unreadCount = await Notification.countDocuments({
        userId,
        read: false
      });

      return {
        stats: {
          ...user.stats,
          lastActive: user.stats?.lastActive?.toISOString() || new Date().toISOString()
        },
        notifications,
        unreadCount,
        profile: user.profile
      };
    } catch (error) {
      throw error;
    }
  }

  async markNotificationAsRead(userId, notificationId) {
    const notification = await Notification.findOneAndUpdate(
      { _id: notificationId, userId },
      { $set: { read: true } },
      { new: true }
    );
    return notification;
  }
}

export default DashboardService; 