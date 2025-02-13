import { memo, useState } from "react";
import { motion } from "framer-motion";
import { FaCrown, FaTrash } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { DeleteMemberModal } from "./Modals/DeleteMemberModal.component";
import { deleteMember } from "../api/groups/groups.api";

type GroupMembersProps = {
  members: Array<{
    _id: string;
    username: string;
    avatar?: string;
    role?: string;
  }>;
  groupId: string;
  userRole: string;
};

export const GroupMembers = memo(({ members, groupId, userRole }: GroupMembersProps) => {

  const [memberToDelete, setMemberToDelete] = useState<{ id: string; username: string } | null>(null);
  const queryClient = useQueryClient();
  const isAdmin = userRole === 'admin';

  const removeMemberMutation = useMutation({
    mutationFn: async (memberId: string) => {
      await deleteMember(groupId, memberId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['group', groupId] });
      toast.success('Członek grupy został usunięty');
    }
  });


  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-js">Członkowie grupy ({members.length})</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((member) => (
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
                      alt={member.username}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-js font-medium">
                      {member.username[0].toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-200">
                      {member.username}
                    </span>
                    {member.isAdmin && (
                      <FaCrown className="text-yellow-500 text-sm" />
                    )}
                  </div>
                  <span className="text-xs text-gray-400 capitalize">
                    {member.isAdmin ? 'admin' : 'member'}
                  </span>
                </div>
              </div>

              {isAdmin && !member.isAdmin && (
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setMemberToDelete({
                      id: member._id,
                      username: member.username
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