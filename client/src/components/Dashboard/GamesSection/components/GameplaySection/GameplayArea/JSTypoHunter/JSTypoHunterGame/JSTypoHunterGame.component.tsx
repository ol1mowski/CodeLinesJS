import { memo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Editor } from '@monaco-editor/react';
import { CodeChallenge } from '../../../../../types/jsTypoHunter.types';
import { JSTypoHunterFeedback } from '../JSTypoHunterFeedback/JSTypoHunterFeedback.component';
import { JSTypoHunterHint } from '../JSTypoHunterHint/JSTypoHunterHint.component';
import { FaCode, FaPuzzlePiece } from 'react-icons/fa';
import { useAICodeGenerator } from '../hooks/useAICodeGenerator';

type JSTypoHunterGameProps = {
  currentChallenge: CodeChallenge;
  onScoreUpdate: (points: number) => void;
  onLevelComplete: () => void;
  onIncorrectAnswer: () => void;
};

export const JSTypoHunterGame = memo(({ 
  currentChallenge,
  onScoreUpdate,
  onLevelComplete,
  onIncorrectAnswer
}: JSTypoHunterGameProps) => {
  const [userInput, setUserInput] = useState(currentChallenge.code);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: ''
  });
  const [attempts, setAttempts] = useState(0);
  const { checkAnswer } = useAICodeGenerator();

  const handleEditorChange = useCallback((value: string | undefined) => {
    if (value !== undefined) {
      setUserInput(value);
    }
  }, []);

  const handleSubmit = useCallback(() => {
    const lines = userInput.split('\n');
    
    let corrected = false;
    
    for (const line of lines) {
      const isCorrect = checkAnswer(line, currentChallenge.correct);
      
      if (isCorrect) {
        corrected = true;
        break;
      }
    }
    
    if (corrected) {
      setFeedback({
        type: 'success',
        message: 'Brawo! Poprawnie naprawiłeś błąd w kodzie.'
      });
      
      const points = Math.max(10 - attempts * 2, 1);
      onScoreUpdate(points);
      
      setTimeout(() => {
        onLevelComplete();
        setFeedback({ type: null, message: '' });
        setAttempts(0);
      }, 1500);
    } else {
      setAttempts(prev => prev + 1);
      
      if (attempts >= 2) {
        setFeedback({
          type: 'error',
          message: 'Niestety, nie udało się poprawić błędu. Koniec gry!'
        });
        
        setTimeout(() => {
          onIncorrectAnswer();
        }, 1500);
      } else {
        setFeedback({
          type: 'error',
          message: `Niestety, to nie jest poprawne rozwiązanie. Pozostałe próby: ${3 - attempts - 1}`
        });
        
        setTimeout(() => {
          setFeedback({ type: null, message: '' });
        }, 1500);
      }
    }
  }, [userInput, currentChallenge, attempts, onScoreUpdate, onLevelComplete, onIncorrectAnswer, checkAnswer]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative p-6 bg-dark-800/50 border border-js/10 rounded-lg"
    >
      {feedback.type && (
        <JSTypoHunterFeedback type={feedback.type} message={feedback.message} />
      )}
      
      <div className="mb-4">
        <h2 className="text-xl font-bold text-js flex items-center mb-2">
          <FaCode className="mr-2" /> Wyzwanie
        </h2>
        <p className="text-gray-400">
          {currentChallenge.explanation || 'Znajdź i popraw błąd w poniższym kodzie JavaScript.'}
        </p>
      </div>
      
      <div className="mb-4 relative">
        <div className="absolute top-3 right-3 z-10 flex items-center">
          <div className="text-xs px-2 py-1 bg-js/20 text-js rounded-md flex items-center mr-2">
            <FaPuzzlePiece className="mr-1" />
            <span className="capitalize">{currentChallenge.category}</span>
          </div>
          <div className="text-xs px-2 py-1 bg-js/20 text-js rounded-md flex items-center">
            <span className="capitalize">{currentChallenge.difficulty}</span>
          </div>
        </div>
        <Editor
          height="300px"
          defaultLanguage="javascript"
          theme="vs-dark"
          value={userInput}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
            lineNumbers: 'on',
            wordWrap: 'on',
            automaticLayout: true,
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
        isVisible={true}
      />
    </motion.div>
  );
});

JSTypoHunterGame.displayName = 'JSTypoHunterGame'; 