import React, { memo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { CodeChallenge } from '../../../../../types/jsTypoHunter.types';

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
      onScoreUpdate(10);
      onLevelComplete();
    }
    setIsEditing(false);
    setSelectedText('');
    setUserInput('');
  }, [selectedText, userInput, currentChallenge, onScoreUpdate, onLevelComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
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
              className="w-full px-3 py-2 bg-dark-900/50 border border-js/20 rounded-lg text-gray-200 focus:outline-none focus:border-js/40"
              autoFocus
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsEditing(false)}
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
        </motion.div>
      )}
    </motion.div>
  );
});

JSTypoHunterGame.displayName = 'JSTypoHunterGame'; 