import React, { memo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { ScopeChallenge } from '../../../../../types/scopeExplorer.types';
import { getCategoryIcon, getCategoryLabel, getDifficultyColor, getDifficultyLabel } from './ScopeExplorerGame.utils';
import { useKeyboardShortcuts } from '../../JSTypoHunter/hooks/useKeyboardShortcuts';
import { ScopeExplorerProgress } from '../ScopeExplorerProgress/ScopeExplorerProgress.component';

SyntaxHighlighter.registerLanguage('javascript', js);

type ScopeExplorerGameProps = {
  currentChallenge: ScopeChallenge;
  onScoreUpdate: (points: number, category: 'scope' | 'closure' | 'hoisting') => void;
  onLevelComplete: () => void;
  currentLevel: number;
  totalLevels: number;
  onGameOver: () => void;
};

export const ScopeExplorerGame = memo(({ 
  currentChallenge,
  onScoreUpdate,
  onLevelComplete,
  currentLevel,
  totalLevels,
  onGameOver
}: ScopeExplorerGameProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);

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
        setWrongAttempts(0);
        setShowHint(false);
      }, 1500);
    } else {
      setWrongAttempts(prev => {
        const newAttempts = prev + 1;
        if (newAttempts >= 2) {
          setShowHint(true);
        }
        return newAttempts;
      });
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
      <ScopeExplorerProgress 
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

      <div className="bg-dark-800/50 border border-js/10 rounded-lg overflow-hidden">
        <SyntaxHighlighter
          language="javascript"
          style={vs2015}
          customStyle={{
            padding: '1.5rem',
            borderRadius: '0.5rem',
            fontSize: '1.1rem',
            background: 'transparent',
          }}
        >
          {currentChallenge.code}
        </SyntaxHighlighter>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {currentChallenge.options.map((option, index) => (
          <motion.button
            key={option}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleAnswerSelect(option)}
            disabled={showExplanation}
            className={`
              w-full break-words
              relative p-4 rounded-lg font-mono text-lg transition-colors
              ${selectedAnswer === option
                ? isCorrect
                  ? 'bg-green-500/20 border-green-500/30 text-green-400'
                  : 'bg-red-500/20 border-red-500/30 text-red-400'
                : 'bg-dark-800/50 border border-js/10 text-gray-300 hover:border-js/30'
              }
            `}
          >
            <span className="absolute top-2 left-2 text-xs text-gray-500">
              {index + 1}
            </span>
            {option}
          </motion.button>
        ))}
      </div>

      <div className="text-sm text-gray-500 text-center">
        Użyj klawiszy numerycznych (1-3) aby wybrać odpowiedź
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

      {showHint && !isCorrect && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-js/10 border border-js/20 rounded-lg"
        >
          <p className="text-sm text-js">
            <span className="font-medium">Podpowiedź:</span> Zwróć uwagę na zakres zmiennych i ich dostępność w różnych kontekstach.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
});

ScopeExplorerGame.displayName = 'ScopeExplorerGame'; 