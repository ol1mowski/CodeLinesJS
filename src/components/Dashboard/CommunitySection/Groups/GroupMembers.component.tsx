import { memo, useState } from "react";
import { motion } from "framer-motion";
import { FaCrown, FaUserCog, FaTrash, FaUserPlus } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { InviteMemberModal } from "./Modals/InviteMemberModal.component";
import { ChangeRoleModal } from "./Modals/ChangeRoleModal.component";
import { DeleteMemberModal } from "./Modals/DeleteMemberModal.component";

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
  const [selectedMember, setSelectedMember] = useState<{ id: string; username: string; role: string } | null>(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<{ id: string; username: string } | null>(null);
  const queryClient = useQueryClient();
  const isAdmin = userRole === 'admin';

  const removeMemberMutation = useMutation({
    mutationFn: async (memberId: string) => {
      console.log('Removing member:', memberId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['group', groupId] });
      toast.success('Członek grupy został usunięty');
    }
  });

  const changeRoleMutation = useMutation({
    mutationFn: async ({ memberId, newRole }: { memberId: string; newRole: string }) => {
      console.log('Changing role:', { memberId, newRole });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['group', groupId] });
      toast.success('Rola została zmieniona');
      setSelectedMember(null);
    }
  });

  const handleInvite = (data: { username: string }) => {
    console.log('Inviting user:', data.username);
    toast.success(`Zaproszenie zostało wysłane do ${data.username}`);
    setShowInviteModal(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-js">Członkowie grupy ({members.length})</h2>
          {isAdmin && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowInviteModal(true)}
              className="px-4 py-2 rounded-lg bg-js/10 text-js hover:bg-js/20 transition-colors flex items-center gap-2"
            >
              <FaUserPlus />
              <span>Zaproś</span>
            </motion.button>
          )}
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
                    {member.role === 'admin' && (
                      <FaCrown className="text-yellow-500 text-sm" />
                    )}
                  </div>
                  <span className="text-xs text-gray-400 capitalize">
                    {member.role || 'member'}
                  </span>
                </div>
              </div>

              {isAdmin && member.role !== 'admin' && (
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedMember({
                      id: member._id,
                      username: member.username,
                      role: member.role || 'member'
                    })}
                    className="p-2 rounded-lg bg-js/10 text-js hover:bg-js/20 transition-colors"
                  >
                    <FaUserCog />
                  </motion.button>
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

      {showInviteModal && (
        <InviteMemberModal
          onClose={() => setShowInviteModal(false)}
          onSubmit={handleInvite}
        />
      )}

      {selectedMember && (
        <ChangeRoleModal
          username={selectedMember.username}
          currentRole={selectedMember.role}
          onClose={() => setSelectedMember(null)}
          onSubmit={(newRole) => changeRoleMutation.mutate({
            memberId: selectedMember.id,
            newRole
          })}
        />
      )}

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