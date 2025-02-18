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
        <div className="absolute inset-0 flex">
          <div className="w-12 flex-shrink-0 bg-dark-900/50 border-r border-js/10 pt-4">
            {Array.from({ length: localCode.split('\n').length }).map((_, i) => (
              <div
                key={i}
                className="h-6 text-right pr-2 text-sm font-mono text-gray-500"
              >
                {i + 1}
              </div>
            ))}
          </div>

          <div className="relative flex-1">
            <textarea
              value={localCode}
              onChange={handleCodeChange}
              disabled={gameState.isGameOver}
              spellCheck={false}
              className="absolute inset-0 w-full h-full resize-none outline-none bg-transparent text-gray-300 p-4 font-mono text-lg"
              style={{
                fontFamily: 'Consolas, Monaco, "Andale Mono", monospace',
                lineHeight: '1.5',
                tabSize: 2,
                caretColor: '#f7df1e',
              }}
              onKeyDown={(e) => {
                if (e.key === 'Tab') {
                  e.preventDefault();
                  const start = e.currentTarget.selectionStart;
                  const end = e.currentTarget.selectionEnd;
                  const newCode = localCode.substring(0, start) + '  ' + localCode.substring(end);
                  setLocalCode(newCode);
                  actions.updateCode(newCode);
                  requestAnimationFrame(() => {
                    e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 2;
                  });
                }
              }}
            />
            
            <pre 
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none p-4 font-mono text-lg"
              style={{
                fontFamily: 'Consolas, Monaco, "Andale Mono", monospace',
                lineHeight: '1.5',
                tabSize: 2,
              }}
            >
              <code className="relative block">
                <SyntaxHighlighter
                  language="javascript"
                  style={vs2015}
                  customStyle={{
                    background: 'transparent',
                    padding: 0,
                    margin: 0,
                    fontSize: 'inherit',
                    lineHeight: 'inherit',
                  }}
                >
                  {localCode}
                </SyntaxHighlighter>
              </code>
            </pre>
          </div>
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className={`p-4 rounded-lg shadow-xl max-w-md w-full ${
                gameState.feedback.type === 'success' 
                  ? 'bg-green-900/90 border border-green-500/20' 
                  : 'bg-red-900/90 border border-red-500/20'
              }`}
            >
              <div className="flex items-center gap-2">
                {gameState.feedback.type === 'success' ? (
                  <FaCheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                ) : (
                  <FaTimesCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                )}
                <p className={`text-${gameState.feedback.type === 'success' ? 'green' : 'red'}-100`}>
                  {gameState.feedback.message}
                </p>
              </div>
            </motion.div>
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