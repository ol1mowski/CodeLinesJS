import React from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaCode } from 'react-icons/fa';
import { difficultyLabels } from '../../data/practiceData.data';
import type { PracticeTask } from '../../../../../../types/recruitment.types';

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
                    {difficultyLabels[task.difficulty as keyof typeof difficultyLabels]}
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
                {task.tags.slice(0, 3).map((tag: string, tagIndex: number) => (
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

export default TaskCard; 