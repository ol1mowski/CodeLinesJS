import type { PracticeTask } from '../../../../../../types/recruitment.types';

interface TaskTagsProps {
    task: PracticeTask;
}

const TaskTags: React.FC<TaskTagsProps> = ({ task }) => {
    if (task.tags.length === 0) return null;

    return (
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
    );
};

export default TaskTags; 