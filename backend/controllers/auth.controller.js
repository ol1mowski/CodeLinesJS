import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { AuthError } from '../utils/errors.js';
import { transporter } from '../config/mailer.js';

export const register = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;

    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingUser) {
      throw new AuthError('Użytkownik już istnieje');
    }

    const user = await User.create({
      email,
      password,
      username,
      accountType: 'local',
      profile: {
        bio: '',
        socialLinks: {}
      },
      preferences: {
        emailNotifications: true,
        theme: 'dark',
        language: 'pl'
      },
      stats: {
        points: 0,
        completedLessons: [],
        lastActive: new Date()
      }
    });

    const token = jwt.sign(
      { 
        userId: user._id,
        email: user.email,
        username: user.username
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({ 
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        isNewUser: true,
        stats: user.stats
      }
    });
  } catch (error) {
    next(error);
  }
};

const generateToken = (user) => {
  return jwt.sign(
    { 
      userId: user._id,
      email: user.email 
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw new AuthError('Nieprawidłowe dane logowania');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new AuthError('Nieprawidłowe dane logowania');
    }

    const token = generateToken(user);
    res.json({ 
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username
      }
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ 
        error: 'Email jest wymagany' 
      });
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.status(400).json({ 
        error: 'Nieprawidłowy format emaila' 
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new AuthError('Użytkownik nie znaleziony');
    }

    const resetToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    
    await transporter.sendMail({
      from: '"Nazwa Twojej Aplikacji" <' + process.env.SMTP_USER + '>',
      to: email,
      subject: "Reset hasła",
      html: `
        <h1>Reset hasła</h1>
        <p>Cześć!</p>
        <p>Otrzymaliśmy prośbę o reset hasła dla Twojego konta.</p>
        <p>Kliknij w poniższy link, aby zresetować hasło:</p>
        <a href="${resetUrl}">Reset hasła</a>
        <p>Link wygaśnie za godzinę.</p>
        <p>Jeśli nie prosiłeś o reset hasła, zignoruj tę wiadomość.</p>
      `
    });

    res.json({ 
      message: 'Wysłano email do resetowania hasła'
    });
  } catch (error) {
    next(error);
  }
};

export const verifyToken = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(401).json({ error: 'Użytkownik nie znaleziony' });
    }
    res.json(user);
  } catch (error) {
    res.status(401).json({ error: 'Nieprawidłowy token' });
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const { idToken, userData, rememberMe } = req.body;
    
    if (!idToken || !userData) {
      throw new AuthError('Nieprawidłowe dane uwierzytelniające');
    }

    const { email, name, picture } = userData;

    let user = await User.findOne({ email });

    if (!user) {
      const baseUsername = name?.split(' ')[0].toLowerCase() || email.split('@')[0];
      let username = baseUsername;
      let counter = 1;

      while (await User.findOne({ username })) {
        username = `${baseUsername}${counter}`;
        counter++;
      }

      user = await User.create({
        email,
        username,
        avatar: picture,
        isEmailVerified: true,
        accountType: 'google',
        profile: {
          displayName: name,
          bio: '',
          socialLinks: {}
        },
        preferences: {
          emailNotifications: true,
          theme: 'dark'
        },
        stats: {
          points: 0,
          completedLessons: [],
          lastActive: new Date()
        }
      });

      try {
        await transporter.sendMail({
          from: process.env.SMTP_USER,
          to: email,
          subject: "Witaj w CodeLinesJS!",
          html: `
            <h1>Witaj ${name || username}!</h1>
            <p>Twoje konto zostało pomyślnie utworzone.</p>
            <p>Możesz teraz rozpocząć naukę JavaScript poprzez interaktywne wyzwania!</p>
          `
        });
      } catch (emailError) {
        console.error('Błąd wysyłania emaila powitalnego:', emailError);
      }
    } else {
      user.lastLogin = new Date();
      user.avatar = picture || user.avatar;
      await user.save();
    }

    const token = jwt.sign(
      { 
        userId: user._id,
        email: user.email,
        username: user.username,
        accountType: user.accountType
      },
      process.env.JWT_SECRET,
      { expiresIn: rememberMe ? '30d' : '24h' }
    );

    res.json({ 
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        isNewUser: !user.lastLogin,
        stats: user.stats
      }
    });
  } catch (error) {
    next(error);
  }
}; 