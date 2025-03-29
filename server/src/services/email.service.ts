import { transporter, createEmailTemplate } from '../config/mailer.js';
import config from '../config/config.js';
import { IUser } from '../types/user.types.js';

/**
 * Serwis do obsługi wysyłania wiadomości email
 */
export class EmailService {
  /**
   * Wysyła email powitalny do nowego użytkownika
   * @param user - Obiekt użytkownika
   */
  async sendWelcomeEmail(user: IUser): Promise<void> {
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
  }

  /**
   * Wysyła email z instrukcjami resetowania hasła
   * @param user - Obiekt użytkownika
   * @param resetUrl - Link do resetowania hasła
   */
  async sendPasswordResetEmail(user: IUser, resetUrl: string): Promise<void> {
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
  }

  /**
   * Wysyła email potwierdzający zmianę hasła
   * @param user - Obiekt użytkownika
   */
  async sendPasswordChangedEmail(user: IUser): Promise<void> {
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
  }
}

export const sendBugReportConfirmation = async (email: string, title: string) => {
  try {
    const emailContent = `
      <p>Dziękujemy za zgłoszenie problemu w CodeLinesJS!</p>
      <p>Otrzymaliśmy Twoje zgłoszenie dotyczące: <strong>${title}</strong></p>
      <p>Nasz zespół przeanalizuje zgłoszenie i podejmie odpowiednie działania. Możemy skontaktować się z Tobą, jeśli będziemy potrzebować dodatkowych informacji.</p>
      <div class="code-block">
        // Status Twojego zgłoszenia
        const reportStatus = {
          received: true,
          inReview: true,
          priority: "normal"
        };
        
        console.log("Dziękujemy za pomoc w ulepszaniu CodeLinesJS!");
      </div>
      <p>Co się stanie dalej?</p>
      <ul>
        <li>Nasz zespół przeanalizuje zgłoszenie</li>
        <li>Nadamy mu odpowiedni priorytet</li>
        <li>Poinformujemy Cię o rozwiązaniu problemu</li>
      </ul>
      <p>Doceniamy Twój wkład w ulepszanie naszej platformy!</p>
    `;

    const result = await transporter.sendMail({
      from: `CodeLinesJS <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Potwierdzenie zgłoszenia problemu w CodeLinesJS",
      html: createEmailTemplate('Zgłoszenie przyjęte', emailContent)
    });

    return {
      success: true,
      messageId: result.messageId,
      previewUrl: process.env.NODE_ENV === 'development' ? (result as any).previewUrl : null
    };
  } catch (error) {
    console.error('Błąd podczas wysyłania potwierdzenia zgłoszenia:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

export const sendReportStatusUpdate = async (email: string, title: string, status: string) => {
  try {
    let statusText;
    switch (status) {
      case 'in_progress':
        statusText = 'w trakcie realizacji';
        break;
      case 'resolved':
        statusText = 'rozwiązane';
        break;
      case 'closed':
        statusText = 'zamknięte';
        break;
      default:
        statusText = 'nowe';
    }

    const emailContent = `
      <p>Status Twojego zgłoszenia został zaktualizowany!</p>
      <p>Zgłoszenie: <strong>${title}</strong></p>
      <p>Nowy status: <strong>${statusText}</strong></p>
      <div class="code-block">
        // Aktualizacja statusu
        const report = {
          title: "${title}",
          status: "${statusText}",
          updatedAt: "${new Date().toLocaleString('pl-PL')}"
        };
      </div>
      <p>Dziękujemy za Twoją cierpliwość i wkład w ulepszanie CodeLinesJS!</p>
    `;

    const result = await transporter.sendMail({
      from: `CodeLinesJS <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Aktualizacja zgłoszenia w CodeLinesJS: ${statusText}`,
      html: createEmailTemplate('Status zgłoszenia', emailContent)
    });

    return {
      success: true,
      messageId: result.messageId,
      previewUrl: process.env.NODE_ENV === 'development' ? (result as any).previewUrl : null
    };
  } catch (error) {
    console.error('Błąd podczas wysyłania aktualizacji statusu zgłoszenia:', error);
    return {
      success: false,
      error: error.message
    };
  }
}; 