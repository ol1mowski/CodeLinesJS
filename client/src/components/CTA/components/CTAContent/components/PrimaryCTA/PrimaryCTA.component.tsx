import { CTACard } from '../../CTACard/CTACard.component';

export const PrimaryCTA = () => {
  return (
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
  );
}; 