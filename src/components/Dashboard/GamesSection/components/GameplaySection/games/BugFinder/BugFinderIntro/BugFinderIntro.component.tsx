import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaBug, FaPlay } from 'react-icons/fa';

type BugFinderIntroProps = {
  onStartGame: () => void;
};

export const BugFinderIntro = memo(({ onStartGame }: BugFinderIntroProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="p-4 rounded-full bg-js/10 mb-6"
      >
        <FaBug className="w-12 h-12 text-js" />
      </motion.div>
      
      <h2 className="text-3xl font-bold text-js mb-4">Bug Finder</h2>
      
      <div className="max-w-2xl text-center space-y-4 mb-8">
        <p className="text-gray-300">
          Witaj w grze Bug Finder! Twoim zadaniem jest znalezienie i naprawienie błędów w kodzie JavaScript.
        </p>
        <p className="text-gray-300">
          Na każdym poziomie zobaczysz fragment kodu zawierający jeden lub więcej błędów. 
          Twoim zadaniem jest poprawienie go tak, aby działał prawidłowo.
        </p>
        <p className="text-gray-300">
          Pamiętaj, że liczy się czas - im szybciej naprawisz błędy, tym więcej punktów zdobędziesz!
        </p>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStartGame}
        className="flex items-center gap-2 px-6 py-3 rounded-lg bg-js text-dark font-medium hover:bg-js/90 transition-colors"
      >
        <FaPlay className="w-4 h-4" />
        <span>Rozpocznij grę</span>
      </motion.button>
    </div>
  );
});

BugFinderIntro.displayName = 'BugFinderIntro'; 