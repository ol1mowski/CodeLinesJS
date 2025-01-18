import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "../utils/validationSchemas";
import type { UserProfile } from "../types/settings";

export const useProfileForm = (defaultValues: UserProfile) => {
  const form = useForm<UserProfile>({
    resolver: zodResolver(profileSchema),
    defaultValues
  });

  const onSubmit = async (data: UserProfile) => {
    try {
      // TODO: Implement API call
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit)
  };
}; 