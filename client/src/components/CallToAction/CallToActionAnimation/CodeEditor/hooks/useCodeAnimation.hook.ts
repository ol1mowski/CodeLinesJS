import { useState, useEffect, useCallback, useMemo } from 'react';
import { CodeLine } from '../types';
import { TYPING_INTERVAL } from '../constants';
import { codeLines } from '../data/codeExample';

export const useCodeAnimation = () => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [visibleLines, setVisibleLines] = useState<CodeLine[]>([]);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  const memoizedCodeLines = useMemo(() => codeLines, []);

  const resetAnimation = useCallback(() => {
    if (isAnimationComplete) {
      setCurrentLineIndex(0);
      setVisibleLines([]);
      setIsAnimationComplete(false);
    }
  }, [isAnimationComplete]);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (currentLineIndex < memoizedCodeLines.length) {
        setVisibleLines(prev => [...prev, memoizedCodeLines[currentLineIndex]]);
        setCurrentLineIndex(prev => prev + 1);
      } else {
        clearInterval(typingInterval);
        setIsAnimationComplete(true);
      }
    }, TYPING_INTERVAL);

    return () => clearInterval(typingInterval);
  }, [currentLineIndex, memoizedCodeLines]);

  return {
    visibleLines,
    currentLineIndex,
    isAnimationComplete,
    resetAnimation
  };
}; 