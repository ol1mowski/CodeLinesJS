import { memo } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { Controller, useForm } from "react-hook-form";
import Select from 'react-select';
import { AVAILABLE_TAGS } from "../CreateGroupForm.component";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type EditTagsModalProps = {
  currentTags: string[];
  onClose: () => void;
  onSubmit: (tags: string[]) => void;
};

const editTagsSchema = z.object({
  tags: z.array(z.object({
    value: z.string(),
    label: z.string()
  })).min(1, "Wybierz przynajmniej jeden tag").max(5, "Możesz wybrać maksymalnie 5 tagów")
});

type FormData = z.infer<typeof editTagsSchema>;

export const EditTagsModal = memo(({ currentTags, onClose, onSubmit }: EditTagsModalProps) => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(editTagsSchema),
    defaultValues: {
      tags: currentTags.map(tag => ({
        value: tag.toLowerCase(),
        label: AVAILABLE_TAGS.find(t => t.value === tag.toLowerCase())?.label || tag
      }))
    }
  });

  const onSubmitForm = (data: FormData) => {
    onSubmit(data.tags.map(tag => tag.value));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-dark/90 rounded-xl p-6 w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-js">Edytuj tagi grupy</h2>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="text-gray-400 hover:text-js"
          >
            <FaTimes />
          </motion.button>
        </div>

        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
          <div>
            <label className="text-js font-medium block mb-2">Tagi</label>
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  options={AVAILABLE_TAGS}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  placeholder="Wybierz tagi..."
                  noOptionsMessage={() => "Brak dostępnych tagów"}
                  styles={{
                    control: (base) => ({
                      ...base,
                      backgroundColor: 'rgba(17, 17, 17, 0.5)',
                      borderColor: errors.tags ? '#ef4444' : 'rgba(234, 179, 8, 0.1)',
                      '&:hover': {
                        borderColor: 'rgba(234, 179, 8, 0.3)'
                      }
                    }),
                    menu: (base) => ({
                      ...base,
                      backgroundColor: 'rgba(17, 17, 17, 0.95)',
                      backdropFilter: 'blur(10px)'
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isFocused ? 'rgba(234, 179, 8, 0.1)' : 'transparent',
                      color: state.isFocused ? '#eab308' : '#9ca3af',
                      '&:hover': {
                        backgroundColor: 'rgba(234, 179, 8, 0.1)',
                        color: '#eab308'
                      }
                    }),
                    multiValue: (base) => ({
                      ...base,
                      backgroundColor: 'rgba(234, 179, 8, 0.1)',
                    }),
                    multiValueLabel: (base) => ({
                      ...base,
                      color: '#eab308',
                    }),
                    multiValueRemove: (base) => ({
                      ...base,
                      color: '#eab308',
                      '&:hover': {
                        backgroundColor: 'rgba(234, 179, 8, 0.2)',
                        color: '#eab308'
                      }
                    })
                  }}
                />
              )}
            />
            {errors.tags && (
              <span className="text-sm text-red-400 mt-1 block">{errors.tags.message}</span>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-dark/50 text-gray-400 hover:text-white transition-colors"
            >
              Anuluj
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 rounded-lg bg-js text-dark font-medium hover:bg-js/90 transition-colors"
            >
              Zapisz zmiany
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
});

EditTagsModal.displayName = "EditTagsModal"; 