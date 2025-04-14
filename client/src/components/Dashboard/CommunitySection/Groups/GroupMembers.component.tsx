import { memo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCrown, FaTrash, FaUser } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { DeleteMemberModal } from "./Modals/DeleteMemberModal.component";
import { deleteMember } from "../api/groups/groups.api";
import { useAuth } from "../../../../hooks/useAuth";

type MemberData = {
  _id: string;
  username?: string;
  name?: string;
  displayName?: string;
  avatar?: string;
  role?: string;
};

type ProcessedMemberData = {
  _id: string;
  displayName: string;
  avatar?: string;
  role?: string;
};

type GroupMembersProps = {
  members: MemberData[];
  groupId: string;
  userRole: string;
};

export const GroupMembers = memo(({ members, groupId, userRole }: GroupMembersProps) => {
  const { token } = useAuth();
  const [memberToDelete, setMemberToDelete] = useState<{ id: string; username: string } | null>(null);
  const [processedMembers, setProcessedMembers] = useState<ProcessedMemberData[]>([]);
  const queryClient = useQueryClient();
  const isAdmin = userRole === 'admin';

  useEffect(() => {
    if (Array.isArray(members)) {
      const processed = members.map(member => {
        const displayName = member.username || member.name || member.displayName || "Użytkownik";
        
        return {
          ...member,
          _id: member._id || `temp-${Math.random().toString(36).substring(7)}`,
          displayName
        };
      });
      setProcessedMembers(processed);
    } else {
      setProcessedMembers([]);
    }
  }, [members]);

  const removeMemberMutation = useMutation({
    mutationFn: async (memberId: string) => {
      await deleteMember(groupId, memberId, token || '');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['group', groupId] });
      toast.success('Członek grupy został usunięty');
    }
  });

  if (!processedMembers || processedMembers.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-js">Członkowie grupy (0)</h2>
        </div>
        <div className="text-center text-gray-400 py-10">
          Brak członków w tej grupie
        </div>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-js">Członkowie grupy ({processedMembers.length})</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {processedMembers.map((member) => (
            <motion.div
              key={member._id}
              className="bg-dark/20 rounded-lg p-4 flex items-center justify-between"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-js/20 flex items-center justify-center">
                  {member.avatar ? (
                    <img
                      src={member.avatar}
                      alt={member.displayName}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-js font-medium">
                      {member.displayName.length > 0 
                        ? member.displayName[0].toUpperCase() 
                        : <FaUser />}
                    </span>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-200">
                      {member.displayName}
                    </span>
                    {member.role === 'admin' && (
                      <FaCrown className="text-yellow-500 text-sm" />
                    )}
                  </div>
                  <span className="text-xs text-gray-400 capitalize">
                    {member.role === 'admin' ? 'admin' : 'member'}
                  </span>
                </div>
              </div>

              {isAdmin && member.role !== 'admin' && (
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setMemberToDelete({
                      id: member._id,
                      username: member.displayName
                    })}
                    className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                  >
                    <FaTrash />
                  </motion.button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {memberToDelete && (
        <DeleteMemberModal
          username={memberToDelete.username}
          onClose={() => setMemberToDelete(null)}
          onConfirm={() => {
            removeMemberMutation.mutate(memberToDelete.id);
            setMemberToDelete(null);
          }}
        />
      )}
    </>
  );
});

GroupMembers.displayName = "GroupMembers"; 