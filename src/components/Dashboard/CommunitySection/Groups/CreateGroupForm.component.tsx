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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-4 lg:inset-12 bg-dark/95 backdrop-blur-lg rounded-2xl shadow-2xl z-50 overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Nagłówek */}
            <div className="absolute top-0 inset-x-0 bg-gradient-to-b from-js/5 to-transparent h-32">
              <div className="flex justify-between items-center p-6">
                <div>
                  <h2 className="text-2xl font-bold text-js">Utwórz nową grupę</h2>
                  <p className="text-gray-400 mt-1">Stwórz przestrzeń dla swojej społeczności</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-300 transition-colors p-2"
                >
                  <FaTimes size={24} />
                </motion.button>
              </div>
            </div>

            {/* Formularz */}
            <div className="h-full overflow-y-auto pt-32 pb-24">
              <form onSubmit={onSubmit} className="max-w-3xl mx-auto p-6 space-y-8">
                {/* Nazwa grupy */}
                <div className="space-y-2">
                  <label className="text-js font-medium block">Nazwa grupy</label>
                  <input
                    {...register("name")}
                    placeholder="np. JavaScript Enthusiasts"
                    className={`w-full bg-dark/50 rounded-lg px-4 py-3 text-gray-200 text-lg
                             border ${errors.name ? 'border-red-500' : 'border-js/10'} 
                             focus:outline-none focus:border-js/30 transition-colors`}
                  />
                  {errors.name && (
                    <span className="text-sm text-red-400">{errors.name.message}</span>
                  )}
                  {checkNameMutation.isPending && (
                    <span className="text-sm text-js">Sprawdzanie dostępności nazwy...</span>
                  )}
                </div>

                {/* Opis grupy */}
                <div className="space-y-2">
                  <label className="text-js font-medium block">Opis grupy</label>
                  <textarea
                    {...register("description")}
                    placeholder="Opisz, czym będzie się zajmować Twoja grupa..."
                    rows={6}
                    className={`w-full bg-dark/50 rounded-lg px-4 py-3 text-gray-200 
                             border ${errors.description ? 'border-red-500' : 'border-js/10'} 
                             focus:outline-none focus:border-js/30 transition-colors`}
                  />
                  {errors.description && (
                    <span className="text-sm text-red-400">{errors.description.message}</span>
                  )}
                </div>

                {/* Tagi */}
                <div className="space-y-2">
                  <label className="text-js font-medium block">Tagi (max. 5)</label>
                  <Controller
                    name="tags"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isMulti
                        options={AVAILABLE_TAGS}
                        placeholder="Wybierz tagi opisujące tematykę grupy"
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
                            padding: '4px',
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
                    <span className="text-sm text-red-400">{errors.tags.message}</span>
                  )}
                </div>
              </form>
            </div>

            {/* Przyciski akcji */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-dark/95 to-transparent p-6">
              <div className="max-w-3xl mx-auto flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="flex-1 py-3 px-6 bg-dark/50 text-gray-300 font-medium rounded-lg 
                           hover:bg-dark/70 transition-colors border border-js/10"
                >
                  Anuluj
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit(onSubmit)}
                  disabled={isSubmitting || createGroupMutation.isPending}
                  className="flex-1 py-3 px-6 bg-js text-dark font-medium rounded-lg 
                           hover:bg-js/90 transition-colors disabled:opacity-50 
                           disabled:cursor-not-allowed"
                >
                  {createGroupMutation.isPending ? "Tworzenie..." : "Utwórz grupę"}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

CreateGroupForm.displayName = "CreateGroupForm"; 