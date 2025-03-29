import { createEmailTemplate, sendMailWithFallback } from '../config/mailer.js';
import config from '../config/config.js';
import { IUser } from '../types/user.types.js';

export class EmailService {
  async sendWelcomeEmail(user: IUser): Promise<void> {
    const subject = 'Witamy w CodeLinesJS!';
    const html = createEmailTemplate({
      title: 'Witaj w CodeLinesJS!',
      preheader: 'Dziękujemy za dołączenie do naszej społeczności.',
      content: `
        <p>Cześć <span class="js-keyword">${user.username}</span>!</p>
        <p>Cieszymy się, że dołączyłeś/aś do naszej społeczności. Jesteśmy tutaj, aby pomóc Ci rozwijać umiejętności programowania w JavaScript.</p>
        <div class="code-block">
          // Twój profil został utworzony
          const user = {
            username: "${user.username}",
            email: "${user.email}",
            status: "active",
            joined: "${new Date().toLocaleDateString('pl-PL')}"
          };
          
          console.log(\`Witaj, \${user.username}!\`);
        </div>
        <p>Możesz zalogować się do swojego konta używając adresu email: <span class="js-keyword">${user.email}</span></p>
        <a href="https://www.codelinesjs.pl/login" class="btn">Zaloguj się</a>
        <p>Pozdrawiamy,<br/>Zespół <span class="js-keyword">CodeLinesJS</span></p>
      `
    });

    try {
      await sendMailWithFallback({
        from: config.email.from,
        to: user.email,
        subject,
        html
      });
    } catch (error) {
      console.error('Nie udało się wysłać emaila powitalnego:', error);
    }
  }

  async sendPasswordResetEmail(user: IUser, resetUrl: string): Promise<void> {
    const subject = 'Resetowanie hasła w CodeLinesJS';
    const html = createEmailTemplate({
      title: 'Resetowanie hasła',
      preheader: 'Instrukcje dotyczące resetowania hasła w CodeLinesJS.',
      content: `
        <p>Cześć <span class="js-keyword">${user.username}</span>!</p>
        <p>Otrzymaliśmy prośbę o resetowanie Twojego hasła. Jeśli to nie Ty, zignoruj tę wiadomość.</p>
        <div class="code-block">
          // Proces resetowania hasła
          const resetPassword = async () => {
            try {
              // Token ważny przez 1 godzinę
              await validateToken();
              await updatePassword();
              return { success: true };
            } catch (error) {
              console.error("Token wygasł lub jest nieprawidłowy");
              return { success: false };
            }
          };
        </div>
        <p>Aby zresetować hasło, kliknij w poniższy link (ważny przez 1 godzinę):</p>
        <a href="${resetUrl}" class="btn">Resetuj hasło</a>
        <p>Jeśli przycisk nie działa, skopiuj i wklej poniższy URL do przeglądarki:</p>
        <p><code>${resetUrl}</code></p>
        <p>Pozdrawiamy,<br/>Zespół <span class="js-keyword">CodeLinesJS</span></p>
      `
    });

    try {
      await sendMailWithFallback({
        from: config.email.from,
        to: user.email,
        subject,
        html
      });
    } catch (error) {
      console.error('Błąd wysyłania emaila resetowania hasła:', error);
    }
  }

  async sendPasswordChangedEmail(user: IUser): Promise<void> {
    const subject = 'Potwierdzenie zmiany hasła w CodeLinesJS';
    const html = createEmailTemplate({
      title: 'Hasło zostało zmienione',
      preheader: 'Potwierdzenie zmiany hasła w CodeLinesJS.',
      content: `
        <p>Cześć <span class="js-keyword">${user.username}</span>!</p>
        <p>Twoje hasło zostało pomyślnie zmienione.</p>
        <div class="code-block">
          // Hasło zaktualizowane
          const security = {
            passwordUpdated: new Date().toISOString(),
            status: "success",
            action: "Jeśli to nie Ty zmieniłeś/aś hasło, skontaktuj się z nami natychmiast"
          };
        </div>
        <p>Możesz zalogować się używając nowego hasła:</p>
        <a href="https://www.codelinesjs.pl/login" class="btn">Zaloguj się</a>
        <p>Jeśli to nie Ty zmieniłeś/aś hasło, natychmiast skontaktuj się z nami.</p>
        <p>Pozdrawiamy,<br/>Zespół <span class="js-keyword">CodeLinesJS</span></p>
      `
    });

    try {
      await sendMailWithFallback({
        from: config.email.from,
        to: user.email,
        subject,
        html
      });
    } catch (error) {
      console.error('Nie udało się wysłać emaila potwierdzającego zmianę hasła:', error);
    }
  }
}

export const sendBugReportConfirmation = async (email: string, title: string) => {
  try {
    const emailContent = `
      <p>Dziękujemy za zgłoszenie problemu w <span class="js-keyword">CodeLinesJS</span>!</p>
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
        <li>Nasz zespół <span class="js-keyword">przeanalizuje</span> zgłoszenie</li>
        <li>Nadamy mu odpowiedni <span class="js-keyword">priorytet</span></li>
        <li>Poinformujemy Cię o <span class="js-keyword">rozwiązaniu</span> problemu</li>
      </ul>
      <a href="https://www.codelinesjs.pl/kontakt" class="btn">Skontaktuj się z nami</a>
      <p>Doceniamy Twój wkład w ulepszanie naszej platformy!</p>
    `;

    const result = await sendMailWithFallback({
      from: `CodeLinesJS <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Potwierdzenie zgłoszenia problemu w CodeLinesJS",
      html: createEmailTemplate('Zgłoszenie przyjęte', emailContent)
    });

    return {
      success: result.success,
      messageId: result.result?.messageId,
      previewUrl: process.env.NODE_ENV === 'development' ? (result.result as any)?.previewUrl : null
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
      <p>Status Twojego zgłoszenia został <span class="js-keyword">zaktualizowany</span>!</p>
      <p>Zgłoszenie: <strong>${title}</strong></p>
      <p>Nowy status: <strong class="js-keyword">${statusText}</strong></p>
      <div class="code-block">
        // Aktualizacja statusu
        const report = {
          title: "${title}",
          status: "${statusText}",
          updatedAt: "${new Date().toLocaleString('pl-PL')}"
        };
        
        // Aktualny stan zgłoszenia
        console.log(\`Status zgłoszenia: \${report.status}\`);
      </div>
      <p>Śledź postęp swojego zgłoszenia bezpośrednio na platformie:</p>
      <a href="https://www.codelinesjs.pl/bug-reports" class="btn">Przejdź do zgłoszeń</a>
      <p>Dziękujemy za Twoją cierpliwość i wkład w ulepszanie <span class="js-keyword">CodeLinesJS</span>!</p>
    `;

    const result = await sendMailWithFallback({
      from: `CodeLinesJS <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Aktualizacja zgłoszenia w CodeLinesJS: ${statusText}`,
      html: createEmailTemplate('Status zgłoszenia', emailContent)
    });

    return {
      success: result.success,
      messageId: result.result?.messageId,
      previewUrl: process.env.NODE_ENV === 'development' ? (result.result as any)?.previewUrl : null
    };
  } catch (error) {
    console.error('Błąd podczas wysyłania aktualizacji statusu zgłoszenia:', error);
    return {
      success: false,
      error: error.message
    };
  }
}; 