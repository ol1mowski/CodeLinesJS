import React from 'react';

interface EmptyStateProps {
    onResetFilters: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onResetFilters }) => {
    return (
        <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-4">Nie znaleziono zadań</div>
            <button
                onClick={onResetFilters}
                className="text-js hover:text-js/80 transition-colors"
            >
                Resetuj filtry
            </button>
        </div>
    );
};

export default EmptyState; 