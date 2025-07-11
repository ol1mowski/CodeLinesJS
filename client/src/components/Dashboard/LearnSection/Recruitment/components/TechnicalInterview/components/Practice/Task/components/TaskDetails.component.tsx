import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import type { PracticeTask } from '../../../../../../types/recruitment.types';
import { useState } from 'react';
import TaskHeader from './TaskHeader.component';
import TaskContent from '../../TaskContent.component';
import TaskTips from './TaskTips.component';
import TaskSolution from './TaskSolution.component';
import TaskTags from './TaskTags.component';

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
                    <TaskHeader task={task} />
                    <TaskContent task={task} />
                    <TaskTips task={task} />
                    <TaskSolution
                        task={task}
                        showSolution={showSolution}
                        copied={copied}
                        onShowSolution={onShowSolution}
                        onCopySolution={handleCopySolution}
                    />
                    <TaskTags task={task} />
                </div>
            </div>
        </motion.div>
    );
};

export default TaskDetails; 