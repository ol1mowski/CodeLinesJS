import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

const DASHBOARD_PREFIX = '/dashboard';

const HIDDEN_PATHS = [
  `${DASHBOARD_PREFIX}/community`,
  `${DASHBOARD_PREFIX}/community/ranking`,
  `${DASHBOARD_PREFIX}/community/groups`,
  `${DASHBOARD_PREFIX}/learn`,
  `${DASHBOARD_PREFIX}/play`,
  `${DASHBOARD_PREFIX}/play/regex-raider`,
  `${DASHBOARD_PREFIX}/play/async-quest`,
  `${DASHBOARD_PREFIX}/play/js-typo-hunter`,
  `${DASHBOARD_PREFIX}/play/scope-explorer`,
  `${DASHBOARD_PREFIX}/settings`,
];

export const useIsHiddenPath = (): boolean => {
  const location = useLocation();

  return useMemo(() => {
    const currentPath = location.pathname;

    const exactMatch = HIDDEN_PATHS.includes(currentPath);

    const lessonMatch = currentPath.startsWith(`${DASHBOARD_PREFIX}/learn/lesson/`);

    return exactMatch || lessonMatch;
  }, [location.pathname]);
};
