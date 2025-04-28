import { type ReactNode } from 'react';
import { AuthContent as AuthFormContent } from '../../AuthContent/AuthContent.component';

type AuthFormSectionProps = {
  children?: ReactNode;
  title?: string;
  subtitle?: string;
};

export const AuthFormSection = ({ children, title, subtitle }: AuthFormSectionProps) => (
  <div className="w-full md:w-2/5 flex justify-center md:justify-end relative mt-12 md:mt-0">
    <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#f7df1e]/10 rounded-full blur-3xl"></div>
    {children ? (
      <div className="w-full max-w-md bg-dark/30 backdrop-blur-xl rounded-2xl p-8 border border-js/20">
        <div className="flex flex-col justify-center items-center mb-8">
          <span className="block text-2xl bg-[#f7df1e] text-black px-2 py-1 rounded">CLJS</span>
          <h2 className="mt-2 text-xl font-bold text-js">CodeLinesJS</h2>
        </div>

        {title && <h1 className="text-3xl font-bold text-center text-js mb-4">{title}</h1>}

        {subtitle && <p className="text-center text-gray-400 mb-8">{subtitle}</p>}

        {children}
      </div>
    ) : (
      <AuthFormContent />
    )}
  </div>
);
