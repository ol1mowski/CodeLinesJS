import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaSearch, FaFilter, FaClock, FaCode, FaLightbulb, FaEye, FaEyeSlash, FaCopy, FaCheck } from 'react-icons/fa';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { usePracticeSection } from './hooks/usePracticeSection.hook';
import { difficultyLabels } from './data/practiceData.data';
import type { PracticeTask } from '../../types/recruitment.types';

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

    const [copied, setCopied] = React.useState(false);

    const handleCopySolution = async () => {
        if (!selectedTask) return;
        
        try {
            await navigator.clipboard.writeText(selectedTask.solution);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset po 2 sekundach
        } catch (err) {
            console.error('Nie udało się skopiować tekstu: ', err);
        }
    };

    if (selectedTask) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-dark backdrop-blur-sm z-50 overflow-y-auto"
            >
                <div className="min-h-screen p-6">
                    <div className="flex items-center justify-between mb-6">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleBackToList}
                            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                        >
                            <FaArrowLeft className="w-4 h-4" />
                            <span>Powrót do listy zadań</span>
                        </motion.button>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="mb-8">
                            <div className="flex items-center gap-4 mb-4">
                                <h1 className="text-3xl font-bold text-white">{selectedTask.title}</h1>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${selectedTask.difficulty === 'easy'
                                    ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                    : selectedTask.difficulty === 'medium'
                                        ? 'bg-js/10 text-js border-js/20'
                                        : 'bg-red-500/10 text-red-400 border-red-500/20'
                                    }`}>
                                    {difficultyLabels[selectedTask.difficulty]}
                                </span>
                            </div>

                            <div className="flex items-center gap-6 text-sm text-gray-400 mb-4">
                                <div className="flex items-center gap-2">
                                    <FaClock className="w-4 h-4" />
                                    <span>{selectedTask.estimatedTime} min</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaCode className="w-4 h-4" />
                                    <span>{selectedTask.category}</span>
                                </div>
                            </div>

                            <p className="text-gray-300 text-lg">{selectedTask.description}</p>
                        </div>

                        <div className="bg-dark-700/50 border border-js/10 rounded-xl p-6 mb-6">
                            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                <FaCode className="w-5 h-5 text-js" />
                                Zadanie
                            </h2>
                                          <div className="bg-dark-700/30 border border-gray-600 rounded-lg">
                <SyntaxHighlighter 
                  language="javascript" 
                  style={vscDarkPlus}
                  customStyle={{
                    background: 'transparent',
                    padding: '1rem',
                    fontSize: '0.875rem',
                    borderRadius: '0.5rem'
                  }}
                >
                  {selectedTask.taskContent}
                </SyntaxHighlighter>
              </div>
                        </div>

                        {selectedTask.tips.length > 0 && (
                            <div className="bg-dark-700/50 border border-js/10 rounded-xl p-6 mb-6">
                                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                    <FaLightbulb className="w-5 h-5 text-js" />
                                    Wskazówki
                                </h2>
                                <ul className="space-y-2">
                                    {selectedTask.tips.map((tip, index) => (
                                        <li key={index} className="flex items-start gap-2 text-gray-300">
                                            <span className="text-js mt-1">•</span>
                                            <span>{tip}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                                    <div className="mb-6 flex gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleShowSolution}
                className="flex items-center gap-2 bg-js hover:bg-js/80 text-dark px-6 py-3 rounded-lg font-medium transition-colors"
              >
                {showSolution ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                {showSolution ? 'Ukryj rozwiązanie' : 'Pokaż rozwiązanie'}
              </motion.button>
              
              {showSolution && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCopySolution}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    copied 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-gray-600 hover:bg-gray-700 text-white'
                  }`}
                >
                  {copied ? <FaCheck className="w-4 h-4" /> : <FaCopy className="w-4 h-4" />}
                  {copied ? 'Skopiowane!' : 'Kopiuj kod'}
                </motion.button>
              )}
            </div>

                        {showSolution && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-dark-700/50 border border-green-500/20 rounded-xl p-6"
                            >
                                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                    <FaCode className="w-5 h-5 text-green-400" />
                                    Rozwiązanie
                                </h2>
                                <div className="bg-dark-700/30 border border-gray-600 rounded-lg">
                                    <SyntaxHighlighter 
                                      language="javascript" 
                                      style={vscDarkPlus}
                                      customStyle={{
                                        background: 'transparent',
                                        padding: '1rem',
                                        fontSize: '0.875rem',
                                        borderRadius: '0.5rem'
                                      }}
                                    >
                                      {selectedTask.solution}
                                    </SyntaxHighlighter>
                                </div>
                            </motion.div>
                        )}

                        <div className="mt-6 flex flex-wrap gap-2">
                            {selectedTask.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-dark-700/30 border border-gray-600 text-gray-300 rounded-full text-sm"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
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

                <div className="flex justify-center gap-8 mt-6">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-white">{stats.total}</div>
                        <div className="text-sm text-gray-400">Wszystkich zadań</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">{stats.easy}</div>
                        <div className="text-sm text-gray-400">Łatwych</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-js">{stats.medium}</div>
                        <div className="text-sm text-gray-400">Średnich</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-red-400">{stats.hard}</div>
                        <div className="text-sm text-gray-400">Trudnych</div>
                    </div>
                </div>
            </div>

            <div className="bg-dark-700/50 border border-js/10 rounded-xl p-6 space-y-4">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <FaFilter className="w-4 h-4 text-js" />
                    Filtry
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Szukaj zadań..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-dark border border-js rounded-lg text-white placeholder-white focus:outline-none focus:border-js/50"
                        />
                    </div>

                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-4 py-2 bg-dark-700/30 border border-js rounded-lg text-white focus:outline-none focus:border-js/50"
                        style={{
                            backgroundColor: '#1b1a1b',
                            color: 'white'
                        }}
                    >
                        {categories.map(category => (
                            <option
                                key={category}
                                value={category}
                                style={{
                                    backgroundColor: '#1b1a1b',
                                    color: 'white'
                                }}
                            >
                                {category}
                            </option>
                        ))}
                    </select>

                    <select
                        value={selectedDifficulty}
                        onChange={(e) => setSelectedDifficulty(e.target.value as any)}
                        className="px-4 py-2 bg-dark-700/30 border border-js rounded-lg text-white focus:outline-none focus:border-js/50"
                        style={{
                            backgroundColor: '#1b1a1b',
                            color: 'white'
                        }}
                    >
                        <option
                            value="all"
                            style={{
                                backgroundColor: '#1b1a1b',
                                color: 'white'
                            }}
                        >
                            Wszystkie poziomy
                        </option>
                        <option
                            value="easy"
                            style={{
                                backgroundColor: '#1b1a1b',
                                color: 'white'
                            }}
                        >
                            Łatwe
                        </option>
                        <option
                            value="medium"
                            style={{
                                backgroundColor: '#1b1a1b',
                                color: 'white'
                            }}
                        >
                            Średnie
                        </option>
                        <option
                            value="hard"
                            style={{
                                backgroundColor: '#1b1a1b',
                                color: 'white'
                            }}
                        >
                            Trudne
                        </option>
                    </select>
                </div>

                <button
                    onClick={resetFilters}
                    className="text-js hover:text-js/80 text-sm transition-colors"
                >
                    Resetuj filtry
                </button>
            </div>

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
                <div className="text-center py-12">
                    <div className="text-gray-400 text-lg mb-4">Nie znaleziono zadań</div>
                    <button
                        onClick={resetFilters}
                        className="text-js hover:text-js/80 transition-colors"
                    >
                        Resetuj filtry
                    </button>
                </div>
            )}
        </motion.div>
    );
};

interface TaskCardProps {
    task: PracticeTask;
    index: number;
    onSelect: (task: PracticeTask) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index, onSelect }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(task)}
            className="bg-dark-700/50 border border-js/10 rounded-xl p-6 cursor-pointer hover:border-js/20 transition-all group"
        >
            <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-white pr-4 group-hover:text-js transition-colors">{task.title}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${task.difficulty === 'easy'
                    ? 'bg-green-500/10 text-green-400 border-green-500/20'
                    : task.difficulty === 'medium'
                        ? 'bg-js/10 text-js border-js/20'
                        : 'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                    {difficultyLabels[task.difficulty]}
                </span>
            </div>

            <p className="text-gray-300 mb-4 line-clamp-3">{task.description}</p>

            <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <FaClock className="w-4 h-4" />
                        <span>{task.estimatedTime} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <FaCode className="w-4 h-4" />
                        <span>{task.category}</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                {task.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span
                        key={tagIndex}
                        className="px-2 py-1 bg-dark-700/30 border border-js text-white rounded text-xs"
                    >
                        {tag}
                    </span>
                ))}
                {task.tags.length > 3 && (
                    <span className="px-2 py-1 bg-dark-700/30 border border-js text-white rounded text-xs">
                        +{task.tags.length - 3}
                    </span>
                )}
            </div>
        </motion.div>
    );
};

PracticeSection.displayName = 'PracticeSection';

export default PracticeSection; 