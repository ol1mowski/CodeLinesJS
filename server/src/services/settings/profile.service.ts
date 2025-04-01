import { User } from '../../models/user.model.js';
import { ValidationError } from '../../utils/errors.js';
import { UserProfile, UpdateProfileDTO } from '../../types/settings/index.js';

export class ProfileService {
  static async updateProfile(userId: string, profileData: UpdateProfileDTO): Promise<UserProfile> {
    const { username, bio, avatar } = profileData;

    if (!username) {
      throw new ValidationError('Nazwa użytkownika jest wymagana');
    }

    const existingUser = await User.findOne({
      username,
      _id: { $ne: userId }
    });

    if (existingUser) {
      throw new ValidationError('Nazwa użytkownika jest już zajęta');
    }

    const user = await User.findById(userId);

    if (!user) {
      throw new ValidationError('Użytkownik nie znaleziony');
    }

    user.username = username;
    
    if (bio !== undefined) {
      (user as any).bio = bio;
    }

    if (avatar) {
      (user as any).avatar = avatar;
    }

    await user.save();

    return {
      id: user._id,
      username: user.username,
      email: user.email,
      bio: (user as any).bio,
      avatar: (user as any).avatar
    };
  }
} 