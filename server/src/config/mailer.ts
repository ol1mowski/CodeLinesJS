// @ts-nocheck
import sgMail from '@sendgrid/mail';
import config from './config.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import sanitizeHtml from 'sanitize-html';

dotenv.config();

sgMail.setApiKey(config.email.sendgridApiKey || '');

type EmailOptions = {
  to: string;
  from?: string;
  subject: string;
  html: string;
}

type EmailResult = {
  success: boolean;
  error?: any;
}

export const sendEmail = async (options: EmailOptions): Promise<EmailResult> => {
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
    if (error && typeof error === 'object' && 'response' in error) {
      console.error((error as any).response?.body);
    }
    return { success: false, error };
  }
};

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  connectionTimeout: 60000,
  greetingTimeout: 30000,
  socketTimeout: 60000,
  debug: false,
  logger: false,
  tls: {
    rejectUnauthorized: false
  }
});

transporter.verify(function(error, success) {
  if (error) {
    console.error('Problem z konfiguracją transportera e-mail:', error);
    console.log('Dane konfiguracyjne:', {
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE,
      user: process.env.EMAIL_USER ? 'SKONFIGUROWANO' : 'BRAK',
      pass: process.env.EMAIL_PASSWORD ? 'SKONFIGUROWANO' : 'BRAK'
    });
  } else {
    console.log('Serwer poczty skonfigurowany poprawnie');
  }
});

export const sendMailWithFallback = async (options: {
  from: string;
  to: string;
  subject: string;
  html: string;
}) => {
  if (config.email.sendgridApiKey) {
    try {
      await sgMail.send({
        to: options.to,
        from: options.from,
        subject: options.subject,
        html: options.html,
      });
      return { success: true, provider: 'sendgrid' };
    } catch (sgError) {
      console.error('Błąd SendGrid:', sgError);
      return { success: false, error: sgError };
    }
  } else {
    try {
      const result = await transporter.sendMail(options);
      return { success: true, result };
    } catch (error) {
      console.error('Błąd Nodemailer:', error);
      return { success: false, error };
    }
  }
};

const sanitizeContent = (content: string | undefined): string => {
  if (!content) return '';
  
  return sanitizeHtml(content, {
    allowedTags: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
      'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
      'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'span'
    ],
    allowedAttributes: {
      a: ['href', 'name', 'target', 'class'],
      div: ['class'],
      span: ['class'],
      p: ['class'],
      table: ['class'],
      img: ['src', 'alt', 'class'],
    },
    disallowedTagsMode: 'recursiveEscape',
    allowedStyles: {
      '*': {
        'color': [/^#(0x)?[0-9a-f]+$/i, /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/],
        'text-align': [/^left$/, /^right$/, /^center$/, /^justify$/],
        'font-size': [/^\d+(?:px|em|rem|%)$/],
      }
    },
    allowProtocolRelative: false,
    allowedSchemes: ['http', 'https', 'mailto'],
    allowedSchemesByTag: {
      a: ['http', 'https', 'mailto']
    }
  });
};

interface EmailTemplateParams {
  title: string;
  preheader?: string;
  content: string;
}

export const createEmailTemplate = (params: EmailTemplateParams | string, content?: string): string => {
  const { title, preheader = '', content: contentText } = typeof params === 'object' ? params : { 
    title: params, 
    preheader: '', 
    content: content || '' 
  };
  
  const safeTitle = sanitizeContent(title);
  const safePreheader = sanitizeContent(preheader);
  const safeContent = sanitizeContent(contentText);
  
  const currentYear = new Date().getFullYear();
  
  return `
    <!DOCTYPE html>
    <html lang="pl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <meta name="x-apple-disable-message-reformatting">
      <title>${safeTitle}</title>
      <meta name="color-scheme" content="dark">
      <meta name="supported-color-schemes" content="dark">
      <style>
        /* Globalne style */
        body {
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #1e1e1e;
          color: #e8e8e8;
        }
        
        /* Ukryty preheader */
        .preheader {
          display: none !important;
          visibility: hidden;
          mso-hide: all;
          font-size: 1px;
          line-height: 1px;
          max-height: 0;
          max-width: 0;
          opacity: 0;
          overflow: hidden;
        }
        
        /* Kontener główny */
        .email-container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        
        /* Główne ciało maila */
        .email-body {
          background-color: #2d2d2d;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          overflow: hidden;
          border: 1px solid #3e3e3e;
        }
        
        /* Nagłówek z logo */
        .header {
          background-color: #323330;
          padding: 25px 20px;
          text-align: center;
          border-bottom: 3px solid #f7df1e;
        }
        
        /* Tytuł w nagłówku */
        .header h1 {
          color: #f7df1e;
          margin: 0;
          font-size: 24px;
          letter-spacing: 0.5px;
        }
        
        /* Zawartość wiadomości */
        .content {
          padding: 30px 20px;
          color: #e8e8e8;
          line-height: 1.6;
        }
        
        /* Blok kodu */
        .code-block {
          background-color: #202020;
          border-radius: 5px;
          padding: 15px;
          margin: 15px 0;
          font-family: 'Courier New', monospace;
          white-space: pre-wrap;
          word-break: break-all;
          color: #e8e8e8;
          border-left: 4px solid #f7df1e;
          overflow-x: auto;
        }
        
        /* Przyciski w stylu JS */
        .btn {
          display: inline-block;
          background-color: #f7df1e;
          color: #323330 !important;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 5px;
          font-weight: 600;
          margin: 15px 0;
          text-align: center;
        }
        
        /* Stopka */
        .footer {
          padding: 20px;
          text-align: center;
          color: #a0a0a0;
          font-size: 14px;
          background-color: #252525;
          border-top: 1px solid #3e3e3e;
        }
        
        /* Linki */
        a {
          color: #f7df1e;
          text-decoration: none;
        }
        
        a:hover {
          text-decoration: underline;
        }
        
        /* Listy */
        ul {
          padding-left: 20px;
        }
        
        ul li {
          margin-bottom: 8px;
        }
        
        /* Wybrane elementy JavaScript */
        .js-keyword {
          color: #f7df1e;
          font-weight: bold;
        }
        
        /* Fixy dla klientów poczty Apple */
        a[x-apple-data-detectors] {
          color: inherit !important;
          text-decoration: none !important;
          font-size: inherit !important;
          font-family: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
        }
        
        /* Obsługa dark mode */
        @media (prefers-color-scheme: dark) {
          .email-body { background-color: #2d2d2d !important; }
          .header { background-color: #323330 !important; }
          .content { color: #e8e8e8 !important; }
          .code-block { background-color: #202020 !important; }
          .footer { background-color: #252525 !important; }
          body { background-color: #1e1e1e !important; color: #e8e8e8 !important; }
        }
      </style>
    </head>
    <body>
      <span class="preheader">${safePreheader}</span>
      <div class="email-container">
        <div class="email-body">
          <div class="header">
            <h1>${safeTitle}</h1>
          </div>
          <div class="content">
            ${safeContent}
          </div>
          <div class="footer">
            <p>© ${currentYear} <span class="js-keyword">CodeLinesJS</span>. Wszystkie prawa zastrzeżone.</p>
            <p>Jeśli nie prosiłeś o tę wiadomość, zignoruj ją lub skontaktuj się z nami.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}; 