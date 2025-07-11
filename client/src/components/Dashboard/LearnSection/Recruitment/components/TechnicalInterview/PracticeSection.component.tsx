import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import { usePracticeSectionApi } from './components/Practice/hooks/usePracticeSectionApi.hook';
import TaskDetails from './components/Practice/Task/components/TaskDetails.component';
import TaskCard from './components/Practice/Task/components/TaskCard.component';
import StatsSection from './components/Practice/StatsSection.component';
import FilterSection from './components/Practice/FilterSection.component';
import EmptyState from './components/Practice/EmptyState.component';

interface PracticeSectionProps {
    onBack: () => void;
}

const PracticeSection: React.FC<PracticeSectionProps> = ({ onBack }) => {
    const {
        tasks,
        categories,
        stats,
        selectedTask,
        showSolution,
        selectedCategory,
        selectedDifficulty,
        searchQuery,
        loading,
        error,
        setSelectedCategory,
        setSelectedDifficulty,
        setSearchQuery,
        handleTaskSelect,
        handleBackToList,
        handleShowSolution,
        resetFilters
    } = usePracticeSectionApi();

    if (selectedTask) {
        return (
            <TaskDetails
                task={selectedTask}
                showSolution={showSolution}
                onBack={handleBackToList}
                onShowSolution={handleShowSolution}
            />
        );
    }

    if (loading) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center min-h-[400px]"
            >
                <div className="text-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="text-gray-300">Ładowanie zadań...</p>
                </div>
            </motion.div>
        );
    }

    if (error) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center min-h-[400px]"
            >
                <div className="text-center space-y-4">
                    <div className="text-red-400 text-xl">⚠️</div>
                    <p className="text-red-400">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Spróbuj ponownie
                    </button>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
        >
            <div className="flex items-center justify-between">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onBack}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                    <FaArrowLeft className="w-4 h-4" />
                    <span>Powrót</span>
                </motion.button>
            </div>

            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-white">Zadania Praktyczne</h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Rozwiąż praktyczne zadania programistyczne, które często pojawiają się na rozmowach kwalifikacyjnych.
                </p>
                
                <StatsSection stats={stats} />
            </div>

            <FilterSection
                categories={categories}
                selectedCategory={selectedCategory}
                selectedDifficulty={selectedDifficulty}
                searchQuery={searchQuery}
                onCategoryChange={setSelectedCategory}
                onDifficultyChange={(difficulty) => setSelectedDifficulty(difficulty as any)}
                onSearchQueryChange={setSearchQuery}
                onResetFilters={resetFilters}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tasks.map((task: any, index: number) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        index={index}
                        onSelect={handleTaskSelect}
                    />
                ))}
            </div>

            {tasks.length === 0 && (
                <EmptyState onResetFilters={resetFilters} />
            )}
        </motion.div>
    );
};

PracticeSection.displayName = 'PracticeSection';

export default PracticeSection; 