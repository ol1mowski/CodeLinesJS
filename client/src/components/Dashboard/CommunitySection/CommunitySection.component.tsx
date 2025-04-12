import { memo, useEffect, lazy, Suspense } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useCommunity } from './Feed/hooks/useCommunity.hook';
import { prefetchRanking } from './Ranking/hooks/useRanking';
import { CommunityNav } from './Feed/components/Comments/CommunityNav.component';
import { CommunityView } from './types/community.types';
import { Helmet } from 'react-helmet';
import { LoadingSpinner } from '../../../components/UI/LoadingSpinner/LoadingSpinner.component';
import { useAuth } from '../../../hooks/useAuth';

const CommunityFeed = lazy(() => import('./Feed/CommunityFeed.component'));
const CommunityRanking = lazy(() => import('./Ranking/CommunityRanking.component'));
const CommunityGroups = lazy(() => import('./Groups/CommunityGroups.component'));

export const CommunitySection = memo(() => {
  const location = useLocation();
  const { state: { activeView }, setActiveView } = useCommunity();
  const queryClient = useQueryClient();
  const { token } = useAuth();

  useEffect(() => {
    const path = location.pathname.split('community').pop() || 'community';
    if (path !== activeView) {
      setActiveView(path as CommunityView);
    }
  }, [location.pathname, activeView, setActiveView]);

  useEffect(() => {
    if (activeView === 'community' || activeView === 'ranking') {
      prefetchRanking(queryClient, token);
    }
  }, [activeView, queryClient, token]);

  return (
    <div className="p-8 w-full min-h-screen bg-dark/50 backdrop-blur-sm">
      <Helmet>
        <title>Community | CodeLinesJS</title>
        <meta name="description" content="Community CodeLinesJS - dołącz do nas i rozwijaj swoje umiejętności w przyjaznym środowisku." />
      </Helmet>
      <div className="max-w-7xl mx-auto">
        <CommunityNav activeView={activeView} />
        <div className="bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10 p-6 shadow-lg">
          <Routes>
            <Route index element={
              <Suspense fallback={<LoadingSpinner text="Ładowanie aktualności..." />}>
                <CommunityFeed />
              </Suspense>
            } />
            <Route path="ranking" element={
              <Suspense fallback={<LoadingSpinner text="Ładowanie rankingu..." />}>
                <CommunityRanking />
              </Suspense>
            } />
            <Route path="groups/*" element={
              <Suspense fallback={<LoadingSpinner text="Ładowanie grup..." />}>
                <CommunityGroups />
              </Suspense>
            } />
          </Routes>
        </div>
      </div>
    </div>
  );
});

CommunitySection.displayName = 'CommunitySection'; 