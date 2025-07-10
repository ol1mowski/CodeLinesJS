import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaLaptopCode } from 'react-icons/fa';

type TechnicalInterviewHeaderProps = {
  onBack: () => void;
};

export const TechnicalInterviewHeader = memo(({ onBack }: TechnicalInterviewHeaderProps) => {
  return (
    <header className="flex items-center justify-between mb-6">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-js transition-colors"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span className="text-sm">Powrót</span>
          </motion.button>
          <div className="w-px h-5 bg-gray-600 mx-2" />
          <FaLaptopCode className="w-5 h-5 text-js" />
          <h3 className="text-xl font-bold text-js">Przygotowanie do rozmowy technicznej</h3>
        </div>
        <p className="text-gray-400 text-sm">
          Naucz się odpowiadać na pytania techniczne i rozwiązywać zadania programistyczne na żywo
        </p>
      </div>
    </header>
  );
});

TechnicalInterviewHeader.displayName = 'TechnicalInterviewHeader'; 