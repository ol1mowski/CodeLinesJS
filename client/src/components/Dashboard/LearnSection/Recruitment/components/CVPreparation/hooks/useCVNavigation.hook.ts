import { useState, useCallback } from 'react';
import type { CVView } from '../types/cv.types';

export const useCVNavigation = () => {
  const [currentView, setCurrentView] = useState<CVView>('main');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleSectionClick = useCallback((sectionId: string) => {
    setCurrentView(sectionId as CVView);
  }, []);

  const handleBackToMain = useCallback(() => {
    setCurrentView('main');
    setSearchQuery('');
    setSelectedCategory('all');
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('all');
  }, []);

  const getActiveFiltersCount = useCallback(() => {
    let count = 0;
    if (searchQuery.trim() !== '') count++;
    if (selectedCategory !== 'all') count++;
    return count;
  }, [searchQuery, selectedCategory]);

  return {
    currentView,
    searchQuery,
    selectedCategory,

    setCurrentView,
    setSearchQuery,
    setSelectedCategory,
    handleSectionClick,
    handleBackToMain,
    handleSearch,
    resetFilters,
    getActiveFiltersCount
  };
}; 