import { User } from '../models/user.model.js';
import {  deleteFromStorage } from '../utils/storage.js';
import { AuthError, ValidationError } from '../utils/errors.js';

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId)
      .select('username email avatar profile preferences stats')
      .lean();
    
    if (!user) {
      throw new AuthError('Użytkownik nie znaleziony');
    }
    
    res.json({
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      profile: user.profile,
      preferences: user.preferences,
      stats: {
        completedChallenges: user.stats.completedChallenges,
        totalPoints: user.stats.totalPoints,
        streak: user.stats.streak
      }
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { username, email, profile } = req.body;
    
    const user = await User.findById(req.user.userId);
    if (!user) {
      throw new AuthError('Użytkownik nie znaleziony');
    }
    
    if (username) user.username = username;
    if (email) user.email = email;
    if (profile) {
      user.profile = {
        ...user.profile,
        ...profile
      };
    }
    
    await user.save();
    
    res.json({
      username: user.username,
      email: user.email,
      profile: user.profile
    });
  } catch (error) {
    next(error);
  }
};

export const updateAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new ValidationError('Brak pliku');
    }
    
    const avatarUrl = `/uploads/avatars/${req.file.filename}`;
    
    const user = await User.findById(req.user.userId);
    if (!user) {
      throw new AuthError('Użytkownik nie znaleziony');
    }

    if (user.avatar && !user.avatar.includes('default-avatar.png')) {
      try {
        await deleteFromStorage(user.avatar);
      } catch (error) {
        console.error('Błąd podczas usuwania starego avatara:', error);
      }
    }
    
    user.avatar = avatarUrl;
    await user.save();
    
    res.json({ 
      avatar: user.avatar,
      username: user.username 
    });
  } catch (error) {
    if (req.file) {
      try {
        await deleteFromStorage(`/uploads/avatars/${req.file.filename}`);
      } catch (deleteError) {
        console.error('Błąd podczas usuwania pliku po błędzie:', deleteError);
      }
    }
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    const user = await User.findById(req.user.userId);
    if (!user) {
      throw new AuthError('Użytkownik nie znaleziony');
    }
    
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      throw new AuthError('Nieprawidłowe obecne hasło');
    }
    
    user.password = newPassword;
    await user.save();
    
    res.json({ message: 'Hasło zostało zmienione' });
  } catch (error) {
    next(error);
  }
};

export const getPreferences = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId)
      .select('preferences');
    
    if (!user) {
      throw new AuthError('Użytkownik nie znaleziony');
    }
    
    res.json(user.preferences);
  } catch (error) {
    next(error);
  }
};

export const updatePreferences = async (req, res, next) => {
  try {
    const updates = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $set: { preferences: { ...updates } } },
      { new: true }
    ).select('preferences');
    
    res.json(user.preferences);
  } catch (error) {
    next(error);
  }
};

export const deleteAccount = async (req, res, next) => {
  try {
    const { password } = req.body;
    
    const user = await User.findById(req.user.userId);
    if (!user) {
      throw new AuthError('Użytkownik nie znaleziony');
    }
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new AuthError('Nieprawidłowe hasło');
    }
    
    await User.findByIdAndDelete(req.user.userId);
    
    res.json({ message: 'Konto zostało usunięte' });
  } catch (error) {
    next(error);
  }
};

export const getUserData = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId)
      .select('email username avatar bio stats preferences')
      .lean();
    
    if (!user) {
      throw new AuthError('Użytkownik nie znaleziony');
    }
    
    res.json({
      email: user.email,
      username: user.username,
      avatar: user.avatar,
      bio: user.bio,
      stats: {
        completedChallenges: user.stats.completedChallenges,
        totalPoints: user.stats.totalPoints,
        streak: user.stats.streak
      },
      preferences: {
        theme: user.preferences.theme,
        language: user.preferences.language
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getUserByIdentifier = async (req, res, next) => {
  try {
    const { identifier } = req.params;
    
    let query = {};
    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      query = { _id: identifier };
    } else {
      query = { username: identifier };
    }
    
    const user = await User.findOne(query)
      .select('username avatar bio stats')
      .lean();
    
    if (!user) {
      throw new ValidationError('Użytkownik nie znaleziony');
    }
    
    res.json({
      id: user._id,
      username: user.username,
      avatar: user.avatar,
      bio: user.bio,
      stats: {
        completedChallenges: user.stats.completedChallenges,
        totalPoints: user.stats.totalPoints,
        streak: user.stats.streak
      }
    });
  } catch (error) {
    next(error);
  }
}; 