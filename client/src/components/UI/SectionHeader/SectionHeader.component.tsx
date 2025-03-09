import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  /** Tekst odznaki (np. "Krok 1: Teoria") */
  badge?: string;
  /** Główny tytuł sekcji */
  title: string;
  /** Podtytuł sekcji */
  subtitle: string;
  /** ID dla dostępności */
  id?: string;
  /** Dodatkowe klasy CSS */
  className?: string;
  /** Klasy CSS dla tytułu */
  titleClassName?: string;
  /** Klasy CSS dla podtytułu */
  subtitleClassName?: string;
}

/**
 * Komponent nagłówka sekcji z animacjami
 * Zawiera odznakę, tytuł i podtytuł
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  subtitle,
  id,
  className = '',
  titleClassName = '',
  subtitleClassName = ''
}) => {
  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-2"
        >
          <div className="px-4 py-1.5 bg-[#f7df1e]/10 border border-[#f7df1e]/20 rounded-full text-[#f7df1e] font-semibold text-sm inline-block">
            {badge}
          </div>
        </motion.div>
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
        className="max-w-3xl text-center px-4"
      >
        <h2 
          id={id} 
          className={`text-4xl md:text-5xl font-bold font-space mb-4 text-[#f7df1e] drop-shadow-lg ${titleClassName}`}
        >
          {title}
        </h2>
        <p className={`text-lg md:text-xl text-gray-400 ${subtitleClassName}`}>
          {subtitle}
        </p>
      </motion.div>
    </div>
  );
}; 