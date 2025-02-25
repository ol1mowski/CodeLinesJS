import { useState, useCallback } from 'react';

const EXECUTION_TIMEOUT = 3000; 

export const useCodeExecution = () => {
  const [output, setOutput] = useState<string[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);

  const clearConsole = useCallback(() => {
    setOutput([]);
  }, []);

  const executeCode = useCallback((code: string) => {
    setIsExecuting(true);
    const logs: string[] = [];
    const consoleLog = console.log;

    return new Promise<void>((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error('Przekroczono limit czasu wykonania'));
      }, EXECUTION_TIMEOUT);

      try {
        console.log = (...args) => {
          logs.push(args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' '));
        };

        (async () => {
          try {
            eval(code);
            setOutput(logs);
            clearTimeout(timeoutId);
            resolve();
          } catch (error: unknown) {
            setOutput([`Błąd: ${error instanceof Error ? error.message : 'Nieznany błąd'}`]);
            reject(error);
          }
        })();
      } finally {
        console.log = consoleLog;
        setIsExecuting(false);
      }
    });
  }, []);

  return {
    output,
    isExecuting,
    executeCode,
    clearConsole
  };
}; 