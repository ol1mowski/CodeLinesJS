import { useMobileDetect } from '../../../../../hooks/useMobileDetect';
import { NewsCard } from './NewsCard.component';

export const NewsCards = () => {
  const isMobile = useMobileDetect();

  const newsData = [
    {
      id: 1,
      version: 'Wersja 1.2',
      title: 'NOWE POZIOMY TRUDNOŚCI DODANE DO GRY - SPRAWDŹ SWOJE UMIEJĘTNOŚCI W ZAAWANSOWANYCH WYZWANIACH',
      category: 'Aktualizacja',
      delay: 0.1,
    },
    {
      id: 2,
      version: 'Wersja 1.1',
      title: 'SYSTEM RANKINGOWY ZOSTAŁ PRZEPROJEKTOWANY - NOWE OSIĄGNIĘCIA I NAGRODY CZEKAJĄ NA GRACZY',
      category: 'Nowość',
      delay: 0.2,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
      {newsData.map((news) => (
        <NewsCard
          key={news.id}
          version={news.version}
          title={news.title}
          category={news.category}
          delay={isMobile ? 0 : news.delay}
        />
      ))}
    </div>
  );
}; 