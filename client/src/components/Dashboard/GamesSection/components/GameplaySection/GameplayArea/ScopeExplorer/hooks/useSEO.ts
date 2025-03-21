import { useMemo } from 'react';

type UseSEOProps = {
  title?: string;
  description?: string;
  gameName?: string;
};

export const useSEO = ({ 
  title, 
  description,
  gameName = 'Scope Explorer'
}: UseSEOProps = {}) => {
  const pageTitle = useMemo(() => {
    return title || `${gameName} | CodeLinesJS`;
  }, [title, gameName]);

  const pageDescription = useMemo(() => {
    return description || `${gameName} CodeLinesJS - dołącz do nas i rozwijaj swoje umiejętności w przyjaznym środowisku.`;
  }, [description, gameName]);

  return {
    pageTitle,
    pageDescription
  };
}; 