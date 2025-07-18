import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

import { FormInput } from '../../../UI/Form/FormInput/FormInput.component';
import { LoginFormData, loginSchema } from '../../../../schemas/auth.schema';
import { useAuth } from '../../hooks/useAuth.hook';
import { GoogleLoginButton } from './GoogleLoginButton.component';
import { RememberMeCheckbox } from './RememberMeCheckbox.component';
import { FormError } from '../../../UI/FormError/FormError.component';
import { FormLoadingButton } from '../../../UI/Loading/FormLoadingButton.component';

const LoginForm = () => {
  const { login, loading, error } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
  });

  const rememberMe: boolean = watch('rememberMe', false) || false;
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    await login(data.email, data.password, data.rememberMe);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {error && <FormError message={error} withIcon variant="standard" />}

      <GoogleLoginButton rememberMe={rememberMe} />

      <div className="relative flex items-center justify-center my-6">
        <div className="border-t border-gray-200 w-full"></div>
        <span className="bg-white px-4 text-sm text-gray-500 absolute">LUB</span>
      </div>

      <FormInput
        type="email"
        label="Email"
        placeholder="twoj@email.com"
        icon={<FaEnvelope />}
        error={errors.email?.message}
        styles="white"
        {...register('email')}
      />

      <FormInput
        type={showPassword ? 'text' : 'password'}
        label="Hasło"
        placeholder="Wprowadź hasło"
        icon={<FaLock />}
        error={errors.password?.message}
        styles="white"
        {...register('password')}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="bg-white focus:outline-none hover:text-gray-600 transition-colors"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        }
      />

      <div className="flex items-center justify-between">
        <RememberMeCheckbox register={register} />
      </div>

      <div className="pt-2">
        <FormLoadingButton isLoading={loading} loadingText="Logowanie...">
          Zaloguj się
        </FormLoadingButton>
      </div>
    </form>
  );
};

export default LoginForm;
