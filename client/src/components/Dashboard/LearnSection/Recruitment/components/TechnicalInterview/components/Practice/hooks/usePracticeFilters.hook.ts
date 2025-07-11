import { useState, useMemo } from 'react';
import type { TaskDifficulty } from '../../../../../types/recruitment.types';
import type { PracticeTask } from './usePracticeApi.hook';

export const usePracticeFilters = (tasks: PracticeTask[]) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Wszystkie');
  const [selectedDifficulty, setSelectedDifficulty] = useState<TaskDifficulty | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTasks = useMemo(() => {
    return tasks.filter((task: PracticeTask) => {
      const matchesCategory = selectedCategory === 'Wszystkie' || task.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'all' || task.difficulty === selectedDifficulty;
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           task.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesDifficulty && matchesSearch;
    });
  }, [tasks, selectedCategory, selectedDifficulty, searchQuery]);

  const resetFilters = () => {
    setSelectedCategory('Wszystkie');
    setSelectedDifficulty('all');
    setSearchQuery('');
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (selectedCategory !== 'Wszystkie') count++;
    if (selectedDifficulty !== 'all') count++;
    if (searchQuery.trim() !== '') count++;
    return count;
  };

  return {
    selectedCategory,
    selectedDifficulty,
    searchQuery,
    filteredTasks,
    
    setSelectedCategory,
    setSelectedDifficulty,
    setSearchQuery,
    resetFilters,
    getActiveFiltersCount
  };
}; 