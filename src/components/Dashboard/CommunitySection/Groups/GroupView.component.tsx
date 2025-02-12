import { memo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaUsers, FaBell, FaClock, FaCalendar, FaTag } from "react-icons/fa";
import { useGroup } from "../hooks/useGroup";
import { GroupChat } from "./Chat/GroupChat.component";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { GroupMembers } from "./GroupMembers.component";
import { GroupTabs } from "./GroupTabs.component";
import { useState } from "react";

export const GroupView = memo(() => {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const { data: group, isLoading, error } = useGroup(groupId!);
  const [activeTab, setActiveTab] = useState<'chat' | 'members' | 'settings'>('chat');

  console.log(group);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-js border-t-transparent" />
      </div>
    );
  }

  if (error || !group) {
    return (
      <div className="text-center p-8">
        <h3 className="text-xl text-red-500 mb-4">Wystąpił błąd podczas ładowania grupy</h3>
        <button
          onClick={() => navigate('/dashboard/community/groups')}
          className="text-js hover:text-js/80 transition-colors"
        >
          Wróć do listy grup
        </button>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return <GroupChat groupId={groupId!} />;
      case 'members':
        return (
          <GroupMembers 
            members={group.members} 
            groupId={groupId!} 
            userRole={group.userRole} 
          />
        );
      case 'settings':
        return <div>Ustawienia grupy</div>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10 p-6"
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/dashboard/community/groups')}
              className="p-2 rounded-lg bg-js/10 text-js hover:bg-js/20 transition-colors"
            >
              <FaArrowLeft />
            </motion.button>
            <div>
              <h1 className="text-3xl font-bold text-js mb-1">{group.name}</h1>
              <p className="text-gray-400">{group.description}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-dark/20 rounded-lg p-4 flex items-center gap-3">
            <FaUsers className="text-js text-xl" />
            <div>
              <p className="text-gray-400 text-sm">Członkowie</p>
              <p className="text-white font-medium">{group.membersCount}</p>
            </div>
          </div>
          <div className="bg-dark/20 rounded-lg p-4 flex items-center gap-3">
            <FaClock className="text-js text-xl" />
            <div>
              <p className="text-gray-400 text-sm">Ostatnia aktywność</p>
              <p className="text-white font-medium">
                {format(new Date(group.lastActive), 'dd MMM, HH:mm', { locale: pl })}
              </p>
            </div>
          </div>
          <div className="bg-dark/20 rounded-lg p-4 flex items-center gap-3">
            <FaCalendar className="text-js text-xl" />
            <div>
              <p className="text-gray-400 text-sm">Utworzono</p>
              <p className="text-white font-medium">
                {format(new Date(group.createdAt), 'dd MMM yyyy', { locale: pl })}
              </p>
            </div>
          </div>
          <div className="bg-dark/20 rounded-lg p-4 flex items-center gap-3">
            <div className="bg-js/20 rounded-lg p-2">
              <span className="text-js font-medium uppercase">{group.userRole}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {group.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-sm bg-js/10 text-js border border-js/20 
                       flex items-center gap-2"
            >
              <FaTag className="text-xs" />
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      <GroupTabs 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isAdmin={group.userRole === 'admin'}
      />

      {renderContent()}
    </div>
  );
});

GroupView.displayName = "GroupView"; 