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
  port: process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT) : undefined,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

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
      <meta name="color-scheme" content="light dark">
      <meta name="supported-color-schemes" content="light dark">
      <style>
        @media (prefers-color-scheme: dark) {
          body { background-color: #121212 !important; color: #ffffff !important; }
          .email-body { background-color: #1e1e1e !important; }
          .header, .content, .footer { color: #f5f5f5 !important; }
        }
        
        a[x-apple-data-detectors] {
          color: inherit !important;
          text-decoration: none !important;
          font-size: inherit !important;
          font-family: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
        }
        
          body {
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f7f7f7;
          color: #333333;
        }
        
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
        
        .email-container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .email-body {
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
          overflow: hidden;
        }
        
        .header {
          background-color: #4f45e4;
          padding: 20px;
          text-align: center;
        }
        
        .header h1 {
          color: #ffffff;
          margin: 0;
          font-size: 24px;
        }
        
        .content {
          padding: 30px 20px;
          color: #333333;
          line-height: 1.6;
        }
        
        .code-block {
          background-color: #f5f5f5;
          border-radius: 5px;
          padding: 15px;
          margin: 15px 0;
          font-family: monospace;
          white-space: pre-wrap;
          word-break: break-all;
          color: #333;
          border-left: 4px solid #4f45e4;
          overflow-x: auto;
        }
        
        .btn {
          display: inline-block;
          background-color: #4f45e4;
          color: white !important;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 5px;
          font-weight: 600;
          margin: 15px 0;
        }
        
        .footer {
          padding: 20px;
          text-align: center;
          color: #666666;
          font-size: 14px;
          background-color: #f8f8f8;
        }
        
        ul {
          padding-left: 20px;
        }
        
        p, ul li {
          margin-bottom: 10px;
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
            <p>&copy; ${currentYear} CodeLinesJS. Wszystkie prawa zastrzeżone.</p>
            <p>Jeśli nie prosiłeś o tę wiadomość, zignoruj ją lub skontaktuj się z nami.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}; 