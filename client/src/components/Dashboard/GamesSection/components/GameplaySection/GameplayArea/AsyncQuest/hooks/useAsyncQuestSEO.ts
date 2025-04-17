import { useMemo } from 'react';

interface UseAsyncQuestSEOProps {
  title?: string;
  description?: string;
  gameName?: string;
}

export const useAsyncQuestSEO = ({
  title,
  description,
  gameName = 'Async Quest',
}: UseAsyncQuestSEOProps = {}) => {
  const pageTitle = useMemo(() => {
    return title || `${gameName} | CodeLinesJS`;
  }, [title, gameName]);

  const pageDescription = useMemo(() => {
    return (
      description ||
      `${gameName} CodeLinesJS - dołącz do nas i rozwijaj swoje umiejętności w przyjaznym środowisku.`
    );
  }, [description, gameName]);

  return {
    pageTitle,
    pageDescription,
  };
};
