import { motion } from "framer-motion";
import { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaExclamationTriangle, FaLock } from "react-icons/fa";
import { FormInput } from "../../../../UI/Form/FormInput/FormInput.component";
import { Button } from "../../../../UI/Button/Button.component";

type DeleteAccountFormData = {
  password: string;
  confirmation: string;
};

const deleteAccountSchema = z.object({
  password: z.string().min(1, "Hasło jest wymagane"),
  confirmation: z.string().min(1, "Potwierdzenie jest wymagane")
}).refine(data => data.confirmation === "USUŃ KONTO", {
  message: "Wpisz USUŃ KONTO aby potwierdzić",
  path: ["confirmation"]
});

export const DeleteAccountForm = memo(() => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<DeleteAccountFormData>({
    resolver: zodResolver(deleteAccountSchema)
  });

  const onSubmit = async (data: DeleteAccountFormData) => {
    console.log(data);
  };

  if (!showConfirmation) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-md"
      >
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 mb-6">
          <div className="flex items-start gap-4">
            <FaExclamationTriangle className="text-red-500 text-xl mt-1" />
            <div>
              <h3 className="text-red-400 font-medium mb-2">
                Usuwanie konta jest nieodwracalne
              </h3>
              <ul className="text-gray-400 space-y-2 list-disc list-inside">
                <li>Wszystkie twoje dane zostaną usunięte</li>
                <li>Stracisz dostęp do wszystkich kursów</li>
                <li>Twoje postępy w nauce zostaną utracone</li>
                <li>Nie będzie możliwości przywrócenia konta</li>
              </ul>
            </div>
          </div>
        </div>

        <Button
          type="button"
          onClick={() => setShowConfirmation(true)}
          className="bg-red-500 hover:bg-red-600 w-full"
        >
          Chcę usunąć konto
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 max-w-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormInput
        type="password"
        label="Hasło"
        placeholder="Wprowadź hasło aby potwierdzić"
        icon={<FaLock />}
        error={errors.password?.message}
        {...register("password")}
      />

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Potwierdzenie
        </label>
        <p className="text-sm text-gray-400 mb-2">
          Wpisz "USUŃ KONTO" aby potwierdzić
        </p>
        <input
          type="text"
          {...register("confirmation")}
          className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
        />
        {errors.confirmation && (
          <p className="mt-1 text-sm text-red-400">
            {errors.confirmation.message}
          </p>
        )}
      </div>

      <div className="pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-red-500 hover:bg-red-600 w-full"
        >
          {isSubmitting ? "Usuwanie..." : "Usuń konto permanentnie"}
        </Button>
        <button
          type="button"
          onClick={() => setShowConfirmation(false)}
          className="w-full mt-4 text-gray-400 hover:text-gray-300 transition-colors"
        >
          Anuluj
        </button>
      </div>
    </motion.form>
  );
});

DeleteAccountForm.displayName = "DeleteAccountForm"; 