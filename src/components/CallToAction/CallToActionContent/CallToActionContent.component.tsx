import { motion } from "framer-motion";
import { FaRocket, FaCode } from "react-icons/fa";

export const CallToActionContent = () => (
  <div className="w-screen xl:w-1/2 px-4 md:px-0">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center xl:text-left"
    >
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-space text-[#f7df1e] mb-6">
        Wejdź do Świata JavaScript
      </h2>
      <p className="text-lg md:text-xl text-gray-300 font-inter mb-8 max-w-2xl">
        Podejmij wyzwanie i zostań mistrzem JavaScript poprzez wciągającą grę.
        Rozwiązuj zagadki, zdobywaj osiągnięcia i rywalizuj z innymi graczami.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center xl:justify-start mb-12">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 sm:px-8 py-3 sm:py-4 rounded-xl bg-[#f7df1e] text-black font-bold font-space flex items-center justify-center gap-2 hover:bg-[#f7df1e]/90 transition-all shadow-lg shadow-[#f7df1e]/25 text-sm sm:text-base"
        >
          <FaRocket className="text-lg sm:text-xl" />
          Zacznij Grę
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 sm:px-8 py-3 sm:py-4 rounded-xl border-2 border-[#f7df1e]/50 text-[#f7df1e] font-bold font-space flex items-center justify-center gap-2 hover:bg-[#f7df1e]/10 transition-all text-sm sm:text-base"
        >
          <FaCode className="text-lg sm:text-xl" />
          Wypróbuj Demo
        </motion.button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-center p-4 rounded-lg bg-black/20 border border-[#f7df1e]/10"
          >
            <p className="text-3xl md:text-4xl font-bold font-space text-[#f7df1e]">
              {stat.value}
            </p>
            <p className="text-sm md:text-base text-gray-400 font-inter">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </div>
);

const stats = [
  { value: "10K+", label: "Aktywnych Graczy" },
  { value: "50K+", label: "Ukończonych Poziomów" },
  { value: "95%", label: "Pozytywnych Opinii" },
];
