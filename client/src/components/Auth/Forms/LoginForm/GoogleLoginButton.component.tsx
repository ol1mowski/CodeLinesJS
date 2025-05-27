import { memo, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../../../hooks/useAuth';

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
    setErrorMessage('Logowanie przez Google nie powiodło się. Spróbuj ponownie później.');
  };

  return (
    <>
      {errorMessage && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
          {errorMessage}
        </div>
      )}

      <div className="w-full">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          theme="outline"
          shape="rectangular"
          text="continue_with"
          locale="pl"
          useOneTap={false}
          context="signin"
          type="standard"
          size="large"
          width="100%"
        />
      </div>
    </>
  );
});

GoogleLoginButton.displayName = 'GoogleLoginButton';
