import React, { useRef, useEffect, useState } from 'react';
import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { FaCheck, FaLightbulb, FaClock, FaRedo, FaCheckCircle, FaTimesCircle, FaStar, FaHeart } from 'react-icons/fa';
import { useBugFinder } from '../hooks/useBugFinder';
import { challenges } from '../data/challenges';

SyntaxHighlighter.registerLanguage('javascript', js);

export const BugFinderGame = memo(() => {
  const { gameState, currentChallenge, actions } = useBugFinder();
  const [localCode, setLocalCode] = useState(gameState.currentCode);

  useEffect(() => {
    setLocalCode(gameState.currentCode);
  }, [gameState.currentCode]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setLocalCode(newCode);
    actions.updateCode(newCode);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 bg-dark-900/50 border-b border-js/10">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2 text-gray-300">
            <FaClock className="w-4 h-4 text-js" />
            {formatTime(gameState.timeElapsed)} / {formatTime(currentChallenge.timeLimit)}
          </span>
          <span className="flex items-center gap-2 text-gray-300">
            <FaStar className="w-4 h-4 text-js" />
            {gameState.score} pkt
          </span>
          <span className="flex items-center gap-2 text-gray-300">
            <FaHeart className="w-4 h-4 text-js" />
            {gameState.lives}
          </span>
          <span className="text-gray-300">
            Poziom {gameState.currentLevel + 1}/{challenges.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={actions.showNextHint}
            className="p-2 rounded-lg bg-js/10 text-js hover:bg-js/20 transition-colors"
            title="Pokaż podpowiedź"
          >
            <FaLightbulb className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={actions.resetLevel}
            className="p-2 rounded-lg bg-js/10 text-js hover:bg-js/20 transition-colors"
            title="Reset poziomu"
          >
            <FaRedo className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden relative">
        <textarea
          value={localCode}
          onChange={handleCodeChange}
          disabled={gameState.lives === 0}
          className="absolute inset-0 w-full h-full font-mono bg-transparent p-4 resize-none outline-none text-base"
          spellCheck={false}
          style={{
            fontFamily: 'Consolas, Monaco, "Andale Mono", monospace',
            caretColor: '#f7df1e',
            zIndex: 1,
            color: 'transparent',
            fontSize: '16px',
            lineHeight: '1.5',
          }}
          onKeyDown={(e) => {
            if (e.key === 'Tab') {
              e.preventDefault();
              const start = e.currentTarget.selectionStart;
              const end = e.currentTarget.selectionEnd;
              const newCode = localCode.substring(0, start) + '  ' + localCode.substring(end);
              setLocalCode(newCode);
              actions.updateCode(newCode);
              setTimeout(() => {
                e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 2;
              }, 0);
            }
          }}
        />
        <div className="absolute inset-0 pointer-events-none overflow-auto">
          <SyntaxHighlighter
            language="javascript"
            style={vs2015}
            customStyle={{
              margin: 0,
              height: '100%',
              background: 'transparent',
              padding: '1rem',
              fontSize: '16px',
              lineHeight: '1.5',
              fontFamily: 'Consolas, Monaco, "Andale Mono", monospace',
            }}
            className="h-full"
            wrapLines={true}
            showLineNumbers={true}
            lineNumberStyle={{ 
              color: '#666',
              fontSize: '14px',
              paddingRight: '1em',
              fontFamily: 'Consolas, Monaco, "Andale Mono", monospace',
            }}
            codeTagProps={{
              style: {
                fontFamily: 'inherit',
                fontSize: 'inherit',
                lineHeight: 'inherit',
              }
            }}
          >
            {localCode}
          </SyntaxHighlighter>
        </div>
      </div>

      <div className="p-4 bg-dark-900/50 border-t border-js/10">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={actions.checkSolution}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-js text-dark font-medium hover:bg-js/90 transition-colors"
        >
          <FaCheck className="w-4 h-4" />
          <span>Sprawdź rozwiązanie</span>
        </motion.button>
      </div>

      <AnimatePresence>
        {gameState.feedback.type && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`absolute bottom-20 left-1/2 -translate-x-1/2 p-4 rounded-lg shadow-xl border ${
              gameState.feedback.type === 'success' 
                ? 'bg-green-900/90 border-green-500/20 text-green-100' 
                : 'bg-red-900/90 border-red-500/20 text-red-100'
            }`}
          >
            <div className="flex items-center gap-2">
              {gameState.feedback.type === 'success' ? (
                <FaCheckCircle className="w-5 h-5 text-green-400" />
              ) : (
                <FaTimesCircle className="w-5 h-5 text-red-400" />
              )}
              <p>{gameState.feedback.message}</p>
            </div>
          </motion.div>
        )}

        {gameState.showHint && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 p-4 bg-dark-900/90 border border-js/20 rounded-lg shadow-xl"
          >
            <p className="text-gray-300">
              {currentChallenge.hints[gameState.currentHintIndex]}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

BugFinderGame.displayName = 'BugFinderGame'; 