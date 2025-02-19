import React, { memo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { AsyncChallenge } from '../../../../../types/asyncQuest.types';
import { AsyncQuestProgress } from '../AsyncQuestProgress/AsyncQuestProgress.component';
import { getCategoryIcon, getCategoryLabel, getDifficultyColor, getDifficultyLabel } from './AsyncQuestGame.utils';

SyntaxHighlighter.registerLanguage('javascript', js);

type AsyncQuestGameProps = {
  currentChallenge: AsyncChallenge;
  onScoreUpdate: (points: number, category: 'promises' | 'async-await' | 'callbacks') => void;
  onLevelComplete: () => void;
  currentLevel: number;
  totalLevels: number;
  onGameOver: () => void;
};

export const AsyncQuestGame = memo(({ 
  currentChallenge,
  onScoreUpdate,
  onLevelComplete,
  currentLevel,
  totalLevels,
  onGameOver
}: AsyncQuestGameProps) => {
  const [userCode, setUserCode] = useState(currentChallenge.code);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const handleCodeSubmit = useCallback(() => {
    const correct = userCode.trim() === currentChallenge.correct.trim();
    setIsCorrect(correct);
    setShowExplanation(true);

    if (correct) {
      onScoreUpdate(currentChallenge.points, currentChallenge.category);
      setTimeout(() => {
        onLevelComplete();
        setUserCode(currentChallenge.code);
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
  }, [currentChallenge, userCode, onScoreUpdate, onLevelComplete, onGameOver]);

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
      <AsyncQuestProgress 
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

      <div className="p-4 bg-dark-800/50 border border-js/10 rounded-lg">
        <p className="text-lg text-js mb-4">{currentChallenge.task}</p>
        <div className="bg-dark-900 rounded-lg overflow-hidden">
          <SyntaxHighlighter
            language="javascript"
            style={vs2015}
            customStyle={{
              background: 'transparent',
              padding: '1.5rem',
            }}
            onChange={setUserCode}
            value={userCode}
          >
            {userCode}
          </SyntaxHighlighter>
        </div>
      </div>

      <button
        onClick={handleCodeSubmit}
        className="w-full px-6 py-3 rounded-lg bg-js text-dark font-medium hover:bg-js/90 transition-colors"
      >
        Sprawdź rozwiązanie
      </button>

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
            {currentChallenge.error}
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
            <span className="font-medium">Podpowiedź:</span> Zwróć uwagę na poprawną składnię asynchronicznych operacji.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
});

AsyncQuestGame.displayName = 'AsyncQuestGame'; 