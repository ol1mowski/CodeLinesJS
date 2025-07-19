import { useMobileDetect } from '../../../../hooks/useMobileDetect.hook';
import { useLatestFeatures } from '../../../hooks/useLatestFeatures';
import { LatestFeature } from '../../../api/latestFeatures.api';
import { NewsCard } from './NewsCard.component';
import { LoadingSpinner } from '../../../../UI/LoadingSpinner/LoadingSpinner.component';
import { ErrorAlert } from '../../../../UI/Alerts/ErrorAlert.component';

const getCategoryDisplayName = (category: string): string => {
  const categoryMap: Record<string, string> = {
    feature: 'Nowość',
    update: 'Aktualizacja',
    improvement: 'Ulepszenie',
    bugfix: 'Poprawka'
  };
  return categoryMap[category] || category;
};

const getCategoryColor = (category: string): string => {
  const colorMap: Record<string, string> = {
    feature: '#f7df1e',
    update: '#3b82f6',
    improvement: '#10b981',
    bugfix: '#ef4444'
  };
  return colorMap[category] || '#f7df1e';
};

export const NewsCards = () => {
  const isMobile = useMobileDetect();
  
  const { features, isLoading, error } = useLatestFeatures();

  if (isLoading) {
    return <LoadingSpinner fullScreen text="Ładowanie najnowszych funkcji..." />;
  }

  if (error) {
    return <ErrorAlert message="Wystąpił błąd podczas ładowania najnowszych funkcji" />;
  }

  if (!features || features.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">Brak najnowszych funkcji do wyświetlenia</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
      {features.map((feature: LatestFeature, index: number) => (
        <NewsCard
          key={feature._id}
          id={feature._id}
          version={feature.version || `v${feature.priority}.0`}
          title={feature.title.toUpperCase()}
          description={feature.description}
          category={getCategoryDisplayName(feature.category)}
          categoryColor={getCategoryColor(feature.category)}
          releaseDate={feature.releaseDate}
          tags={feature.tags}
          delay={isMobile ? 0 : (index + 1) * 0.1}
        />
      ))}
    </div>
  );
}; 