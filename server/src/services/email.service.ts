import { transporter, createEmailTemplate } from '../config/mailer.js';

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