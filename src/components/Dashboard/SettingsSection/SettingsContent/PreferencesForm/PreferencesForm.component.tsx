import { motion } from "framer-motion";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { FaBell, FaMoon, FaGlobe } from "react-icons/fa";
import { UserPreferences } from "../../../../../types/settings.types";
import { Button } from "../../../../UI/Button/Button.component";

export const PreferencesForm = memo(() => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<UserPreferences>({
    defaultValues: {
      emailNotifications: true,
      pushNotifications: true,
      darkMode: true,
      language: "pl"
    }
  });

  const onSubmit = async (data: UserPreferences) => {
    console.log(data);
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-200 flex items-center gap-2">
          <FaBell className="text-indigo-400" />
          Powiadomienia
        </h3>
        <div className="space-y-4 ml-8">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              {...register("emailNotifications")}
              className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-indigo-500 focus:ring-indigo-500"
            />
            <div>
              <span className="block text-gray-200">Powiadomienia email</span>
              <span className="block text-sm text-gray-400">Otrzymuj powiadomienia na email</span>
            </div>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              {...register("pushNotifications")}
              className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-indigo-500 focus:ring-indigo-500"
            />
            <div>
              <span className="block text-gray-200">Powiadomienia push</span>
              <span className="block text-sm text-gray-400">Otrzymuj powiadomienia w przeglądarce</span>
            </div>
          </label>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-200 flex items-center gap-2">
          <FaMoon className="text-indigo-400" />
          Wygląd
        </h3>
        <div className="space-y-4 ml-8">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              {...register("darkMode")}
              className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-indigo-500 focus:ring-indigo-500"
            />
            <div>
              <span className="block text-gray-200">Tryb ciemny</span>
              <span className="block text-sm text-gray-400">Używaj ciemnego motywu</span>
            </div>
          </label>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-200 flex items-center gap-2">
          <FaGlobe className="text-indigo-400" />
          Język
        </h3>
        <div className="ml-8">
          <select
            {...register("language")}
            className="w-full max-w-xs px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
          >
            <option value="pl">Polski</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-r from-indigo-500 to-purple-500"
        >
          {isSubmitting ? "Zapisywanie..." : "Zapisz preferencje"}
        </Button>
      </div>
    </motion.form>
  );
});

PreferencesForm.displayName = "PreferencesForm"; 