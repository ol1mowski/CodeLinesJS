import { User } from "../../models/user.model.js";
import { AuthError, ValidationError } from "../../utils/errors.js";

export const getStreak = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new AuthError("Brak autoryzacji");

    const user = await User.findById(userId);
    if (!user) throw new ValidationError("Nie znaleziono użytkownika");

    const { streak, bestStreak } = user.stats;

    res.json({
      status: "success",
      data: {
        streak,
        bestStreak,
      },
    });
  } catch (error) {
    next(error);
  }
}; 