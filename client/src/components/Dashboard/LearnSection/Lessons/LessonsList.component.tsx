import { memo } from 'react';
import { motion } from 'framer-motion';
import { LessonCard } from './LessonCard.component';
import type { Lesson } from '../types/lesson.types';
import { FilterType } from '../types/filter.types';
import { FaSearch, FaSadTear } from 'react-icons/fa';
import { LoadingSpinner } from '../../../UI/LoadingSpinner/LoadingSpinner.component';
import { SEO } from '../../../../utils/seo.util';

type LessonsListProps = {
  lessons: Lesson[];
  userId: string;
  filter: FilterType;
  userData: {
    userLevel: number;
    requiredLevel: number;
  };
  isLoading?: boolean;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const getDifficultyLabel = (filter: FilterType) => {
  switch (filter) {
    case 'beginner':
      return 'podstawowym';
    case 'intermediate':
      return 'średnim';
    case 'advanced':
      return 'zaawansowanym';
    default:
      return '';
  }
};

export const LessonsList = memo(({ lessons, filter, userData, isLoading = false }: LessonsListProps) => {
  const shouldShowLoading = isLoading || lessons.length === 0;

  if (shouldShowLoading) {
    return <LoadingSpinner fullScreen text="Ładowanie lekcji..." />;
  }

  const processedLessons = lessons.map(lesson => ({
    ...lesson,
    isLocked: lesson.requiredLevel ? lesson.requiredLevel > userData.userLevel : false,
  }));

  if (processedLessons.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-12 text-center"
      >
        <div className="relative mb-6">
          <FaSearch className="w-20 h-20 text-gray-600 opacity-20" />
          <div className="absolute -right-2 -bottom-2">
            <FaSadTear className="w-8 h-8 text-gray-500" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-js mb-3">
          {filter === 'all'
            ? 'Brak dostępnych lekcji'
            : `Brak lekcji o poziomie ${getDifficultyLabel(filter)}`}
        </h3>
        <p className="text-gray-400 text-sm max-w-md">
          {filter === 'all'
            ? 'Aktualnie nie ma żadnych dostępnych lekcji. Sprawdź ponownie później.'
            : 'W tej kategorii nie znaleziono żadnych lekcji. Wybierz inny poziom trudności.'}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <SEO
        title="Lekcje"
        description="Lekcje JavaScript - dołącz do nas i rozwijaj swoje umiejętności w przyjaznym środowisku."
        type="website"
      />

      {processedLessons.map(lesson => (
        <LessonCard key={lesson.slug} lesson={lesson} />
      ))}
    </motion.div>
  );
});

LessonsList.displayName = 'LessonsList';
