import { FaEnvelope, FaUser } from "react-icons/fa";
import { FormInput } from "../../../UI/Form/FormInput/FormInput.component";
import { Button } from "../../../UI/Button/Button.component";
import { FormWrapper } from "../../../UI/Form/FormWrapper/FormWrapper.component";
import { ErrorAlert } from "../../../UI/Alerts/ErrorAlert.component";
import { PasswordInput } from "../../../UI/Form/PasswordInput/PasswordInput.component";
import { PrivacyPolicyCheckbox } from "./PrivacyPolicyCheckbox.component";
import { useRegisterForm } from "./useRegisterForm";

const RegisterForm = () => {
  const { 
    register, 
    errors, 
    loading, 
    handleSubmit, 
    errorMessage 
  } = useRegisterForm();

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <ErrorAlert message={errorMessage || ""} />

      <FormInput
        type="text"
        label="Nazwa użytkownika"
        placeholder="jankowalski"
        icon={<FaUser />}
        error={errors.username?.message}
        {...register("username")}
      />

      <FormInput
        type="email"
        label="Email"
        placeholder="twoj@email.com"
        icon={<FaEnvelope />}
        error={errors.email?.message}
        {...register("email")}
      />
      
      <PasswordInput
        label="Hasło"
        error={errors.password?.message}
        {...register("password")}
      />

      <PasswordInput
        label="Potwierdź hasło"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <PrivacyPolicyCheckbox 
        register={register("acceptPrivacy")} 
        error={errors.acceptPrivacy?.message}
      />

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Rejestracja..." : "Zarejestruj się"}
      </Button>
    </FormWrapper>
  );
};

export default RegisterForm;