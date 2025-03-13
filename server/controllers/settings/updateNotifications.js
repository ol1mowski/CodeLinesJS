import { User } from "../../models/user.model.js";

export const updateNotificationsController = async (req, res, next) => {
  try {
    const { 
      emailNotifications, 
      pushNotifications, 
      dailyReminders,
      weeklyProgress,
      newFeatures,
      communityUpdates
    } = req.body;
    
    const userId = req.user.userId;
    
    const user = await User.findById(userId);
    
    if (!user.settings) {
      user.settings = {};
    }
    
    if (!user.settings.notifications) {
      user.settings.notifications = {};
    }
    
    const notifications = user.settings.notifications;
    
    if (emailNotifications !== undefined) {
      notifications.email = emailNotifications;
    }
    
    if (pushNotifications !== undefined) {
      notifications.push = pushNotifications;
    }
    
    if (dailyReminders !== undefined) {
      notifications.dailyReminders = dailyReminders;
    }
    
    if (weeklyProgress !== undefined) {
      notifications.weeklyProgress = weeklyProgress;
    }
    
    if (newFeatures !== undefined) {
      notifications.newFeatures = newFeatures;
    }
    
    if (communityUpdates !== undefined) {
      notifications.communityUpdates = communityUpdates;
    }
    
    await user.save();
    
    res.json({
      message: "Ustawienia powiadomień zostały zaktualizowane",
      notifications: user.settings.notifications
    });
  } catch (error) {
    next(error);
  }
}; 