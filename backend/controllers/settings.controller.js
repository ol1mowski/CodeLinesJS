import { User } from '../models/user.model.js';
import { AuthError, ValidationError } from '../utils/errors.js';

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId)
      .select('username email profile preferences stats')
      .lean();
    
    if (!user) {
      throw new AuthError('Użytkownik nie znaleziony');
    }
    
    res.json({
      username: user.username,
      email: user.email,
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
    
    if (username) {
      const existingUser = await User.findOne({ 
        username, 
        _id: { $ne: req.user.userId } 
      });
      if (existingUser) {
        throw new ValidationError('Nazwa użytkownika jest już zajęta');
      }
    }
    
    if (email) {
      const existingUser = await User.findOne({ 
        email, 
        _id: { $ne: req.user.userId } 
      });
      if (existingUser) {
        throw new ValidationError('Email jest już zajęty');
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      {
        $set: {
          username: username || undefined,
          email: email || undefined,
          'profile.bio': profile?.bio
        }
      },
      { 
        new: true,
        runValidators: true 
      }
    );

    if (!updatedUser) {
      throw new AuthError('Użytkownik nie znaleziony');
    }
    
    res.json({
      username: updatedUser.username,
      email: updatedUser.email,
      profile: updatedUser.profile,
    });
  } catch (error) {
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