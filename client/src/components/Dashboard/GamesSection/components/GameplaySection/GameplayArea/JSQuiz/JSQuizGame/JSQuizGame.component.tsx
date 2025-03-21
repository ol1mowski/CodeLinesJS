import { memo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { QuizChallenge } from '../../../../../types/jsQuiz.types';
import { getCategoryIcon, getCategoryLabel, getDifficultyColor, getDifficultyLabel } from './JSQuizGame.utils';
import { useKeyboardShortcuts } from '../../JSTypoHunter/hooks/useKeyboardShortcuts';
import { JSQuizProgress } from '../JSQuizProgress/JSQuizProgress.component';
import { useAnimations } from '../hooks/useAnimations';

type JSQuizGameProps = {
  currentChallenge: QuizChallenge;
  onScoreUpdate: (points: number, category: 'basics' | 'advanced' | 'frameworks') => void;
  onLevelComplete: () => void;
  currentLevel: number;
  totalLevels: number;
  onGameOver: () => void;
};

export const JSQuizGame = memo(({ 
  currentChallenge,
  onScoreUpdate,
  onLevelComplete,
  currentLevel,
  totalLevels,
  onGameOver
}: JSQuizGameProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const { optionAnimation } = useAnimations();

  const handleAnswerSelect = useCallback((answer: string) => {
    setSelectedAnswer(answer);
    const correct = answer === currentChallenge.correct;
    setIsCorrect(correct);
    setShowExplanation(true);

    if (correct) {
      onScoreUpdate(currentChallenge.points || 10, currentChallenge.category);
      setTimeout(() => {
        onLevelComplete();
        setSelectedAnswer(null);
        setShowExplanation(false);
        setIsCorrect(null);
      }, 1500);
    } else {
      setTimeout(() => {
        onGameOver();
      }, 2000);
    }
  }, [currentChallenge, onScoreUpdate, onLevelComplete, onGameOver]);

  const handleKeyboardSelect = useCallback((index: number) => {
    if (!showExplanation && index < currentChallenge.options.length) {
      handleAnswerSelect(currentChallenge.options[index]);
    }
  }, [showExplanation, currentChallenge.options, handleAnswerSelect]);

  useKeyboardShortcuts({
    onNumber1: () => handleKeyboardSelect(0),
    onNumber2: () => handleKeyboardSelect(1),
    onNumber3: () => handleKeyboardSelect(2),
    onNumber4: () => handleKeyboardSelect(3),
    disabled: showExplanation
  });

  const CategoryIcon = getCategoryIcon(currentChallenge.category);

  return (
    <motion.div
      key={currentLevel}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="w-full space-y-6"
    >
      <JSQuizProgress 
        currentLevel={currentLevel}
        totalLevels={totalLevels}
      />

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-js/10">
            <CategoryIcon className="w-4 h-4 text-js" />
          </div>
          <div className="text-sm text-gray-400">
            {getCategoryLabel(currentChallenge.category)}
          </div>
        </div>
        <div className={`px-3 py-1 rounded-lg text-sm ${getDifficultyColor(currentChallenge.difficulty)}`}>
          {getDifficultyLabel(currentChallenge.difficulty)}
        </div>
      </div>

      <div className="p-6 bg-dark-800/50 border border-js/10 rounded-lg mb-6">
        <h3 className="text-xl font-medium text-white mb-2">{currentChallenge.question}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentChallenge.options.map((option, index) => (
          <motion.button
            key={option}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleAnswerSelect(option)}
            disabled={showExplanation}
            className={`
              w-full
              relative p-4 rounded-lg font-medium text-left transition-colors
              ${selectedAnswer === option
                ? isCorrect
                  ? 'bg-green-500/20 border-green-500/30 text-green-400'
                  : 'bg-red-500/20 border-red-500/30 text-red-400'
                : 'bg-dark-800/50 border border-js/10 text-gray-300 hover:border-js/30'
              }
            `}
            {...optionAnimation}
            transition={{ ...optionAnimation.transition, delay: index * 0.1 }}
          >
            <span className="absolute top-2 left-2 text-xs text-gray-500">
              {index + 1}
            </span>
            {option}
          </motion.button>
        ))}
      </div>

      <div className="text-sm text-gray-500 text-center">
        Użyj klawiszy numerycznych (1-4) aby wybrać odpowiedź
      </div>

      {showExplanation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg ${
            isCorrect 
              ? 'bg-green-500/20 border border-green-500/30' 
              : 'bg-red-500/20 border border-red-500/30'
          }`}
        >
          <p className={`text-sm ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
            {isCorrect ? 'Świetnie! ' : 'Spróbuj jeszcze raz. '}
            {currentChallenge.explanation}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
});

JSQuizGame.displayName = 'JSQuizGame'; 