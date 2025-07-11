import { useMemo, useState, useEffect, useCallback } from 'react';
import { FaFileAlt, FaCode, FaPalette, FaLightbulb } from 'react-icons/fa';
import { getTips, getExamples, getStats, updateProgress } from '../api/cv.api';
import type { CVView, CVTip, CVExample, CVStats } from '../types/cv.types';
import type { AnimationVariants } from '../../../types/recruitment.types';

export const useCVPreparation = () => {
  const [currentView, setCurrentView] = useState<CVView>('main');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const [tips, setTips] = useState<CVTip[]>([]);
  const [examples, setExamples] = useState<CVExample[]>([]);
  const [stats, setStats] = useState<CVStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(false);

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

  const cardVariants: AnimationVariants = useMemo(
    () => ({
      hidden: { opacity: 0, scale: 0.9 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.4,
          ease: 'easeOut',
        },
      },
    }),
    []
  );

  const cvPreparationSections = useMemo(() => [
    {
      id: 'content-tips',
      title: 'Treść i zawartość',
      description: 'Jak napisać CV które sprzeda Twoje umiejętności',
      icon: FaFileAlt,
      stats: {
        items: tips.filter(tip => tip.category === 'content').length,
        completed: stats?.userProgress?.completedSections || 0
      },
      isAvailable: true,
    },
    {
      id: 'technical-tips',
      title: 'Umiejętności techniczne',
      description: 'Jak prezentować projekty i technologie',
      icon: FaCode,
      stats: {
        items: tips.filter(tip => ['skills', 'projects'].includes(tip.category)).length,
        completed: stats?.userProgress?.completedSections || 0
      },
      isAvailable: true,
    },
    {
      id: 'design-tips',
      title: 'Formatowanie i design',
      description: 'Jak sprawić żeby CV wyglądało profesjonalnie',
      icon: FaPalette,
      stats: {
        items: tips.filter(tip => tip.category === 'design').length,
        completed: stats?.userProgress?.completedSections || 0
      },
      isAvailable: true,
    },
    {
      id: 'examples',
      title: 'Przykłady opisów',
      description: 'Gotowe opisy projektów i doświadczenia',
      icon: FaLightbulb,
      stats: {
        items: examples.length,
        completed: stats?.userProgress?.completedSections || 0
      },
      isAvailable: true,
    }
  ], [tips, examples, stats]);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [tipsResponse, examplesResponse, statsResponse] = await Promise.all([
        getTips({ limit: 50, sortBy: 'order' }),
        getExamples({ limit: 50, sortBy: 'order' }),
        getStats()
      ]);

      setTips(tipsResponse.data);
      setExamples(examplesResponse.data);
      setStats(statsResponse);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Błąd podczas ładowania danych');
    } finally {
      setLoading(false);
    }
  };

  const loadTips = useCallback(async (category?: string, page = 1) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await getTips({
        category: category && category !== 'all' ? category : undefined,
        search: searchQuery || undefined,
        page,
        limit: 20,
        sortBy: 'order'
      });

      if (page === 1) {
        setTips(response.data);
      } else {
        setTips(prev => [...prev, ...response.data]);
      }
      
      setCurrentPage(response.pagination.page);
      setTotalPages(response.pagination.totalPages);
      setHasMore(response.pagination.hasNext);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Błąd podczas ładowania porad');
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  const loadExamples = useCallback(async (page = 1) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await getExamples({
        search: searchQuery || undefined,
        page,
        limit: 20,
        sortBy: 'order'
      });

      if (page === 1) {
        setExamples(response.data);
      } else {
        setExamples(prev => [...prev, ...response.data]);
      }
      
      setCurrentPage(response.pagination.page);
      setTotalPages(response.pagination.totalPages);
      setHasMore(response.pagination.hasNext);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Błąd podczas ładowania przykładów');
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  const filteredTips = useMemo(() => {
    if (currentView === 'main') return tips;
    
    const categoryMap: Record<string, string[]> = {
      'content-tips': ['content'],
      'technical-tips': ['skills', 'projects'],
      'design-tips': ['design']
    };

    const categories = categoryMap[currentView] || [];
    return tips.filter(tip => categories.includes(tip.category));
  }, [tips, currentView]);

  const filteredExamples = useMemo(() => {
    return examples;
  }, [examples]);

  const trackProgress = useCallback(async (type: 'tip_viewed' | 'example_viewed' | 'example_copied', itemId: string) => {
    try {
      await updateProgress({ type, itemId });
      const newStats = await getStats();
      setStats(newStats);
    } catch (err) {
      console.error('Błąd podczas śledzenia postępu:', err);
    }
  }, []);

  const handleSectionClick = (sectionId: string) => {
    setCurrentView(sectionId as CVView);
    setCurrentPage(1);
    
    if (sectionId === 'examples') {
      loadExamples(1);
    } else {
      const categoryMap: Record<string, string> = {
        'content-tips': 'content',
        'technical-tips': 'skills',
        'design-tips': 'design'
      };
      loadTips(categoryMap[sectionId], 1);
    }
  };

  const handleBackToMain = () => {
    setCurrentView('main');
    setSearchQuery('');
    setSelectedCategory('all');
    setCurrentPage(1);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    
    if (currentView === 'examples') {
      loadExamples(1);
    } else if (currentView !== 'main') {
      const categoryMap: Record<string, string> = {
        'content-tips': 'content',
        'technical-tips': 'skills',
        'design-tips': 'design'
      };
      loadTips(categoryMap[currentView], 1);
    }
  };

  const loadMore = () => {
    if (!hasMore || loading) return;
    
    const nextPage = currentPage + 1;
    if (currentView === 'examples') {
      loadExamples(nextPage);
    } else {
      const categoryMap: Record<string, string> = {
        'content-tips': 'content',
        'technical-tips': 'skills',
        'design-tips': 'design'
      };
      loadTips(categoryMap[currentView], nextPage);
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setCurrentPage(1);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchQuery.trim() !== '') count++;
    if (selectedCategory !== 'all') count++;
    return count;
  };

  return {
    currentView,
    searchQuery,
    selectedCategory,
    loading,
    error,
    currentPage,
    totalPages,
    hasMore,

    tips: filteredTips,
    examples: filteredExamples,
    stats,
    cvPreparationSections,

    containerVariants,
    itemVariants,
    cardVariants,

    setCurrentView,
    setSearchQuery,
    setSelectedCategory,
    handleSectionClick,
    handleBackToMain,
    handleSearch,
    loadMore,
    resetFilters,
    getActiveFiltersCount,
    trackProgress,
    
    refetch: loadInitialData,
  };
}; 