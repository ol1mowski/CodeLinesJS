import { motion, AnimatePresence } from 'framer-motion';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Auth/hooks/useAuth.hook';
import { useNavigation } from './hooks/useNavigation.hook';
import { NavigationLogo } from './components/NavigationLogo';
import { NavigationButton } from './components/NavigationButton';
import { NavigationSection } from './components/NavigationSection';
import { useIsHiddenPath } from '../hooks/useIsHiddenPath.hook';
import { navVariants } from './animations/navigationAnimations';
import { useMemo, useCallback, memo } from 'react';
import type { NavigationItem } from '.';
import { navigationItems } from './constants/navigationItems';
import { useMobileDetect, MOBILE_BREAKPOINT } from '../../UI/hooks/useMobileDetect.hook';
import { ErrorBoundary } from '../../Common/ErrorBoundary';

const SECTION_TITLES: Record<string, string> = {
  main: 'Główne',
  game: 'Nauka',
  social: 'Społeczność',
};

export const DashboardNavigation = memo(() => {
  const navigate = useNavigate();
  const { isExpanded, setIsExpanded, activeItem, setActiveItem } = useNavigation();
  const { logout } = useAuth();
  const isHiddenPath = useIsHiddenPath();
  const isMobile = useMobileDetect();

  const handleNavigation = useCallback(
    (item: NavigationItem) => {
      setActiveItem(item.id);
      if (item.path) {
        navigate(item.path);
      }
    },
    [navigate, setActiveItem]
  );

  const handleToggleExpand = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, [setIsExpanded]);

  const sections = useMemo(
    () =>
      Object.entries(
        navigationItems.reduce(
          (acc, item) => {
            if (!acc[item.section]) {
              acc[item.section] = [];
            }
            acc[item.section].push(item);
            return acc;
          },
          {} as Record<string, NavigationItem[]>
        )
      ),
    []
  );

  const navVisibilityClass = useMemo(() => {
    return isHiddenPath || isMobile ? 'hidden md:flex' : '';
  }, [isHiddenPath, isMobile]);

  if (isHiddenPath && window.innerWidth < MOBILE_BREAKPOINT) {
    return null;
  }

  return (
    <ErrorBoundary>
      <motion.nav
        initial="collapsed"
        animate={isExpanded ? 'expanded' : 'collapsed'}
        variants={navVariants}
        className={`${navVisibilityClass} fixed left-0 top-0 bg-gradient-to-b from-dark via-dark-medium to-dark backdrop-blur-lg border-r border-js/10 flex flex-col py-6 z-40 shadow-xl shadow-black/10 h-full`}
        aria-label="Menu nawigacyjne"
      >
        <NavigationLogo isExpanded={isExpanded} />

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleToggleExpand}
          className="absolute -right-3 top-8 w-6 h-6 bg-js rounded-full flex items-center justify-center hover:opacity-90 transition-all shadow-lg shadow-js/20"
          aria-label={isExpanded ? 'Zwiń menu' : 'Rozwiń menu'}
        >
          <motion.span
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="text-dark text-sm font-bold"
            initial="collapsed"
            aria-hidden="true"
          >
            →
          </motion.span>
        </motion.button>

        <div className="overflow-x-hidden flex-1 px-3 space-y-6">
          <AnimatePresence mode="sync">
            {sections.map(([section, items], index) => (
              <NavigationSection
                key={section}
                title={SECTION_TITLES[section] || section}
                items={items}
                isExpanded={isExpanded}
                activeItem={activeItem}
                onItemClick={handleNavigation}
                index={index}
                isLastSection={index === sections.length - 1}
              />
            ))}
          </AnimatePresence>
        </div>

        <div className="pt-4 border-t border-js/10">
          <NavigationButton
            id="logout"
            icon={<FaSignOutAlt aria-hidden="true" />}
            label="Wyloguj się"
            isExpanded={isExpanded}
            onClick={logout}
            variant="danger"
          />
        </div>
      </motion.nav>
    </ErrorBoundary>
  );
});

DashboardNavigation.displayName = 'DashboardNavigation';
