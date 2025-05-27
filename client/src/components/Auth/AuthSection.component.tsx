import { type ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AuthLeftSection } from './components/AuthLeftSection/AuthLeftSection.component';
import { AuthFormSection } from './components/AuthFormSection/AuthFormSection.component';
import { Helmet } from 'react-helmet-async';
import { AuthErrorBoundary } from '../Common/ErrorBoundary';

type AuthSectionProps = {
  children?: ReactNode;
  title?: string;
  subtitle?: string;
};

export const AuthSection = ({ children, title, subtitle }: AuthSectionProps = {}) => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'login';

  const getPageTitle = () => {
    switch (mode) {
      case 'register':
        return 'Rejestracja | CodeLinesJS';
      case 'forgot':
        return 'Reset hasła | CodeLinesJS';
      default:
        return 'Logowanie | CodeLinesJS';
    }
  };

  const getPageDescription = () => {
    switch (mode) {
      case 'register':
        return 'Dołącz do platformy CodeLinesJS - rozpocznij swoją przygodę z programowaniem w JavaScript.';
      case 'forgot':
        return 'Zresetuj hasło do swojego konta CodeLinesJS i wróć do nauki programowania.';
      default:
        return 'Logowanie do platformy CodeLinesJS - dołącz do nas i rozwijaj swoje umiejętności w przyjaznym środowisku.';
    }
  };

  return (
    <main className="min-h-screen w-full flex">
      <Helmet>
        <title>{getPageTitle()}</title>
        <meta name="description" content={getPageDescription()} />
      </Helmet>
      
      <div className="hidden lg:flex w-1/2 bg-black items-center justify-center p-8">
        <AuthLeftSection />
      </div>
      <div className="w-full lg:w-1/2 bg-[#f7df1e] flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <AuthErrorBoundary>
          <AuthFormSection 
            children={children} 
            title={title} 
            subtitle={subtitle} 
            mode={mode}
          />
        </AuthErrorBoundary>
      </div>
    </main>
  );
};
