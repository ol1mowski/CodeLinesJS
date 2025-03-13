import { User } from "../../models/user.model.js";
import { ValidationError } from "../../utils/errors.js";

export const updateAppearanceController = async (req, res, next) => {
  try {
    const { theme, fontSize, codeStyle } = req.body;
    const userId = req.user.userId;
    
    const validThemes = ["light", "dark", "system"];
    const validFontSizes = ["small", "medium", "large"];
    const validCodeStyles = ["default", "monokai", "github", "vscode"];
    
    if (theme && !validThemes.includes(theme)) {
      throw new ValidationError("Nieprawidłowy motyw");
    }
    
    if (fontSize && !validFontSizes.includes(fontSize)) {
      throw new ValidationError("Nieprawidłowy rozmiar czcionki");
    }
    
    if (codeStyle && !validCodeStyles.includes(codeStyle)) {
      throw new ValidationError("Nieprawidłowy styl kodu");
    }
    
    const user = await User.findById(userId);
    
    if (!user.settings) {
      user.settings = {};
    }
    
    if (!user.settings.appearance) {
      user.settings.appearance = {};
    }
    
    const appearance = user.settings.appearance;
    
    if (theme) {
      appearance.theme = theme;
    }
    
    if (fontSize) {
      appearance.fontSize = fontSize;
    }
    
    if (codeStyle) {
      appearance.codeStyle = codeStyle;
    }
    
    await user.save();
    
    res.json({
      message: "Ustawienia wyglądu zostały zaktualizowane",
      appearance: user.settings.appearance
    });
  } catch (error) {
    next(error);
  }
}; 