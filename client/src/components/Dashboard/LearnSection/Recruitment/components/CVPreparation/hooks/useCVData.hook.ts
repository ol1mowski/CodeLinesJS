import { useState, useEffect, useCallback } from 'react';
import { getTips, getExamples, getStats } from '../api/cv.api';
import type { CVTip, CVExample, CVStats, CVTipQuery, CVExampleQuery } from '../types/cv.types';

export const useCVData = () => {
  const [tips, setTips] = useState<CVTip[]>([]);
  const [examples, setExamples] = useState<CVExample[]>([]);
  const [stats, setStats] = useState<CVStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
    
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const loadInitialData = useCallback(async () => {
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
  }, []);

  const loadTips = useCallback(async (query: CVTipQuery, page = 1) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await getTips({
        ...query,
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
  }, []);

  const loadExamples = useCallback(async (query: CVExampleQuery, page = 1) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await getExamples({
        ...query,
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
  }, []);

  const refreshStats = useCallback(async () => {
    try {
      const newStats = await getStats();
      setStats(newStats);
    } catch (err) {
      console.error('Błąd podczas odświeżania statystyk:', err);
    }
  }, []);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  return {
    tips,
    examples,
    stats,
    
    loading,
    error,
    
    currentPage,
    totalPages,
    hasMore,
    
    loadTips,
    loadExamples,
    refreshStats,
    refetch: loadInitialData,
    
    setCurrentPage,
    setError
  };
}; 