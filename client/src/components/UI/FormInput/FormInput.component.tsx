import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

type FormInputProps = {
  label: string;
  error?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  name: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, icon, rightIcon, name, ...props }, ref) => {
    const inputId = `${name}-input`;

    return (
      <div className="space-y-1">
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-400">
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
            id={inputId}
            name={name}
            className={`
              w-full py-2 ${icon ? 'pl-10' : 'pl-3'} ${rightIcon ? 'pr-10' : 'pr-3'}
              bg-dark/50 border rounded-lg 
              text-gray-200 placeholder-gray-500
              focus:outline-none focus:ring-1
              transition-colors
              ${
                error
                  ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20'
                  : 'border-yellow-500/20 focus:border-yellow-500/50 focus:ring-yellow-500/20 hover:border-yellow-500/30'
              }
            `}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">{rightIcon}</div>
          )}
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
  }
);

FormInput.displayName = 'FormInput';
