import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaBook, FaPlay, FaClock, FaQuestionCircle } from 'react-icons/fa';

type TheorySectionProps = {
  onBack: () => void;
  onStart: (questionCount: number) => void;
};

const questionOptions = [
  { value: 5, label: '5 pytań', time: '~5 min' },
  { value: 10, label: '10 pytań', time: '~10 min' },
  { value: 15, label: '15 pytań', time: '~15 min' },
  { value: 20, label: '20 pytań', time: '~20 min' },
];

export const TheorySection = memo(({ onBack, onStart }: TheorySectionProps) => {
  const [selectedCount, setSelectedCount] = useState<number>(10);

  const handleStart = () => {
    onStart(selectedCount);
  };

  return (
    <div className="min-h-screen bg-dark/50 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-2xl w-full space-y-8"
      >
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-js transition-colors"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span className="text-sm">Powrót</span>
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-dark-700/50 border border-js/10 rounded-2xl p-8 text-center space-y-8"
        >
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="p-6 rounded-full bg-js/10 border border-js/20">
                <FaBook className="w-12 h-12 text-js" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Test teorii JavaScript</h1>
              <p className="text-gray-400 max-w-md mx-auto">
                Sprawdź swoją wiedzę teoretyczną z JavaScript. Wybierz ilość pytań i rozpocznij test.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-center gap-2 text-js">
              <FaQuestionCircle className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Wybierz ilość pytań</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {questionOptions.map((option) => (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCount(option.value)}
                  className={`p-4 rounded-xl border transition-all ${
                    selectedCount === option.value
                      ? 'bg-js/10 border-js text-js'
                      : 'bg-dark-700/30 border-gray-600 text-gray-300 hover:border-js/50'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-lg font-bold">{option.label}</div>
                    <div className="text-sm opacity-70 flex items-center justify-center gap-1 mt-1">
                      <FaClock className="w-3 h-3" />
                      {option.time}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="bg-dark-700/30 border border-js/10 rounded-xl p-6 space-y-3">
            <h4 className="text-js font-semibold text-center">Informacje o teście</h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-400">
              <div className="text-center">
                <div className="font-medium text-white">Format</div>
                <div>Pytania wielokrotnego wyboru</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-white">Czas</div>
                <div>Bez ograniczeń czasowych</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-white">Wynik</div>
                <div>Natychmiastowa ocena</div>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
            className="w-full bg-gradient-to-r from-js to-js/80 text-dark font-bold py-4 px-8 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-3 text-lg"
          >
            <FaPlay className="w-5 h-5" />
            Rozpocznij test ({selectedCount} pytań)
          </motion.button>
        </motion.div>
              
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center text-gray-400 text-sm"
        >
          Tematy: podstawy JavaScript, hoisting, closures, prototypy, event loop, ES6+
        </motion.div>
      </motion.div>
    </div>
  );
});

TheorySection.displayName = 'TheorySection'; 