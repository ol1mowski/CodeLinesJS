// @ts-nocheck
import { User } from '../../../models/user.model.js';

export const getActiveUsers = async (req, res, next) => {
  try {
    const users = await User.find({ 'stats.lastActive': { $gt: new Date(Date.now() - 24*60*60*1000) } })
      .select('username')
      .lean();
    
    res.json({ users });
  } catch (error) {
    next(error);
  }
}; 