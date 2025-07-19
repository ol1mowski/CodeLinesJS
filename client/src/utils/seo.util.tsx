import { Helmet } from 'react-helmet-async';
import { memo } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  type?: 'website' | 'article';
  children?: React.ReactNode;
}

const DEFAULT_TITLE = 'CodeLinesJS - Nauka JavaScript przez gry i praktykę';
const DEFAULT_DESCRIPTION = 'Ucz się JavaScript w interaktywny sposób przez gry, wyzwania i praktyczne ćwiczenia. Dołącz do społeczności programistów i rozwijaj swoje umiejętności.';

export const SEO = memo(({
  title,
  description = DEFAULT_DESCRIPTION,
  type = 'website',
  children
}: SEOProps) => {
  const fullTitle = title ? `${title} | CodeLinesJS` : DEFAULT_TITLE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {children}
    </Helmet>
  );
});

SEO.displayName = 'SEO'; 