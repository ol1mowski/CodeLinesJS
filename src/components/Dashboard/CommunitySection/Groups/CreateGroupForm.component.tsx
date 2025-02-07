import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGroup, checkGroupNameAvailability } from "../api/groups";
import toast from "react-hot-toast";
import Select from 'react-select';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";



const AVAILABLE_TAGS = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'angular', label: 'Angular' },
  { value: 'node', label: 'Node.js' },
  { value: 'express', label: 'Express.js' },
  { value: 'next', label: 'Next.js' },
  { value: 'nest', label: 'NestJS' },
  { value: 'redux', label: 'Redux' },
  { value: 'graphql', label: 'GraphQL' },
  { value: 'testing', label: 'Testing' },
  { value: 'docker', label: 'Docker' }
] as const;

const createGroupSchema = z.object({
  name: z.string()
    .min(3, "Nazwa musi mieć minimum 3 znaki")
    .max(50, "Nazwa nie może przekraczać 50 znaków")
    .regex(/^[a-zA-Z0-9\s-]+$/, "Nazwa może zawierać tylko litery, cyfry, spacje i myślniki"),
  description: z.string()
    .min(10, "Opis musi mieć minimum 10 znaków")
    .max(500, "Opis nie może przekraczać 500 znaków"),
  tags: z.array(z.object({
    value: z.string(),
    label: z.string()
  })).min(1, "Wybierz przynajmniej jeden tag").max(5, "Możesz wybrać maksymalnie 5 tagów")
});

type FormData = z.infer<typeof createGroupSchema>;

type CreateGroupFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const CreateGroupForm = memo(({ isOpen, onClose }: CreateGroupFormProps) => {
  const queryClient = useQueryClient();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    clearErrors
  } = useForm<FormData>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: {
      name: '',
      description: '',
      tags: []
    }
  });

  const checkNameMutation = useMutation({
    mutationFn: checkGroupNameAvailability,
    onSuccess: (isAvailable) => {
      if (!isAvailable) {
        setError('name', {
          type: 'manual',
          message: 'Ta nazwa jest już zajęta'
        });
      } else {
        clearErrors('name');
      }
    }
  });

  const createGroupMutation = useMutation({
    mutationFn: (data: FormData) => {
      return createGroup({
        name: data.name,
        description: data.description,
        tags: data.tags.map(tag => tag.value)
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      toast.success("Grupa została utworzona!");
      reset();
      onClose();
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Nie udało się utworzyć grupy");
      }
    }
  });

  const onSubmit = handleSubmit(async (data) => {
    const isAvailable = await checkNameMutation.mutateAsync(data.name);
    if (isAvailable) {
      createGroupMutation.mutate(data);
    }
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md 
                     bg-dark/95 backdrop-blur-lg rounded-xl p-6 shadow-xl z-50"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-js">Utwórz nową grupę</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-300 transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <input
                  {...register("name")}
                  placeholder="Nazwa grupy"
                  className={`w-full bg-dark/50 rounded-lg px-4 py-2 text-gray-300 
                           border ${errors.name ? 'border-red-500' : 'border-js/10'} 
                           focus:outline-none focus:border-js/30`}
                />
                {errors.name && (
                  <span className="text-sm text-red-400 mt-1">{errors.name.message}</span>
                )}
                {checkNameMutation.isPending && (
                  <span className="text-sm text-js mt-1">Sprawdzanie dostępności nazwy...</span>
                )}
              </div>

              <div>
                <textarea
                  {...register("description")}
                  placeholder="Opis grupy (min. 10 znaków)"
                  rows={4}
                  className={`w-full bg-dark/50 rounded-lg px-4 py-2 text-gray-300 
                           border ${errors.description ? 'border-red-500' : 'border-js/10'} 
                           focus:outline-none focus:border-js/30`}
                />
                {errors.description && (
                  <span className="text-sm text-red-400 mt-1">{errors.description.message}</span>
                )}
              </div>

              <div>
                <Controller
                  name="tags"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isMulti
                      options={AVAILABLE_TAGS}
                      placeholder="Wybierz tagi (max. 5)"
                      className="react-select-container"
                      classNamePrefix="react-select"
                      styles={{
                        control: (base, state) => ({
                          ...base,
                          backgroundColor: 'rgba(17, 17, 17, 0.5)',
                          borderColor: errors.tags
                            ? '#ef4444'
                            : state.isFocused
                              ? 'rgba(247, 223, 30, 0.3)'
                              : 'rgba(247, 223, 30, 0.1)',
                          '&:hover': {
                            borderColor: 'rgba(247, 223, 30, 0.3)'
                          }
                        }),
                        menu: (base) => ({
                          ...base,
                          backgroundColor: 'rgba(17, 17, 17, 0.95)',
                          backdropFilter: 'blur(10px)'
                        }),
                        option: (base, state) => ({
                          ...base,
                          backgroundColor: state.isFocused
                            ? 'rgba(247, 223, 30, 0.1)'
                            : 'transparent',
                          color: state.isSelected ? '#f7df1e' : '#d1d5db',
                          '&:hover': {
                            backgroundColor: 'rgba(247, 223, 30, 0.1)'
                          }
                        }),
                        multiValue: (base) => ({
                          ...base,
                          backgroundColor: 'rgba(247, 223, 30, 0.1)',
                        }),
                        multiValueLabel: (base) => ({
                          ...base,
                          color: '#f7df1e',
                        }),
                        multiValueRemove: (base) => ({
                          ...base,
                          color: '#f7df1e',
                          '&:hover': {
                            backgroundColor: 'rgba(247, 223, 30, 0.2)',
                            color: '#f7df1e',
                          }
                        }),
                      }}
                    />
                  )}
                />
                {errors.tags && (
                  <span className="text-sm text-red-400 mt-1">{errors.tags.message}</span>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting || createGroupMutation.isPending}
                className="w-full py-2 bg-js text-dark font-medium rounded-lg 
                         hover:bg-js/90 transition-colors disabled:opacity-50 
                         disabled:cursor-not-allowed"
              >
                {createGroupMutation.isPending ? "Tworzenie..." : "Utwórz grupę"}
              </motion.button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

CreateGroupForm.displayName = "CreateGroupForm"; 