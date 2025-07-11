import { memo } from 'react';
import { FaBriefcase } from 'react-icons/fa';

export const RecruitmentHeader = memo(() => {
  return (
    <header className="flex items-center justify-between mb-6">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <FaBriefcase className="w-5 h-5 text-js" />
          <h3 className="text-xl font-bold text-js">Rekrutacja</h3>
          <span className="px-2 py-0.5 bg-js/20 text-js text-xs font-bold rounded-full">
            NOWOŚĆ
          </span>
        </div>
        <p className="text-gray-400 text-sm">
          Przygotuj się profesjonalnie do procesu rekrutacji w IT
        </p>
      </div>
    </header>
  );
});

RecruitmentHeader.displayName = 'RecruitmentHeader'; 