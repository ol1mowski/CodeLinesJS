import { useState, useCallback } from 'react';
import type { PracticeTask } from './usePracticeApi.hook';
import { usePracticeApi } from './usePracticeApi.hook';

export const usePracticeTask = () => {
  const [selectedTask, setSelectedTask] = useState<PracticeTask | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [solutionLoading, setSolutionLoading] = useState(false);
  
  const { loadSolution } = usePracticeApi();

  const handleTaskSelect = useCallback((task: PracticeTask) => {
    setSelectedTask(task);
    setShowSolution(false);
  }, []);

  const handleBackToList = useCallback(() => {
    setSelectedTask(null);
    setShowSolution(false);
  }, []);

  const handleShowSolution = useCallback(async () => {
    if (!selectedTask) return;
    
    if (!showSolution && (!selectedTask.solution || selectedTask.solution === '')) {
      setSolutionLoading(true);
      
      try {
        const response = await loadSolution(selectedTask.id);
        
        if (response.data && response.data.solution) {
          setSelectedTask(prev => prev ? {
            ...prev,
            solution: response.data!.solution
          } : null);
        }
      } catch (error) {
        console.error('Błąd podczas ładowania rozwiązania:', error);
      } finally {
        setSolutionLoading(false);
      }
    }
    
    setShowSolution(prev => !prev);
  }, [selectedTask, showSolution, loadSolution]);

  const resetTask = useCallback(() => {
    setSelectedTask(null);
    setShowSolution(false);
    setSolutionLoading(false);
  }, []);

  return {
    selectedTask,
    showSolution,
    solutionLoading,
    
    handleTaskSelect,
    handleBackToList,
    handleShowSolution,
    resetTask
  };
}; 