import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
}); 

export const createEmailTemplate = (title, content) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@400;700&display=swap');
        
        :root {
          --js-yellow: #f7df1e;
          --js-yellow-hover: rgba(247, 223, 30, 0.9);
          --js-yellow-light: rgba(247, 223, 30, 0.1);
          --js-yellow-medium: rgba(247, 223, 30, 0.2);
          --dark: #1a1a1a;
          --dark-light: rgba(26, 26, 26, 0.3);
          --dark-medium: rgba(26, 26, 26, 0.5);
          --gradient-start: #f7df1e;
          --gradient-end: #f0c419;
          --text-primary: #242424;
          --text-secondary: #555;
          --background: #f9f9f9;
          --card-bg: #ffffff;
        }
        
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        body {
          font-family: 'Space Grotesk', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: var(--text-primary);
          background-color: var(--background);
          margin: 0;
          padding: 0;
        }
        
        .wrapper {
          width: 100%;
          background-color: var(--background);
          padding: 40px 0;
        }
        
        .container {
          max-width: 650px;
          margin: 0 auto;
          background-color: var(--card-bg);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
          position: relative;
        }
        
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
          z-index: 0;
          opacity: 0.6;
        }
        
        .blob-1 {
          top: -50px;
          right: -50px;
          width: 200px;
          height: 200px;
          background-color: var(--js-yellow);
          mix-blend-mode: multiply;
        }
        
        .blob-2 {
          bottom: -30px;
          left: -60px;
          width: 180px;
          height: 180px;
          background-color: var(--js-yellow);
          mix-blend-mode: multiply;
        }
        
        .header {
          background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
          padding: 40px 20px;
          text-align: center;
          position: relative;
          z-index: 1;
        }
        
        .logo {
          margin-bottom: 20px;
        }
        
        .logo img {
          height: 50px;
          width: auto;
        }
        
        .header h1 {
          color: var(--dark);
          font-weight: 700;
          font-size: 28px;
          margin: 0;
          letter-spacing: -0.5px;
        }
        
        .header-accent {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 6px;
          background: repeating-linear-gradient(
            -45deg,
            var(--dark),
            var(--dark) 10px,
            var(--js-yellow) 10px,
            var(--js-yellow) 20px
          );
        }
        
        .content {
          padding: 40px;
          position: relative;
          z-index: 1;
          background-color: var(--card-bg);
        }
        
        .content p {
          margin-bottom: 20px;
          color: var(--text-secondary);
        }
        
        .content h2 {
          color: var(--dark);
          margin-bottom: 20px;
          font-weight: 700;
          font-size: 22px;
        }
        
        .content ul {
          margin-bottom: 20px;
          padding-left: 20px;
        }
        
        .content li {
          margin-bottom: 10px;
          color: var(--text-secondary);
        }
        
        .btn {
          display: inline-block;
          background-color: var(--js-yellow);
          color: var(--dark) !important;
          text-decoration: none;
          padding: 14px 28px;
          border-radius: 8px;
          font-weight: 700;
          margin: 25px 0;
          text-align: center;
          box-shadow: 0 4px 12px rgba(247, 223, 30, 0.3);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          position: relative;
          overflow: hidden;
        }
        
        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(247, 223, 30, 0.4);
        }
        
        .btn::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: translateX(-100%);
        }
        
        .btn:hover::after {
          transform: translateX(100%);
          transition: transform 0.6s ease;
        }
        
        .code-block {
          background-color: var(--dark);
          color: var(--js-yellow);
          padding: 20px;
          border-radius: 8px;
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          margin: 25px 0;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .code-block::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background-color: var(--js-yellow);
        }
        
        .divider {
          height: 1px;
          background: linear-gradient(
            to right,
            rgba(0, 0, 0, 0.02),
            rgba(0, 0, 0, 0.1),
            rgba(0, 0, 0, 0.02)
          );
          margin: 30px 0;
        }
        
        .card {
          background-color: var(--js-yellow-light);
          border-radius: 8px;
          padding: 25px;
          margin: 25px 0;
          border-left: 4px solid var(--js-yellow);
        }
        
        .footer {
          text-align: center;
          padding: 30px 40px;
          background-color: var(--js-yellow);
          position: relative;
          z-index: 1;
        }
        
        .social-links {
          margin-bottom: 20px;
        }
        
        .social-link {
          display: inline-block;
          margin: 0 10px;
          color: var(--dark);
          text-decoration: none;
          font-weight: 500;
        }
        
        .copyright {
          color: var(--dark-medium);
          font-size: 14px;
          margin-bottom: 10px;
        }
        
        .disclaimer {
          color: var(--dark-light);
          font-size: 12px;
        }
        
        @media only screen and (max-width: 650px) {
          .container {
            width: 90%;
            margin: 0 auto;
          }
          
          .content {
            padding: 30px 20px;
          }
          
          .header {
            padding: 30px 20px;
          }
          
          .footer {
            padding: 25px 20px;
          }
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">
          <div class="blob blob-1"></div>
          <div class="blob blob-2"></div>
          
          <div class="header">
            <div class="logo">
              <img src="https://i.ibb.co/Qf9Vf3B/codelines-logo.png" alt="CodeLinesJS Logo" />
            </div>
            <h1>${title}</h1>
            <div class="header-accent"></div>
          </div>
          
          <div class="content">
            ${content}
            
            <div class="card">
              <h2>Rozwijaj swoje umiejętności z CodeLinesJS</h2>
              <p>Dołącz do naszej społeczności programistów JavaScript i podnieś swoje umiejętności na wyższy poziom.</p>
              <a href="https://codelinejs.com/dashboard" class="btn">Przejdź do dashboardu</a>
            </div>
          </div>
          
          <div class="footer">
            <div class="social-links">
              <a href="https://github.com/codelinejs" class="social-link">GitHub</a>
            </div>
            <p class="copyright">&copy; ${new Date().getFullYear()} CodeLinesJS. Wszystkie prawa zastrzeżone.</p>
            <p class="disclaimer">Jeśli nie prosiłeś o tę wiadomość, zignoruj ją lub <a href="mailto:kontakt@codelinejs.com">skontaktuj się z nami</a>.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};