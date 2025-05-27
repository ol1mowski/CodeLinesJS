import { CTACard } from '../../CTACard/CTACard.component';

export const SecondaryCTA = () => {
  return (
    <div className="mt-8">
      <CTACard
        variant="secondary"
        icon="💎"
        title="Twoja Przygoda z Kodem Zaczyna Się TERAZ"
        subtitle="Każdy ekspert był kiedyś początkującym. Każda linia kodu przybliża Cię do celu."
        description="Nie czekaj - zacznij dziś!"
        primaryButton={{
          text: "🎯 ROZPOCZNIJ PRZYGODĘ!",
          to: "/dashboard"
        }}
        features={[
          "🔒 Bez zobowiązań",
          "🎯 Aktualny kiedyś chcesz",
          "🎮 Wsparcie 24/7"
        ]}
      />
    </div>
  );
}; 