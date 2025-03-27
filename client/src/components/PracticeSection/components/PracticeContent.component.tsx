import { motion } from "framer-motion";
import { FaGamepad, FaTrophy, FaUsers, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

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
    className="flex items-start gap-3"
  >
    <div className="w-10 h-10 flex items-center justify-center text-lg bg-[#f7df1e]/10 text-[#f7df1e] rounded-lg shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  </motion.div>
);

export const PracticeContent = () => {
  const features = [
    {
      icon: <FaGamepad />,
      title: "Interaktywne Gry",
      description: "Ucz się JavaScript poprzez wciągające gry, które sprawdzą Twoją wiedzę w praktyce.",
      delay: 0.2,
    },
    {
      icon: <FaTrophy />,
      title: "Wyzwania Kodowania",
      description: "Rozwiązuj praktyczne problemy programistyczne o różnym poziomie trudności.",
      delay: 0.3,
    },
    {
      icon: <FaUsers />,
      title: "Rywalizacja z Innymi",
      description: "Porównuj swoje wyniki z innymi uczestnikami i wspólnie się rozwijajcie.",
      delay: 0.4,
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <div className="relative pt-16 md:pt-24 lg:pt-20">
        <motion.div
          initial={{ opacity: 0, x: -50, rotate: 0 }}
          whileInView={{ opacity: 1, x: 0, rotate: -12 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="absolute -left-4 top-0 md:top-[-40px] lg:top-[60px] md:left-0 lg:left-10 xl:left-20 z-10 hidden md:block"
          style={{ perspective: "1000px" }}
        >
          <div className="relative w-[220px] md:w-[240px] lg:w-[260px]">
            <div 
              className="relative z-10 w-full aspect-[9/19] bg-black rounded-[30px] border-[6px] border-gray-800 shadow-2xl overflow-hidden"
              style={{ 
                transform: "rotateX(5deg) rotateY(10deg)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 20px rgba(247, 223, 30, 0.2)"
              }}
            >
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-black rounded-b-xl z-20"></div>
              
              <div className="w-full h-full bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] flex items-center justify-center">
                <div className="text-center p-4">
                  <div className="w-14 h-14 bg-[#f7df1e] rounded-xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-black text-xl font-bold">JS</span>
                  </div>
                  <h4 className="text-white font-bold mb-1 text-sm">Praktyka JavaScript</h4>
                  <p className="text-gray-400 text-xs">
                    Tutaj pojawi się zrzut ekranu z aplikacji
                  </p>
                </div>
              </div>
              
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent opacity-30 rounded-[30px] z-20 pointer-events-none"></div>
            </div>
            
            <div className="absolute top-1/3 -left-5 w-16 h-16 bg-[#f7df1e]/20 rounded-full blur-xl"></div>
            <div className="absolute bottom-1/3 -right-5 w-16 h-16 bg-[#f7df1e]/20 rounded-full blur-xl"></div>
          </div>
        </motion.div>

        <div className="md:ml-auto md:max-w-[60%] lg:max-w-[55%] space-y-6 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center mb-8 md:hidden"
          >
            <div className="relative w-[200px]">
              <div className="relative z-10 w-full aspect-[9/19] bg-black rounded-[30px] border-[6px] border-gray-800 shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-black rounded-b-xl z-20"></div>
                <div className="w-full h-full bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] flex items-center justify-center">
                  <div className="text-center p-4">
                    <div className="w-14 h-14 bg-[#f7df1e] rounded-xl flex items-center justify-center mx-auto mb-3">
                      <span className="text-black text-xl font-bold">JS</span>
                    </div>
                    <h4 className="text-white font-bold mb-1 text-sm">Praktyka JavaScript</h4>
                    <p className="text-gray-400 text-xs">
                      Tutaj pojawi się zrzut ekranu z aplikacji
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            <div className="space-y-4">
              {features.map((feature, index) => (
                <FeatureItem key={index} {...feature} />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            viewport={{ once: true }}
            className="pt-2"
          >
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#f7df1e] text-black font-bold rounded-lg hover:bg-[#f7df1e]/90 transition-all shadow-lg shadow-[#f7df1e]/25"
            >
              <span>Rozpocznij Wyzwania</span>
              <FaArrowRight />
            </Link>
            <p className="mt-3 text-gray-400 text-sm">
              Gotowy do działania? Sprawdź swoje umiejętności w praktycznych wyzwaniach!
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}; 