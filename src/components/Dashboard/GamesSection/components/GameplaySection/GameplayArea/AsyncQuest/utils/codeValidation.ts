export const validateAsyncCode = (userCode: string, correctCode: string): boolean => {
  // Usuń białe znaki i formatowanie
  const normalizeCode = (code: string) => 
    code.replace(/\s+/g, ' ').trim();

  const normalizedUser = normalizeCode(userCode);
  const normalizedCorrect = normalizeCode(correctCode);

  // Podstawowa walidacja
  if (normalizedUser === normalizedCorrect) {
    return true;
  }

  // Zaawansowana walidacja dla różnych stylów zapisu
  const isAsyncFunction = (code: string) =>
    code.includes('async') && code.includes('function');
  
  const hasPromiseHandling = (code: string) =>
    code.includes('.then(') && code.includes('.catch(');

  const hasErrorHandling = (code: string) =>
    code.includes('try') && code.includes('catch');

  // Sprawdź czy kod spełnia te same wymagania co wzorcowe rozwiązanie
  if (isAsyncFunction(correctCode) && !isAsyncFunction(userCode)) {
    return false;
  }

  if (hasPromiseHandling(correctCode) && !hasPromiseHandling(userCode)) {
    return false;
  }

  if (hasErrorHandling(correctCode) && !hasErrorHandling(userCode)) {
    return false;
  }

  // Można dodać więcej reguł walidacji

  return true;
}; 