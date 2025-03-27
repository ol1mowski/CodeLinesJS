import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { transporter, createEmailTemplate } from '../../config/mailer.js';
import config from '../../config/config.js';

/**
 * Generuje bezpieczny token JWT z dodatkowymi polami bezpieczeństwa
 * @param {Object} user - Obiekt użytkownika
 * @param {string} expiresIn - Czas wygaśnięcia tokenu
 * @returns {string} Token JWT
 */
export const generateToken = (user, expiresIn = config.jwt.expiresIn) => {
  // Dodanie unikalnego identyfikatora tokenu (jti)
  const tokenId = crypto.randomBytes(16).toString('hex');
  
  // Dodatkowe pola bezpieczeństwa w tokenie
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
      username: user.username,
      accountType: user.accountType,
      role: user.role || 'user',
      iat: Math.floor(Date.now() / 1000), // czas wygenerowania tokenu
      jti: tokenId, // unikalny identyfikator tokenu
    },
    process.env.JWT_SECRET,
    { 
      expiresIn,
      algorithm: 'HS256' // jawnie określamy algorytm
    }
  );
};

// Generuj token resetu hasła
export const generatePasswordResetToken = () => {
  const resetToken = crypto.randomBytes(32).toString('hex');
  
  // Przechowujemy hash tokenu w bazie
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
    
  // Czas wygaśnięcia tokenu: 1 godzina
  const expiresIn = Date.now() + config.security.passwordResetTokenExpiresIn;
  
  return { resetToken, hashedToken, expiresIn };
};

export const sendWelcomeEmail = async (user) => {
  const subject = 'Witamy w CodeLinesJS!';
  const html = createEmailTemplate({
    title: 'Witaj w CodeLinesJS!',
    preheader: 'Dziękujemy za dołączenie do naszej społeczności.',
    content: `
      <p>Cześć ${user.username}!</p>
      <p>Cieszymy się, że dołączyłeś/aś do naszej społeczności. Jesteśmy tutaj, aby pomóc Ci rozwijać umiejętności programowania w JavaScript.</p>
      <p>Możesz zalogować się do swojego konta używając adresu email: ${user.email}</p>
      <p>Pozdrawiamy,<br/>Zespół CodeLinesJS</p>
    `
  });

  await transporter.sendMail({
    from: config.email.from,
    to: user.email,
    subject,
    html
  });
};

export const sendPasswordResetEmail = async (user, resetUrl) => {
  const subject = 'Resetowanie hasła w CodeLinesJS';
  const html = createEmailTemplate({
    title: 'Resetowanie hasła',
    preheader: 'Instrukcje dotyczące resetowania hasła w CodeLinesJS.',
    content: `
      <p>Cześć ${user.username}!</p>
      <p>Otrzymaliśmy prośbę o resetowanie Twojego hasła. Jeśli to nie Ty, zignoruj tę wiadomość.</p>
      <p>Aby zresetować hasło, kliknij w poniższy link (ważny przez 1 godzinę):</p>
      <p><a href="${resetUrl}" style="padding: 10px 15px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Resetuj hasło</a></p>
      <p>Jeśli link nie działa, skopiuj i wklej poniższy URL do przeglądarki:</p>
      <p>${resetUrl}</p>
      <p>Pozdrawiamy,<br/>Zespół CodeLinesJS</p>
    `
  });

  await transporter.sendMail({
    from: config.email.from,
    to: user.email,
    subject,
    html
  });
};

export const sendPasswordChangedEmail = async (user) => {
  const subject = 'Potwierdzenie zmiany hasła w CodeLinesJS';
  const html = createEmailTemplate({
    title: 'Hasło zostało zmienione',
    preheader: 'Potwierdzenie zmiany hasła w CodeLinesJS.',
    content: `
      <p>Cześć ${user.username}!</p>
      <p>Twoje hasło zostało pomyślnie zmienione.</p>
      <p>Jeśli to nie Ty zmieniłeś/aś hasło, natychmiast skontaktuj się z nami.</p>
      <p>Pozdrawiamy,<br/>Zespół CodeLinesJS</p>
    `
  });

  await transporter.sendMail({
    from: config.email.from,
    to: user.email,
    subject,
    html
  });
}; 