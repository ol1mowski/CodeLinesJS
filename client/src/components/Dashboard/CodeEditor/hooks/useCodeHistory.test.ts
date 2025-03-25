import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCodeHistory } from './useCodeHistory.hook';

describe('useCodeHistory', () => {
  const STORAGE_KEY = 'code_history';
  
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should initialize with an empty array if there is no saved history', () => {
    const { result } = renderHook(() => useCodeHistory());
    expect(result.current.history).toEqual([]);
  });

  it('should initialize with saved history from localStorage', () => {
    const savedHistory = [
      { code: 'console.log("test")', timestamp: 1234567890 },
      { code: 'const x = 5;', timestamp: 1234567891 }
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedHistory));
    
    const { result } = renderHook(() => useCodeHistory());
    expect(result.current.history).toEqual(savedHistory);
  });

  it('should add new code to history', () => {
    const { result } = renderHook(() => useCodeHistory());
    const testCode = 'console.log("Hello World")';
    
    act(() => {
      result.current.addToHistory(testCode);
    });
    
    expect(result.current.history.length).toBe(1);
    expect(result.current.history[0].code).toBe(testCode);
    expect(result.current.history[0].timestamp).toBeDefined();
    
    const savedHistory = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    expect(savedHistory.length).toBe(1);
    expect(savedHistory[0].code).toBe(testCode);
  });

  it('should avoid duplicates and move existing code to the top of the list', () => {
    const { result } = renderHook(() => useCodeHistory());
    const testCode1 = 'console.log("First")';
    const testCode2 = 'console.log("Second")';
    
    act(() => {
      result.current.addToHistory(testCode1);
      result.current.addToHistory(testCode2);
      result.current.addToHistory(testCode1);
    });
    
    expect(result.current.history.length).toBe(2);
    expect(result.current.history[0].code).toBe(testCode1);
    expect(result.current.history[1].code).toBe(testCode2);
  });

  it('should limit the history length to MAX_HISTORY_LENGTH (10)', () => {
    const { result } = renderHook(() => useCodeHistory());
    
    for (let i = 0; i < 12; i++) {
      act(() => {
        result.current.addToHistory(`console.log(${i})`);
      });
    }
    
    expect(result.current.history.length).toBe(10);
    expect(result.current.history[0].code).toBe('console.log(11)');
    expect(result.current.history.find(entry => entry.code === 'console.log(0)')).toBeUndefined();
    expect(result.current.history.find(entry => entry.code === 'console.log(1)')).toBeUndefined();
  });

  it('should clear history when clearHistory is called', () => {
    const { result } = renderHook(() => useCodeHistory());
    
    act(() => {
      result.current.addToHistory('console.log("test")');
    });
    
    expect(result.current.history.length).toBe(1);
    
    act(() => {
      result.current.clearHistory();
    });
    
    expect(result.current.history).toEqual([]);
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });
}); 