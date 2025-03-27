import { memo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Editor } from '@monaco-editor/react';
import { CodeChallenge } from '../../../../../types/jsTypoHunter.types';
import { JSTypoHunterFeedback } from '../JSTypoHunterFeedback/JSTypoHunterFeedback.component';
import { JSTypoHunterHint } from '../JSTypoHunterHint/JSTypoHunterHint.component';
import { FaCode, FaLightbulb, FaPuzzlePiece } from 'react-icons/fa';

type JSTypoHunterGameProps = {
  currentChallenge: CodeChallenge;
  onScoreUpdate: (points: number) => void;
  onLevelComplete: () => void;
  onIncorrectAnswer: () => void;
};

const getCategoryIcon = (category: 'syntax' | 'naming' | 'logic') => {
  switch (category) {
    case 'syntax':
      return FaCode;
    case 'naming':
      return FaPuzzlePiece;
    case 'logic':
      return FaLightbulb;
  }
};

const getDifficultyColor = (difficulty: 'easy' | 'medium' | 'hard') => {
  switch (difficulty) {
    case 'easy':
      return 'text-green-400 bg-green-500/10';
    case 'medium':
      return 'text-yellow-400 bg-yellow-500/10'; 
    case 'hard':
      return 'text-red-400 bg-red-500/10';
  }
};

export const JSTypoHunterGame = memo(({ 
  currentChallenge,
  onScoreUpdate,
  onLevelComplete,
  onIncorrectAnswer
}: JSTypoHunterGameProps) => {
  const [userInput, setUserInput] = useState(currentChallenge.code);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | null, message: string }>({
    type: null,
    message: ''
  });
  const [attempts, setAttempts] = useState(0);
  const MAX_ATTEMPTS = 3;

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setUserInput(value);
    }
  };

  const checkCorrection = (userCode: string, correctLine: string): boolean => {
    const normalizedUserCode = userCode.trim().replace(/\s+/g, ' ');
    const normalizedCorrectLine = correctLine.trim().replace(/\s+/g, ' ');
    
    if (normalizedUserCode.includes(normalizedCorrectLine)) {
      return true;
    }
    
    const similarityThreshold = 0.8;
    const calculateSimilarity = (str1: string, str2: string): number => {
      if (str1 === str2) return 1.0;
      
      let matches = 0;
      const longerStr = str1.length > str2.length ? str1 : str2;
      const shorterStr = str1.length > str2.length ? str2 : str1;
      
      for (let i = 0; i < shorterStr.length; i++) {
        if (shorterStr[i] === longerStr[i]) {
          matches++;
        }
      }
      
      return matches / longerStr.length;
    };
    
    return calculateSimilarity(normalizedUserCode, normalizedCorrectLine) > similarityThreshold;
  };

  const handleSubmit = useCallback(() => {
    const lines = userInput.split('\n');
    let isCorrect = false;
    
    for (const line of lines) {
      if (checkCorrection(line, currentChallenge.correct)) {
        isCorrect = true;
        break;
      }
    }

    if (isCorrect) {
      setFeedback({ 
        type: 'success', 
        message: 'Świetnie! Poprawna odpowiedź!' 
      });
      
        const points = Math.max(10 - attempts * 2, 1);
      onScoreUpdate(points);
      
      setTimeout(() => {
        onLevelComplete();
        setUserInput(currentChallenge.code);
        setFeedback({ type: null, message: '' });
        setAttempts(0);
      }, 1500);
    } else {
      setAttempts(prev => prev + 1);
      
      if (attempts + 1 >= MAX_ATTEMPTS) {
        setFeedback({ 
          type: 'error', 
          message: 'Niestety, przekroczyłeś liczbę prób. Koniec gry!' 
        });
        setTimeout(() => {
          onIncorrectAnswer();
        }, 1500);
      } else {
        setFeedback({ 
          type: 'error', 
          message: `Niestety, to nie jest prawidłowa odpowiedź. Pozostałe próby: ${MAX_ATTEMPTS - attempts - 1}` 
        });
        setTimeout(() => {
          setFeedback({ type: null, message: '' });
        }, 1500);
      }
    }
  }, [userInput, currentChallenge, attempts, onScoreUpdate, onLevelComplete, onIncorrectAnswer]);

  const CategoryIcon = getCategoryIcon(currentChallenge.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <JSTypoHunterFeedback type={feedback.type} message={feedback.message} />
      
      <div className="mb-4 p-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-js/10">
              <CategoryIcon className="w-4 h-4 text-js" />
            </div>
            <div className="text-sm text-gray-400">
              {currentChallenge.category === 'syntax' ? 'Błąd składni' :
               currentChallenge.category === 'naming' ? 'Błąd nazewnictwa' :
               'Błąd logiki'}
            </div>
          </div>
          <div className={`px-3 py-1 rounded-lg text-sm ${getDifficultyColor(currentChallenge.difficulty)}`}>
            {currentChallenge.difficulty === 'easy' ? 'Łatwy' :
             currentChallenge.difficulty === 'medium' ? 'Średni' : 'Trudny'}
          </div>
        </div>
        <p className="text-gray-400 text-sm">
          {currentChallenge.explanation || 'Znajdź i popraw błąd w kodzie.'}
        </p>
        <p className="mt-1 text-gray-500 text-sm">
          Pozostałe próby: {MAX_ATTEMPTS - attempts}
        </p>
      </div>

      <div className="rounded-lg">
        <Editor
          className="w-full h-full flex flex-wrap"
          theme="vs-dark"
          height="400px"
          defaultLanguage="javascript"
          value={userInput}
          onChange={handleEditorChange}
          options={{
            selectOnLineNumbers: true,
            automaticLayout: true,
            theme: 'vs-dark',
            wordWrap: 'on',
          }}
        />
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 rounded-lg bg-js text-dark font-medium hover:bg-js/90 transition-colors"
        >
          Sprawdź
        </button>
      </div>

      <JSTypoHunterHint 
        hint={currentChallenge.hint || ''} 
        isVisible={attempts > 0}
      />
    </motion.div>
  );
});

JSTypoHunterGame.displayName = 'JSTypoHunterGame'; 