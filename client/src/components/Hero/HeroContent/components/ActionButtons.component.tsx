import { FaRocket, FaCode } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MobileWrapper } from '../../../UI/MobileWrapper/MobileWrapper.component';
import { useMobileDetect } from '../../../UI/hooks/useMobileDetect.hook';
import { motion } from 'framer-motion';

export const ActionButtons = () => {
  const isMobile = useMobileDetect();

  return (
    <MobileWrapper
      className="flex gap-4 flex-wrap justify-center xl:justify-start mb-12"
      motionProps={{
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: 0.2 },
      }}
    >
      <StartGameButton isMobile={isMobile} />
      <TryDemoButton isMobile={isMobile} />
    </MobileWrapper>
  );
};

const StartGameButton = ({ isMobile }: { isMobile: boolean }) => {
  const ButtonContent = () => (
    <>
      <FaRocket className="text-lg sm:text-xl" />
      Zacznij Grę
    </>
  );

  return (
    <Link to="/dashboard">
      {isMobile ? (
        <button className="px-4 sm:px-8 py-3 sm:py-4 rounded-xl bg-[#f7df1e] text-black font-bold font-space flex items-center justify-center gap-2 hover:bg-[#f7df1e]/90 transition-all shadow-lg shadow-[#f7df1e]/25 text-sm sm:text-base">
          <ButtonContent />
        </button>
      ) : (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 sm:px-8 py-3 sm:py-4 rounded-xl bg-[#f7df1e] text-black font-bold font-space flex items-center justify-center gap-2 hover:bg-[#f7df1e]/90 transition-all shadow-lg shadow-[#f7df1e]/25 text-sm sm:text-base"
        >
          <ButtonContent />
        </motion.button>
      )}
    </Link>
  );
};

const TryDemoButton = ({ isMobile }: { isMobile: boolean }) => {
  const ButtonContent = () => (
    <>
      <FaCode className="text-lg sm:text-xl" />
      Dowiedz się więcej
    </>
  );

  return (
    <a href="#gra">
      {isMobile ? (
        <button className="px-4 sm:px-8 py-3 sm:py-4 rounded-xl border-2 border-[#f7df1e]/50 text-[#f7df1e] font-bold font-space flex items-center justify-center gap-2 hover:bg-[#f7df1e]/10 transition-all text-sm sm:text-base">
          <ButtonContent />
        </button>
      ) : (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 sm:px-8 py-3 sm:py-4 rounded-xl border-2 border-[#f7df1e]/50 text-[#f7df1e] font-bold font-space flex items-center justify-center gap-2 hover:bg-[#f7df1e]/10 transition-all text-sm sm:text-base"
        >
          <ButtonContent />
        </motion.button>
      )}
    </a>
  );
};
