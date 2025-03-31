import { Request, Response, NextFunction } from 'express';
import { AuthError } from "../../../utils/errors.js";
import { validateActivityData } from "../../validators/activityValidator.js";
import { ActivityService } from "../../../services/activity.service.js";

export const updateActivity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      throw new AuthError("Brak autoryzacji");
    }

    const { points = 0, challenges = 0, timeSpent = 0 } = validateActivityData(req.body);

    const user = await ActivityService.findUserById(userId);

    const update = await ActivityService.updateUserLevelAndActivity(userId, points, { points, challenges, timeSpent });

    const response = ActivityService.prepareActivityResponse(user, update);

    res.json(response);
  } catch (error) {
    next(error);
  }
}; 