import { useState, useCallback } from 'react';

type ExecutionResult = {
  success: boolean;
  output: string[];
  error?: string;
};

export const useCodeExecution = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string[]>([]);

  const executeCode = useCallback(async (code: string): Promise<ExecutionResult> => {
    console.log('Rozpoczęcie wykonywania kodu:', code);
    setIsRunning(true);
    setOutput([]);

    try {
      const mockConsole = {
        log: (...args: any[]) => {
          console.log('Output z kodu:', args);
          setOutput(prev => [...prev, args.map(arg => String(arg)).join(' ')]);
        },
        error: (...args: any[]) => {
          console.error('Błąd w kodzie:', args);
          setOutput(prev => [...prev, `Error: ${args.map(arg => String(arg)).join(' ')}`]);
        }
      };

      const mockFetch = () => Promise.resolve({ json: () => Promise.resolve({ data: 'mock data' }) });
      const mockTimeout = (cb: Function, ms: number) => setTimeout(cb, Math.min(ms, 1000));

      const context = {
        console: mockConsole,
        fetch: mockFetch,
        setTimeout: mockTimeout,
        Promise,
      };

      const wrappedCode = `
        with (context) {
          ${code}
        }
      `;

      const result = await new Function('context', wrappedCode)(context);
      console.log('Wynik wykonania kodu:', result);

      return {
        success: true,
        output: output,
      };
    } catch (error) {
      console.error('Błąd podczas wykonywania kodu:', error);
      return {
        success: false,
        output: output,
        error: error.message
      };
    } finally {
      setIsRunning(false);
    }
  }, []);

  return {
    executeCode,
    isRunning,
    output,
    clearOutput: () => setOutput([])
  };
}; 