import { FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const AuthErrorFallback = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <FaExclamationTriangle className="text-4xl text-red-500 mb-4" />
      <h2 className="text-xl font-bold text-gray-200 mb-2">Ups! Coś poszło nie tak</h2>
      <p className="text-gray-400 mb-4">
        Wystąpił nieoczekiwany błąd podczas ładowania formularza autoryzacji.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mt-2">
        <Link
          to="/"
          className="px-4 py-2 rounded-lg bg-gray-700 text-white font-medium hover:bg-gray-600 transition-colors"
        >
          Wróć do strony głównej
        </Link>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:from-indigo-600 hover:to-purple-600 transition-colors"
        >
          Odśwież stronę
        </button>
      </div>
    </div>
  );
};
