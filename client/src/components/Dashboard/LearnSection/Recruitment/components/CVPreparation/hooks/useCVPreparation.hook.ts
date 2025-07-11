import { useMemo, useCallback } from 'react';
import { useCVData } from './useCVData.hook';
import { useCVNavigation } from './useCVNavigation.hook';
import { useCVProgress } from './useCVProgress.hook';
import { useCVSections, getCategoryMapping } from '../utils/cvSections.utils';
import type { AnimationVariants } from '../../../types/recruitment.types';

export const useCVPreparation = () => {
  const cvData = useCVData();
  const navigation = useCVNavigation();
  const progress = useCVProgress({ refreshStats: cvData.refreshStats });
  const { cvPreparationSections } = useCVSections(cvData.tips, cvData.examples, cvData.stats);

  const containerVariants: AnimationVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    }),
    []
  );

  const itemVariants: AnimationVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: 'easeOut',
        },
      },
    }),
    []
  );

  const filteredTips = useMemo(() => {
    if (navigation.currentView === 'main') return cvData.tips;
    
    const categoryMap = getCategoryMapping();
    const categories = categoryMap[navigation.currentView as keyof typeof categoryMap] || [];
    return cvData.tips.filter(tip => categories.includes(tip.category));
  }, [cvData.tips, navigation.currentView]);

  const handleSectionClick = useCallback((sectionId: string) => {
    navigation.handleSectionClick(sectionId);
    cvData.setCurrentPage(1);
    
    if (sectionId === 'examples') {
      cvData.loadExamples({ search: navigation.searchQuery || undefined }, 1);
    } else {
      const categoryMap: Record<string, string> = {
        'content-tips': 'content',
        'technical-tips': 'skills',
        'design-tips': 'design'
      };
      const category = categoryMap[sectionId];
      if (category) {
        cvData.loadTips({ 
          category, 
          search: navigation.searchQuery || undefined 
        }, 1);
      }
    }
  }, [navigation, cvData]);

  const handleSearch = useCallback((query: string) => {
    navigation.handleSearch(query);
    cvData.setCurrentPage(1);
    
    if (navigation.currentView === 'examples') {
      cvData.loadExamples({ search: query || undefined }, 1);
    } else if (navigation.currentView !== 'main') {
      const categoryMap: Record<string, string> = {
        'content-tips': 'content',
        'technical-tips': 'skills',
        'design-tips': 'design'
      };
      const category = categoryMap[navigation.currentView];
      if (category) {
        cvData.loadTips({ 
          category, 
          search: query || undefined 
        }, 1);
      }
    }
  }, [navigation, cvData]);

  const loadMore = useCallback(() => {
    if (!cvData.hasMore || cvData.loading) return;
    
    const nextPage = cvData.currentPage + 1;
    if (navigation.currentView === 'examples') {
      cvData.loadExamples({ search: navigation.searchQuery || undefined }, nextPage);
    } else {
      const categoryMap: Record<string, string> = {
        'content-tips': 'content',
        'technical-tips': 'skills',
        'design-tips': 'design'
      };
      const category = categoryMap[navigation.currentView];
      if (category) {
        cvData.loadTips({ 
          category, 
          search: navigation.searchQuery || undefined 
        }, nextPage);
      }
    }
  }, [navigation, cvData]);

  const handleBackToMain = useCallback(() => {
    navigation.handleBackToMain();
    cvData.setCurrentPage(1);
  }, [navigation, cvData]);

  return {
    currentView: navigation.currentView,
    searchQuery: navigation.searchQuery,
    selectedCategory: navigation.selectedCategory,
    
    tips: filteredTips,
    examples: cvData.examples,
    stats: cvData.stats,
    loading: cvData.loading,
    error: cvData.error,
    
    currentPage: cvData.currentPage,
    totalPages: cvData.totalPages,
    hasMore: cvData.hasMore,
    
    cvPreparationSections,
    
    containerVariants,
    itemVariants,
    
    handleSectionClick,
    handleBackToMain,
    handleSearch,
    loadMore,
    trackProgress: progress.trackProgress,

    setCurrentView: navigation.setCurrentView,
    setSearchQuery: navigation.setSearchQuery,
    setSelectedCategory: navigation.setSelectedCategory,
    resetFilters: navigation.resetFilters,
    getActiveFiltersCount: navigation.getActiveFiltersCount,
    refetch: cvData.refetch
  };
}; 