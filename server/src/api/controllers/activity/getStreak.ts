import { Request, Response, NextFunction } from 'express';
import { AuthError } from "../../../utils/errors.js";
import { ActivityService } from "../../../services/activity.service.js";

export const getStreak = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      throw new AuthError("Brak autoryzacji");
    }

    const userData = await ActivityService.findUserById(userId);

    const response = ActivityService.prepareStreakResponse(userData);

    res.json(response);
  } catch (error) {
    next(error);
  }
}; 