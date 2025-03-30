// Najprostszy endpoint API dla Vercel
export default function handler(req, res) {
  res.status(200).json({
    message: 'API działa poprawnie',
    timestamp: new Date().toISOString(),
    path: req.url
  });
} 