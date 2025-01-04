import { motion } from "framer-motion";

type FormInputProps = {
  type: string;
  label: string;
  placeholder: string;
  icon: React.ReactNode;
  error?: string;
};

export const FormInput = ({ type, label, placeholder, icon, error }: FormInputProps) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-300">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        {icon}
      </div>
      <input
        type={type}
        className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-800/50 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
        placeholder={placeholder}
      />
    </div>
    {error && (
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-sm text-red-400"
      >
        {error}
      </motion.p>
    )}
  </div>
); 