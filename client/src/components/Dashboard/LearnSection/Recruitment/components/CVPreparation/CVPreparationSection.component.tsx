import React, { memo, useMemo } from 'react';
import { useCVPreparation } from './hooks/useCVPreparation.hook';
import { CVErrorState } from './components/Common/CVErrorState.component';
import { CVMainView } from './components/Common/CVMainView.component';
import { CVDetailView } from './components/Common/CVDetailView.component';
import { getViewConfig } from './utils/cvSections.utils';

interface CVPreparationSectionProps {
  onBack: () => void;
}

export const CVPreparationSection: React.FC<CVPreparationSectionProps> = memo(({ onBack }) => {
  const {
    currentView,
    tips,
    examples,
    stats,
    loading,
    error,
    cvPreparationSections,
    containerVariants,
    itemVariants,
    hasMore,
    handleSectionClick,
    handleBackToMain,
    loadMore,
  } = useCVPreparation();

  const filteredContent = useMemo(() => {
    const viewConfig = getViewConfig();
    const config = viewConfig[currentView as keyof typeof viewConfig];
    if (!config) return null;

    if (currentView === 'examples') {
      return {
        title: config.title,
        description: config.description,
        items: examples,
        type: 'examples' as const
      };
    } else {
      return {
        title: config.title,
        description: config.description,
        items: tips,
        type: 'tips' as const
      };
    }
  }, [currentView, tips, examples]);

  if (error) {
    return <CVErrorState error={error} onBack={onBack} />;
  }

  if (filteredContent && currentView !== 'main') {
    return (
      <CVDetailView
        title={filteredContent.title}
        description={filteredContent.description}
        type={filteredContent.type}
        items={filteredContent.items}
        loading={loading}
        hasMore={hasMore}
        onBack={handleBackToMain}
        onLoadMore={loadMore}
      />
    );
  }
      
  return (
    <CVMainView
      stats={stats}
      loading={loading}
      cvPreparationSections={cvPreparationSections}
      containerVariants={containerVariants}
      itemVariants={itemVariants}
      onBack={onBack}
      onSectionClick={handleSectionClick}
    />
  );
});

CVPreparationSection.displayName = 'CVPreparationSection'; 