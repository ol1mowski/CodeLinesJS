import React, { memo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { CodeChallenge } from '../../../../../types/jsTypoHunter.types';
import { JSTypoHunterFeedback } from '../JSTypoHunterFeedback/JSTypoHunterFeedback.component';
import { JSTypoHunterHint } from '../JSTypoHunterHint/JSTypoHunterHint.component';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { FaCode, FaLightbulb, FaPuzzlePiece } from 'react-icons/fa';

SyntaxHighlighter.registerLanguage('javascript', js);

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
  const [selectedText, setSelectedText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | null, message: string }>({
    type: null,
    message: ''
  });

  const handleCodeClick = useCallback((e: React.MouseEvent) => {
    const selection = window.getSelection();
    if (selection) {
      const text = selection.toString();
      if (text) {
        setSelectedText(text);
        setIsEditing(true);
        setUserInput(text);
      }
    }
  }, []);

  const handleSubmit = useCallback(() => {
    if (!selectedText || !userInput) return;

    let correctedCode = currentChallenge.code;
    
    if (selectedText && userInput) {
      correctedCode = correctedCode.replace(selectedText, userInput);
    }

    const expectedCode = currentChallenge.code.replace(currentChallenge.error, currentChallenge.correct);
    const isCorrect = correctedCode.replace(/\s+/g, '') === expectedCode.replace(/\s+/g, '');

    if (isCorrect) {
      setFeedback({ type: 'success', message: 'Świetnie! Poprawna odpowiedź!' });
      onScoreUpdate(10);
      setTimeout(() => {
        onLevelComplete();
        setSelectedText('');
        setUserInput('');
        setIsEditing(false);
        setFeedback({ type: null, message: '' });
      }, 1500);
    } else {
      setFeedback({ type: 'error', message: 'Niestety, to nie jest prawidłowa odpowiedź.' });
      setTimeout(() => {
        onIncorrectAnswer();
      }, 1500);
    }
  }, [selectedText, userInput, currentChallenge, onScoreUpdate, onLevelComplete, onIncorrectAnswer]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setSelectedText('');
    setUserInput('');
  }, []);

  useKeyboardShortcuts({
    onEscape: handleCancel,
    onEnter: isEditing ? handleSubmit : undefined,
    disabled: !isEditing
  });

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
          Znajdź i zaznacz błąd w kodzie, a następnie popraw go.
        </p>
        <p className="mt-1 text-gray-500 text-sm">
          Wskazówka: Możesz użyć <span className="text-js">Enter</span> aby zatwierdzić i <span className="text-js">Esc</span> aby anulować.
        </p>
      </div>

      <div 
        className="rounded-lg overflow-hidden cursor-pointer"
        onClick={handleCodeClick}
      >
        <SyntaxHighlighter
          language="javascript"
          style={vs2015}
          customStyle={{
            padding: '1.5rem',
            borderRadius: '0.5rem',
            fontSize: '1.1rem',
            background: 'rgba(17, 24, 39, 0.5)',
          }}
        >
          {currentChallenge.code}
        </SyntaxHighlighter>
      </div>

      <JSTypoHunterHint 
        hint={currentChallenge.hint || ''} 
        isVisible={showHint} 
      />

      {isEditing && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-full left-0 right-0 mt-4 p-4 bg-dark-800/50 border border-js/10 rounded-lg"
        >
          <div className="mb-3">
            <label className="block text-sm text-gray-400 mb-2">
              Popraw zaznaczony tekst:
            </label>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              className="w-full px-3 py-2 bg-dark-900/50 border border-js/20 rounded-lg text-gray-200 focus:outline-none focus:border-js/40"
              autoFocus
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Naciśnij Enter aby zatwierdzić lub Esc aby anulować
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 rounded-lg bg-dark-700 text-gray-300 hover:bg-dark-600 transition-colors"
              >
                Anuluj
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded-lg bg-js text-dark font-medium hover:bg-js/90 transition-colors"
              >
                Sprawdź
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
});

JSTypoHunterGame.displayName = 'JSTypoHunterGame'; 