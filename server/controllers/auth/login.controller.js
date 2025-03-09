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
    res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com https://*.gstatic.com; connect-src 'self' https://accounts.google.com https://*.googleapis.com https://codelinesjs.pl https://www.codelinesjs.pl http://localhost:*; frame-src 'self' https://accounts.google.com; img-src 'self' data: https://*.googleusercontent.com https://*.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://accounts.google.com; font-src 'self' https://fonts.gstatic.com");
    
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