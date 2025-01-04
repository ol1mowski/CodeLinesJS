import { Suspense } from "react";
import { AuthSection } from "../components/Auth/AuthSection.component";
import { LoadingScreen } from "../components/UI/LoadingScreen/LoadingScreen.component";

const Auth = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <AuthSection />
    </Suspense>
  );
};

export default Auth; 