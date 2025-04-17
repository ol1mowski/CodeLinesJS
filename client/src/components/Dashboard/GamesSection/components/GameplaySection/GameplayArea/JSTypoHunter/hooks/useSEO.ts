import { useMemo } from 'react';

interface UseSEOProps {
  title?: string;
  description?: string;
  gameName?: string;
}

export const useSEO = ({ title, description, gameName = 'JSTypoHunter' }: UseSEOProps = {}) => {
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
