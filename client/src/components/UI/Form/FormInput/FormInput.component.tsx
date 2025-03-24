import { forwardRef } from "react";
import { motion } from "framer-motion";

type FormInputProps = {
  label: string;
  error?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, icon, rightIcon, className = "", ...props }, ref) => (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-300">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={`
            w-full py-3 
            ${icon ? 'pl-10' : 'pl-4'} 
            ${rightIcon ? 'pr-10' : 'pr-4'}
            bg-dark/20 border rounded-lg 
            text-gray-200 placeholder-gray-500
            focus:outline-none focus:ring-2
            shadow-sm
            transition-all duration-200
            ${error 
              ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20' 
              : 'border-js/20 focus:border-js/50 focus:ring-js/20 hover:border-js/30'
            }
            ${className}
          `}
          {...props}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {rightIcon}
          </div>
        )}
        
        {/* Efekt podświetlenia przy focusie */}
        <div className="absolute inset-0 rounded-lg pointer-events-none bg-js/5 opacity-0 transition-opacity duration-300 peer-focus:opacity-100"></div>
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-400 mt-1"
          data-testid={`${props.name}-error`}
        >
          {error}
        </motion.p>
      )}
    </div>
  )
);

FormInput.displayName = "FormInput";