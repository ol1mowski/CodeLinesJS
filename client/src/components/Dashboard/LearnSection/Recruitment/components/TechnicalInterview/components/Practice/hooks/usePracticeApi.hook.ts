import { useState, useCallback } from 'react';
import { 
  getPracticeTasks, 
  getPracticeCategories, 
  getPracticeStats,
  getPracticeTaskSolution,
  IPracticeTask
} from '../api/practiceTasks.api';

interface PracticeTask {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  estimatedTime: number;
  taskContent: string;
  solution: string;
  tips: string[];
  tags: string[];
}

const convertApiTaskToLocal = (apiTask: IPracticeTask): PracticeTask => ({
  id: apiTask._id,
  title: apiTask.title,
  description: apiTask.description,
  difficulty: apiTask.difficulty,
  category: apiTask.category,
  estimatedTime: apiTask.estimatedTime,
  taskContent: apiTask.taskContent,
  solution: apiTask.solution || '',
  tips: apiTask.tips,
  tags: apiTask.tags
});

export const usePracticeApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = useCallback(async (limit: number = 50) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await getPracticeTasks(limit);
      
      if (response.error) {
        setError(response.error);
        return { data: null, error: response.error };
      }

      if (response.data) {
        const convertedTasks = response.data.map(convertApiTaskToLocal);
        return { data: convertedTasks, error: null };
      }

      return { data: null, error: 'Brak danych' };
    } catch (err) {
      const errorMessage = 'Błąd podczas ładowania zadań';
      setError(errorMessage);
      return { data: null, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const loadCategories = useCallback(async () => {
    try {
      const response = await getPracticeCategories();
      
      if (response.error) {
        setError(response.error);
        return { data: null, error: response.error };
      }

      return { data: response.data, error: null };
    } catch (err) {
      const errorMessage = 'Błąd podczas ładowania kategorii';
      setError(errorMessage);
      return { data: null, error: errorMessage };
    }
  }, []);

  const loadStats = useCallback(async () => {
    try {
      const response = await getPracticeStats();
      
      if (response.error) {
        setError(response.error);
        return { data: null, error: response.error };
      }

      if (response.data) {
        const stats = {
          total: response.data.totalTasks,
          easy: response.data.tasksByDifficulty.easy,
          medium: response.data.tasksByDifficulty.medium,
          hard: response.data.tasksByDifficulty.hard
        };
        return { data: stats, error: null };
      }

      return { data: null, error: 'Brak danych statystyk' };
    } catch (err) {
      const errorMessage = 'Błąd podczas ładowania statystyk';
      setError(errorMessage);
      return { data: null, error: errorMessage };
    }
  }, []);

  const loadSolution = useCallback(async (taskId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await getPracticeTaskSolution(taskId);
      
      if (response.error) {
        setError(response.error);
        return { data: null, error: response.error };
      }

      return { data: response.data, error: null };
    } catch (err) {
      const errorMessage = 'Błąd podczas ładowania rozwiązania';
      setError(errorMessage);
      return { data: null, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    loadTasks,
    loadCategories,
    loadStats,
    loadSolution,
    convertApiTaskToLocal
  };
};

export type { PracticeTask }; 