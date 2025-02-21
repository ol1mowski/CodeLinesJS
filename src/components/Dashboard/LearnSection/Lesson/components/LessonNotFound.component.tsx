import { memo } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';

export const LessonNotFound = memo(() => (
  <div className="min-h-screen bg-dark/50 backdrop-blur-sm py-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-js mb-4">
          Lekcja nie została znaleziona
        </h2>
        <Link 
          to="/dashboard/learn"
          className="inline-flex items-center gap-2 text-js hover:text-js/80 transition-colors"
        >
          <FaChevronLeft className="w-4 h-4" />
          Wróć do listy lekcji
        </Link>
      </div>
    </div>
  </div>
));

LessonNotFound.displayName = "LessonNotFound"; 