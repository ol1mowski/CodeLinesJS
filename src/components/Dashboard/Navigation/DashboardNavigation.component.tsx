import { motion, AnimatePresence } from "framer-motion";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../Hooks/useAuth";
import { useNavigation } from "../../../Hooks/useNavigation";
import { NavigationLogo } from "./components/NavigationLogo";
import { NavigationButton } from "./components/NavigationButton";
import { NavigationSection } from "./components/NavigationSection";

import { navVariants } from "./animations/navigationAnimations";
import { useMemo, useCallback } from "react";
import type { NavigationItem } from ".";
import { navigationItems } from "./constants/navigationItems";


const sectionTitles: Record<string, string> = {
  main: "Główne",
  game: "Gra",
  social: "Społeczność",
};

export const DashboardNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isExpanded, setIsExpanded, activeItem, setActiveItem } = useNavigation();
  const { logout } = useAuth();

  const handleNavigation = useCallback((item: NavigationItem) => {
    setActiveItem(item.id);
    if (item.path) {
      navigate(item.path);
    }
  }, [navigate, setActiveItem, setIsExpanded]);

  const sections = useMemo(() =>
    Object.entries(
      navigationItems.reduce((acc, item) => {
        if (!acc[item.section]) {
          acc[item.section] = [];
        }
        acc[item.section].push(item);
        return acc;
      }, {} as Record<string, NavigationItem[]>)
    ),
    []
  );

  const isHiddenPath = ['/dashboard/community', '/dashboard/community/ranking', '/dashboard/community/groups', '/dashboard/learn', '/dashboard/play', '/dashboard/play/regex-raider', '/dashboard/play/async-quest', '/dashboard/play/js-typo-hunter', '/dashboard/play/scope-explorer', '/dashboard/settings'].includes(location.pathname);

  return (
    <>
      <motion.nav
        initial="collapsed"
        animate={isExpanded ? "expanded" : "collapsed"}
        variants={navVariants}
        className={`${isHiddenPath ? 'hidden md:flex' : ''} fixed left-0 top-0 bg-gradient-to-b from-dark via-dark-medium to-dark backdrop-blur-lg border-r border-js/10 flex flex-col py-6 z-40 shadow-xl shadow-black/10 h-full`}
      >
        <NavigationLogo isExpanded={isExpanded} />

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute -right-3 top-8 w-6 h-6 bg-js rounded-full flex items-center justify-center hover:opacity-90 transition-all shadow-lg shadow-js/20"
        >
          <motion.span
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="text-dark text-sm font-bold"
            initial="collapsed"
          >
            →
          </motion.span>
        </motion.button>

        <div className="overflow-x-hidden flex-1 px-3 space-y-6">
          <AnimatePresence mode="sync">
            {sections.map(([section, items], index) => (
              <NavigationSection
                key={section}
                title={sectionTitles[section]}
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
            icon={<FaSignOutAlt />}
            label="Wyloguj się"
            isExpanded={isExpanded}
            onClick={logout}
            variant="danger"
          />
        </div>
      </motion.nav>
    </>
  );
};

DashboardNavigation.displayName = "DashboardNavigation";
