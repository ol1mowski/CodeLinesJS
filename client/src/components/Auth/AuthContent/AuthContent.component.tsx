import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { AuthTabs } from './AuthTabs.component';
import { Link, useSearchParams } from 'react-router-dom';
import LoginForm from '../Forms/LoginForm/LoginForm.component';
import RegisterForm from '../Forms/RegisterForm/RegisterForm.component';
import ForgotPasswordForm from '../Forms/ForgotPasswordForm/ForgotPasswordForm.component';

type AuthMode = 'login' | 'register' | 'forgot';

type AuthContentProps = {
  mode?: string;
};

export const AuthContent = ({ mode: propMode }: AuthContentProps = {}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlMode = searchParams.get('mode') || 'login';
  const [authMode, setAuthMode] = useState<AuthMode>(
    (propMode || urlMode) as AuthMode
  );

  useEffect(() => {
    const currentMode = (propMode || urlMode) as AuthMode;
    setAuthMode(currentMode);
  }, [propMode, urlMode]);

  const handleTabChange = (mode: AuthMode) => {
    setAuthMode(mode);
    setSearchParams({ mode });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-sm sm:max-w-md bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-100"
      role="main"
      aria-label="Formularz autoryzacji"
    >
      <div className="flex flex-col justify-center items-center mb-6 sm:mb-8">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#f7df1e] rounded-lg flex items-center justify-center mb-3 sm:mb-4">
          <span className="text-black font-bold text-lg sm:text-xl">JS</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">CodeLinesJS</h2>
      </div>

      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-medium text-gray-900 mb-2">
          {authMode === 'login' && 'Zaloguj się'}
          {authMode === 'register' && 'Dołącz do nas'}
          {authMode === 'forgot' && 'Odzyskaj hasło'}
        </h1>
        <p className="text-xs sm:text-sm text-gray-600">
          {authMode === 'login' && 'Wprowadź swoje dane aby uzyskać dostęp do konta'}
          {authMode === 'register' && 'Rozpocznij swoją przygodę z programowaniem'}
          {authMode === 'forgot' && 'Wprowadź swój email aby zresetować hasło'}
        </p>
      </div>

      <AuthTabs activeTab={authMode} onTabChange={handleTabChange} />

      <AnimatePresence mode="wait">
        <motion.div
          key={authMode}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {authMode === 'login' && <LoginForm />}
          {authMode === 'register' && <RegisterForm />}
          {authMode === 'forgot' && <ForgotPasswordForm />}
        </motion.div>
      </AnimatePresence>

      <div className="mt-4 sm:mt-6 text-center text-xs text-gray-500">
        <p>
          Logując się, akceptujesz{' '}
          <Link to="/polityka-prywatnosci" className="text-[#f7df1e] hover:underline font-medium">
            Politykę Prywatności
          </Link>
          .
        </p>
      </div>
    </motion.div>
  );
};
