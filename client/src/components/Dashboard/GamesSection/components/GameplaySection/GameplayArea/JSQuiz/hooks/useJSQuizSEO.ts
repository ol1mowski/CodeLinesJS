import { useMemo } from 'react';

interface UseJSQuizSEOProps {
  title?: string;
  description?: string;
  gameName?: string;
}

export const useJSQuizSEO = ({
  title,
  description,
  gameName = 'JS Quiz',
}: UseJSQuizSEOProps = {}) => {
  const pageTitle = useMemo(() => {
    if (title) return title;
    return `${gameName} - Quiz JavaScript | CodeLinesJS`;
  }, [title, gameName]);

  const pageDescription = useMemo(() => {
    if (description) return description;
    return `Sprawdź swoją wiedzę z JavaScript w quizie ${gameName}. Odpowiadaj na pytania i zdobywaj punkty za poprawne odpowiedzi.`;
  }, [description, gameName]);

  return {
    pageTitle,
    pageDescription,
  };
};
