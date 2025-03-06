import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { AuthError } from '../utils/errors.js';
import { transporter, createEmailTemplate } from '../config/mailer.js';
import { StreakService } from '../services/streak.service.js';

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

    try {
      const welcomeContent = `
        <p>Cześć ${username}!</p>
        <p>Witamy w społeczności CodeLinesJS! 🎉</p>
        <p>Twoje konto zostało pomyślnie utworzone i jesteś gotowy, aby rozpocząć swoją przygodę z JavaScript.</p>
        <div class="code-block">
          const user = {
            name: "${username}",
            level: "Początkujący",
            goal: "Zostać JavaScript Ninja!"
          };
          
          console.log("Witaj " + user.name + "! Twoja przygoda się zaczyna!");
        </div>
        <p>Co możesz teraz zrobić?</p>
        <ul>
          <li>Uzupełnij swój profil</li>
          <li>Rozpocznij naukę od podstawowych lekcji</li>
          <li>Rozwiązuj interaktywne wyzwania</li>
        </ul>
        <div style="text-align: center;">
          <a href="${process.env.FRONTEND_URL}/dashboard" class="btn">Przejdź do dashboardu</a>
        </div>
        <p>Jeśli masz jakiekolwiek pytania, nie wahaj się skontaktować z naszym zespołem wsparcia.</p>
        <p>Powodzenia w nauce!</p>
      `;

      await transporter.sendMail({
        from: `"CodeLinesJS" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Witaj w CodeLinesJS!",
        html: createEmailTemplate('Witaj w CodeLinesJS!', welcomeContent)
      });
    } catch (emailError) {
      console.error('Błąd wysyłania emaila powitalnego:', emailError);
    }

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

    await StreakService.updateUserActivity(user._id, false);

    const updatedUser = await User.findById(user._id);

    const token = generateToken(updatedUser);
    res.json({
      token,
      user: {
        id: updatedUser._id,
        email: updatedUser.email,
        username: updatedUser.username,
        avatar: updatedUser.avatar,
        stats: updatedUser.stats
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

    const emailContent = `
      <p>Cześć ${user.username || 'Użytkowniku'}!</p>
      <p>Otrzymaliśmy prośbę o reset hasła dla Twojego konta w CodeLinesJS.</p>
      <p>Aby zresetować hasło, kliknij poniższy przycisk:</p>
      <div style="text-align: center;">
        <a href="${resetUrl}" class="btn">Zresetuj hasło</a>
      </div>
      <p>Jeśli przycisk nie działa, skopiuj i wklej poniższy link do przeglądarki:</p>
      <div class="code-block">${resetUrl}</div>
      <p>Link wygaśnie za godzinę ze względów bezpieczeństwa.</p>
      <p><strong>Nie prosiłeś o reset hasła?</strong> Jeśli to nie Ty prosiłeś o reset hasła, zignoruj tę wiadomość lub skontaktuj się z naszym zespołem wsparcia.</p>
    `;

    await transporter.sendMail({
      from: `"CodeLinesJS" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset hasła w CodeLinesJS",
      html: createEmailTemplate('Reset hasła', emailContent)
    });

    res.json({
      message: 'Wysłano email do resetowania hasła'
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token, password, confirmPassword } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Token i nowe hasło są wymagane'
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        status: 'error',
        message: 'Hasła nie są identyczne'
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        status: 'error',
        message: 'Hasło musi mieć co najmniej 8 znaków'
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.error('Błąd weryfikacji tokenu:', error);
      return res.status(400).json({
        status: 'error',
        message: 'Nieprawidłowy lub wygasły token resetowania hasła'
      });
    }

    const user = await User.findOne({
      _id: decoded.userId,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        status: 'error',
        message: 'Token resetowania hasła jest nieprawidłowy lub wygasł'
      });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    
    user.passwordChangedAt = new Date();
    
    await user.save();

    try {
      await sendEmail({
        to: user.email,
        subject: "Hasło zostało zmienione",
        html: createEmailTemplate('Potwierdzenie zmiany hasła', `
          <p>Cześć ${user.username || 'Użytkowniku'}!</p>
          <p>Twoje hasło zostało pomyślnie zmienione.</p>
          <p>Jeśli to nie Ty dokonałeś tej zmiany, natychmiast skontaktuj się z naszym zespołem wsparcia.</p>
          <div style="text-align: center;">
            <a href="${process.env.FRONTEND_URL}/login" class="btn">Zaloguj się</a>
          </div>
        `)
      });
    } catch (emailError) {
      console.error('Błąd wysyłania emaila potwierdzającego zmianę hasła:', emailError);
    }

    const authToken = generateToken(user);

    res.status(200).json({
      status: 'success',
      message: 'Hasło zostało pomyślnie zmienione',
      token: authToken,
      user: {
        id: user._id,
        email: user.email,
        username: user.username
      }
    });
  } catch (error) {
    console.error('Błąd resetowania hasła:', error);
    next(error);
  }
};

export const verifyToken = async (req, res) => {
  try {
    console.log('verifyToken - req.user:', req.user);
    console.log('verifyToken - headers:', JSON.stringify(req.headers));
    
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      console.log('verifyToken - użytkownik nie znaleziony dla ID:', req.user.userId);
      return res.status(401).json({ error: 'Użytkownik nie znaleziony' });
    }
    
    console.log('verifyToken - użytkownik znaleziony:', user.email);
    res.json(user);
  } catch (error) {
    console.error('verifyToken - błąd:', error);
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
        const welcomeContent = `
          <p>Cześć ${name || username}!</p>
          <p>Witamy w społeczności CodeLinesJS! 🎉</p>
          <p>Twoje konto zostało pomyślnie utworzone i jesteś gotowy, aby rozpocząć swoją przygodę z JavaScript.</p>
          <div class="code-block">
            console.log("Witaj w CodeLinesJS!");
          </div>
          <p>Co możesz teraz zrobić?</p>
          <ul>
            <li>Rozpocznij naukę od podstawowych lekcji</li>
            <li>Rozwiązuj interaktywne wyzwania</li>
            <li>Dołącz do naszej społeczności programistów</li>
          </ul>
          <div style="text-align: center;">
            <a href="${process.env.FRONTEND_URL}/dashboard" class="btn">Przejdź do dashboardu</a>
          </div>
          <p>Jeśli masz jakiekolwiek pytania, nie wahaj się skontaktować z naszym zespołem wsparcia.</p>
          <p>Powodzenia w nauce!</p>
        `;

        await transporter.sendMail({
          from: `"CodeLinesJS" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: "Witaj w CodeLinesJS!",
          html: createEmailTemplate('Witaj w CodeLinesJS!', welcomeContent)
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