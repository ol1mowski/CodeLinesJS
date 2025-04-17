import { motion } from 'framer-motion';
import { memo } from 'react';
import { FaSearch, FaSadTear } from 'react-icons/fa';

type NoGamesFoundProps = {
  query: string;
};

export const NoGamesFound = memo(({ query }: NoGamesFoundProps) => {
  const getMessage = () => {
    if (query) {
      return {
        title: 'Brak wyników wyszukiwania',
        description: `Nie znaleziono gier dla zapytania "${query}"`,
        icon: FaSearch,
      };
    }
    return {
      title: 'Brak gier w tej kategorii',
      description: 'Spróbuj wybrać inną kategorię lub wróć później',
      icon: FaSadTear,
    };
  };

  const message = getMessage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-16"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', bounce: 0.4 }}
        className="w-20 h-20 mb-6 rounded-full bg-js/10 flex items-center justify-center"
      >
        <message.icon className="w-10 h-10 text-js" />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-bold text-js mb-2 text-center"
      >
        {message.title}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-400 text-center max-w-md"
      >
        {message.description}
      </motion.p>
    </motion.div>
  );
});

NoGamesFound.displayName = 'NoGamesFound';
