import sgMail from '@sendgrid/mail';
import config from './config.js';

sgMail.setApiKey(config.email.sendgridApiKey);
                
export const sendEmail = async (options) => {
  const msg = {
    to: options.to,
    from: options.from || config.email.from,
    subject: options.subject,
    html: options.html,
  };
  
  try {
    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    console.error('Błąd podczas wysyłania e-maila:', error);
    if (error.response) {
      console.error(error.response.body);
    }
    return { success: false, error };
  }
};

export const transporter = {
  sendMail: async (options) => {
    return sendEmail(options);
  }
};

export const createEmailTemplate = (title, content) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f9f9f9;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          background-color: #f7df1e; /* JavaScript żółty */
          color: #000000; /* JavaScript czarny */
          padding: 20px;
          text-align: center;
          border-radius: 8px 8px 0 0;
          margin-bottom: 20px;
        }
        .content {
          padding: 20px;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #eee;
          color: #777;
          font-size: 12px;
        }
        .btn {
          display: inline-block;
          background-color: #f7df1e;
          color: #000000;
          text-decoration: none;
          padding: 12px 25px;
          border-radius: 4px;
          font-weight: bold;
          margin: 20px 0;
          text-align: center;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .btn:hover {
          background-color: #f0d500;
        }
        .code-block {
          background-color: #282c34;
          color: #f7df1e;
          padding: 15px;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          margin: 15px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${title}</h1>
        </div>
        <div class="content">
          ${content}
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} CodeLinesJS. Wszystkie prawa zastrzeżone.</p>
          <p>Jeśli nie prosiłeś o tę wiadomość, zignoruj ją lub skontaktuj się z nami.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};