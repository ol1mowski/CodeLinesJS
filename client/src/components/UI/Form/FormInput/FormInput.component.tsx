import { forwardRef } from 'react';
import { motion } from 'framer-motion';

type FormInputProps = {
  label: string;
  error?: string;
  styles?: 'default' | 'white';
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, styles = 'default', icon, rightIcon, className = '', ...props }, ref) => {
    const getInputStyles = () => {
      if (styles === 'white') {
        return `
          w-full py-2 sm:py-3 text-sm sm:text-base bg-white
          ${icon ? 'pl-8 sm:pl-10' : 'pl-3 sm:pl-4'} 
          ${rightIcon ? 'pr-8 sm:pr-10' : 'pr-3 sm:pr-4'}
          border rounded-lg border-gray-300
          text-gray-900 placeholder-gray-500
          focus:outline-none focus:ring-2
          transition-all duration-200
          ${
            error
              ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
              : 'border-gray-300 focus:border-gray-400 focus:ring-gray-100 hover:border-gray-400'
          }
        `;
      }
      
      return `
        w-full py-2 sm:py-3 text-sm sm:text-base bg-dark-medium
        ${icon ? 'pl-8 sm:pl-10' : 'pl-3 sm:pl-4'} 
        ${rightIcon ? 'pr-8 sm:pr-10' : 'pr-3 sm:pr-4'}
        border rounded-lg border-js/10
        text-white placeholder-gray-400
        focus:outline-none focus:ring-2
        transition-all duration-200
        ${
          error
            ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
            : 'border-gray-300 focus:border-[#f7df1e] focus:ring-[#f7df1e]/20 hover:border-gray-400'
        }
      `;
    };

    const getLabelStyles = () => {
      if (styles === 'white') {
        return 'block text-xs sm:text-sm font-medium text-gray-700';
      }
      return 'block text-xs sm:text-sm font-medium text-gray-400';
    };

    return (
      <div className="space-y-1 sm:space-y-2">
        <label className={getLabelStyles()}>{label}</label>
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none text-gray-500">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`${getInputStyles()} ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-2 sm:pr-3 flex items-center text-gray-500">{rightIcon}</div>
          )}
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs sm:text-sm text-red-600 mt-1"
            data-testid={`${props.name}-error`}
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';
