import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCheck } from 'react-icons/fa';
import { Question } from '../data/questionsData';

interface TestScreenProps {
  questions: Question[];
  currentQuestionIndex: number;
  selectedAnswer: number | null;
  onAnswerSelect: (answerIndex: number) => void;
  onNext: () => void;
  onBack: () => void;
  totalQuestions: number;
}

const TestScreen: React.FC<TestScreenProps> = ({
  questions,
  currentQuestionIndex,
  selectedAnswer,
  onAnswerSelect,
  onNext,
  onBack,
  totalQuestions
}) => {
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-dark/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header z paskiem postępu */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              <FaArrowLeft />
              Powrót
            </button>
            <div className="text-white text-lg font-medium">
              Pytanie {currentQuestionIndex + 1} z {totalQuestions}
            </div>
          </div>
          
          {/* Pasek postępu */}
          <div className="w-full h-2 bg-dark rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-js to-js/80"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Pytanie */}
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-dark-800/50 backdrop-blur-sm border border-js/10 rounded-2xl p-8 mb-8"
        >
          <div className="mb-6">
            <div className="text-js text-sm font-medium mb-2 uppercase tracking-wide">
              {currentQuestion.category}
            </div>
            <h2 className="text-white text-2xl font-bold leading-relaxed">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Opcje odpowiedzi */}
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => onAnswerSelect(index)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  selectedAnswer === index
                    ? 'border-js bg-js/10 text-white'
                    : 'border-js/10 bg-dark-700/50 text-gray-300 hover:border-js/20 hover:bg-dark-700'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === index
                        ? 'border-js bg-js'
                        : 'border-gray-600'
                    }`}>
                      {selectedAnswer === index && (
                        <FaCheck className="text-dark text-xs" />
                      )}
                    </div>
                    <span className="text-lg">{option}</span>
                  </div>
                  <div className="text-gray-500 text-sm font-medium">
                    {String.fromCharCode(65 + index)}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Przycisk Dalej */}
        <div className="flex justify-end">
          <motion.button
            onClick={onNext}
            disabled={selectedAnswer === null}
            className={`px-8 py-4 rounded-xl font-medium text-lg transition-all duration-200 ${
              selectedAnswer !== null
                ? 'bg-gradient-to-r from-js to-js/80 text-dark hover:shadow-lg hover:shadow-js/20'
                : 'bg-dark-700 text-gray-500 cursor-not-allowed'
            }`}
            whileHover={selectedAnswer !== null ? { scale: 1.05 } : {}}
            whileTap={selectedAnswer !== null ? { scale: 0.95 } : {}}
          >
            {currentQuestionIndex === totalQuestions - 1 ? 'Zakończ test' : 'Następne pytanie'}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

TestScreen.displayName = 'TestScreen';

export default memo(TestScreen); 