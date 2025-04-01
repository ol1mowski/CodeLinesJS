import { Response, NextFunction } from 'express';
import { ProgressService } from '../../../services/progress/index.js';
import { IUserRequest, LeaderboardQueryDTO } from '../../../types/progress/index.js';

export const getLeaderboardController = async (
  req: IUserRequest & { query: LeaderboardQueryDTO }, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user.userId;
    const { limit, type } = req.query;
    
    const leaderboardData = await ProgressService.getLeaderboard(userId, {
      limit,
      type
    });
    
    res.json(leaderboardData);
  } catch (error) {
    next(error);
  }
}; 