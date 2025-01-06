import { memo } from "react";
import { UseFormRegister } from "react-hook-form";
import { LoginFormData } from "../../../../schemas/auth.schema";

type RememberMeCheckboxProps = {
  register: UseFormRegister<LoginFormData>;
};

export const RememberMeCheckbox = memo(({ register }: RememberMeCheckboxProps) => (
  <div className="flex items-center justify-between">
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-indigo-500 focus:ring-indigo-500"
        {...register("rememberMe")}
      />
      <span className="text-sm text-gray-400">Zapamiętaj mnie</span>
    </label>
  </div>
));

RememberMeCheckbox.displayName = "RememberMeCheckbox"; 