import React, { useCallback, useRef, useMemo, useState, useEffect } from 'react';
import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck, FaLightbulb, FaClock, FaRedo, FaCheckCircle, FaTimesCircle, FaStar, FaHeart, FaArrowRight } from 'react-icons/fa';
import { useBugFinder } from '../hooks/useBugFinder';
import { challenges } from '../data/challenges';
import { useClickOutside } from '../hooks/useClickOutside';
import { CodeEditor } from './CodeEditor.component';


export const BugFinderGame = memo(() => {
  const { gameState, currentChallenge, actions } = useBugFinder();
  const modalRef = useRef<HTMLDivElement>(null);
  const [localCode, setLocalCode] = useState(gameState.currentCode);

  useEffect(() => {
    console.log('=== BugFinderGame Debug ===');
    console.log('1. Local code:', localCode);
    console.log('2. Game state code:', gameState.currentCode);
    console.log('3. Current challenge:', currentChallenge);
    console.log('4. Container dimensions:', {
      height: document.querySelector('.flex-1.overflow-hidden')?.clientHeight,
      width: document.querySelector('.flex-1.overflow-hidden')?.clientWidth
    });
    setLocalCode(gameState.currentCode);
  }, [localCode, gameState.currentCode, currentChallenge]);

  const handleCodeChange = useCallback((code: string) => {
    setLocalCode(code);
    actions.updateCode(code);
  }, [actions]);

  useClickOutside(modalRef, () => {
    if (gameState.feedback.type) {
      actions.hideFeedback();
    }
  })

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const buttonConfig = useMemo(() => {
    if (gameState.isGameOver) {
      return {
        text: 'Zakończ grę',
        icon: <FaArrowRight className="w-4 h-4" />,
        action: () => {
          actions.hideFeedback();
          actions.finishGame();
        }
      };
    }
    return {
      text: 'Sprawdź rozwiązanie',
      icon: <FaCheck className="w-4 h-4" />,
      action: actions.checkSolution
    };
  }, [gameState.isGameOver, actions]);

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

      <div className="flex-1 overflow-hidden border border-js/10 rounded-lg my-4">
        <div className="h-full">
          <CodeEditor
            code={localCode}
            onChange={handleCodeChange}
            disabled={gameState.isGameOver}
          />
        </div>
      </div>

      <div className="mt-auto p-4 border-t border-js/10">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={buttonConfig.action}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-js text-dark font-medium hover:bg-js/90 transition-colors"
        >
          {buttonConfig.icon}
          <span>{buttonConfig.text}</span>
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
              ref={modalRef}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className={`p-4 rounded-lg shadow-xl max-w-md w-full ${
                gameState.feedback.type === 'success' 
                  ? 'bg-green-900/90 border border-green-500/20' 
                  : 'bg-red-900/90 border border-red-500/20'
              }`}
            >
              <div className="flex flex-col gap-4">
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
                {gameState.isGameOver && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      actions.hideFeedback();
                      actions.finishGame();
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-js text-dark font-medium hover:bg-js/90 transition-colors"
                  >
                    <span>Zakończ grę</span>
                  </motion.button>
                )}
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