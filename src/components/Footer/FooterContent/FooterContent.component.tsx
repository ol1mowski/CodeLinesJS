import { motion } from "framer-motion";
import { footerLinks, socialLinks } from "../../../data/footer.data";


export const FooterContent = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="col-span-1 md:col-span-2 lg:col-span-1"
    >
      <h2 className="text-2xl font-bold font-space text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-4">
        Code Lines JS
      </h2>
      <p className="text-gray-400 font-inter mb-6">
        Odkryj świat JavaScript poprzez wciągającą grę. Rozwijaj swoje umiejętności programowania w interaktywny sposób.
      </p>
      <div className="flex gap-4">
        {socialLinks.map((link) => (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-indigo-600 transition-colors flex items-center justify-center text-gray-400 hover:text-white"
          >
            <link.Icon className="w-5 h-5" />
          </motion.a>
        ))}
      </div>
    </motion.div>

    {footerLinks.map((section, index) => (
      <motion.div
        key={section.title}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <h3 className="text-lg font-bold font-space text-gray-200 mb-4">
          {section.title}
        </h3>
        <ul className="space-y-3">
          {section.links.map((link) => (
            <li key={link.text}>
              <a
                href={link.url}
                className="text-gray-400 hover:text-indigo-400 transition-colors font-inter"
              >
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    ))}
  </div>
); 