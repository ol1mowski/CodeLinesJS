import { motion } from "framer-motion";
import { memo } from "react";
import { FaSearch, FaSadTear } from "react-icons/fa";

type NoGamesFoundProps = {
  searchQuery?: string;
  activeCategory?: string;
};

export const NoGamesFound = memo(({ searchQuery, activeCategory }: NoGamesFoundProps) => {
  const getMessage = () => {
    if (searchQuery) {
      return {
        title: "Brak wyników wyszukiwania",
        description: `Nie znaleziono gier dla zapytania "${searchQuery}"`,
        icon: FaSearch
      };
    }
    return {
      title: "Brak gier w tej kategorii",
      description: "Spróbuj wybrać inną kategorię lub wróć później",
      icon: FaSadTear
    };
  };

  const message = getMessage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center p-12 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center"
      >
        <message.icon className="w-8 h-8 text-indigo-400" />
      </motion.div>
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-bold font-space text-gray-200 mb-2"
      >
        {message.title}
      </motion.h3>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-400 max-w-md"
      >
        {message.description}
      </motion.p>
    </motion.div>
  );
});

NoGamesFound.displayName = "NoGamesFound"; 