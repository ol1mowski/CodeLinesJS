import { motion, AnimatePresence } from "framer-motion";
import {
  FaChartBar,
  FaGamepad,
  FaTrophy,
  FaUsers,
  FaCog,
  FaBook,
  FaSignOutAlt,
  FaCode,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigation } from "../../../hooks/useNavigation";

type NavigationItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  section: "main" | "game" | "social";
  path?: string;
};

const navigationItems: NavigationItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <FaChartBar />,
    section: "main",
    path: "/dashboard",
  },
  {
    id: "stats",
    label: "Statystyki",
    icon: <FaTrophy />,
    section: "main",
    path: "/dashboard/stats",
  },
  {
    id: "play",
    label: "Graj",
    icon: <FaGamepad />,
    section: "game",
    path: "/dashboard/play",
  },
  {
    id: "learn",
    label: "Nauka",
    icon: <FaBook />,
    section: "game",
    path: "/dashboard/learn",
  },
  {
    id: "community",
    label: "Społeczność",
    icon: <FaUsers />,
    section: "social",
    path: "/dashboard/community",
  },
  {
    id: "settings",
    label: "Ustawienia",
    icon: <FaCog />,
    section: "social",
    path: "/dashboard/settings",
  },
];

const navVariants = {
  expanded: {
    width: "240px",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  collapsed: {
    width: "72px",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};

const itemVariants = {
  expanded: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  collapsed: {
    opacity: 0,
    x: -10,
    transition: {
      duration: 0.2,
    },
  },
};

const sectionTitles: Record<string, string> = {
  main: "Główne",
  game: "Gra",
  social: "Społeczność",
};

const activeGradient = "bg-gray-800/50 border-l-2 border-blue-500";
const activeText = "text-white";
const inactiveText = "text-black hover:text-white";
const hoverBg = "hover:bg-gray-800/50";

export const DashboardNavigation = () => {
  const { isExpanded, setIsExpanded, activeItem, setActiveItem } =
    useNavigation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleNavigation = (item: NavigationItem) => {
    setActiveItem(item.id);
    if (item.path) {
      navigate(item.path);
      if (window.innerWidth < 768) {
        setIsExpanded(false);
      }
    }
  };

  return (
    <motion.nav
      initial="collapsed"
      animate={isExpanded ? "expanded" : "collapsed"}
      variants={navVariants}
      className="fixed left-0 top-0 h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-indigo-900 backdrop-blur-lg border-r border-gray-700/50 flex flex-col py-6 z-50 shadow-xl shadow-black/10"
    >
      <div className="px-4 mb-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
            <FaCode className="text-xl text-indigo-400" />
          </div>
          <AnimatePresence mode="wait">
            {isExpanded && (
              <motion.span
                variants={itemVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 font-space"
              >
                CodeLinesJS
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

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

      <div className="flex-1 px-3 space-y-6 overflow-y-auto scrollbar-thin scrollbar-track-gray-800/50 scrollbar-thumb-indigo-500/20">
        <AnimatePresence mode="wait">
          {Object.entries(
            navigationItems.reduce((acc, item) => {
              if (!acc[item.section]) {
                acc[item.section] = [];
              }
              acc[item.section].push(item);
              return acc;
            }, {} as Record<string, NavigationItem[]>)
          ).map(([section, items], index) => (
            <motion.div
              key={section}
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {isExpanded && (
                <motion.h2
                  variants={itemVariants}
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 mb-2"
                >
                  {sectionTitles[section]}
                </motion.h2>
              )}
              {items.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavigation(item)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                    activeItem === item.id
                      ? `${activeGradient} ${activeText} shadow-lg shadow-blue-500/5`
                      : `${inactiveText} ${hoverBg}`
                  }`}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.span className="text-xl" whileHover={{ rotate: 10 }}>
                    {item.icon}
                  </motion.span>
                  <AnimatePresence mode="wait">
                    {isExpanded && (
                      <motion.span
                        variants={itemVariants}
                        initial="collapsed"
                        animate="expanded"
                        exit="collapsed"
                        className="font-medium font-space whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
              {index < Object.entries(navigationItems).length - 1 && (
                <div className="mx-3 my-4">
                  <div className="border-t border-white/5" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="pt-4 border-t border-gray-700/50">
        <motion.button
          onClick={logout}
          className="mx-3 flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-all"
          whileHover={{ scale: 1.02, x: 5 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.span className="text-xl" whileHover={{ rotate: 10 }}>
            <FaSignOutAlt />
          </motion.span>
          <AnimatePresence mode="wait">
            {isExpanded && (
              <motion.span
                variants={itemVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                className="font-medium font-space whitespace-nowrap"
              >
                Wyloguj się
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.nav>
  );
};
