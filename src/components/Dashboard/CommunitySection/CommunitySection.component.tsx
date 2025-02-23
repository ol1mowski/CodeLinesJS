import { memo, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useCommunity } from "../../../contexts/CommunityContext";
import { useQueryClient } from "@tanstack/react-query";
import { prefetchRanking } from "./Ranking/hooks/useRanking";

export const CommunitySection = memo(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state: { activeView }, setActiveView } = useCommunity();
  const queryClient = useQueryClient();

  useEffect(() => {
    const path = location.pathname.split('community').pop() || 'community';
    if (path !== activeView) {
      setActiveView(path as 'community' | 'ranking' | 'groups');
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
        <nav className="flex space-x-4 mb-8">
          <button
            onClick={() => navigate('/dashboard/community')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeView === 'community' ? 'bg-js text-dark' : 'text-gray-400 hover:text-js'
            }`}
          >
            Aktualności
          </button>
          <button
            onClick={() => navigate('/dashboard/community/ranking')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeView === 'ranking' ? 'bg-js text-dark' : 'text-gray-400 hover:text-js'
            }`}
          >
            Ranking
          </button>
          <button
            onClick={() => navigate('/dashboard/community/groups')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeView === 'groups' ? 'bg-js text-dark' : 'text-gray-400 hover:text-js'
            }`}
          >
            Grupy
          </button>
        </nav>

        <div className="bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10 p-6 shadow-lg">
          <Outlet />
        </div>
      </div>
    </div>
  );
});

CommunitySection.displayName = "CommunitySection"; 