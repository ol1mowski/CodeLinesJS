import { motion } from "framer-motion";
import { forwardRef, memo } from "react";

type FormInputProps = {
  type: string;
  label: string;
  placeholder: string;
  icon: React.ReactNode;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const FormInput = memo(forwardRef<HTMLInputElement, FormInputProps>(
  ({ type, label, placeholder, icon, error, id, ...props }, ref) => (
    <div className="space-y-2">
      <label 
        htmlFor={id || props.name} 
        className="block text-sm font-medium text-gray-300"
      >
        {label}
      </label>
      <div className="relative">
        <div 
          className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"
          aria-hidden="true"
        >
          {icon}
        </div>
        <input
          ref={ref}
          id={id || props.name}
          type={type}
          className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-800/50 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? `${id || props.name}-error` : undefined}
          {...props}
        />
      </div>
      {error && (
        <motion.p
          id={`${id || props.name}-error`}
          role="alert"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-400"
        >
          {error}
        </motion.p>
      )}
    </div>
  )
));