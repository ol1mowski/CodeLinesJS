import { User } from '../../../models/user.model.js';

export const verifyToken = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(401).json({ error: 'Użytkownik nie znaleziony' });
    }

    res.json(user);
  } catch (error) {
    console.error('verifyToken - błąd:', error);
    res.status(401).json({ error: 'Nieprawidłowy token' });
  }
}; 