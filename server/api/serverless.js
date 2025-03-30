export default function handler(req, res) {
  // Przekierowanie do głównej aplikacji
  import('../dist/server.js')
    .then(() => {
      res.status(200).send('API działa poprawnie');
    })
    .catch(err => {
      console.error('Błąd podczas ładowania aplikacji:', err);
      res.status(500).send('Błąd serwera');
    });
} 