import React, { memo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { AsyncChallenge } from '../../../../../types/asyncQuest.types';
import { AsyncQuestProgress } from '../AsyncQuestProgress/AsyncQuestProgress.component';
import { getCategoryIcon, getCategoryLabel, getDifficultyColor, getDifficultyLabel } from './AsyncQuestGame.utils';
import { useCodeExecution } from '../hooks/useCodeExecution';
import { validateAsyncCode } from '../utils/codeValidation';
import { AsyncQuestHint } from '../AsyncQuestHint/AsyncQuestHint.component';
import { getErrorHint } from '../utils/errorHints';

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
  const [errorHint, setErrorHint] = useState<{
    message: string;
    explanation: string;
    example?: string;
  } | null>(null);

  const { executeCode, isRunning, output, clearOutput } = useCodeExecution();

  const handleCodeRun = useCallback(async () => {
    clearOutput();
    setErrorHint(null);
    
    // Najpierw sprawdzamy poprawność składni
    const isValid = validateAsyncCode(userCode, currentChallenge.correct);
    
    if (!isValid) {
      const hint = getErrorHint(userCode, currentChallenge.category);
      setErrorHint(hint);
      setIsCorrect(false);
      setShowExplanation(true);
      setWrongAttempts(prev => {
        const newAttempts = prev + 1;
        if (newAttempts >= 2) {
          setShowHint(true);
        }
        return newAttempts;
      });
      return;
    }

    // Wykonujemy kod
    const result = await executeCode(userCode);

    if (result.success) {
      setIsCorrect(true);
      setShowExplanation(true);
      onScoreUpdate(currentChallenge.points, currentChallenge.category);
      
      setTimeout(() => {
        onLevelComplete();
        setUserCode(currentChallenge.code);
        setShowExplanation(false);
        setIsCorrect(null);
        setWrongAttempts(0);
        setShowHint(false);
        clearOutput();
      }, 1500);
    } else {
      setIsCorrect(false);
      setShowExplanation(true);
      setWrongAttempts(prev => {
        const newAttempts = prev + 1;
        if (newAttempts >= 2) {
          setShowHint(true);
          setTimeout(() => {
            onGameOver();
          }, 2000);
        }
        return newAttempts;
      });
    }
  }, [currentChallenge, userCode, executeCode, clearOutput, onScoreUpdate, onLevelComplete, onGameOver]);

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

      <div className="p-4 bg-dark-800/50 border border-js/10 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-js/10">
              <CategoryIcon className="w-4 h-4 text-js" />
            </div>
            <div>
              <div className="text-sm text-gray-400">
                {getCategoryLabel(currentChallenge.category)}
              </div>
              <div className="text-xs text-gray-500">
                {currentChallenge.task}
              </div>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-lg text-sm ${getDifficultyColor(currentChallenge.difficulty)}`}>
            {getDifficultyLabel(currentChallenge.difficulty)}
          </div>
        </div>

        <div className="space-y-4">
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

          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <AsyncQuestHint
                type={isCorrect ? 'hint' : 'error'}
                message={isCorrect ? 'Świetnie! Rozwiązanie jest poprawne.' : currentChallenge.error}
                explanation={isCorrect ? undefined : errorHint?.explanation}
                code={isCorrect ? undefined : errorHint?.example}
              />
            </motion.div>
          )}
        </div>
      </div>

      <button
        onClick={handleCodeRun}
        disabled={isRunning}
        className={`w-full px-6 py-3 rounded-lg font-medium transition-colors ${
          isRunning 
            ? 'bg-gray-500 cursor-not-allowed' 
            : 'bg-js text-dark hover:bg-js/90'
        }`}
      >
        {isRunning ? 'Wykonywanie...' : 'Uruchom kod'}
      </button>

      {showHint && !isCorrect && errorHint && (
        <AsyncQuestHint
          type="hint"
          message={errorHint.message}
          code={errorHint.example}
          explanation={errorHint.explanation}
        />
      )}

      {output.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-900/50 rounded-lg p-4 font-mono text-sm"
        >
          <div className="text-gray-400 mb-2">Console output:</div>
          {output.map((line, index) => (
            <div key={index} className="text-gray-300">{line}</div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
});

AsyncQuestGame.displayName = 'AsyncQuestGame'; 