import { memo } from 'react';
import { FaBook } from 'react-icons/fa';

export const TheoryHeader = memo(() => {
  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <div className="p-6 rounded-full bg-js/10 border border-js/20">
          <FaBook className="w-12 h-12 text-js" />
        </div>
      </div>
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Test teorii JavaScript</h1>
        <p className="text-gray-400 max-w-md mx-auto">
          Sprawdź swoją wiedzę teoretyczną z JavaScript. Wybierz ilość pytań i rozpocznij test.
        </p>
      </div>
    </div>
  );
});

TheoryHeader.displayName = 'TheoryHeader'; 