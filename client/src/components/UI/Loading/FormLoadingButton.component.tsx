import { ButtonHTMLAttributes, ReactNode } from 'react';

type FormLoadingButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading: boolean;
  loadingText?: string;
  children: ReactNode;
  className?: string;
};

export const FormLoadingButton = ({
  isLoading,
  loadingText = 'Przetwarzanie...',
  children,
  className = '',
  ...props
}: FormLoadingButtonProps) => {
  const baseClasses =
    'relative w-full bg-[#f7df1e] hover:bg-[#f7df1e]/90 text-black font-semibold py-2 sm:py-3 text-sm sm:text-base rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100';

  return (
    <button
      type="submit"
      className={`${baseClasses} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <svg
            className="animate-spin -ml-1 mr-2 h-3 w-3 sm:h-4 sm:w-4 text-black"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span className="text-sm sm:text-base">{loadingText}</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};
