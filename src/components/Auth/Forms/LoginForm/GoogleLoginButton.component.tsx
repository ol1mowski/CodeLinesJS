import { memo } from "react";
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from "../../../../hooks/useAuth";

export const GoogleLoginButton = memo(() => {
  const { loginWithGoogle } = useAuth();

  return (
    <>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gray-800/50 text-gray-400">
            Lub kontynuuj przez
          </span>
        </div>
      </div>

      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={loginWithGoogle}
          onError={() => {
            console.error('Login Failed');
          }}
          theme="filled_black"
          shape="pill"
          text="continue_with"
          locale="pl"
        />
      </div>
    </>
  );
});

GoogleLoginButton.displayName = "GoogleLoginButton"; 