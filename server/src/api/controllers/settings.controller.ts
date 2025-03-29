import {
  getSettingsController,
  updateProfileController,
  changePasswordController,
  updateNotificationsController,
  updateAppearanceController
} from './settings/index.js';

import { User } from '../../models/user.model.js';
import { AuthError, ValidationError } from '../../utils/errors.js';
import { Document } from 'mongoose';
import { Request, Response, NextFunction } from 'express';

interface UserDocument extends Document {
  comparePassword(password: string): Promise<boolean>;
  bio?: string;
}

interface UserLeanDocument {
  _id: string;
  username: string;
  email: string;
  password?: string;
  avatar?: string;
  bio?: string;
  profile?: any;
  preferences?: {
    theme?: string;
    language?: string;
    [key: string]: any;
  };
  stats?: {
    completedChallenges?: number;
    points?: number;
    streak?: number;
    [key: string]: any;
  };
  [key: string]: any;
}

export const getSettings = getSettingsController;
export const updateProfile = updateProfileController;
export const changePassword = changePasswordController;
export const updateNotifications = updateNotificationsController;
export const updateAppearance = updateAppearanceController;

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user?.userId)
      .select('username email profile preferences stats')
      .lean() as unknown as UserLeanDocument;
    
    if (!user) {
      throw new AuthError('Użytkownik nie znaleziony');
    }
    
    res.json({
      username: user.username,
      email: user.email,
      profile: user.profile || {},
      preferences: user.preferences || {},
      stats: {
        completedChallenges: user.stats?.completedChallenges || 0,
        totalPoints: user.stats?.points || 0,
        streak: user.stats?.streak || 0
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getPreferences = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user?.userId)
      .select('preferences');
    
    if (!user) {
      throw new AuthError('Użytkownik nie znaleziony');
    }
    
    res.json(user.preferences || {});
  } catch (error) {
    next(error);
  }
};

export const updatePreferences = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(
      req.user?.userId,
      { $set: { preferences: { ...updates } } },
      { new: true }
    ).select('preferences');
    
    if (!user) {
      throw new AuthError('Użytkownik nie znaleziony');
    }
    
    res.json(user.preferences || {});
  } catch (error) {
    next(error);
  }
};

export const deleteAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password } = req.body;
    
    const user = await User.findById(req.user?.userId) as UserDocument;
    if (!user) {
      throw new AuthError('Użytkownik nie znaleziony');
    }
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new AuthError('Nieprawidłowe hasło');
    }
    
    await User.findByIdAndDelete(req.user?.userId);
    
    res.json({ message: 'Konto zostało usunięte' });
  } catch (error) {
    next(error);
  }
};

export const getUserData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user?.userId)
      .select('email username avatar bio stats preferences')
      .lean() as unknown as UserLeanDocument;
    
    if (!user) {
      throw new AuthError('Użytkownik nie znaleziony');
    }
    
    res.json({
      email: user.email,
      username: user.username,
      avatar: user.avatar || '',
      bio: user.bio || '',
      stats: {
        completedChallenges: user.stats?.completedChallenges || 0,
        totalPoints: user.stats?.points || 0,
        streak: user.stats?.streak || 0
      },
      preferences: {
        theme: user.preferences?.theme || 'light',
        language: user.preferences?.language || 'pl'
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getUserByIdentifier = async (req: Request, res: Response, next: NextFunction) => {
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
      .lean() as unknown as UserLeanDocument;
    
    if (!user) {
      throw new ValidationError('Użytkownik nie znaleziony');
    }
    
    res.json({
      id: user._id,
      username: user.username,
      avatar: user.avatar || '',
      bio: user.bio || '',
      stats: {
        completedChallenges: user.stats?.completedChallenges || 0,
        totalPoints: user.stats?.points || 0,
        streak: user.stats?.streak || 0
      }
    });
  } catch (error) {
    next(error);
  }
}; 