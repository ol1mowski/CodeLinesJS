import { memo } from "react";
import { motion } from "framer-motion";

type ContactSectionProps = {
  email?: string;
  discordLink?: string;
};

export const ContactSection = memo(({
  email = "kontakt@codelinesjs.pl",
  discordLink = "#"
}: ContactSectionProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center max-w-2xl mx-auto"
  >
    <h3 className="text-xl font-bold text-js mb-3">Inne sposoby kontaktu</h3>
    <p className="text-gray-400">
      Możesz również skontaktować się z nami bezpośrednio przez email:{" "}
      <a href={`mailto:${email}`} className="text-js hover:underline">
        {email}
      </a>{" "}
      lub dołączyć do naszej społeczności na{" "}
      <a href={discordLink} className="text-js hover:underline">
        Discord
      </a>.
    </p>
  </motion.div>
));

ContactSection.displayName = "ContactSection"; 