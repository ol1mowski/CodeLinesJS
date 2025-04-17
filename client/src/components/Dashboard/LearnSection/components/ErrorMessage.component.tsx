import { memo } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

type ErrorMessageProps = {
  message: string;
  onRetry?: () => void;
};

export const ErrorMessage = memo(({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <FaExclamationTriangle className="w-12 h-12 text-red-500 mb-4" />
      <h3 className="text-lg font-medium text-gray-200 mb-2">Wystąpił błąd</h3>
      <p className="text-gray-400 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-js/10 text-js rounded-lg hover:bg-js/20 transition-colors"
        >
          Spróbuj ponownie
        </button>
      )}
    </div>
  );
});
