import { motion, AnimatePresence } from "framer-motion";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigation } from "../../../hooks/useNavigation";
import { NavigationLogo } from "./NavigationLogo.component";
import { NavigationButton } from "./NavigationButton.component";
import { NavigationSection } from "./NavigationSection.component";

import { navVariants } from "./animations";
import { useMemo, useCallback } from "react";
import { NavigationItem } from "./Navigation.types";
import { navigationItems } from "./navigationItems.tsx";

const sectionTitles: Record<string, string> = {
  main: "Główne",
  game: "Gra",
  social: "Społeczność",
};

export const DashboardNavigation = () => {
  const navigate = useNavigate();
  const { isExpanded, setIsExpanded, activeItem, setActiveItem } = useNavigation();
  const { logout } = useAuth();

  const handleNavigation = useCallback((item: NavigationItem) => {
    setActiveItem(item.id);
    if (item.path) {
      navigate(item.path);
      if (window.innerWidth < 768) {
        setIsExpanded(false);
      }
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


  return (
    <motion.nav
      initial="collapsed"
      animate={isExpanded ? "expanded" : "collapsed"}
      variants={navVariants}
      className="fixed left-0 top-0 h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-indigo-900 backdrop-blur-lg border-r border-gray-700/50 flex flex-col py-6 z-50 shadow-xl shadow-black/10"
    >
      <NavigationLogo isExpanded={isExpanded} />

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-8 w-6 h-6 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 rounded-full flex items-center justify-center hover:opacity-90 transition-all shadow-lg shadow-indigo-500/20"
      >
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          className="text-gray-900 text-sm"
        >
          →
        </motion.span>
      </motion.button>

      <div className="overflow-x-hidden flex-1 px-3 space-y-6 overflow-y-auto scrollbar-thin scrollbar-track-gray-800/50 scrollbar-thumb-indigo-500/20">
        <AnimatePresence mode="wait">
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

      <div className="pt-4 border-t border-gray-700/50">
        <NavigationButton
          icon={<FaSignOutAlt />}
          label="Wyloguj się"
          isExpanded={isExpanded}
          onClick={logout}
          variant="danger"
        />
      </div>
    </motion.nav>
  );
};
