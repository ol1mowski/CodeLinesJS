import { memo, useState } from "react";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import { CreateGroupForm } from "./CreateGroupForm.component";

export const CreateGroupButton = memo(() => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsFormOpen(true)}
        className="w-full sm:w-auto px-6 py-3 bg-js text-dark font-medium rounded-lg 
                 hover:bg-js/90 transition-colors flex items-center justify-center gap-2 
                 whitespace-nowrap"
      >
        <FaPlus className="text-sm" />
        Utwórz grupę
      </motion.button>

      <CreateGroupForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
      />
    </>
  );
});

CreateGroupButton.displayName = "CreateGroupButton"; 