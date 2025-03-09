import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface CallToActionProps {
  /** Tekst przycisku */
  text: string;
  /** Opis pod przyciskiem */
  description?: string;
  /** Link do przekierowania (może być URL lub ID sekcji) */
  href: string;
  /** Czy link jest zewnętrzny */
  isExternal?: boolean;
  /** Dodatkowe klasy CSS */
  className?: string;
  /** Ikona (domyślnie strzałka) */
  icon?: React.ReactNode;
}

/**
 * Komponent przycisku Call-to-Action z animacją
 */
export const CallToAction: React.FC<CallToActionProps> = ({
  text,
  description,
  href,
  isExternal = false,
  className = '',
  icon = <FaArrowRight />
}) => {
  const isAnchor = href.startsWith('#');
  
  const ButtonContent = () => (
    <>
      <span>{text}</span>
      <span className="ml-2">{icon}</span>
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      viewport={{ once: true }}
      className={`pt-2 ${className}`}
    >
      {isExternal ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#f7df1e] text-black font-bold rounded-lg hover:bg-[#f7df1e]/90 transition-all shadow-lg shadow-[#f7df1e]/25"
        >
          <ButtonContent />
        </a>
      ) : isAnchor ? (
        <a
          href={href}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#f7df1e] text-black font-bold rounded-lg hover:bg-[#f7df1e]/90 transition-all shadow-lg shadow-[#f7df1e]/25"
        >
          <ButtonContent />
        </a>
      ) : (
        <Link
          to={href}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#f7df1e] text-black font-bold rounded-lg hover:bg-[#f7df1e]/90 transition-all shadow-lg shadow-[#f7df1e]/25"
        >
          <ButtonContent />
        </Link>
      )}
      
      {description && (
        <p className="mt-3 text-gray-400 text-sm">
          {description}
        </p>
      )}
    </motion.div>
  );
}; 