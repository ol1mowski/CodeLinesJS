import { useCallback, useReducer } from 'react';
import { CommunityView, CommunityContextState } from '../types/community.types';

type CommunityAction = { type: 'SET_ACTIVE_VIEW'; payload: CommunityView };

const initialState: CommunityContextState = {
  activeView: 'community'
};

const communityReducer = (state: CommunityContextState, action: CommunityAction): CommunityContextState => {
  switch (action.type) {
    case 'SET_ACTIVE_VIEW':
      return { ...state, activeView: action.payload };
    default:
      return state;
  }
};

export const useCommunity = () => {
  const [state, dispatch] = useReducer(communityReducer, initialState);

  const setActiveView = useCallback((view: CommunityView) => {
    dispatch({ type: 'SET_ACTIVE_VIEW', payload: view });
  }, []);

  return { state, setActiveView };
}; 