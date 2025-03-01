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
    setIsRunning(true);
    setOutput([]);

    try {
      const mockConsole = {
        log: (...args: any[]) => {
          setOutput(prev => [...prev, args.map(arg => String(arg)).join(' ')]);
        },
        error: (...args: any[]) => {
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

      return {
        success: true,
        output: output,
      };
    } catch (error) {
      console.error('Błąd podczas wykonywania kodu:', error);
      return {
        success: false,
        output: output,
        error: (error as Error).message
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