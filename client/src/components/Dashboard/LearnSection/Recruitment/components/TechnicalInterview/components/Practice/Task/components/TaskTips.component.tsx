import { FaLightbulb } from 'react-icons/fa';
import type { PracticeTask } from '../../../../../../types/recruitment.types';

interface TaskTipsProps {
    task: PracticeTask;
}

const TaskTips: React.FC<TaskTipsProps> = ({ task }) => {
    if (task.tips.length === 0) return null;

    return (
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
    );
};

export default TaskTips; 