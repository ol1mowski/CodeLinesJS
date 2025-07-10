import { useState, useMemo } from 'react';
import { practiceTasks, practiceCategories } from '../data/practiceData.data';
import type { PracticeTask, TaskDifficulty } from '../../../../../types/recruitment.types';

export const usePracticeSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Wszystkie');
  const [selectedDifficulty, setSelectedDifficulty] = useState<TaskDifficulty | 'all'>('all');
  const [selectedTask, setSelectedTask] = useState<PracticeTask | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTasks = useMemo(() => {
    return practiceTasks.filter((task: PracticeTask) => {
      const matchesCategory = selectedCategory === 'Wszystkie' || task.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'all' || task.difficulty === selectedDifficulty;
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           task.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesDifficulty && matchesSearch;
    });
  }, [selectedCategory, selectedDifficulty, searchQuery]);

  const stats = useMemo(() => {
    const totalTasks = practiceTasks.length;
    const easyTasks = practiceTasks.filter((task: PracticeTask) => task.difficulty === 'easy').length;
    const mediumTasks = practiceTasks.filter((task: PracticeTask) => task.difficulty === 'medium').length;
    const hardTasks = practiceTasks.filter((task: PracticeTask) => task.difficulty === 'hard').length;
    
    return {
      total: totalTasks,
      easy: easyTasks,
      medium: mediumTasks,
      hard: hardTasks
    };
  }, []);

  const handleTaskSelect = (task: PracticeTask) => {
    setSelectedTask(task);
    setShowSolution(false);
  };

  const handleBackToList = () => {
    setSelectedTask(null);
    setShowSolution(false);
  };

  const handleShowSolution = () => {
    setShowSolution(!showSolution);
  };

  const resetFilters = () => {
    setSelectedCategory('Wszystkie');
    setSelectedDifficulty('all');
    setSearchQuery('');
  };

  return {
    tasks: filteredTasks,
    categories: practiceCategories,
    stats,
    selectedTask,
    showSolution,
    
    selectedCategory,
    selectedDifficulty,
    searchQuery,
    
    setSelectedCategory,
    setSelectedDifficulty,
    setSearchQuery,
    handleTaskSelect,
    handleBackToList,
    handleShowSolution,
    resetFilters
  };
}; 