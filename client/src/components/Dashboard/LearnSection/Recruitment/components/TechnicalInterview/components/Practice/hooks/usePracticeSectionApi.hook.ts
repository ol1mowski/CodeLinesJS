import { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  getPracticeTasks, 
  getPracticeCategories, 
  getPracticeStats,
  getPracticeTaskSolution,
  IPracticeTask,
} from '../api/practiceTasks.api';
import type { TaskDifficulty } from '../../../../../types/recruitment.types';

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

export const usePracticeSectionApi = () => {
  const [tasks, setTasks] = useState<PracticeTask[]>([]);
  const [categories, setCategories] = useState<string[]>(['Wszystkie']);
  const [stats, setStats] = useState({
    total: 0,
    easy: 0,
    medium: 0,
    hard: 0
  });
  
  const [selectedCategory, setSelectedCategory] = useState<string>('Wszystkie');
  const [selectedDifficulty, setSelectedDifficulty] = useState<TaskDifficulty | 'all'>('all');
  const [selectedTask, setSelectedTask] = useState<PracticeTask | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [solutionLoading, setSolutionLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const [tasksResponse, categoriesResponse, statsResponse] = await Promise.all([
          getPracticeTasks(50),
          getPracticeCategories(),
          getPracticeStats()
        ]);

        if (tasksResponse.error) {
          setError(tasksResponse.error);
          return;
        }

        if (tasksResponse.data) {
          const convertedTasks = tasksResponse.data.map(convertApiTaskToLocal);
          setTasks(convertedTasks);
        }

        if (categoriesResponse.data) {
          setCategories(categoriesResponse.data);
        }

        if (statsResponse.data) {
          setStats({
            total: statsResponse.data.totalTasks,
            easy: statsResponse.data.tasksByDifficulty.easy,
            medium: statsResponse.data.tasksByDifficulty.medium,
            hard: statsResponse.data.tasksByDifficulty.hard
          });
        }

      } catch (err) {
        setError('Błąd podczas ładowania danych');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

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

  const loadSolution = useCallback(async (taskId: string) => {
    setSolutionLoading(true);
    
    try {
      const response = await getPracticeTaskSolution(taskId);
      
      if (response.error) {
        setError(response.error);
        return;
      }

      if (response.data && selectedTask) {
        setSelectedTask({
          ...selectedTask,
          solution: response.data.solution
        });
      }
    } catch (err) {
      setError('Błąd podczas ładowania rozwiązania');
    } finally {
      setSolutionLoading(false);
    }
  }, [selectedTask]);

  const handleTaskSelect = (task: PracticeTask) => {
    setSelectedTask(task);
    setShowSolution(false);
  };

  const handleBackToList = () => {
    setSelectedTask(null);
    setShowSolution(false);
  };

  const handleShowSolution = async () => {
    if (!selectedTask) return;
    
    if (!showSolution && (!selectedTask.solution || selectedTask.solution === '')) {
      const apiTask = tasks.find(t => t.id === selectedTask.id);
      if (apiTask) {
        await loadSolution(apiTask.id);
      }
    }
    
    setShowSolution(!showSolution);
  };

  const resetFilters = () => {
    setSelectedCategory('Wszystkie');
    setSelectedDifficulty('all');
    setSearchQuery('');
  };

  return {
    tasks: filteredTasks,
    categories,
    stats,
    selectedTask,
    showSolution,
    loading,
    error,
    solutionLoading,
    
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