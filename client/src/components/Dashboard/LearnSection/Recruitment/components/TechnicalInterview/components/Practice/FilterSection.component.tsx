import React from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';

interface FilterSectionProps {
    categories: string[];
    selectedCategory: string;
    selectedDifficulty: string;
    searchQuery: string;
    onCategoryChange: (category: string) => void;
    onDifficultyChange: (difficulty: string) => void;
    onSearchQueryChange: (query: string) => void;
    onResetFilters: () => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
    categories,
    selectedCategory,
    selectedDifficulty,
    searchQuery,
    onCategoryChange,
    onDifficultyChange,
    onSearchQueryChange,
    onResetFilters
}) => {
    return (
        <div className="bg-dark-700/50 border border-js/10 rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <FaFilter className="w-4 h-4 text-js" />
                Filtry
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Szukaj zadań..."
                        value={searchQuery}
                        onChange={(e) => onSearchQueryChange(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-dark border border-js rounded-lg text-white placeholder-white focus:outline-none focus:border-js/50"
                    />
                </div>

                <select
                    value={selectedCategory}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    className="px-4 py-2 bg-dark-700/30 border border-js rounded-lg text-white focus:outline-none focus:border-js/50"
                    style={{
                        backgroundColor: '#1b1a1b',
                        color: 'white'
                    }}
                >
                    {categories.map(category => (
                        <option
                            key={category}
                            value={category}
                            style={{
                                backgroundColor: '#1b1a1b',
                                color: 'white'
                            }}
                        >
                            {category}
                        </option>
                    ))}
                </select>

                <select
                    value={selectedDifficulty}
                    onChange={(e) => onDifficultyChange(e.target.value)}
                    className="px-4 py-2 bg-dark-700/30 border border-js rounded-lg text-white focus:outline-none focus:border-js/50"
                    style={{
                        backgroundColor: '#1b1a1b',
                        color: 'white'
                    }}
                >
                    <option
                        value="all"
                        style={{
                            backgroundColor: '#1b1a1b',
                            color: 'white'
                        }}
                    >
                        Wszystkie poziomy
                    </option>
                    <option
                        value="easy"
                        style={{
                            backgroundColor: '#1b1a1b',
                            color: 'white'
                        }}
                    >
                        Łatwe
                    </option>
                    <option
                        value="medium"
                        style={{
                            backgroundColor: '#1b1a1b',
                            color: 'white'
                        }}
                    >
                        Średnie
                    </option>
                    <option
                        value="hard"
                        style={{
                            backgroundColor: '#1b1a1b',
                            color: 'white'
                        }}
                    >
                        Trudne
                    </option>
                </select>
            </div>

            <button
                onClick={onResetFilters}
                className="text-js hover:text-js/80 text-sm transition-colors"
            >
                Resetuj filtry
            </button>
        </div>
    );
};

export default FilterSection; 