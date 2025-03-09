import { AuthService } from './services/index.js';

export const login = async (req, res, next) => {
  try {
    const { email, password, rememberMe } = req.body;
    const result = await AuthService.login(email, password, rememberMe);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
    res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
    res.setHeader('Permissions-Policy', 'identity-credentials-get=(self "https://accounts.google.com")');
    
    const { credential, rememberMe } = req.body;
    const result = await AuthService.googleAuth(credential, rememberMe);
    
    return res.status(200).json({
      status: 'success',
      ...result
    });
  } catch (error) {
    next(error);
  }
};

export const verifyToken = async (req, res, next) => {
  try {
    const user = await AuthService.verifyToken(req.user.userId);
    res.json(user);
  } catch (error) {
    next(error);
  }
}; 