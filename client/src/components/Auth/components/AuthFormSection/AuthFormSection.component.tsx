import { type ReactNode } from 'react';
import { AuthContent as AuthFormContent } from '../../AuthContent/AuthContent.component';

type AuthFormSectionProps = {
  children?: ReactNode;
  title?: string;
  subtitle?: string;
  mode?: string;
};

export const AuthFormSection = ({ children, title, subtitle, mode }: AuthFormSectionProps) => (
  <div className="w-full max-w-sm sm:max-w-md">
    {children ? (
      <div className="w-full bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-100">
        <div className="flex flex-col justify-center items-center mb-6 sm:mb-8">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#f7df1e] rounded-lg flex items-center justify-center mb-3 sm:mb-4">
            <span className="text-black font-bold text-lg sm:text-xl">JS</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">CodeLinesJS</h2>
        </div>

        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-medium text-gray-900 mb-2">
            {title || 'Zaloguj się'}
          </h1>
          {subtitle && (
            <p className="text-xs sm:text-sm text-gray-600">{subtitle}</p>
          )}
        </div>

        {children}
      </div>
    ) : (
      <AuthFormContent mode={mode} />
    )}
  </div>
);
