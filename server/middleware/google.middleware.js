import fetch from 'node-fetch';

export const configureGoogleSignIn = (app) => {
  app.options('/google-signin-proxy', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.setHeader('Access-Control-Max-Age', '86400');
    res.setHeader('Permissions-Policy', 'identity-credentials-get=(self "https://accounts.google.com")');
    res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com https://*.gstatic.com; connect-src 'self' https://accounts.google.com https://*.googleapis.com https://codelinesjs.pl https://www.codelinesjs.pl http://localhost:*; frame-src 'self' https://accounts.google.com; img-src 'self' data: https://*.googleusercontent.com https://*.gstatic.com https://res.cloudinary.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://accounts.google.com; font-src 'self' https://fonts.gstatic.com");
    res.status(204).end();
  });
  
  app.use('/google-signin-proxy', async (req, res) => {
    try {
      const targetUrl = 'https://accounts.google.com/gsi/transform';
      
      try {
        const response = await fetch(targetUrl, {
          method: req.method,
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': req.headers['user-agent'],
            'Origin': req.headers.origin || 'https://codelinesjs.pl'
          },
          body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined
        });
        
        const data = await response.text();
        
        response.headers.forEach((value, key) => {
          res.setHeader(key, value);
        });
        
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.setHeader('Permissions-Policy', 'identity-credentials-get=(self "https://accounts.google.com")');
        res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com https://*.gstatic.com; connect-src 'self' https://accounts.google.com https://*.googleapis.com https://codelinesjs.pl https://www.codelinesjs.pl http://localhost:*; frame-src 'self' https://accounts.google.com; img-src 'self' data: https://*.googleusercontent.com https://*.gstatic.com https://res.cloudinary.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://accounts.google.com; font-src 'self' https://fonts.gstatic.com");
        
        res.status(response.status).send(data);
      } catch (fetchError) {
        res.status(502).json({
          status: 'error',
          message: 'Błąd komunikacji z serwerem Google',
          error: fetchError.message
        });
      }
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Błąd serwera',
        error: error.message
      });
    }
  });
  
  return app;
}; 