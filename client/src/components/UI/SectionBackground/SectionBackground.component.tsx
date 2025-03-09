import React from 'react';

interface SectionBackgroundProps {
  /** Dodatkowe klasy CSS dla komponentu */
  className?: string;
  /** Pozycje elementów poświaty (domyślnie po prawej stronie) */
  glowPosition?: 'left' | 'right' | 'both';
}

/**
 * Komponent tła sekcji z efektami wizualnymi
 * Zawiera gradient, poświatę i wzór tła
 */
export const SectionBackground: React.FC<SectionBackgroundProps> = ({ 
  className = '',
  glowPosition = 'both'
}) => {
  return (
    <div className={`absolute inset-0 ${className}`}>
      {/* Podstawowe tło */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#1a1a1a] opacity-90" />
      
      {/* Elementy poświaty */}
      {(glowPosition === 'right' || glowPosition === 'both') && (
        <>
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#f7df1e] rounded-full blur-[150px] opacity-20" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#f7df1e] rounded-full blur-[150px] opacity-20" />
        </>
      )}
      
      {(glowPosition === 'left' || glowPosition === 'both') && (
        <>
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#f7df1e] rounded-full blur-[150px] opacity-20" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#f7df1e] rounded-full blur-[150px] opacity-20" />
        </>
      )}
      
      {/* Dodatkowe elementy poświaty */}
      <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-[#f7df1e] rounded-full blur-[100px] opacity-10" />
      <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-[#f7df1e] rounded-full blur-[100px] opacity-10" />
      
      {/* Wzór tła */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f7df1e' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
    </div>
  );
}; 