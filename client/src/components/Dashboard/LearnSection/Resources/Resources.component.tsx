import { memo } from 'react';
import { motion } from 'framer-motion';
import { ErrorMessage } from '../components/ErrorMessage.component';
import { LoadingScreen } from '../../../UI/LoadingScreen/LoadingScreen.component';
import { ResourceSection } from './ResourceSection.component';
import { useResources } from '../hooks/useResources';
import { FaBookOpen, FaSadTear } from 'react-icons/fa';

export const Resources = memo(() => {
  const { recommendedResources, otherResources, isLoading, error, refetch } = useResources();

  const shouldShowLoading = isLoading || ((!recommendedResources || recommendedResources.length === 0) && (!otherResources || otherResources.length === 0) && !error);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl"
        >
          <ErrorMessage
            message="Nie udało się pobrać materiałów. Spróbuj ponownie później."
            onRetry={() => refetch()}
          />
        </motion.div>
      </div>
    );
  }

  if (shouldShowLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingScreen />
      </div>
    );
  }

  if (!recommendedResources?.length && !otherResources?.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-12 text-center"
      >
        <div className="relative mb-6">
          <FaBookOpen className="w-20 h-20 text-gray-600 opacity-20" />
          <div className="absolute -right-2 -bottom-2">
            <FaSadTear className="w-8 h-8 text-gray-500" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-js mb-3">Brak dostępnych materiałów</h3>
        <p className="text-gray-400 text-sm max-w-md">
          Aktualnie nie ma żadnych dostępnych materiałów. Sprawdź ponownie później lub skontaktuj
          się z administratorem.
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => refetch()}
          className="mt-6 px-4 py-2 bg-js/10 text-js border border-js/20 rounded-lg text-sm font-medium hover:bg-js/20 transition-colors"
        >
          Odśwież materiały
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      {recommendedResources?.length > 0 && (
        <ResourceSection
          title="Polecane materiały"
          subtitle="Wyselekcjonowane materiały, które pomogą Ci w nauce"
          resources={recommendedResources}
          isRecommended
        />
      )}

      {otherResources?.length > 0 && (
        <ResourceSection
          title="Wszystkie materiały"
          subtitle="Przeglądaj wszystkie dostępne materiały"
          resources={otherResources}
        />
      )}
    </div>
  );
});

Resources.displayName = 'Resources';
