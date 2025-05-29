import { useMemo } from 'react';

export const useMethodQuizSEO = () => {
  return useMemo(() => {
    const pageTitle = 'Method Quiz | CodeLinesJS';
    const pageDescription = 
      'Sprawdź swoją znajomość metod JavaScript! Uzupełnij brakujące metody w kodzie i zobacz jak dobrze znasz Array, String, Object i DOM methods.';

    return {
      pageTitle,
      pageDescription,
    };
  }, []);
}; 