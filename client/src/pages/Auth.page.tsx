import { Suspense } from 'react';
import { LoadingSpinner } from '../components/UI/LoadingSpinner/LoadingSpinner.component';
import { AuthSection } from '../components/Auth/AuthSection.component';

const Auth = () => {
  return (
    <Suspense fallback={<LoadingSpinner fullScreen text="Ładowanie..." />}>
      <AuthSection />
    </Suspense>
  );
};

export default Auth;
