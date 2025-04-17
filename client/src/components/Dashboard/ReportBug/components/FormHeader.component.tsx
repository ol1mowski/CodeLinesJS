import { memo } from 'react';
import { FaBug } from 'react-icons/fa';

type FormHeaderProps = {
  title?: string;
};

export const FormHeader = memo(({ title = 'Zgłoś błąd' }: FormHeaderProps) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="p-3 rounded-lg bg-js/10">
      <FaBug className="w-6 h-6 text-js" />
    </div>
    <h2 className="text-2xl font-bold text-js">{title}</h2>
  </div>
));

FormHeader.displayName = 'FormHeader';
