import React, { memo } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { CVHeader } from './CVHeader.component';

interface CVErrorStateProps {
  error: string;
  onBack: () => void;
  onRetry?: () => void;
}

export const CVErrorState: React.FC<CVErrorStateProps> = memo(({ 
  error, 
  onBack, 
  onRetry = () => window.location.reload() 
}) => (
  <div className="min-h-screen bg-dark/50 backdrop-blur-sm p-4">
    <div className="max-w-6xl mx-auto">
      <CVHeader
        title="Przygotowanie CV"
        description="Stwórz profesjonalne CV, które przyciągnie uwagę rekruterów"
        onBack={onBack}
      />
      <div className="mt-8 bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center">
        <FaExclamationTriangle className="w-8 h-8 text-red-400 mx-auto mb-4" />
        <p className="text-red-400 mb-4">{error}</p>
        <button 
          onClick={onRetry}
          className="px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors"
        >
          Spróbuj ponownie
        </button>
      </div>
    </div>
  </div>
));

CVErrorState.displayName = 'CVErrorState'; 