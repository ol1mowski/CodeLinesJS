import { useState, useEffect, useCallback } from 'react';
import { CodeLine } from '../types';
import { TYPING_INTERVAL } from '../constants';
import { codeLines } from '../data/codeExample';

export const useCodeAnimation = () => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [visibleLines, setVisibleLines] = useState<CodeLine[]>([]);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  const resetAnimation = useCallback(() => {
    if (isAnimationComplete) {
      setCurrentLineIndex(0);
      setVisibleLines([]);
      setIsAnimationComplete(false);
    }
  }, [isAnimationComplete]);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (currentLineIndex < codeLines.length) {
        setVisibleLines(prev => [...prev, codeLines[currentLineIndex]]);
        setCurrentLineIndex(prev => prev + 1);
      } else {
        clearInterval(typingInterval);
        setIsAnimationComplete(true);
      }
    }, TYPING_INTERVAL);

    return () => clearInterval(typingInterval);
  }, [currentLineIndex]);

  return {
    visibleLines,
    currentLineIndex,
    isAnimationComplete,
    resetAnimation
  };
}; 