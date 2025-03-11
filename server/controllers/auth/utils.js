import jwt from 'jsonwebtoken';
import { transporter, createEmailTemplate } from '../../config/mailer.js';

export const generateToken = (user, expiresIn = '24h') => {
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
      username: user.username,
      accountType: user.accountType
    },
    process.env.JWT_SECRET,
    { expiresIn }
  );
};

export const sendWelcomeEmail = async (user) => {
  const welcomeContent = `
    <p>Cześć ${user.username}!</p>
    <p>Witamy w społeczności CodeLinesJS! 🎉</p>
    <p>Twoje konto zostało pomyślnie utworzone i jesteś gotowy, aby rozpocząć swoją przygodę z JavaScript.</p>
    <div class="code-block">
      const user = {
        name: "${user.username}",
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

  return transporter.sendMail({
    from: `CodeLinesJS <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: "Witaj w CodeLinesJS!",
    html: createEmailTemplate('Witaj w CodeLinesJS!', welcomeContent)
  });
};

export const sendPasswordResetEmail = async (user, resetUrl) => {
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

  return transporter.sendMail({
    from: `CodeLinesJS <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: "Reset hasła w CodeLinesJS",
    html: createEmailTemplate('Reset hasła', emailContent)
  });
};

export const sendPasswordChangedEmail = async (user) => {
  return transporter.sendMail({
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
}; 