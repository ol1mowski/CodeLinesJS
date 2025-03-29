// @ts-nocheck
import { User } from "../../../models/user.model.js";
import { ValidationError } from "../../../utils/errors.js";
import bcrypt from "bcryptjs";

export const changePasswordController = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.userId;
    
    if (!currentPassword || !newPassword) {
      throw new ValidationError("Obecne i nowe hasło są wymagane");
    }
    
    if (newPassword.length < 6) {
      throw new ValidationError("Nowe hasło musi mieć co najmniej 6 znaków");
    }
    
    const user = await User.findById(userId).select("+password");
    
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    
    if (!isPasswordValid) {
      throw new ValidationError("Obecne hasło jest nieprawidłowe");
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    user.password = hashedPassword;
    await user.save();
    
    res.json({
      message: "Hasło zostało zmienione"
    });
  } catch (error) {
    next(error);
  }
}; 