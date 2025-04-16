import { memo } from "react";
import { NavLink, useLocation } from "react-router-dom";

export const CommunityNavigation = memo(() => {
  const location = useLocation();
  const pathname = location.pathname;

  const isFeedActive = pathname === "/dashboard/community" ||
    pathname === "/dashboard/community/" ||
    (/^\/dashboard\/community\/?$/.test(pathname));

  const isRankingActive = pathname.includes("/dashboard/community/ranking");

  return (
    <div className="flex gap-4 mb-8 pb-2">
      <NavLink
        to="/dashboard/community"
        className={
          `flex items-center gap-2 px-6 py-3 font-semibold rounded-lg transition-all ${isFeedActive
            ? 'bg-js/10 text-js border-b-2 border-js shadow-md'
            : 'text-gray-400 hover:text-js hover:bg-js/5'
          }`
        }
      >
        <i className="fas fa-newspaper"></i>
        Aktualności
      </NavLink>
      <NavLink
        to="/dashboard/community/ranking"
        className={
          `flex items-center gap-2 px-6 py-3 font-semibold rounded-lg transition-all ${isRankingActive
            ? 'bg-js/10 text-js border-b-2 border-js shadow-md'
            : 'text-gray-400 hover:text-js hover:bg-js/5'
          }`
        }
      >
        <i className="fas fa-trophy"></i>
        Ranking
      </NavLink>
    </div>
  );
});

CommunityNavigation.displayName = "CommunityNavigation";
