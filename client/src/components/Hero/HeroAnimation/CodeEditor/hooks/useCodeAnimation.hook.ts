import { useState, useEffect, useCallback, useMemo } from 'react';
import { CodeLine } from '../types';
import { TYPING_INTERVAL } from '../constants';
import { codeLines } from '../data/codeExample';
import { useMobileDetect } from '../../../../../hooks/useMobileDetect';

export const useCodeAnimation = () => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [visibleLines, setVisibleLines] = useState<CodeLine[]>([]);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const isMobile = useMobileDetect();

  const memoizedCodeLines = useMemo(() => {
    if (isMobile) {
      return codeLines.filter((_, index) => index % 2 === 0 || index < 3);
    }
    return codeLines;
  }, [isMobile]);

  const resetAnimation = useCallback(() => {
    if (isAnimationComplete) {
      setCurrentLineIndex(0);
      setVisibleLines([]);
      setIsAnimationComplete(false);
    }
  }, [isAnimationComplete]);

  useEffect(() => {
    if (isMobile) {
      setVisibleLines(memoizedCodeLines);
      setCurrentLineIndex(memoizedCodeLines.length);
      setIsAnimationComplete(true);
      return;
    }

    const interval = TYPING_INTERVAL;
    
    const typingInterval = setInterval(() => {
      if (currentLineIndex < memoizedCodeLines.length) {
        setVisibleLines(prev => [...prev, memoizedCodeLines[currentLineIndex]]);
        setCurrentLineIndex(prev => prev + 1);
      } else {
        clearInterval(typingInterval);
        setIsAnimationComplete(true);
      }
    }, interval);

    return () => clearInterval(typingInterval);
  }, [currentLineIndex, memoizedCodeLines, isMobile]);

  return {
    visibleLines,
    currentLineIndex,
    isAnimationComplete,
    resetAnimation
  };
}; 