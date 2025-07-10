import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import { usePracticeSection } from './components/Practice/hooks/usePracticeSection.hook';
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
        setSelectedCategory,
        setSelectedDifficulty,
        setSearchQuery,
        handleTaskSelect,
        handleBackToList,
        handleShowSolution,
        resetFilters
    } = usePracticeSection();

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
                {tasks.map((task, index) => (
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