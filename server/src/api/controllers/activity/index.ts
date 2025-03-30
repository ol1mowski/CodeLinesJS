// @ts-nocheck
import { updateActivity } from "./updateActivity.js";
import { getStreak } from "./getStreak.js";
import { getDailyProgress } from "./getDailyProgress.js";
import { getActivityHistory } from "./getActivityHistory.js";

const ActivityController = {
  updateActivity,
  getStreak,
  getDailyProgress,
  getActivityHistory,
};

export default ActivityController;

export {
  updateActivity,
  getStreak,
  getDailyProgress,
  getActivityHistory,
}; 