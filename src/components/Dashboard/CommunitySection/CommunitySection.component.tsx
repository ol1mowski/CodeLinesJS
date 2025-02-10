import { memo, useCallback, useEffect, lazy, Suspense } from "react";

import { motion } from "framer-motion";

import { useQueryClient } from '@tanstack/react-query';

import { CommunityProvider, useCommunity } from "../../../contexts/CommunityContext";

import { CommunityNavigation } from "./Navigation/CommunityNavigation.component";
import { ErrorBoundary } from "../../Common/ErrorBoundary.component";
import { prefetchRanking } from "./Ranking/hooks/useRanking";

type AsyncComponentProps<T> = {
  importFn: () => Promise<{ default: T }>;
  fallback: React.ReactNode;
};

const AsyncComponent = <T extends React.ComponentType>({ 
  importFn,
  fallback 
}: AsyncComponentProps<T>) => {
  const Component = lazy(() => 
    importFn().then(module => ({ default: module.default as React.ComponentType }))
  );
  
  return (
    <Suspense fallback={fallback}>
      <Component />
    </Suspense>
  );
};

const CommunityContent = memo(() => {
  const { state: { activeView }, setActiveView } = useCommunity();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (activeView === 'feed') {
      prefetchRanking(queryClient, 'weekly');
    } else if (activeView === 'ranking') {
      prefetchRanking(queryClient, 'weekly');
    }
  }, [activeView, queryClient]);

  const renderContent = useCallback(() => {
    switch (activeView) {
      case "feed":
        return (
          <AsyncComponent
            importFn={() => import("./Feed/CommunityFeed.component")}
            fallback={<div className="text-center text-gray-400">Ładowanie feed...</div>}
          />
        );
      case "ranking":
        return (
          <AsyncComponent
            importFn={() => import("./Ranking/CommunityRanking.component")}
            fallback={<div className="text-center text-gray-400">Ładowanie rankingu...</div>}
          />
        );
      case "groups":
        return (
          <AsyncComponent
            importFn={() => import("./Groups/CommunityGroups.component")}
            fallback={<div className="text-center text-gray-400">Ładowanie grup...</div>}
          />
        );
      default:
        return null;
    }
  }, [activeView]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="p-8 w-full min-h-screen bg-dark/50 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold font-space text-js mb-8">
          Społeczność
        </h1>

        <CommunityNavigation 
          activeView={activeView} 
          onViewChange={setActiveView} 
        />
        
        <motion.div
          key={activeView}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="mt-8 bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10 p-6 shadow-lg"
        >
          {renderContent()}
        </motion.div>
      </div>
    </motion.div>
  );
});

export const CommunitySection = memo(() => (
  <ErrorBoundary>
    <CommunityProvider>
      <CommunityContent />
    </CommunityProvider>
  </ErrorBoundary>
));

CommunityContent.displayName = "CommunityContent";
CommunitySection.displayName = "CommunitySection"; 