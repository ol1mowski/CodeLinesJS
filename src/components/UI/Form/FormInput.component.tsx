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
    <label className="block text-sm font-medium text-gray-400">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        {icon}
      </div>
      <input
        type={type}
        className="block w-full pl-10 pr-3 py-2 border rounded-lg 
                  bg-dark/50 text-gray-200 placeholder-gray-500 
                  border-yellow-500/20 hover:border-yellow-500/30
                  focus:outline-none focus:ring-1 focus:ring-yellow-500/20 focus:border-yellow-500/50 
                  transition-colors"
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