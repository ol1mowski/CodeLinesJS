import { motion } from "framer-motion";
import { FaBook, FaCode, FaLaptopCode, FaArrowRight } from "react-icons/fa";

type FeatureItemProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
};

const FeatureItem = ({ icon, title, description, delay }: FeatureItemProps) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true }}
    className="flex items-start gap-4"
  >
    <div className="w-12 h-12 flex items-center justify-center text-xl bg-[#f7df1e]/10 text-[#f7df1e] rounded-lg shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  </motion.div>
);

export const LearningPathContent = () => {
  const features = [
    {
      icon: <FaBook />,
      title: "Interaktywne Lekcje",
      description: "Ucz się w swoim tempie dzięki przystępnie napisanym lekcjom z przykładami kodu.",
      delay: 0.2,
    },
    {
      icon: <FaCode />,
      title: "Praktyczne Przykłady",
      description: "Każda koncepcja jest zilustrowana praktycznymi przykładami, które możesz uruchomić i zmodyfikować.",
      delay: 0.3,
    },
    {
      icon: <FaLaptopCode />,
      title: "Śledzenie Postępów",
      description: "Monitoruj swoje postępy i wracaj do lekcji, które wymagają powtórzenia.",
      delay: 0.4,
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Lewa kolumna - Opis funkcji */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        <div className="space-y-6">
          {features.map((feature, index) => (
            <FeatureItem key={index} {...feature} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
          className="pt-4"
        >
          <a
            href="#collaborate"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#f7df1e] text-black font-bold rounded-lg hover:bg-[#f7df1e]/90 transition-all shadow-lg shadow-[#f7df1e]/25"
          >
            <span>Przejdź do Praktyki</span>
            <FaArrowRight />
          </a>
          <p className="mt-3 text-gray-400 text-sm">
            Gotowy na wyzwania? Sprawdź swoje umiejętności w praktyce!
          </p>
        </motion.div>
      </motion.div>

      {/* Prawa kolumna - Mockup smartfona */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex justify-center lg:justify-end"
      >
        <div className="relative w-full max-w-[300px]">
          {/* Smartphone frame */}
          <div className="relative z-10 w-full aspect-[9/19] bg-black rounded-[40px] border-[8px] border-gray-800 shadow-2xl overflow-hidden">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-7 bg-black rounded-b-xl z-20"></div>
            
            {/* Screen content - placeholder for actual screenshot */}
            <div className="w-full h-full bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] flex items-center justify-center">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-[#f7df1e] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-black text-2xl font-bold">JS</span>
                </div>
                <h4 className="text-white font-bold mb-2">Teoria JavaScript</h4>
                <p className="text-gray-400 text-xs">
                  Tutaj pojawi się zrzut ekranu z aplikacji
                </p>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-1/4 -right-10 w-20 h-20 bg-[#f7df1e]/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-1/4 -left-10 w-20 h-20 bg-[#f7df1e]/20 rounded-full blur-xl"></div>
          
          {/* Reflection */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent opacity-30 rounded-[40px] z-20 pointer-events-none"></div>
        </div>
      </motion.div>
    </div>
  );
}; 