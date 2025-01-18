import { User } from '../models/user.model.js';
import { uploadToStorage } from '../utils/storage.js';
import { AuthError } from '../utils/errors.js';

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId)
      .select('username email profile');
    
    if (!user) {
      throw new AuthError('Użytkownik nie znaleziony');
    }
    
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { username, email, bio } = req.body;
    
    const user = await User.findById(req.user.userId);
    if (!user) {
      throw new AuthError('Użytkownik nie znaleziony');
    }
    
    if (username) user.username = username;
    if (email) user.email = email;
    if (bio !== undefined) user.profile.bio = bio;
    
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
    
    const avatarUrl = await uploadToStorage(req.file);
    
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { 'profile.avatar': avatarUrl },
      { new: true }
    ).select('profile.avatar');
    
    res.json({ avatar: user.profile.avatar });
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