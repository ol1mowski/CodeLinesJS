import { memo, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaUsers,  FaClock, FaCalendar, FaTag, FaSignOutAlt } from "react-icons/fa";
import { useGroup } from "../hooks/useGroup";
import { format, isValid } from "date-fns";
import { pl } from "date-fns/locale";
import { GroupMembers } from "./GroupMembers.component";
import { GroupTabs } from "./GroupTabs.component";
import { GroupSettings } from "./GroupSettings.component";
import { LeaveGroupModal } from "./Modals/LeaveGroupModal.component";
import { useMutation } from "@tanstack/react-query";
import { leaveGroup } from "../api/groups/groups.api";
import toast from "react-hot-toast";
import { useAuth } from "../../../../hooks/useAuth";
import { Group } from "../types/groups.types";

type ExtendedGroup = Group & {
  userRole?: string;
  createdAt?: string;
  isAdmin?: boolean;
}

const formatDate = (dateString: string | undefined, formatStr: string): string => {
  if (!dateString) return "Brak daty";
  
  try {
    const date = new Date(dateString);
    if (!isValid(date)) return "Nieprawidłowa data";
    
    return format(date, formatStr, { locale: pl });
  } catch (error) {
    console.error("Błąd formatowania daty:", error);
    return "Błąd daty";
  }
};

const GroupView = memo(() => {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const { data: group, isLoading, error, refetch } = useGroup(groupId || '');
  const [activeTab, setActiveTab] = useState<'chat' | 'members' | 'settings'>('chat');
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    if (groupId && token) {
      refetch();
    }
  }, [groupId, token, refetch]);


  const leaveGroupMutation = useMutation({
    mutationFn: async () => {
      if (!groupId || !token) {
        console.error("Brak ID grupy lub tokenu");
        throw new Error("Nie można opuścić grupy");
      }
      await leaveGroup(groupId, token);
    },
    onSuccess: () => {
      navigate('/dashboard/community/groups');
      toast.success('Opuściłeś grupę');
    },
    onError: (err) => {
      console.error("Błąd podczas opuszczania grupy:", err);
      toast.error("Nie udało się opuścić grupy");
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-js border-t-transparent" />
      </div>
    );
  }

  if (error || !group) {
    console.error("Błąd w komponencie GroupView:", error);
    return (
      <div className="text-center p-8">
        <h3 className="text-xl text-red-500 mb-4">Wystąpił błąd podczas ładowania grupy</h3>
        <p className="text-gray-400 mb-4">{error?.message || "Nieznany błąd"}</p>
        <button
          onClick={() => navigate('/dashboard/community/groups')}
          className="text-js hover:text-js/80 transition-colors"
        >
          Wróć do listy grup
        </button>
      </div>
    );
  }

  const extendedGroup: ExtendedGroup = {
    ...group,
    userRole: (group as any).userRole || 'member',
    createdAt: (group as any).createdAt || new Date().toISOString(),
    isAdmin: (group as any).userRole === 'admin'
  };


  const renderContent = () => {
    switch (activeTab) {
      case 'members':
        return (
          <GroupMembers 
            members={group.members || []} 
            groupId={groupId!} 
            userRole={extendedGroup.userRole || 'member'} 
          />
        );
      case 'settings':
        return <GroupSettings group={group} />;
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
              <h1 className="text-3xl font-bold text-js mb-1">{group.name || "Grupa bez nazwy"}</h1>
              <p className="text-gray-400">{group.description || "Brak opisu"}</p>
            </div>
          </div>

          {!extendedGroup.isAdmin && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowLeaveModal(true)}
              className="p-3 rounded-lg bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 transition-colors"
            >
              <FaSignOutAlt />
            </motion.button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-dark/20 rounded-lg p-4 flex items-center gap-3">
            <FaUsers className="text-js text-xl" />
            <div>
              <p className="text-gray-400 text-sm">Członkowie</p>
              <p className="text-white font-medium">{group.membersCount || 0}</p>
            </div>
          </div>
          <div className="bg-dark/20 rounded-lg p-4 flex items-center gap-3">
            <FaClock className="text-js text-xl" />
            <div>
              <p className="text-gray-400 text-sm">Ostatnia aktywność</p>
              <p className="text-white font-medium">
                {formatDate(group.lastActive, 'dd MMM, HH:mm')}
              </p>
            </div>
          </div>
          <div className="bg-dark/20 rounded-lg p-4 flex items-center gap-3">
            <FaCalendar className="text-js text-xl" />
            <div>
              <p className="text-gray-400 text-sm">Utworzono</p>
              <p className="text-white font-medium">
                {formatDate(extendedGroup.createdAt, 'dd MMM yyyy')}
              </p>
            </div>
          </div>
          <div className="bg-dark/20 rounded-lg p-4 flex items-center gap-3">
            <div className="bg-js/20 rounded-lg p-2">
              <span className="text-js font-medium uppercase">{extendedGroup.userRole || "Członek"}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {(group.tags && group.tags.length > 0) ? (
            group.tags.map((tag: string, index: number) => (
              <span
                key={`${tag}-${index}`}
                className="px-3 py-1 rounded-full text-sm bg-js/10 text-js border border-js/20 
                         flex items-center gap-2"
              >
                <FaTag className="text-xs" />
                {tag}
              </span>
            ))
          ) : (
            <span className="text-gray-400">Brak tagów</span>
          )}
        </div>
      </motion.div>

      <GroupTabs 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isAdmin={extendedGroup.isAdmin || false}
      />

      {renderContent()}

      {showLeaveModal && (
        <LeaveGroupModal
          groupName={group.name || "tej grupy"}
          onClose={() => setShowLeaveModal(false)}
          onConfirm={() => {
            leaveGroupMutation.mutate();
            setShowLeaveModal(false);
          }}
        />
      )}
    </div>
  );
});

GroupView.displayName = "GroupView";

export default GroupView; 