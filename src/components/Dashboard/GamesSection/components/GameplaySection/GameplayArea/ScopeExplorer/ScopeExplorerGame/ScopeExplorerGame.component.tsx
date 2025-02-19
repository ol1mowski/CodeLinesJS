import React, { memo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { ScopeChallenge } from '../../../../../types/scopeExplorer.types';

SyntaxHighlighter.registerLanguage('javascript', js);

type ScopeExplorerGameProps = {
  currentChallenge: ScopeChallenge;
  onScoreUpdate: (points: number) => void;
  onLevelComplete: () => void;
};

export const ScopeExplorerGame = memo(({ 
  currentChallenge,
  onScoreUpdate,
  onLevelComplete 
}: ScopeExplorerGameProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleAnswerSelect = useCallback((answer: string) => {
    setSelectedAnswer(answer);
    setIsCorrect(answer === currentChallenge.correct);
    setShowExplanation(true);

    if (answer === currentChallenge.correct) {
      onScoreUpdate(currentChallenge.points || 10);
      setTimeout(() => {
        onLevelComplete();
        setSelectedAnswer(null);
        setShowExplanation(false);
        setIsCorrect(null);
      }, 1500);
    }
  }, [currentChallenge, onScoreUpdate, onLevelComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full space-y-6"
    >
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
        {currentChallenge.options.map((option) => (
          <motion.button
            key={option}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleAnswerSelect(option)}
            disabled={showExplanation}
            className={`
              p-4 rounded-lg font-mono text-lg transition-colors
              ${selectedAnswer === option
                ? isCorrect
                  ? 'bg-green-500/20 border-green-500/30 text-green-400'
                  : 'bg-red-500/20 border-red-500/30 text-red-400'
                : 'bg-dark-800/50 border border-js/10 text-gray-300 hover:border-js/30'
              }
            `}
          >
            {option}
          </motion.button>
        ))}
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

ScopeExplorerGame.displayName = 'ScopeExplorerGame'; 