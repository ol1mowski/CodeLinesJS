import { useParams, Navigate } from 'react-router-dom';
import { useLessonData } from './hooks/useLessonData.hook';
import { LessonLayout } from './components/LessonLayout.component';
import { LessonContent } from './components/LessonContent.component';
import { LessonNotFound } from './components/LessonNotFound.component';
import { ErrorMessage } from '../components/ErrorMessage.component';
import { LoadingScreen } from '../../../UI/LoadingScreen/LoadingScreen.component';  
import { FaLock } from 'react-icons/fa';
import { useStats } from '../../../Dashboard/StatsSection/hooks/useStats.hook';
import { SEO } from '../../../../utils/seo.util';

export const LessonPage = () => {
  const { lessonSlug } = useParams<{ lessonSlug: string }>();
  const { stats, isLoading: isStatsLoading } = useStats();


  if (!lessonSlug) {
    return <Navigate to="/dashboard/learn" replace />;
  }

  const {
    lesson,
    isLoading,
    error,
    isNotFound,
    activeSection,
    progress,
    handleSectionComplete,
    handleQuizComplete,
    handleLessonComplete,
  } = useLessonData(lessonSlug);

  if (isLoading || isStatsLoading) {
    return <LessonLoadingState />;
  }

  if (isNotFound) {
    return <LessonNotFound />;
  }

  if (error) {
    return <LessonErrorState onRetry={() => window.location.reload()} />;
  }

  if (!lesson) {
    return <LessonNotFound />;
  }

  const userLevel = stats?.progress.level || 0;

  if (lesson.requiredLevel && userLevel < lesson.requiredLevel) {
    return <LessonLocked requiredLevel={lesson.requiredLevel} userLevel={userLevel} />;
  }

  return (
    <>
      <SEO
        title={lesson.title}
        description={lesson.description}
        type="website"
      />

      <LessonContent
        lesson={lesson}
        activeSection={activeSection}
        progress={typeof progress === 'number' ? progress : 0}
        onSectionComplete={handleSectionComplete}
        onQuizComplete={handleQuizComplete}
        onLessonComplete={handleLessonComplete}
      />
    </>
  );
};

const LessonLocked = ({
  requiredLevel,
  userLevel,
}: {
  requiredLevel: number;
  userLevel: number;
}) => (
  <LessonLayout>
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="bg-dark-800/50 p-8 rounded-xl border border-js/10 max-w-md">
        <div className="mb-4 bg-js/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
          <FaLock className="text-js text-2xl" />
        </div>
        <h2 className="text-xl font-bold text-js mb-2">Lekcja zablokowana</h2>
        <p className="text-gray-400 text-sm mb-4">
          Aby odblokować tę lekcję, musisz osiągnąć poziom {requiredLevel}.
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Twój obecny poziom: <span className="text-js font-medium">{userLevel}</span>
        </p>
        <button
          onClick={() => (window.location.href = '/dashboard/learn')}
          className="mt-4 px-4 py-2 bg-js/10 text-js rounded-lg hover:bg-js/20 transition-colors w-full"
        >
          Wróć do listy lekcji
        </button>
      </div>
    </div>
  </LessonLayout>
);

const LessonLoadingState = () => (
  <LessonLayout>
    <div className="flex justify-center items-center min-h-[60vh]">
      <LoadingScreen />
    </div>
  </LessonLayout>
);

const LessonErrorState = ({ onRetry }: { onRetry: () => void }) => (
  <LessonLayout>
    <ErrorMessage
      message="Nie udało się pobrać lekcji. Spróbuj ponownie później."
      onRetry={onRetry}
    />
  </LessonLayout>
);

LessonPage.displayName = 'LessonPage';
