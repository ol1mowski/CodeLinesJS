import { motion } from "framer-motion";
import { FooterHeader } from './components/FooterHeader.component';
import { FooterDescription } from './components/FooterDescription.component';
import { FooterLinks } from './components/FooterLinks.component';
import { footerSections } from './constants/footerSections.data';

export const FooterContent = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="container mx-auto px-4"
  >
    <div className="flex flex-col gap-12">
      <div className="space-y-4">
        <FooterHeader />
        <FooterDescription />
      </div>
      <FooterLinks sections={footerSections} />
    </div>
  </motion.div>
); 