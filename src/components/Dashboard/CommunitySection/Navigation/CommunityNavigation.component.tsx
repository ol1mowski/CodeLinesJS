import { memo } from "react";
import { motion } from "framer-motion";
import { FaNewspaper, FaTrophy, FaUsers } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const navigationItems = [
  {
    id: "/",
    label: "Aktualności",
    icon: FaNewspaper,
    path: "/dashboard/community/" 
  },
  {
    id: "ranking",
    label: "Ranking",
    icon: FaTrophy,
    path: "/dashboard/community/ranking"
  },
  {
    id: "groups",
    label: "Grupy",
    icon: FaUsers,
    path: "/dashboard/community/groups"
  }
] as const;

export const CommunityNavigation = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="flex items-center bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10 p-6 shadow-lg">
      <nav className="flex gap-4">
        {navigationItems.map(item => (
          <motion.button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`px-4 rounded-lg flex items-center gap-2 transition-colors focus:outline-none ${
              currentPath.includes(item.id) 
                ? 'bg-js text-dark font-medium' 
                : 'text-gray-400 hover:text-js'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </motion.button>
        ))}
      </nav>
    </div>
  );
});

CommunityNavigation.displayName = "CommunityNavigation";