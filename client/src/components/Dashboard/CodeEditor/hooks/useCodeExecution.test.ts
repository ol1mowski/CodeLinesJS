import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCodeExecution } from './useCodeExecution.hook';

describe('useCodeExecution', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('should initialize with an empty output array and isExecuting=false', () => {
    const { result } = renderHook(() => useCodeExecution());
    expect(result.current.output).toEqual([]);
    expect(result.current.isExecuting).toBe(false);
  });

  it('should clear the console when clearConsole is called', () => {
    const { result } = renderHook(() => useCodeExecution());
    
    act(() => {
      result.current.executeCode('console.log("test")');
      vi.advanceTimersByTime(100); 
    });
    
    expect(result.current.output.length).toBeGreaterThan(0);
    
    act(() => {
      result.current.clearConsole();
    });
    
    expect(result.current.output).toEqual([]);
  });

  it('should execute valid JavaScript code and save the output', async () => {
    const { result } = renderHook(() => useCodeExecution());
    
    act(() => {
      result.current.executeCode('console.log("Hello"); console.log("World");');
    });
    
    vi.advanceTimersByTime(100);
    
    expect(result.current.output).toEqual(['Hello', 'World']);
    expect(result.current.isExecuting).toBe(false);
  });

  it('should handle syntax errors in code', async () => {
    const { result } = renderHook(() => useCodeExecution());
    
    act(() => {
      result.current.executeCode('const x = ;');
    });
    
    vi.advanceTimersByTime(100);
    
    expect(result.current.output.length).toBe(1);
    expect(result.current.output[0]).toContain('Błąd:');
    expect(result.current.isExecuting).toBe(false);
  });

  it('should handle timeout in case of infinite loops', async () => {
    const { result } = renderHook(() => useCodeExecution());
    
    act(() => {
      result.current.executeCode('while(true) {}');
    });
    
    vi.advanceTimersByTime(4000);
    
    expect(result.current.output.length).toBe(1);
    expect(result.current.output[0]).toContain('Przekroczono limit czasu');
    expect(result.current.isExecuting).toBe(false);
  });
}); 