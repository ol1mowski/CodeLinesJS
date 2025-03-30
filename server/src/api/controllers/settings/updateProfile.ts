// @ts-nocheck
import { User } from "../../../models/user.model.js";
import { ValidationError } from "../../../utils/errors.js";

export const updateProfileController = async (req, res, next) => {
  try {
    const { username, bio, avatar } = req.body;
    const userId = req.user.userId;
    
    if (!username) {
      throw new ValidationError("Nazwa użytkownika jest wymagana");
    }
    
    const existingUser = await User.findOne({ 
      username, 
      _id: { $ne: userId } 
    });
    
    if (existingUser) {
      throw new ValidationError("Nazwa użytkownika jest już zajęta");
    }
    
    const user = await User.findById(userId);
    
    user.username = username;
    user.bio = bio || user.bio;
    
    if (avatar) {
      user.avatar = avatar;
    }
    
    await user.save();
    
    res.json({
      message: "Profil został zaktualizowany",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        bio: user.bio,
        avatar: user.avatar
      }
    });
  } catch (error) {
    next(error);
  }
}; 