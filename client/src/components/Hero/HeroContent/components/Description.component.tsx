import { motion } from "framer-motion";

export const Description = () => (
  <motion.p 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.1 }}
    className="w-full m-auto text-lg text-center md:text-xl xl:ml-0 lg:text-left text-gray-300 font-inter mb-8 max-w-2xl"
  >
    Podejmij wyzwanie i zostań mistrzem JavaScript poprzez wciągającą grę.
    Rozwiązuj zagadki, zdobywaj osiągnięcia i rywalizuj z innymi graczami.
  </motion.p>
); 