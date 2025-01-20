import { memo } from "react";
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from "../../../../hooks/useAuth";

type GoogleLoginButtonProps = {
  rememberMe: boolean;
};

export const GoogleLoginButton = memo(({ rememberMe }: GoogleLoginButtonProps) => {
  const { loginWithGoogle } = useAuth();

  const handleSuccess = (credentialResponse: any) => {
    loginWithGoogle(credentialResponse, rememberMe);
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

      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => {
            console.error('Login Failed');
          }}
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