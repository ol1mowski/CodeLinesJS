import { motion } from "framer-motion";
import { FaDiscord, FaGithub, FaYoutube, FaBook, FaRocket, FaCode } from "react-icons/fa";

const links = {
  resources: [
    { label: "Dokumentacja", href: "#", icon: FaBook },
    { label: "Przykłady", href: "#", icon: FaCode },
    { label: "Roadmapa", href: "#", icon: FaRocket }
  ],
  social: [
    { label: "Discord", href: "#", icon: FaDiscord },
    { label: "GitHub", href: "#", icon: FaGithub },
    { label: "YouTube", href: "#", icon: FaYoutube }
  ]
};

export const FooterContent = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="lg:col-span-2"
    >
      <h3 className="text-xl font-bold text-[#f7df1e] mb-4">
        JavaScript Learning Platform
      </h3>
      <p className="text-gray-400 mb-6 leading-relaxed">
        Platforma do nauki JavaScript stworzona z myślą o społeczności programistów. 
        Dołącz do nas i rozwijaj swoje umiejętności w przyjaznym środowisku.
      </p>
      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 bg-[#f7df1e] text-black font-medium rounded-lg 
                     hover:bg-[#f7df1e]/90 transition-colors"
        >
          Rozpocznij Naukę
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 border border-[#f7df1e]/20 text-[#f7df1e] font-medium rounded-lg
                     hover:bg-[#f7df1e]/10 transition-colors"
        >
          Dołącz do Nas
        </motion.button>
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
    >
      <h4 className="text-lg font-bold text-[#f7df1e] mb-4">Zasoby</h4>
      <ul className="space-y-3">
        {links.resources.map((link) => (
          <motion.li key={link.label} whileHover={{ x: 5 }}>
            <a 
              href={link.href}
              className="flex items-center gap-3 text-gray-400 hover:text-[#f7df1e] transition-colors"
            >
              <link.icon className="w-5 h-5" />
              {link.label}
            </a>
          </motion.li>
        ))}
      </ul>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
    >
      <h4 className="text-lg font-bold text-[#f7df1e] mb-4">Social Media</h4>
      <ul className="space-y-3">
        {links.social.map((link) => (
          <motion.li key={link.label} whileHover={{ x: 5 }}>
            <a 
              href={link.href}
              className="flex items-center gap-3 text-gray-400 hover:text-[#f7df1e] transition-colors"
            >
              <link.icon className="w-5 h-5" />
              {link.label}
            </a>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  </div>
); 