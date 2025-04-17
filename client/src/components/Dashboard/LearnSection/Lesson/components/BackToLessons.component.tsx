import { memo } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';

export const BackToLessons = memo(() => (
  <Link
    to="/dashboard/learn"
    className="inline-flex items-center gap-2 text-js hover:text-js/80 transition-colors mb-6"
  >
    <FaChevronLeft className="w-4 h-4" />
    Wróć do listy lekcji
  </Link>
));

BackToLessons.displayName = 'BackToLessons';
