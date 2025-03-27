import { motion } from "framer-motion";
import { memo } from "react";

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
  text?: string;
}

export const LoadingSpinner = memo(({ 
  size = 'md', 
  fullScreen = false,
  text = 'Ładowanie...'
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-8 w-8'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl'
  };

  const containerClasses = fullScreen 
    ? "min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-dark via-dark-medium to-dark"
    : "flex items-center justify-center p-4";

  return (
    <div 
      className={containerClasses}
      role="status"
      aria-label={text}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`font-space text-js ${textSizeClasses[size]}`}
      >
        <span className="sr-only">{text}</span>
        <div className="flex items-center gap-2">
          <svg 
            className={`animate-spin ${sizeClasses[size]}`} 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          {text}
        </div>
      </motion.div>
    </div>
  );
});

export default LoadingSpinner; 