import { User } from '../models/user.model.js';
import { AuthError, ValidationError } from '../utils/errors.js';
import { LevelService } from '../services/level.service.js';

export const getStats = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new AuthError('Brak autoryzacji');

    const user = await User.findById(userId)
      .select('stats username')
      .lean();

    if (!user) throw new ValidationError('Nie znaleziono użytkownika');

    res.json({
      status: 'success',
      data: {
        username: user.username,
        level: user.stats.level,
        xp: user.stats.xp,
        points: user.stats.points,
        streak: user.stats.streak,
        bestStreak: user.stats.bestStreak,
        completedLessons: user.stats.completedLessons.length,
        lastActive: user.stats.lastActive
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getDailyStats = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new AuthError('Brak autoryzacji');

    const user = await User.findById(userId)
      .select('stats.daily')
      .lean();

    if (!user) throw new ValidationError('Nie znaleziono użytkownika');

    const last7Days = user.stats.daily.slice(-7);

    res.json({
      status: 'success',
      data: last7Days
    });
  } catch (error) {
    next(error);
  }
};

export const updateStats = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new AuthError('Brak autoryzacji');

    const user = await User.findById(userId);
    if (!user) throw new ValidationError('Nie znaleziono użytkownika');

    const today = new Date();
    const lastActive = user.stats?.lastActive ? new Date(user.stats.lastActive) : null;
    const diffDays = lastActive ? Math.floor((today - lastActive) / (1000 * 60 * 60 * 24)) : 1;

    if (diffDays === 1) {
      user.stats.streak += 1;
      user.stats.bestStreak = Math.max(user.stats.streak, user.stats.bestStreak);
    } else if (diffDays > 1) {
      user.stats.streak = 1;
    }

    const todayStr = today.toISOString().split('T')[0];
    const dailyIndex = user.stats.daily.findIndex(d => d.date === todayStr);

    if (dailyIndex >= 0) {
      user.stats.daily[dailyIndex].points += req.body.points || 0;
      user.stats.daily[dailyIndex].challenges += req.body.challenges || 0;
    } else {
      user.stats.daily.push({
        date: todayStr,
        points: req.body.points || 0,
        challenges: req.body.challenges || 0
      });
    }

    if (req.body.points) {
      user.stats.points += req.body.points;
      user.stats.xp += req.body.points;
      await LevelService.updateLevel(user);
    }

    user.stats.lastActive = today;
    await user.save();

    res.json({
      status: 'success',
      data: {
        level: user.stats.level,
        xp: user.stats.xp,
        points: user.stats.points,
        streak: user.stats.streak,
        bestStreak: user.stats.bestStreak,
        completedLessons: user.stats.completedLessons.length,
        lastActive: user.stats.lastActive
      }
    });
  } catch (error) {
    next(error);
  }
};
