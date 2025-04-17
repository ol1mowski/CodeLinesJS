import { useCallback } from 'react';
import { sanitizeHtml, sanitizeCode, sanitizeErrorMessage } from '../utils/security';

type UseSanitizeReturn = {
  sanitizeHtml: (html: string) => string;
  sanitizeCode: (code: string) => string;
  sanitizeErrorMessage: (message: string | undefined) => string;
};

export const useSanitize = (): UseSanitizeReturn => {
  const sanitizeHtmlCallback = useCallback((html: string) => {
    return sanitizeHtml(html);
  }, []);

  const sanitizeCodeCallback = useCallback((code: string) => {
    return sanitizeCode(code);
  }, []);

  const sanitizeErrorMessageCallback = useCallback((message: string | undefined) => {
    return sanitizeErrorMessage(message);
  }, []);

  return {
    sanitizeHtml: sanitizeHtmlCallback,
    sanitizeCode: sanitizeCodeCallback,
    sanitizeErrorMessage: sanitizeErrorMessageCallback,
  };
};
