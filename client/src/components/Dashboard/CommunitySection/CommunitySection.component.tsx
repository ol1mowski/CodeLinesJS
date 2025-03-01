import { memo, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useCommunity } from './Feed/hooks/useCommunity.hook';
import { prefetchRanking } from './Ranking/hooks/useRanking';
import { CommunityNav } from './Feed/components/Comments/CommunityNav.component';
import { CommunityView } from './types/community.types';

export const CommunitySection = memo(() => {
  const location = useLocation();
  const { state: { activeView }, setActiveView } = useCommunity();
  const queryClient = useQueryClient();

  useEffect(() => {
    const path = location.pathname.split('community').pop() || 'community';
    if (path !== activeView) {
      setActiveView(path as CommunityView);
    }
  }, [location.pathname, activeView, setActiveView]);

  useEffect(() => {
    if (activeView === 'community' || activeView === 'ranking') {
      prefetchRanking(queryClient);
    }
  }, [activeView, queryClient]);

  return (
    <div className="p-8 w-full min-h-screen bg-dark/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold font-space text-js mb-8">
          Społeczność
        </h1>
        <CommunityNav activeView={activeView} />
        <div className="bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10 p-6 shadow-lg">
          <Outlet />
        </div>
      </div>
    </div>
  );
});

CommunitySection.displayName = 'CommunitySection'; 