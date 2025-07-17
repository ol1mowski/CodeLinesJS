import React, { memo } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

interface ResultsHeaderProps {
  onBack: () => void;
}

export const ResultsHeader: React.FC<ResultsHeaderProps> = memo(({ onBack }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors"
      >
        <FaArrowLeft />
        Powrót do teorii
      </button>
      <div className="text-white text-xl font-bold">Wyniki testu</div>
    </div>
  );
});

ResultsHeader.displayName = 'ResultsHeader'; 