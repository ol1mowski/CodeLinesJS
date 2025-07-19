
export const sanitizeHtml = (html: string): string => {
  if (!html) return '';

  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .replace(/data:/gi, 'nodata:');
};

export const sanitizeCode = (code: string): string => {
  if (!code) return '';

  return code
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .replace(/data:/gi, 'nodata:')
    .replace(/eval\s*\(/gi, '')
    .replace(/new\s+Function\s*\(/gi, '');
};

export const sanitizeErrorMessage = (message: string | undefined): string => {
  if (!message) return 'Wystąpił nieznany błąd';

  return String(message)
    .replace(/[\r\n]+/g, ' ')
    .replace(/[<>'"]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .replace(/data:/gi, '')
    .replace(/window\./gi, '')
    .replace(/document\./gi, '')
    .replace(/eval\(/gi, '')
    .substring(0, 500);
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const isStrongPassword = (password: string): boolean => {
  const minLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);

  return minLength && hasUppercase && hasLowercase && hasDigit;
};
