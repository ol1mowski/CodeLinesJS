/**
 * Klasa do tworzenia błędów operacyjnych, które można bezpiecznie przesyłać do klienta
 * @extends Error
 */
class AppError extends Error {
  /**
   * Tworzy nową instancję błędu aplikacji
   * @param {string} message - Komunikat o błędzie
   * @param {number} statusCode - Kod statusu HTTP
   */
  constructor(message, statusCode) {
    super(message);
    
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true; // Oznacza błąd operacyjny, który można bezpiecznie przesłać klientowi
    
    // Przechwytywanie stosu błędu do lepszego debugowania
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError; 