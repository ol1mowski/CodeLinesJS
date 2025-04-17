import { memo } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { LoginFormData } from '../../../../schemas/auth.schema';

type RememberMeCheckboxProps = {
  register: UseFormRegister<LoginFormData>;
};

export const RememberMeCheckbox = memo(({ register }: RememberMeCheckboxProps) => (
  <div className="flex items-center">
    <label className="flex items-center gap-2 cursor-pointer group">
      <div className="relative">
        <input type="checkbox" className="peer sr-only" {...register('rememberMe')} />
        <div className="w-4 h-4 border border-js/30 rounded bg-dark/70 peer-checked:bg-js peer-checked:border-js transition-colors"></div>
        <div className="absolute inset-0 flex items-center justify-center text-black scale-0 peer-checked:scale-100 transition-transform">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
        Zapamiętaj mnie
      </span>
    </label>
  </div>
));

RememberMeCheckbox.displayName = 'RememberMeCheckbox';
