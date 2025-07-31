import { useState, useCallback } from 'react';
import DOMPurify from 'dompurify';

const EXECUTION_TIMEOUT = 3000;

// Lista zabronionych funkcji i obiektów
const FORBIDDEN_PATTERNS = [
  /alert\s*\(/i,
  /confirm\s*\(/i,
  /prompt\s*\(/i,
  /eval\s*\(/i,
  /Function\s*\(/i,
  /setTimeout\s*\(/i,
  /setInterval\s*\(/i,
  /fetch\s*\(/i,
  /XMLHttpRequest/i,
  /localStorage/i,
  /sessionStorage/i,
  /document\s*\./i,
  /window\s*\./i,
  /location\s*\./i,
  /history\s*\./i,
  /navigator\s*\./i,
  /screen\s*\./i,
  /innerHTML/i,
  /outerHTML/i,
  /insertAdjacentHTML/i,
  /createElement\s*\(/i,
  /appendChild\s*\(/i,
  /innerText/i,
  /textContent/i,
];

export const useCodeExecution = () => {
  const [output, setOutput] = useState<string[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);

  const clearConsole = useCallback(() => {
    setOutput([]);
  }, []);

  const validateCode = useCallback((code: string): { isValid: boolean; error?: string } => {
    // Sprawdź zabronione wz  orce
    for (const pattern of FORBIDDEN_PATTERNS) {
      if (pattern.test(code)) {
        const match = code.match(pattern);
        return {
          isValid: false,
          error: `Zabroniona operacja: ${match?.[0]?.trim()}`
        };
      }
    }

    if (code.length > 10000) {
      return {
        isValid: false,
        error: 'Kod jest za długi (maksymalnie 10,000 znaków)'
      };
    }

    return { isValid: true };
  }, []);

  const executeCode = useCallback((code: string) => {
    setIsExecuting(true);
    const logs: string[] = [];
    const consoleLog = console.log;

    return new Promise<void>((resolve, reject) => {
      const validation = validateCode(code);
      if (!validation.isValid) {
        setOutput([`Błąd walidacji: ${validation.error}`]);
        setIsExecuting(false);
        reject(new Error(validation.error));
        return;
      }

      const timeoutId = setTimeout(() => {
        reject(new Error('Przekroczono limit czasu wykonania'));
      }, EXECUTION_TIMEOUT);

      try {
        console.log = (...args) => {
          const logMessage = args
            .map(arg => (typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)))
            .join(' ');
          
          const sanitizedLog = DOMPurify.sanitize(logMessage, {
            ALLOWED_TAGS: [],
            ALLOWED_ATTR: [],
            KEEP_CONTENT: true
          });
          
          logs.push(sanitizedLog);
        };

        (async () => {
          try {
            const safeExecute = new Function(
              'console',
              `
              "use strict";
              ${code}
            `
            );

            safeExecute(console);
            setOutput(logs);
            clearTimeout(timeoutId);
            resolve();
          } catch (error: unknown) {
            const errorMessage = `Błąd: ${error instanceof Error ? error.message : 'Nieznany błąd'}`;
            const sanitizedError = DOMPurify.sanitize(errorMessage, {
              ALLOWED_TAGS: [],
              ALLOWED_ATTR: [],
              KEEP_CONTENT: true
            });
            setOutput([sanitizedError]);
            reject(error);
          }
        })();
      } finally {
        console.log = consoleLog;
        setIsExecuting(false);
      }
    });
  }, [validateCode]);

  return {
    output,
    isExecuting,
    executeCode,
    clearConsole,
  };
};
