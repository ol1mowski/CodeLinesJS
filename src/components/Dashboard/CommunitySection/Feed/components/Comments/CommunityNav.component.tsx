import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';

type CommunityNavProps = {
  activeView: string;
};

export const CommunityNav = memo(({ activeView }: CommunityNavProps) => {
  const navigate = useNavigate();

  return (
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
  );
});

CommunityNav.displayName = 'CommunityNav'; 