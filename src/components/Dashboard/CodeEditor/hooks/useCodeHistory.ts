import { useState, useCallback } from 'react';

const STORAGE_KEY = 'code_history';
const MAX_HISTORY_LENGTH = 10;

type CodeHistoryEntry = {
  code: string;
  timestamp: number;
};

export const useCodeHistory = () => {
  const [history, setHistory] = useState<CodeHistoryEntry[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const addToHistory = useCallback((code: string) => {
    setHistory(prev => {
      const newHistory = [
        { code, timestamp: Date.now() },
        ...prev.filter(entry => entry.code !== code)
      ].slice(0, MAX_HISTORY_LENGTH);
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
  }, []);

  const clearHistory = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setHistory([]);
  }, []);

  return {
    history,
    addToHistory,
    clearHistory
  };
}; 