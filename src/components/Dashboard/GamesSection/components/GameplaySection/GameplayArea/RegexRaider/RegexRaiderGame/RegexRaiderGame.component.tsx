import React, { memo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { RegexChallenge } from '../../../../../types/regexRaider.types';
import { regexChallenges } from '../../../../../data/regexChallenges.data';

type RegexRaiderGameProps = {
  onScoreUpdate: (points: number) => void;
  onLevelComplete: () => void;
  currentLevel: number;
};

export const RegexRaiderGame = memo(({ 
  onScoreUpdate,
  onLevelComplete,
  currentLevel
}: RegexRaiderGameProps) => {
  const [userRegex, setUserRegex] = useState('');
  const [matches, setMatches] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentChallenge = regexChallenges[currentLevel - 1];

  const handleRegexChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setUserRegex(value);
    setIsCorrect(null);
    
    try {
      const regex = new RegExp(value, 'g');
      const found = currentChallenge.text.match(regex) || [];
      setMatches(found);
      setShowHint(false);
    } catch (error) {
      setMatches([]);
    }
  }, [currentChallenge]);

  const handleSubmit = useCallback(() => {
    try {
      const userMatches = currentChallenge.text.match(new RegExp(userRegex, 'g')) || [];
      const correctMatches = currentChallenge.text.match(new RegExp(currentChallenge.correctRegex, 'g')) || [];

      const isMatch = 
        userMatches.length === correctMatches.length && 
        userMatches.every(match => correctMatches.includes(match));

      setIsCorrect(isMatch);

      if (isMatch) {
        onScoreUpdate(10);
        setTimeout(() => {
          onLevelComplete();
          setUserRegex('');
          setMatches([]);
          setIsCorrect(null);
        }, 1500);
      } else {
        setShowHint(true);
      }
    } catch (error) {
      setIsCorrect(false);
      setShowHint(true);
    }
  }, [userRegex, currentChallenge, onScoreUpdate, onLevelComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="p-4 bg-dark-800/50 border border-js/10 rounded-lg">
        <div className="text-sm text-gray-400 mb-2">Zadanie:</div>
        <div className="text-lg text-js mb-4">{currentChallenge.task}</div>
        <div className="text-sm text-gray-400 mb-2">Tekst:</div>
        <div className="font-mono bg-dark-900/50 p-4 rounded-lg text-gray-300">
          {currentChallenge.text}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex gap-4">
          <input
            type="text"
            value={userRegex}
            onChange={handleRegexChange}
            placeholder="Wpisz wyrażenie regularne..."
            className="flex-1 bg-dark-900/50 border border-js/10 rounded-lg px-4 py-2 text-gray-300 font-mono"
          />
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-js text-dark font-medium rounded-lg hover:bg-js/90 transition-colors"
          >
            Sprawdź
          </button>
        </div>

        {matches.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-dark-900/50 rounded-lg"
          >
            <div className="text-sm text-gray-400 mb-2">Znalezione dopasowania:</div>
            <div className="space-y-1">
              {matches.map((match, index) => (
                <div key={index} className="font-mono text-js">{match}</div>
              ))}
            </div>
          </motion.div>
        )}

        {isCorrect !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg ${
              isCorrect 
                ? 'bg-green-500/20 border border-green-500/30' 
                : 'bg-red-500/20 border border-red-500/30'
            }`}
          >
            <p className={`text-sm ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
              {isCorrect 
                ? 'Świetnie! Wyrażenie regularne jest poprawne!' 
                : 'Spróbuj jeszcze raz. Wyrażenie nie znajduje wszystkich wymaganych dopasowań.'}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
});

RegexRaiderGame.displayName = 'RegexRaiderGame'; 