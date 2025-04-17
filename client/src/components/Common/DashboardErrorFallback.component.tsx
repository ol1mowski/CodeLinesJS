import React from 'react';
import { FaExclamationTriangle, FaHome, FaRedoAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

type DashboardErrorFallbackProps = {
  error?: Error;
  resetErrorBoundary?: () => void;
};

const DashboardErrorFallback: React.FC<DashboardErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  const handleReset = () => {
    if (resetErrorBoundary) {
      resetErrorBoundary();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark p-4">
      <div className="bg-dark-medium border border-red-500/20 rounded-lg p-8 max-w-md w-full shadow-lg">
        <div className="flex flex-col items-center text-center">
          <FaExclamationTriangle className="text-5xl text-red-500 mb-4" aria-hidden="true" />

          <h1 className="text-2xl font-bold text-white mb-2">Wystąpił nieoczekiwany błąd</h1>

          <p className="text-gray-400 mb-6">
            Przepraszamy za niedogodności. Nasz zespół został powiadomiony o problemie.
          </p>

          {error && (
            <div className="w-full mb-6 p-3 bg-red-900/20 border border-red-500/10 rounded overflow-auto text-left">
              <p className="text-sm text-red-400 font-mono">
                {error.message || 'Nieznany błąd aplikacji'}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <button
              onClick={handleReset}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-js hover:bg-js/90 text-dark font-medium rounded-lg transition-colors"
            >
              <FaRedoAlt className="text-sm" aria-hidden="true" />
              <span>Spróbuj ponownie</span>
            </button>

            <Link to="/dashboard" className="flex-1">
              <button className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors">
                <FaHome className="text-sm" aria-hidden="true" />
                <span>Wróć do Home</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardErrorFallback;
