import { forwardRef } from 'react';
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';
import { FormInput } from '../FormInput/FormInput.component';
import { usePasswordVisibility } from '../../../Auth/hooks/usePasswordVisibility.hook';

type PasswordInputProps = {
  label: string;
  placeholder?: string;
  error?: string;
  showIcon?: boolean;
  styles?: 'default' | 'white';
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, placeholder = '••••••••', error, showIcon = true, styles = 'default', ...props }, ref) => {
    const { isVisible, toggleVisibility, inputType } = usePasswordVisibility();

    return (
      <FormInput
        ref={ref}
        type={inputType}
        label={label}
        placeholder={placeholder}
        error={error}
        styles={styles}
        icon={showIcon ? <FaLock /> : undefined}
        rightIcon={
          <button
            type="button"
            onClick={toggleVisibility}
            className="bg-white focus:outline-none text-gray-500 hover:text-gray-600 transition-colors"
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
