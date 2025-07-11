import { useState, useEffect } from 'react';
import { usePracticeApi } from './usePracticeApi.hook';
import { usePracticeFilters } from './usePracticeFilters.hook';
import { usePracticeTask } from './usePracticeTask.hook';
import type { PracticeTask } from './usePracticeApi.hook';

export const usePracticeSection = () => {
  const [tasks, setTasks] = useState<PracticeTask[]>([]);
  const [categories, setCategories] = useState<string[]>(['Wszystkie']);
  const [stats, setStats] = useState({
    total: 0,
    easy: 0,
    medium: 0,
    hard: 0
  });
  
  const { loading, error, loadTasks, loadCategories, loadStats } = usePracticeApi();
  const filters = usePracticeFilters(tasks);
  const taskManager = usePracticeTask();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [tasksResponse, categoriesResponse, statsResponse] = await Promise.all([
          loadTasks(50),
          loadCategories(),
          loadStats()
        ]);

        if (tasksResponse.data) {
          setTasks(tasksResponse.data);
        }

        if (categoriesResponse.data) {
          setCategories(['Wszystkie', ...categoriesResponse.data]);
        }

        if (statsResponse.data) {
          setStats(statsResponse.data);
        }

      } catch (err) {
        console.error('Błąd podczas ładowania danych:', err);
      }
    };

    loadData();
  }, [loadTasks, loadCategories, loadStats]);

  return {
    tasks: filters.filteredTasks,
    categories,
    stats,
    loading,
    error,

    selectedCategory: filters.selectedCategory,
    selectedDifficulty: filters.selectedDifficulty,
    searchQuery: filters.searchQuery,
    setSelectedCategory: filters.setSelectedCategory,
    setSelectedDifficulty: filters.setSelectedDifficulty,
    setSearchQuery: filters.setSearchQuery,
    resetFilters: filters.resetFilters,
    getActiveFiltersCount: filters.getActiveFiltersCount,

    selectedTask: taskManager.selectedTask,
    showSolution: taskManager.showSolution,
    solutionLoading: taskManager.solutionLoading,
    handleTaskSelect: taskManager.handleTaskSelect,
    handleBackToList: taskManager.handleBackToList,
    handleShowSolution: taskManager.handleShowSolution,
    resetTask: taskManager.resetTask
  };
}; 