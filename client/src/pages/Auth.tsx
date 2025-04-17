import { Suspense } from 'react';
import { LoadingScreen } from '../components/UI/LoadingScreen/LoadingScreen.component';
import { AuthSection } from '../components/Auth/AuthSection.component';

const Auth = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <AuthSection />
    </Suspense>
  );
};

export default Auth;
