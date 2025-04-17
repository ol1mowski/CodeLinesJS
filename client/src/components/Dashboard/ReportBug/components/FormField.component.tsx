import { memo } from 'react';

type FormFieldProps = {
  id: string;
  name: string;
  label: string;
  type?: 'text' | 'email' | 'textarea' | 'select';
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  error?: string;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  rows?: number;
};

export const FormField = memo(
  ({
    id,
    name,
    label,
    type = 'text',
    value,
    onChange,
    error,
    placeholder,
    options,
    rows = 5,
  }: FormFieldProps) => {
    const baseInputClasses = `w-full bg-dark/50 border ${error ? 'border-red-500' : 'border-js/20'} rounded-lg p-3 text-white focus:border-js focus:outline-none`;

    return (
      <div className="mb-4">
        <label htmlFor={id} className="block text-gray-300 mb-1">
          {label}
        </label>

        {type === 'textarea' ? (
          <textarea
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            rows={rows}
            className={baseInputClasses}
            placeholder={placeholder}
          />
        ) : type === 'select' ? (
          <select
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            className={baseInputClasses}
          >
            {options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            className={baseInputClasses}
            placeholder={placeholder}
          />
        )}

        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

FormField.displayName = 'FormField';
