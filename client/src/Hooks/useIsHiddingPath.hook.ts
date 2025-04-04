import { useLocation } from "react-router-dom";

export const useIsHiddenPath = () => {
  const location = useLocation();
  
  const hiddenPaths = [
    '/dashboard/community',
    '/dashboard/community/ranking',
    '/dashboard/community/groups',
    '/dashboard/learn',
    '/dashboard/play',
    '/dashboard/play/regex-raider',
    '/dashboard/play/async-quest',
    '/dashboard/play/js-typo-hunter',
    '/dashboard/play/scope-explorer',
    '/dashboard/settings'
  ];

  return hiddenPaths.includes(location.pathname) || 
         location.pathname.startsWith('/dashboard/learn/lesson/');
};
