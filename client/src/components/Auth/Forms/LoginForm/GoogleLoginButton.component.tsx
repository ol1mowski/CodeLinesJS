import { memo, useState } from "react";
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from "../../../../Hooks/useAuth";

type GoogleLoginButtonProps = {
  rememberMe: boolean;
};

export const GoogleLoginButton = memo(({ rememberMe }: GoogleLoginButtonProps) => {
  const { loginWithGoogle } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSuccess = (credentialResponse: any) => {
    loginWithGoogle(credentialResponse, rememberMe);
  };

  const handleError = () => {
    setErrorMessage("Logowanie przez Google nie powiodło się. Spróbuj ponownie później.");
  };

  return (
    <>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-js/20"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-dark/50 text-gray-400">
            Lub kontynuuj przez
          </span>
        </div>
      </div>

      {errorMessage && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {errorMessage}
        </div>
      )}

      <div className="flex flex-col items-center">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          theme="filled_black"
          shape="pill"
          text="continue_with"
          locale="pl"
          useOneTap={false}
          context="signin"
          type="standard"
          size="large"
          width="300"
        />
      </div>
    </>
  );
});

GoogleLoginButton.displayName = "GoogleLoginButton"; 