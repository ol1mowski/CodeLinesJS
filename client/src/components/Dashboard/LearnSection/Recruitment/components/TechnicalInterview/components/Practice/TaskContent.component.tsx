import { FaCode } from 'react-icons/fa';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { PracticeTask } from '../../../../types/recruitment.types';

interface TaskContentProps {
    task: PracticeTask;
}

const TaskContent: React.FC<TaskContentProps> = ({ task }) => {
    return (
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
    );
};

export default TaskContent; 