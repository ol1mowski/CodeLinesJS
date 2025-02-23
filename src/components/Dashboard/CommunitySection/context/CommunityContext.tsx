import React, { createContext, useReducer, ReactNode, useCallback } from 'react';

type CommunityState = {
  activeView: 'community' | 'ranking' | 'groups';
  filters: {
    groupsFilter: string;
    groupsSort: 'newest' | 'popular' | 'active';
    rankingPeriod: 'daily' | 'weekly' | 'monthly' | 'allTime';
  };
};

type CommunityAction = 
  | { type: 'SET_ACTIVE_VIEW'; payload: CommunityState['activeView'] }
  | { type: 'SET_GROUPS_FILTER'; payload: string }
  | { type: 'SET_GROUPS_SORT'; payload: CommunityState['filters']['groupsSort'] }
  | { type: 'SET_RANKING_PERIOD'; payload: CommunityState['filters']['rankingPeriod'] };

const initialState: CommunityState = {
  activeView: 'community',
  filters: {
    groupsFilter: '',
    groupsSort: 'newest',
    rankingPeriod: 'weekly'
  }
};

export const CommunityContext = createContext<{
  state: CommunityState;
  dispatch: React.Dispatch<CommunityAction>;
  setActiveView: (view: CommunityState['activeView']) => void;
  setGroupsFilter: (filter: string) => void;
  setGroupsSort: (sort: CommunityState['filters']['groupsSort']) => void;
  setRankingPeriod: (period: CommunityState['filters']['rankingPeriod']) => void;
} | null>(null);

const communityReducer = (state: CommunityState, action: CommunityAction): CommunityState => {
  switch (action.type) {
    case 'SET_ACTIVE_VIEW':
      return { ...state, activeView: action.payload };
    case 'SET_GROUPS_FILTER':
      return { ...state, filters: { ...state.filters, groupsFilter: action.payload } };
    case 'SET_GROUPS_SORT':
      return { ...state, filters: { ...state.filters, groupsSort: action.payload } };
    case 'SET_RANKING_PERIOD':
      return { ...state, filters: { ...state.filters, rankingPeriod: action.payload } };
    default:
      return state;
  }
};

export const CommunityProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(communityReducer, initialState);

  const setActiveView = useCallback((view: CommunityState['activeView']) => {
    dispatch({ type: 'SET_ACTIVE_VIEW', payload: view });
  }, []);

  const setGroupsFilter = useCallback((filter: string) => {
    dispatch({ type: 'SET_GROUPS_FILTER', payload: filter });
  }, []);

  const setGroupsSort = useCallback((sort: CommunityState['filters']['groupsSort']) => {
    dispatch({ type: 'SET_GROUPS_SORT', payload: sort });
  }, []);

  const setRankingPeriod = useCallback((period: CommunityState['filters']['rankingPeriod']) => {
    dispatch({ type: 'SET_RANKING_PERIOD', payload: period });
  }, []);

  return (
    <CommunityContext.Provider value={{
      state,
      dispatch,
      setActiveView,
      setGroupsFilter,
      setGroupsSort,
      setRankingPeriod
    }}>
      {children}
    </CommunityContext.Provider>
  );
};