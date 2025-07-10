import React from 'react';

interface StatsSectionProps {
    stats: {
        total: number;
        easy: number;
        medium: number;
        hard: number;
    };
}

const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
    return (
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
    );
};

export default StatsSection; 