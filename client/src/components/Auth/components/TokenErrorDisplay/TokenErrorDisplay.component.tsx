import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa';
import { AUTH_ERROR_MESSAGES, AUTH_INFO_MESSAGES } from '../../constants/messages';

type TokenErrorDisplayProps = {
  errorMessage?: string | null;
  showBackIcon?: boolean;
  className?: string;
};

export const TokenErrorDisplay = ({ 
  errorMessage, 
  showBackIcon = false,
  className = '' 
}: TokenErrorDisplayProps) => {
  const displayMessage = errorMessage || AUTH_ERROR_MESSAGES.INVALID_TOKEN;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className={`space-y-6 ${className}`}
    >
      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm flex items-start">
        <FaExclamationTriangle className="mr-2 mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-semibold mb-1">Błąd tokenu resetowania hasła</p>
          <p>{displayMessage}</p>
        </div>
      </div>
      
      <div className="text-center mt-6">
        <p className="text-gray-400 mb-4">
          {AUTH_INFO_MESSAGES.TRY_AGAIN}
        </p>
        <Link 
          to="/logowanie" 
          className={`inline-flex items-center text-js hover:underline ${showBackIcon ? '' : ''}`}
        >
          {showBackIcon && <FaArrowLeft className="mr-2" />}
          {AUTH_INFO_MESSAGES.GO_BACK_TO_LOGIN}
        </Link>
      </div>
    </motion.div>
  );
}; 