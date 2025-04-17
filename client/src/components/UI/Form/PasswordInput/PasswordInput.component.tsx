import { forwardRef } from 'react';
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';
import { FormInput } from '../FormInput/FormInput.component';
import { usePasswordVisibility } from '../../../Auth/hooks/usePasswordVisibility.hook';

type PasswordInputProps = {
  label: string;
  placeholder?: string;
  error?: string;
  showIcon?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, placeholder = '••••••••', error, showIcon = true, ...props }, ref) => {
    const { isVisible, toggleVisibility, inputType } = usePasswordVisibility();

    return (
      <FormInput
        ref={ref}
        type={inputType}
        label={label}
        placeholder={placeholder}
        error={error}
        icon={showIcon ? <FaLock /> : undefined}
        rightIcon={
          <button
            type="button"
            onClick={toggleVisibility}
            className="focus:outline-none text-gray-400 hover:text-gray-500 transition-colors"
            aria-label={isVisible ? 'Ukryj hasło' : 'Pokaż hasło'}
          >
            {isVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        }
        {...props}
      />
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
