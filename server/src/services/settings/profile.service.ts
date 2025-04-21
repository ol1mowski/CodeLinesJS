import { User } from '../../models/user.model.js';
import { UserProfile, UpdateProfileDTO } from '../../types/settings/index.js';
import { ValidationError } from '../../utils/errors.js';

export class ProfileService {
  static async updateProfile(userId: string, profileData: UpdateProfileDTO): Promise<UserProfile> {
    const { username, email, bio, avatar } = profileData;

    if (!username) {
      throw new ValidationError('Nazwa użytkownika jest wymagana');
    }

    if (!email) {
      throw new ValidationError('Adres email jest wymagany');
    }

    const existingUsername = await User.findOne({
      username,
      _id: { $ne: userId },
    });

    if (existingUsername) {
      throw new ValidationError('Nazwa użytkownika jest już zajęta');
    }

    const existingEmail = await User.findOne({
      email,
      _id: { $ne: userId },
    });

    if (existingEmail) {
      throw new ValidationError('Adres email jest już zajęty');
    }

    const user = await User.findById(userId);

    if (!user) {
      throw new ValidationError('Użytkownik nie znaleziony');
    }

    user.username = username;
    user.email = email;

    if (bio !== undefined) {
      if (!user.profile) {
        user.profile = {};
      }

      if (typeof user.profile !== 'object') {
        user.profile = {};
      }

      user.profile.bio = bio;
    }

    if (avatar) {
      user.avatar = avatar;
    }

    await user.save();

    return {
      id: user._id,
      username: user.username,
      email: user.email,
      bio: user.profile?.bio || '',
      avatar: user.avatar,
    };
  }
}
