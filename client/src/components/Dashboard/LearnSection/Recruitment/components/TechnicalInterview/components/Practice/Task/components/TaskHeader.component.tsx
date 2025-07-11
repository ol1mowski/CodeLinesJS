import { FaClock, FaCode } from 'react-icons/fa';
import type { PracticeTask } from '../../hooks/usePracticeApi.hook';

interface TaskHeaderProps {
    task: PracticeTask;
}

const difficultyLabels = {
    easy: 'Łatwe',
    medium: 'Średnie',
    hard: 'Trudne'
};

const TaskHeader: React.FC<TaskHeaderProps> = ({ task }) => {
    return (
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
    );
};

export default TaskHeader; 