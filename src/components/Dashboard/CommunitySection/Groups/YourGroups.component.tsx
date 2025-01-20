import { memo } from "react";
import { motion } from "framer-motion";
import { FaUsers } from "react-icons/fa";
import { useGroups } from "../../../../Hooks/useGroups";
import { HiOutlineUserGroup } from "react-icons/hi2";

export const YourGroups = memo(() => {
  const { groups, isLoading } = useGroups();
  const joinedGroups = groups?.filter(group => group.isJoined);

  if (isLoading) {
    return (
      <motion.div className="bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10 p-6 shadow-lg animate-pulse">
        <div className="h-6 w-32 bg-js/10 rounded mb-4" />
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-js/10" />
              <div className="h-4 w-24 bg-js/10 rounded" />
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  if (!groups?.length) {
    return (
      <motion.div className="bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10 p-6 shadow-lg">
        <h2 className="text-xl font-bold text-js mb-4">Twoje Grupy</h2>
        <div className="text-center text-gray-400 py-4">
          <HiOutlineUserGroup className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <div>Nie dołączyłeś jeszcze do żadnej grupy</div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div className="bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10 p-6 shadow-lg">
      <h2 className="text-xl font-bold text-js mb-4">Twoje grupy</h2>
      <div className="space-y-4">
        {joinedGroups?.map(group => (
          <div key={group.id} className="flex items-center justify-between p-3 bg-dark/20 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-js/20 flex items-center justify-center">
                <FaUsers className="w-5 h-5 text-js" />
              </div>
              <div>
                <h3 className="font-medium text-js">{group.name}</h3>
                <span className="text-sm text-gray-400">{group.membersCount} członków</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
});

YourGroups.displayName = "YourGroups"; 