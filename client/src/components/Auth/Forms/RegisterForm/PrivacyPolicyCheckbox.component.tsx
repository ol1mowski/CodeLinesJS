import { memo } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { motion } from "framer-motion";

type PrivacyPolicyCheckboxProps = {
  register: UseFormRegisterReturn;
  error?: string;
};

export const PrivacyPolicyCheckbox = memo(({ register, error }: PrivacyPolicyCheckboxProps) => (
  <div className="space-y-1">
    <label className="flex items-start gap-2 cursor-pointer group">
      <input
        type="checkbox"
        className={`
          mt-1 w-4 h-4 rounded bg-dark text-js 
          transition-colors duration-200 ease-in-out
          ${error 
            ? 'border-red-500 focus:ring-red-500/20' 
            : 'border-js/20 focus:ring-js/20 hover:border-js/30'
          }
        `}
        {...register}
      />
      <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
        Akceptuję{" "}
        <a
          href="/privacy-policy"
          className="text-js hover:text-js/80 underline transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          politykę prywatności
        </a>
      </span>
    </label>
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
));

PrivacyPolicyCheckbox.displayName = "PrivacyPolicyCheckbox"; 