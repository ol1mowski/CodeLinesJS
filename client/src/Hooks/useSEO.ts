import { useMemo } from 'react';

type UseSEOProps = {
  title?: string;
  description?: string;
  gameName?: string;
};

/**
 * Hook zarządzający SEO dla gier
 * @param title - Opcjonalny tytuł strony
 * @param description - Opcjonalny opis strony
 * @param gameName - Nazwa gry, domyślnie 'JSTypoHunter'
 */
export const useSEO = ({
  title,
  description,
  gameName = 'JSTypoHunter'
}: UseSEOProps = {}) => {
  const pageTitle = useMemo(() => {
    if (title) return `${title} | CodeLinesJS`;
    return `${gameName} - Gra programistyczna | CodeLinesJS`;
  }, [title, gameName]);

  const pageDescription = useMemo(() => {
    if (description) return description;
    return `Zagraj w ${gameName} - interaktywną grę programistyczną, która pomoże Ci rozwinąć umiejętności kodowania.`;
  }, [description, gameName]);

  return { pageTitle, pageDescription };
}; 