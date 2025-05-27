import { ReactNode } from 'react';

type FormWrapperProps = {
  children: ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  className?: string;
};

export const FormWrapper = ({ children, onSubmit, className = '' }: FormWrapperProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className={`space-y-6 ${className}`}
    >
      {children}
    </form>
  );
};
