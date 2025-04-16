import { memo } from "react";
import { NavLink } from "react-router-dom";


export const CommunityNavigation = memo(() => {

    return (
      <div className="flex gap-4 mb-8 pb-2">
        <NavLink 
          to="/dashboard/community" 
          end
          className={({ isActive }) => 
            `flex items-center gap-2 px-6 py-3 font-semibold rounded-lg transition-all ${
              isActive 
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
          className={({ isActive }) => 
            `flex items-center gap-2 px-6 py-3 font-semibold rounded-lg transition-all ${
              isActive 
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
