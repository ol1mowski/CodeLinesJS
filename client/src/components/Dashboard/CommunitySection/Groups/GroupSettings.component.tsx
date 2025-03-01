import { memo, useState } from "react";
import { motion } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteGroup, updateGroupName, updateGroupTags } from "../api/groups/groups.api";
import { EditTagsModal } from "./Modals/EditTagsModal.component";
import { DeleteGroupModal } from "./Modals/DeleteGroupModal.component";
import { useAuth } from "../../../../Hooks/useAuth";

type GroupSettingsProps = {
  group: {
    _id: string;
    name: string;
    tags: string[];
  };
};

export const GroupSettings = memo(({ group }: GroupSettingsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingTags, setIsEditingTags] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { token } = useAuth();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: group.name
    }
  });

  const updateGroupMutation = useMutation({
    mutationFn: async (data: { name: string }) => {
      await updateGroupName(group._id, data.name, token || '');
    },
    onSuccess: () => {
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ['group', group._id] });
      toast.success('Nazwa grupy została zaktualizowana');
    }
  });

  const updateTagsMutation = useMutation({
    mutationFn: async (tags: string[]) => {
      await updateGroupTags(group._id, tags, token || '');
    },
    onSuccess: () => {
      setIsEditingTags(false);
      queryClient.invalidateQueries({ queryKey: ['group', group._id] });
      toast.success('Tagi zostały zaktualizowane');
    }
  });

  const deleteGroupMutation = useMutation({
    mutationFn: async () => {
      await deleteGroup(group._id, token || '');
    },
    onSuccess: () => {
      navigate('/dashboard/community/groups');
      toast.success('Grupa została usunięta');
    }
  });

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10 p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-js">Nazwa grupy</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 rounded-lg bg-js/10 text-js hover:bg-js/20 transition-colors"
          >
            <FaEdit />
          </motion.button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit((data) => updateGroupMutation.mutate(data))}>
            <div className="flex gap-2">
              <input
                {...register("name", { required: true })}
                className="flex-1 bg-dark/50 rounded-lg px-4 py-2 text-white border border-js/10 focus:outline-none focus:border-js"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-lg bg-js text-dark font-medium hover:bg-js/90 transition-colors"
              >
                Zapisz
              </motion.button>
            </div>
          </form>
        ) : (
          <p className="text-gray-300">{group.name}</p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10 p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-js">Tagi</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditingTags(true)}
            className="p-2 rounded-lg bg-js/10 text-js hover:bg-js/20 transition-colors"
          >
            <FaEdit />
          </motion.button>
        </div>

        <div className="flex flex-wrap gap-2">
          {group.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-sm bg-js/10 text-js border border-js/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {isEditingTags && (
        <EditTagsModal
          currentTags={group.tags}
          onClose={() => setIsEditingTags(false)}
          onSubmit={(tags) => updateTagsMutation.mutate(tags)}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-red-500/10 backdrop-blur-sm rounded-xl border border-red-500/10 p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-red-500 mb-2">Usuń grupę</h3>
            <p className="text-gray-400 text-sm">
              Ta akcja jest nieodwracalna. Wszyscy członkowie zostaną usunięci, a zawartość grupy zostanie utracona.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowDeleteModal(true)}
            className="p-3 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
          >
            <FaTrash />
          </motion.button>
        </div>
      </motion.div>

      {showDeleteModal && (
        <DeleteGroupModal
          groupName={group.name}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => {
            deleteGroupMutation.mutate();
            setShowDeleteModal(false);
          }}
        />
      )}
    </div>
  );
});

GroupSettings.displayName = "GroupSettings"; 