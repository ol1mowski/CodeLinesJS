import { motion } from 'framer-motion';
import { useMobileDetect } from '../../../../hooks/useMobileDetect';
import { CTACard } from './CTACard/CTACard.component';

export const CTAContent = () => {
  const isMobile = useMobileDetect();

  const content = (
    <div className="w-full max-w-7xl mx-auto">
      <div className="mb-8">
        <CTACard
          variant="primary"
          icon="🎮"
          title="Rozpocznij Swoją Przygodę z Kodem!"
          subtitle="Dołącz do 75,000+ graczy którzy już opanowują JavaScript przez zabawę!"
          primaryButton={{
            text: "⚡ ZACZNIJ GRAĆ ZA DARMO",
            action: () => console.log('Start game')
          }}
          secondaryButton={{
            text: "👁️ ZOBACZ GAMEPLAY",
            action: () => console.log('View gameplay')
          }}
          note="✨ Bez rejestracji • Najwspanialszy start • 100% za darmo"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CTACard
          variant="challenge"
          icon="🔥"
          title="Wyzwanie dla Pro Graczy"
          subtitle="Myślisz, że jesteś gotowy?"
          description="Tylko 3% graczy ukończyło wszystkie poziomy. Czy dołączysz do elit?"
          primaryButton={{
            text: "🏆 PRZYJMIJ WYZWANIE",
            action: () => console.log('Accept challenge')
          }}
        />

        <CTACard
          variant="beginner"
          icon="🚀"
          title="Szybki Start dla Początkujących"
          subtitle="Pierwszy raz z kodem? Idealnie!"
          description="Naucz się podstaw w 30 minut i zacznij budować swoje pierwsze aplikacje!"
          primaryButton={{
            text: "🌟 ZACZNIJ OD PODSTAW",
            action: () => console.log('Start basics')
          }}
        />
      </div>

      <div className="mt-8">
        <CTACard
          variant="secondary"
          icon="💎"
          title="Twoja Przygoda z Kodem Zaczyna Się TERAZ"
          subtitle="Każdy ekspert był kiedyś początkującym. Każda linia kodu przybliża Cię do celu."
          description="Nie czekaj - zacznij dziś!"
          primaryButton={{
            text: "🎯 ROZPOCZNIJ PRZYGODĘ!",
            action: () => console.log('Start adventure')
          }}
          features={[
            "🔒 Bez zobowiązań",
            "🎯 Aktualny kiedyś chcesz",
            "🎮 Wsparcie 24/7"
          ]}
        />
      </div>
    </div>
  );

  if (isMobile) {
    return content;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {content}
    </motion.div>
  );
}; 