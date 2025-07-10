import { motion } from 'framer-motion';
import { FaArrowLeft, FaClock, FaCode, FaLightbulb, FaEye, FaEyeSlash, FaCopy, FaCheck } from 'react-icons/fa';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { difficultyLabels } from './data/practiceData.data';
import type { PracticeTask } from '../../../../types/recruitment.types';
import { useState } from 'react';

interface TaskDetailsProps {
    task: PracticeTask;
    showSolution: boolean;
    onBack: () => void;
    onShowSolution: () => void;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ task, showSolution, onBack, onShowSolution }) => {
    const [copied, setCopied] = useState<boolean>(false);

    const handleCopySolution = async () => {
        try {
            await navigator.clipboard.writeText(task.solution);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Nie udało się skopiować tekstu: ', err);
        }
    };

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
                        onClick={onBack}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <FaArrowLeft className="w-4 h-4" />
                        <span>Powrót do listy zadań</span>
                    </motion.button>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <div className="flex items-center gap-4 mb-4">
                            <h1 className="text-3xl font-bold text-white">{task.title}</h1>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${task.difficulty === 'easy'
                                ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                : task.difficulty === 'medium'
                                    ? 'bg-js/10 text-js border-js/20'
                                    : 'bg-red-500/10 text-red-400 border-red-500/20'
                                }`}>
                                {difficultyLabels[task.difficulty as keyof typeof difficultyLabels]}
                            </span>
                        </div>

                        <div className="flex items-center gap-6 text-sm text-gray-400 mb-4">
                            <div className="flex items-center gap-2">
                                <FaClock className="w-4 h-4" />
                                <span>{task.estimatedTime} min</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaCode className="w-4 h-4" />
                                <span>{task.category}</span>
                            </div>
                        </div>

                        <p className="text-gray-300 text-lg">{task.description}</p>
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
                                {task.taskContent}
                            </SyntaxHighlighter>
                        </div>
                    </div>

                    {task.tips.length > 0 && (
                        <div className="bg-dark-700/50 border border-js/10 rounded-xl p-6 mb-6">
                            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                <FaLightbulb className="w-5 h-5 text-js" />
                                Wskazówki
                            </h2>
                            <ul className="space-y-2">
                                {task.tips.map((tip: string, index: number) => (
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
                            onClick={onShowSolution}
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
                                    {task.solution}
                                </SyntaxHighlighter>
                            </div>
                        </motion.div>
                    )}

                    <div className="mt-6 flex flex-wrap gap-2">
                        {task.tags.map((tag: string, index: number) => (
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
};

export default TaskDetails; 