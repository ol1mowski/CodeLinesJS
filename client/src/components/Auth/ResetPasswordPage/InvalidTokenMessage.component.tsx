import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaExclamationTriangle, FaArrowLeft } from "react-icons/fa";

export const InvalidTokenMessage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm flex items-start">
        <FaExclamationTriangle className="mr-2 mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-semibold mb-1">Błąd tokenu resetowania hasła</p>
          <p>Nieprawidłowy lub wygasły token resetowania hasła. Sprawdź, czy link jest poprawny lub spróbuj ponownie zresetować hasło.</p>
        </div>
      </div>
      
      <div className="text-center mt-6">
        <p className="text-gray-400 mb-4">Możesz spróbować ponownie zresetować hasło na stronie logowania:</p>
        <Link 
          to="/logowanie" 
          className="inline-flex items-center text-js hover:underline"
        >
          <FaArrowLeft className="mr-2" /> Wróć do strony logowania
        </Link>
      </div>
    </motion.div>
  );
}; 