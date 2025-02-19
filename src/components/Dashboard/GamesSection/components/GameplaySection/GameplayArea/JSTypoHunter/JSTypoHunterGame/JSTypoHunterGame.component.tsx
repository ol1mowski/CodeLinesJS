import React, { memo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { CodeChallenge } from '../../../../../types/jsTypoHunter.types';
import { JSTypoHunterFeedback } from '../JSTypoHunterFeedback/JSTypoHunterFeedback.component';
import { JSTypoHunterHint } from '../JSTypoHunterHint/JSTypoHunterHint.component';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';

SyntaxHighlighter.registerLanguage('javascript', js);

type JSTypoHunterGameProps = {
  currentChallenge: CodeChallenge;
  onScoreUpdate: (newScore: number) => void;
  onLevelComplete: () => void;
};

export const JSTypoHunterGame = memo(({ 
  currentChallenge,
  onScoreUpdate,
  onLevelComplete 
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
    if (selectedText === currentChallenge.error && userInput === currentChallenge.correct) {
      setFeedback({
        type: 'success',
        message: currentChallenge.explanation || 'Świetnie! Znalazłeś i poprawiłeś błąd!'
      });
      onScoreUpdate(10);
      setTimeout(() => {
        onLevelComplete();
        setFeedback({ type: null, message: '' });
        setShowHint(false);
      }, 1500);
    } else {
      setFeedback({
        type: 'error',
        message: 'Spróbuj ponownie!'
      });
      setShowHint(true);
      setTimeout(() => {
        setFeedback({ type: null, message: '' });
      }, 1500);
    }
    setIsEditing(false);
    setSelectedText('');
    setUserInput('');
  }, [selectedText, userInput, currentChallenge, onScoreUpdate, onLevelComplete]);

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <JSTypoHunterFeedback type={feedback.type} message={feedback.message} />
      
      <div className="mb-4 text-gray-400 text-sm">
        <p>Znajdź i zaznacz błąd w kodzie, a następnie popraw go.</p>
        <p className="mt-1 text-gray-500">
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
                className="px-4 py-2 rounded-lg bg-js text-dark-900 font-medium hover:bg-js/90 transition-colors"
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