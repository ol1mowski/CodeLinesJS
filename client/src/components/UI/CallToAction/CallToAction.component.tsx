import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useMobileDetect } from '../hooks/useMobileDetect.hook';

type CallToActionProps = {
  text: string;
  description?: string;
  href: string;
  isExternal?: boolean;
  className?: string;
  icon?: React.ReactNode;
};

export const CallToAction = ({
  text,
  description,
  href,
  isExternal = false,
  className = '',
  icon = <FaArrowRight />,
}: CallToActionProps) => {
  const isAnchor = href.startsWith('#');
  const isMobile = useMobileDetect();

  const ButtonContent = () => (
    <>
      <span>{text}</span>
      <span className="ml-2">{icon}</span>
    </>
  );

  const renderButton = () => {
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#f7df1e] text-black font-bold rounded-lg hover:bg-[#f7df1e]/90 transition-all shadow-lg shadow-[#f7df1e]/25"
        >
          <ButtonContent />
        </a>
      );
    } else if (isAnchor) {
      return (
        <a
          href={href}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#f7df1e] text-black font-bold rounded-lg hover:bg-[#f7df1e]/90 transition-all shadow-lg shadow-[#f7df1e]/25"
        >
          <ButtonContent />
        </a>
      );
    } else {
      return (
        <Link
          to={href}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#f7df1e] text-black font-bold rounded-lg hover:bg-[#f7df1e]/90 transition-all shadow-lg shadow-[#f7df1e]/25"
        >
          <ButtonContent />
        </Link>
      );
    }
  };

  if (isMobile) {
    return (
      <div className={`pt-2 ${className}`}>
        {renderButton()}

        {description && <p className="mt-3 text-gray-400 text-sm">{description}</p>}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      viewport={{ once: true }}
      className={`pt-2 ${className}`}
    >
      {renderButton()}

      {description && <p className="mt-3 text-gray-400 text-sm">{description}</p>}
    </motion.div>
  );
};
