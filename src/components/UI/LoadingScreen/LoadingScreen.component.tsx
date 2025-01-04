import { motion } from "framer-motion";
import { memo } from "react";

export const LoadingScreen = memo(() => (
  <div 
    className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-gray-900 via-blue-900 to-indigo-900"
    role="status"
    aria-label="Ładowanie strony"
  >
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-2xl font-space text-indigo-400"
    >
      <span className="sr-only">Ładowanie...</span>
      <div className="flex items-center gap-2">
        <svg 
          className="animate-spin h-5 w-5" 
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
        Ładowanie...
      </div>
    </motion.div>
  </div>
));

LoadingScreen.displayName = "LoadingScreen"; 