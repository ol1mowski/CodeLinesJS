export const validateAsyncCode = (userCode: string, correctCode: string): boolean => {
  const normalizeCode = (code: string) => 
    code.replace(/\s+/g, ' ').trim();

  const normalizedUser = normalizeCode(userCode);
  const normalizedCorrect = normalizeCode(correctCode);

  if (normalizedUser === normalizedCorrect) {
    return true;
  }

  const isAsyncFunction = (code: string) =>
    code.includes('async') && code.includes('function');
  
  const hasPromiseHandling = (code: string) =>
    code.includes('.then(') && code.includes('.catch(');

  const hasErrorHandling = (code: string) =>
    code.includes('try') && code.includes('catch');

  if (isAsyncFunction(correctCode) && !isAsyncFunction(userCode)) {
    return false;
  }

  if (hasPromiseHandling(correctCode) && !hasPromiseHandling(userCode)) {
    return false;
  }

  if (hasErrorHandling(correctCode) && !hasErrorHandling(userCode)) {
    return false;
  }

  return true;
}; 