import { memo } from 'react';
import { motion } from 'framer-motion';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { FaCheck, FaLightbulb, FaClock } from 'react-icons/fa';
import { useBugFinder } from '../hooks/useBugFinder';

SyntaxHighlighter.registerLanguage('javascript', js);

export const BugFinderGame = memo(() => {
  const { gameState, currentChallenge, actions } = useBugFinder();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Górny pasek z informacjami */}
      <div className="flex items-center justify-between p-4 bg-dark-900/50 border-b border-js/10">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2 text-gray-300">
            <FaClock className="w-4 h-4 text-js" />
            {formatTime(gameState.timeElapsed)} / {formatTime(currentChallenge.timeLimit)}
          </span>
          <span className="text-gray-300">
            Poziom {gameState.currentLevel + 1}/{challenges.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg bg-js/10 text-js hover:bg-js/20 transition-colors"
            title="Pokaż podpowiedź"
          >
            <FaLightbulb className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Edytor kodu */}
      <div className="flex-1 overflow-hidden">
        <SyntaxHighlighter
          language="javascript"
          style={vs2015}
          customStyle={{
            margin: 0,
            height: '100%',
            background: 'transparent',
            padding: '1rem',
          }}
          className="h-full"
          wrapLines={true}
          showLineNumbers={true}
          lineNumberStyle={{ color: '#666' }}
          contentEditable={true}
          onKeyDown={(e) => {
            if (e.key === 'Tab') {
              e.preventDefault();
              const target = e.target as HTMLElement;
              const selection = window.getSelection();
              if (selection) {
                const range = selection.getRangeAt(0);
                const tabNode = document.createTextNode('  ');
                range.insertNode(tabNode);
                range.setStartAfter(tabNode);
                range.setEndAfter(tabNode);
              }
            }
          }}
          onChange={(code) => actions.updateCode(code)}
        >
          {gameState.currentCode}
        </SyntaxHighlighter>
      </div>

      {/* Dolny pasek z przyciskiem sprawdzenia */}
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
    </div>
  );
});

BugFinderGame.displayName = 'BugFinderGame'; 