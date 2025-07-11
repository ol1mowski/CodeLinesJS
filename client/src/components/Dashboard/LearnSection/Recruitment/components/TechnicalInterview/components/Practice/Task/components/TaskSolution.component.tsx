import { motion } from 'framer-motion';
import { FaCode, FaEye, FaEyeSlash, FaCopy, FaCheck } from 'react-icons/fa';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { PracticeTask } from '../../../../../../types/recruitment.types';

interface TaskSolutionProps {
    task: PracticeTask;
    showSolution: boolean;
    copied: boolean;
    onShowSolution: () => void;
    onCopySolution: () => void;
}

const TaskSolution: React.FC<TaskSolutionProps> = ({ 
    task, 
    showSolution, 
    copied, 
    onShowSolution, 
    onCopySolution 
}) => {
    return (
        <>
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
                        onClick={onCopySolution}
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
        </>
    );
};

export default TaskSolution; 