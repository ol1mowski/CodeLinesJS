import { memo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaLayerGroup, FaTextWidth, FaCube, FaGlobe } from 'react-icons/fa';
import { useAnimations } from '../hooks/useAnimations';
import { MethodQuizChallenge } from '../../../../../types/methodQuiz.types';

type MethodQuizGameProps = {
  currentChallenge: MethodQuizChallenge;
  onScoreUpdate: (points: number, category: MethodQuizChallenge['category']) => void;
  onLevelComplete: () => void;
  currentLevel: number;
  totalLevels: number;
  onGameOver: () => void;
};

const MethodQuizProgress = ({ currentLevel, totalLevels }: { currentLevel: number; totalLevels: number }) => (
  <div className="flex items-center justify-between mb-4">
    <div className="text-sm text-gray-400">
      Pytanie {currentLevel} z {totalLevels}
    </div>
    <div className="w-48 bg-dark-700 rounded-full h-2">
      <div
        className="bg-js h-2 rounded-full transition-all duration-300"
        style={{ width: `${(currentLevel / totalLevels) * 100}%` }}
      />
    </div>
  </div>
);

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'array-methods': return FaLayerGroup;
    case 'string-methods': return FaTextWidth;
    case 'object-methods': return FaCube;
    case 'dom-methods': return FaGlobe;
    default: return FaCode;
  }
};

const getCategoryLabel = (category: string) => {
  switch (category) {
    case 'array-methods': return 'Array Methods';
    case 'string-methods': return 'String Methods';
    case 'object-methods': return 'Object Methods';
    case 'dom-methods': return 'DOM Methods';
    default: return 'Methods';
  }
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'easy': return 'bg-green-500/20 text-green-400';
    case 'medium': return 'bg-yellow-500/20 text-yellow-400';
    case 'hard': return 'bg-red-500/20 text-red-400';
    default: return 'bg-gray-500/20 text-gray-400';
  }
};

const getDifficultyLabel = (difficulty: string) => {
  switch (difficulty) {
    case 'easy': return 'Łatwy';
    case 'medium': return 'Średni';
    case 'hard': return 'Trudny';
    default: return difficulty;
  }
};

export const MethodQuizGame = memo(
  ({
    currentChallenge,
    onScoreUpdate,
    onLevelComplete,
    currentLevel,
    totalLevels,
    onGameOver,
  }: MethodQuizGameProps) => {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const { optionAnimation } = useAnimations();

    const handleAnswerSelect = useCallback(
      (answer: string) => {
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
          }, 2500);
        } else {
          setTimeout(() => {
            onGameOver();
          }, 3000);
        }
      },
      [currentChallenge, onScoreUpdate, onLevelComplete, onGameOver]
    );

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
        <MethodQuizProgress currentLevel={currentLevel} totalLevels={totalLevels} />

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-js/10">
              <CategoryIcon className="w-4 h-4 text-js" />
            </div>
            <div className="text-sm text-gray-400">
              {getCategoryLabel(currentChallenge.category)}
            </div>
          </div>
          <div
            className={`px-3 py-1 rounded-lg text-sm ${getDifficultyColor(currentChallenge.difficulty)}`}
          >
            {getDifficultyLabel(currentChallenge.difficulty)}
          </div>
        </div>

        <div className="p-6 bg-dark-900/80 border border-js/20 rounded-lg mb-6">
          <div className="flex items-center gap-2 mb-3">
            <FaCode className="text-js text-sm" />
            <span className="text-sm text-gray-400">Fragment kodu</span>
          </div>
          <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap overflow-x-auto">
            {currentChallenge.codeSnippet}
          </pre>
        </div>

        <div className="p-4 bg-dark-800/50 border border-js/10 rounded-lg mb-6">
          <h3 className="text-lg font-medium text-white mb-2">
            Jaka metoda powinna być w miejscu <span className="text-js font-mono">___</span>?
          </h3>
          {currentChallenge.hint && (
            <p className="text-sm text-gray-400">
              💡 Podpowiedź: {currentChallenge.hint}
            </p>
          )}
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
              relative p-4 rounded-lg font-medium text-left transition-colors font-mono
              ${
                selectedAnswer === option
                  ? isCorrect
                    ? 'bg-green-500/20 border-green-500/30 text-green-400'
                    : 'bg-red-500/20 border-red-500/30 text-red-400'
                  : 'bg-dark-800/50 border border-js/10 text-gray-300 hover:border-js/30'
              }
            `}
              {...optionAnimation}
              transition={{ ...optionAnimation.transition, delay: index * 0.1 }}
            >
              <span className="absolute top-2 left-2 text-xs text-gray-500 font-sans">
                {String.fromCharCode(65 + index)}
              </span>
              <div className="pl-6">{option}()</div>
            </motion.button>
          ))}
        </div>

        <div className="text-sm text-gray-500 text-center">
          Wybierz poprawną metodę JavaScript (A-D)
        </div>

        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg space-y-3 ${
              isCorrect
                ? 'bg-green-500/20 border border-green-500/30'
                : 'bg-red-500/20 border border-red-500/30'
            }`}
          >
            <p className={`text-sm font-medium ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
              {isCorrect ? '🎉 Świetnie!' : '❌ Niepoprawne.'} 
              {currentChallenge.explanation}
            </p>
            
            {currentChallenge.expectedOutput && (
              <div className="p-3 bg-dark-900/50 rounded border border-js/10">
                <p className="text-xs text-gray-400 mb-1">Oczekiwany wynik:</p>
                <code className="text-green-400 font-mono text-sm">
                  {currentChallenge.expectedOutput}
                </code>
              </div>
            )}

            {isCorrect && (
              <p className="text-sm text-green-300">
                +{currentChallenge.points || 10} punktów
              </p>
            )}
          </motion.div>
        )}
      </motion.div>
    );
  }
);

MethodQuizGame.displayName = 'MethodQuizGame'; 