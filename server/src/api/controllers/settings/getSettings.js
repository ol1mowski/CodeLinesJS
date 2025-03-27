import { User } from "../../../models/user.model.js";

export const getSettingsController = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    
    const user = await User.findById(userId)
      .select("username email bio avatar settings")
      .lean();
      
    if (!user.settings) {
      user.settings = {
        notifications: {
          email: true,
          push: true,
          dailyReminders: true,
          weeklyProgress: true,
          newFeatures: true,
          communityUpdates: true
        },
        appearance: {
          theme: "system",
          fontSize: "medium",
          codeStyle: "default"
        }
      };
    }
    
    const response = {
      profile: {
        id: user._id,
        username: user.username,
        email: user.email,
        bio: user.bio || "",
        avatar: user.avatar
      },
      settings: user.settings
    };
    
    res.json(response);
  } catch (error) {
    next(error);
  }
}; 